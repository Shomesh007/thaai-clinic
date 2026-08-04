import React, { useState } from 'react';
import {
  User,
  Phone,
  MapPin,
  Globe,
  FileText,
  ShieldCheck,
  ChevronRight,
  Heart,
  LogOut,
  Edit2,
  Bell,
  ExternalLink,
} from 'lucide-react';
import { HeaderNav } from './HeaderNav';
import { TabType } from '../types';

interface ProfileScreenProps {
  setActiveTab: (tab: TabType) => void;
  onOpenCall: () => void;
  onOpenWhatsApp: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  setActiveTab,
  onOpenCall,
  onOpenWhatsApp,
}) => {
  const [language, setLanguage] = useState<'English' | 'Tamil'>('English');
  const [patient, setPatient] = useState({
    name: 'Karthik Subramanian',
    phone: '+91 98765 43210',
    age: '34 Yrs',
    gender: 'Male',
    bloodGroup: 'O +ve',
    emergencyContact: '+91 98765 00000',
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-slate-50/50">
      <HeaderNav
        title="Patient Profile"
        subtitle="Personal info & health preferences"
        onBack={() => setActiveTab('home')}
      />

      <div className="px-5 pt-4 space-y-5">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs flex items-center gap-4 relative">
          <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 border-2 border-pink-200 font-bold text-xl shrink-0">
            KS
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-extrabold text-gray-900 leading-tight">
              {patient.name}
            </h2>
            <p className="text-xs text-gray-500 font-semibold">{patient.phone}</p>
            <div className="flex items-center gap-2 mt-2 text-[10px] font-bold text-gray-700">
              <span className="bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full border border-pink-100">
                {patient.age} • {patient.gender}
              </span>
              <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100">
                Blood: {patient.bloodGroup}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-full hover:bg-slate-100 text-gray-400 hover:text-pink-600 transition-colors"
            title="Edit Profile"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Medical Stats Bar */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-white rounded-2xl p-3 border border-gray-100">
            <span className="text-[10px] uppercase font-bold text-gray-400">Blood Group</span>
            <p className="text-sm font-extrabold text-pink-600 mt-0.5">{patient.bloodGroup}</p>
          </div>
          <div className="bg-white rounded-2xl p-3 border border-gray-100">
            <span className="text-[10px] uppercase font-bold text-gray-400">Language</span>
            <p className="text-sm font-extrabold text-gray-800 mt-0.5">{language}</p>
          </div>
          <div className="bg-white rounded-2xl p-3 border border-gray-100">
            <span className="text-[10px] uppercase font-bold text-gray-400">Emergency</span>
            <p className="text-xs font-bold text-emerald-700 mt-0.5 truncate">Active</p>
          </div>
        </div>

        {/* Menu Settings List */}
        <div className="bg-white rounded-3xl p-2 border border-gray-100 shadow-2xs divide-y divide-gray-100">
          <button
            onClick={() => setActiveTab('health-records')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors rounded-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-800">My Health Records Vault</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <button
            onClick={() => setActiveTab('clinic-info')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors rounded-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-800">Thaai Clinic Location & Map</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-gray-800 block">App Language</span>
                <span className="text-[10px] text-gray-400 font-semibold">
                  English / தமிழ் (Tamil)
                </span>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="text-xs font-bold bg-slate-100 text-pink-600 px-3 py-1.5 rounded-xl border-none focus:outline-none"
            >
              <option value="English">English</option>
              <option value="Tamil">தமிழ்</option>
            </select>
          </div>

          <button
            onClick={onOpenCall}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors rounded-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-800">Emergency Helpline</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Clinic Address & Map Banner */}
        <div className="bg-pink-50/80 rounded-3xl p-5 border border-pink-100 space-y-2">
          <div className="flex items-center gap-2 text-pink-600 font-extrabold text-xs uppercase tracking-wider">
            <MapPin className="w-4 h-4" /> Thaai Clinic
          </div>
          <p className="text-xs text-gray-800 font-semibold leading-relaxed">
            385, Bharathiyar Road, Kovil Pathu, Karaikal, Puducherry 609602
          </p>
          <a
            href="https://maps.google.com/?q=Thaai+Clinic+Karaikal"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-extrabold text-pink-600 hover:underline pt-1"
          >
            Get Directions in Google Maps <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
