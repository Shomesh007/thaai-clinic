import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-0 sm:py-6 sm:px-4 selection:bg-pink-100 selection:text-pink-600">
      <div className="w-full max-w-[430px] h-screen sm:h-[880px] bg-white sm:rounded-[44px] shadow-2xl overflow-hidden flex flex-col relative border-0 sm:border-[8px] sm:border-slate-800/90 ring-1 ring-slate-900/10">
        {/* Content View Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {children}
        </div>
      </div>
    </div>
  );
};
