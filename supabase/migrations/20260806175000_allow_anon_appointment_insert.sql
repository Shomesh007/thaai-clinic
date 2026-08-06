-- Migration: Allow public (anon) users to book online appointments

-- Ensure anon role has INSERT permission on appointments table
grant insert on public.appointments to anon;

-- Drop policy if it already exists
drop policy if exists "Public can create online appointments" on public.appointments;

-- Create policy allowing anonymous site visitors to insert online appointments
create policy "Public can create online appointments"
on public.appointments
for insert
to anon
with check (booking_source = 'online');
