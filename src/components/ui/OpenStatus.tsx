import React from 'react';
import { useClinicStatus } from '../../lib/clinicHours';

/** Live "Open now / Closed" pill with a pulsing dot. */
export const OpenStatusPill: React.FC<{ tone?: 'light' | 'dark'; className?: string }> = ({
  tone = 'light',
  className = '',
}) => {
  const status = useClinicStatus();
  const base =
    tone === 'dark'
      ? 'bg-white/15 text-white border-white/25 backdrop-blur-md'
      : status.isOpen
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
        : 'bg-slate-100 text-slate-600 border-slate-200';

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${base} ${className}`}
      aria-live="polite"
    >
      <span className="relative flex w-2 h-2">
        {status.isOpen && (
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-ring" />
        )}
        <span className={`relative w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-400' : 'bg-slate-400'}`} />
      </span>
      {status.isOpen ? 'Open now' : 'Closed'}
      <span className="font-semibold opacity-75">· {status.detail}</span>
    </span>
  );
};
