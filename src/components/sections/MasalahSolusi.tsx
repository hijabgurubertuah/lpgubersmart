/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { ArrowRight } from 'lucide-react';
import { ProblemItem } from '../../types';

interface MasalahSolusiProps {
  problems: ProblemItem[];
  solutionText: string;
  onCtaClick: () => void;
  ctaText: string;
}

export function MasalahSolusi({
  problems,
  solutionText,
  onCtaClick,
  ctaText,
}: MasalahSolusiProps) {
  const visibleProblems = problems.filter((p) => p.isVisible).sort((a, b) => a.order - b.order);

  return (
    <section id="masalah" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#0B1120]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Tantangan dalam Mewujudkan Aplikasi
          </h2>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {visibleProblems.map((prob) => (
            <div
              key={prob.id}
              className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 transition-all hover:border-slate-300 dark:hover:border-slate-700"
            >
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-snug">
                {prob.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Solution Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white leading-snug">
              {solutionText}
            </p>
          </div>
          <button
            type="button"
            onClick={onCtaClick}
            className="h-12 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base whitespace-nowrap shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 shrink-0 w-full md:w-auto"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
