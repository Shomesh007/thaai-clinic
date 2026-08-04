import React, { useState } from 'react';
import {
  ChevronLeft,
  Bell,
  Heart,
  User,
  MapPin,
  Phone,
  Clock,
  Building,
  Navigation,
  Calendar,
  Baby,
  Droplets,
  Wind,
  Users,
  Utensils,
  ShieldCheck,
  Award,
  GraduationCap,
  ChevronRight,
  ChevronDown,
  ShieldPlus,
  Stethoscope,
  Sun,
  Moon,
  Briefcase,
} from 'lucide-react';
import drSakthiImage from '../assets/dr_sakthi_image.jpeg';
import childHealthIcon from '../assets/child_health.png';
import diabetesCareIcon from '../assets/diabetes_care.png';
import respiratoryCareIcon from '../assets/respiratory_care.png';
import generalConsultationIcon from '../assets/general_consulation.png';
import personalisedAttentionIcon from '../assets/personalised_attention.png';
import careForAllAgesIcon from '../assets/care_for_all_ages.png';
import { TabType } from '../types';

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
  },
  {
    degree: 'Fellowship Trainee – Diabetes Mellitus',
    institution: 'Apollo Hospital, Chennai',
    year: '2024',
    note: 'Intensive training in advanced diabetology; hands-on experience managing complex diabetes cases & complications.',
  },
  {
    degree: 'Advanced Certification in Diabetes',
    institution: 'Apollo Hospitals',
    year: '',
    note: '',
  },
  {
    degree: 'Fellowship in Diabetes Mellitus (UK Accreditation)',
    institution: 'MedVersity FZC',
    year: '1-Year Course',
    note: '',
  },
  {
    degree: 'Fellowship in Diabetes Mellitus',
    institution: 'Medvarsity',
    year: '',
    note: '',
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

export const AboutDoctorScreen: React.FC<AboutDoctorScreenProps> = ({
  setActiveTab,
  onOpenNotifications,
  onOpenCall,
  onOpenWhatsApp,
  unreadCount = 2,
}) => {
  const [showAreasOfCare, setShowAreasOfCare] = useState(false);
  const [showExperience, setShowExperience] = useState(false);

  return (
    <article
      aria-label="About Dr. Sakthimaindan Karthigeyan - General Physician at Thaai Clinic Karaikal"
      itemScope
      itemType="https://schema.org/Physician"
      className="flex-1 overflow-y-auto pb-20 bg-[#FFF8FA] text-gray-800 selection:bg-pink-100 selection:text-pink-600"
    >
      {/* ── SEO: Schema.org hidden metadata ─────────────────────────── */}
      <meta itemProp="name" content="Dr. Sakthimaindan Karthigeyan" />
      <meta itemProp="jobTitle" content="General Physician" />
      <meta itemProp="medicalSpecialty" content="General Practice, Diabetes Care, Family Medicine" />
      <meta itemProp="telephone" content="+919876543210" />
      <meta itemProp="url" content="https://thaaiclinic.com/about-doctor" />
      <meta itemProp="alumniOf" content="Indira Gandhi Medical College & Research Institute" />
      <meta itemProp="hasCredential" content="MBBS, Fellowship in Diabetes Mellitus (Apollo, MedVersity FZC – UK Accreditation), Advanced Certification in Diabetes (Apollo Hospitals), Fellowship (Medvarsity)" />
      <meta itemProp="knowsAbout" content="Diabetes Management, Child Health, Preventive Medicine, Respiratory Care, General Consultation, Family Medicine, Telemedicine" />
      <meta itemProp="description" content="Dr. Sakthimaindan Karthigeyan is a General Physician at Thaai Clinic, Karaikal. MBBS from Indira Gandhi Medical College (2019–2025, graduated with distinction), with specialised Fellowships in Diabetes Mellitus from Apollo Chennai, MedVersity FZC (UK Accreditation), and Medvarsity. He has served as Medical Officer across 10+ hospitals in Pondicherry & Karaikal and delivers compassionate family care in general medicine, diabetes, child health & preventive care." />

      {/* ── TOP HEADER ────────────────────────────────────────────────── */}
      <header className="relative bg-gradient-to-b from-[#FFE6F0] via-[#FFF0F6] to-[#FFF8FA] pt-3 pb-5 px-4">
        {/* Decorative hearts SVG */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
          <svg className="w-full h-full" viewBox="0 0 400 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M340 18 Q345 10 350 18 Q355 10 360 18 Q350 30 340 18" fill="#E91E63" opacity="0.6" />
            <path d="M365 25 Q368 20 372 25 Q376 20 380 25 Q372 34 365 25" fill="#FF4081" opacity="0.7" />
            <g opacity="0.35" fill="#E91E63" transform="translate(360, 40) rotate(15)">
              <path d="M10 0 C15 10 20 20 18 35 C15 25 5 15 10 0 Z" />
              <path d="M18 12 C25 15 30 18 28 28 C22 25 18 20 18 12 Z" />
              <path d="M14 22 C20 27 25 30 22 40 C17 35 14 30 14 22 Z" />
            </g>
          </svg>
        </div>

        {/* Top bar */}
        <div className="relative flex items-center justify-between z-10 py-1">
          <button
            onClick={() => setActiveTab('home')}
            className="p-1.5 rounded-full hover:bg-white/60 text-[#E91E63] transition-colors cursor-pointer"
            aria-label="Back to Home"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.8]" />
          </button>

          <h1 className="text-base sm:text-lg font-extrabold text-[#E91E63] tracking-tight">
            About the Doctor
          </h1>

          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-full hover:bg-white/60 text-[#E91E63] transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 stroke-[2]" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 bg-amber-400 text-pink-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* ── Hero Profile ─────────────────────────────────────────────── */}
        <div className="relative z-10 mt-3 pt-1">
          <div className="flex flex-col sm:flex-row items-center gap-4">

            {/* Doctor avatar */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-tr from-pink-100 via-rose-50 to-pink-100 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                <img src={drSakthiImage} alt="Dr. Sakthimaindan Karthigeyan" className="w-full h-full object-cover" />
              </div>
              {/* Available indicator */}
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 border-[3px] border-white text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow-xs">
                Available
              </span>
            </div>

            {/* Doctor details */}
            <div className="flex-1 text-center sm:text-left space-y-1">
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight"
                itemProp="name"
              >
                Dr. Sakthimaindan<br />
                <span className="text-lg sm:text-xl font-bold text-slate-600">Karthigeyan</span>
              </h2>

              <p className="text-xs sm:text-sm font-bold text-[#E91E63] leading-snug">
                <span itemProp="jobTitle">General Physician</span> at{' '}
                <span itemProp="worksFor" itemScope itemType="https://schema.org/MedicalClinic">
                  <span itemProp="name">Thaai Clinic, Karaikal</span>
                </span>
              </p>

              {/* Degree badges */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-0.5">
                {['MBBS', 'Fellowship – Diabetes', 'ACDM UK'].map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] font-extrabold text-[#E91E63] bg-pink-50 border border-pink-100 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Heart divider */}
              <div className="flex items-center justify-center sm:justify-start gap-2 py-1 text-pink-300">
                <span className="w-10 sm:w-12 h-[1px] bg-pink-200"></span>
                <Heart className="w-3 h-3 fill-[#E91E63] stroke-[#E91E63]" />
                <span className="w-10 sm:w-12 h-[1px] bg-pink-200"></span>
              </div>

              <p
                className="text-xs text-gray-600 font-medium leading-relaxed"
                itemProp="description"
              >
                General Physician at Thaai Clinic, Karaikal. MBBS from Indira Gandhi Medical College (2019–2025, graduated with distinction). Specialised Fellowships in Diabetes from Apollo Chennai, MedVersity FZC (UK Accreditation) & Medvarsity. Served as Medical Officer across 10+ hospitals in Pondicherry & Karaikal.
              </p>
            </div>

          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
      <div className="px-4 pt-3 space-y-3.5 max-w-[430px] mx-auto">

        {/* 1. CORE PILLARS */}
        <section aria-label="Core Practice Values" className="bg-white rounded-3xl p-3.5 border border-pink-100/90 shadow-2xs">
          <div className="grid grid-cols-4 divide-x divide-pink-100/80 text-center">
            {[
              { icon: <Heart className="w-4 h-4 fill-[#E91E63] stroke-[#E91E63]" />, title: 'Patient First', sub: 'Your health first' },
              { icon: <ShieldPlus className="w-4 h-4 stroke-[2]" />, title: 'Preventive Care', sub: 'Prevent before cure' },
              { icon: <Users className="w-4 h-4 stroke-[2]" />, title: 'Trusted Care', sub: 'Evidence-based' },
              { icon: <Award className="w-4 h-4 stroke-[2]" />, title: 'Compassionate', sub: 'We listen, we care' },
            ].map(({ icon, title, sub }) => (
              <div key={title} className="px-1 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-pink-50 border border-pink-100 text-[#E91E63] flex items-center justify-center mb-1.5 shadow-2xs">
                  {icon}
                </div>
                <h3 className="text-[10px] font-bold text-[#E91E63] leading-tight">{title}</h3>
                <p className="text-[9px] text-gray-500 font-medium leading-tight mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. EDUCATION & QUALIFICATIONS */}
        <section
          aria-label="Education & Qualifications"
          className="bg-white rounded-3xl p-3.5 border border-pink-100/90 shadow-2xs space-y-3"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-pink-50 border border-pink-100 text-[#E91E63] flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4 stroke-[2]" />
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 tracking-tight">
                Education & Qualifications
              </h3>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative pl-4 space-y-3">
            <div className="absolute left-[7px] top-1.5 bottom-2.5 w-[1.5px] bg-pink-200"></div>

            {QUALIFICATIONS.map((q, i) => (
              <div key={i} className="relative pl-4">
                <span className="absolute left-[-13px] top-1 w-2.5 h-2.5 rounded-full bg-[#E91E63] ring-2 ring-pink-50"></span>
                <h4 className="font-extrabold text-slate-900 text-xs leading-snug">{q.degree}</h4>
                <p className="text-[10px] text-[#E91E63] font-semibold mt-0.5">{q.institution}</p>
                {q.year && <p className="text-[9px] text-gray-400 font-medium mt-0.5">{q.year}</p>}
                {q.note && <p className="text-[10px] text-gray-500 font-medium leading-snug mt-0.5">{q.note}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* 3. EXPERIENCE */}
        <section
          aria-label="Clinical Experience"
          className="bg-white rounded-3xl p-3.5 border border-pink-100/90 shadow-2xs"
        >
          <button
            onClick={() => setShowExperience(!showExperience)}
            className="w-full flex items-center justify-between text-left cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-pink-50 border border-pink-100 text-[#E91E63] flex items-center justify-center shrink-0 group-hover:bg-pink-100 transition-colors">
                <Briefcase className="w-3.5 h-3.5 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 tracking-tight group-hover:text-[#E91E63] transition-colors">
                  Clinical Experience
                </h3>
                <p className="text-[10px] text-gray-500 font-medium">10+ hospitals across Pondicherry & Karaikal</p>
              </div>
            </div>
            {showExperience
              ? <ChevronDown className="w-4 h-4 text-[#E91E63] transition-transform duration-200" />
              : <ChevronRight className="w-4 h-4 text-[#E91E63] transition-transform duration-200" />
            }
          </button>

          {showExperience && (
            <div className="relative pl-4 space-y-3 pt-3 mt-3 border-t border-pink-100/60">
              <div className="absolute left-[7px] top-5 bottom-3 w-[1.5px] bg-pink-200"></div>
              {EXPERIENCE.map((e, i) => (
                <div key={i} className="relative pl-4">
                  <span className="absolute left-[-13px] top-1 w-2.5 h-2.5 rounded-full bg-[#E91E63] ring-2 ring-pink-50"></span>
                  <h4 className="font-extrabold text-slate-900 text-xs">{e.role}</h4>
                  <p className="text-[10px] text-[#E91E63] font-semibold mt-0.5">{e.place}</p>
                  {e.period && <p className="text-[9px] text-gray-400 font-medium mt-0.5">{e.period}</p>}
                  <p className="text-[10px] text-gray-500 font-medium leading-snug mt-0.5">{e.desc}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 4. AREAS OF CARE */}
        <section aria-label="Areas of Care" className="bg-white rounded-3xl p-3.5 border border-pink-100/90 shadow-2xs">
          <button
            onClick={() => setShowAreasOfCare(!showAreasOfCare)}
            className="w-full flex items-center justify-between text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-pink-50 border border-pink-100 text-[#E91E63] flex items-center justify-center shrink-0 group-hover:bg-pink-100 transition-colors">
                <Stethoscope className="w-4 h-4 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 tracking-tight group-hover:text-[#E91E63] transition-colors">
                  Areas of Care
                </h3>
                <p className="text-[11px] text-gray-500 font-medium leading-none mt-0.5">
                  View conditions & services
                </p>
              </div>
            </div>
            <ChevronRight className={`w-5 h-5 text-[#E91E63] transition-transform duration-200 ${showAreasOfCare ? 'rotate-90' : ''}`} />
          </button>

          {showAreasOfCare && (
            <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-pink-100/60">
              {[
                { img: childHealthIcon, label: 'Child Health', bg: 'bg-[#FFF5F8] border-pink-100' },
                { img: diabetesCareIcon, label: 'Diabetes Care', bg: 'bg-[#F0F7FF] border-blue-100' },
                { img: respiratoryCareIcon, label: 'Pulmonary Care', bg: 'bg-[#F0FDF4] border-emerald-100' },
                { img: generalConsultationIcon, label: 'General Consultation', bg: 'bg-[#FDF4FF] border-purple-100' },
                { img: personalisedAttentionIcon, label: 'Diet & Weight', bg: 'bg-[#FFFBEB] border-amber-100' },
                { img: careForAllAgesIcon, label: 'Preventive Care', bg: 'bg-[#FAF5FF] border-indigo-100' },
              ].map(({ img, label, bg }) => (
                <div key={label} className={`${bg} border rounded-2xl p-2 flex flex-col items-center text-center shadow-2xs`}>
                  <img src={img} alt={label} className="w-8 h-8 object-contain mb-1" />
                  <span className="text-[10px] font-bold text-gray-800 leading-tight">{label}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 5. CLINIC LOCATION & TIMINGS */}
        <section
          aria-label="Thaai Clinic Karaikal Address and Consultation Timings"
          itemScope
          itemType="https://schema.org/MedicalClinic"
          className="bg-white rounded-3xl p-4 sm:p-5 border border-pink-100/90 shadow-2xs space-y-4"
        >
          <meta itemProp="name" content="Thaai Clinic Karaikal" />
          <meta itemProp="telephone" content="+919876543210" />

          {/* Clinic name header */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-pink-50 border border-pink-100 text-[#E91E63] flex items-center justify-center shrink-0 shadow-2xs">
              <MapPin className="w-4 h-4 stroke-[2]" />
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-800 tracking-tight">
              Thaai Clinic, Karaikal
            </h3>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-pink-50 text-[#E91E63] flex items-center justify-center shrink-0 mt-0.5">
              <Building className="w-3.5 h-3.5 stroke-[2]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#E91E63]">Address</h4>
              <p className="text-xs text-gray-700 font-medium leading-relaxed mt-0.5" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="streetAddress">385, Bharathiyar Road, Kovil Pathu</span>,<br />
                <span itemProp="addressLocality">Karaikal</span> – <span itemProp="postalCode">609602</span>,<br />
                <span itemProp="addressRegion">Puducherry</span>, <span itemProp="addressCountry">India</span>
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-pink-50 text-[#E91E63] flex items-center justify-center shrink-0 mt-0.5">
              <Phone className="w-3.5 h-3.5 stroke-[2]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#E91E63]">Phone</h4>
              <a
                href="tel:+919876543210"
                itemProp="telephone"
                className="text-xs font-extrabold text-slate-900 block mt-0.5 hover:text-[#E91E63] transition-colors"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          <div className="border-t border-pink-100/70 pt-1"></div>

          {/* Timings */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-pink-50 text-[#E91E63] flex items-center justify-center shrink-0">
                <Clock className="w-3.5 h-3.5 stroke-[2]" />
              </div>
              <h4 className="text-xs font-bold text-[#E91E63]">Timings</h4>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="bg-[#FFF0F4] rounded-2xl p-3 border border-pink-100/60 flex items-center gap-2.5">
                <Sun className="w-5 h-5 text-[#E91E63] shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-slate-900 block leading-tight">Morning</span>
                  <span className="text-[10px] text-gray-600 font-medium block mt-0.5">8:00 AM – 1:00 PM</span>
                </div>
              </div>
              <div className="bg-[#FFF0F4] rounded-2xl p-3 border border-pink-100/60 flex items-center gap-2.5">
                <Moon className="w-5 h-5 text-[#E91E63] shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-slate-900 block leading-tight">Evening</span>
                  <span className="text-[10px] text-gray-600 font-medium block mt-0.5">5:00 PM – 11:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map widget */}
          <div className="relative rounded-2xl overflow-hidden border border-pink-100 shadow-2xs bg-slate-100 mt-2">
            <div className="relative w-full h-36 bg-[#E8EDE9] p-3 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="120" fill="#E4EBE6" />
                <path d="M0 45 H200 V65 H0 Z" fill="#FFFFFF" stroke="#D1DCD5" strokeWidth="1" />
                <path d="M80 0 V120 H100 V0 Z" fill="#FFFFFF" stroke="#D1DCD5" strokeWidth="1" />
                <text x="10" y="58" fill="#78909C" fontSize="6" fontWeight="bold">Bharathiyar Road</text>
                <circle cx="45" cy="85" r="3" fill="#546E7A" />
                <text x="52" y="87" fill="#37474F" fontSize="5.5" fontWeight="extrabold">Kovil Pathu Bus Stand</text>
                <g transform="translate(115, 30)">
                  <path d="M15 0 C6.7 0 0 6.7 0 15 C0 26 15 40 15 40 C15 40 30 26 30 15 C30 6.7 23.3 0 15 0 Z" fill="#E91E63" />
                  <circle cx="15" cy="14" r="6" fill="white" />
                </g>
              </svg>
              <div className="absolute top-5 right-6 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-md border border-pink-100 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#E91E63]"></span>
                <span className="text-[11px] font-extrabold text-[#E91E63]">Thaai Clinic</span>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Thaai+Clinic+385+Bharathiyar+Road+Kovil+Pathu+Karaikal+609602"
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#E91E63] hover:bg-[#D8005A] text-white py-2.5 px-4 font-extrabold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Get Directions</span>
              <div className="w-5 h-5 rounded-full bg-white text-[#E91E63] flex items-center justify-center">
                <Navigation className="w-3 h-3 fill-[#E91E63] stroke-none" />
              </div>
            </a>
          </div>

          {/* Landmark */}
          <div className="flex items-start gap-3 pt-1">
            <div className="w-7 h-7 rounded-full bg-pink-50 text-[#E91E63] flex items-center justify-center shrink-0 mt-0.5">
              <Building className="w-3.5 h-3.5 stroke-[2]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#E91E63]">Nearby Landmark</h4>
              <p className="text-xs text-gray-700 font-medium leading-snug mt-0.5">
                Opp. to Kovil Pathu Bus Stand, Near Bharathiyar Memorial
              </p>
            </div>
          </div>
        </section>

        {/* 6. BOOK AN APPOINTMENT */}
        <section
          aria-label="Book an Appointment"
          className="bg-white rounded-3xl p-4 sm:p-5 border border-pink-100/90 shadow-2xs flex items-center justify-between gap-3"
        >
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-pink-50 border border-pink-100 text-[#E91E63] flex items-center justify-center shrink-0">
                <Calendar className="w-3.5 h-3.5 stroke-[2]" />
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#E91E63] tracking-tight">
                Book an Appointment
              </h3>
            </div>
            <p className="text-xs text-gray-600 font-medium leading-snug pl-9">
              Call or WhatsApp us at<br />
              <a href="tel:+919876543210" className="font-extrabold text-[#E91E63] hover:underline text-xs inline-block my-0.5">
                +91 98765 43210
              </a><br />
              or use the Book Appointment button.
            </p>
          </div>

          <div className="shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FFEBF3] flex items-center justify-center relative p-2 border border-pink-100 shadow-2xs">
              <svg className="w-12 h-14" viewBox="0 0 50 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="40" height="60" rx="8" fill="white" stroke="#E91E63" strokeWidth="2.5" />
                <rect x="9" y="10" width="32" height="46" rx="4" fill="#FFEAEF" />
                <line x1="18" y1="8" x2="32" y2="8" stroke="#E91E63" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="25" cy="60" r="1.5" fill="#E91E63" />
              </svg>
              <div className="absolute top-2 right-1 w-8 h-8 rounded-full bg-[#E91E63] text-white flex items-center justify-center shadow-md border-2 border-white">
                <span className="flex gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-white animate-pulse"></span>
                  <span className="w-1 h-1 rounded-full bg-white animate-pulse delay-75"></span>
                  <span className="w-1 h-1 rounded-full bg-white animate-pulse delay-150"></span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 7. BOTTOM MISSION BANNER */}
        <section
          aria-label="Thaai Clinic Mission Statement"
          className="bg-gradient-to-r from-[#FFF0F5] via-[#FFEBF3] to-[#FFF0F5] rounded-3xl p-3.5 sm:p-4 border border-pink-100 shadow-2xs flex items-center justify-between relative overflow-hidden"
        >
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 rounded-full bg-white border border-pink-100 flex items-center justify-center shrink-0 shadow-xs">
              <Heart className="w-6 h-6 fill-[#E91E63] stroke-none" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold text-[#E91E63] leading-snug">
                Thaai Clinic, Karaikal
              </p>
              <p className="text-[11px] font-semibold text-gray-700 leading-snug mt-0.5">
                Caring for you and your family<br />with trust, compassion and excellence.
              </p>
            </div>
          </div>

          {/* Karaikal lighthouse silhouette */}
          <div className="shrink-0 opacity-40">
            <svg className="w-16 h-12" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M70 60 L74 20 H80 L84 60 Z" fill="#E91E63" />
              <path d="M72 15 H82 V20 H72 Z" fill="#E91E63" />
              <circle cx="77" cy="10" r="3" fill="#E91E63" />
              <path d="M10 60 V45 H25 V60 H35 V50 H50 V60 Z" fill="#FF80AB" />
            </svg>
          </div>
        </section>

      </div>

      {/* ── JSON-LD Structured Data for SEO ───────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Physician',
            name: 'Dr. Sakthimaindan Karthigeyan',
            jobTitle: 'General Physician',
            description:
              'Dr. Sakthimaindan Karthigeyan is a General Physician at Thaai Clinic, Karaikal. MBBS from Indira Gandhi Medical College & Research Institute (2019–2025, graduated with distinction). Fellowship in Diabetes Mellitus from Apollo Hospital Chennai, MedVersity FZC (UK Accreditation), and Medvarsity. Advanced Certification in Diabetes from Apollo Hospitals. He has served as Medical Officer across 10+ hospitals in Pondicherry & Karaikal and delivers compassionate family care in general medicine, diabetes, child health & preventive care.',
            telephone: '+919876543210',
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
              telephone: '+919876543210',
              openingHours: ['Mo-Su 08:00-13:00', 'Mo-Su 17:00-23:00'],
            },
          }),
        }}
      />
    </article>
  );
};
