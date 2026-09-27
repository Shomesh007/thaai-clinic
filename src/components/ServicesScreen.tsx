import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  PhoneCall,
  Thermometer,
  BatteryLow,
  Soup,
  Droplet,
  Syringe,
  Scale,
  ClipboardCheck,
  CalendarCheck,
  Stethoscope,
  RefreshCcw,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { HeaderNav } from './HeaderNav';
import { EASE_OUT, Reveal, SectionTitle, fadeUp, stagger } from './ui/Motion';
import { OpenStatusPill } from './ui/OpenStatus';

import careForAllAgesIcon from '../assets/care_for_all_ages.png';
import personalisedAttentionIcon from '../assets/personalised_attention.png';
import trustIcon from '../assets/trust.png';
import communityIcon from '../assets/community.png';
import mainServicesImg from '../assets/main_services.png';
import drSakthiImage from '../assets/dr_sakthi_image.jpeg';

interface ServicesScreenProps {
  onBack: () => void;
  onContactClinic: () => void;
  onBookAppointment: () => void;
}

const TREATMENTS = [
  { name: 'Fever, Cold & Cough', icon: Thermometer, tint: 'text-rose-600 bg-rose-50', desc: 'Seasonal fevers, viral infections, sore throat and persistent cough — diagnosed and treated the same day.' },
  { name: 'General Weakness', icon: BatteryLow, tint: 'text-amber-600 bg-amber-50', desc: 'Fatigue, dizziness and low energy evaluated for anaemia, thyroid, vitamin deficiency and more.' },
  { name: 'Stomach Issues', icon: Soup, tint: 'text-orange-600 bg-orange-50', desc: 'Acidity, gastritis, loose stools, vomiting and indigestion with diet guidance.' },
  { name: 'Diabetes Management', icon: Droplet, tint: 'text-blue-600 bg-blue-50', desc: 'Fellowship-trained sugar control: HbA1c plans, medication review and complication screening.' },
  { name: 'Child Vaccination', icon: Syringe, tint: 'text-pink-600 bg-pink-50', desc: 'Complete immunisation schedule and growth checks for infants and children.' },
  { name: 'Weight Management', icon: Scale, tint: 'text-emerald-600 bg-emerald-50', desc: 'Personalised nutrition and lifestyle plans for healthy, sustainable weight.' },
  { name: 'Health Checkups', icon: ClipboardCheck, tint: 'text-indigo-600 bg-indigo-50', desc: 'Preventive screening for BP, sugar, cholesterol and routine family checkups.' },
];

const WHY_US = [
  { img: careForAllAgesIcon, label: 'Care for All Ages', alt: 'Care for all ages - infants to seniors at Thaai Clinic Karaikal' },
  { img: personalisedAttentionIcon, label: 'Personalized Attention', alt: 'Personalized medical attention by Dr. Sakthimaindan' },
  { img: trustIcon, label: 'Trusted Care', alt: 'Trusted healthcare at Thaai Clinic Karaikal' },
  { img: communityIcon, label: 'Community Focused', alt: 'Community focused clinic in Karaikal' },
];

const VISIT_STEPS = [
  { icon: CalendarCheck, title: 'Book or walk in', desc: 'Reserve a slot online, call, or simply walk in during clinic hours.' },
  { icon: Stethoscope, title: 'Unhurried consultation', desc: 'Dr. Sakthimaindan listens, examines and explains your plan clearly.' },
  { icon: RefreshCcw, title: 'Follow-up on WhatsApp', desc: 'Share reports and get follow-up guidance without extra trips.' },
];

