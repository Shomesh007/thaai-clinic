import { Appointment, HealthRecord, HealthTip, NotificationItem } from './types';

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'THAAI-2024-8821',
    doctorName: 'Dr. Sakthimaindan Karthikeyan',
    doctorSpecialty: 'General Physician',
    date: 'Wed, 22 May 2024',
    rawDate: '2024-05-22',
    time: '10:30 AM',
    reason: 'General Health Checkup & Blood Pressure Monitoring',
    location: 'Thaai Clinic, 385, Bharathiyar Road, Kovil Pathu, Karaikal',
    status: 'upcoming',
    patientName: 'Karthik Subramanian',
    patientPhone: '+91 98765 43210',
    createdAt: '2024-05-20T10:00:00Z',
  },
  {
    id: 'THAAI-2024-7102',
    doctorName: 'Dr. Sakthimaindan Karthikeyan',
    doctorSpecialty: 'General Physician',
    date: 'Fri, 12 Apr 2024',
    rawDate: '2024-04-12',
    time: '05:30 PM',
    reason: 'Fever & Seasonal Allergy Consultation',
    location: 'Thaai Clinic, 385, Bharathiyar Road, Kovil Pathu, Karaikal',
    status: 'completed',
    patientName: 'Karthik Subramanian',
    patientPhone: '+91 98765 43210',
    createdAt: '2024-04-10T14:30:00Z',
  },
];

export const INITIAL_HEALTH_RECORDS: HealthRecord[] = [
  {
    id: 'REC-901',
    title: 'General Consultation & Prescription',
    category: 'Prescription',
    date: '12 Apr 2024',
    doctorName: 'Dr. Sakthimaindan Karthikeyan',
    fileSize: '1.2 MB',
    summary: 'Prescribed Paracetamol 500mg, Cetirizine 10mg, Multivitamin supplements for 5 days.',
  },
  {
    id: 'REC-884',
    title: 'Complete Blood Count (CBC) & HbA1c',
    category: 'Lab Report',
    date: '28 Feb 2024',
    doctorName: 'Thaai Diagnostic Labs',
    fileSize: '2.4 MB',
    summary: 'Hemoglobin 14.2 g/dL (Normal), Fasting Blood Sugar 98 mg/dL, HbA1c 5.6% (Normal range).',
  },
  {
    id: 'REC-750',
    title: 'Annual Child Immunization Chart',
    category: 'Vaccination',
    date: '15 Jan 2024',
    doctorName: 'Dr. Sakthimaindan Karthikeyan',
    fileSize: '850 KB',
    summary: 'Boosters administered. Next scheduled booster due in December 2024.',
  },
];

export const INITIAL_HEALTH_TIPS: HealthTip[] = [
  {
    id: 'TIP-1',
    title: '5 Daily Habits to Keep Seasonal Flu & Cough Away',
    category: 'Wellness',
    readTime: '3 min read',
    summary: 'Simple preventive practices including warm water hydration, proper hand hygiene, and immune-boosting remedies.',
    content: [
      'Drink at least 8-10 glasses of warm water daily to flush out toxins and keep airways moist.',
      'Incorporate traditional immune boosters like ginger-turmeric tea and amla (gooseberry) in daily diet.',
      'Wash hands thoroughly before meals and after coming home from crowded places.',
      'Get 7-8 hours of sound sleep every night to allow your immune system to repair and rejuvenate.',
    ],
    likes: 124,
    isLiked: false,
  },
  {
    id: 'TIP-2',
    title: 'Understanding Diabetes: Morning Walk & Glycemic Control',
    category: 'Chronic Care',
    readTime: '4 min read',
    summary: 'How a 30-minute brisk morning walk improves insulin sensitivity and prevents sudden glucose spikes.',
    content: [
      'Physical activity increases glucose uptake by skeletal muscle cells without requiring extra insulin.',
      'Aim for a regular brisk walk during cooler morning hours.',
      'Pair physical exercise with fiber-rich foods like whole grains, legumes, and fresh leafy greens.',
      'Monitor blood glucose levels regularly as advised by Dr. Sakthimaindan Karthikeyan.',
    ],
    likes: 210,
    isLiked: true,
  },
  {
    id: 'TIP-3',
    title: 'Child Vaccination Schedule & Post-Vaccine Care',
    category: 'Child Health',
    readTime: '5 min read',
    summary: 'Essential vaccination milestones for infants and young children, plus comforting care guidelines.',
    content: [
      'Timely immunization protects children against severe preventable infectious diseases.',
      'Mild fever after vaccination is normal—apply a cool damp cloth and give prescribed pediatric paracetamol if recommended.',
      'Keep your vaccination record card safe and bring it to every clinic visit.',
    ],
    likes: 89,
    isLiked: false,
  },
  {
    id: 'TIP-4',
    title: 'Hydration & Nutrition in Coastal & Warm Weather',
    category: 'Nutrition',
    readTime: '2 min read',
    summary: 'Preventing heat exhaustion and dehydration with tender coconut water, buttermilk, and electrolyte balance.',
    content: [
      'Replenish lost electrolytes with natural drinks like fresh coconut water, spiced buttermilk (Neer Mor), and fresh lime water.',
      'Avoid excessive caffeine and carbonated sugary drinks which can worsen dehydration.',
    ],
    likes: 315,
    isLiked: true,
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOTIF-1',
    title: 'Upcoming Appointment Reminder',
    message: 'Your appointment with Dr. Sakthimaindan Karthikeyan is scheduled for Today, 22 May at 10:30 AM.',
    time: '10 mins ago',
    read: false,
    type: 'appointment',
  },
  {
    id: 'NOTIF-2',
    title: 'Clinic Notice: Evening Timings',
    message: 'Evening consultation hours are active today from 5:00 PM to 11:00 PM at Thaai Clinic.',
    time: '2 hours ago',
    read: false,
    type: 'clinic',
  },
  {
    id: 'NOTIF-3',
    title: 'New Health Tip Published',
    message: 'Check out our latest tip on 5 Daily Habits to Keep Seasonal Flu & Cough Away.',
    time: '1 day ago',
    read: true,
    type: 'tip',
  },
];
