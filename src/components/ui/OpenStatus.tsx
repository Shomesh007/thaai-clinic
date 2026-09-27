import React from 'react';
import { motion } from 'motion/react';
import { EASE_OUT } from './Motion';
import { SESSIONS, useClinicStatus } from '../../lib/clinicHours';

/** Live open/closed pill with a pulsing dot. `dark` is the hero variant on the pink gradient. */
export const OpenStatusPill: React.FC<{ tone?: 'light' | 'dark'; className?: string }> = ({
  tone = 'light',
  className = '',
}) => {
  const status = useClinicStatus();
  const detail = status.detail.charAt(0).toLowerCase() + status.detail.slice(1);

  if (tone === 'dark') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold px-2.5 py-1 rounded-full border bg-white/15 text-white border-white/25 backdrop-blur-md ${className}`}
        aria-live="polite"
      >
        <span className="relative flex w-2 h-2">
          {status.isOpen && <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-ring" />}
          <span className={`relative w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-400' : 'bg-slate-400'}`} />
        </span>
        {status.isOpen ? 'Open now' : 'Closed'}
        <span className="font-semibold opacity-75">· {status.detail}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 text-[12px] font-semibold px-3 py-1 rounded-full ${
        status.isOpen ? 'bg-leaf/10 text-leaf' : 'bg-plum/5 text-plum/70'
      } ${className}`}
      aria-live="polite"
    >
      <span className="relative flex w-2 h-2">
        {status.isOpen && <span className="absolute inset-0 rounded-full bg-leaf/60 animate-pulse-ring" />}
        <span className={`relative w-2 h-2 rounded-full ${status.isOpen ? 'bg-leaf' : 'bg-plum/40'}`} />
      </span>
      <span>
        <strong className="font-bold">{status.isOpen ? 'Open now' : 'Closed now'}</strong>
        <span className="opacity-80">, {detail}</span>
      </span>
    </span>
  );
};

// Day strip spans 6 AM → midnight
const DAY_START = 6 * 60;
const DAY_END = 24 * 60;
const pct = (mins: number) =>
  ((Math.min(Math.max(mins, DAY_START), DAY_END) - DAY_START) / (DAY_END - DAY_START)) * 100;

/** Horizontal "today" strip showing both sessions and a live now-marker. */
export const DayStrip: React.FC<{ className?: string }> = ({ className = '' }) => {
  const status = useClinicStatus();
  const nowInRange = status.minutes >= DAY_START;
  return (
    <div className={className}>
      <div className="relative h-10 rounded-2xl bg-plum/[0.05]">
        {SESSIONS.map((s, i) => {
          const active = status.current?.id === s.id;
          return (
            <motion.div
              key={s.id}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 + i * 0.12 }}
              className={`absolute top-1 bottom-1 rounded-xl origin-left flex flex-col items-center justify-center leading-none ${
                active ? 'bg-leaf text-white' : 'bg-leaf/15 text-leaf'
              }`}
              style={{ left: `${pct(s.start)}%`, width: `${pct(s.end) - pct(s.start)}%` }}
            >
              <span className="text-[11px] font-bold">{s.label}</span>
            </motion.div>
          );
        })}
        {nowInRange && (
          <div className="absolute -top-1 -bottom-1 w-[2px] bg-turmeric rounded-full" style={{ left: `${pct(status.minutes)}%` }}>
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-turmeric bg-white px-1 rounded">
              now
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-between text-[10px] font-semibold text-plum/40 mt-1.5 px-0.5">
        <span>6 am</span>
        <span>noon</span>
        <span>6 pm</span>
        <span>midnight</span>
      </div>
    </div>
  );
};
