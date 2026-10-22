/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState, useEffect, useCallback } from 'react';
import { UserRole, PackageItem } from './types';
import { StorageService } from './services/storageService';

// Common Components
import { Header } from './components/common/Header';
import { LoginModal } from './components/common/LoginModal';
import { MobileCtaBar } from './components/common/MobileCtaBar';
import { FloatingWhatsapp } from './components/common/FloatingWhatsapp';
import { OfflineBadge } from './components/common/OfflineBadge';
import { NotificationToast, ToastMessage } from './components/common/NotificationToast';

// Public Sections
import { Hero } from './components/sections/Hero';
import { BarAngka } from './components/sections/BarAngka';
import { MasalahSolusi } from './components/sections/MasalahSolusi';
import { Manfaat } from './components/sections/Manfaat';
import { CaraKerja } from './components/sections/CaraKerja';
import { Materi } from './components/sections/Materi';
import { Karya } from './components/sections/Karya';
import { VideoPromosi } from './components/sections/VideoPromosi';
import { Mentor } from './components/sections/Mentor';
import { Testimoni } from './components/sections/Testimoni';
import { Paket } from './components/sections/Paket';
import { Urgensi } from './components/sections/Urgensi';
import { Faq } from './components/sections/Faq';
import { FormulirPendaftaran } from './components/sections/FormulirPendaftaran';
import { AjakanPenutup } from './components/sections/AjakanPenutup';
import { Footer } from './components/sections/Footer';

// Static & 404 Pages
import { StaticPageView } from './components/pages/StaticPageView';
import { NotFoundView } from './components/pages/NotFoundView';

// Admin Components
import { AdminLayout, AdminTab } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminApplicants } from './components/admin/AdminApplicants';
import { AdminSections } from './components/admin/AdminSections';
import { AdminContentList } from './components/admin/AdminContentList';
import { AdminPackages } from './components/admin/AdminPackages';
import { AdminUrgency } from './components/admin/AdminUrgency';
import { AdminPages } from './components/admin/AdminPages';
import { AdminFooterContact } from './components/admin/AdminFooterContact';
import { AdminPassword } from './components/admin/AdminPassword';

