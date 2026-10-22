/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useEffect, useState } from 'react';

interface MobileCtaBarProps {
  buttonText: string;
  onCtaClick: () => void;
  showFeature: boolean;
}

export function MobileCtaBar({ buttonText, onCtaClick, showFeature }: MobileCtaBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!showFeature) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      const heroEl = document.getElementById('beranda');
      const formEl = document.getElementById('daftar');

      if (!heroEl) {
        setIsVisible(true);
        return;
      }

      const heroRect = heroEl.getBoundingClientRect();
      const pastHero = heroRect.bottom < 100;

      let formInView = false;
      if (formEl) {
        const formRect = formEl.getBoundingClientRect();
        formInView = formRect.top < window.innerHeight && formRect.bottom > 100;
      }

      setIsVisible(pastHero && !formInView);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showFeature]);

  if (!showFeature || !isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 safe-pb shadow-lg">
      <button
        type="button"
        onClick={onCtaClick}
        className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base flex items-center justify-center shadow-md active:scale-98 transition-all"
      >
        {buttonText}
      </button>
    </div>
  );
}
