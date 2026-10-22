/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { StepItem } from '../../types';

interface CaraKerjaProps {
  steps: StepItem[];
}

export function CaraKerja({ steps }: CaraKerjaProps) {
  const visibleSteps = steps.filter((s) => s.isVisible).sort((a, b) => a.order - b.order);

  return (
    <section id="cara-kerja" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#0B1120]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Cara Kerja Tiga Langkah
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-indigo-100 dark:bg-slate-800 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {visibleSteps.map((step) => (
              <div
                key={step.id}
                className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-display font-black text-xl flex items-center justify-center shadow-md mb-6 shrink-0">
                  {step.stepNumber}
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
