create extension if not exists pgcrypto;

create table public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Thaai Clinic Doctor',
  created_at timestamptz not null default now()
);

create table public.availability_slots (
  id uuid primary key default gen_random_uuid(),
  slot_date date not null,
  start_time time without time zone not null,
  end_time time without time zone not null,
  is_available boolean not null default true,
  created_at timestamptz not null default now(),
  constraint availability_slots_time_order check (end_time > start_time),
  constraint availability_slots_unique_start unique (slot_date, start_time)
);

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  reference_code text not null unique,
  slot_id uuid references public.availability_slots(id) on delete set null,
  patient_name text not null check (char_length(trim(patient_name)) between 2 and 120),
  patient_phone text not null check (char_length(trim(patient_phone)) between 7 and 30),
  appointment_date date not null,
  appointment_time time without time zone not null,
  reason text not null check (char_length(trim(reason)) between 2 and 500),
  status text not null default 'upcoming' check (status in ('upcoming', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index appointments_one_active_per_slot
  on public.appointments (slot_id)
  where slot_id is not null and status = 'upcoming';

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger appointments_set_updated_at
before update on public.appointments
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where user_id = (select auth.uid())
  );
$$;

create or replace function public.validate_appointment_slot()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if not exists (
    select 1
    from public.availability_slots
    where id = new.slot_id
      and slot_date = new.appointment_date
      and start_time = new.appointment_time
      and is_available = true
  ) then
    raise exception 'The selected appointment slot is no longer available';
  end if;
  return new;
end;
$$;

create trigger appointments_validate_slot
before insert on public.appointments
for each row execute function public.validate_appointment_slot();

alter table public.admin_profiles enable row level security;
alter table public.availability_slots enable row level security;
alter table public.appointments enable row level security;

grant select on public.availability_slots to anon, authenticated;
grant select, insert, update, delete on public.availability_slots to authenticated;
grant insert on public.appointments to anon, authenticated;
grant select, update, delete on public.appointments to authenticated;
grant select on public.admin_profiles to authenticated;

create policy "Public can view available future slots"
on public.availability_slots
for select
to anon, authenticated
using (is_available = true and slot_date >= current_date);

create policy "Admins can view all availability slots"
on public.availability_slots
for select
to authenticated
using ((select public.is_admin()));

create policy "Admins can create availability slots"
on public.availability_slots
for insert
to authenticated
with check ((select public.is_admin()));

create policy "Admins can update availability slots"
on public.availability_slots
for update
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Admins can delete availability slots"
on public.availability_slots
for delete
to authenticated
using ((select public.is_admin()));

create policy "Anyone can create an appointment"
on public.appointments
for insert
to anon, authenticated
with check (true);

create policy "Admins can view all appointments"
on public.appointments
for select
to authenticated
using ((select public.is_admin()));

create policy "Admins can update appointments"
on public.appointments
for update
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Admins can delete appointments"
on public.appointments
for delete
to authenticated
using ((select public.is_admin()));

create policy "Admins can view their own admin profile"
on public.admin_profiles
for select
to authenticated
using (user_id = (select auth.uid()));