// Superadmin CMS Components
import { AdminIdentity } from './components/admin/AdminIdentity';
import { AdminTheme } from './components/admin/AdminTheme';
import { AdminNavigation } from './components/admin/AdminNavigation';
import { AdminButtons } from './components/admin/AdminButtons';
import { AdminFeatures } from './components/admin/AdminFeatures';
import { AdminMedia } from './components/admin/AdminMedia';
import { AdminSeoTrackers } from './components/admin/AdminSeoTrackers';
import { AdminActivityLogs } from './components/admin/AdminActivityLogs';
import { AdminSync } from './components/admin/AdminSync';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => StorageService.getTheme());

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    StorageService.setTheme(next);
  };

  useEffect(() => {
    StorageService.setTheme(theme);
  }, [theme]);

  // Auth State
  const [userRole, setUserRole] = useState<UserRole>(() => {
    const session = StorageService.getSession();
    return session ? session.role : 'public';
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // App Data State (loaded from storage)
  const [cmsSettings, setCmsSettings] = useState(() => StorageService.getCmsSettings());
  const [stats, setStats] = useState(() => StorageService.getStats());
  const [problems, setProblems] = useState(() => StorageService.getProblems());
  const [solutionText, setSolutionText] = useState(() => StorageService.getSolution());
  const [benefits, setBenefits] = useState(() => StorageService.getBenefits());
  const [steps, setSteps] = useState(() => StorageService.getSteps());
  const [modules, setModules] = useState(() => StorageService.getModules());
  const [portfolio, setPortfolio] = useState(() => StorageService.getPortfolio());
  const [mentor, setMentor] = useState(() => StorageService.getMentor());
  const [testimonials, setTestimonials] = useState(() => StorageService.getTestimonials());
  const [packages, setPackages] = useState(() => StorageService.getPackages());
  const [bonuses, setBonuses] = useState(() => StorageService.getBonuses());
  const [guaranteeText, setGuaranteeText] = useState(() => StorageService.getGuarantee());
  const [urgency, setUrgency] = useState(() => StorageService.getUrgency());
  const [faqs, setFaqs] = useState(() => StorageService.getFaqs());
  const [staticPages, setStaticPages] = useState(() => StorageService.getStaticPages());
  const [applicants, setApplicants] = useState(() => StorageService.getApplicants());
  const [logs, setLogs] = useState(() => StorageService.getLogs());

  // Routing State
  const [currentHash, setCurrentHash] = useState<string>(() => window.location.hash || '#beranda');
  const [adminTab, setAdminTab] = useState<AdminTab>('dasbor');

  // Form selection link
  const [selectedPackageId, setSelectedPackageId] = useState<string | undefined>(undefined);

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showNotification = useCallback((text: string, type: 'success' | 'error' = 'success') => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, text, type }]);
  }, []);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync hash routing on window popstate / hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#beranda';
      setCurrentHash(hash);

      if (hash.startsWith('#/admin')) {
        const parts = hash.split('/');
        if (parts[2]) {
          setAdminTab(parts[2] as AdminTab);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update URL and scroll smoothly
  const navigateTo = (href: string) => {
    setCurrentHash(href);
    window.location.hash = href;

    if (href.startsWith('#/')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href.startsWith('#')) {
      const elId = href.slice(1);
      const el = document.getElementById(elId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Login & Logout
  const handleLoginSuccess = (role: UserRole) => {
    setUserRole(role);
    navigateTo('#/admin');
    showNotification('Berhasil masuk');
  };

  const handleLogout = () => {
    StorageService.clearSession();
    setUserRole('public');
    navigateTo('#beranda');
    showNotification('Berhasil keluar');
  };

  // Select package in card and scroll to registration form
  const handleSelectPackage = (pkg: PackageItem) => {
    setSelectedPackageId(pkg.id);
    navigateTo('#daftar');
  };

  // --- Handlers for CMS saving with Google Apps Script push ---
  const handleSaveSections = async (newSections: typeof cmsSettings.sections) => {
    const updated = { ...cmsSettings, sections: newSections };
    setCmsSettings(updated);
    StorageService.saveCmsSettings(updated);
    await StorageService.pushSettingsToSheet({ sections: newSections });
    showNotification('Berhasil disimpan');
  };

  const handleSaveContent = async (data: {
    stats: typeof stats;
    problems: typeof problems;
    benefits: typeof benefits;
    steps: typeof steps;
    modules: typeof modules;
    portfolio: typeof portfolio;
    mentor: typeof mentor;
    testimonials: typeof testimonials;
    bonuses: typeof bonuses;
    faqs: typeof faqs;
  }) => {
    setStats(data.stats);
    StorageService.saveStats(data.stats);
    setProblems(data.problems);
    StorageService.saveProblems(data.problems);
    setBenefits(data.benefits);
    StorageService.saveBenefits(data.benefits);
    setSteps(data.steps);
    StorageService.saveSteps(data.steps);
    setModules(data.modules);
    StorageService.saveModules(data.modules);
    setPortfolio(data.portfolio);
    StorageService.savePortfolio(data.portfolio);
    setMentor(data.mentor);
    StorageService.saveMentor(data.mentor);
    setTestimonials(data.testimonials);
    StorageService.saveTestimonials(data.testimonials);
    setBonuses(data.bonuses);
    StorageService.saveBonuses(data.bonuses);
    setFaqs(data.faqs);
    StorageService.saveFaqs(data.faqs);

    await StorageService.pushSettingsToSheet({
      stats: data.stats,
      problems: data.problems,
      benefits: data.benefits,
      steps: data.steps,
      modules: data.modules,
      portfolio: data.portfolio,
      mentor: data.mentor,
      testimonials: data.testimonials,
      bonuses: data.bonuses,
      faqs: data.faqs,
    });
    showNotification('Berhasil disimpan');
  };

  const handleSavePackages = async (newPackages: typeof packages) => {
    setPackages(newPackages);
    StorageService.savePackages(newPackages);
    await StorageService.pushSettingsToSheet({ packages: newPackages });
    showNotification('Berhasil disimpan');
  };

  const handleSaveUrgency = async (newUrgency: typeof urgency) => {
    setUrgency(newUrgency);
    StorageService.saveUrgency(newUrgency);
    await StorageService.pushSettingsToSheet({ urgency: newUrgency });
    showNotification('Berhasil disimpan');
  };

  const handleSavePages = async (newPages: typeof staticPages) => {
    setStaticPages(newPages);
    StorageService.saveStaticPages(newPages);
    await StorageService.pushSettingsToSheet({ pages: newPages });
    showNotification('Berhasil disimpan');
  };

  const handleSaveFooterContact = async (footerContact: typeof cmsSettings.footerContact) => {
    const updated = { ...cmsSettings, footerContact };
    setCmsSettings(updated);
    StorageService.saveCmsSettings(updated);
    await StorageService.pushSettingsToSheet({ footerContact });
    showNotification('Berhasil disimpan');
  };

  const handleSaveIdentity = async (identity: typeof cmsSettings.identity) => {
    const updated = { ...cmsSettings, identity };
    setCmsSettings(updated);
    StorageService.saveCmsSettings(updated);
    await StorageService.pushSettingsToSheet({ identity });
    showNotification('Berhasil disimpan');
  };

  const handleSaveTheme = async (themeConfig: typeof cmsSettings.theme) => {
    const updated = { ...cmsSettings, theme: themeConfig };
    setCmsSettings(updated);
    StorageService.saveCmsSettings(updated);
    await StorageService.pushSettingsToSheet({ theme: themeConfig });
    showNotification('Berhasil disimpan');
  };

  const handleSaveNavigation = async (navigation: typeof cmsSettings.navigation) => {
    const updated = { ...cmsSettings, navigation };
    setCmsSettings(updated);
    StorageService.saveCmsSettings(updated);
    await StorageService.pushSettingsToSheet({ navigation });
    showNotification('Berhasil disimpan');
  };

  const handleSaveButtons = async (buttons: typeof cmsSettings.buttons) => {
    const updated = { ...cmsSettings, buttons };
    setCmsSettings(updated);
    StorageService.saveCmsSettings(updated);
    await StorageService.pushSettingsToSheet({ buttons });
    showNotification('Berhasil disimpan');
  };

  const handleSaveFeatures = async (features: typeof cmsSettings.features) => {
    const updated = { ...cmsSettings, features };
    setCmsSettings(updated);
    StorageService.saveCmsSettings(updated);
    await StorageService.pushSettingsToSheet({ features });
    showNotification('Berhasil disimpan');
  };

  const handleSaveMedia = async (media: typeof cmsSettings.media) => {
    const updated = { ...cmsSettings, media };
    setCmsSettings(updated);
    StorageService.saveCmsSettings(updated);
    await StorageService.pushSettingsToSheet({ media });
    showNotification('Berhasil disimpan');
  };

  const handleSaveSeoTrackers = async (seoTrackers: typeof cmsSettings.seoTrackers) => {
    const updated = { ...cmsSettings, seoTrackers };
    setCmsSettings(updated);
    StorageService.saveCmsSettings(updated);
    await StorageService.pushSettingsToSheet({ seoTrackers });
    showNotification('Berhasil disimpan');
  };

  const handleSaveSyncSettings = async (syncSettings: typeof cmsSettings.syncSettings) => {
    const updated = { ...cmsSettings, syncSettings };
    setCmsSettings(updated);
    StorageService.saveCmsSettings(updated);
    showNotification('Berhasil disimpan');
  };

  // --- Route rendering logic ---
  const isAdminRoute = currentHash.startsWith('#/admin');
  const isPrivacyRoute = currentHash === '#/kebijakan-privasi';
  const isTermsRoute = currentHash === '#/syarat-dan-ketentuan';

  // Render Admin View
  if (isAdminRoute) {
    if (userRole === 'public') {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] flex items-center justify-center p-4">
          <LoginModal
            isOpen={true}
            onClose={() => navigateTo('#beranda')}
            onLoginSuccess={handleLoginSuccess}
            webAppUrl={cmsSettings.syncSettings.webAppUrl}
          />
        </div>
      );
    }

    return (
      <>
        <OfflineBadge />
        <NotificationToast toasts={toasts} onDismiss={dismissToast} />
        <AdminLayout
          currentRole={userRole}
          activeTab={adminTab}
          onTabChange={(tab) => {
            setAdminTab(tab);
            window.location.hash = `#/admin/${tab}`;
          }}
          onLogout={handleLogout}
          onPreviewSite={() => navigateTo('#beranda')}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        >
          {adminTab === 'dasbor' && (
            <AdminDashboard
              applicants={applicants}
              packages={packages}
              onNavigateToApplicants={() => {
                setAdminTab('pendaftar');
                window.location.hash = '#/admin/pendaftar';
              }}
            />
          )}

          {adminTab === 'pendaftar' && (
            <AdminApplicants
              applicants={applicants}
              packages={packages}
              onUpdateApplicants={setApplicants}
              onShowNotification={showNotification}
            />
          )}

          {adminTab === 'sections' && (
            <AdminSections
              sections={cmsSettings.sections}
              onSave={handleSaveSections}
            />
          )}

          {adminTab === 'content' && (
            <AdminContentList
              stats={stats}
              problems={problems}
              benefits={benefits}
              steps={steps}
              modules={modules}
              portfolio={portfolio}
              mentor={mentor}
              testimonials={testimonials}
              bonuses={bonuses}
              faqs={faqs}
              onSaveAll={handleSaveContent}
            />
          )}

          {adminTab === 'packages' && (
            <AdminPackages
              packages={packages}
              onSave={handleSavePackages}
            />
          )}

          {adminTab === 'urgency' && (
            <AdminUrgency
              urgency={urgency}
              onSave={handleSaveUrgency}
            />
          )}

          {adminTab === 'pages' && (
            <AdminPages
              pages={staticPages}
              onSave={handleSavePages}
            />
          )}

          {adminTab === 'footerContact' && (
            <AdminFooterContact
              footerContact={cmsSettings.footerContact}
              onSave={handleSaveFooterContact}
            />
          )}

          {adminTab === 'password' && (
            <AdminPassword
              currentRole={userRole}
              webAppUrl={cmsSettings.syncSettings.webAppUrl}
              token={cmsSettings.syncSettings.token}
              onShowNotification={showNotification}
            />
          )}

          {/* Superadmin specific tabs */}
          {userRole === 'superadmin' && (
            <>
              {adminTab === 'identity' && (
                <AdminIdentity
                  identity={cmsSettings.identity}
                  onSave={handleSaveIdentity}
                />
              )}

              {adminTab === 'theme' && (
                <AdminTheme
                  theme={cmsSettings.theme}
                  onSave={handleSaveTheme}
                />
              )}

              {adminTab === 'navigation' && (
                <AdminNavigation
                  navigation={cmsSettings.navigation}
                  onSave={handleSaveNavigation}
                />
              )}

              {adminTab === 'buttons' && (
                <AdminButtons
                  buttons={cmsSettings.buttons}
                  onSave={handleSaveButtons}
                />
              )}

              {adminTab === 'features' && (
                <AdminFeatures
                  features={cmsSettings.features}
                  onSave={handleSaveFeatures}
                />
              )}

              {adminTab === 'media' && (
                <AdminMedia
                  media={cmsSettings.media}
                  onSave={handleSaveMedia}
                />
              )}

              {adminTab === 'seoTrackers' && (
                <AdminSeoTrackers
                  seoTrackers={cmsSettings.seoTrackers}
                  onSave={handleSaveSeoTrackers}
                />
              )}

              {adminTab === 'logs' && (
                <AdminActivityLogs logs={logs} />
              )}

              {adminTab === 'sync' && (
                <AdminSync
                  syncSettings={cmsSettings.syncSettings}
                  onSave={handleSaveSyncSettings}
                  onShowNotification={showNotification}
                />
              )}
            </>
          )}
        </AdminLayout>
      </>
    );
  }

  // Render Static Page
  if (isPrivacyRoute || isTermsRoute) {
    const slug = isPrivacyRoute ? 'kebijakan-privasi' : 'syarat-dan-ketentuan';
    const page = staticPages.find((p) => p.slug === slug);

    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B1120]">
        <OfflineBadge />
        <Header
          appName={cmsSettings.identity.appName}
          logo={cmsSettings.identity.logo}
          navItems={cmsSettings.navigation}
          activeHash={currentHash}
          onNavigate={navigateTo}
          userRole={userRole}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          ctaText={cmsSettings.buttons.ctaHeroText}
        />
        <main className="flex-1">
          <StaticPageView page={page} onBackToHome={() => navigateTo('#beranda')} />
        </main>
        <Footer
          appName={cmsSettings.identity.appName}
          slogan={cmsSettings.identity.slogan}
          logo={cmsSettings.identity.logo}
          copyright={cmsSettings.footerContact.copyright}
          phone={cmsSettings.footerContact.phone}
          email={cmsSettings.footerContact.email}
          address={cmsSettings.footerContact.address}
          operatingHours={cmsSettings.footerContact.operatingHours}
          onNavigate={navigateTo}
          socialLinks={cmsSettings.footerContact.socialLinks}
        />
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          webAppUrl={cmsSettings.syncSettings.webAppUrl}
        />
      </div>
    );
  }

  // 404 Check for unrecognized non-section hashes starting with #/
  if (currentHash.startsWith('#/') && !isAdminRoute) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B1120]">
        <OfflineBadge />
        <Header
          appName={cmsSettings.identity.appName}
          logo={cmsSettings.identity.logo}
          navItems={cmsSettings.navigation}
          activeHash={currentHash}
          onNavigate={navigateTo}
          userRole={userRole}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          ctaText={cmsSettings.buttons.ctaHeroText}
        />
        <main className="flex-1">
          <NotFoundView onBackToHome={() => navigateTo('#beranda')} />
        </main>
        <Footer
          appName={cmsSettings.identity.appName}
          slogan={cmsSettings.identity.slogan}
          logo={cmsSettings.identity.logo}
          copyright={cmsSettings.footerContact.copyright}
          phone={cmsSettings.footerContact.phone}
          email={cmsSettings.footerContact.email}
          address={cmsSettings.footerContact.address}
          operatingHours={cmsSettings.footerContact.operatingHours}
          onNavigate={navigateTo}
          socialLinks={cmsSettings.footerContact.socialLinks}
        />
      </div>
    );
  }

  // Render Public Landing Page (16 ordered sections)
  const sections = cmsSettings.sections;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-[#E5E7EB] font-sans selection:bg-indigo-500 selection:text-white">
      <OfflineBadge />
      <NotificationToast toasts={toasts} onDismiss={dismissToast} />

      {/* Main Top Header */}
      <Header
        appName={cmsSettings.identity.appName}
        logo={cmsSettings.identity.logo}
        navItems={cmsSettings.navigation}
        activeHash={currentHash}
        onNavigate={navigateTo}
        userRole={userRole}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        ctaText={cmsSettings.buttons.ctaHeroText}
      />

      <main className="flex-1">
        {/* 1. Hero */}
        {sections.hero?.isVisible && (
          <Hero
            title={sections.hero.title}
            subtitle={sections.hero.subtitle || ''}
            ctaHeroText={cmsSettings.buttons.ctaHeroText}
            ctaWorkText={cmsSettings.buttons.ctaWorkText}
            mockupImage={cmsSettings.media.heroMockupImage}
            onCtaClick={() => navigateTo('#daftar')}
            onWorkClick={() => navigateTo('#cara-kerja')}
          />
        )}

        {/* 2. Bar Angka */}
        {sections.stats?.isVisible && (
          <BarAngka stats={stats} />
        )}

        {/* 3. Masalah dan Solusi */}
        {sections.problems?.isVisible && (
          <MasalahSolusi
            problems={problems}
            solutionText={solutionText}
            onCtaClick={() => navigateTo('#daftar')}
            ctaText={cmsSettings.buttons.ctaHeroText}
          />
        )}

        {/* 4. Manfaat */}
        {sections.benefits?.isVisible && (
          <Manfaat benefits={benefits} />
        )}

        {/* 5. Cara Kerja */}
        {sections.howItWorks?.isVisible && (
          <CaraKerja steps={steps} />
        )}

        {/* 6. Materi */}
        {sections.curriculum?.isVisible && (
          <Materi modules={modules} />
        )}

        {/* 7. Karya */}
        {sections.portfolio?.isVisible && cmsSettings.features.showPortfolio && (
          <Karya portfolio={portfolio} />
        )}

        {/* 8. Video Promosi */}
        {sections.video?.isVisible && cmsSettings.features.showPromoVideo && (
          <VideoPromosi videoUrl={cmsSettings.media.promoVideoUrl} />
        )}

        {/* 9. Mentor */}
        {sections.mentor?.isVisible && (
          <Mentor mentor={mentor} />
        )}

        {/* 10. Testimoni */}
        {sections.testimonials?.isVisible && cmsSettings.features.showTestimonials && (
          <Testimoni testimonials={testimonials} />
        )}

        {/* 11. Paket dan Harga */}
        {sections.packages?.isVisible && (
          <Paket
            packages={packages}
            bonuses={bonuses}
            guaranteeText={guaranteeText}
            onSelectPackage={handleSelectPackage}
            showBonus={cmsSettings.features.showBonus}
          />
        )}

        {/* 12. Urgensi */}
        {sections.urgency?.isVisible && (cmsSettings.features.showCountdown || cmsSettings.features.showQuota) && (
          <Urgensi
            urgency={urgency}
            showCountdown={cmsSettings.features.showCountdown}
            showQuota={cmsSettings.features.showQuota}
          />
        )}

        {/* 13. FAQ */}
        {sections.faq?.isVisible && (
          <Faq faqs={faqs} />
        )}

        {/* 14. Formulir Pendaftaran */}
        {sections.form?.isVisible && cmsSettings.features.showRegForm && (
          <FormulirPendaftaran
            packages={packages}
            selectedPackageId={selectedPackageId}
            whatsappNumber={cmsSettings.buttons.whatsappNumber}
            whatsappPostRegTemplate={cmsSettings.buttons.whatsappPostRegistrationMessage}
            onSuccessSubmit={() => {
              setApplicants(StorageService.getApplicants());
              setUrgency(StorageService.getUrgency());
            }}
          />
        )}

        {/* 15. Ajakan Penutup */}
        {sections.closingCta?.isVisible && (
          <AjakanPenutup
            title={sections.closingCta.title}
            subtitle={sections.closingCta.subtitle || ''}
            ctaText={cmsSettings.buttons.ctaClosingText}
            whatsappNumber={cmsSettings.buttons.whatsappNumber}
            whatsappMessage={cmsSettings.buttons.whatsappGeneralMessage}
            onCtaClick={() => navigateTo('#daftar')}
          />
        )}
      </main>

      {/* 16. Footer */}
      {sections.footer?.isVisible && (
        <Footer
          appName={cmsSettings.identity.appName}
          slogan={cmsSettings.identity.slogan}
          logo={cmsSettings.identity.logo}
          copyright={cmsSettings.footerContact.copyright}
          phone={cmsSettings.footerContact.phone}
          email={cmsSettings.footerContact.email}
          address={cmsSettings.footerContact.address}
          operatingHours={cmsSettings.footerContact.operatingHours}
          onNavigate={navigateTo}
          socialLinks={cmsSettings.footerContact.socialLinks}
        />
      )}

      {/* Floating Action Elements */}
      <MobileCtaBar
        buttonText={cmsSettings.buttons.ctaFloatingText}
        onCtaClick={() => navigateTo('#daftar')}
        showFeature={cmsSettings.features.showMobileCtaBar}
      />

      <FloatingWhatsapp
        whatsappNumber={cmsSettings.buttons.whatsappNumber}
        defaultMessage={cmsSettings.buttons.whatsappGeneralMessage}
        showFeature={cmsSettings.features.showFloatingWhatsapp}
        hasMobileCtaBar={cmsSettings.features.showMobileCtaBar}
      />

      {/* Login Dialog Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        webAppUrl={cmsSettings.syncSettings.webAppUrl}
      />
    </div>
  );
}
