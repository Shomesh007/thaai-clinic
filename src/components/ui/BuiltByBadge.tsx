import React from 'react';
import { KolamMark } from './Kolam';

export const GSV_URL = 'https://www.builtbygsv.in';

/**
 * Quiet "made by" sign-off at the end of long screens. Real anchors so crawlers
 * can follow both the credits page and the studio's site; the internal click is
 * intercepted for in-app navigation.
 */
export const BuiltByBadge: React.FC<{ onOpenCredits: () => void; className?: string }> = ({
  onOpenCredits,
  className = '',
}) => (
  <footer className={`pt-4 pb-2 text-center ${className}`}>
    <KolamMark className="w-4 h-4 text-plum/25 mx-auto mb-2" />
    <p className="text-[12px] text-plum/50">
      Website made in Karaikal by{' '}
      <a href={GSV_URL} target="_blank" rel="noopener" className="font-semibold text-plum underline decoration-rose/40 underline-offset-2">
        builtbygsv.in
      </a>
    </p>
    <a
      href="/credits"
      onClick={(e) => {
        e.preventDefault();
        onOpenCredits();
      }}
      className="text-[12px] font-semibold text-rose mt-0.5 inline-block"
    >
      See the credits
    </a>
  </footer>
);
