import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  QrCode,
  Plus,
  ChevronRight,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { HeaderNav } from './HeaderNav';
import { Appointment, TabType } from '../types';

interface AppointmentsScreenProps {
  appointments: Appointment[];
  setActiveTab: (tab: TabType) => void;
  onCancelAppointment: (id: string) => void;
  onRescheduleAppointment: (id: string) => void;
}

export const AppointmentsScreen: React.FC<AppointmentsScreenProps> = ({
  appointments,
  setActiveTab,
  onCancelAppointment,
  onRescheduleAppointment,
}) => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');
  const [selectedPass, setSelectedPass] = useState<Appointment | null>(null);

  const filteredAppointments = appointments.filter((app) => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  return (
    <div className="flex-1 overflow-y-auto pb-28 bg-slate-50/50">
      <HeaderNav
        title="My Appointments"
        subtitle="Track & manage your clinic consultations"
        onBack={() => setActiveTab('home')}
      />

      <div className="px-5 pt-4 space-y-5">
        {/* Filter Pills & Book New CTA */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1.5 overflow-x-auto hide-scrollbar py-1">
            {(['all', 'upcoming', 'completed', 'cancelled'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-all cursor-pointer ${
                  filter === f
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <button
            onClick={() => setActiveTab('book-appointment')}
            className="shrink-0 bg-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-xs hover:bg-pink-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Book New
          </button>
        </div>

        {/* Appointments List */}
        {filteredAppointments.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-3xl p-8 text-center space-y-3 mt-4">
            <div className="w-16 h-16 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mx-auto">
              <CalendarIcon className="w-8 h-8 stroke-[1.8]" />
            </div>
            <h3 className="font-extrabold text-gray-800 text-base">No appointments found</h3>
            <p className="text-xs text-gray-500 max-w-[220px] mx-auto">
              You don't have any {filter !== 'all' ? filter : ''} appointments listed yet.
            </p>
            <button
              onClick={() => setActiveTab('book-appointment')}
              className="bg-pink-600 text-white text-xs font-bold px-5 py-2.5 rounded-2xl shadow-sm hover:bg-pink-700 transition-all inline-block"
            >
              Book Appointment Now
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appt) => {
              const isUpcoming = appt.status === 'upcoming';
              const isCompleted = appt.status === 'completed';
              const isCancelled = appt.status === 'cancelled';

              return (
                <div
                  key={appt.id}
                  className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs space-y-4"
                >
                  <div className="flex items-start justify-between border-b border-gray-100 pb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-gray-400">
                        {appt.id}
                      </span>
                      <h3 className="font-extrabold text-gray-900 text-sm">{appt.doctorName}</h3>
                      <p className="text-xs text-pink-600 font-semibold">{appt.doctorSpecialty}</p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 ${
                        isUpcoming
                          ? 'bg-pink-50 text-pink-600 border border-pink-100'
                          : isCompleted
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : 'bg-rose-50 text-rose-600 border border-rose-100'
                      }`}
                    >
                      {isUpcoming && <Clock className="w-3 h-3" />}
                      {isCompleted && <CheckCircle2 className="w-3 h-3" />}
                      {isCancelled && <XCircle className="w-3 h-3" />}
                      {appt.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-gray-800 font-bold">
                      <CalendarIcon className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>{appt.date} • {appt.time}</span>
                    </div>

                    <div className="flex items-start gap-2 text-gray-600 font-medium">
                      <MapPin className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{appt.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500 font-medium bg-slate-50 p-2.5 rounded-xl border border-gray-100">
                      <FileText className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>Reason: <strong className="text-gray-800">{appt.reason}</strong></span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <button
                      onClick={() => setSelectedPass(appt)}
                      className="text-xs font-bold text-pink-600 flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <QrCode className="w-4 h-4" /> View Pass / Ticket
                    </button>

                    {isUpcoming && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onCancelAppointment(appt.id)}
                          className="text-xs font-bold text-rose-500 hover:text-rose-700 px-2 py-1"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => onRescheduleAppointment(appt.id)}
                          className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-2xs"
                        >
                          Reschedule
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Appointment Ticket / Pass Modal */}
      {selectedPass && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-[360px] w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="bg-pink-600 p-5 text-white text-center relative">
              <span className="text-[10px] font-mono font-bold opacity-80 uppercase tracking-widest block">
                THAAI CLINIC CONSULTATION TICKET
              </span>
              <h3 className="text-lg font-extrabold mt-1">{selectedPass.doctorName}</h3>
              <p className="text-xs text-pink-100">{selectedPass.doctorSpecialty}</p>

              <button
                onClick={() => setSelectedPass(null)}
                className="absolute top-3 right-3 text-white/80 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-4 bg-pink-50 rounded-2xl text-center space-y-1 border border-pink-100">
                <p className="text-xs text-pink-600 font-bold uppercase">Appointment Date & Time</p>
                <p className="text-lg font-extrabold text-gray-900">{selectedPass.date}</p>
                <p className="text-xl font-black text-pink-600">{selectedPass.time}</p>
              </div>

              {/* Simulated QR Code */}
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-gray-200">
                <QrCode className="w-24 h-24 text-gray-800" />
                <span className="text-[10px] font-mono font-bold text-gray-500 mt-2">
                  TOKEN ID: {selectedPass.id}
                </span>
              </div>

              <div className="text-xs text-gray-600 space-y-1">
                <p><strong>Patient:</strong> {selectedPass.patientName}</p>
                <p><strong>Location:</strong> {selectedPass.location}</p>
              </div>

              <button
                onClick={() => setSelectedPass(null)}
                className="w-full bg-pink-600 text-white font-bold py-3 rounded-2xl hover:bg-pink-700 text-xs"
              >
                Close Pass
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
