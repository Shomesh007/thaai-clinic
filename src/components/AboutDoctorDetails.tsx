import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { TabType } from '../types';
import { EASE_OUT, SectionTitle } from './ui/Motion';
import { DayStrip, OpenStatusPill } from './ui/OpenStatus';
import { BuiltByBadge } from './ui/BuiltByBadge';
import { Kolam, Seal } from './ui/Kolam';

/**
 * Everything on the About page below the hero + bio: care promise, a tabbed
 * profile (training / practice / areas of care) and the visit plate.
 * Designed to keep the page short — one tab of detail at a time.
 */

const CERTIFICATES = [
  {
    kind: 'Degree',
    title: 'MBBS',
    full: 'MBBS – Bachelor of Medicine & Surgery',
    institution: 'Indira Gandhi Medical College & Research Institute',
    year: '2019 – 2025',
    seal: 'IG',
    sealColor: '#3B0A24',
    note: 'Graduated with distinction. Completed foundational rotational duties in Surgery, Medicine & Emergency Medicine.',
  },
  {
    kind: 'Fellowship trainee',
    title: 'Diabetes Mellitus',
    full: 'Fellowship Trainee – Diabetes Mellitus',
    institution: 'Apollo Hospital, Chennai',
    year: '2024',
    seal: 'AH',
    sealColor: '#D81B60',
    note: 'Intensive training in advanced diabetology; hands-on experience managing complex diabetes cases & complications.',
  },
  {
    kind: 'Certification',
    title: 'Advanced Diabetes',
    full: 'Advanced Certification in Diabetes',
    institution: 'Apollo Hospitals',
    year: '',
    seal: 'AH',
    sealColor: '#D81B60',
    note: '',
  },
  {
    kind: 'UK accredited',
    title: 'Diabetes Fellowship',
    full: 'Fellowship in Diabetes Mellitus (UK Accreditation)',
    institution: 'MedVersity FZC',
    year: '1-year course',
    seal: 'MV',
    sealColor: '#E3A018',
    note: '',
  },
  {
    kind: 'Fellowship',
    title: 'Diabetes Fellowship',
    full: 'Fellowship in Diabetes Mellitus',
    institution: 'Medvarsity',
    year: '',
    seal: 'MV',
    sealColor: '#E3A018',
    note: '',
  },
];

const PRACTICE_GROUPS = [
  {
    place: 'Pondicherry',
    stops: [
      { id: 'nmc', name: 'New Medical Centre', role: 'Doctor', desc: 'Provided critical care, managed ventilators, and performed emergency procedures.' },
      { id: 'mvr', name: 'MVR Hospital', role: 'Medical officer', desc: 'Handled both inpatient and outpatient departments, ensuring continuity of care.' },
      { id: 'nallam', name: 'Nallam Clinic', role: 'Medical officer', desc: 'Handled both inpatient and outpatient departments, ensuring continuity of care.' },
    ],
  },
  {
    place: 'Pondicherry & Karaikal',
    stops: [
      {
        id: 'dmo',
        name: '10+ hospitals',
        role: 'Relieving duty medical officer',
        desc: 'Versatile medical coverage across more than 10 hospitals and medical centres — emergency and ward care, adapting quickly to different clinical environments, patients and hospital protocols.',
      },
    ],
  },
  {
    place: 'Industry & online',
    stops: [
      { id: 'plant', name: 'Thirusuvanai Power Plant', role: 'Doctor', desc: 'Primary and emergency services for industrial employees.' },
      { id: 'tele', name: 'Telemedicine', role: 'Doctor', desc: 'Remote consultations delivered through telemedicine platforms.' },
    ],
  },
];

const ALL_STOPS = PRACTICE_GROUPS.flatMap((g) => g.stops);

const TABS = [
  { id: 'training', label: 'Training' },
  { id: 'practice', label: 'Practice' },
  { id: 'care', label: 'Areas of care' },
] as const;
type TabId = (typeof TABS)[number]['id'];

/** Wavy hand-drawn underline for key phrases in the care promise. */
const Mark: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="underline decoration-wavy decoration-rose/55 decoration-[1.5px] underline-offset-[6px]">
    {children}
  </span>
);

