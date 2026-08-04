import type { Appointment } from '../types';
import { requireSupabase } from './supabase';

export interface AvailabilitySlot {
  id: string;
  slot_date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export interface AdminAppointment {
  id: string;
  reference_code: string;
  slot_id: string | null;
  patient_name: string;
  patient_phone: string;
  appointment_date: string;
  appointment_time: string;
  reason: string;
  status: Appointment['status'];
  created_at: string;
}

const CLINIC_LOCATION = 'Thaai Clinic, 385, Bharathiyar Road, Kovil Pathu, Karaikal';

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Something went wrong. Please try again.';
}

export function dateToKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDateLabel(dateKey: string): { day: string; date: string; month: string; full: string; raw: string } {
  const [year, month, day] = dateKey.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const dayName = date.toLocaleDateString('en-IN', { weekday: 'short' });
  const monthName = date.toLocaleDateString('en-IN', { month: 'short' });
  const full = date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
  return { day: dayName, date: String(day), month: monthName, full, raw: dateKey };
}

export function formatTimeLabel(time: string): string {
  const [hours, minutes] = time.slice(0, 5).split(':').map(Number);
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const hour = hours % 12 || 12;
  return `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${suffix}`;
}

export async function getAvailableSlots(from: string, to: string): Promise<AvailabilitySlot[]> {
  const { data, error } = await requireSupabase()
    .from('availability_slots')
    .select('id, slot_date, start_time, end_time, is_available')
    .eq('is_available', true)
    .gte('slot_date', from)
    .lte('slot_date', to)
    .order('slot_date', { ascending: true })
    .order('start_time', { ascending: true });

  if (error) throw new Error(getErrorMessage(error));
  return (data ?? []) as AvailabilitySlot[];
}

export async function createAppointment(input: {
  slotId: string;
  patientName: string;
  patientPhone: string;
  date: string;
  time: string;
  reason: string;
}): Promise<Appointment> {
  const referenceCode = `THAAI-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const { error } = await requireSupabase().from('appointments').insert({
    reference_code: referenceCode,
    slot_id: input.slotId,
    patient_name: input.patientName,
    patient_phone: input.patientPhone,
    appointment_date: input.date,
    appointment_time: input.time,
    reason: input.reason,
    status: 'upcoming',
  });

  if (error) {
    if (error.code === '23505') {
      throw new Error('That time was just booked by someone else. Please choose another available time.');
    }
    throw new Error(getErrorMessage(error));
  }

  const dateLabel = formatDateLabel(input.date);
  return {
    id: referenceCode,
    doctorName: 'Dr. Sakthimaindan Karthigeyan',
    doctorSpecialty: 'General Physician',
    date: dateLabel.full,
    rawDate: input.date,
    time: formatTimeLabel(input.time),
    reason: input.reason,
    location: CLINIC_LOCATION,
    status: 'upcoming',
    patientName: input.patientName,
    patientPhone: input.patientPhone,
    createdAt: new Date().toISOString(),
  };
}

export async function signInAdmin(email: string, password: string): Promise<string> {
  const client = requireSupabase();
  // Supabase Auth signs in with an email address. The dashboard accepts the
  // doctor's short username and maps it to the private clinic Auth email.
  const loginEmail = email.includes('@') ? email.trim() : `${email.trim().toLowerCase()}@thaaiclinic.com`;
  const { data, error } = await client.auth.signInWithPassword({ email: loginEmail, password });
  if (error || !data.user) throw new Error(error?.message ?? 'Unable to sign in.');

  const { data: profile, error: profileError } = await client
    .from('admin_profiles')
    .select('display_name')
    .eq('user_id', data.user.id)
    .maybeSingle();

  if (profileError || !profile) {
    await client.auth.signOut();
    throw new Error('This account is not authorised for the clinic admin dashboard.');
  }

  return profile.display_name || 'Doctor';
}

export async function signOutAdmin(): Promise<void> {
  await requireSupabase().auth.signOut();
}

export async function getAdminSlots(): Promise<AvailabilitySlot[]> {
  const today = dateToKey(new Date());
  const { data, error } = await requireSupabase()
    .from('availability_slots')
    .select('id, slot_date, start_time, end_time, is_available')
    .gte('slot_date', today)
    .order('slot_date', { ascending: true })
    .order('start_time', { ascending: true });
  if (error) throw new Error(getErrorMessage(error));
  return (data ?? []) as AvailabilitySlot[];
}

export async function addAdminSlot(input: { date: string; startTime: string; endTime: string }): Promise<void> {
  const { error } = await requireSupabase().from('availability_slots').insert({
    slot_date: input.date,
    start_time: input.startTime,
    end_time: input.endTime,
    is_available: true,
  });
  if (error) {
    if (error.code === '23505') throw new Error('That start time already exists for this date.');
    throw new Error(getErrorMessage(error));
  }
}

export async function removeAdminSlot(id: string): Promise<void> {
  const { error } = await requireSupabase().from('availability_slots').delete().eq('id', id);
  if (error) throw new Error(getErrorMessage(error));
}

export async function getAdminAppointments(): Promise<AdminAppointment[]> {
  const { data, error } = await requireSupabase()
    .from('appointments')
    .select('id, reference_code, slot_id, patient_name, patient_phone, appointment_date, appointment_time, reason, status, created_at')
    .order('appointment_date', { ascending: true })
    .order('appointment_time', { ascending: true });
  if (error) throw new Error(getErrorMessage(error));
  return (data ?? []) as AdminAppointment[];
}

export async function updateAdminAppointmentStatus(id: string, status: Appointment['status']): Promise<void> {
  const { error } = await requireSupabase().from('appointments').update({ status }).eq('id', id);
  if (error) throw new Error(getErrorMessage(error));
}
