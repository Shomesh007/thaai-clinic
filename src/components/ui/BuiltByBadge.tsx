import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export const GSV_URL = 'https://www.builtbygsv.in';

/**
 * Small "crafted by" footer shown at the end of long screens.
 * Uses real anchors so crawlers can follow both the internal credits page
 * and the studio's site; the click is intercepted for in-app navigation.
 */
export const BuiltByBadge: React.FC<{ onOpenCredits: () => void; className?: string }> = ({
  onOpenCredits,
  className = '',
}) => (
  <footer className={`pt-2 pb-1 flex flex-col items-center gap-1.5 ${className}`}>
    <motion.a
      href="/credits"
      onClick={(e) => {
        e.preventDefault();
        onOpenCredits();
      }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="group inline-flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full bg-white border border-gray-100 shadow-2xs"
    >
      <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-[8px] font-black tracking-tight flex items-center justify-center">
        GSV
      </span>
      <span className="text-[10px] font-bold text-gray-500">
        Website crafted in Karaikal by{' '}
        <span className="text-gray-900 font-extrabold group-hover:text-pink-600 transition-colors">builtbygsv.in</span>
      </span>
      <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-pink-600 transition-colors" />
    </motion.a>
    <a
      href={GSV_URL}
      target="_blank"
      rel="noopener"
      className="sr-only focus:not-sr-only text-[10px] text-gray-400"
    >
      GSV – Web &amp; software developer in Karaikal
    </a>
  </footer>
);