// ── Training: swipeable certificates that flip for detail ───────────────────
const CertificateCard: React.FC<{ cert: (typeof CERTIFICATES)[number] }> = ({ cert }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${cert.full}, ${cert.institution}. Tap to ${flipped ? 'show front' : 'read details'}.`}
      className="snap-center shrink-0 w-[78%] h-[196px] text-left cursor-pointer [perspective:1000px]"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div className="absolute inset-0 rounded-[22px] bg-white p-4 [backface-visibility:hidden] shadow-[0_1px_0_rgba(59,10,36,0.06),0_12px_28px_-18px_rgba(59,10,36,0.35)]">
          <div className="absolute inset-[7px] rounded-[16px] border border-dashed border-plum/15 pointer-events-none" />
          <div className="relative h-full flex flex-col">
            <div className="flex items-start justify-between">
              <span className="text-[12px] font-semibold text-rose">{cert.kind}</span>
              <Seal initials={cert.seal} color={cert.sealColor} className="w-12 h-12 -mt-1 -mr-1" />
            </div>
            <p className="font-display text-[24px] font-bold text-plum leading-[1.02] tracking-[-0.02em] mt-1">{cert.title}</p>
            <p className="text-[12.5px] text-plum/65 leading-snug mt-1.5">{cert.institution}</p>
            <div className="mt-auto flex items-end justify-between">
              <span className="text-[12px] font-semibold text-plum/45">{cert.year || ' '}</span>
              <span className="text-[11px] font-semibold text-plum/35">Tap for details</span>
            </div>
          </div>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-[22px] bg-plum text-white p-4 flex flex-col [backface-visibility:hidden]"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <p className="font-display text-[16px] font-bold leading-snug">{cert.full}</p>
          <p className="text-[12px] text-white/70 mt-1">{cert.institution}</p>
          <p className="text-[12.5px] text-white/85 leading-relaxed mt-3">
            {cert.note || `Awarded by ${cert.institution}${cert.year ? `, ${cert.year.toLowerCase()}` : ''}.`}
          </p>
          <span className="mt-auto text-[11px] font-semibold text-white/40">Tap to flip back</span>
        </div>
      </motion.div>
    </button>
  );
};

const TrainingPanel: React.FC = () => {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = railRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const stride = card.offsetWidth + 12;
    setActive(Math.min(CERTIFICATES.length - 1, Math.max(0, Math.round(el.scrollLeft / stride))));
  };

  return (
    <div>
      <p className="text-[14px] text-plum/75 leading-relaxed mb-3">
        An MBBS graduate with <strong className="text-plum">four diabetes credentials</strong>, including a UK-accredited
        fellowship. Swipe through, tap any card for details.
      </p>
      <div
        ref={railRef}
        onScroll={onScroll}
        className="-mx-4 px-4 flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-3 pt-1"
      >
        {CERTIFICATES.map((c) => (
          <CertificateCard key={c.full} cert={c} />
        ))}
        <span className="shrink-0 w-[10%]" aria-hidden="true" />
      </div>
      <div className="flex justify-center gap-1.5" aria-hidden="true">
        {CERTIFICATES.map((c, i) => (
          <motion.span
            key={c.full}
            animate={{ width: i === active ? 18 : 6, opacity: i === active ? 1 : 0.3 }}
            className="h-1.5 rounded-full bg-rose"
          />
        ))}
      </div>
    </div>
  );
};

// ── Practice: current role + tappable places ────────────────────────────────
const PracticePanel: React.FC = () => {
  const [selected, setSelected] = useState('dmo');
  const stop = ALL_STOPS.find((s) => s.id === selected)!;

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-[22px] bg-rose text-white p-4">
        <Kolam n={2} step={14} stroke="rgba(255,255,255,0.28)" className="absolute -right-6 -bottom-8 w-32 h-32" />
        <p className="text-[12px] font-semibold text-white/80 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-turmeric" /> Practising now, since July 2025
        </p>
        <p className="font-display text-[22px] font-bold leading-tight tracking-[-0.02em] mt-1">Thaai Clinic, Karaikal</p>
        <p className="relative text-[13px] text-white/85 leading-snug mt-1.5 max-w-[88%]">
          Running the primary care OPD: general medicine, diabetes, child health, preventive and respiratory care.
        </p>
      </div>

      <div>
        <p className="text-[13px] font-semibold text-plum/55 mb-2.5">Before Thaai Clinic — tap a place</p>
        <div className="space-y-3">
          {PRACTICE_GROUPS.map((g) => (
            <div key={g.place}>
              <p className="text-[12px] font-semibold text-plum mb-1.5">{g.place}</p>
              <div className="flex flex-wrap gap-1.5">
                {g.stops.map((s) => {
                  const on = s.id === selected;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelected(s.id)}
                      aria-pressed={on}
                      className={`relative px-3 py-1.5 rounded-full text-[13px] font-semibold cursor-pointer transition-colors ${
                        on ? 'text-white' : 'text-plum bg-white shadow-[inset_0_0_0_1px_rgba(59,10,36,0.12)]'
                      }`}
                    >
                      {on && (
                        <motion.span
                          layoutId="practice-chip"
                          className="absolute inset-0 rounded-full bg-plum"
                          transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                        />
                      )}
                      <span className="relative">{s.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-[18px] bg-white p-3.5 min-h-[92px] shadow-[inset_0_0_0_1px_rgba(59,10,36,0.08)]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={stop.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-[12px] font-semibold text-rose">{stop.role}</p>
              <p className="text-[13.5px] text-plum/80 leading-relaxed mt-0.5">{stop.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ── Areas of care: typographic bento, no clip-art ───────────────────────────
const CarePanel: React.FC<{ onServices: () => void }> = ({ onServices }) => (
  <div className="grid grid-cols-2 gap-2.5">
    <div className="col-span-2 relative overflow-hidden rounded-[22px] bg-plum text-white p-4 min-h-[120px]">
      <Kolam n={3} step={12} stroke="rgba(255,255,255,0.12)" className="absolute -right-16 -top-14 w-44 h-44" />
      <p className="text-[12px] font-semibold text-turmeric">His specialist focus</p>
      <p className="font-display text-[26px] font-bold leading-none tracking-[-0.02em] mt-1.5">Diabetes care</p>
      <p className="relative text-[13px] text-white/75 leading-snug mt-2 max-w-[70%]">
        Sugar control, HbA1c plans and complication checks, backed by four diabetes credentials.
      </p>
    </div>
    {[
      { t: 'Child health', d: 'Vaccines and growth checks', cls: 'bg-white shadow-[inset_0_0_0_1px_rgba(59,10,36,0.08)]' },
      { t: 'Lungs & breathing', d: 'Asthma, cough, wheeze', cls: 'bg-rose/[0.07]' },
      { t: 'Fever & infections', d: 'Seen and treated the same day', cls: 'bg-rose/[0.07]' },
      { t: 'Diet & weight', d: 'Plans made for you', cls: 'bg-white shadow-[inset_0_0_0_1px_rgba(59,10,36,0.08)]' },
    ].map((c) => (
      <div key={c.t} className={`rounded-[20px] p-3.5 ${c.cls}`}>
        <p className="font-display text-[17px] font-bold text-plum leading-tight tracking-[-0.01em]">{c.t}</p>
        <p className="text-[12.5px] text-plum/60 leading-snug mt-1">{c.d}</p>
      </div>
    ))}
    <button
      onClick={onServices}
      className="col-span-2 rounded-[20px] p-3.5 bg-turmeric/15 text-left flex items-center justify-between cursor-pointer"
    >
      <span>
        <span className="block font-display text-[17px] font-bold text-plum leading-tight">Preventive checkups</span>
        <span className="block text-[12.5px] text-plum/60 mt-0.5">BP, sugar and cholesterol for the whole family</span>
      </span>
      <span className="text-[13px] font-semibold text-rose shrink-0 pl-2">All services</span>
    </button>
  </div>
);

export const AboutDoctorDetails: React.FC<{
  setActiveTab: (tab: TabType) => void;
  onOpenWhatsApp?: () => void;
  onOpenCall?: () => void;
}> = ({ setActiveTab, onOpenWhatsApp, onOpenCall }) => {
  const [tab, setTab] = useState<TabId>('training');

  return (
    <>
      {/* ── CARE PROMISE ──────────────────────────────────────────── */}
      <section aria-label="Core Practice Values" className="px-1 pt-3">
        <p className="text-[13px] font-semibold text-rose mb-2">How he practises</p>
        <p className="font-display text-[24px] font-semibold text-plum leading-[1.25] tracking-[-0.02em]">
          The <Mark>patient comes first</Mark>. We <Mark>prevent</Mark> before we cure, lean on{' '}
          <Mark>evidence</Mark>, and always <Mark>listen</Mark> before we prescribe.
        </p>
      </section>

      {/* ── TABBED PROFILE ────────────────────────────────────────── */}
      <section aria-label="Education, Qualifications & Clinical Experience">
        <SectionTitle title="Qualifications & experience" />
        <div role="tablist" className="flex p-1 rounded-full bg-plum/[0.06] mb-4">
          {TABS.map((t) => {
            const on = t.id === tab;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={on}
                onClick={() => setTab(t.id)}
                className={`relative flex-1 py-2 rounded-full text-[13px] font-semibold cursor-pointer transition-colors ${
                  on ? 'text-plum' : 'text-plum/50'
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="about-tab"
                    className="absolute inset-0 rounded-full bg-white shadow-[0_1px_2px_rgba(59,10,36,0.12)]"
                    transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            role="tabpanel"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
          >
            {tab === 'training' && <TrainingPanel />}
            {tab === 'practice' && <PracticePanel />}
            {tab === 'care' && <CarePanel onServices={() => setActiveTab('services')} />}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── VISIT + BOOK ──────────────────────────────────────────── */}
      <section
        aria-label="Thaai Clinic Karaikal Address and Consultation Timings"
        itemScope
        itemType="https://schema.org/MedicalClinic"
      >
        <meta itemProp="name" content="Thaai Clinic Karaikal" />
        <meta itemProp="telephone" content="+918610448427" />
        <SectionTitle title="Visit the clinic" note="Open every day, two sessions." />

        <div className="rounded-[26px] bg-white overflow-hidden shadow-[0_1px_0_rgba(59,10,36,0.05),0_18px_40px_-28px_rgba(59,10,36,0.45)]">
          <div className="p-4">
            <OpenStatusPill />
            <DayStrip className="mt-4" />
          </div>

          <div className="px-4 py-3.5 border-t border-dashed border-plum/10 grid grid-cols-[1fr_auto] gap-3 items-end">
            <p
              className="text-[13.5px] text-plum/80 leading-relaxed"
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <span itemProp="streetAddress">385, Bharathiyar Road, Kovil Pathu</span>,{' '}
              <span itemProp="addressLocality">Karaikal</span> <span itemProp="postalCode">609602</span>,{' '}
              <span itemProp="addressRegion">Puducherry</span>, <span itemProp="addressCountry">India</span>
              <span className="block text-[12px] text-plum/50 mt-0.5">Opposite Kovil Pathu bus stand</span>
            </p>
            <a
              href="https://maps.google.com/?q=Thaai+Clinic+385+Bharathiyar+Road+Kovil+Pathu+Karaikal+609602"
              target="_blank"
              rel="noreferrer"
              className="text-[13px] font-semibold text-rose underline underline-offset-4 decoration-rose/30 whitespace-nowrap"
            >
              Directions
            </a>
          </div>

          <div className="px-4 pb-4 pt-1">
            <a
              href="tel:+918610448427"
              itemProp="telephone"
              onClick={(e) => {
                if (onOpenCall) {
                  e.preventDefault();
                  onOpenCall();
                }
              }}
              className="block font-display text-[26px] font-bold text-plum tracking-[-0.02em]"
            >
              +91 86104 48427
            </a>
            <div className="flex gap-2 mt-3">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveTab('book-appointment')}
                className="flex-1 bg-rose text-white font-semibold py-3 rounded-2xl text-[14px] cursor-pointer"
              >
                Book a visit
              </motion.button>
              {onOpenWhatsApp && (
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={onOpenWhatsApp}
                  className="px-5 bg-[#25D366]/12 text-[#128C4B] font-semibold py-3 rounded-2xl text-[14px] cursor-pointer"
                >
                  WhatsApp
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── SIGN-OFF ──────────────────────────────────────────────── */}
      <section aria-label="Thaai Clinic Mission Statement" className="text-center pt-4">
        <Kolam n={2} step={10} stroke="#D81B60" strokeWidth={1.2} className="w-16 h-16 mx-auto opacity-70" />
        <p className="font-display text-[19px] font-bold text-plum leading-snug tracking-[-0.01em] mt-2 px-6">
          Caring for you and your family with trust, compassion and excellence.
        </p>
        <p className="text-[12.5px] text-plum/50 mt-1.5">Thaai (தாய்) means mother in Tamil.</p>
      </section>

      <BuiltByBadge onOpenCredits={() => setActiveTab('credits')} />
    </>
  );
};
