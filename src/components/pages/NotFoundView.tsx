/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

interface NotFoundViewProps {
  onBackToHome: () => void;
}

export function NotFoundView({ onBackToHome }: NotFoundViewProps) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center bg-white dark:bg-[#0B1120]">
      <span className="font-display font-black text-7xl sm:text-8xl text-indigo-600 dark:text-indigo-500 mb-4 tracking-tight">
        404
      </span>
      <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-2">
        Halaman Tidak Ditemukan
      </h1>
      <div className="pt-6">
        <button
          type="button"
          onClick={onBackToHome}
          className="h-12 px-7 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base transition-colors"
        >
          Ke Beranda
        </button>
      </div>
    </div>
  );
}
