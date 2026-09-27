import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, type Variants } from 'motion/react';
import { KolamMark } from './Kolam';

/**
 * Shared motion primitives for the Thaai Clinic app.
 * Everything here respects the global <MotionConfig reducedMotion="user"> set in App.
 */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export const stagger = (delayChildren = 0.05, staggerChildren = 0.07): Variants => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

type RevealProps = {
  as?: 'div' | 'section' | 'ul' | 'li' | 'article' | 'header' | 'footer';
  delay?: number;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof motion.div>, 'children'>;

/** Fades + lifts its content in when it scrolls into view (once). */
export const Reveal: React.FC<RevealProps> = ({ as = 'div', delay = 0, children, ...rest }) => {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
};

/** Container that staggers direct `motion` children using the `fadeUp` variant. */
export const Stagger: React.FC<
  { children: React.ReactNode; className?: string; delay?: number; gap?: number; inView?: boolean } & Omit<
    React.ComponentProps<typeof motion.div>,
    'children'
  >
> = ({ children, className, delay = 0.05, gap = 0.07, inView = false, ...rest }) => (
  <motion.div
    className={className}
    variants={stagger(delay, gap)}
    initial="hidden"
    {...(inView ? { whileInView: 'show', viewport: { once: true, amount: 0.2 } } : { animate: 'show' })}
    {...rest}
  >
    {children}
  </motion.div>
);

/** Counts up from 0 to `value` the first time it becomes visible. */
export const CountUp: React.FC<{ value: number; suffix?: string; className?: string; duration?: number }> = ({
  value,
  suffix = '',
  className,
  duration = 1.4,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
};

/** Section heading: display-type title with the kolam mark and an optional plain-language note. */
export const SectionTitle: React.FC<{
  title: string;
  note?: string;
  aside?: React.ReactNode;
}> = ({ title, note, aside }) => (
  <div className="flex items-end justify-between gap-3 mb-4">
    <div>
      <div className="flex items-center gap-1.5">
        <KolamMark className="w-[18px] h-[18px] text-rose shrink-0" />
        <h3 className="font-display text-[21px] font-bold text-plum tracking-[-0.02em] leading-none">{title}</h3>
      </div>
      {note && <p className="text-[13px] text-plum/60 leading-snug mt-1.5">{note}</p>}
    </div>
    {aside}
  </div>
);
