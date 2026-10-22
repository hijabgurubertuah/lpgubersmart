/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { ArrowLeft } from 'lucide-react';
import { StaticPageItem } from '../../types';

interface StaticPageViewProps {
  page?: StaticPageItem;
  onBackToHome: () => void;
}

export function StaticPageView({ page, onBackToHome }: StaticPageViewProps) {
  if (!page) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <button
          type="button"
          onClick={onBackToHome}
          className="h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors"
        >
          Ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#0B1120] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 mb-8 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900 dark:text-white mb-8 tracking-tight">
          {page.title}
        </h1>

        <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed text-base">
          {page.content}
        </div>
      </div>
    </div>
  );
}
