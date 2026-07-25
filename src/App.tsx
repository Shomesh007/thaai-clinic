import React, { useState, useEffect } from 'react';
import { MobileFrame } from './components/MobileFrame';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { ServicesScreen } from './components/ServicesScreen';
import { BookAppointmentScreen } from './components/BookAppointmentScreen';
import { AppointmentsScreen } from './components/AppointmentsScreen';
import { HealthRecordsScreen } from './components/HealthRecordsScreen';
import { HealthTipsScreen } from './components/HealthTipsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ClinicInfoScreen } from './components/ClinicInfoScreen';
import { ConsultNowScreen } from './components/ConsultNowScreen';
import { NotificationsDrawer } from './components/NotificationsDrawer';

import { TabType, Appointment, HealthRecord, HealthTip, NotificationItem } from './types';
import {
  INITIAL_APPOINTMENTS,
  INITIAL_HEALTH_RECORDS,
  INITIAL_HEALTH_TIPS,
  INITIAL_NOTIFICATIONS,
} from './mockData';

import { Phone, MessageCircle, X, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // Local Storage Persistence
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('thaai_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [records, setRecords] = useState<HealthRecord[]>(() => {
    const saved = localStorage.getItem('thaai_records');
    return saved ? JSON.parse(saved) : INITIAL_HEALTH_RECORDS;
  });

  const [tips, setTips] = useState<HealthTip[]>(() => {
    const saved = localStorage.getItem('thaai_tips');
    return saved ? JSON.parse(saved) : INITIAL_HEALTH_TIPS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('thaai_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [showNotifications, setShowNotifications] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('thaai_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('thaai_records', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem('thaai_tips', JSON.stringify(tips));
  }, [tips]);

  useEffect(() => {
    localStorage.setItem('thaai_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Find upcoming appointment for home screen display
  const upcomingAppointment = appointments.find((a) => a.status === 'upcoming');

  const handleAppointmentBooked = (newAppt: Appointment) => {
    setAppointments((prev) => [newAppt, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'Appointment Booked Successfully',
      message: `Your appointment with Dr. Sakthimaindan is confirmed for ${newAppt.date} at ${newAppt.time}.`,
      time: 'Just now',
      read: false,
      type: 'appointment',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' as const } : a))
    );
  };

  const handleRescheduleAppointment = (id: string) => {
    setActiveTab('book-appointment');
  };

  const handleAddRecord = (newRec: HealthRecord) => {
    setRecords((prev) => [newRec, ...prev]);
  };

  const handleToggleLikeTip = (id: string) => {
    setTips((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const isLiked = !t.isLiked;
          return {
            ...t,
            isLiked,
            likes: isLiked ? t.likes + 1 : t.likes - 1,
          };
        }
        return t;
      })
    );
  };

  const handleMarkAllNotifsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  return (
    <MobileFrame>
      {/* Active Screen View */}
      {activeTab === 'home' && (
        <HomeScreen
          upcomingAppointment={upcomingAppointment}
          setActiveTab={setActiveTab}
          onOpenNotifications={() => setShowNotifications(true)}
          onOpenWhatsApp={() => setShowWhatsAppModal(true)}
          onOpenCall={() => setShowCallModal(true)}
          unreadCount={unreadNotifCount}
        />
      )}

      {activeTab === 'services' && (
        <ServicesScreen
          onBack={() => setActiveTab('home')}
          onContactClinic={() => setShowCallModal(true)}
          onBookAppointment={() => setActiveTab('book-appointment')}
        />
      )}

      {activeTab === 'book-appointment' && (
        <BookAppointmentScreen
          onBack={() => setActiveTab('home')}
          onAppointmentBooked={handleAppointmentBooked}
        />
      )}

      {activeTab === 'appointments' && (
        <AppointmentsScreen
          appointments={appointments}
          setActiveTab={setActiveTab}
          onCancelAppointment={handleCancelAppointment}
          onRescheduleAppointment={handleRescheduleAppointment}
        />
      )}

      {activeTab === 'health-records' && (
        <HealthRecordsScreen
          records={records}
          setActiveTab={setActiveTab}
          onAddRecord={handleAddRecord}
        />
      )}

      {activeTab === 'health-tips' && (
        <HealthTipsScreen
          tips={tips}
          setActiveTab={setActiveTab}
          onToggleLike={handleToggleLikeTip}
        />
      )}

      {activeTab === 'profile' && (
        <ProfileScreen
          setActiveTab={setActiveTab}
          onOpenCall={() => setShowCallModal(true)}
          onOpenWhatsApp={() => setShowWhatsAppModal(true)}
        />
      )}

      {activeTab === 'clinic-info' && (
        <ClinicInfoScreen
          setActiveTab={setActiveTab}
          onOpenCall={() => setShowCallModal(true)}
          onOpenWhatsApp={() => setShowWhatsAppModal(true)}
        />
      )}

      {activeTab === 'consult-now' && (
        <ConsultNowScreen
          setActiveTab={setActiveTab}
          onOpenCall={() => setShowCallModal(true)}
          onOpenWhatsApp={() => setShowWhatsAppModal(true)}
        />
      )}

      {/* Global Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Slide-over Notifications */}
      {showNotifications && (
        <NotificationsDrawer
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
          onMarkAllAsRead={handleMarkAllNotifsRead}
        />
      )}

      {/* Call Dialog Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-[340px] w-full text-center space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto">
              <Phone className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-extrabold text-gray-900 text-base">Call Thaai Clinic</h3>
              <p className="text-xs text-pink-600 font-bold mt-1">+91 98765 43210</p>
              <p className="text-[11px] text-gray-500 mt-1">
                385, Bharathiyar Road, Kovil Pathu, Karaikal
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCallModal(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-gray-700 font-bold py-3 rounded-2xl text-xs"
              >
                Cancel
              </button>
              <a
                href="tel:+919876543210"
                className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-2xl text-xs shadow-md shadow-pink-200 flex items-center justify-center gap-1"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Dialog Modal */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-[340px] w-full text-center space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-[#25D366]/20 text-[#25D366] rounded-full flex items-center justify-center mx-auto">
              <MessageCircle className="w-8 h-8 fill-[#25D366] stroke-none" />
            </div>
            <div>
              <h3 className="font-extrabold text-gray-900 text-base">WhatsApp Consultation</h3>
              <p className="text-xs text-emerald-600 font-bold mt-1">+91 98765 43210</p>
              <p className="text-[11px] text-gray-500 mt-1">
                Send queries, book appointments, or send lab reports directly to doctor.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowWhatsAppModal(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-gray-700 font-bold py-3 rounded-2xl text-xs"
              >
                Close
              </button>
              <a
                href="https://wa.me/919876543210?text=Hello%20Thaai%20Clinic,%20I%20would%20like%20to%20inquire%20about%20consultation"
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3 rounded-2xl text-xs shadow-md shadow-emerald-200 flex items-center justify-center gap-1"
              >
                Open WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </MobileFrame>
  );
}
