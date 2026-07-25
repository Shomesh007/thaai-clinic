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

import careForAllAgesIcon from '../assets/care_for_all_ages.png';
import personalisedAttentionIcon from '../assets/personalised_attention.png';
import trustIcon from '../assets/trust.png';
import communityIcon from '../assets/community.png';
import tickMarkIcon from '../assets/tick_mark.png';
import mainServicesImg from '../assets/main_services.png';

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
        {/* Doctor Summary Card with Integrated Newly Established Clinic Banner */}
        <div className="p-4.5 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-3.5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF2D75] to-[#E6005C] flex items-center justify-center text-white shadow-xs shrink-0">
              <Stethoscope className="w-8 h-8 stroke-[2]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                Dr. Sakthimaindan<br />Karthikeyan
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#D8005A] mt-1">
                General Physician
              </p>
              <p className="text-[11px] sm:text-xs font-bold text-[#D8005A] tracking-tight mt-1">
                MBBS, CCH, CCPE, ACDM (UK)
              </p>
            </div>
          </div>

          {/* Integrated Newly Established Clinic Pill Banner */}
          <div className="w-full bg-[#E8F5EE] border border-emerald-100/60 rounded-2xl py-2 px-3.5 text-center">
            <span className="text-xs font-bold text-[#1F6E43] tracking-wide">
              Newly Established Clinic
            </span>
          </div>
        </div>

        {/* 4 Feature Badges */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="flex flex-col items-center">
            <img
              src={careForAllAgesIcon}
              alt="Care for All Ages"
              className="w-12 h-12 object-contain mb-1.5 transition-transform hover:scale-105"
            />
            <span className="text-[10px] font-bold text-gray-800 leading-tight">
              Care for<br />All Ages
            </span>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={personalisedAttentionIcon}
              alt="Personalized Attention"
              className="w-12 h-12 object-contain mb-1.5 transition-transform hover:scale-105"
            />
            <span className="text-[10px] font-bold text-gray-800 leading-tight">
              Personalized<br />Attention
            </span>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={trustIcon}
              alt="Trusted Care"
              className="w-12 h-12 object-contain mb-1.5 transition-transform hover:scale-105"
            />
            <span className="text-[10px] font-bold text-gray-800 leading-tight">
              Trusted<br />Care
            </span>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={communityIcon}
              alt="Community Focused"
              className="w-12 h-12 object-contain mb-1.5 transition-transform hover:scale-105"
            />
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
            {/* Left graphic image */}
            <img
              src={mainServicesImg}
              alt="Main Services"
              className="w-32 h-44 object-contain rounded-2xl shrink-0"
            />

            {/* Treatment Checklist */}
            <div className="flex-1 space-y-2.5">
              {treatments.map((treatment, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <img
                    src={tickMarkIcon}
                    alt="Check"
                    className="w-4 h-4 object-contain shrink-0"
                  />
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
