import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  PhoneCall,
  MessageCircle,
  Send,
  AlertTriangle,
  Zap,
  Phone,
} from 'lucide-react';
import { HeaderNav } from './HeaderNav';
import { TabType } from '../types';
import { EASE_OUT, fadeUp, stagger } from './ui/Motion';
import { OpenStatusPill } from './ui/OpenStatus';

interface ConsultNowScreenProps {
  setActiveTab: (tab: TabType) => void;
  onOpenCall: () => void;
  onOpenWhatsApp: () => void;
}

const QUICK_SYMPTOMS = ['Fever', 'Cough & cold', 'Stomach pain', 'High sugar', 'Headache', 'Child unwell'];

export const ConsultNowScreen: React.FC<ConsultNowScreenProps> = ({
  setActiveTab,
  onOpenCall,
  onOpenWhatsApp,
}) => {
  const [symptoms, setSymptoms] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;
    setSubmitted(true);
  };

  const addSymptom = (s: string) =>
    setSymptoms((prev) => (prev.toLowerCase().includes(s.toLowerCase()) ? prev : prev ? `${prev}, ${s}` : s));

  return (
    <div className="flex-1 overflow-y-auto pb-28 bg-[#FAF5F7]">
      <HeaderNav
        title="Consult Now"
        subtitle="Quick medical assistance & doctor connection"
        onBack={() => setActiveTab('home')}
      />

      <div className="px-4 pt-4 space-y-5">
        <div className="flex justify-center">
          <OpenStatusPill />
        </div>

        {/* Instant Connect Cards */}
        <motion.div variants={stagger(0.05, 0.1)} initial="hidden" animate="show" className="grid grid-cols-2 gap-3">
          <motion.button
            variants={fadeUp}
            whileTap={{ scale: 0.96 }}
            whileHover={{ y: -2 }}
            onClick={onOpenWhatsApp}
            className="relative overflow-hidden bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-3xl p-4 text-left text-white shadow-lg shadow-emerald-200 cursor-pointer"
          >
            <div className="relative w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center mb-3">
              <span className="absolute inset-0 rounded-2xl bg-white/30 animate-pulse-ring" aria-hidden="true" />
              <MessageCircle className="relative w-6 h-6 fill-white stroke-none" />
            </div>
            <h3 className="font-extrabold text-sm">WhatsApp Doctor</h3>
            <p className="text-[10px] text-emerald-50 font-medium mt-0.5">Instant chat & reports</p>
          </motion.button>

          <motion.button
            variants={fadeUp}
            whileTap={{ scale: 0.96 }}
            whileHover={{ y: -2 }}
            onClick={onOpenCall}
            className="relative overflow-hidden bg-gradient-to-br from-[#FF2D75] to-[#C2185B] rounded-3xl p-4 text-left text-white shadow-lg shadow-pink-200 cursor-pointer"
          >
            <motion.div
              animate={{ rotate: [0, -12, 12, -8, 8, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2.4 }}
              className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center mb-3"
            >
              <PhoneCall className="w-5 h-5" />
            </motion.div>
            <h3 className="font-extrabold text-sm">Call Clinic</h3>
            <p className="text-[10px] text-pink-100 font-medium mt-0.5">Direct phone line</p>
          </motion.button>
        </motion.div>

        {/* Rapid Symptom Callback Request Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: EASE_OUT }}
          className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs space-y-4"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
            </div>
            <h3 className="font-extrabold text-gray-900 text-sm">Request Urgent Callback</h3>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {submitted ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-2"
              >
                <svg viewBox="0 0 52 52" className="w-12 h-12 mx-auto" aria-hidden="true">
                  <motion.circle
                    cx="26" cy="26" r="23" fill="none" stroke="#059669" strokeWidth="3"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }}
                  />
                  <motion.path
                    d="M15 27 L23 34 L38 18" fill="none" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35, delay: 0.45 }}
                  />
                </svg>
                <h4 className="font-extrabold text-emerald-900 text-sm">Callback Request Sent</h4>
                <p className="text-xs text-emerald-700">
                  Dr. Sakthimaindan's team will contact you shortly on your registered phone number.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setSymptoms('');
                  }}
                  className="text-xs font-bold text-emerald-800 underline pt-1 cursor-pointer"
                >
                  Submit another request
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-3"
              >
                <div>
                  <label htmlFor="consult-symptoms" className="text-xs font-bold text-gray-700 block mb-2">
                    Describe Your Current Symptoms
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {QUICK_SYMPTOMS.map((s) => (
                      <motion.button
                        key={s}
                        type="button"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addSymptom(s)}
                        className="text-[10px] font-bold text-pink-700 bg-pink-50 border border-pink-100 px-2.5 py-1 rounded-full cursor-pointer"
                      >
                        + {s}
                      </motion.button>
                    ))}
                  </div>
                  <textarea
                    id="consult-symptoms"
                    rows={3}
                    required
                    placeholder="e.g. High fever since morning, severe sore throat..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-extrabold py-3.5 rounded-2xl shadow-md shadow-pink-200 text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Request Doctor Callback
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Emergency Notice */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: EASE_OUT }}
          className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3"
        >
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs text-rose-900 space-y-2 font-medium">
            <strong className="font-extrabold block">Medical Emergency?</strong>
            <p>
              For severe chest pain, breathing difficulty, or trauma emergencies, please call 108 or visit the nearest
              emergency care hospital immediately.
            </p>
            <a
              href="tel:108"
              className="inline-flex items-center gap-1.5 bg-rose-600 text-white font-extrabold px-3 py-1.5 rounded-full text-[11px]"
            >
              <Phone className="w-3 h-3" /> Call 108
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
