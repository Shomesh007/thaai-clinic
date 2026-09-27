import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Bell, ChevronLeft, Quote, Linkedin, BadgeCheck } from 'lucide-react';
import drSakthiImage from '../assets/dr_sakthi_image.jpeg';
import { TabType } from '../types';
import { CountUp, EASE_OUT, Reveal, fadeUp, stagger } from './ui/Motion';
import { OpenStatusPill } from './ui/OpenStatus';
import { AboutDoctorDetails } from './AboutDoctorDetails';

interface AboutDoctorScreenProps {
  setActiveTab: (tab: TabType) => void;
  onOpenNotifications?: () => void;
  onOpenCall?: () => void;
  onOpenWhatsApp?: () => void;
  unreadCount?: number;
}

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

  // Compact header fades in once the hero scrolls away
  const { scrollY } = useScroll({ container: scrollRef });
  const barBg = useTransform(scrollY, [120, 200], ['rgba(255,255,255,0)', 'rgba(255,255,255,1)']);
  const barShadow = useTransform(scrollY, [120, 200], ['0 0 0 rgba(0,0,0,0)', '0 1px 0 rgba(17,24,39,0.06)']);
  const barTitleOpacity = useTransform(scrollY, [150, 210], [0, 1]);
  const barIconColor = useTransform(scrollY, [120, 200], ['#FFFFFF', '#DB2777']);
  const barBtnBg = useTransform(scrollY, [120, 200], ['rgba(255,255,255,0.18)', 'rgba(253,242,248,1)']);
  const heroPhotoY = useTransform(scrollY, [0, 260], [0, -30]);
  const heroPhotoScale = useTransform(scrollY, [0, 260], [1, 0.92]);



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

        <AboutDoctorDetails setActiveTab={setActiveTab} onOpenWhatsApp={onOpenWhatsApp} onOpenCall={onOpenCall} />
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
