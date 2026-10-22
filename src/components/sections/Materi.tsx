/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState } from 'react';
import { ChevronDown, CheckCircle } from 'lucide-react';
import { ModuleItem } from '../../types';

interface MateriProps {
  modules: ModuleItem[];
}

export function Materi({ modules }: MateriProps) {
  const visibleModules = modules.filter((m) => m.isVisible).sort((a, b) => a.order - b.order);
  const [openId, setOpenId] = useState<string | null>(visibleModules[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="materi" className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-[#0B1120]/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Materi Belajar Praktis
          </h2>
        </div>

        <div className="space-y-3.5">
          {visibleModules.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131C31] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full min-h-[56px] px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-black flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <span>{item.title}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                    <ul className="space-y-2.5 mt-2">
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                          <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
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
