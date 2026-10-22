/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState } from 'react';
import { CmsSettings } from '../../types';
import { ImageField } from '../common/ImageField';

interface AdminMediaProps {
  media: CmsSettings['media'];
  onSave: (media: CmsSettings['media']) => void;
}

export function AdminMedia({ media, onSave }: AdminMediaProps) {
  const [draft, setDraft] = useState(media);
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
          Media dan Video
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

      <div className="p-6 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">
            Tautan Video YouTube
          </label>
          <input
            type="text"
            value={draft.promoVideoUrl}
            onChange={(e) => updateField('promoVideoUrl', e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
          />
        </div>

        <ImageField
          label="Gambar Mockup Hero"
          image={draft.heroMockupImage}
          onChange={(img) => updateField('heroMockupImage', img)}
        />

        <ImageField
          label="Gambar Pratinjau Bagikan (Social Share)"
          image={draft.sharePreviewImage}
          onChange={(img) => updateField('sharePreviewImage', img)}
        />
      </div>
    </div>
  );
}
