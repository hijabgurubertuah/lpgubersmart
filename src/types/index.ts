/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

export type UserRole = 'public' | 'admin' | 'superadmin';

export interface ImageRef {
  source: 'tautan' | 'drive';
  value: string; // URL or Drive fileId
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  isVisible: boolean;
  order: number;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  numericTarget: number;
  prefix?: string;
  suffix?: string;
  order: number;
  isVisible: boolean;
}

export interface ProblemItem {
  id: string;
  title: string;
  order: number;
  isVisible: boolean;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  order: number;
  isVisible: boolean;
}

export interface StepItem {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  order: number;
  isVisible: boolean;
}

export interface ModuleItem {
  id: string;
  title: string;
  points: string[];
  order: number;
  isVisible: boolean;
}

export type PortfolioCategory = 'Semua' | 'Website' | 'Toko' | 'Administrasi';

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Website' | 'Toko' | 'Administrasi';
  image: ImageRef;
  order: number;
  isVisible: boolean;
}

export interface MentorProfile {
  name: string;
  title: string;
  bio: string;
  photo: ImageRef;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
  photo: ImageRef;
  order: number;
  isVisible: boolean;
}

export interface PackageItem {
  id: string;
  name: string;
  price: string;
  strikePrice: string;
  features: string[];
  isFeatured: boolean;
  buttonText: string;
  isActive: boolean;
  order: number;
}

export interface BonusItem {
  id: string;
  title: string;
  description: string;
  order: number;
  isVisible: boolean;
}

export interface UrgencySettings {
  deadlineDate: string; // ISO string
  totalSeats: number;
  remainingSeats: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  isVisible: boolean;
}

export interface StaticPageItem {
  id: string;
  slug: string;
  title: string;
  content: string;
  order: number;
  isVisible: boolean;
}

export type ApplicantStatus = 'Baru' | 'Dihubungi' | 'Selesai';

export interface ApplicantItem {
  id: string;
  name: string;
  whatsapp: string;
  appType: string;
  packageId: string;
  packageName: string;
  message?: string;
  status: ApplicantStatus;
  createdAt: string;
  notes?: string;
  isDuplicate?: boolean;
}

export interface ActivityLogItem {
  id: string;
  role: 'admin' | 'superadmin';
  action: string;
  details: string;
  timestamp: string;
}

export interface SectionConfig {
  id: string;
  title: string;
  subtitle?: string;
  isVisible: boolean;
  order: number;
}

export interface CmsSettings {
  identity: {
    appName: string;
    slogan: string;
    logo: ImageRef;
    favicon: string;
    pageTitle: string;
    pageDescription: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
    borderRadius: string;
    light: {
      background: string;
      card: string;
      text: string;
      textSecondary: string;
    };
    dark: {
      background: string;
      card: string;
      text: string;
      textSecondary: string;
    };
  };
  navigation: NavItem[];
  buttons: {
    ctaHeroText: string;
    ctaWorkText: string;
    ctaFloatingText: string;
    ctaFormText: string;
    ctaClosingText: string;
    whatsappNumber: string;
    whatsappGeneralMessage: string;
    whatsappPostRegistrationMessage: string;
  };
  features: {
    showCountdown: boolean;
    showQuota: boolean;
    showMobileCtaBar: boolean;
    showFloatingWhatsapp: boolean;
    showPromoVideo: boolean;
    showTestimonials: boolean;
    showPortfolio: boolean;
    showBonus: boolean;
    showRegForm: boolean;
    enableScrollAnimation: boolean;
  };
  sections: Record<string, SectionConfig>;
  media: {
    promoVideoUrl: string;
    heroMockupImage: ImageRef;
    sharePreviewImage: ImageRef;
  };
  seoTrackers: {
    metaTitle: string;
    metaDescription: string;
    shareImage: ImageRef;
    metaPixelId: string;
    googleAnalyticsId: string;
  };
  footerContact: {
    address: string;
    phone: string;
    email: string;
    operatingHours: string;
    copyright: string;
    socialLinks: {
      facebook?: string;
      instagram?: string;
      youtube?: string;
      linkedin?: string;
      twitter?: string;
      github?: string;
    };
  };
  syncSettings: {
    webAppUrl: string;
    token: string;
    driveFolderId: string;
    spreadsheetId: string;
    sheetNames: {
      applicants: string;
      settings: string;
      packages: string;
      content: string;
      logs: string;
      accounts: string;
    };
  };
}
