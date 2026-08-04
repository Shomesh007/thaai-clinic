import React, { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Check, Clock3, LogOut, Plus, RefreshCw, Trash2, X } from 'lucide-react';
import {
  addAdminSlot,
  formatDateLabel,
  formatTimeLabel,
  getAdminAppointments,
  getAdminSlots,
  removeAdminSlot,
  signInAdmin,
  signOutAdmin,
  updateAdminAppointmentStatus,
  type AdminAppointment,
  type AvailabilitySlot,
} from '../lib/appointments';
import { isSupabaseConfigured, requireSupabase } from '../lib/supabase';
import type { Appointment } from '../types';

type DashboardTab = 'appointments' | 'availability';

function todayKey() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function statusClasses(status: Appointment['status']) {
  if (status === 'completed') return 'bg-emerald-50 text-emerald-700';
  if (status === 'cancelled') return 'bg-gray-100 text-gray-600';
  return 'bg-pink-50 text-pink-700';
}

export const AdminScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [activeTab, setActiveTab] = useState<DashboardTab>('appointments');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [slotDate, setSlotDate] = useState(todayKey);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('09:30');

  const loadDashboard = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const [nextSlots, nextAppointments] = await Promise.all([getAdminSlots(), getAdminAppointments()]);
      setSlots(nextSlots);
      setAppointments(nextAppointments);
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to load the dashboard.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    void (async () => {
      const { data } = await requireSupabase().auth.getSession();
      if (!cancelled && data.session) {
        try {
          const { data: profile } = await requireSupabase()
            .from('admin_profiles')
            .select('display_name')
            .eq('user_id', data.session.user.id)
            .maybeSingle();
          if (!profile) throw new Error('Not an admin session');
          setDisplayName(profile.display_name || 'Doctor');
          setIsSignedIn(true);
          await loadDashboard();
        } catch {
          // A persisted non-admin session is cleared by signInAdmin when necessary.
        }
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const name = await signInAdmin(email.trim(), password);
      setDisplayName(name);
      setIsSignedIn(true);
      await loadDashboard();
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await signOutAdmin();
    setIsSignedIn(false);
    setDisplayName('');
    setSlots([]);
    setAppointments([]);
  };

  const handleAddSlot = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      await addAdminSlot({ date: slotDate, startTime, endTime });
      setSuccessMessage('Availability added.');
      await loadDashboard();
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to add this time.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveSlot = async (id: string) => {
    setErrorMessage('');
    try {
      await removeAdminSlot(id);
      setSlots((current) => current.filter((slot) => slot.id !== id));
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to remove this time.');
    }
  };

  const handleStatus = async (id: string, status: Appointment['status']) => {
    setErrorMessage('');
    try {
      await updateAdminAppointmentStatus(id, status);
      setAppointments((current) => current.map((appointment) => (
        appointment.id === id ? { ...appointment, status } : appointment
      )));
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to update this appointment.');
    }
  };

  const groupedSlots = useMemo(() => {
    return slots.reduce<Record<string, AvailabilitySlot[]>>((groups, slot) => {
      (groups[slot.slot_date] ??= []).push(slot);
      return groups;
    }, {});
  }, [slots]);

  if (!isSupabaseConfigured) {
    return <div className="flex-1 overflow-y-auto bg-slate-50 p-6"><Notice text="The admin service is not configured. Add the VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY environment variables before using this page." /></div>;
  }

  if (!isSignedIn) {
    return (
      <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
        <div className="mx-auto mt-10 max-w-md rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-pink-600">Thaai Clinic</p>
            <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Doctor Admin</h1>
            <p className="mt-1 text-sm text-slate-500">Sign in to manage appointment times and bookings.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block text-xs font-bold text-slate-600">Username or email<input required type="text" autoCapitalize="none" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="sakthi" className="mt-1 h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-pink-500" /></label>
            <label className="block text-xs font-bold text-slate-600">Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-pink-500" /></label>
            {errorMessage && <Notice text={errorMessage} tone="error" />}
            <button disabled={isSubmitting} className="flex h-12 w-full items-center justify-center rounded-xl bg-pink-600 text-sm font-extrabold text-white shadow-lg shadow-pink-200 disabled:opacity-50">{isSubmitting ? 'Signing in…' : 'Sign in'}</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 pb-8">
      <header className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
        <div><p className="text-xs font-bold uppercase tracking-widest text-pink-600">Thaai Clinic</p><h1 className="text-xl font-extrabold text-slate-900">Welcome, {displayName}</h1></div>
        <button onClick={handleLogout} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100" aria-label="Sign out"><LogOut className="h-5 w-5" /></button>
      </header>
      <div className="space-y-5 p-5">
        {errorMessage && <Notice text={errorMessage} tone="error" />}
        {successMessage && <Notice text={successMessage} tone="success" />}
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white p-1 shadow-sm">
          <button onClick={() => setActiveTab('appointments')} className={`rounded-xl px-3 py-3 text-xs font-extrabold ${activeTab === 'appointments' ? 'bg-pink-600 text-white' : 'text-slate-500'}`}>Appointments ({appointments.length})</button>
          <button onClick={() => setActiveTab('availability')} className={`rounded-xl px-3 py-3 text-xs font-extrabold ${activeTab === 'availability' ? 'bg-pink-600 text-white' : 'text-slate-500'}`}>Available times ({slots.length})</button>
        </div>
        <button onClick={() => void loadDashboard()} disabled={isLoading} className="flex items-center gap-2 text-xs font-bold text-pink-600"><RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />Refresh data</button>

        {activeTab === 'availability' && (
          <>
            <form onSubmit={handleAddSlot} className="rounded-2xl bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-sm font-extrabold text-slate-900">Add an available time</h2>
              <div className="grid grid-cols-3 gap-2">
                <label className="text-[10px] font-bold text-slate-500">Date<input required min={todayKey()} type="date" value={slotDate} onChange={(event) => setSlotDate(event.target.value)} className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-2 text-xs" /></label>
                <label className="text-[10px] font-bold text-slate-500">Starts<input required type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-2 text-xs" /></label>
                <label className="text-[10px] font-bold text-slate-500">Ends<input required type="time" value={endTime} onChange={(event) => setEndTime(event.target.value)} className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-2 text-xs" /></label>
              </div>
              <button disabled={isSubmitting} className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-pink-600 text-xs font-extrabold text-white disabled:opacity-50"><Plus className="h-4 w-4" />Add time</button>
            </form>
            <div className="space-y-3">
              {Object.entries(groupedSlots).map(([date, dateSlots]) => (
                <section key={date} className="rounded-2xl bg-white p-4 shadow-sm"><h2 className="mb-3 flex items-center gap-2 text-sm font-extrabold text-slate-900"><CalendarDays className="h-4 w-4 text-pink-600" />{formatDateLabel(date).full}</h2><div className="grid grid-cols-2 gap-2">{dateSlots.map((slot) => <div key={slot.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"><span className="text-xs font-bold text-slate-700"><Clock3 className="mr-1 inline h-3.5 w-3.5 text-pink-500" />{formatTimeLabel(slot.start_time)}</span><button onClick={() => void handleRemoveSlot(slot.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600" aria-label="Remove available time"><Trash2 className="h-4 w-4" /></button></div>)}</div></section>
              ))}
              {!slots.length && <Notice text="No future availability yet. Add the clinic's times above." />}
            </div>
          </>
        )}

        {activeTab === 'appointments' && (
          <div className="space-y-3">
            {!appointments.length && <Notice text="No appointments have been booked yet." />}
            {appointments.map((appointment) => (
              <article key={appointment.id} className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-extrabold text-slate-900">{appointment.patient_name}</p><p className="mt-1 text-xs font-semibold text-pink-600">{formatDateLabel(appointment.appointment_date).full} · {formatTimeLabel(appointment.appointment_time)}</p></div><span className={`rounded-full px-2 py-1 text-[10px] font-extrabold uppercase ${statusClasses(appointment.status)}`}>{appointment.status}</span></div>
                <p className="mt-3 text-xs text-slate-600">{appointment.reason}</p><p className="mt-2 text-xs font-semibold text-slate-700">{appointment.patient_phone}</p><p className="mt-2 font-mono text-[10px] text-slate-400">{appointment.reference_code}</p>
                {appointment.status === 'upcoming' && <div className="mt-3 flex gap-2"><button onClick={() => void handleStatus(appointment.id, 'completed')} className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-emerald-50 py-2 text-[11px] font-extrabold text-emerald-700"><Check className="h-3.5 w-3.5" />Complete</button><button onClick={() => void handleStatus(appointment.id, 'cancelled')} className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-red-50 py-2 text-[11px] font-extrabold text-red-700"><X className="h-3.5 w-3.5" />Cancel</button></div>}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function Notice({ text, tone = 'info' }: { text: string; tone?: 'info' | 'error' | 'success' }) {
  const classes = tone === 'error' ? 'bg-red-50 text-red-700' : tone === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600';
  return <p className={`rounded-xl px-4 py-3 text-xs font-semibold ${classes}`} role={tone === 'error' ? 'alert' : undefined}>{text}</p>;
}
