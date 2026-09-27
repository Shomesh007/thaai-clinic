import React, { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  Bell,
  Heart,
  MapPin,
  Phone,
  Calendar,
  Users,
  Award,
  GraduationCap,
  ChevronLeft,
  ChevronDown,
  ShieldPlus,
  Stethoscope,
  Sun,
  Moon,
  Briefcase,
  Navigation,
  MessageCircle,
  Quote,
  Linkedin,
  Sparkles,
  BadgeCheck,
} from 'lucide-react';
import drSakthiImage from '../assets/dr_sakthi_image.jpeg';
import childHealthIcon from '../assets/child_health.png';
import diabetesCareIcon from '../assets/diabetes_care.png';
import respiratoryCareIcon from '../assets/respiratory_care.png';
import generalConsultationIcon from '../assets/general_consulation.png';
import personalisedAttentionIcon from '../assets/personalised_attention.png';
import careForAllAgesIcon from '../assets/care_for_all_ages.png';
import { TabType } from '../types';
import { CountUp, EASE_OUT, Reveal, SectionTitle, fadeUp, stagger } from './ui/Motion';
import { OpenStatusPill } from './ui/OpenStatus';
import { SESSIONS, useClinicStatus } from '../lib/clinicHours';
import { BuiltByBadge } from './ui/BuiltByBadge';

interface AboutDoctorScreenProps {
  setActiveTab: (tab: TabType) => void;
  onOpenNotifications?: () => void;
  onOpenCall?: () => void;
  onOpenWhatsApp?: () => void;
  unreadCount?: number;
}

// ── Structured data for Dr. Sakthimaindan ──────────────────────────────────
const QUALIFICATIONS = [
  {
    degree: 'MBBS – Bachelor of Medicine & Surgery',
    institution: 'Indira Gandhi Medical College & Research Institute',
    year: '2019 – 2025',
    note: 'Graduated with distinction. Completed foundational rotational duties in Surgery, Medicine & Emergency Medicine.',
    tag: 'Degree',
  },
  {
    degree: 'Fellowship Trainee – Diabetes Mellitus',
    institution: 'Apollo Hospital, Chennai',
    year: '2024',
    note: 'Intensive training in advanced diabetology; hands-on experience managing complex diabetes cases & complications.',
    tag: 'Fellowship',
  },
  {
    degree: 'Advanced Certification in Diabetes',
    institution: 'Apollo Hospitals',
    year: '',
    note: '',
    tag: 'Certification',
  },
  {
    degree: 'Fellowship in Diabetes Mellitus (UK Accreditation)',
    institution: 'MedVersity FZC',
    year: '1-Year Course',
    note: '',
    tag: 'UK Accredited',
  },
  {
    degree: 'Fellowship in Diabetes Mellitus',
    institution: 'Medvarsity',
    year: '',
    note: '',
    tag: 'Fellowship',
  },
];

const EXPERIENCE = [
  {
    role: 'Doctor',
    place: 'Thaai Clinic, Karaikal',
    period: 'Jul 2025 – Present',
    desc: 'Running primary care OPD covering general medicine, diabetes management, child health, preventive care & respiratory conditions.',
  },
  {
    role: 'Doctor',
    place: 'New Medical Centre, Pondicherry',
    period: '',
    desc: 'Provided critical care, managed ventilators, and performed emergency procedures.',
  },
  {
    role: 'Medical Officer',
    place: 'Multiple Hospitals & Medical Centers, Pondicherry & Karaikal',
    period: '',
    desc: 'Served as a relieving DMO, providing versatile medical coverage across more than 10 esteemed healthcare facilities. Adapted quickly to diverse clinical environments, patient demographics, and hospital protocols.',
  },
  {
    role: 'Doctor',
    place: 'Thirusuvanai Power Plant & Telemedicine Platforms',
    period: '',
    desc: 'Provided primary/emergency services for industrial employees and delivered remote telemedicine consultations.',
  },
  {
    role: 'Medical Officer',
    place: 'MVR Hospital, Pondicherry & Nallam Clinic, Pondicherry',
    period: '',
    desc: 'Handled both inpatient and outpatient departments, ensuring continuity of care.',
  },
  {
    role: 'Medical Officer',
    place: 'Multiple Hospitals, Pondicherry & Karaikal',
    period: '',
    desc: 'Delivered high-quality emergency and ward care across 10+ hospitals; adapted quickly to varied clinical environments.',
  },
];

