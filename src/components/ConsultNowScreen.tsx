import React, { useState } from 'react';
import {
  MessageSquare,
  PhoneCall,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import { HeaderNav } from './HeaderNav';
import { TabType } from '../types';

interface ConsultNowScreenProps {
  setActiveTab: (tab: TabType) => void;
  onOpenCall: () => void;
  onOpenWhatsApp: () => void;
}

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

  return (
    <div className="flex-1 overflow-y-auto pb-28 bg-slate-50/50">
      <HeaderNav
        title="Consult Now"
        subtitle="Quick medical assistance & doctor connection"
        onBack={() => setActiveTab('home')}
      />

      <div className="px-5 pt-4 space-y-5">
        {/* Instant Connect Cards */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onOpenWhatsApp}
            className="bg-emerald-50 border border-emerald-200 rounded-3xl p-4 text-left space-y-2 hover:bg-emerald-100/80 transition-all group"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md shadow-emerald-200">
              <MessageCircle className="w-6 h-6 fill-white stroke-none" />
            </div>
            <div>
              <h3 className="font-extrabold text-emerald-950 text-xs group-hover:text-emerald-700">
                WhatsApp Doctor
              </h3>
              <p className="text-[10px] text-emerald-700 font-medium">Instant chat & reports</p>
            </div>
          </button>

          <button
            onClick={onOpenCall}
            className="bg-pink-50 border border-pink-200 rounded-3xl p-4 text-left space-y-2 hover:bg-pink-100/80 transition-all group"
          >
            <div className="w-10 h-10 rounded-2xl bg-pink-600 text-white flex items-center justify-center shadow-md shadow-pink-200">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-pink-950 text-xs group-hover:text-pink-700">
                Call Clinic Directly
              </h3>
              <p className="text-[10px] text-pink-700 font-medium">Direct phone line</p>
            </div>
          </button>
        </div>

        {/* Rapid Symptom Callback Request Form */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500 fill-amber-500/20" />
            <h3 className="font-extrabold text-gray-900 text-sm">Request Urgent Callback</h3>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-extrabold text-emerald-900 text-sm">Callback Request Sent</h4>
              <p className="text-xs text-emerald-700">
                Dr. Sakthimaindan's team will contact you shortly on your registered phone number.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-emerald-800 underline pt-1"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Describe Your Current Symptoms
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. High fever since morning, severe sore throat..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-extrabold py-3.5 rounded-2xl shadow-md shadow-pink-200 text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" /> Request Doctor Callback
              </button>
            </form>
          )}
        </div>

        {/* Emergency Notice */}
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs text-rose-900 space-y-0.5 font-medium">
            <strong className="font-extrabold block">Medical Emergency?</strong>
            <p>
              For severe chest pain, breathing difficulty, or trauma emergencies, please call 108 or visit the nearest emergency care hospital immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
