/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { Check, Gift, Shield } from 'lucide-react';
import { PackageItem, BonusItem } from '../../types';

interface PaketProps {
  packages: PackageItem[];
  bonuses: BonusItem[];
  guaranteeText: string;
  onSelectPackage: (pkg: PackageItem) => void;
  showBonus: boolean;
}

export function Paket({
  packages,
  bonuses,
  guaranteeText,
  onSelectPackage,
  showBonus,
}: PaketProps) {
  const activePackages = packages.filter((p) => p.isActive).sort((a, b) => a.order - b.order);
  const visibleBonuses = bonuses.filter((b) => b.isVisible).sort((a, b) => a.order - b.order);

  return (
    <section id="paket" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#0B1120]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Pilihan Paket Belajar
          </h2>
        </div>

        {/* 3 Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {activePackages.map((pkg) => {
            const isFeatured = pkg.isFeatured;
            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-7 sm:p-9 flex flex-col justify-between transition-all ${
                  isFeatured
                    ? 'bg-slate-900 text-white shadow-2xl ring-2 ring-indigo-500 scale-102 lg:-translate-y-2'
                    : 'bg-slate-50 dark:bg-[#131C31] text-slate-900 dark:text-white border border-slate-200/80 dark:border-slate-800'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-orange-500 text-white text-xs font-bold tracking-wide uppercase shadow-md">
                    Paling Diminati
                  </div>
                )}

                <div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl mb-2">
                    {pkg.name}
                  </h3>

                  {/* Pricing */}
                  <div className="my-5">
                    <span className="text-xs sm:text-sm line-through text-slate-400 dark:text-slate-500 block mb-1">
                      {pkg.strikePrice}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display font-black text-3xl sm:text-4xl tracking-tight">
                        {pkg.price}
                      </span>
                    </div>
                  </div>

                  <div className={`h-px w-full my-6 ${isFeatured ? 'bg-slate-800' : 'bg-slate-200 dark:bg-slate-800'}`} />

                  {/* Feature list */}
                  <ul className="space-y-3.5 mb-8">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm sm:text-base">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isFeatured
                              ? 'bg-indigo-500/30 text-indigo-400'
                              : 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className={isFeatured ? 'text-slate-200' : 'text-slate-700 dark:text-slate-300'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full h-12 rounded-xl font-bold text-base transition-all active:scale-98 flex items-center justify-center ${
                    isFeatured
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  }`}
                >
                  {pkg.buttonText || 'Pilih Paket'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Bonuses and Guarantee */}
        {showBonus && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-indigo-50/60 dark:bg-[#131C31] border border-indigo-100 dark:border-indigo-900/40">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <Gift className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                  Bonus Eksklusif
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {visibleBonuses.map((bonus) => (
                  <div key={bonus.id} className="p-4 rounded-2xl bg-white dark:bg-[#0B1120] border border-slate-200/60 dark:border-slate-800">
                    <h4 className="font-display font-bold text-base text-slate-900 dark:text-white mb-1">
                      {bonus.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {bonus.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {guaranteeText && (
              <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/40 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-emerald-950 dark:text-emerald-200">
                    {guaranteeText}
                  </h4>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
