import React from 'react';
import {
  Bell,
  Calendar,
  ChevronRight,
  Clock,
  PhoneCall,
  MessageCircle,
} from 'lucide-react';
import { Appointment, TabType } from '../types';
import homeBg from '../assets/home-bg.png';
import bookApptIcon from '../assets/book_appointment.png';
import myApptsIcon from '../assets/my_appointments.png';
import consultNowIcon from '../assets/consult_now.png';
import healthRecordsIcon from '../assets/health_records.png';
import healthTipsIcon from '../assets/health_tips.png';
import clinicInfoIcon from '../assets/clinic_info.png';
import drSakthiImage from '../assets/dr_sakthi_image.jpeg';

interface HomeScreenProps {
  upcomingAppointment?: Appointment;
  setActiveTab: (tab: TabType) => void;
  onOpenNotifications: () => void;
  onOpenWhatsApp: () => void;
  onOpenCall: () => void;
  unreadCount: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  upcomingAppointment,
  setActiveTab,
  onOpenNotifications,
  onOpenWhatsApp,
  onOpenCall,
  unreadCount,
}) => {
  return (
    <section
      aria-label="Thaai Clinic Karaikal Home"
      className="flex-1 overflow-y-auto pb-20 bg-no-repeat bg-local"
      style={{
        backgroundImage: `url(${homeBg})`,
        backgroundColor: '#FAF5F7',
        backgroundSize: '100% auto',
        backgroundPosition: 'center -40px',
        backgroundAttachment: 'local',
      }}
    >
      {/* BEGIN: Header Section (Positioned inside upper pink gradient region) */}
      <div className="relative text-white pt-7 pb-2 px-6">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setActiveTab('clinic-info')}
            className="flex flex-col gap-1 p-1 text-white hover:opacity-80 transition-opacity"
            aria-label="Menu"
          >
            <span className="w-5 h-0.5 bg-white rounded-full"></span>
            <span className="w-5 h-0.5 bg-white rounded-full"></span>
            <span className="w-3.5 h-0.5 bg-white rounded-full"></span>
          </button>

          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-full bg-white/15 hover:bg-white/25 transition-colors backdrop-blur-xs"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-white" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-pink-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#BE0055]">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Title and Subtitle */}
        <div className="space-y-1.5 max-w-[240px] ml-2 sm:ml-3">
          {/* SEO H1: Primary keyword included, visually styled as greeting */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2">
            Vanakkam! <span className="animate-bounce inline-block">👋</span>
          </h1>
          <p className="sr-only">Thaai Clinic Karaikal — General Physician Dr. Sakthimaindan</p>
          <p className="text-pink-100 text-base sm:text-lg font-medium leading-snug">
            How can we help<br />you today?
          </p>
        </div>
      </div>
      {/* END: Header Section */}

      {/* Main Content Area (Pushed downward so Upcoming Appointment starts below wave and Clinic Timings sits right above bottom nav) */}
      <div className="px-5 mt-24 sm:mt-28 relative z-10 space-y-4 pb-4">
        {/* BEGIN: Compact Upcoming Appointment Card */}
        {upcomingAppointment ? (
          <div className="bg-[#FFF2F5] border border-pink-100/90 rounded-3xl p-4 sm:p-4.5 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3.5">
                {/* Left Icon Badge */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF2D75] to-[#E6005C] flex items-center justify-center text-white shadow-xs shrink-0 mt-0.5">
                  <Calendar className="w-5 h-5 stroke-[2.2]" />
                </div>

                {/* Middle Text Column & Left-Aligned Pill Button */}
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-gray-900 tracking-tight">
                    Upcoming Appointment
                  </h3>
                  <p className="text-xs text-gray-700 font-medium mt-0.5">
                    {upcomingAppointment.date}
                  </p>
                  <p className="text-lg font-bold text-[#E6005C] tracking-tight mt-0.5">
                    {upcomingAppointment.time}
                  </p>

                  <button
                    onClick={() => setActiveTab('appointments')}
                    className="self-start mt-2.5 py-1 px-4.5 rounded-full border border-[#E6005C] text-[#E6005C] hover:bg-[#E6005C] hover:text-white font-bold text-xs tracking-wide transition-all active:scale-95 bg-white/80"
                  >
                    View / Reschedule
                  </button>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('appointments')}
                className="w-8 h-8 rounded-full bg-[#E6005C] hover:bg-[#C2005A] text-white flex items-center justify-center shadow-xs transition-transform active:scale-90 shrink-0 mt-3.5"
                aria-label="View Appointment Details"
              >
                <ChevronRight className="w-4.5 h-4.5 stroke-[2.8]" />
              </button>
            </div>
          </div>
        ) : (
          /* BEGIN: Improvised Premium Doctor Welcome Banner */
          <div className="bg-white border border-pink-100 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3.5 relative overflow-hidden">
            {/* Background subtle leaf pattern */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pink-50/80 to-transparent rounded-bl-full pointer-events-none"></div>

            <div className="flex items-start gap-3.5 relative z-10">
              {/* Doctor Avatar with Online Status Dot */}
              <div className="relative shrink-0">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-pink-100 via-rose-50 to-pink-50 border border-pink-200 shadow-2xs overflow-hidden">
                  <img src={drSakthiImage} alt="Dr. Sakthimaindan Karthikeyan" className="w-full h-full object-cover" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" title="Available Today"></span>
              </div>

              {/* Doctor Credentials */}
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-extrabold text-[#E91E63] uppercase tracking-wider bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
                    General Physician
                  </span>
                  <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    Karaikal
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-extrabold text-slate-800 tracking-tight pt-0.5">
                  Dr. Sakthimaindan Karthikeyan
                </h2>
                <p className="text-[11px] text-gray-500 font-semibold">
                  MBBS, CCH, CCPE, ACDM (UK)
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-600 font-medium leading-relaxed pt-0.5 relative z-10">
              Providing compassionate family care, preventive checkups, and diabetes management at Thaai Clinic.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-pink-100/80 flex items-center gap-2 relative z-10">
              <button
                onClick={() => setActiveTab('book-appointment')}
                className="flex-1 bg-[#E91E63] hover:bg-[#D8005A] text-white font-extrabold py-2.5 px-3 rounded-2xl text-xs shadow-md shadow-pink-200/80 transition-all active:scale-95 text-center cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" /> Book Appointment
              </button>
              <button
                onClick={() => setActiveTab('about-doctor')}
                className="flex-1 bg-pink-50/80 hover:bg-pink-100 text-[#E91E63] font-extrabold py-2.5 px-3 rounded-2xl text-xs border border-pink-200/80 transition-all active:scale-95 text-center cursor-pointer flex items-center justify-center gap-1.5"
              >
                About Doctor <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          /* END: Improvised Premium Doctor Welcome Banner */
        )}
        {/* END: Upcoming Appointment Card */}

        {/* BEGIN: Quick Access Section */}
        <div>
          <h2 className="text-xs sm:text-sm font-bold text-indigo-950 mb-2.5 px-1">Quick Access</h2>
          <div className="grid grid-cols-3 gap-2.5">
            {/* 1. Book Appointment */}
            <button
              onClick={() => setActiveTab('book-appointment')}
              className="bg-white border border-gray-100/80 rounded-2xl p-3 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:border-pink-200 transition-all group active:scale-95"
            >
              <img
                src={bookApptIcon}
                alt="Book appointment with Dr. Sakthimaindan at Thaai Clinic Karaikal"
                className="w-12 h-12 object-contain mb-1.5 transition-transform group-hover:scale-105"
              />
              <span className="text-[11px] font-bold text-gray-800 group-hover:text-pink-600 leading-snug">
                Book<br />Appointment
              </span>
            </button>

            {/* 2. My Appointments */}
            <button
              onClick={() => setActiveTab('appointments')}
              className="bg-white border border-gray-100/80 rounded-2xl p-3 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:border-blue-200 transition-all group active:scale-95"
            >
              <img
                src={myApptsIcon}
                alt="View my appointments at Thaai Clinic"
                className="w-12 h-12 object-contain mb-1.5 transition-transform group-hover:scale-105"
              />
              <span className="text-[11px] font-bold text-gray-800 group-hover:text-blue-600 leading-snug">
                My<br />Appointments
              </span>
            </button>

            {/* 3. Consult Now */}
            <button
              onClick={() => setActiveTab('consult-now')}
              className="bg-white border border-gray-100/80 rounded-2xl p-3 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:border-emerald-200 transition-all group active:scale-95"
            >
              <img
                src={consultNowIcon}
                alt="Consult now with general physician in Karaikal"
                className="w-12 h-12 object-contain mb-1.5 transition-transform group-hover:scale-105"
              />
              <span className="text-[11px] font-bold text-gray-800 group-hover:text-emerald-600 leading-snug">
                Consult<br />Now
              </span>
            </button>

            {/* 4. Health Records */}
            <button
              onClick={() => setActiveTab('health-records')}
              className="bg-white border border-gray-100/80 rounded-2xl p-3 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all group active:scale-95"
            >
              <img
                src={healthRecordsIcon}
                alt="Access health records at Thaai Clinic Karaikal"
                className="w-12 h-12 object-contain mb-1.5 transition-transform group-hover:scale-105"
              />
              <span className="text-[11px] font-bold text-gray-800 group-hover:text-indigo-600 leading-snug">
                Health<br />Records
              </span>
            </button>

            {/* 5. Health Tips */}
            <button
              onClick={() => setActiveTab('health-tips')}
              className="bg-white border border-gray-100/80 rounded-2xl p-3 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:border-amber-200 transition-all group active:scale-95"
            >
              <img
                src={healthTipsIcon}
                alt="Health tips and wellness advice from Dr. Sakthimaindan"
                className="w-12 h-12 object-contain mb-1.5 transition-transform group-hover:scale-105"
              />
              <span className="text-[11px] font-bold text-gray-800 group-hover:text-amber-600 leading-snug">
                Health<br />Tips
              </span>
            </button>

            {/* 6. Clinic Info */}
            <button
              onClick={() => setActiveTab('clinic-info')}
              className="bg-white border border-gray-100/80 rounded-2xl p-3 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:border-purple-200 transition-all group active:scale-95"
            >
              <img
                src={clinicInfoIcon}
                alt="Thaai Clinic information, address, and timings in Karaikal"
                className="w-12 h-12 object-contain mb-1.5 transition-transform group-hover:scale-105"
              />
              <span className="text-[11px] font-bold text-gray-800 group-hover:text-purple-600 leading-snug">
                Clinic<br />Info
              </span>
            </button>
          </div>
        </div>

        {/* BEGIN: Need Help WhatsApp Card */}
        <div className="bg-[#F2F7F9] border border-indigo-100/50 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs">
          <div>
            <h3 className="font-extrabold text-indigo-950 text-xs sm:text-sm">Need Help?</h3>
            <p className="text-gray-500 text-xs font-medium mt-0.5">Call or WhatsApp us</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCall}
              className="w-9 h-9 rounded-full bg-white border border-emerald-200 text-emerald-600 flex items-center justify-center hover:bg-emerald-50 transition-colors shadow-2xs"
              title="Call Clinic"
            >
              <PhoneCall className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenWhatsApp}
              className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-sm transition-transform active:scale-95"
              title="WhatsApp Clinic"
            >
              <MessageCircle className="w-5 h-5 fill-white stroke-none" />
            </button>
          </div>
        </div>
        {/* END: Need Help WhatsApp Card */}

        {/* BEGIN: Clinic Timings Banner */}
        <div className="bg-[#F0F9F5] border border-emerald-100/60 rounded-2xl p-3.5 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full border border-emerald-200 bg-white flex items-center justify-center text-emerald-600 shrink-0">
            <Clock className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h3 className="font-extrabold text-emerald-950 text-xs sm:text-sm tracking-tight">Clinic Timings</h3>
            <div className="mt-0.5 text-xs space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-emerald-700/70 font-semibold text-[10px] w-14">Morning</span>
                <span className="font-bold text-emerald-900 text-xs">8:00 AM - 1:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-700/70 font-semibold text-[10px] w-14">Evening</span>
                <span className="font-bold text-emerald-900 text-xs">5:00 PM - 11:00 PM</span>
              </div>
            </div>
          </div>
        </div>
        {/* END: Clinic Timings Banner */}
      </div>
    </section>
  );
};
