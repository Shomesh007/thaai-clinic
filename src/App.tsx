import React, { useState, useEffect } from 'react';
import { MobileFrame } from './components/MobileFrame';
import { BottomNav } from './components/BottomNav';
import { WelcomeScreen } from './components/WelcomeScreen';
import { HomeScreen } from './components/HomeScreen';
import { ServicesScreen } from './components/ServicesScreen';
import { BookAppointmentScreen } from './components/BookAppointmentScreen';
import { AppointmentsScreen } from './components/AppointmentsScreen';
import { HealthRecordsScreen } from './components/HealthRecordsScreen';
import { HealthTipsScreen } from './components/HealthTipsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ClinicInfoScreen } from './components/ClinicInfoScreen';
import { ConsultNowScreen } from './components/ConsultNowScreen';
import { AboutDoctorScreen } from './components/AboutDoctorScreen';
import { NotificationsDrawer } from './components/NotificationsDrawer';

import { TabType, Appointment, HealthRecord, HealthTip, NotificationItem } from './types';
import {
  INITIAL_APPOINTMENTS,
  INITIAL_HEALTH_RECORDS,
  INITIAL_HEALTH_TIPS,
  INITIAL_NOTIFICATIONS,
} from './mockData';

import { Phone, MessageCircle } from 'lucide-react';
import { preloadSplashImages, preloadRemainingImages } from './utils/preloadImages';

// ── URL ↔ TabType mapping ─────────────────────────────────────────────────
const PATH_TO_TAB: Record<string, TabType> = {
  '/':                 'home',
  '/home':             'home',
  '/services':         'services',
  '/appointments':     'appointments',
  '/book-appointment': 'book-appointment',
  '/health-tips':      'health-tips',
  '/health-records':   'health-records',
  '/clinic-info':      'clinic-info',
  '/consult-now':      'consult-now',
  '/about-doctor':     'about-doctor',
  '/profile':          'profile',
  '/welcome':          'welcome',
};

const TAB_TO_PATH: Record<TabType, string> = {
  'welcome':           '/',
  'home':              '/',
  'services':          '/services',
  'appointments':      '/appointments',
  'book-appointment':  '/book-appointment',
  'health-tips':       '/health-tips',
  'health-records':    '/health-records',
  'clinic-info':       '/clinic-info',
  'consult-now':       '/consult-now',
  'about-doctor':      '/about-doctor',
  'profile':           '/profile',
};

const TAB_META: Record<TabType, { title: string; description: string }> = {
  'welcome':           { title: 'Thaai Clinic Karaikal | Dr. Sakthimaindan', description: 'Welcome to Thaai Clinic, Karaikal. General physician Dr. Sakthimaindan Karthigeyan.' },
  'home':              { title: 'Thaai Clinic Karaikal | General Physician in Karaikal', description: 'Thaai Clinic, Karaikal – Compassionate care for you & your family. Walk-in & appointments available.' },
  'services':          { title: 'Services – Thaai Clinic Karaikal | Child Health, Diabetes & More', description: 'Child health, diabetes care, fever treatment, respiratory care, health checkups & more at Thaai Clinic Karaikal.' },
  'appointments':      { title: 'My Appointments – Thaai Clinic Karaikal', description: 'View and manage your appointments at Thaai Clinic Karaikal with Dr. Sakthimaindan.' },
  'book-appointment':  { title: 'Book Appointment – Thaai Clinic Karaikal | Dr. Sakthimaindan', description: 'Book an appointment with Dr. Sakthimaindan Karthigeyan at Thaai Clinic, Karaikal. Walk-in or schedule online.' },
  'health-tips':       { title: 'Health Tips – Thaai Clinic Karaikal | Wellness & Nutrition', description: 'Expert health tips on wellness, nutrition, chronic care, and child health from Dr. Sakthimaindan, Karaikal.' },
  'health-records':    { title: 'Health Records – Thaai Clinic Karaikal', description: 'View and manage your personal health records at Thaai Clinic Karaikal.' },
  'clinic-info':       { title: 'Clinic Info – Thaai Clinic | 385 Bharathiyar Road, Karaikal', description: 'Thaai Clinic, 385 Bharathiyar Road, Kovil Pathu, Karaikal. Timings: 8AM–1PM & 5PM–11PM. Call +91 86104 48427.' },
  'consult-now':       { title: 'Consult Now – Thaai Clinic Karaikal', description: 'Get quick consultation at Thaai Clinic Karaikal. Call or WhatsApp Dr. Sakthimaindan now.' },
  'about-doctor':      { title: 'Dr. Sakthimaindan Karthigeyan – General Physician Karaikal | MBBS', description: 'About Dr. Sakthimaindan Karthigeyan, MBBS. General Physician at Thaai Clinic, Karaikal. Specialised in diabetes, child health & family medicine.' },
  'profile':           { title: 'Profile – Thaai Clinic Karaikal', description: 'Manage your profile at Thaai Clinic Karaikal.' },
};

/** Derive initial tab from browser URL path */
function getTabFromPath(): TabType {
  const path = window.location.pathname;
  return PATH_TO_TAB[path] ?? 'home';
}

