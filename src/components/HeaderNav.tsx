import React from 'react';
import { ChevronLeft, Heart } from 'lucide-react';

interface HeaderNavProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  showHeart?: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  title,
  subtitle,
  onBack,
  showHeart = false,
}) => {
  return (
    <header className="pt-10 pb-4 px-6 flex flex-col items-center sticky top-0 bg-white/95 backdrop-blur-md z-20 border-b border-gray-100 shadow-2xs">
      <div className="w-full flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-pink-50 transition-colors text-pink-600 focus:outline-none"
          aria-label="Go back"
        >
          <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
        </button>
        <div className="text-center flex-1 pr-6">
          <h1 className="text-xl font-bold text-pink-600 tracking-tight">{title}</h1>
          {subtitle && <p className="text-xs text-gray-500 font-medium mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {showHeart && (
        <div className="mt-2 text-pink-500">
          <Heart className="w-4 h-4 fill-pink-500 stroke-pink-500" />
        </div>
      )}
    </header>
  );
};
