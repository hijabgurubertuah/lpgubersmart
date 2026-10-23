/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import {
  CmsSettings,
  StatItem,
  ProblemItem,
  BenefitItem,
  StepItem,
  ModuleItem,
  PortfolioItem,
  MentorProfile,
  TestimonialItem,
  PackageItem,
  BonusItem,
  UrgencySettings,
  FaqItem,
  StaticPageItem,
  ApplicantItem,
  ActivityLogItem,
  UserRole,
} from '../types';

import {
  INITIAL_CMS_SETTINGS,
  INITIAL_STATS,
  INITIAL_PROBLEMS,
  INITIAL_SOLUTION_STATEMENT,
  INITIAL_BENEFITS,
  INITIAL_STEPS,
  INITIAL_MODULES,
  INITIAL_PORTFOLIO,
  INITIAL_MENTOR,
  INITIAL_TESTIMONIALS,
  INITIAL_PACKAGES,
  INITIAL_BONUSES,
  INITIAL_GUARANTEE,
  INITIAL_URGENCY,
  INITIAL_FAQS,
  INITIAL_STATIC_PAGES,
  INITIAL_APPLICANTS,
  INITIAL_LOGS,
} from '../data/initialData';

const STORAGE_KEYS = {
  CMS: 'guber_smart_cms_settings_v1',
  STATS: 'guber_smart_stats_v1',
  PROBLEMS: 'guber_smart_problems_v1',
  SOLUTION: 'guber_smart_solution_v1',
  BENEFITS: 'guber_smart_benefits_v1',
  STEPS: 'guber_smart_steps_v1',
  MODULES: 'guber_smart_modules_v1',
  PORTFOLIO: 'guber_smart_portfolio_v1',
  MENTOR: 'guber_smart_mentor_v1',
  TESTIMONIALS: 'guber_smart_testimonials_v1',
  PACKAGES: 'guber_smart_packages_v1',
  BONUSES: 'guber_smart_bonuses_v1',
  GUARANTEE: 'guber_smart_guarantee_v1',
  URGENCY: 'guber_smart_urgency_v1',
  FAQS: 'guber_smart_faqs_v1',
  PAGES: 'guber_smart_pages_v1',
  APPLICANTS: 'guber_smart_applicants_v1',
  LOGS: 'guber_smart_logs_v1',
  SESSION: 'guber_smart_auth_session_v1',
  PASSWORDS: 'guber_smart_passwords_v1',
  IMAGE_CACHE: 'guber_smart_img_cache_v1',
};

// Session inactivity threshold: 30 minutes
const SESSION_INACTIVITY_MS = 30 * 60 * 1000;

interface AuthSession {
  role: UserRole;
  lastActive: number;
}

interface LocalPasswords {
  admin: string;
  superadmin: string;
}

// In-memory runtime image cache
const runtimeImageCache: Record<string, string> = {};

