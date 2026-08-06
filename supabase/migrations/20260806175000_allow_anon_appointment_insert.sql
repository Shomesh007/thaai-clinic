-- Migration: Fix appointment booking slot locking trigger and allow online appointments

-- 1. Fix trigger function security level (security definer) so it can manage slot locks without RLS 42501 errors
create or replace function public.sync_appointment_slot_lock()
returns trigger
language plpgsql
security definer
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
    insert into public.appointment_slot_locks (slot_id) values (new.slot_id)
    on conflict (slot_id) do nothing;
  end if;

  return new;
end;
$$;

-- 2. Grant table level permissions to anon role
grant insert, select on public.appointments to anon;

-- 3. Clean up and set RLS insert policies for appointments
drop policy if exists "Anyone can create online appointments" on public.appointments;
drop policy if exists "Public can create online appointments" on public.appointments;
drop policy if exists "Anyone can create an appointment" on public.appointments;
drop policy if exists "Authenticated users can create appointments" on public.appointments;
drop policy if exists "Admins can create offline appointments" on public.appointments;

create policy "Anyone can create online appointments"
on public.appointments
for insert
to anon, authenticated
with check (booking_source = 'online');

create policy "Admins can create offline appointments"
on public.appointments
for insert
to authenticated
with check ((select public.is_admin()) and booking_source = 'offline');
