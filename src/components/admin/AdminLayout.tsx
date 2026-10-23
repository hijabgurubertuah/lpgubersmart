/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Layers,
  ListFilter,
  DollarSign,
  Clock,
  FileText,
  Phone,
  Eye,
  KeyRound,
  LogOut,
  Sparkles,
  Palette,
  Navigation,
  MousePointerClick,
  Sliders,
  Image,
  Globe,
  History,
  RefreshCw,
  Menu,
  X,
  ArrowLeft,
} from 'lucide-react';
import { UserRole } from '../../types';
import { ThemeToggle } from '../common/ThemeToggle';

export type AdminTab =
  | 'dasbor'
  | 'pendaftar'
  | 'sections'
  | 'content'
  | 'packages'
  | 'urgency'
  | 'pages'
  | 'footerContact'
  | 'password'
  | 'identity'
  | 'theme'
  | 'navigation'
  | 'buttons'
  | 'features'
  | 'media'
  | 'seoTrackers'
  | 'logs'
  | 'sync';

interface AdminLayoutProps {
  currentRole: UserRole;
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onLogout: () => void;
  onPreviewSite: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  children: React.ReactNode;
}

export function AdminLayout({
  currentRole,
  activeTab,
  onTabChange,
  onLogout,
  onPreviewSite,
  theme,
  onToggleTheme,
  children,
}: AdminLayoutProps) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileDrawerOpen]);

  // Define tab navigation based on role
  interface NavEntry {
    id: AdminTab;
    label: string;
    icon: React.ElementType;
    superadminOnly?: boolean;
  }

  const allNavs: NavEntry[] = [
    { id: 'dasbor', label: 'Dasbor', icon: LayoutDashboard },
    { id: 'pendaftar', label: 'Pendaftar', icon: Users },
    { id: 'sections', label: 'Bagian Halaman', icon: Layers },
    { id: 'content', label: 'Konten Daftar', icon: ListFilter },
    { id: 'packages', label: 'Paket dan Harga', icon: DollarSign },
    { id: 'urgency', label: 'Hitung Mundur dan Kuota', icon: Clock },
    { id: 'pages', label: 'Halaman', icon: FileText },
    { id: 'footerContact', label: 'Footer dan Kontak', icon: Phone },
    // Superadmin specific
    { id: 'identity', label: 'Identitas', icon: Sparkles, superadminOnly: true },
    { id: 'theme', label: 'Tema', icon: Palette, superadminOnly: true },
    { id: 'navigation', label: 'Navigasi', icon: Navigation, superadminOnly: true },
    { id: 'buttons', label: 'Tombol', icon: MousePointerClick, superadminOnly: true },
    { id: 'features', label: 'Fitur', icon: Sliders, superadminOnly: true },
    { id: 'media', label: 'Media', icon: Image, superadminOnly: true },
    { id: 'seoTrackers', label: 'SEO dan Pelacak', icon: Globe, superadminOnly: true },
    { id: 'logs', label: 'Log Aktivitas', icon: History, superadminOnly: true },
    { id: 'sync', label: 'Sinkronisasi', icon: RefreshCw, superadminOnly: true },
    // General
    { id: 'password', label: 'Kata Sandi', icon: KeyRound },
  ];

  const visibleNavs = allNavs.filter((n) => {
    if (n.superadminOnly && currentRole !== 'superadmin') return false;
    return true;
  });

  const activeTitle = visibleNavs.find((n) => n.id === activeTab)?.label || 'Panel';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] flex">
      {/* Desktop Sidebar (hidden on < 1024px) */}
      <aside className="hidden lg:flex w-64 flex-col bg-white dark:bg-[#131C31] border-r border-slate-200/80 dark:border-slate-800 shrink-0">
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
              GS
            </div>
            <span className="font-display font-bold text-base text-slate-900 dark:text-white">
              Guber Smart
            </span>
          </div>
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
              currentRole === 'superadmin'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
                : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
            }`}
          >
            {currentRole}
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {visibleNavs.map((n) => {
            const Icon = n.icon;
            const isActive = activeTab === n.id;
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => onTabChange(n.id)}
                className={`w-full h-11 px-3.5 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{n.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200/80 dark:border-slate-800 space-y-2">
          <button
            type="button"
            onClick={onPreviewSite}
            className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            <span>Pratinjau Landing Page</span>
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="w-full h-10 px-3 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 px-4 sm:px-6 bg-white dark:bg-[#131C31] border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white truncate">
              {activeTitle}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPreviewSite}
              className="hidden sm:flex h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 items-center gap-1.5 hover:bg-slate-50"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ke Landing Page</span>
            </button>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Edge Trigger Button for Admin Mobile Sidebar (Tinggi 120 x 25, di tepi kiri, oranye agak transparan, hanya ikon hamburger) */}
      {!isMobileDrawerOpen && (
        <button
          type="button"
          onClick={() => setIsMobileDrawerOpen(true)}
          className="lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-40 w-[25px] h-[120px] bg-orange-500/80 hover:bg-orange-500/95 dark:bg-orange-500/75 dark:hover:bg-orange-500/90 text-white backdrop-blur-xs rounded-r-xl flex items-center justify-center shadow-lg active:scale-95 transition-all border border-l-0 border-white/20"
          aria-label="Buka Menu Admin"
        >
          <Menu className="w-4 h-4" />
        </button>
      )}

      {/* Mobile Sidebar Drawer */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileDrawerOpen(false)}
          />
          <div className="relative w-[85%] max-w-xs h-full bg-white dark:bg-[#131C31] shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            <div className="h-16 px-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="font-display font-bold text-base text-slate-900 dark:text-white">
                Menu Panel
              </span>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {visibleNavs.map((n) => {
                const Icon = n.icon;
                const isActive = activeTab === n.id;
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => {
                      onTabChange(n.id);
                      setIsMobileDrawerOpen(false);
                    }}
                    className={`w-full h-11 px-3.5 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{n.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2 safe-pb">
              <button
                type="button"
                onClick={() => {
                  setIsMobileDrawerOpen(false);
                  onPreviewSite();
                }}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>Pratinjau Landing Page</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileDrawerOpen(false);
                  onLogout();
                }}
                className="w-full h-10 px-3 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
