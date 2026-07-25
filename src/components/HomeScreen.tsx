import React from 'react';
import {
  Bell,
  Calendar,
  ClipboardList,
  MessageSquare,
  Plus,
  Heart,
  Info,
  Clock,
  ChevronRight,
  PhoneCall,
  MessageCircle,
} from 'lucide-react';
import { Appointment, TabType } from '../types';

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
    <div className="flex-1 overflow-y-auto pb-24 bg-[#FAF5F7]">
      {/* BEGIN: Top Header Flowing Pink Banner with Architectural Line Art */}
      <div className="relative bg-[#C2005A] text-white overflow-hidden shadow-sm">
        {/* SVG Flowing Wave and Architecture Background Art */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 375 240"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Smooth organic bottom wave contour */}
            <path
              d="M0 0 H375 V140 C320 120 280 150 200 170 C120 185 60 140 0 160 Z"
              fill="#BE0055"
            />

            {/* Detailed White Architectural Line Art on Right (Church / Tower Silhouette) */}
            <g stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9">
              {/* Tall Clock Tower (Right) */}
              {/* Tower Spire & Cross */}
              <line x1="325" y1="52" x2="325" y2="60" strokeWidth="1.5" />
              <line x1="322" y1="55" x2="328" y2="55" strokeWidth="1.5" />
              <path d="M320 66 C320 60 330 60 330 66 L332 78 H318 Z" />
              {/* Tower Dome Cap */}
              <path d="M316 78 C316 72 334 72 334 78 H316 Z" />
              {/* Upper Balcony */}
              <rect x="314" y="78" width="22" height="4" rx="1" fill="white" fillOpacity="0.2" />
              {/* Belfry Section */}
              <rect x="316" y="82" width="18" height="20" />
              <path d="M321 90 C321 86 329 86 329 90 V102 H321 Z" /> {/* Arched window */}
              {/* Mid Balcony */}
              <rect x="312" y="102" width="26" height="5" rx="1" fill="white" fillOpacity="0.2" />
              {/* Clock Level */}
              <rect x="314" y="107" width="22" height="22" />
              <circle cx="325" cy="118" r="6" strokeWidth="1" /> {/* Clock Face */}
              <line x1="325" y1="118" x2="325" y2="114" />
              <line x1="325" y1="118" x2="328" y2="118" />
              {/* Lower Balcony */}
              <rect x="310" y="129" width="30" height="5" rx="1" fill="white" fillOpacity="0.2" />
              {/* Tower Base */}
              <rect x="312" y="134" width="26" height="18" />
              <path d="M320 142 C320 137 330 137 330 142 V152 H320 Z" />

              {/* Main Cathedral / Sanctuary (Center-Right) */}
              {/* Central Dome & Cross */}
              <line x1="272" y1="80" x2="272" y2="86" strokeWidth="1.5" />
              <line x1="269" y1="82" x2="275" y2="82" strokeWidth="1.5" />
              <path d="M260 98 C260 88 284 88 284 98 H260 Z" />
              <rect x="264" y="98" width="16" height="8" />
              {/* Dome Drum Windows */}
              <line x1="268" y1="101" x2="268" y2="104" />
              <line x1="272" y1="101" x2="272" y2="104" />
              <line x1="276" y1="101" x2="276" y2="104" />
              {/* Pediment & Roofline */}
              <path d="M245 116 L272 106 L299 116 H245 Z" />
              <rect x="248" y="116" width="48" height="24" />
              {/* Facade Columns & Arches */}
              <path d="M262 126 C262 120 282 120 282 126 V140 H262 Z" />
              <line x1="254" y1="116" x2="254" y2="140" />
              <line x1="290" y1="116" x2="290" y2="140" />

              {/* Left Wing / Portico Architecture */}
              <path d="M205 130 L225 122 L245 130 H205 Z" />
              <rect x="208" y="130" width="34" height="20" />
              <path d="M214 138 C214 134 222 134 222 138 V150 H214 Z" />
              <path d="M228 138 C228 134 236 134 236 138 V150 H228 Z" />

              {/* Far Left Small Roofline Extension */}
              <rect x="190" y="138" width="18" height="15" />
              <path d="M194 144 C194 141 200 141 200 144 V153 H194 Z" />

              {/* Far Right Roof Extension behind tower */}
              <path d="M338 130 L365 130 L370 138 H338 Z" />
              <rect x="338" y="138" width="32" height="16" />
              <path d="M346 144 C346 141 354 141 354 144 V154 H346 Z" />
            </g>
          </svg>
        </div>

        {/* Content inside Top Banner */}
        <div className="relative z-10 pt-7 pb-14 px-6">
          {/* Top Bar: Navigation & Bell */}
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={() => setActiveTab('clinic-info')}
              className="flex flex-col gap-1.5 p-1.5 text-white hover:opacity-80 transition-opacity"
              aria-label="Menu"
            >
              <span className="w-6 h-0.5 bg-white rounded-full"></span>
              <span className="w-4 h-0.5 bg-white rounded-full"></span>
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

          {/* Title and Subtitle within Pink Gradient */}
          <div className="space-y-1 max-w-[240px]">
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              Vanakkam! <span className="animate-bounce inline-block">👋</span>
            </h1>
            <p className="text-pink-100 text-base font-medium leading-snug">
              How can we help you today?
            </p>
          </div>
        </div>
      </div>
      {/* END: Top Header Flowing Pink Banner */}

      {/* Main Content Area - Placed cleanly BELOW the header banner */}
      <div className="px-5 mt-4 relative z-10 space-y-6">
        {/* BEGIN: Upcoming Appointment Card */}
        {upcomingAppointment ? (
          <div className="bg-white border border-pink-100 rounded-3xl p-5 shadow-md hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-600 flex items-center justify-center text-white shadow-md shadow-pink-200 shrink-0">
                <Calendar className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-extrabold tracking-wider text-pink-600 uppercase">
                  UPCOMING APPOINTMENT
                </span>
                <p className="text-gray-700 text-sm font-bold mt-0.5">
                  {upcomingAppointment.date}
                </p>
                <p className="text-2xl font-black text-pink-600 tracking-tight mt-0.5">
                  {upcomingAppointment.time}
                </p>
                <p className="text-xs text-gray-500 font-medium mt-1 line-clamp-1">
                  {upcomingAppointment.reason}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-pink-100">
              <button
                onClick={() => setActiveTab('appointments')}
                className="px-5 py-2.5 rounded-full border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white font-bold text-xs tracking-wide transition-all active:scale-95"
              >
                View / Reschedule
              </button>
              <button
                onClick={() => setActiveTab('appointments')}
                className="w-10 h-10 rounded-full bg-pink-600 hover:bg-pink-700 text-white flex items-center justify-center shadow-md shadow-pink-200 transition-transform active:scale-90"
                aria-label="View Appointment Details"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-md text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-pink-50 flex items-center justify-center text-pink-600 mb-2">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800 text-sm">No Upcoming Appointments</h3>
            <p className="text-xs text-gray-500 mt-1 mb-3">Book your consultation with Dr. Sakthimaindan Karthikeyan</p>
            <button
              onClick={() => setActiveTab('book-appointment')}
              className="bg-pink-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm hover:bg-pink-700"
            >
              Book Now
            </button>
          </div>
        )}
        {/* END: Upcoming Appointment Card */}

        {/* BEGIN: Quick Access Section */}
        <div>
          <h2 className="text-base font-bold text-indigo-950 mb-3 px-1">Quick Access</h2>
          <div className="grid grid-cols-3 gap-3">
            {/* 1. Book Appointment */}
            <button
              onClick={() => setActiveTab('book-appointment')}
              className="bg-white border border-gray-100 rounded-2xl p-3.5 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:border-pink-200 transition-all group active:scale-95"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-50/80 group-hover:bg-pink-100 flex items-center justify-center text-pink-600 mb-2 transition-colors">
                <Calendar className="w-6 h-6 stroke-[2]" />
              </div>
              <span className="text-xs font-bold text-gray-800 group-hover:text-pink-600 leading-snug">
                Book<br />Appointment
              </span>
            </button>

            {/* 2. My Appointments */}
            <button
              onClick={() => setActiveTab('appointments')}
              className="bg-white border border-gray-100 rounded-2xl p-3.5 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:border-blue-200 transition-all group active:scale-95"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50/80 group-hover:bg-blue-100 flex items-center justify-center text-blue-600 mb-2 transition-colors">
                <ClipboardList className="w-6 h-6 stroke-[2]" />
              </div>
              <span className="text-xs font-bold text-gray-800 group-hover:text-blue-600 leading-snug">
                My<br />Appointments
              </span>
            </button>

            {/* 3. Consult Now */}
            <button
              onClick={() => setActiveTab('consult-now')}
              className="bg-white border border-gray-100 rounded-2xl p-3.5 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:border-emerald-200 transition-all group active:scale-95"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50/80 group-hover:bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2 transition-colors">
                <MessageSquare className="w-6 h-6 stroke-[2]" />
              </div>
              <span className="text-xs font-bold text-gray-800 group-hover:text-emerald-600 leading-snug">
                Consult<br />Now
              </span>
            </button>

            {/* 4. Health Records */}
            <button
              onClick={() => setActiveTab('health-records')}
              className="bg-white border border-gray-100 rounded-2xl p-3.5 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all group active:scale-95"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50/80 group-hover:bg-indigo-100 flex items-center justify-center text-indigo-600 mb-2 transition-colors">
                <Plus className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="text-xs font-bold text-gray-800 group-hover:text-indigo-600 leading-snug">
                Health<br />Records
              </span>
            </button>

            {/* 5. Health Tips */}
            <button
              onClick={() => setActiveTab('health-tips')}
              className="bg-white border border-gray-100 rounded-2xl p-3.5 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:border-amber-200 transition-all group active:scale-95"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50/80 group-hover:bg-amber-100 flex items-center justify-center text-amber-600 mb-2 transition-colors">
                <Heart className="w-6 h-6 stroke-[2]" />
              </div>
              <span className="text-xs font-bold text-gray-800 group-hover:text-amber-600 leading-snug">
                Health<br />Tips
              </span>
            </button>

            {/* 6. Clinic Info */}
            <button
              onClick={() => setActiveTab('clinic-info')}
              className="bg-white border border-gray-100 rounded-2xl p-3.5 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:border-purple-200 transition-all group active:scale-95"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-50/80 group-hover:bg-purple-100 flex items-center justify-center text-purple-600 mb-2 transition-colors">
                <Info className="w-6 h-6 stroke-[2]" />
              </div>
              <span className="text-xs font-bold text-gray-800 group-hover:text-purple-600 leading-snug">
                Clinic<br />Info
              </span>
            </button>
          </div>
        </div>
        {/* END: Quick Access Section */}

        {/* BEGIN: Need Help WhatsApp Card */}
        <div className="bg-gradient-to-r from-emerald-50/90 via-teal-50/60 to-emerald-50/90 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
          <div>
            <h3 className="font-extrabold text-indigo-950 text-sm">Need Help?</h3>
            <p className="text-gray-500 text-xs font-medium mt-0.5">Call or WhatsApp us directly</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCall}
              className="w-10 h-10 rounded-full bg-white border border-emerald-200 text-emerald-600 flex items-center justify-center hover:bg-emerald-50 transition-colors shadow-2xs"
              title="Call Clinic"
            >
              <PhoneCall className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenWhatsApp}
              className="w-11 h-11 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-md shadow-emerald-200 transition-transform active:scale-95"
              title="WhatsApp Clinic"
            >
              <MessageCircle className="w-6 h-6 fill-white stroke-none" />
            </button>
          </div>
        </div>
        {/* END: Need Help WhatsApp Card */}

        {/* BEGIN: Clinic Timings Banner */}
        <div className="bg-emerald-50/50 border border-emerald-100/80 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border border-emerald-200 bg-white flex items-center justify-center text-emerald-600 shrink-0">
              <Clock className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h3 className="font-extrabold text-indigo-950 text-sm tracking-tight">Clinic Timings</h3>
              <div className="mt-1 text-xs space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 font-bold uppercase text-[10px] w-16">MORNING</span>
                  <span className="font-bold text-emerald-800">8:00 AM - 1:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 font-bold uppercase text-[10px] w-16">EVENING</span>
                  <span className="font-bold text-emerald-800">5:00 PM - 11:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* END: Clinic Timings Banner */}
      </div>
    </div>
  );
};
