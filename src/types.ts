export type TabType =
  | 'home'
  | 'appointments'
  | 'services'
  | 'health-tips'
  | 'profile'
  | 'book-appointment'
  | 'health-records'
  | 'clinic-info'
  | 'consult-now';

export interface Appointment {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string; // e.g. "Wed, 22 May 2024"
  rawDate: string; // "2024-05-22"
  time: string; // e.g. "10:30 AM"
  reason: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  patientName: string;
  patientPhone: string;
  createdAt: string;
}

export interface HealthRecord {
  id: string;
  title: string;
  category: 'Prescription' | 'Lab Report' | 'Vaccination' | 'Doctor Note';
  date: string;
  doctorName: string;
  fileSize: string;
  summary: string;
  downloadUrl?: string;
}

export interface HealthTip {
  id: string;
  title: string;
  category: 'Wellness' | 'Nutrition' | 'Chronic Care' | 'Child Health';
  readTime: string;
  summary: string;
  content: string[];
  likes: number;
  isLiked?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'appointment' | 'tip' | 'clinic';
}
