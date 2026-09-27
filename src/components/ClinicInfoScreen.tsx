import React from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Award,
  Stethoscope,
  Building2,
  ExternalLink,
  ShieldCheck,
  Navigation,
  Copy,
  Check,
} from 'lucide-react';
import { HeaderNav } from './HeaderNav';
import { TabType } from '../types';
import drSakthiImage from '../assets/dr_sakthi_image.jpeg';
import { EASE_OUT, Reveal, SectionTitle } from './ui/Motion';
import { OpenStatusPill } from './ui/OpenStatus';
import { BuiltByBadge } from './ui/BuiltByBadge';
import { SESSIONS, useClinicStatus } from '../lib/clinicHours';

interface ClinicInfoScreenProps {
  setActiveTab: (tab: TabType) => void;
  onOpenCall: () => void;
  onOpenWhatsApp: () => void;
}

const ADDRESS = 'Thaai Clinic, 385, Bharathiyar Road, Kovil Pathu, Karaikal, Puducherry 609602';

// Day strip spans 6 AM → midnight
const DAY_START = 6 * 60;
const DAY_END = 24 * 60;
const pct = (mins: number) => ((Math.min(Math.max(mins, DAY_START), DAY_END) - DAY_START) / (DAY_END - DAY_START)) * 100;

/** Horizontal "today" strip showing both sessions and a live now-marker. */
const DayStrip: React.FC = () => {
  const status = useClinicStatus();
  const nowInRange = status.minutes >= DAY_START;
  return (
    <div className="pt-1">
      <div className="relative h-9 rounded-xl bg-slate-100 overflow-hidden">
        {SESSIONS.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 + i * 0.15 }}
            className={`absolute top-1 bottom-1 rounded-lg origin-left flex items-center justify-center text-[10px] font-extrabold ${
              status.current?.id === s.id
                ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white shadow-sm'
                : 'bg-emerald-100 text-emerald-800'
            }`}
            style={{ left: `${pct(s.start)}%`, width: `${pct(s.end) - pct(s.start)}%` }}
          >
            {s.label}
          </motion.div>
        ))}
        {nowInRange && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute top-0 bottom-0 w-0.5 bg-pink-600"
            style={{ left: `${pct(status.minutes)}%` }}
            aria-label="Current time"
          >
            <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-pink-600 ring-2 ring-white" />
          </motion.div>
        )}
      </div>
      <div className="flex justify-between text-[9px] font-bold text-gray-400 mt-1 px-0.5">
        <span>6 AM</span>
        <span>12 PM</span>
        <span>6 PM</span>
        <span>12 AM</span>
      </div>
    </div>
  );
};

