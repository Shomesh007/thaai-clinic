import React from 'react';
import {
  ArrowRight,
  Heart,
  Baby,
  Droplet,
  Wind,
  Users,
} from 'lucide-react';
import welcomeBg from '../assets/welcome_background.png';
import thaiClinicLogo from '../assets/thai_clinic_logo.png';
import childHealthIcon from '../assets/child_health.png';
import diabetesCareIcon from '../assets/diabetes_care.png';
import respiratoryCareIcon from '../assets/respiratory_care.png';
import generalConsultationIcon from '../assets/general_consulation.png';
import { TabType } from '../types';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  setActiveTab: (tab: TabType) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onGetStarted,
  setActiveTab,
}) => {
  return (
    <div
      className="flex-1 overflow-y-auto pb-12 bg-no-repeat bg-local text-gray-800 selection:bg-pink-100 selection:text-pink-600"
      style={{
        backgroundImage: `url(${welcomeBg})`,
        backgroundColor: '#FFF5F8',
        backgroundSize: '100% auto',
        backgroundPosition: 'center -80px',
        backgroundAttachment: 'local',
      }}
    >
      <div className="px-5 py-6 space-y-6 max-w-[430px] mx-auto text-center">

        {/* 1. TOP HEADER LOGO IMAGE SECTION */}
        <div className="-mt-3 flex flex-col items-center justify-center space-y-1">
          <img
            src={thaiClinicLogo}
            alt="THAAI CLINIC Logo"
            className="w-48 sm:w-56 h-auto max-h-36 object-contain mx-auto"
          />
          <p className="text-xs sm:text-sm font-extrabold text-[#1F7A43] tracking-wide text-center">
            தாய் மக்கள் மருத்துவகம்
          </p>
        </div>

        {/* 2. HERO ILLUSTRATION & TAGLINES */}
        <div className="relative pt-2 pb-1 space-y-4">
          {/* EKG / Heartbeat Subtle Line & Floating Hearts Backdrop Graphic (Space preserved for custom artwork) */}
          <div className="relative mx-auto w-full max-w-[280px] h-[210px] rounded-3xl bg-transparent p-4 flex flex-col items-center justify-center overflow-hidden">
          </div>

          {/* Compassionate Care Tagline Text */}
          <div className="space-y-0.5">
            <h3 className="text-base sm:text-lg font-bold text-[#1E2863] tracking-tight">
              Compassionate care for
            </h3>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#C2005A] tracking-tight">
              you and your family
            </h2>
            <div className="flex items-center justify-center gap-2 pt-1 text-pink-400">
              <span className="w-8 h-[1px] bg-pink-200"></span>
              <Heart className="w-3.5 h-3.5 fill-[#C2005A] stroke-[#C2005A]" />
              <span className="w-8 h-[1px] bg-pink-200"></span>
            </div>
          </div>
        </div>

        {/* 3. 4-COLUMN KEY SPECIALTIES GRID */}
        <div className="grid grid-cols-4 gap-2 text-center -mt-4">
          {/* 1. Child Health */}
          <button
            onClick={onGetStarted}
            className="bg-white border border-pink-100/80 rounded-2xl p-2 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:border-pink-300 transition-all group active:scale-95 cursor-pointer"
          >
            <img
              src={childHealthIcon}
              alt="Child Health"
              className="w-12 h-12 object-contain mb-1 transition-transform group-hover:scale-105"
            />
            <span className="text-[11px] font-bold text-gray-800 group-hover:text-pink-600 leading-tight">
              Child<br />Health
            </span>
          </button>

          {/* 2. Diabetes Care */}
          <button
            onClick={onGetStarted}
            className="bg-white border border-pink-100/80 rounded-2xl p-2 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:border-blue-300 transition-all group active:scale-95 cursor-pointer"
          >
            <img
              src={diabetesCareIcon}
              alt="Diabetes Care"
              className="w-12 h-12 object-contain mb-1 transition-transform group-hover:scale-105"
            />
            <span className="text-[11px] font-bold text-gray-800 group-hover:text-blue-600 leading-tight">
              Diabetes<br />Care
            </span>
          </button>

          {/* 3. Respiratory Care */}
          <button
            onClick={onGetStarted}
            className="bg-white border border-pink-100/80 rounded-2xl p-2 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:border-sky-300 transition-all group active:scale-95 cursor-pointer"
          >
            <img
              src={respiratoryCareIcon}
              alt="Respiratory Care"
              className="w-12 h-12 object-contain mb-1 transition-transform group-hover:scale-105"
            />
            <span className="text-[11px] font-bold text-gray-800 group-hover:text-sky-700 leading-tight">
              Respiratory<br />Care
            </span>
          </button>

          {/* 4. General Consultation */}
          <button
            onClick={onGetStarted}
            className="bg-white border border-pink-100/80 rounded-2xl p-2 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all group active:scale-95 cursor-pointer"
          >
            <img
              src={generalConsultationIcon}
              alt="General Consultation"
              className="w-12 h-12 object-contain mb-1 transition-transform group-hover:scale-105"
            />
            <span className="text-[11px] font-bold text-gray-800 group-hover:text-emerald-700 leading-tight">
              General<br />Consultation
            </span>
          </button>
        </div>

        {/* 4. PRIMARY "GET STARTED" CTA BUTTON */}
        <div className="pt-2">
          <button
            onClick={onGetStarted}
            className="w-full bg-[#D8005A] hover:bg-[#BE0050] text-white py-3.5 px-6 rounded-full flex items-center justify-between shadow-lg shadow-pink-200/80 transition-all active:scale-[0.98] cursor-pointer group"
          >
            <span className="text-base font-extrabold tracking-wide pl-2">Get Started</span>
            <div className="w-8 h-8 rounded-full bg-white text-[#D8005A] flex items-center justify-center shadow-xs transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="w-4.5 h-4.5 stroke-[3]" />
            </div>
          </button>
        </div>

        {/* 5. FOOTER TAMIL SLOGAN */}
        <div className="pt-0 -mt-1 space-y-1">
          {/* Tamil Footer Slogan */}
          <p className="text-xs font-bold text-[#1E2863] tracking-wide">
            உங்கள் ஆரோக்கியம், எங்கள் பொறுப்பு
          </p>

          {/* Heart Divider Line */}
          <div className="flex items-center justify-center gap-2 text-pink-300">
            <span className="w-8 h-[1px] bg-pink-200"></span>
            <Heart className="w-3 h-3 fill-pink-400 stroke-pink-400" />
            <span className="w-8 h-[1px] bg-pink-200"></span>
          </div>
        </div>

      </div>
    </div>
  );
};
