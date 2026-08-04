import React, { useEffect, useMemo, useState } from 'react';
import {
  User,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  MapPin,
  Lock,
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { HeaderNav } from './HeaderNav';
import { Appointment } from '../types';
import drSakthiImage from '../assets/dr_sakthi_image.jpeg';
import {
  createAppointment,
  dateToKey,
  formatDateLabel,
  formatTimeLabel,
  getAvailableSlots,
  type AvailabilitySlot,
} from '../lib/appointments';
import { isSupabaseConfigured } from '../lib/supabase';

interface BookAppointmentScreenProps {
  onBack: () => void;
  onAppointmentBooked: (newAppointment: Appointment) => void;
}

export const BookAppointmentScreen: React.FC<BookAppointmentScreenProps> = ({
  onBack,
  onAppointmentBooked,
}) => {
  const presetReasons = [
    'General Checkup',
    'Fever, Cold & Cough',
    'Medical Consultation',
    'Follow-up Visit',
    'Diabetes & Blood Pressure',
    'Child Vaccination',
    'Other Concern',
  ];

  const [dateOffset, setDateOffset] = useState(0);
  const dates = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() + dateOffset * 7);
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return formatDateLabel(dateToKey(date));
    });
  }, [dateOffset]);

  const [selectedDate, setSelectedDate] = useState(() => formatDateLabel(dateToKey(new Date())));
  const [availableSlots, setAvailableSlots] = useState<AvailabilitySlot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedReason, setSelectedReason] = useState('General Checkup');
  const [customConcern, setCustomConcern] = useState('');
  const [patientName, setPatientName] = useState('Karthik Subramanian');
  const [patientPhone, setPatientPhone] = useState('+91 86104 48427');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookedDetails, setBookedDetails] = useState<Appointment | null>(null);

  const timeSlots = availableSlots.filter((slot) => slot.slot_date === selectedDate.raw);

  useEffect(() => {
    setSelectedDate(dates[0]);
    setSelectedSlotId(null);
    setSelectedTime(null);
    if (!isSupabaseConfigured) return;

    let cancelled = false;
    setIsLoadingSlots(true);
    setErrorMessage('');
    void getAvailableSlots(dates[0].raw, dates[dates.length - 1].raw)
      .then((slots) => {
        if (!cancelled) setAvailableSlots(slots);
      })
      .catch((error: unknown) => {
        if (!cancelled) setErrorMessage(error instanceof Error ? error.message : 'Unable to load appointment times.');
      })
      .finally(() => {
        if (!cancelled) setIsLoadingSlots(false);
      });

    return () => { cancelled = true; };
  }, [dates]);

  const handleDateChange = (date: typeof dates[number]) => {
    setSelectedDate(date);
    const firstSlot = availableSlots.find((slot) => slot.slot_date === date.raw);
    setSelectedSlotId(firstSlot?.id ?? null);
    setSelectedTime(firstSlot ? formatTimeLabel(firstSlot.start_time) : null);
  };

  const handleConfirm = async () => {
    if (!selectedSlotId || !selectedTime) {
      setErrorMessage('Please choose an available date and time first.');
      return;
    }
    const finalReason =
      selectedReason === 'Other Concern' && customConcern.trim()
        ? customConcern.trim()
        : selectedReason;

    setIsBooking(true);
    setErrorMessage('');
    try {
      const slot = availableSlots.find((item) => item.id === selectedSlotId);
      if (!slot) throw new Error('That time is no longer available. Please refresh and choose another time.');
      const newAppt = await createAppointment({
        slotId: selectedSlotId,
        patientName: patientName.trim() || 'Patient',
        patientPhone: patientPhone.trim() || '+91 86104 48427',
        date: selectedDate.raw,
        time: slot.start_time,
        reason: finalReason,
      });
      setBookedDetails(newAppt);
      setShowConfirmationModal(true);
      onAppointmentBooked(newAppt);
      setAvailableSlots((slots) => slots.filter((item) => item.id !== selectedSlotId));
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to book this appointment.');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24 bg-white relative">
      <HeaderNav
        title="Book Appointment"
        subtitle="We're here to help you"
        onBack={onBack}
      />

      <div className="px-6 pt-4 space-y-6">
        {/* Doctor Summary Header */}
        <section className="p-4 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-pink-100 shadow-2xs shrink-0">
            <img src={drSakthiImage} alt="Dr. Sakthimaindan Karthigeyan" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900 leading-tight">
              Dr. Sakthimaindan Karthigeyan
            </h2>
            <p className="text-pink-600 font-semibold text-xs mt-0.5">
              General Physician
            </p>
          </div>
        </section>

        {/* Patient Details Input */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold text-gray-900">Patient Information</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white"
                placeholder="Patient Name"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white"
                placeholder="+91..."
              />
            </div>
          </div>
        </section>

        {/* Select Date */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900">Select Date</h3>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setDateOffset((offset) => Math.max(0, offset - 1))}
              disabled={dateOffset === 0}
              className="p-1 text-gray-400 hover:text-pink-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous date"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex-1 flex gap-2.5 overflow-x-auto hide-scrollbar py-1">
              {dates.map((d) => {
                const isSelected = selectedDate.raw === d.raw;
                return (
                  <button
                    key={d.raw}
                    onClick={() => handleDateChange(d)}
                    className={`shrink-0 w-14 h-20 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-pink-50 border-2 border-pink-500 text-pink-600 shadow-sm'
                        : 'bg-white border border-gray-100 text-gray-700 hover:border-pink-200'
                    }`}
                  >
                    <span
                      className={`text-[10px] uppercase font-bold mb-1 ${
                        isSelected ? 'text-pink-600' : 'text-gray-400'
                      }`}
                    >
                      {d.day}
                    </span>
                    <span className="text-lg font-extrabold">{d.date}</span>
                    <span
                      className={`text-[10px] font-bold mt-1 ${
                        isSelected ? 'text-pink-600' : 'text-gray-400'
                      }`}
                    >
                      {d.month}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setDateOffset((offset) => offset + 1)}
              className="p-1 text-gray-400 hover:text-pink-600 transition-colors"
              aria-label="Next date"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Select Time */}
        <section className="space-y-3">
          <h3 className="text-base font-bold text-gray-900">Select Time</h3>
          {isLoadingSlots ? (
            <p className="rounded-xl bg-gray-50 px-4 py-4 text-xs font-semibold text-gray-500">Loading available times…</p>
          ) : timeSlots.length === 0 ? (
            <p className="rounded-xl bg-gray-50 px-4 py-4 text-xs font-semibold text-gray-500">
              No times are available for {selectedDate.full}. Please use the arrows to check another date.
            </p>
          ) : (
          <div className="grid grid-cols-3 gap-2.5">
            {timeSlots.map((slot) => {
              const time = formatTimeLabel(slot.start_time);
              const isSelected = selectedSlotId === slot.id;
              return (
                <button
                  key={slot.id}
                  onClick={() => { setSelectedSlotId(slot.id); setSelectedTime(time); }}
                  className={`py-3 px-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-pink-600 text-white shadow-md shadow-pink-200 scale-[1.02]'
                      : 'bg-gray-50/90 border border-gray-100 text-gray-700 hover:bg-pink-50/50 hover:text-pink-600'
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
          )}
        </section>

        {/* Reason for Visit */}
        <section className="space-y-3">
          <h3 className="text-base font-bold text-gray-900">Reason for Visit</h3>
          <select
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            className="w-full h-14 px-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-semibold text-gray-800 focus:ring-2 focus:ring-pink-500 focus:bg-white"
          >
            {presetReasons.map((r, i) => (
              <option key={i} value={r}>
                {r}
              </option>
            ))}
          </select>

          {selectedReason === 'Other Concern' && (
            <input
              type="text"
              value={customConcern}
              onChange={(e) => setCustomConcern(e.target.value)}
              placeholder="Describe your health concern or symptoms..."
              className="w-full h-12 px-4 bg-gray-50 border border-pink-200 rounded-xl text-xs font-medium text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          )}
        </section>

        {/* Appointment Summary Card */}
        <section className="p-4 bg-pink-50/90 rounded-2xl border border-pink-100 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-pink-600 shadow-2xs shrink-0">
              <CalendarIcon className="h-5 w-5 stroke-[2]" />
            </div>
            <div>
              <p className="text-[10px] text-pink-600 font-bold uppercase tracking-wider">
                YOUR APPOINTMENT
              </p>
              <p className="text-gray-900 font-extrabold text-sm mt-0.5">
                {selectedDate.full} • {selectedTime}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-1 border-t border-pink-100/80">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-pink-600 shadow-2xs shrink-0">
              <MapPin className="h-5 w-5 stroke-[2]" />
            </div>
            <div>
              <p className="text-gray-800 text-xs font-semibold leading-relaxed">
                Thaai Clinic, 385, Bharathiyar Road, Kovil Pathu, Karaikal
              </p>
            </div>
          </div>
        </section>

        {/* Confirm Appointment Action Section at end of page content */}
        <div className="pt-2 pb-6 flex flex-col items-center space-y-3">
          {errorMessage && (
            <p className="w-full rounded-xl bg-red-50 px-4 py-3 text-xs font-semibold text-red-700" role="alert">
              {errorMessage}
            </p>
          )}
          {!isSupabaseConfigured && (
            <p className="w-full rounded-xl bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-800">
              Online booking is being connected. Please call or WhatsApp the clinic to book for now.
            </p>
          )}
          <button
            onClick={handleConfirm}
            disabled={isBooking || !isSupabaseConfigured || !selectedSlotId}
            className="w-full bg-pink-600 hover:bg-pink-700 active:scale-[0.98] text-white font-extrabold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-pink-200 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-base">{isBooking ? 'Booking…' : 'Confirm Appointment'}</span>
            <div className="bg-white rounded-full p-1 ml-1 text-pink-600">
              <ArrowRight className="h-4 w-4 stroke-[3]" />
            </div>
          </button>

          <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
            <Lock className="h-3.5 w-3.5 text-blue-500" />
            <span>Your data is safe and secure with us</span>
          </div>
        </div>
      </div>

      {/* Confirmation Success Modal */}
      {showConfirmationModal && bookedDetails && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-[380px] w-full text-center space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <Sparkles className="w-3 h-3" /> Booking Confirmed!
              </span>
              <h3 className="text-xl font-extrabold text-gray-900 mt-2">
                Appointment Booked
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Ref ID: <span className="font-mono font-bold text-pink-600">{bookedDetails.id}</span>
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl text-left text-xs space-y-2 border border-gray-100">
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold">Doctor:</span>
                <span className="font-bold text-gray-800">{bookedDetails.doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold">Date & Time:</span>
                <span className="font-bold text-pink-600">
                  {bookedDetails.date}, {bookedDetails.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold">Reason:</span>
                <span className="font-bold text-gray-800">{bookedDetails.reason}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold">Patient:</span>
                <span className="font-bold text-gray-800">{bookedDetails.patientName}</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-500">
              An SMS confirmation with clinic directions has been sent to {bookedDetails.patientPhone}.
            </p>

            <button
              onClick={onBack}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3.5 rounded-2xl shadow-md shadow-pink-200 transition-all text-xs"
            >
              Back to Home / Appointments
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
