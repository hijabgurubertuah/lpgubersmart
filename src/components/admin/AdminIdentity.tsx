/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState } from 'react';
import { CmsSettings } from '../../types';
import { ImageField } from '../common/ImageField';

interface AdminIdentityProps {
  identity: CmsSettings['identity'];
  onSave: (identity: CmsSettings['identity']) => void;
}

export function AdminIdentity({ identity, onSave }: AdminIdentityProps) {
  const [draft, setDraft] = useState(identity);
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
          Identitas Aplikasi
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
          <label className="text-xs font-semibold text-slate-500 block mb-1">Nama Aplikasi *</label>
          <input
            type="text"
            value={draft.appName}
            onChange={(e) => updateField('appName', e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Slogan</label>
          <input
            type="text"
            value={draft.slogan}
            onChange={(e) => updateField('slogan', e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
          />
        </div>

        <ImageField
          label="Logo Aplikasi"
          image={draft.logo}
          onChange={(img) => updateField('logo', img)}
        />

        <ImageField
          label="Favicon"
          image={draft.favicon}
          onChange={(img) => updateField('favicon', img)}
        />

        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Judul Halaman (Browser Title)</label>
          <input
            type="text"
            value={draft.pageTitle}
            onChange={(e) => updateField('pageTitle', e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Deskripsi Halaman</label>
          <textarea
            value={draft.pageDescription}
            onChange={(e) => updateField('pageDescription', e.target.value)}
            rows={2}
            className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-medium resize-none"
          />
        </div>
      </div>
    </div>
  );
}