export const ClinicInfoScreen: React.FC<ClinicInfoScreenProps> = ({
  setActiveTab,
  onOpenCall,
  onOpenWhatsApp,
}) => {
  const [copied, setCopied] = React.useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section aria-label="Thaai Clinic Information - Karaikal Puducherry" className="flex-1 overflow-y-auto pb-28 bg-[#FAF5F7]">
      <HeaderNav
        title="Clinic Information"
        subtitle="Thaai Clinic • Karaikal"
        onBack={() => setActiveTab('home')}
      />

      <div className="px-4 pt-4 space-y-6">
        {/* ── HERO ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-[#FF2D75] via-[#E91E63] to-[#AD1457] text-white shadow-xl shadow-pink-900/15"
        >
          <div className="absolute inset-0 bg-dots opacity-50" aria-hidden="true" />
          <Building2 className="absolute -right-5 -bottom-5 w-32 h-32 text-white/10" aria-hidden="true" />
          <div className="relative">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] bg-white text-emerald-700 px-2.5 py-1 rounded-full">
              Newly Established Clinic
            </span>
            <h2 className="text-2xl font-extrabold mt-3 tracking-tight">Thaai Clinic</h2>
            <p className="text-xs text-pink-100 font-semibold">General & Family Medicine · Karaikal</p>
            <div className="mt-3">
              <OpenStatusPill tone="dark" />
            </div>
            <div className="flex gap-2 mt-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('book-appointment')}
                className="flex-1 bg-white text-pink-700 font-extrabold py-3 rounded-2xl text-xs shadow-lg cursor-pointer"
              >
                Book Appointment
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onOpenWhatsApp}
                className="px-4 bg-[#25D366] text-white font-extrabold py-3 rounded-2xl text-xs flex items-center gap-1.5 shadow-lg cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white stroke-none" /> WhatsApp
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* ── CONSULTATION HOURS ────────────────────────────────────── */}
        <Reveal as="section" aria-label="Consultation Hours">
          <SectionTitle eyebrow="Open all 7 days" title="Consultation Hours" icon={<Clock className="w-4 h-4" />} />
          <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-2xs space-y-3">
            <DayStrip />
            <div className="grid grid-cols-2 gap-2 text-xs">
              {SESSIONS.map((s) => (
                <div key={s.id} className="p-3 bg-slate-50 rounded-2xl">
                  <span className="font-bold text-gray-500 text-[10px] uppercase tracking-wider">{s.label} Session</span>
                  <span className="block font-extrabold text-emerald-800 mt-0.5">{s.range}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── PRIMARY CONSULTANT ────────────────────────────────────── */}
        <Reveal as="section" aria-label="Primary Consultant">
          <SectionTitle eyebrow="Primary consultant" title="Your doctor" icon={<Stethoscope className="w-4 h-4" />} />
          <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-2xs space-y-3">
            <div className="flex items-center gap-3.5">
              <img
                src={drSakthiImage}
                alt="Dr. Sakthimaindan"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-pink-100 shadow-2xs shrink-0"
              />
              <div>
                <h4 className="font-extrabold text-gray-900 text-sm">Dr. Sakthimaindan Karthigeyan</h4>
                <p className="text-xs text-pink-600 font-bold">General Physician</p>
                <p className="text-[11px] text-gray-500 font-semibold mt-0.5">MBBS, CCH, CCPE, ACDM (UK)</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-gray-700">
              <div className="flex items-center gap-1.5 p-2.5 bg-pink-50/60 rounded-xl">
                <Award className="w-4 h-4 text-pink-600" /> General Physician
              </div>
              <div className="flex items-center gap-1.5 p-2.5 bg-emerald-50/60 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Certified Care
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab('about-doctor')}
              className="w-full bg-gray-900 text-white font-extrabold py-3 px-4 rounded-2xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              View full doctor profile
            </motion.button>
          </div>
        </Reveal>

        {/* ── ADDRESS & MAP ─────────────────────────────────────────── */}
        <Reveal as="section" aria-label="Address & Location">
          <SectionTitle eyebrow="Opp. Kovil Pathu Bus Stand" title="Address & Location" icon={<MapPin className="w-4 h-4" />} />
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xs overflow-hidden">
            <div className="p-4 space-y-3">
              <div className="flex items-start gap-2">
                <p className="flex-1 text-xs font-semibold text-gray-800 leading-relaxed">{ADDRESS}</p>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={copyAddress}
                  aria-label="Copy address"
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                    copied ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-gray-500'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </motion.button>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={onOpenCall}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-gray-800 font-bold py-2.5 rounded-2xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-pink-600" /> Call Clinic
                </motion.button>
                <motion.a
                  whileTap={{ scale: 0.96 }}
                  href="https://maps.google.com/?q=Thaai+Clinic+Karaikal"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2.5 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-pink-200"
                >
                  <Navigation className="w-3.5 h-3.5 fill-white stroke-none" /> Directions <ExternalLink className="w-3 h-3" />
                </motion.a>
              </div>
            </div>
            {/* Lazy-loaded Google Maps Embed for Geographic SEO Signal */}
            <iframe
              title="Thaai Clinic Karaikal Location on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.0!2d79.83451!3d10.92254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sThaai+Clinic!5e0!3m2!1sen!2sin!4v1690000000000"
              width="100%"
              height="170"
              style={{ border: 0, display: 'block' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        <BuiltByBadge onOpenCredits={() => setActiveTab('credits')} />
      </div>
    </section>
  );
};
