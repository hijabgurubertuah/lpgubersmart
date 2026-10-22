/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { PackageItem } from '../../types';

interface AdminPackagesProps {
  packages: PackageItem[];
  onSave: (packages: PackageItem[]) => void;
}

export function AdminPackages({ packages, onSave }: AdminPackagesProps) {
  const [draft, setDraft] = useState<PackageItem[]>(packages);
  const [hasChanges, setHasChanges] = useState(false);

  const updatePackage = (idx: number, updates: Partial<PackageItem>) => {
    const updated = [...draft];
    updated[idx] = { ...updated[idx], ...updates };
    setDraft(updated);
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(draft);
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
          Paket dan Harga
        </h3>
        <button
          type="button"
          disabled={!hasChanges}
          onClick={handleSave}
          className="h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors disabled:opacity-40"
        >
          Simpan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {draft.map((pkg, idx) => (
          <div
            key={pkg.id}
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Paket 0{idx + 1}
              </span>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={pkg.isActive}
                  onChange={(e) => updatePackage(idx, { isActive: e.target.checked })}
                  className="rounded"
                />
                <span>Aktif</span>
              </label>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">Nama Paket</label>
              <input
                type="text"
                value={pkg.name}
                onChange={(e) => updatePackage(idx, { name: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Harga</label>
                <input
                  type="text"
                  value={pkg.price}
                  onChange={(e) => updatePackage(idx, { price: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Harga Coret</label>
                <input
                  type="text"
                  value={pkg.strikePrice}
                  onChange={(e) => updatePackage(idx, { strikePrice: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={pkg.isFeatured}
                  onChange={(e) => updatePackage(idx, { isFeatured: e.target.checked })}
                  className="rounded"
                />
                <span>Paling Diminati</span>
              </label>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">Teks Tombol</label>
              <input
                type="text"
                value={pkg.buttonText}
                onChange={(e) => updatePackage(idx, { buttonText: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
              />
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Keunggulan</label>
                <button
                  type="button"
                  onClick={() => {
                    const feats = [...pkg.features, 'Keunggulan baru'];
                    updatePackage(idx, { features: feats });
                  }}
                  className="p-1 text-indigo-600 hover:text-indigo-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1.5">
                {pkg.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={feat}
                      onChange={(e) => {
                        const feats = [...pkg.features];
                        feats[fIdx] = e.target.value;
                        updatePackage(idx, { features: feats });
                      }}
                      className="flex-1 h-8 px-2.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const feats = pkg.features.filter((_, i) => i !== fIdx);
                        updatePackage(idx, { features: feats });
                      }}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