const PILLARS = [
  { icon: Heart, title: 'Patient First', sub: 'Your health comes before everything', tint: 'from-pink-500 to-rose-600' },
  { icon: ShieldPlus, title: 'Preventive Care', sub: 'Catch it early, treat it simply', tint: 'from-emerald-500 to-teal-600' },
  { icon: Users, title: 'Trusted Care', sub: 'Evidence-based, every visit', tint: 'from-indigo-500 to-violet-600' },
  { icon: Award, title: 'Compassionate', sub: 'We listen before we prescribe', tint: 'from-amber-500 to-orange-600' },
];

const AREAS_OF_CARE = [
  { img: childHealthIcon, label: 'Child Health', desc: 'Vaccination & growth checks', bg: 'from-pink-50 to-white', ring: 'ring-pink-100' },
  { img: diabetesCareIcon, label: 'Diabetes Care', desc: 'Sugar control & HbA1c plans', bg: 'from-blue-50 to-white', ring: 'ring-blue-100' },
  { img: respiratoryCareIcon, label: 'Pulmonary Care', desc: 'Asthma, cough & breathing', bg: 'from-emerald-50 to-white', ring: 'ring-emerald-100' },
  { img: generalConsultationIcon, label: 'General Consultation', desc: 'Fever, infections & more', bg: 'from-purple-50 to-white', ring: 'ring-purple-100' },
  { img: personalisedAttentionIcon, label: 'Diet & Weight', desc: 'Personal nutrition guidance', bg: 'from-amber-50 to-white', ring: 'ring-amber-100' },
  { img: careForAllAgesIcon, label: 'Preventive Care', desc: 'Checkups for all ages', bg: 'from-indigo-50 to-white', ring: 'ring-indigo-100' },
];

/** Stylised ECG trace that draws itself across the hero. */
const EcgTrace: React.FC = () => (
  <svg
    className="absolute left-0 right-0 bottom-16 w-full h-16 pointer-events-none"
    viewBox="0 0 400 60"
    preserveAspectRatio="none"
    fill="none"
    aria-hidden="true"
  >
    <motion.path
      d="M0 34 H70 L80 34 L88 12 L98 54 L106 24 L114 34 H200 L210 34 L218 8 L228 56 L236 22 L244 34 H330 L338 34 L346 16 L354 50 L362 28 L370 34 H400"
      stroke="rgba(255,255,255,0.55)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
      transition={{ duration: 3.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.6, times: [0, 0.1, 0.85, 1] }}
    />
  </svg>
);

