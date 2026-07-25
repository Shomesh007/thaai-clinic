import React from 'react';
import { Wifi, Signal } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-0 sm:py-6 sm:px-4 selection:bg-pink-100 selection:text-pink-600">
      <div className="w-full max-w-[430px] h-screen sm:h-[880px] bg-white sm:rounded-[44px] shadow-2xl overflow-hidden flex flex-col relative border-0 sm:border-[8px] sm:border-slate-800/90 ring-1 ring-slate-900/10">
        {/* Device Status Bar */}
        <div className="bg-transparent pt-3 pb-1 px-6 flex items-center justify-between text-xs font-semibold text-gray-800 z-30 pointer-events-none select-none">
          <span className="font-bold text-sm tracking-tight text-pink-950">9:41</span>
          <div className="flex items-center gap-1.5 text-pink-950">
            {/* Signal Strength bars */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
              <rect x="1" y="8" width="2.5" height="4" rx="0.5" />
              <rect x="5" y="6" width="2.5" height="6" rx="0.5" />
              <rect x="9" y="3.5" width="2.5" height="8.5" rx="0.5" />
              <rect x="13" y="1" width="2.5" height="11" rx="0.5" />
            </svg>
            <Wifi className="w-4 h-4 stroke-[2.2]" />
            {/* Battery icon */}
            <div className="w-5 h-2.5 rounded-[3px] border border-current p-0.5 flex items-center">
              <div className="w-full h-full bg-current rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Content View Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {children}
        </div>
      </div>
    </div>
  );
};
