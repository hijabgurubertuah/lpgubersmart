/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState } from 'react';
import { Menu, LayoutDashboard, LogIn } from 'lucide-react';
import { NavItem, UserRole, ImageRef } from '../../types';
import { ThemeToggle } from './ThemeToggle';
import { MenuHamburger } from './MenuHamburger';
import { ResolvedImage } from './ResolvedImage';

interface HeaderProps {
  appName: string;
  logo: ImageRef;
  navItems: NavItem[];
  activeHash: string;
  onNavigate: (href: string) => void;
  userRole: UserRole;
  onOpenLogin: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  ctaText: string;
}

export function Header({
  appName,
  logo,
  navItems,
  activeHash,
  onNavigate,
  userRole,
  onOpenLogin,
  theme,
  onToggleTheme,
  ctaText,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const visibleItems = navItems.filter((i) => i.isVisible).sort((a, b) => a.order - b.order);

  const handleCtaClick = () => {
    onNavigate('#daftar');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full h-16 bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Wordmark & Logo */}
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('#beranda');
            }}
            className="flex items-center gap-2.5 shrink-0 group"
          >
            {logo?.value ? (
              <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                <ResolvedImage image={logo} alt={appName} className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-sm tracking-tighter">
                GS
              </div>
            )}
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
              {appName || 'Guber Smart'}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium">
            {visibleItems.map((item) => {
              const isActive = activeHash === item.href;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.href);
                  }}
                  className={`transition-colors whitespace-nowrap py-1 ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            {/* Theme Toggle in desktop menu */}
            <div className="pl-1 border-l border-slate-200 dark:border-slate-800">
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            </div>

            {/* Login / Dashboard as the LAST ordinary item */}
            {userRole === 'public' ? (
              <button
                type="button"
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 py-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk</span>
              </button>
            ) : (
              <a
                href="#/admin"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('#/admin');
                }}
                className="flex items-center gap-1.5 py-1 text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 transition-colors whitespace-nowrap"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dasbor</span>
              </a>
            )}
          </nav>
        </div>
      </header>

      {/* Edge Trigger Button for Mobile Sidebar (Ukuran tinggi 120 x 25, di tepi kiri, oranye agak transparan, hanya ikon hamburger) */}
      {!isMobileMenuOpen && (
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="xl:hidden fixed left-0 top-1/2 -translate-y-1/2 z-40 w-[25px] h-[120px] bg-orange-500/80 hover:bg-orange-500/95 dark:bg-orange-500/75 dark:hover:bg-orange-500/90 text-white backdrop-blur-xs rounded-r-xl flex items-center justify-center shadow-lg active:scale-95 transition-all border border-l-0 border-white/20"
          aria-label="Buka Menu"
        >
          <Menu className="w-4 h-4" />
        </button>
      )}

      {/* Mobile Hamburger Drawer */}
      <MenuHamburger
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        activeHash={activeHash}
        onNavigate={onNavigate}
        userRole={userRole}
        onOpenLogin={onOpenLogin}
        theme={theme}
        onToggleTheme={onToggleTheme}
        onCtaClick={handleCtaClick}
        ctaText={ctaText}
      />
    </>
  );
}
