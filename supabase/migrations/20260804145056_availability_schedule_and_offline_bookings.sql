alter table public.appointments
  add column if not exists booking_source text not null default 'online'
    check (booking_source in ('online', 'offline'));

drop policy if exists "Anyone can create an appointment" on public.appointments;

create policy "Public can create online appointments"
on public.appointments
for insert
to anon
with check (booking_source = 'online');

create policy "Signed-in users can create online appointments"
on public.appointments
for insert
to authenticated
with check (booking_source = 'online');

create policy "Admins can create offline appointments"
on public.appointments
for insert
to authenticated
with check ((select public.is_admin()));

create or replace function public.get_open_appointment_slots(from_date date, to_date date)
returns table (
  id uuid,
  slot_date date,
  start_time time without time zone,
  end_time time without time zone,
  is_available boolean
)
language sql
stable
security definer
set search_path = public
as $$
  select s.id, s.slot_date, s.start_time, s.end_time, s.is_available
  from public.availability_slots s
  where s.is_available = true
    and s.slot_date between from_date and to_date
    and not exists (
      select 1
      from public.appointments a
      where a.slot_id = s.id
        and a.status = 'upcoming'
    )
  order by s.slot_date, s.start_time;
$$;

revoke execute on function public.get_open_appointment_slots(date, date) from public;
grant execute on function public.get_open_appointment_slots(date, date) to anon, authenticated;

insert into public.availability_slots (slot_date, start_time, end_time)
select day_value::date, slot_start::time, (slot_start + interval '30 minutes')::time
from generate_series(current_date, current_date + 90, interval '1 day') as days(day_value)
cross join lateral generate_series(timestamp '2000-01-01 08:00', timestamp '2000-01-01 12:30', interval '30 minutes') as morning(slot_start)
union all
select day_value::date, slot_start::time, (slot_start + interval '30 minutes')::time
from generate_series(current_date, current_date + 90, interval '1 day') as days(day_value)
cross join lateral generate_series(timestamp '2000-01-01 17:00', timestamp '2000-01-01 22:30', interval '30 minutes') as evening(slot_start)
on conflict (slot_date, start_time) do nothing;
