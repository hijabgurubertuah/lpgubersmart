/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState } from 'react';
import { CmsSettings } from '../../types';
import { ImageField } from '../common/ImageField';

interface AdminSeoTrackersProps {
  seoTrackers: CmsSettings['seoTrackers'];
  onSave: (seoTrackers: CmsSettings['seoTrackers']) => void;
}

export function AdminSeoTrackers({ seoTrackers, onSave }: AdminSeoTrackersProps) {
  const [draft, setDraft] = useState(seoTrackers);
  const [hasChanges, setHasChanges] = useState(false);

  const updateField = (key: keyof typeof draft, val: unknown) => {
    setDraft({ ...draft, [key]: val });
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(draft);
    setHasChanges(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
          SEO dan Pelacak
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

      <div className="p-6 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">
            Meta Title
          </label>
          <input
            type="text"
            value={draft.metaTitle}
            onChange={(e) => updateField('metaTitle', e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">
            Meta Description
          </label>
          <textarea
            value={draft.metaDescription}
            onChange={(e) => updateField('metaDescription', e.target.value)}
            rows={2}
            className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-medium resize-none"
          />
        </div>

        <ImageField
          label="Gambar Berbagi Sosial"
          image={draft.shareImage}
          onChange={(img) => updateField('shareImage', img)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">
              ID Meta Pixel
            </label>
            <input
              type="text"
              value={draft.metaPixelId || ''}
              onChange={(e) => updateField('metaPixelId', e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">
              ID Google Analytics (G-XXXXX)
            </label>
            <input
              type="text"
              value={draft.googleAnalyticsId || ''}
              onChange={(e) => updateField('googleAnalyticsId', e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
