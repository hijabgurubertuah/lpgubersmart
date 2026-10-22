/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FaqItem } from '../../types';

interface FaqProps {
  faqs: FaqItem[];
}

export function Faq({ faqs }: FaqProps) {
  const visibleFaqs = faqs.filter((f) => f.isVisible).sort((a, b) => a.order - b.order);
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-[#0B1120]/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Pertanyaan Umum
          </h2>
        </div>

        <div className="space-y-3.5">
          {visibleFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131C31] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full min-h-[56px] px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
