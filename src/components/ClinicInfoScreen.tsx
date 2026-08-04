import React from 'react';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Award,
  Stethoscope,
  Building,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { HeaderNav } from './HeaderNav';
import { TabType } from '../types';
import drSakthiImage from '../assets/dr_sakthi_image.jpeg';

interface ClinicInfoScreenProps {
  setActiveTab: (tab: TabType) => void;
  onOpenCall: () => void;
  onOpenWhatsApp: () => void;
}

export const ClinicInfoScreen: React.FC<ClinicInfoScreenProps> = ({
  setActiveTab,
  onOpenCall,
  onOpenWhatsApp,
}) => {
  return (
    <section aria-label="Thaai Clinic Information - Karaikal Puducherry" className="flex-1 overflow-y-auto pb-20 bg-slate-50/50">
      <HeaderNav
        title="Clinic Information"
        subtitle="Thaai Clinic • Karaikal"
        onBack={() => setActiveTab('home')}
      />

      <div className="px-5 pt-4 space-y-5">
        {/* Banner */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-2xl shrink-0 shadow-inner">
              <Building className="w-8 h-8 stroke-[2]" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                Newly Established Clinic
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 mt-1">Thaai Clinic</h2>
              <p className="text-xs text-gray-500 font-semibold">General & Family Medicine</p>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex gap-2">
            <button
              onClick={() => setActiveTab('book-appointment')}
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-extrabold py-3 rounded-2xl text-xs shadow-md shadow-pink-200 transition-all active:scale-95"
            >
              Book Appointment
            </button>
            <button
              onClick={onOpenWhatsApp}
              className="px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3 rounded-2xl text-xs flex items-center gap-1.5 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white stroke-none" /> WhatsApp
            </button>
          </div>
        </div>

        {/* Doctor Details */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs space-y-3">
          <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E91E63]"></span> Primary Consultant
          </h3>

          <div className="flex items-center gap-3.5 p-3 bg-pink-50/60 rounded-2xl border border-pink-100">
            <img src={drSakthiImage} alt="Dr. Sakthimaindan" className="w-13 h-13 rounded-2xl object-cover border border-pink-200 shadow-2xs shrink-0" />
            <div>
              <h4 className="font-extrabold text-gray-900 text-sm">
                Dr. Sakthimaindan Karthigeyan
              </h4>
              <p className="text-xs text-pink-600 font-bold">General Physician</p>
              <p className="text-[11px] text-gray-600 font-medium mt-0.5">
                MBBS, CCH, CCPE, ACDM (UK)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-gray-700 pt-1">
            <div className="flex items-center gap-1.5 p-2 bg-slate-50 rounded-xl">
              <Award className="w-4 h-4 text-pink-600" />
              <span>General Physician</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 bg-slate-50 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Certified Care</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('about-doctor')}
            className="w-full mt-2 bg-pink-50 hover:bg-pink-100 text-[#D8005A] font-extrabold py-2.5 px-4 rounded-2xl text-xs flex items-center justify-center gap-1.5 border border-pink-200 transition-colors cursor-pointer"
          >
            <Stethoscope className="w-4 h-4" /> View Full Doctor Bio & Profile
          </button>
        </div>

        {/* Timings */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs space-y-3">
          <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" /> Consultation Hours
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl">
              <span className="font-bold text-gray-600">Morning Session</span>
              <span className="font-extrabold text-emerald-800 bg-emerald-100/60 px-2.5 py-1 rounded-lg">
                8:00 AM - 1:00 PM
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl">
              <span className="font-bold text-gray-600">Evening Session</span>
              <span className="font-extrabold text-emerald-800 bg-emerald-100/60 px-2.5 py-1 rounded-lg">
                5:00 PM - 11:00 PM
              </span>
            </div>
          </div>
        </div>

        {/* Facilities & Address */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs space-y-3">
          <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-pink-600" /> Address & Location
          </h3>

          <p className="text-xs font-semibold text-gray-800 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-gray-100">
            Thaai Clinic, 385, Bharathiyar Road, Kovil Pathu, Karaikal, Puducherry 609602
          </p>

          <div className="flex gap-2 pt-1">
            <button
              onClick={onOpenCall}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-gray-800 font-bold py-2.5 rounded-2xl text-xs flex items-center justify-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-pink-600" /> Call Clinic
            </button>
            <a
              href="https://maps.google.com/?q=Thaai+Clinic+Karaikal"
              target="_blank"
              rel="noreferrer"
              className="flex-1 bg-pink-50 hover:bg-pink-100 text-pink-600 font-bold py-2.5 rounded-2xl text-xs flex items-center justify-center gap-1.5 border border-pink-200"
            >
              Directions <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Lazy-loaded Google Maps Embed for Geographic SEO Signal */}
          <div className="mt-3 rounded-2xl overflow-hidden border border-gray-100">
            <iframe
              title="Thaai Clinic Karaikal Location on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.0!2d79.83451!3d10.92254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sThaai+Clinic!5e0!3m2!1sen!2sin!4v1690000000000"
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
