import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Code2, MapPin, Sparkles, Heart } from 'lucide-react';
import { HeaderNav } from './HeaderNav';
import { TabType } from '../types';
import { EASE_OUT, Reveal, fadeUp, stagger } from './ui/Motion';
import { GSV_URL } from './ui/BuiltByBadge';

interface CreditsScreenProps {
  setActiveTab: (tab: TabType) => void;
}

const RX_ITEMS = [
  { drug: 'React 19 + Vite', dose: 'One fast, mobile-first app', freq: 'Take daily' },
  { drug: 'Tailwind CSS', dose: 'A calm, consistent design system', freq: 'Apply generously' },
  { drug: 'Motion', dose: 'Gentle, purposeful animation', freq: 'As needed' },
  { drug: 'Supabase', dose: 'Secure online appointment booking', freq: '24 × 7' },
  { drug: 'Schema.org + SEO', dose: 'Structured data for search & AI', freq: 'So Karaikal can find us' },
];

const CREDITS_ROLL = [
  { role: 'Design & Development', name: 'GSV · builtbygsv.in' },
  { role: 'UI & Motion Design', name: 'GSV' },
  { role: 'Clinical Content', name: 'Dr. Sakthimaindan Karthigeyan' },
  { role: 'Clinic', name: 'Thaai Clinic, Karaikal' },
  { role: 'Booking Backend', name: 'Supabase' },
  { role: 'Built with', name: 'React · Vite · Tailwind CSS · Motion' },
  { role: 'Icons', name: 'Lucide' },
  { role: 'Filmed on location', name: 'Karaikal, Puducherry' },
  { role: 'Special thanks', name: 'Every patient who walks in' },
];

/** Round rubber stamp with text on a circular path. */
const Stamp: React.FC<{ stampKey: number; onStamp: () => void }> = ({ stampKey, onStamp }) => (
  <motion.button
    type="button"
    onClick={onStamp}
    aria-label="Stamp again"
    initial={{ scale: 2.4, rotate: -40, opacity: 0 }}
    whileInView={{ scale: 1, rotate: -14, opacity: 0.92 }}
    viewport={{ once: true, amount: 0.8 }}
    transition={{ type: 'spring', stiffness: 520, damping: 18, delay: stampKey === 0 ? 1.1 : 0 }}
    className="w-[92px] h-[92px] cursor-pointer select-none"
  >
    <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
      <defs>
        <path id="gsv-stamp-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
      </defs>
      <circle cx="50" cy="50" r="47" fill="none" stroke="#C2185B" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="#C2185B" strokeWidth="1.2" strokeDasharray="2 2" />
      <text fill="#C2185B" fontSize="8.4" fontWeight="800" letterSpacing="1.6">
        <textPath href="#gsv-stamp-circle">BUILT IN KARAIKAL • BUILTBYGSV.IN •</textPath>
      </text>
      <text x="50" y="49" textAnchor="middle" fill="#C2185B" fontSize="15" fontWeight="900" letterSpacing="0.5">
        GSV
      </text>
      <text x="50" y="60" textAnchor="middle" fill="#C2185B" fontSize="5.5" fontWeight="800" letterSpacing="1">
        APPROVED
      </text>
    </svg>
  </motion.button>
);

