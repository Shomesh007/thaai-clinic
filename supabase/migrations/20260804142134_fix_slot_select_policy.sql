drop policy if exists "Public can view available future slots" on public.availability_slots;
drop policy if exists "Admins can view all availability slots" on public.availability_slots;

create policy "Public can view available future slots"
on public.availability_slots
for select
to anon
using (is_available = true and slot_date >= current_date);

create policy "Users can view available slots and admins can view all"
on public.availability_slots
for select
to authenticated
using (
  (is_available = true and slot_date >= current_date)
  or (select public.is_admin())
);
