/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { ArrowRight, MessageCircle } from 'lucide-react';

interface AjakanPenutupProps {
  title: string;
  subtitle: string;
  ctaText: string;
  whatsappNumber: string;
  whatsappMessage: string;
  onCtaClick: () => void;
}

export function AjakanPenutup({
  title,
  subtitle,
  ctaText,
  whatsappNumber,
  whatsappMessage,
  onCtaClick,
}: AjakanPenutupProps) {
  const handleWhatsapp = () => {
    const cleanNumber = whatsappNumber.replace(/\D/g, '') || '6285376604024';
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-balance">
          {title}
        </h2>

        {subtitle && (
          <p className="text-base sm:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={onCtaClick}
            className="w-full sm:w-auto h-13 px-8 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-xl shadow-orange-500/25 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleWhatsapp}
            className="w-full sm:w-auto h-13 px-8 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-base border border-white/20 backdrop-blur-xs transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
}
