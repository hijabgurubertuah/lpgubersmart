/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { BenefitItem } from '../../types';

interface ManfaatProps {
  benefits: BenefitItem[];
}

export function Manfaat({ benefits }: ManfaatProps) {
  const visibleBenefits = benefits.filter((b) => b.isVisible).sort((a, b) => a.order - b.order);

  return (
    <section id="manfaat" className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-[#0B1120]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Keunggulan Belajar di Guber Smart
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleBenefits.map((b) => (
            <div
              key={b.id}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 transition-all hover:border-indigo-500/40 hover:shadow-md"
            >
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">
                {b.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
