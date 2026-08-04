drop function if exists public.get_open_appointment_slots(date, date);

drop policy if exists "Signed-in users can create online appointments" on public.appointments;
drop policy if exists "Admins can create offline appointments" on public.appointments;

create policy "Authenticated users can create appointments"
on public.appointments
for insert
to authenticated
with check (
  booking_source = 'online'
  or ((select public.is_admin()) and booking_source = 'offline')
);

create table public.appointment_slot_locks (
  slot_id uuid primary key references public.availability_slots(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.appointment_slot_locks enable row level security;
grant select on public.appointment_slot_locks to anon, authenticated;

create policy "Public can see reserved slot ids"
on public.appointment_slot_locks
for select
to anon, authenticated
using (true);

create or replace function public.sync_appointment_slot_lock()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if tg_op = 'DELETE' then
    if old.slot_id is not null then
      delete from public.appointment_slot_locks where slot_id = old.slot_id;
    end if;
    return old;
  end if;

  if tg_op = 'UPDATE'
     and (old.slot_id is distinct from new.slot_id or old.status is distinct from new.status)
     and old.slot_id is not null then
    delete from public.appointment_slot_locks where slot_id = old.slot_id;
  end if;

  if (tg_op = 'INSERT' or old.slot_id is distinct from new.slot_id or old.status is distinct from new.status)
     and new.status = 'upcoming' and new.slot_id is not null then
    insert into public.appointment_slot_locks (slot_id) values (new.slot_id);
  end if;

  return new;
end;
$$;

create trigger appointments_sync_slot_lock
after insert or update or delete on public.appointments
for each row execute function public.sync_appointment_slot_lock();

insert into public.appointment_slot_locks (slot_id)
select slot_id
from public.appointments
where status = 'upcoming' and slot_id is not null
on conflict (slot_id) do nothing;
