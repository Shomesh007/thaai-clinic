import { useEffect, useState } from 'react';

/** Consultation sessions in clinic-local time (IST), minutes from midnight. */
export const SESSIONS = [
  { id: 'morning', label: 'Morning', range: '8:00 AM – 1:00 PM', start: 8 * 60, end: 13 * 60 },
  { id: 'evening', label: 'Evening', range: '5:00 PM – 11:00 PM', start: 17 * 60, end: 23 * 60 },
] as const;

export interface ClinicStatus {
  isOpen: boolean;
  /** Minutes since midnight in IST when this status was computed. */
  minutes: number;
  /** Session currently running, if any. */
  current?: (typeof SESSIONS)[number];
  /** 0–1 progress through the current session. */
  progress: number;
  /** Human-readable status line, e.g. "Closes at 1:00 PM". */
  detail: string;
}

/** Minutes since midnight in Asia/Kolkata, regardless of the viewer's timezone. */
export function istMinutes(now: Date = new Date()): number {
  const ist = new Date(now.getTime() + (now.getTimezoneOffset() + 330) * 60_000);
  return ist.getHours() * 60 + ist.getMinutes();
}

function fmt(mins: number): string {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, '0')} ${suffix}`;
}

export function getClinicStatus(now = new Date()): ClinicStatus {
  const mins = istMinutes(now);
  const current = SESSIONS.find((s) => mins >= s.start && mins < s.end);
  if (current) {
    return {
      isOpen: true,
      minutes: mins,
      current,
      progress: (mins - current.start) / (current.end - current.start),
      detail: `Closes at ${fmt(current.end)}`,
    };
  }
  const next = SESSIONS.find((s) => mins < s.start) ?? SESSIONS[0];
  const tomorrow = mins >= SESSIONS[SESSIONS.length - 1].end;
  return {
    isOpen: false,
    minutes: mins,
    progress: 0,
    detail: `Opens ${tomorrow ? 'tomorrow ' : ''}at ${fmt(next.start)}`,
  };
}

/** Re-evaluates the clinic status every minute. */
export function useClinicStatus(): ClinicStatus {
  const [status, setStatus] = useState(() => getClinicStatus());
  useEffect(() => {
    const id = window.setInterval(() => setStatus(getClinicStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  return status;
}