export const ServicesScreen: React.FC<ServicesScreenProps> = ({
  onBack,
  onContactClinic,
  onBookAppointment,
}) => {
  const [openTreatment, setOpenTreatment] = useState<string | null>(null);

  return (
    <section aria-label="Thaai Clinic Services - General Physician in Karaikal" className="flex-1 overflow-y-auto pb-28 bg-[#FAF5F7]">
      <HeaderNav
        title="Our Services"
        subtitle="Quality care for you and your family"
        onBack={onBack}
        showHeart={true}
      />

      <div className="px-4 pt-4 space-y-7">
        {/* ── HERO: doctor + clinic ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="relative overflow-hidden rounded-3xl p-4 bg-gradient-to-br from-[#FF2D75] via-[#E91E63] to-[#AD1457] text-white shadow-xl shadow-pink-900/15"
        >
          <div className="absolute inset-0 bg-dots opacity-50" aria-hidden="true" />
          <img
            src={mainServicesImg}
            alt="General physician services and treatments offered at Thaai Clinic Karaikal"
            className="absolute -right-6 -bottom-6 w-36 h-36 object-contain opacity-25 animate-float"
          />
          <div className="relative flex items-center gap-3.5">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-[3px] border-white/70 shadow-lg shrink-0">
              <img src={drSakthiImage} alt="Dr. Sakthimaindan Karthigeyan" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-extrabold leading-tight">Dr. Sakthimaindan Karthigeyan</h2>
              <p className="text-xs font-semibold text-pink-100 mt-0.5">General Physician</p>
              <p className="text-[11px] font-extrabold tracking-tight mt-0.5">MBBS, CCH, CCPE, ACDM (UK)</p>
            </div>
          </div>
          <div className="relative flex flex-wrap items-center gap-1.5 mt-3.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-white text-pink-700 px-2.5 py-1 rounded-full">
              <Sparkles className="w-3 h-3" /> Newly Established Clinic
            </span>
            <OpenStatusPill tone="dark" />
          </div>
        </motion.div>

        {/* ── WHY FAMILIES CHOOSE US ────────────────────────────────── */}
        <section aria-label="Why families choose Thaai Clinic">
          <motion.div
            variants={stagger(0.2, 0.07)}
            initial="hidden"
            animate="show"
            className="grid grid-cols-4 gap-2 text-center"
          >
            {WHY_US.map(({ img, label, alt }, i) => (
              <motion.div key={label} variants={fadeUp} className="flex flex-col items-center">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                  className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-pink-50 flex items-center justify-center mb-1.5"
                >
                  <img src={img} alt={alt} className="w-10 h-10 object-contain" />
                </motion.div>
                <span className="text-[10px] font-bold text-gray-800 leading-tight">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── WE TREAT ──────────────────────────────────────────────── */}
        <section aria-label="Conditions we treat">
          <SectionTitle eyebrow="Tap a card to learn more" title="We Treat" icon={<Stethoscope className="w-4 h-4" />} />
          <p className="text-xs text-gray-500 font-medium leading-relaxed mb-3 px-0.5">
            Comprehensive care for common health concerns for individuals and families in Karaikal.
          </p>
          <motion.ul
            variants={stagger(0, 0.05)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-2"
          >
            {TREATMENTS.map(({ name, icon: Icon, tint, desc }) => {
              const open = openTreatment === name;
              return (
                <motion.li
                  key={name}
                  variants={fadeUp}
                  layout
                  className={`bg-white rounded-2xl border shadow-2xs overflow-hidden transition-colors ${
                    open ? 'border-pink-200' : 'border-gray-100'
                  }`}
                >
                  <button
                    onClick={() => setOpenTreatment(open ? null : name)}
                    aria-expanded={open}
                    className="w-full flex items-center gap-3 p-3 text-left cursor-pointer"
                  >
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tint}`}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="flex-1 text-[13px] font-extrabold text-gray-900">{name}</span>
                    <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: EASE_OUT }}
                      >
                        <div className="px-3 pb-3 pl-[64px] space-y-2">
                          <p className="text-[11px] text-gray-600 font-medium leading-relaxed">{desc}</p>
                          <button
                            onClick={onBookAppointment}
                            className="text-[11px] font-extrabold text-pink-600 hover:underline cursor-pointer"
                          >
                            Book a visit for this →
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </motion.ul>
        </section>

        {/* ── HOW A VISIT WORKS ─────────────────────────────────────── */}
        <section aria-label="How a visit works">
          <SectionTitle eyebrow="Simple & stress-free" title="How a visit works" icon={<CalendarCheck className="w-4 h-4" />} />
          <div className="relative bg-white rounded-3xl p-4 border border-gray-100 shadow-2xs">
            <div className="absolute left-[35px] top-9 bottom-9 border-l-2 border-dashed border-pink-200" aria-hidden="true" />
            <ol className="space-y-4">
              {VISIT_STEPS.map(({ icon: Icon, title, desc }, i) => (
                <motion.li
                  key={title}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.45, ease: EASE_OUT, delay: i * 0.12 }}
                  className="relative flex gap-3"
                >
                  <span className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center shadow-md shadow-pink-200 shrink-0">
                    <Icon className="w-[18px] h-[18px]" />
                  </span>
                  <div className="pt-0.5">
                    <p className="text-[10px] font-extrabold text-pink-500">STEP {i + 1}</p>
                    <h4 className="text-[13px] font-extrabold text-gray-900 leading-tight">{title}</h4>
                    <p className="text-[11px] text-gray-500 font-medium leading-snug mt-0.5">{desc}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── CONTACT CTA ───────────────────────────────────────────── */}
        <Reveal className="relative overflow-hidden p-5 rounded-3xl bg-gray-900 text-white">
          <div className="absolute inset-0 bg-dots opacity-20" aria-hidden="true" />
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-pink-600/40 blur-2xl" aria-hidden="true" />
          <div className="relative space-y-3">
            <div>
              <h4 className="text-base font-extrabold">Have questions?</h4>
              <p className="text-xs text-gray-300 font-medium">We're here to help — call or book a visit.</p>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onContactClinic}
                className="flex-1 bg-pink-600 hover:bg-pink-700 text-white text-xs font-extrabold py-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-pink-900/40 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" /> Contact Clinic
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onBookAppointment}
                className="flex-1 bg-white text-gray-900 text-xs font-extrabold py-3 rounded-2xl cursor-pointer"
              >
                Book Visit
              </motion.button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
