import React from 'react';
import {
  User,
  Users,
  Heart,
  Shield,
  Smile,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  Stethoscope,
} from 'lucide-react';
import { HeaderNav } from './HeaderNav';

interface ServicesScreenProps {
  onBack: () => void;
  onContactClinic: () => void;
  onBookAppointment: () => void;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = ({
  onBack,
  onContactClinic,
  onBookAppointment,
}) => {
  const treatments = [
    'Fever, Cold & Cough',
    'General Weakness',
    'Stomach Issues',
    'Diabetes Management',
    'Child Vaccination',
    'Weight Management',
    'Health Checkups',
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-24 bg-white">
      <HeaderNav
        title="Our Services"
        subtitle="Quality care for you and your family"
        onBack={onBack}
        showHeart={true}
      />

      <div className="px-6 pt-5 space-y-6">
        {/* Doctor Summary Card */}
        <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center border-2 border-pink-50 text-pink-600 shrink-0 shadow-inner">
            <User className="w-8 h-8 stroke-[1.8]" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 leading-tight">
              Dr. Sakthimaindan Karthikeyan
            </h2>
            <p className="text-pink-600 font-bold text-sm">General Physician</p>
            <p className="text-[11px] text-pink-500 font-semibold mt-0.5">
              MBBS, CCH, CCPE, ACDM (UK)
            </p>
          </div>
        </div>

        {/* Newly Established Clinic Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100/80">
            Newly Established Clinic
          </span>
        </div>

        {/* 4 Feature Badges */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mb-1.5">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-gray-800 leading-tight">
              Care for<br />All Ages
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center mb-1.5">
              <Heart className="w-5 h-5 fill-pink-500/20" />
            </div>
            <span className="text-[10px] font-bold text-gray-800 leading-tight">
              Personalized<br />Attention
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-1.5">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-gray-800 leading-tight">
              Trusted<br />Care
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-1.5">
              <Smile className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-gray-800 leading-tight">
              Community<br />Focused
            </span>
          </div>
        </div>

        {/* We Treat Section */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xl font-bold text-gray-900">We Treat</h3>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">
            Comprehensive care for common health concerns for individuals and families.
          </p>

          <div className="flex items-center gap-4 pt-2">
            {/* Left pink graphic illustration */}
            <div className="w-32 h-36 rounded-3xl bg-pink-50 flex flex-col items-center justify-center p-3 text-pink-300 relative overflow-hidden shrink-0">
              <div className="w-12 h-12 rounded-full bg-pink-200/80 flex items-center justify-center mb-1">
                <div className="w-6 h-6 rounded-full bg-pink-400" />
              </div>
              <div className="w-16 h-10 rounded-t-2xl bg-pink-300/80" />
              <Stethoscope className="w-6 h-6 text-pink-500 absolute bottom-3 right-3 opacity-60" />
            </div>

            {/* Treatment Checklist */}
            <div className="flex-1 space-y-2">
              {treatments.map((treatment, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-pink-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs font-bold text-gray-800">{treatment}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Have Questions? Contact Clinic Card */}
        <div className="p-5 rounded-3xl bg-slate-50/80 border border-gray-100 flex items-center justify-between mt-6">
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-extrabold text-gray-900">Have questions?</h4>
              <p className="text-xs text-gray-500 font-semibold">We're here to help.</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={onContactClinic}
                className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-sm shadow-pink-200 transition-all active:scale-95"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Contact Clinic</span>
              </button>

              <button
                onClick={onBookAppointment}
                className="bg-white border border-pink-200 text-pink-600 text-xs font-bold px-3 py-2.5 rounded-2xl hover:bg-pink-50 transition-colors"
              >
                Book Visit
              </button>
            </div>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-pink-100/60 flex items-center justify-center text-pink-600 shrink-0">
            <MessageSquare className="w-7 h-7 fill-pink-500/20 stroke-pink-600" />
          </div>
        </div>
      </div>
    </div>
  );
};
