/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useEffect } from 'react';
import { X, LogIn, LayoutDashboard } from 'lucide-react';
import { NavItem, UserRole } from '../../types';

interface MenuHamburgerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  activeHash: string;
  onNavigate: (href: string) => void;
  userRole: UserRole;
  onOpenLogin: () => void;
  onCtaClick: () => void;
  ctaText: string;
}

export function MenuHamburger({
  isOpen,
  onClose,
  navItems,
  activeHash,
  onNavigate,
  userRole,
  onOpenLogin,
  onCtaClick,
  ctaText,
}: MenuHamburgerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const visibleItems = navItems.filter((i) => i.isVisible).sort((a, b) => a.order - b.order);

  return (
    <div className="fixed inset-0 z-50 flex justify-start">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-[85%] max-w-sm h-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Header inside drawer */}
        <div className="h-16 px-5 border-b border-slate-200 flex items-center justify-between shrink-0">
          <span className="font-display font-bold text-lg text-slate-900">
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 transition-colors"
            aria-label="Tutup Menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable menu items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {visibleItems.map((item) => {
            const isActive = activeHash === item.href;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.href);
                  onClose();
                }}
                className={`w-full h-12 flex items-center px-4 rounded-xl text-base font-semibold text-left transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* Login / Dashboard as the LAST menu item */}
          <div className="pt-2">
            {userRole === 'public' ? (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenLogin();
                }}
                className="w-full h-12 flex items-center gap-3 px-4 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <LogIn className="w-5 h-5 text-indigo-600" />
                <span>Masuk</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigate('#/admin');
                }}
                className="w-full h-12 flex items-center gap-3 px-4 rounded-xl text-base font-semibold text-indigo-600 bg-indigo-50 transition-colors"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dasbor</span>
              </button>
            )}
          </div>
        </div>

        {/* Action button at bottom */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 shrink-0 safe-pb">
          <button
            type="button"
            onClick={() => {
              onClose();
              onCtaClick();
            }}
            className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base flex items-center justify-center shadow-md active:scale-98 transition-all"
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}

