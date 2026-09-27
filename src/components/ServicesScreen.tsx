import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { HeaderNav } from './HeaderNav';
import { EASE_OUT, SectionTitle } from './ui/Motion';
import { Kolam, KolamMark } from './ui/Kolam';
import { OpenStatusPill } from './ui/OpenStatus';

import mainServicesImg from '../assets/main_services.png';
import drSakthiImage from '../assets/dr_sakthi_image.jpeg';

interface ServicesScreenProps {
  onBack: () => void;
  onContactClinic: () => void;
  onBookAppointment: () => void;
}

const TREATMENTS = [
  { name: 'Fever, Cold & Cough', short: 'Seen and treated the same day', desc: 'Seasonal fevers, viral infections, sore throat and persistent cough, diagnosed and treated the same day.' },
  { name: 'General Weakness', short: 'Tiredness, dizziness, low energy', desc: 'Fatigue, dizziness and low energy evaluated for anaemia, thyroid, vitamin deficiency and more.' },
  { name: 'Stomach Issues', short: 'Acidity, gastritis, loose stools', desc: 'Acidity, gastritis, loose stools, vomiting and indigestion, with diet guidance.' },
  { name: 'Diabetes Management', short: 'Sugar control that lasts', desc: 'Fellowship-trained sugar control: HbA1c plans, medication review and complication screening.', specialist: true },
  { name: 'Child Vaccination', short: 'Full immunisation schedule', desc: 'Complete immunisation schedule and growth checks for infants and children.' },
  { name: 'Weight Management', short: 'Plans built around you', desc: 'Personalised nutrition and lifestyle plans for healthy, sustainable weight.' },
  { name: 'Health Checkups', short: 'BP, sugar, cholesterol', desc: 'Preventive screening for BP, sugar, cholesterol and routine family checkups.' },
];

const PROMISES = ['Care for all ages', 'Personalised attention', 'Trusted care', 'Community focused'];

const VISIT_STEPS = [
  { title: 'Book or walk in', desc: 'Reserve a slot online, call, or walk in during clinic hours.' },
  { title: 'An unhurried consultation', desc: 'The doctor listens, examines and explains your plan clearly.' },
  { title: 'Follow up on WhatsApp', desc: 'Share reports and get guidance without an extra trip.' },
];

/** Plus that turns into a cross — drawn with two bars, no icon font. */
const PlusToggle: React.FC<{ open: boolean }> = ({ open }) => (
  <motion.span
    animate={{ rotate: open ? 45 : 0 }}
    transition={{ type: 'spring', stiffness: 420, damping: 26 }}
    className={`relative w-7 h-7 rounded-full shrink-0 transition-colors ${open ? 'bg-rose' : 'bg-plum/[0.06]'}`}
    aria-hidden="true"
  >
    <span className={`absolute left-1/2 top-1/2 w-3 h-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full ${open ? 'bg-white' : 'bg-plum'}`} />
    <span className={`absolute left-1/2 top-1/2 w-[2px] h-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${open ? 'bg-white' : 'bg-plum'}`} />
  </motion.span>
);