export const CreditsScreen: React.FC<CreditsScreenProps> = ({ setActiveTab }) => {
  const [stampKey, setStampKey] = useState(0);

  const restamp = () => {
    setStampKey((k) => k + 1);
    try {
      navigator.vibrate?.(18);
    } catch {
      /* vibration not supported */
    }
  };

  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <section
      aria-label="Website credits – designed and developed by GSV (builtbygsv.in), web developer in Karaikal"
      className="flex-1 overflow-y-auto pb-28 bg-[#FBF7F2]"
    >
      <HeaderNav title="Credits" subtitle="The people & tools behind this app" onBack={() => setActiveTab('home')} />

      <div className="px-4 pt-5 space-y-7">
        {/* ── INTRO ─────────────────────────────────────────────────── */}
        <motion.div variants={stagger(0.05, 0.08)} initial="hidden" animate="show" className="text-center px-3">
          <motion.p variants={fadeUp} className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-pink-500">
            A prescription for being found online
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-[22px] font-extrabold text-gray-900 tracking-tight leading-tight mt-2">
            This website was <span className="text-shimmer">prescribed</span>
            <br />
            &amp; crafted by GSV
          </motion.h1>
          <motion.p variants={fadeUp} className="text-xs text-gray-500 font-medium leading-relaxed mt-2">
            Designed and developed in Karaikal by{' '}
            <a href={GSV_URL} target="_blank" rel="noopener" className="font-extrabold text-gray-900 underline decoration-pink-300 underline-offset-2">
              builtbygsv.in
            </a>{' '}
            — a web &amp; software studio building for clinics and businesses across Karaikal and Puducherry.
          </motion.p>
        </motion.div>

        {/* ── THE PRESCRIPTION PAD ──────────────────────────────────── */}
        <motion.article
          initial={{ opacity: 0, y: 40, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -0.6 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.25 }}
          aria-label="Digital prescription from GSV to Thaai Clinic"
          className="relative bg-white rounded-[22px] shadow-[0_18px_40px_-18px_rgba(74,13,38,0.35)] border border-[#F1E6DA] overflow-hidden"
        >
          {/* Perforated top edge */}
          <div className="h-2.5 bg-[radial-gradient(circle_at_6px_0,transparent_4px,#E91E63_4.5px)] bg-[length:12px_10px]" aria-hidden="true" />

          {/* Letterhead */}
          <header className="px-5 pt-4 pb-3 flex items-start justify-between border-b-2 border-dashed border-pink-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-black text-gray-900 tracking-tight leading-none">GSV</p>
                <p className="text-[9.5px] font-bold text-gray-500 mt-1 leading-none">Web &amp; Software Studio</p>
                <p className="text-[9.5px] font-bold text-pink-600 mt-0.5 leading-none flex items-center gap-0.5">
                  <MapPin className="w-2.5 h-2.5" /> Karaikal, Puducherry
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[8.5px] font-extrabold uppercase tracking-widest text-gray-400">Reg. No.</p>
              <a href={GSV_URL} target="_blank" rel="noopener" className="text-[11px] font-extrabold text-gray-900 hover:text-pink-600">
                builtbygsv.in
              </a>
              <p className="text-[9px] font-semibold text-gray-400 mt-0.5">{today}</p>
            </div>
          </header>

          {/* Patient block */}
          <div className="px-5 py-3 grid grid-cols-2 gap-y-2 gap-x-3 text-[11px] bg-[#FFFBF5]">
            <div>
              <p className="text-[8.5px] font-extrabold uppercase tracking-widest text-gray-400">Patient</p>
              <p className="font-extrabold text-gray-900">Thaai Clinic</p>
            </div>
            <div>
              <p className="text-[8.5px] font-extrabold uppercase tracking-widest text-gray-400">Age</p>
              <p className="font-extrabold text-gray-900">Newly established</p>
            </div>
            <div className="col-span-2">
              <p className="text-[8.5px] font-extrabold uppercase tracking-widest text-gray-400">Chief complaint</p>
              <p className="font-semibold text-gray-700 leading-snug">
                Families in Karaikal couldn’t find, call or book the clinic online.
              </p>
            </div>
          </div>

          {/* Rx items */}
          <div className="px-5 pt-4 pb-2 relative">
            <span className="absolute left-4 top-2 text-[40px] leading-none font-serif italic font-bold text-pink-600/90 select-none" aria-hidden="true">
              ℞
            </span>
            <motion.ol
              variants={stagger(0.6, 0.14)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="pl-10 space-y-3"
            >
              {RX_ITEMS.map((item, i) => (
                <motion.li key={item.drug} variants={fadeUp} className="relative">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[13px] font-extrabold text-gray-900">
                      <span className="text-pink-500 mr-1 tabular-nums">{i + 1}.</span>
                      {item.drug}
                    </p>
                    <span className="text-[9.5px] font-extrabold text-pink-600 bg-pink-50 px-1.5 py-0.5 rounded-md whitespace-nowrap">
                      {item.freq}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium italic">{item.dose}</p>
                  {/* hand-drawn underline */}
                  <svg className="w-full h-2 mt-0.5" viewBox="0 0 200 8" preserveAspectRatio="none" aria-hidden="true">
                    <motion.path
                      d="M2 5 C 50 1, 90 8, 140 4 S 190 3, 198 5"
                      stroke="#F8BBD0"
                      strokeWidth="1.6"
                      fill="none"
                      strokeLinecap="round"
                      variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.7, ease: 'easeOut' } } }}
                    />
                  </svg>
                </motion.li>
              ))}
            </motion.ol>
          </div>

          {/* Advice + signature + stamp */}
          <div className="px-5 pt-2 pb-5 flex items-end justify-between gap-3">
            <div className="flex-1">
              <p className="text-[8.5px] font-extrabold uppercase tracking-widest text-gray-400">Advice</p>
              <p className="text-[11px] text-gray-600 font-medium leading-snug">
                Review every quarter. Keep content fresh. Visit the studio if a slow website returns.
              </p>
              <svg viewBox="0 0 160 50" className="w-32 h-10 mt-2" aria-label="Signature of GSV">
                <motion.path
                  d="M8 34 C 14 10, 34 8, 30 24 C 27 36, 12 40, 14 30 C 16 22, 36 22, 40 30 C 44 38, 50 18, 56 20 C 62 22, 52 36, 60 36 C 70 36, 72 14, 80 16 C 86 18, 78 34, 86 34 C 96 34, 98 12, 106 22 L 112 36 L 124 10 M 70 42 C 100 38, 130 40, 152 36"
                  stroke="#1F2937"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.3 }}
                />
              </svg>
              <p className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest border-t border-gray-200 pt-1 w-32">
                GSV · Developer
              </p>
            </div>
            <Stamp key={stampKey} stampKey={stampKey} onStamp={restamp} />
          </div>
        </motion.article>
        <p className="text-center text-[10px] font-semibold text-gray-400 -mt-4">Psst — tap the stamp.</p>

        {/* ── END CREDITS ROLL ──────────────────────────────────────── */}
        <Reveal as="section" aria-label="End credits">
          <div className="relative h-64 rounded-3xl bg-[#140810] overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-dots opacity-20" aria-hidden="true" />
            <div
              className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)]"
            >
              <div className="text-center animate-credits-roll hover:[animation-play-state:paused]">
                {[0, 1].map((copy) => (
                  <div key={copy} aria-hidden={copy === 1} className="py-8 space-y-5">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-pink-400">Thaai Clinic</p>
                    <p className="text-lg font-extrabold text-white tracking-tight -mt-3">The Making Of</p>
                    {CREDITS_ROLL.map((c) => (
                      <div key={c.role}>
                        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/45">{c.role}</p>
                        <p className="text-[13px] font-extrabold text-white mt-0.5">{c.name}</p>
                      </div>
                    ))}
                    <Heart className="w-4 h-4 text-pink-500 fill-pink-500 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── FOR LOCAL BUSINESSES ──────────────────────────────────── */}
        <Reveal
          as="section"
          aria-label="Hire GSV – web and software developer in Karaikal"
          className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-[#FF2D75] via-[#E91E63] to-[#AD1457] text-white shadow-xl shadow-pink-900/20"
        >
          <div className="absolute inset-0 bg-dots opacity-50" aria-hidden="true" />
          <Sparkles className="absolute right-4 top-4 w-6 h-6 text-amber-200 animate-float" aria-hidden="true" />
          <div className="relative">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-pink-100">Your business next?</p>
            <h2 className="text-lg font-extrabold leading-snug tracking-tight mt-1.5">
              Looking for a web or software developer in Karaikal?
            </h2>
            <p className="text-xs text-pink-50/90 font-medium leading-relaxed mt-2">
              GSV designs and builds fast, mobile-first websites, booking systems and web apps for clinics, shops,
              schools and startups in Karaikal, Puducherry and beyond.
            </p>
            <ul className="flex flex-wrap gap-1.5 mt-3">
              {['Clinic websites', 'Online booking', 'Local SEO', 'Web apps', 'Tamil + English'].map((t) => (
                <li key={t} className="text-[10px] font-extrabold bg-white/15 border border-white/25 px-2.5 py-1 rounded-full">
                  {t}
                </li>
              ))}
            </ul>
            <motion.a
              href={GSV_URL}
              target="_blank"
              rel="noopener"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="mt-4 w-full bg-white text-pink-700 font-extrabold py-3 rounded-2xl text-xs shadow-lg flex items-center justify-center gap-1.5"
            >
              Visit builtbygsv.in <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
        </Reveal>

        <p className="text-center text-[10px] text-gray-400 font-semibold pb-2">
          Made with care in Karaikal · © {new Date().getFullYear()} Thaai Clinic
        </p>
      </div>

      {/* ── JSON-LD: credit the creator ───────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'Website Credits – Thaai Clinic Karaikal',
            url: 'https://thaaiclinic.com/credits',
            about: { '@id': 'https://thaaiclinic.com/#clinic' },
            creator: { '@id': `${GSV_URL}/#organization` },
            mainEntity: {
              '@type': 'Organization',
              '@id': `${GSV_URL}/#organization`,
              name: 'GSV',
              alternateName: 'builtbygsv.in',
              url: GSV_URL,
              description: 'Web and software development studio in Karaikal, Puducherry, building websites, booking systems and web apps.',
              areaServed: [
                { '@type': 'City', name: 'Karaikal' },
                { '@type': 'State', name: 'Puducherry' },
              ],
              knowsAbout: ['Web Development', 'Software Development', 'Website Design', 'Local SEO', 'React', 'Web Applications'],
            },
          }),
        }}
      />
    </section>
  );
};
