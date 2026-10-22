/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import { ImageRef } from '../../types';
import { ResolvedImage } from '../common/ResolvedImage';

interface FooterProps {
  appName: string;
  slogan: string;
  logo: ImageRef;
  copyright: string;
  phone: string;
  email?: string;
  address?: string;
  operatingHours?: string;
  onNavigate: (href: string) => void;
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    facebook?: string;
    linkedin?: string;
  };
}

export function Footer({
  appName,
  slogan,
  logo,
  copyright,
  phone,
  email,
  address,
  operatingHours,
  onNavigate,
  socialLinks,
}: FooterProps) {
  const cleanPhone = phone ? phone.replace(/\D/g, '') : '6285376604024';

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 sm:py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand & Slogan */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              {logo?.value ? (
                <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                  <ResolvedImage image={logo} alt={appName} className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-sm">
                  GS
                </div>
              )}
              <span className="font-display font-bold text-xl text-white">
                {appName || 'Guber Smart'}
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {slogan}
            </p>
          </div>

          {/* Quick Nav & Static Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">
              Tautan
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#/kebijakan-privasi"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/kebijakan-privasi');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a
                  href="#/syarat-dan-ketentuan"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/syarat-dan-ketentuan');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Syarat dan Ketentuan
                </a>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">
              Kontak
            </h4>
            <div className="space-y-2.5 text-sm">
              {phone && (
                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{phone}</span>
                </a>
              )}
              {email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{email}</span>
                </div>
              )}
              {address && (
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{address}</span>
                </div>
              )}
              {operatingHours && (
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{operatingHours}</span>
                </div>
              )}
            </div>

            {/* Social Links if present */}
            {socialLinks && (socialLinks.instagram || socialLinks.youtube || socialLinks.facebook || socialLinks.linkedin) && (
              <div className="flex items-center gap-3 pt-3">
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    IG
                  </a>
                )}
                {socialLinks.youtube && (
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                    aria-label="YouTube"
                  >
                    YT
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{copyright || '© 2026 Guber Smart. Hak Cipta Dilindungi.'}</p>
        </div>
      </div>
    </footer>
  );
}
