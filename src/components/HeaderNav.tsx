import React from 'react';
import { ChevronLeft, Heart } from 'lucide-react';

interface HeaderNavProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  showHeart?: boolean;
  rightAction?: React.ReactNode;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  title,
  subtitle,
  onBack,
  showHeart = false,
  rightAction,
}) => {
  return (
    <header className="pt-3 sm:pt-4 pb-3 px-4 sm:px-6 flex flex-col items-center sticky top-0 bg-white/95 backdrop-blur-md z-20 border-b border-gray-100 shadow-2xs">
      <div className="relative w-full min-h-10 flex items-center justify-center">
        <button
          onClick={onBack}
          className="absolute left-0 p-2 rounded-full hover:bg-pink-50 transition-colors text-pink-600 focus:outline-none"
          aria-label="Go back"
        >
          <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
        </button>
        <div className="text-center max-w-[calc(100%-3.5rem)]">
          <h1 className="text-lg sm:text-xl font-bold text-pink-600 tracking-tight leading-tight">{title}</h1>
          {subtitle && <p className="text-[11px] sm:text-xs text-gray-500 font-medium mt-0.5 leading-tight">{subtitle}</p>}
        </div>
        {rightAction && (
          <div className="absolute right-0 flex items-center">
            {rightAction}
          </div>
        )}
      </div>
      {showHeart && (
        <div className="mt-1 text-pink-500">
          <Heart className="w-4 h-4 fill-pink-500 stroke-pink-500" />
        </div>
      )}
    </header>
  );
};
