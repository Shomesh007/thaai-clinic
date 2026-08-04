import React, { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Check, ChevronDown, Clock3, LogOut, Plus, RefreshCw, Trash2, X } from 'lucide-react';
import {
  addAdminSlot,
  closeAdminDate,
  createAdminAppointment,
  formatDateLabel,
  formatTimeLabel,
  getAdminAppointments,
  getAdminSlots,
  setAdminSlotAvailability,
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
  const [closeDate, setCloseDate] = useState(todayKey);
  const [offlineDate, setOfflineDate] = useState(todayKey);
  const [offlineSlotId, setOfflineSlotId] = useState('');
  const [offlinePatientName, setOfflinePatientName] = useState('');
  const [offlinePatientPhone, setOfflinePatientPhone] = useState('');
  const [offlineReason, setOfflineReason] = useState('Offline appointment');
  const [expandedDate, setExpandedDate] = useState<string | null>(null);

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

  const handleToggleSlot = async (id: string, isAvailable: boolean) => {
    setErrorMessage('');
    try {
      await setAdminSlotAvailability(id, isAvailable);
      setSlots((current) => current.map((slot) => slot.id === id ? { ...slot, is_available: isAvailable } : slot));
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to update this time.');
    }
  };

  const handleCloseDateValue = async (date: string) => {
    setErrorMessage('');
    setSuccessMessage('');
    try {
      await closeAdminDate(date);
      setSlots((current) => current.map((slot) => slot.slot_date === date ? { ...slot, is_available: false } : slot));
      setSuccessMessage(`${formatDateLabel(date).full} is closed for online bookings.`);
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to close this date.');
    }
  };

  const handleCloseDate = async (event: React.FormEvent) => {
    event.preventDefault();
    await handleCloseDateValue(closeDate);
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

  const handleOfflineBooking = async (event: React.FormEvent) => {
    event.preventDefault();
    const slot = slots.find((item) => item.id === offlineSlotId);
    if (!slot) {
      setErrorMessage('Choose an available time for the offline appointment.');
      return;
    }
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      await createAdminAppointment({
        slotId: slot.id,
        patientName: offlinePatientName.trim(),
        patientPhone: offlinePatientPhone.trim(),
        date: slot.slot_date,
        time: slot.start_time,
        reason: offlineReason.trim() || 'Offline appointment',
      });
      setSuccessMessage('Offline appointment added and that time is now blocked online.');
      setOfflinePatientName('');
      setOfflinePatientPhone('');
      await loadDashboard();
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to add the offline appointment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const groupedSlots = useMemo(() => {
    return slots.reduce<Record<string, AvailabilitySlot[]>>((groups, slot) => {
      (groups[slot.slot_date] ??= []).push(slot);
      return groups;
    }, {});
  }, [slots]);

  const bookedSlotIds = useMemo(() => new Set(
    appointments.filter((appointment) => appointment.status === 'upcoming' && appointment.slot_id).map((appointment) => appointment.slot_id as string),
  ), [appointments]);

  const offlineSlots = useMemo(() => slots.filter((slot) => (
    slot.slot_date === offlineDate && slot.is_available && !bookedSlotIds.has(slot.id)
  )), [slots, offlineDate, bookedSlotIds]);

  useEffect(() => {
    if (!offlineSlots.some((slot) => slot.id === offlineSlotId)) {
      setOfflineSlotId(offlineSlots[0]?.id ?? '');
    }
  }, [offlineSlots, offlineSlotId]);

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
            <form onSubmit={handleCloseDate} className="rounded-2xl bg-white p-4 shadow-sm">
              <h2 className="mb-1 text-sm font-extrabold text-slate-900">Close a whole day</h2>
              <p className="mb-3 text-xs text-slate-500">Existing appointments stay visible, but every remaining slot is removed from online booking.</p>
              <div className="flex gap-2">
                <input required min={todayKey()} type="date" value={closeDate} onChange={(event) => setCloseDate(event.target.value)} className="h-10 min-w-0 flex-1 rounded-lg border border-slate-200 px-2 text-xs" />
                <button className="rounded-xl bg-slate-900 px-3 text-xs font-extrabold text-white">Close date</button>
              </div>
            </form>
            <div className="space-y-3">
              {Object.entries(groupedSlots).map(([date, dateSlots]) => {
                const openCount = dateSlots.filter((slot) => slot.is_available && !bookedSlotIds.has(slot.id)).length;
                const bookedCount = dateSlots.filter((slot) => bookedSlotIds.has(slot.id)).length;
                const closedCount = dateSlots.length - openCount - bookedCount;
                const isExpanded = expandedDate === date;
                return (
                  <section key={`compact-${date}`} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                    <button type="button" onClick={() => setExpandedDate(isExpanded ? null : date)} className="flex w-full items-center justify-between gap-3 p-4 text-left">
                      <span className="flex min-w-0 items-center gap-3"><CalendarDays className="h-5 w-5 shrink-0 text-pink-600" /><span><strong className="block text-sm font-extrabold text-slate-900">{formatDateLabel(date).full}</strong><span className="mt-1 block text-[11px] font-semibold text-slate-500">{openCount} open · {bookedCount} booked · {closedCount} closed</span></span></span>
                      <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    {isExpanded && <div className="border-t border-slate-100 p-4"><div className="mb-3 flex justify-end"><button type="button" onClick={() => void handleCloseDateValue(date)} className="rounded-lg bg-slate-900 px-3 py-2 text-[10px] font-extrabold text-white">Close whole day</button></div><div className="grid grid-cols-2 gap-2">{dateSlots.map((slot) => { const booked = bookedSlotIds.has(slot.id); return <div key={`expanded-${slot.id}`} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"><span className="text-xs font-bold text-slate-700"><Clock3 className="mr-1 inline h-3.5 w-3.5 text-pink-500" />{formatTimeLabel(slot.start_time)}<span className={`ml-1 block text-[9px] ${booked ? 'text-amber-600' : slot.is_available ? 'text-emerald-600' : 'text-slate-400'}`}>{booked ? 'Booked' : slot.is_available ? 'Open' : 'Closed'}</span></span>{!booked && <button type="button" onClick={() => void handleToggleSlot(slot.id, !slot.is_available)} className={`rounded-lg p-1.5 ${slot.is_available ? 'text-slate-400 hover:bg-red-50 hover:text-red-600' : 'text-emerald-600 hover:bg-emerald-50'}`} aria-label={slot.is_available ? 'Close available time' : 'Reopen available time'}>{slot.is_available ? <Trash2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}</button>}</div>; })}</div></div>}
                  </section>
                );
              })}
            </div>
            {false && <div className="hidden">
              {Object.entries(groupedSlots).map(([date, dateSlots]) => (
                <section key={date} className="rounded-2xl bg-white p-4 shadow-sm"><h2 className="mb-3 flex items-center gap-2 text-sm font-extrabold text-slate-900"><CalendarDays className="h-4 w-4 text-pink-600" />{formatDateLabel(date).full}</h2><div className="grid grid-cols-2 gap-2">{dateSlots.map((slot) => { const booked = bookedSlotIds.has(slot.id); return <div key={slot.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"><span className="text-xs font-bold text-slate-700"><Clock3 className="mr-1 inline h-3.5 w-3.5 text-pink-500" />{formatTimeLabel(slot.start_time)}<span className={`ml-1 block text-[9px] ${booked ? 'text-amber-600' : slot.is_available ? 'text-emerald-600' : 'text-slate-400'}`}>{booked ? 'Booked' : slot.is_available ? 'Open' : 'Closed'}</span></span>{!booked && <button onClick={() => void handleToggleSlot(slot.id, !slot.is_available)} className={`rounded-lg p-1.5 ${slot.is_available ? 'text-slate-400 hover:bg-red-50 hover:text-red-600' : 'text-emerald-600 hover:bg-emerald-50'}`} aria-label={slot.is_available ? 'Close available time' : 'Reopen available time'}>{slot.is_available ? <Trash2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}</button>}</div>; })}</div></section>
              ))}
              {!slots.length && <Notice text="No future availability yet. Add the clinic's times above." />}
            </div>}
            {!slots.length && <Notice text="No future availability yet. Add the clinic's times above." />}
          </>
        )}

        {activeTab === 'appointments' && (
          <div className="space-y-3">
            <form onSubmit={handleOfflineBooking} className="rounded-2xl bg-white p-4 shadow-sm">
              <h2 className="mb-1 text-sm font-extrabold text-slate-900">Add offline appointment</h2>
              <p className="mb-3 text-xs text-slate-500">Use this for walk-ins or appointments booked by phone. The selected time will be blocked online.</p>
              <div className="space-y-2">
                <input required min={todayKey()} type="date" value={offlineDate} onChange={(event) => setOfflineDate(event.target.value)} className="h-10 w-full rounded-lg border border-slate-200 px-2 text-xs" />
                <select required value={offlineSlotId} onChange={(event) => setOfflineSlotId(event.target.value)} className="h-10 w-full rounded-lg border border-slate-200 px-2 text-xs"><option value="">Choose an open time</option>{offlineSlots.map((slot) => <option key={slot.id} value={slot.id}>{formatTimeLabel(slot.start_time)} – {formatTimeLabel(slot.end_time)}</option>)}</select>
                <div className="grid grid-cols-2 gap-2"><input required minLength={2} value={offlinePatientName} onChange={(event) => setOfflinePatientName(event.target.value)} placeholder="Patient name" className="h-10 rounded-lg border border-slate-200 px-2 text-xs" /><input required minLength={7} value={offlinePatientPhone} onChange={(event) => setOfflinePatientPhone(event.target.value)} placeholder="Phone number" className="h-10 rounded-lg border border-slate-200 px-2 text-xs" /></div>
                <input required minLength={2} value={offlineReason} onChange={(event) => setOfflineReason(event.target.value)} placeholder="Reason for visit" className="h-10 w-full rounded-lg border border-slate-200 px-2 text-xs" />
                <button disabled={isSubmitting || !offlineSlotId} className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-xs font-extrabold text-white disabled:opacity-50"><CalendarDays className="h-4 w-4" />Save offline appointment</button>
              </div>
            </form>
            {!appointments.length && <Notice text="No appointments have been booked yet." />}
            {appointments.map((appointment) => (
              <article key={appointment.id} className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-extrabold text-slate-900">{appointment.patient_name}</p><p className="mt-1 text-xs font-semibold text-pink-600">{formatDateLabel(appointment.appointment_date).full} · {formatTimeLabel(appointment.appointment_time)}</p></div><span className={`rounded-full px-2 py-1 text-[10px] font-extrabold uppercase ${statusClasses(appointment.status)}`}>{appointment.status}</span></div>
                <p className="mt-3 text-xs text-slate-600">{appointment.reason}</p><p className="mt-2 text-xs font-semibold text-slate-700">{appointment.patient_phone}</p><p className="mt-2 flex items-center gap-1 text-[10px] font-bold uppercase text-slate-400">{appointment.booking_source === 'offline' ? 'Offline / walk-in' : 'Online booking'} · <span className="font-mono normal-case">{appointment.reference_code}</span></p>
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
