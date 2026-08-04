import bookApptIcon from '../assets/book_appointment.png';
import careForAllAgesIcon from '../assets/care_for_all_ages.png';
import childHealthIcon from '../assets/child_health.png';
import clinicInfoIcon from '../assets/clinic_info.png';
import communityIcon from '../assets/community.png';
import consultNowIcon from '../assets/consult_now.png';
import diabetesCareIcon from '../assets/diabetes_care.png';
import drSakthiImage from '../assets/dr_sakthi_image.jpeg';
import generalConsultationIcon from '../assets/general_consulation.png';
import healthRecordsIcon from '../assets/health_records.png';
import healthTipsIcon from '../assets/health_tips.png';
import homeBg from '../assets/home-bg.png';
import mainServicesImg from '../assets/main_services.png';
import myApptsIcon from '../assets/my_appointments.png';
import personalisedAttentionIcon from '../assets/personalised_attention.png';
import respiratoryCareIcon from '../assets/respiratory_care.png';
import thaiClinicLogo from '../assets/thai_clinic_logo.png';
import tickMarkIcon from '../assets/tick_mark.png';
import trustIcon from '../assets/trust.png';
import welcomeBg from '../assets/welcome_background.png';

/** Essential assets needed to render the Welcome / Splash screen */
export const SPLASH_IMAGES = [
  thaiClinicLogo,
  welcomeBg,
];

/** Remaining app images preloaded in the background during splash screen */
export const REMAINING_IMAGES = [
  drSakthiImage,
  homeBg,
  mainServicesImg,
  bookApptIcon,
  myApptsIcon,
  consultNowIcon,
  healthRecordsIcon,
  healthTipsIcon,
  clinicInfoIcon,
  childHealthIcon,
  diabetesCareIcon,
  respiratoryCareIcon,
  generalConsultationIcon,
  personalisedAttentionIcon,
  careForAllAgesIcon,
  communityIcon,
  trustIcon,
  tickMarkIcon,
];

function preloadImageGroup(images: string[]): Promise<void> {
  return new Promise((resolve) => {
    let loadedCount = 0;
    const total = images.length;

    if (total === 0) {
      resolve();
      return;
    }

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      const handleDone = () => {
        loadedCount++;
        if (loadedCount >= total) {
          resolve();
        }
      };
      img.onload = handleDone;
      img.onerror = handleDone;
    });
  });
}

/** Preload splash screen essential images */
export function preloadSplashImages(): Promise<void> {
  return preloadImageGroup(SPLASH_IMAGES);
}

/** Preload all remaining app images in background */
export function preloadRemainingImages(): Promise<void> {
  return preloadImageGroup(REMAINING_IMAGES);
}

/** Preload all app images */
export function preloadAllImages(): Promise<void> {
  return preloadImageGroup([...SPLASH_IMAGES, ...REMAINING_IMAGES]);
}