/** Push a URL change to browser history */
function pushPath(tab: TabType) {
  const path = TAB_TO_PATH[tab] ?? '/';
  if (window.location.pathname !== path) {
    window.history.pushState({ tab }, '', path);
  }
}

/** Update <title>, canonical <link>, og tags, and meta description */
function updatePageMeta(tab: TabType) {
  const meta = TAB_META[tab];
  if (!meta) return;

  document.title = meta.title;

  const descEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (descEl) descEl.setAttribute('content', meta.description);

  const path = TAB_TO_PATH[tab] ?? '/';
  const canonical = `https://thaaiclinic.com${path === '/' ? '' : path}`;

  const linkEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (linkEl) linkEl.setAttribute('href', canonical);

  const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', canonical);

  const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', meta.title);

  const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', meta.description);

  const twTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', meta.title);

  const twDesc = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', meta.description);
}

export default function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const [activeTab, setActiveTabState] = useState<TabType>(() => {
    const fromUrl = getTabFromPath();
    // Show welcome screen for first-time session visitors arriving at root
    const hasVisited = sessionStorage.getItem('thaai_visited');
    if (!hasVisited && (fromUrl === 'home' || fromUrl === 'welcome')) {
      return 'welcome';
    }
    return fromUrl === 'welcome' ? 'home' : fromUrl;
  });

  /** Wrapped setter: updates state + URL + meta atomically */
  const setActiveTab = (tab: TabType) => {
    setActiveTabState(tab);
    pushPath(tab);
    updatePageMeta(tab);
    if (tab !== 'welcome') {
      sessionStorage.setItem('thaai_visited', '1');
    }
  };

  // Sync URL & meta on first render and handle staged image preloading
  useEffect(() => {
    updatePageMeta(activeTab);
    const path = TAB_TO_PATH[activeTab] ?? '/';
    if (window.location.pathname !== path) {
      window.history.replaceState({ tab: activeTab }, '', path);
    }

    // Stage 1: Preload essential splash screen assets first
    preloadSplashImages().then(() => {
      setIsInitialLoading(false);
      // Stage 2: While user views splash/home screen, preload all remaining app images in background
      preloadRemainingImages();
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle browser Back / Forward button
  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      const tab: TabType = e.state?.tab ?? getTabFromPath();
      setActiveTabState(tab);
      updatePageMeta(tab);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // ── Persisted State ───────────────────────────────────────────────────
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('thaai_appointments');
    const list: Appointment[] = saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    return list.map((a) => (a.id === 'THAAI-2024-8821' ? { ...a, status: 'completed' as const } : a));
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

  useEffect(() => { localStorage.setItem('thaai_appointments', JSON.stringify(appointments)); }, [appointments]);
  useEffect(() => { localStorage.setItem('thaai_records', JSON.stringify(records)); }, [records]);
  useEffect(() => { localStorage.setItem('thaai_tips', JSON.stringify(tips)); }, [tips]);
  useEffect(() => { localStorage.setItem('thaai_notifications', JSON.stringify(notifications)); }, [notifications]);

  // ── Derived ───────────────────────────────────────────────────────────
  const upcomingAppointment = appointments.find((a) => a.status === 'upcoming');

  // ── Handlers ──────────────────────────────────────────────────────────
  const handleAppointmentBooked = (newAppt: Appointment) => {
    setAppointments((prev) => [newAppt, ...prev]);
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

  const handleRescheduleAppointment = (_id: string) => {
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
          return { ...t, isLiked, likes: isLiked ? t.likes + 1 : t.likes - 1 };
        }
        return t;
      })
    );
  };

  const handleMarkAllNotifsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  if (isInitialLoading) {
    return (
      <MobileFrame>
        <div className="flex-1 flex items-center justify-center bg-[#FFF8FA]">
          <div className="loader"></div>
        </div>
      </MobileFrame>
    );
  }

  return (
    <MobileFrame>
      {/* Semantic Main Content Area */}
      <main
        role="main"
        aria-label="Thaai Clinic Karaikal - General Physician Dr. Sakthimaindan"
        className="flex-1 flex flex-col min-h-0 overflow-hidden"
      >
        {activeTab === 'welcome' && (
          <WelcomeScreen
            onGetStarted={() => setActiveTab('home')}
            setActiveTab={setActiveTab}
          />
        )}

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

        {activeTab === 'about-doctor' && (
          <AboutDoctorScreen
            setActiveTab={setActiveTab}
            onOpenNotifications={() => setShowNotifications(true)}
            onOpenCall={() => setShowCallModal(true)}
            onOpenWhatsApp={() => setShowWhatsAppModal(true)}
            unreadCount={unreadNotifCount}
          />
        )}
      </main>

      {/* Global Bottom Navigation (Hidden on Welcome Screen) */}
      {activeTab !== 'welcome' && (
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

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
              <p className="text-xs text-pink-600 font-bold mt-1">+91 86104 48427</p>
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
                href="tel:+918610448427"
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
              <p className="text-xs text-emerald-600 font-bold mt-1">+91 86104 48427</p>
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
                href="https://wa.me/918610448427?text=Hello%20Thaai%20Clinic,%20I%20would%20like%20to%20inquire%20about%20consultation"
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