export const ServicesScreen: React.FC<ServicesScreenProps> = ({
  onBack,
  onContactClinic,
  onBookAppointment,
}) => {
  const [openTreatment, setOpenTreatment] = useState<string | null>(null);

  return (
    <section aria-label="Thaai Clinic Services - General Physician in Karaikal" className="flex-1 overflow-y-auto pb-28 bg-blush">
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
              Newly Established Clinic
            </span>
            <OpenStatusPill tone="dark" />
          </div>
        </motion.div>

        {/* ── PROMISE BAND ──────────────────────────────────────────── */}
        <section aria-label="Why families choose Thaai Clinic" className="relative overflow-hidden rounded-[26px] bg-plum text-white px-5 py-5">
          <Kolam n={3} step={12} stroke="rgba(255,255,255,0.09)" className="absolute -right-20 -bottom-20 w-48 h-48" />
          <p className="relative text-[13px] font-semibold text-turmeric mb-2">Why families choose us</p>
          <p className="relative font-display text-[21px] font-semibold leading-[1.35] tracking-[-0.01em]">
            {PROMISES.map((p, i) => (
              <React.Fragment key={p}>
                {p}
                {i < PROMISES.length - 1 && (
                  <KolamMark className="inline-block w-4 h-4 mx-1.5 -mt-1 text-rose align-middle" />
                )}
              </React.Fragment>
            ))}
          </p>
        </section>

        {/* ── WE TREAT ──────────────────────────────────────────────── */}
        <section aria-label="Conditions we treat">
          <SectionTitle title="We treat" note="Common health concerns for individuals and families in Karaikal." />
          <ul className="rounded-[26px] bg-white px-4 shadow-[0_1px_0_rgba(59,10,36,0.05),0_18px_40px_-30px_rgba(59,10,36,0.45)]">
            {TREATMENTS.map(({ name, short, desc, specialist }, i) => {
              const open = openTreatment === name;
              return (
                <li key={name} className={i > 0 ? 'border-t border-plum/[0.07]' : ''}>
                  <button
                    onClick={() => setOpenTreatment(open ? null : name)}
                    aria-expanded={open}
                    className="w-full flex items-center gap-3 py-3.5 text-left cursor-pointer"
                  >
                    <span className="flex-1 min-w-0">
                      <span className="flex items-center gap-2">
                        <span className="font-display text-[17px] font-bold text-plum tracking-[-0.01em]">{name}</span>
                        {specialist && (
                          <span className="text-[11px] font-semibold text-plum bg-turmeric/25 px-2 py-0.5 rounded-full">Specialist</span>
                        )}
                      </span>
                      <span className="block text-[13px] text-plum/55 mt-0.5">{short}</span>
                    </span>
                    <PlusToggle open={open} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: EASE_OUT }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 pr-10">
                          <p className="text-[13.5px] text-plum/75 leading-relaxed">{desc}</p>
                          <button
                            onClick={onBookAppointment}
                            className="mt-2 text-[13px] font-semibold text-rose underline underline-offset-4 decoration-rose/30 cursor-pointer"
                          >
                            Book a visit for this
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ── HOW A VISIT WORKS ─────────────────────────────────────── */}
        <section aria-label="How a visit works">
          <SectionTitle title="How a visit works" />
          <ol className="relative pl-12">
            <span className="absolute left-[17px] top-4 bottom-6 border-l-2 border-dotted border-rose/40" aria-hidden="true" />
            {VISIT_STEPS.map(({ title, desc }, i) => (
              <li key={title} className="relative pb-5 last:pb-0">
                <span className="absolute -left-12 top-0 w-9 h-9 rounded-full bg-blush ring-2 ring-rose/30 flex items-center justify-center font-display text-[17px] font-bold text-rose">
                  {i + 1}
                </span>
                <p className="font-display text-[17px] font-bold text-plum leading-tight pt-1.5">{title}</p>
                <p className="text-[13.5px] text-plum/60 leading-snug mt-1">{desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── CONTACT ───────────────────────────────────────────────── */}
        <section aria-label="Contact the clinic" className="rounded-[26px] bg-rose text-white p-5 relative overflow-hidden">
          <Kolam n={2} step={14} stroke="rgba(255,255,255,0.2)" className="absolute -right-12 -top-12 w-36 h-36" />
          <p className="relative font-display text-[22px] font-bold leading-tight tracking-[-0.02em] max-w-[85%]">Not sure what you need?</p>
          <p className="relative text-[14px] text-white/85 mt-1">Call us and we’ll tell you whether to come in.</p>
          <div className="relative flex gap-2 mt-4">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onContactClinic}
              className="flex-1 bg-white text-rose font-semibold py-3 rounded-2xl text-[14px] cursor-pointer"
            >
              Call the clinic
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onBookAppointment}
              className="flex-1 bg-white/15 text-white font-semibold py-3 rounded-2xl text-[14px] cursor-pointer"
            >
              Book a visit
            </motion.button>
          </div>
        </section>
      </div>
    </section>
  );
};