export const AboutDoctorScreen: React.FC<AboutDoctorScreenProps> = ({
  setActiveTab,
  onOpenNotifications,
  onOpenCall,
  onOpenWhatsApp,
  unreadCount = 2,
}) => {
  const scrollRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [openExp, setOpenExp] = useState<number | null>(0);
  const [showAllExp, setShowAllExp] = useState(false);
  const status = useClinicStatus();

  // Compact header fades in once the hero scrolls away
  const { scrollY } = useScroll({ container: scrollRef });
  const barBg = useTransform(scrollY, [120, 200], ['rgba(255,255,255,0)', 'rgba(255,255,255,1)']);
  const barShadow = useTransform(scrollY, [120, 200], ['0 0 0 rgba(0,0,0,0)', '0 1px 0 rgba(17,24,39,0.06)']);
  const barTitleOpacity = useTransform(scrollY, [150, 210], [0, 1]);
  const barIconColor = useTransform(scrollY, [120, 200], ['#FFFFFF', '#DB2777']);
  const barBtnBg = useTransform(scrollY, [120, 200], ['rgba(255,255,255,0.18)', 'rgba(253,242,248,1)']);
  const heroPhotoY = useTransform(scrollY, [0, 260], [0, -30]);
  const heroPhotoScale = useTransform(scrollY, [0, 260], [1, 0.92]);

  // Credentials timeline draws as it scrolls through the viewport
  const { scrollYProgress: timelineProgress } = useScroll({
    container: scrollRef,
    target: timelineRef,
    offset: ['start 85%', 'end 60%'],
  });
  const timelineScale = useSpring(timelineProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  const visibleExperience = showAllExp ? EXPERIENCE : EXPERIENCE.slice(0, 3);

  return (
    <article
      ref={scrollRef}
      aria-label="About Dr. Sakthimaindan Karthigeyan - General Physician at Thaai Clinic Karaikal"
      itemScope
      itemType="https://schema.org/Physician"
      className="flex-1 overflow-y-auto pb-28 bg-[#FAF5F7] text-gray-800 selection:bg-pink-100 selection:text-pink-600 relative"
    >
      {/* ── SEO: Schema.org hidden metadata ─────────────────────────── */}
      <meta itemProp="name" content="Dr. Sakthimaindan Karthigeyan" />
      <meta itemProp="jobTitle" content="General Physician" />
      <meta itemProp="medicalSpecialty" content="General Practice, Diabetes Care, Family Medicine" />
      <meta itemProp="telephone" content="+918610448427" />
      <meta itemProp="url" content="https://thaaiclinic.com/about-doctor" />
      <meta itemProp="alumniOf" content="Indira Gandhi Medical College & Research Institute" />
      <meta itemProp="hasCredential" content="MBBS, Fellowship in Diabetes Mellitus (Apollo, MedVersity FZC – UK Accreditation), Advanced Certification in Diabetes (Apollo Hospitals), Fellowship (Medvarsity)" />
      <meta itemProp="knowsAbout" content="Diabetes Management, Child Health, Preventive Medicine, Respiratory Care, General Consultation, Family Medicine, Telemedicine" />
      <meta itemProp="description" content="Dr. Sakthimaindan Karthigeyan is a General Physician at Thaai Clinic, Karaikal. MBBS from Indira Gandhi Medical College (2019–2025, graduated with distinction), with specialised Fellowships in Diabetes Mellitus from Apollo Chennai, MedVersity FZC (UK Accreditation), and Medvarsity. He has served as Medical Officer across 10+ hospitals in Pondicherry & Karaikal and delivers compassionate family care in general medicine, diabetes, child health & preventive care." />

      {/* ── STICKY SCROLL-AWARE HEADER ───────────────────────────────── */}
      <motion.header
        style={{ backgroundColor: barBg, boxShadow: barShadow }}
        className="sticky top-0 z-30 h-14 -mb-14 px-3 flex items-center justify-between backdrop-blur-[2px]"
      >
        <motion.button
          onClick={() => setActiveTab('home')}
          style={{ color: barIconColor, backgroundColor: barBtnBg }}
          whileTap={{ scale: 0.9 }}
          className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </motion.button>
        <motion.div style={{ opacity: barTitleOpacity }} className="text-center">
          <p className="text-sm font-extrabold text-pink-600 leading-tight">About Doctor</p>
          <p className="text-[10px] text-gray-500 font-semibold leading-tight">Dr. Sakthimaindan Karthigeyan</p>
        </motion.div>
        {onOpenNotifications ? (
          <motion.button
            onClick={onOpenNotifications}
            style={{ color: barIconColor, backgroundColor: barBtnBg }}
            whileTap={{ scale: 0.9 }}
            className="relative w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-[18px] h-[18px] stroke-[2.2]" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-amber-400 text-pink-950 text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                {unreadCount}
              </span>
            )}
          </motion.button>
        ) : (
          <span className="w-9" />
        )}
      </motion.header>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        aria-label="Doctor profile"
        className="relative overflow-hidden bg-gradient-to-br from-[#FF2D75] via-[#E91E63] to-[#AD1457] text-white pt-16 pb-24 px-5"
      >
        <div className="absolute inset-0 bg-dots opacity-60" aria-hidden="true" />
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
        <div className="absolute top-24 -left-20 w-44 h-44 rounded-full bg-amber-300/20 blur-3xl" aria-hidden="true" />
        <EcgTrace />

        <motion.div
          variants={stagger(0.1, 0.08)}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center text-center"
        >
          {/* Photo with rotating gradient ring */}
          <motion.div
            variants={fadeUp}
            style={{ y: heroPhotoY, scale: heroPhotoScale }}
            className="relative mb-4"
          >
            <motion.div
              aria-hidden="true"
              className="absolute -inset-[5px] rounded-[34px]"
              style={{ background: 'conic-gradient(from 0deg, #FFD54F, #FFFFFF, #FF80AB, #FFD54F)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative w-32 h-32 rounded-[30px] overflow-hidden border-4 border-[#E91E63] bg-pink-100">
              <img
                src={drSakthiImage}
                alt="Dr. Sakthimaindan Karthigeyan"
                className="w-full h-full object-cover"
                itemProp="image"
              />
            </div>
            <motion.span
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7, type: 'spring', stiffness: 380, damping: 16 }}
              className="absolute -bottom-2 -right-3 bg-white text-pink-600 rounded-full p-1.5 shadow-lg"
              title="Verified qualifications"
            >
              <BadgeCheck className="w-5 h-5 fill-pink-600 stroke-white" />
            </motion.span>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-pink-100/90"
          >
            Your family doctor in Karaikal
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[26px] font-extrabold tracking-tight leading-[1.1] mt-1.5"
            itemProp="name"
          >
            Dr. Sakthimaindan
            <br />
            Karthigeyan
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm font-semibold text-pink-50 mt-1.5">
            <span itemProp="jobTitle">General Physician</span> ·{' '}
            <span itemProp="worksFor" itemScope itemType="https://schema.org/MedicalClinic">
              <span itemProp="name">Thaai Clinic, Karaikal</span>
            </span>
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-1.5 mt-3">
            {['MBBS', 'Fellowship – Diabetes', 'ACDM UK'].map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-extrabold bg-white/15 border border-white/25 backdrop-blur-md px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-3">
            <OpenStatusPill tone="dark" />
          </motion.div>
        </motion.div>

        {/* Curved bottom edge */}
        <svg
          className="absolute -bottom-px left-0 w-full h-10 text-[#FAF5F7]"
          viewBox="0 0 400 40"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 40 C120 0 280 0 400 40 Z" fill="currentColor" />
        </svg>
      </section>

      <div className="px-4 -mt-16 relative z-10 space-y-6 max-w-[430px] mx-auto">
        {/* ── STATS STRIP ───────────────────────────────────────────── */}
        <motion.section
          aria-label="At a glance"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: EASE_OUT }}
          className="bg-white rounded-3xl p-4 shadow-xl shadow-pink-900/5 border border-pink-100/70 grid grid-cols-3 divide-x divide-pink-100"
        >
          {[
            { value: 10, suffix: '+', label: 'Hospitals\nserved' },
            { value: 4, suffix: '', label: 'Diabetes\ncredentials' },
            { value: 2, suffix: '', label: 'Sessions\nevery day' },
          ].map((s) => (
            <div key={s.label} className="text-center px-1">
              <CountUp
                value={s.value}
                suffix={s.suffix}
                className="block text-2xl font-extrabold tracking-tight text-shimmer tabular-nums"
              />
              <span className="block text-[10px] font-bold text-gray-500 leading-tight mt-0.5 whitespace-pre-line">
                {s.label}
              </span>
            </div>
          ))}
        </motion.section>

        {/* ── BIO ───────────────────────────────────────────────────── */}
        <Reveal as="section" aria-label="Biography" className="relative bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs overflow-hidden">
          <Quote className="absolute -top-1 -right-1 w-20 h-20 text-pink-50 rotate-180" aria-hidden="true" />
          <p className="relative text-[13px] text-gray-700 font-medium leading-relaxed" itemProp="description">
            General Physician at Thaai Clinic, Karaikal. MBBS from Indira Gandhi Medical College (2019–2025, graduated
            with distinction). Specialised Fellowships in Diabetes from Apollo Chennai, MedVersity FZC (UK Accreditation)
            & Medvarsity. Served as Medical Officer across 10+ hospitals in Pondicherry & Karaikal.
          </p>
          <p className="relative text-[11px] text-gray-500 leading-relaxed mt-2.5">
            Patients may also search for the doctor as <strong className="text-gray-700">Dr. Sakthi Maindan</strong> or{' '}
            <strong className="text-gray-700">Dr Sakthi Maindan</strong>.
          </p>
          <motion.a
            href="https://www.linkedin.com/in/sakthimaindan-k-karthigeyan-409b64261/"
            target="_blank"
            rel="noreferrer"
            whileHover={{ x: 3 }}
            className="relative inline-flex items-center gap-1.5 mt-3 text-[11px] font-extrabold text-[#0A66C2] bg-[#0A66C2]/8 px-3 py-1.5 rounded-full"
          >
            <Linkedin className="w-3.5 h-3.5 fill-[#0A66C2] stroke-none" /> View LinkedIn profile
          </motion.a>
        </Reveal>

        {/* ── CORE PILLARS ──────────────────────────────────────────── */}
        <section aria-label="Core Practice Values">
          <SectionTitle eyebrow="How we practise" title="Care philosophy" icon={<Sparkles className="w-4 h-4" />} />
          <motion.div
            variants={stagger(0, 0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 gap-2.5"
          >
            {PILLARS.map(({ icon: Icon, title, sub, tint }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-2xs"
              >
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${tint} text-white flex items-center justify-center shadow-md mb-2.5`}>
                  <Icon className="w-[18px] h-[18px] stroke-[2.2]" />
                </div>
                <h3 className="text-xs font-extrabold text-gray-900">{title}</h3>
                <p className="text-[10.5px] text-gray-500 font-medium leading-snug mt-0.5">{sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── EDUCATION & QUALIFICATIONS ────────────────────────────── */}
        <section aria-label="Education & Qualifications">
          <SectionTitle
            eyebrow="Credentials"
            title="Education & Qualifications"
            icon={<GraduationCap className="w-4 h-4" />}
          />
          <div ref={timelineRef} className="relative bg-white rounded-3xl p-4 pl-5 border border-gray-100 shadow-2xs">
            {/* Track + scroll-linked fill */}
            <div className="absolute left-[27px] top-7 bottom-7 w-[2px] bg-pink-100 rounded-full" aria-hidden="true" />
            <motion.div
              style={{ scaleY: timelineScale }}
              className="absolute left-[27px] top-7 bottom-7 w-[2px] bg-gradient-to-b from-pink-500 to-rose-600 rounded-full origin-top"
              aria-hidden="true"
            />
            <ol className="space-y-4">
              {QUALIFICATIONS.map((q, i) => (
                <motion.li
                  key={q.degree}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.04 }}
                  className="relative pl-8"
                >
                  <span
                    className={`absolute left-0 top-0.5 w-[18px] h-[18px] rounded-full border-[3px] border-white shadow-md ${
                      i === 0 ? 'bg-pink-600 ring-4 ring-pink-100' : 'bg-pink-500 ring-2 ring-pink-50'
                    }`}
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-pink-600 bg-pink-50 border border-pink-100 px-2 py-0.5 rounded-full">
                      {q.tag}
                    </span>
                    {q.year && <span className="text-[10px] text-gray-400 font-bold">{q.year}</span>}
                  </div>
                  <h4 className="font-extrabold text-gray-900 text-[13px] leading-snug mt-1">{q.degree}</h4>
                  <p className="text-[11px] text-pink-600 font-semibold mt-0.5">{q.institution}</p>
                  {q.note && <p className="text-[11px] text-gray-500 font-medium leading-snug mt-1">{q.note}</p>}
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── CLINICAL EXPERIENCE ───────────────────────────────────── */}
        <section aria-label="Clinical Experience">
          <SectionTitle
            eyebrow="10+ hospitals · Pondicherry & Karaikal"
            title="Clinical Experience"
            icon={<Briefcase className="w-4 h-4" />}
          />
          <div className="space-y-2">
            <AnimatePresence initial={false}>
              {visibleExperience.map((e, i) => {
                const isOpen = openExp === i;
                const isCurrent = e.period.includes('Present');
                return (
                  <motion.div
                    key={`${e.place}-${i}`}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                    className={`rounded-2xl border overflow-hidden ${
                      isCurrent ? 'bg-gradient-to-br from-pink-50 to-white border-pink-200' : 'bg-white border-gray-100'
                    } shadow-2xs`}
                  >
                    <button
                      onClick={() => setOpenExp(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center gap-3 p-3.5 text-left cursor-pointer"
                    >
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[11px] font-extrabold ${
                          isCurrent ? 'bg-pink-600 text-white shadow-md shadow-pink-200' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-extrabold text-gray-900">{e.role}</h4>
                          {isCurrent && (
                            <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-px rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-pink-600 font-semibold leading-snug truncate">{e.place}</p>
                      </div>
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <ChevronDown className="w-4 h-4 text-pink-500" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE_OUT }}
                        >
                          <div className="px-3.5 pb-3.5 pl-[60px]">
                            {e.period && <p className="text-[10px] text-gray-400 font-bold mb-1">{e.period}</p>}
                            <p className="text-[11px] text-gray-600 font-medium leading-relaxed">{e.desc}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            <motion.button
              layout
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowAllExp((v) => !v)}
              className="w-full py-2.5 rounded-2xl border border-dashed border-pink-200 text-[11px] font-extrabold text-pink-600 hover:bg-pink-50 transition-colors cursor-pointer"
            >
              {showAllExp ? 'Show less' : `Show all ${EXPERIENCE.length} roles`}
            </motion.button>
          </div>
        </section>

        {/* ── AREAS OF CARE (swipeable) ─────────────────────────────── */}
        <section aria-label="Areas of Care">
          <SectionTitle
            eyebrow="Swipe to explore"
            title="Areas of Care"
            icon={<Stethoscope className="w-4 h-4" />}
            aside={
              <button
                onClick={() => setActiveTab('services')}
                className="text-[11px] font-extrabold text-pink-600 hover:underline cursor-pointer"
              >
                All services
              </button>
            }
          />
          <motion.div
            variants={stagger(0, 0.06)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="-mx-4 px-4 flex gap-2.5 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-1"
          >
            {AREAS_OF_CARE.map(({ img, label, desc, bg, ring }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                whileTap={{ scale: 0.96 }}
                className={`snap-start shrink-0 w-[128px] bg-gradient-to-b ${bg} rounded-3xl p-3.5 ring-1 ${ring} shadow-2xs`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-2.5">
                  <img src={img} alt={label} className="w-9 h-9 object-contain" loading="lazy" />
                </div>
                <h4 className="text-xs font-extrabold text-gray-900 leading-tight">{label}</h4>
                <p className="text-[10px] text-gray-500 font-medium leading-snug mt-1">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── VISIT: LOCATION & LIVE TIMINGS ────────────────────────── */}
        <Reveal
          as="section"
          aria-label="Thaai Clinic Karaikal Address and Consultation Timings"
          itemScope
          itemType="https://schema.org/MedicalClinic"
          className="bg-white rounded-3xl border border-gray-100 shadow-2xs overflow-hidden"
        >
          <meta itemProp="name" content="Thaai Clinic Karaikal" />
          <meta itemProp="telephone" content="+918610448427" />

          <div className="p-4 space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-pink-500">Visit the doctor</p>
                <h3 className="text-[15px] font-extrabold text-gray-900 tracking-tight mt-1">Thaai Clinic, Karaikal</h3>
              </div>
              <OpenStatusPill className="shrink-0 !text-[9px]" />
            </div>

            {/* Sessions with live progress */}
            <div className="grid grid-cols-2 gap-2">
              {SESSIONS.map((s) => {
                const active = status.current?.id === s.id;
                const Icon = s.id === 'morning' ? Sun : Moon;
                return (
                  <div
                    key={s.id}
                    className={`relative rounded-2xl p-3 border overflow-hidden ${
                      active ? 'bg-pink-600 border-pink-600 text-white shadow-lg shadow-pink-200' : 'bg-pink-50/50 border-pink-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1.5 ${active ? 'text-amber-200' : 'text-pink-600'}`} />
                    <span className={`text-[11px] font-extrabold block ${active ? 'text-white' : 'text-gray-900'}`}>
                      {s.label}
                    </span>
                    <span className={`text-[10px] font-semibold block mt-0.5 ${active ? 'text-pink-100' : 'text-gray-500'}`}>
                      {s.range}
                    </span>
                    {active && (
                      <div className="mt-2 h-1 rounded-full bg-white/25 overflow-hidden">
                        <motion.div
                          className="h-full bg-white rounded-full origin-left"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: status.progress }}
                          transition={{ duration: 1.2, ease: EASE_OUT }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <p
                className="text-xs text-gray-700 font-medium leading-relaxed"
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <span itemProp="streetAddress">385, Bharathiyar Road, Kovil Pathu</span>,{' '}
                <span itemProp="addressLocality">Karaikal</span> – <span itemProp="postalCode">609602</span>,{' '}
                <span itemProp="addressRegion">Puducherry</span>, <span itemProp="addressCountry">India</span>
                <span className="block text-[11px] text-gray-500 mt-0.5">
                  Opp. to Kovil Pathu Bus Stand, Near Bharathiyar Memorial
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <a
                href="tel:+918610448427"
                itemProp="telephone"
                className="text-sm font-extrabold text-gray-900 hover:text-pink-600 transition-colors"
              >
                +91 86104 48427
              </a>
            </div>
          </div>

          {/* Mini map */}
          <div className="relative h-32 bg-[#E4EBE6] overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 200 90" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
              <rect width="200" height="90" fill="#E4EBE6" />
              <path d="M0 38 H200 V52 H0 Z" fill="#FFFFFF" stroke="#D1DCD5" strokeWidth="0.8" />
              <path d="M78 0 V90 H92 V0 Z" fill="#FFFFFF" stroke="#D1DCD5" strokeWidth="0.8" />
              <text x="8" y="47.5" fill="#78909C" fontSize="5" fontWeight="bold">Bharathiyar Road</text>
              <circle cx="45" cy="70" r="2.5" fill="#546E7A" />
              <text x="50" y="72" fill="#37474F" fontSize="4.5" fontWeight="bold">Kovil Pathu Bus Stand</text>
            </svg>
            <div className="absolute left-[62%] top-[18%] -translate-x-1/2">
              <span className="absolute left-1/2 top-[30px] -translate-x-1/2 w-6 h-6 rounded-full bg-pink-500/40 animate-pulse-ring" />
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <svg width="26" height="34" viewBox="0 0 30 40" aria-hidden="true">
                  <path d="M15 0 C6.7 0 0 6.7 0 15 C0 26 15 40 15 40 C15 40 30 26 30 15 C30 6.7 23.3 0 15 0 Z" fill="#E91E63" />
                  <circle cx="15" cy="14" r="6" fill="white" />
                </svg>
              </motion.div>
            </div>
            <a
              href="https://maps.google.com/?q=Thaai+Clinic+385+Bharathiyar+Road+Kovil+Pathu+Karaikal+609602"
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-3 right-3 bg-white text-pink-600 text-[11px] font-extrabold px-3 py-2 rounded-full shadow-lg flex items-center gap-1.5 hover:bg-pink-50 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 fill-pink-600 stroke-none" /> Get Directions
            </a>
          </div>
        </Reveal>

        {/* ── BOOK CTA ──────────────────────────────────────────────── */}
        <Reveal
          as="section"
          aria-label="Book an Appointment"
          className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-[#4A0D26] via-[#7B1240] to-[#C2185B] text-white shadow-xl shadow-pink-900/20"
        >
          <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
          <Heart className="absolute -right-4 -bottom-6 w-28 h-28 text-white/10 fill-white/10 animate-float" aria-hidden="true" />
          <div className="relative space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-200" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-pink-100">Book an appointment</span>
            </div>
            <h3 className="text-lg font-extrabold leading-snug tracking-tight">
              Consult Dr. Sakthimaindan
              <br />
              at Thaai Clinic
            </h3>
            <p className="text-xs text-pink-100/90 font-medium leading-relaxed">
              Call or WhatsApp{' '}
              <a href="tel:+918610448427" className="font-extrabold text-white underline decoration-white/40">
                +91 86104 48427
              </a>{' '}
              or schedule your visit online.
            </p>
            <div className="flex gap-2 pt-1">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('book-appointment')}
                className="flex-1 bg-white text-pink-700 font-extrabold py-3 rounded-2xl text-xs shadow-lg cursor-pointer"
              >
                Book Visit Online
              </motion.button>
              {onOpenWhatsApp && (
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={onOpenWhatsApp}
                  aria-label="WhatsApp the clinic"
                  className="w-12 bg-[#25D366] rounded-2xl flex items-center justify-center shadow-lg cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white stroke-none" />
                </motion.button>
              )}
              {onOpenCall && (
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={onOpenCall}
                  aria-label="Call the clinic"
                  className="w-12 bg-white/15 border border-white/25 rounded-2xl flex items-center justify-center cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </div>
        </Reveal>

        {/* ── MISSION SIGN-OFF ──────────────────────────────────────── */}
        <Reveal as="section" aria-label="Thaai Clinic Mission Statement" className="text-center pt-2">
          <Heart className="w-5 h-5 text-pink-500 fill-pink-500 mx-auto animate-float" />
          <p className="text-sm font-extrabold text-pink-600 mt-2">Thaai Clinic, Karaikal</p>
          <p className="text-[11px] font-semibold text-gray-500 leading-snug mt-0.5">
            Caring for you and your family with trust, compassion and excellence.
          </p>
        </Reveal>

        <BuiltByBadge onOpenCredits={() => setActiveTab('credits')} />
      </div>

      {/* ── JSON-LD Structured Data for SEO ───────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Physician',
            name: 'Dr. Sakthimaindan Karthigeyan',
            alternateName: ['Dr. Sakthi Maindan Karthigeyan', 'Dr Sakthi Maindan', 'Doctor Sakthi Maindan'],
            sameAs: ['https://www.linkedin.com/in/sakthimaindan-k-karthigeyan-409b64261/'],
            jobTitle: 'General Physician',
            description:
              'Dr. Sakthimaindan Karthigeyan is a General Physician at Thaai Clinic, Karaikal. MBBS from Indira Gandhi Medical College & Research Institute (2019–2025, graduated with distinction). Fellowship in Diabetes Mellitus from Apollo Hospital Chennai, MedVersity FZC (UK Accreditation), and Medvarsity. Advanced Certification in Diabetes from Apollo Hospitals. He has served as Medical Officer across 10+ hospitals in Pondicherry & Karaikal and delivers compassionate family care in general medicine, diabetes, child health & preventive care.',
            telephone: '+918610448427',
            url: 'https://thaaiclinic.com/about-doctor',
            alumniOf: {
              '@type': 'CollegeOrUniversity',
              name: 'Indira Gandhi Medical College & Research Institute',
            },
            hasCredential: [
              {
                '@type': 'EducationalOccupationalCredential',
                credentialCategory: 'degree',
                name: 'MBBS – Bachelor of Medicine & Surgery',
                educationalLevel: 'Undergraduate',
                recognizedBy: { '@type': 'CollegeOrUniversity', name: 'Indira Gandhi Medical College & Research Institute' },
              },
              {
                '@type': 'EducationalOccupationalCredential',
                credentialCategory: 'certificate',
                name: 'Fellowship Trainee – Diabetes Mellitus',
                recognizedBy: { '@type': 'Hospital', name: 'Apollo Hospital, Chennai' },
              },
              {
                '@type': 'EducationalOccupationalCredential',
                credentialCategory: 'certificate',
                name: 'Advanced Certification in Diabetes',
                recognizedBy: { '@type': 'Organization', name: 'Apollo Hospitals' },
              },
              {
                '@type': 'EducationalOccupationalCredential',
                credentialCategory: 'certificate',
                name: 'Fellowship in Diabetes Mellitus (UK Accreditation)',
                recognizedBy: { '@type': 'Organization', name: 'MedVersity FZC' },
              },
              {
                '@type': 'EducationalOccupationalCredential',
                credentialCategory: 'certificate',
                name: 'Fellowship in Diabetes Mellitus',
                recognizedBy: { '@type': 'Organization', name: 'Medvarsity' },
              },
            ],
            knowsAbout: [
              'Diabetes Management',
              'Child Health',
              'Preventive Medicine',
              'Respiratory Care',
              'General Consultation',
              'Family Medicine',
              'Telemedicine',
              'Emergency Medicine',
            ],
            worksFor: {
              '@type': 'MedicalClinic',
              name: 'Thaai Clinic',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '385, Bharathiyar Road, Kovil Pathu',
                addressLocality: 'Karaikal',
                postalCode: '609602',
                addressRegion: 'Puducherry',
                addressCountry: 'IN',
              },
              telephone: '+918610448427',
              openingHours: ['Mo-Su 08:00-13:00', 'Mo-Su 17:00-23:00'],
            },
          }),
        }}
      />
    </article>
  );
};
