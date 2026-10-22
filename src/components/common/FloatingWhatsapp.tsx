/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { MessageCircle } from 'lucide-react';

interface FloatingWhatsappProps {
  whatsappNumber: string;
  defaultMessage: string;
  showFeature: boolean;
  hasMobileCtaBar: boolean;
}

export function FloatingWhatsapp({
  whatsappNumber,
  defaultMessage,
  showFeature,
  hasMobileCtaBar,
}: FloatingWhatsappProps) {
  if (!showFeature) return null;

  const cleanNumber = whatsappNumber.replace(/\D/g, '') || '6285376604024';
  const encodedMsg = encodeURIComponent(defaultMessage);
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodedMsg}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed right-4 md:right-6 z-30 w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${
        hasMobileCtaBar ? 'bottom-20 md:bottom-6' : 'bottom-6'
      }`}
      aria-label="Chat WhatsApp"
      title="Chat WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-white stroke-none" />
    </a>
  );
}