export class StorageService {
  private static get<T>(key: string, defaultValue: T): T {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore JSON error
    }
    return defaultValue;
  }

  private static set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore storage quota errors
    }
  }

  // --- Auth & Session ---
  static getSession(): AuthSession | null {
    const session = this.get<AuthSession | null>(STORAGE_KEYS.SESSION, null);
    if (!session) return null;
    if (Date.now() - session.lastActive > SESSION_INACTIVITY_MS) {
      this.clearSession();
      return null;
    }
    // Update heartbeat
    this.touchSession();
    return session;
  }

  static setSession(role: UserRole): void {
    const session: AuthSession = { role, lastActive: Date.now() };
    this.set(STORAGE_KEYS.SESSION, session);
  }

  static touchSession(): void {
    const session = this.get<AuthSession | null>(STORAGE_KEYS.SESSION, null);
    if (session) {
      session.lastActive = Date.now();
      this.set(STORAGE_KEYS.SESSION, session);
    }
  }

  static clearSession(): void {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  }

  // Passwords
  private static getLocalPasswords(): LocalPasswords {
    return this.get<LocalPasswords>(STORAGE_KEYS.PASSWORDS, {
      admin: 'admin123',
      superadmin: 'superadmin123',
    });
  }

  private static setLocalPasswords(passwords: LocalPasswords): void {
    this.set(STORAGE_KEYS.PASSWORDS, passwords);
  }

  static async verifyPassword(plainPassword: string, webAppUrl?: string): Promise<{ success: boolean; role?: UserRole; message?: string }> {
    // If webAppUrl configured, try Apps Script first
    if (webAppUrl) {
      try {
        const res = await fetch(webAppUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ action: 'verifyLogin', password: plainPassword }),
        });
        const json = await res.json();
        if (json.success && (json.role === 'admin' || json.role === 'superadmin')) {
          this.setSession(json.role);
          this.logActivity(json.role, 'Masuk Sistem', 'Berhasil masuk melalui verifikasi server.');
          return { success: true, role: json.role };
        }
      } catch {
        // Fallback to local
      }
    }

    // Local check
    const passwords = this.getLocalPasswords();
    if (plainPassword === passwords.superadmin) {
      this.setSession('superadmin');
      this.logActivity('superadmin', 'Masuk Sistem', 'Berhasil masuk akun superadmin.');
      return { success: true, role: 'superadmin' };
    }
    if (plainPassword === passwords.admin) {
      this.setSession('admin');
      this.logActivity('admin', 'Masuk Sistem', 'Berhasil masuk akun admin.');
      return { success: true, role: 'admin' };
    }
    return { success: false, message: 'Kata sandi tidak sesuai' };
  }

  static async changePassword(
    targetRole: 'admin' | 'superadmin',
    newPassword: string,
    webAppUrl?: string,
    token?: string
  ): Promise<{ success: boolean; message: string }> {
    if (newPassword.length < 8) {
      return { success: false, message: 'Minimal 8 karakter' };
    }

    // Remote sync if configured
    if (webAppUrl && token) {
      try {
        await fetch(webAppUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ action: 'changePassword', token, targetRole, newPassword }),
        });
      } catch {
        // Continue local update
      }
    }

    const passwords = this.getLocalPasswords();
    passwords[targetRole] = newPassword;
    this.setLocalPasswords(passwords);
    this.logActivity(targetRole, 'Ubah Kata Sandi', `Kata sandi peran ${targetRole} diperbarui.`);
    return { success: true, message: 'Berhasil disimpan' };
  }

  // --- CMS Settings ---
  static getCmsSettings(): CmsSettings {
    return this.get<CmsSettings>(STORAGE_KEYS.CMS, INITIAL_CMS_SETTINGS);
  }

  static saveCmsSettings(settings: CmsSettings): void {
    this.set(STORAGE_KEYS.CMS, settings);
  }

  // --- Content Lists ---
  static getStats(): StatItem[] {
    return this.get<StatItem[]>(STORAGE_KEYS.STATS, INITIAL_STATS);
  }
  static saveStats(items: StatItem[]): void {
    this.set(STORAGE_KEYS.STATS, items);
  }

  static getProblems(): ProblemItem[] {
    return this.get<ProblemItem[]>(STORAGE_KEYS.PROBLEMS, INITIAL_PROBLEMS);
  }
  static saveProblems(items: ProblemItem[]): void {
    this.set(STORAGE_KEYS.PROBLEMS, items);
  }

  static getSolution(): string {
    return this.get<string>(STORAGE_KEYS.SOLUTION, INITIAL_SOLUTION_STATEMENT);
  }
  static saveSolution(text: string): void {
    this.set(STORAGE_KEYS.SOLUTION, text);
  }

  static getBenefits(): BenefitItem[] {
    return this.get<BenefitItem[]>(STORAGE_KEYS.BENEFITS, INITIAL_BENEFITS);
  }
  static saveBenefits(items: BenefitItem[]): void {
    this.set(STORAGE_KEYS.BENEFITS, items);
  }

  static getSteps(): StepItem[] {
    return this.get<StepItem[]>(STORAGE_KEYS.STEPS, INITIAL_STEPS);
  }
  static saveSteps(items: StepItem[]): void {
    this.set(STORAGE_KEYS.STEPS, items);
  }

  static getModules(): ModuleItem[] {
    return this.get<ModuleItem[]>(STORAGE_KEYS.MODULES, INITIAL_MODULES);
  }
  static saveModules(items: ModuleItem[]): void {
    this.set(STORAGE_KEYS.MODULES, items);
  }

  static getPortfolio(): PortfolioItem[] {
    return this.get<PortfolioItem[]>(STORAGE_KEYS.PORTFOLIO, INITIAL_PORTFOLIO);
  }
  static savePortfolio(items: PortfolioItem[]): void {
    this.set(STORAGE_KEYS.PORTFOLIO, items);
  }

  static getMentor(): MentorProfile {
    return this.get<MentorProfile>(STORAGE_KEYS.MENTOR, INITIAL_MENTOR);
  }
  static saveMentor(profile: MentorProfile): void {
    this.set(STORAGE_KEYS.MENTOR, profile);
  }

  static getTestimonials(): TestimonialItem[] {
    return this.get<TestimonialItem[]>(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
  }
  static saveTestimonials(items: TestimonialItem[]): void {
    this.set(STORAGE_KEYS.TESTIMONIALS, items);
  }

  static getPackages(): PackageItem[] {
    return this.get<PackageItem[]>(STORAGE_KEYS.PACKAGES, INITIAL_PACKAGES);
  }
  static savePackages(items: PackageItem[]): void {
    this.set(STORAGE_KEYS.PACKAGES, items);
  }

  static getBonuses(): BonusItem[] {
    return this.get<BonusItem[]>(STORAGE_KEYS.BONUSES, INITIAL_BONUSES);
  }
  static saveBonuses(items: BonusItem[]): void {
    this.set(STORAGE_KEYS.BONUSES, items);
  }

  static getGuarantee(): string {
    return this.get<string>(STORAGE_KEYS.GUARANTEE, INITIAL_GUARANTEE);
  }
  static saveGuarantee(text: string): void {
    this.set(STORAGE_KEYS.GUARANTEE, text);
  }

  static getUrgency(): UrgencySettings {
    return this.get<UrgencySettings>(STORAGE_KEYS.URGENCY, INITIAL_URGENCY);
  }
  static saveUrgency(settings: UrgencySettings): void {
    this.set(STORAGE_KEYS.URGENCY, settings);
  }

  static getFaqs(): FaqItem[] {
    return this.get<FaqItem[]>(STORAGE_KEYS.FAQS, INITIAL_FAQS);
  }
  static saveFaqs(items: FaqItem[]): void {
    this.set(STORAGE_KEYS.FAQS, items);
  }

  static getStaticPages(): StaticPageItem[] {
    return this.get<StaticPageItem[]>(STORAGE_KEYS.PAGES, INITIAL_STATIC_PAGES);
  }
  static saveStaticPages(pages: StaticPageItem[]): void {
    this.set(STORAGE_KEYS.PAGES, pages);
  }

  // --- Applicants ---
  static getApplicants(): ApplicantItem[] {
    return this.get<ApplicantItem[]>(STORAGE_KEYS.APPLICANTS, INITIAL_APPLICANTS);
  }
  static saveApplicants(applicants: ApplicantItem[]): void {
    this.set(STORAGE_KEYS.APPLICANTS, applicants);
  }

  static addApplicant(applicant: Omit<ApplicantItem, 'id' | 'status' | 'createdAt'>): { success: boolean; applicant: ApplicantItem; isDuplicate: boolean } {
    const list = this.getApplicants();
    const now = new Date();
    
    // Check duplicate from same phone within 24 hours
    const oneDayAgo = now.getTime() - 24 * 60 * 60 * 1000;
    const cleanPhone = applicant.whatsapp.replace(/\D/g, '');
    const isDuplicate = list.some(
      (a) => a.whatsapp.replace(/\D/g, '') === cleanPhone && new Date(a.createdAt).getTime() > oneDayAgo
    );

    const newApplicant: ApplicantItem = {
      ...applicant,
      id: `APP-${Date.now()}`,
      status: 'Baru',
      createdAt: now.toISOString(),
      isDuplicate,
    };

    const updated = [newApplicant, ...list];
    this.saveApplicants(updated);

    // Also decrement remaining quota if applicable
    const urgency = this.getUrgency();
    if (urgency.remainingSeats > 0) {
      this.saveUrgency({
        ...urgency,
        remainingSeats: Math.max(0, urgency.remainingSeats - 1),
      });
    }

    // Try sync to sheet asynchronously if configured
    const cms = this.getCmsSettings();
    if (cms.syncSettings.webAppUrl) {
      fetch(cms.syncSettings.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'submitApplicant', applicant: newApplicant }),
      }).catch(() => {
        // offline fallback
      });
    }

    return { success: true, applicant: newApplicant, isDuplicate };
  }

  // --- Activity Logs ---
  static getLogs(): ActivityLogItem[] {
    return this.get<ActivityLogItem[]>(STORAGE_KEYS.LOGS, INITIAL_LOGS);
  }

  static logActivity(role: 'admin' | 'superadmin', action: string, details: string): void {
    const list = this.getLogs();
    const newLog: ActivityLogItem = {
      id: `LOG-${Date.now()}`,
      role,
      action,
      details,
      timestamp: new Date().toISOString(),
    };
    this.set(STORAGE_KEYS.LOGS, [newLog, ...list.slice(0, 199)]);

    const cms = this.getCmsSettings();
    if (cms.syncSettings.webAppUrl && cms.syncSettings.token) {
      fetch(cms.syncSettings.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'logActivity', token: cms.syncSettings.token, log: newLog }),
      }).catch(() => {});
    }
  }

  // --- Image Base64 Cache for Drive Files ---
  static async resolveImageSrc(image: { source: 'tautan' | 'drive'; value: string }): Promise<string> {
    if (!image || !image.value) return '';
    if (image.source === 'tautan') {
      return image.value;
    }
    // Drive fileId
    const fileId = image.value;
    if (runtimeImageCache[fileId]) {
      return runtimeImageCache[fileId];
    }
    const cms = this.getCmsSettings();
    if (cms.syncSettings.webAppUrl) {
      try {
        const url = `${cms.syncSettings.webAppUrl}?action=getImage&fileId=${encodeURIComponent(fileId)}`;
        const res = await fetch(url);
        const json = await res.json();
        if (json.success && json.base64) {
          runtimeImageCache[fileId] = json.base64;
          return json.base64;
        }
      } catch {
        // Fallback
      }
    }
    return '';
  }

  // Client-side image compress & upload
  static compressImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const maxDim = 1600;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, w, h);
            resolve(canvas.toDataURL('image/jpeg', 0.8));
          } else {
            resolve(img.src);
          }
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  }

  static async uploadImageToDrive(base64Data: string, fileName: string): Promise<{ success: boolean; fileId?: string; url?: string; message?: string }> {
    const cms = this.getCmsSettings();
    if (!cms.syncSettings.webAppUrl || !cms.syncSettings.token) {
      return { success: false, message: 'Koneksi belum diatur' };
    }
    try {
      const res = await fetch(cms.syncSettings.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'uploadFile',
          token: cms.syncSettings.token,
          base64Data,
          fileName,
          mimeType: 'image/jpeg',
        }),
      });
      const json = await res.json();
      if (json.success && json.fileId) {
        runtimeImageCache[json.fileId] = base64Data;
        return { success: true, fileId: json.fileId, url: json.url };
      }
      return { success: false, message: json.message || 'Gagal mengunggah' };
    } catch {
      return { success: false, message: 'Gagal mengunggah' };
    }
  }

  static async deleteDriveFile(fileId: string): Promise<boolean> {
    const cms = this.getCmsSettings();
    if (!cms.syncSettings.webAppUrl || !cms.syncSettings.token) return false;
    try {
      await fetch(cms.syncSettings.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'deleteFile',
          token: cms.syncSettings.token,
          fileId,
        }),
      });
      delete runtimeImageCache[fileId];
      return true;
    } catch {
      return false;
    }
  }

  // Connection Test
  static async testConnection(webAppUrl: string): Promise<boolean> {
    try {
      const res = await fetch(`${webAppUrl}?action=test`);
      const json = await res.json();
      return !!json.success;
    } catch {
      return false;
    }
  }

  // Push Tab Changes to Sheet
  static async pushSettingsToSheet(settingsMap: Record<string, unknown>): Promise<{ success: boolean; message: string }> {
    const cms = this.getCmsSettings();
    if (!cms.syncSettings.webAppUrl || !cms.syncSettings.token) {
      return { success: true, message: 'Berhasil disimpan' }; // Saved locally
    }
    try {
      const res = await fetch(cms.syncSettings.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'saveSettings',
          token: cms.syncSettings.token,
          settings: settingsMap,
        }),
      });
      const json = await res.json();
      if (json.success) {
        return { success: true, message: 'Berhasil disimpan' };
      }
      return { success: false, message: json.message || 'Gagal disimpan' };
    } catch {
      return { success: true, message: 'Berhasil disimpan' }; // Local saved
    }
  }
}
