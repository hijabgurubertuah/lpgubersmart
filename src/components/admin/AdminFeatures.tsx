/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState } from 'react';
import { CmsSettings } from '../../types';

interface AdminFeaturesProps {
  features: CmsSettings['features'];
  onSave: (features: CmsSettings['features']) => void;
}

export function AdminFeatures({ features, onSave }: AdminFeaturesProps) {
  const [draft, setDraft] = useState(features);
  const [hasChanges, setHasChanges] = useState(false);

  const toggleFeature = (key: keyof typeof draft) => {
    setDraft({ ...draft, [key]: !draft[key] });
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(draft);
    setHasChanges(false);
  };

  const featureList: { key: keyof typeof draft; label: string }[] = [
    { key: 'showCountdown', label: 'Hitung Mundur Waktu' },
    { key: 'showQuota', label: 'Bilah Sisa Kuota' },
    { key: 'showMobileCtaBar', label: 'Bilah Ajakan Tetap HP' },
    { key: 'showFloatingWhatsapp', label: 'Tombol WhatsApp Melayang' },
    { key: 'showPromoVideo', label: 'Video Promosi' },
    { key: 'showTestimonials', label: 'Testimoni Peserta' },
    { key: 'showPortfolio', label: 'Galeri Karya' },
    { key: 'showBonus', label: 'Bonus & Garansi' },
    { key: 'showRegForm', label: 'Formulir Pendaftaran' },
    { key: 'enableScrollAnimation', label: 'Animasi Gulir' },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
          Fitur Landing Page
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

      <div className="p-6 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800">
        {featureList.map((f) => (
          <div key={f.key} className="py-3.5 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {f.label}
            </span>
            <button
              type="button"
              onClick={() => toggleFeature(f.key)}
              className={`w-12 h-6.5 rounded-full transition-colors relative flex items-center px-0.5 ${
                draft[f.key] ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5.5 h-5.5 rounded-full bg-white shadow-xs transition-transform ${
                  draft[f.key] ? 'translate-x-5.5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
