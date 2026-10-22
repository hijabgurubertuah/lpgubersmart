/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState } from 'react';
import { CmsSettings } from '../../types';

interface AdminThemeProps {
  theme: CmsSettings['theme'];
  onSave: (theme: CmsSettings['theme']) => void;
}

export function AdminTheme({ theme, onSave }: AdminThemeProps) {
  const [draft, setDraft] = useState(theme);
  const [hasChanges, setHasChanges] = useState(false);

  const updateField = (key: keyof typeof draft, val: unknown) => {
    setDraft({ ...draft, [key]: val });
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(draft);
    setHasChanges(false);
  };

  const fonts = ['Plus Jakarta Sans', 'Inter', 'Outfit', 'DM Sans', 'Manrope'];

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
          Tema dan Gaya
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

      <div className="p-6 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1.5">Warna Utama</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={draft.primaryColor}
                onChange={(e) => updateField('primaryColor', e.target.value)}
                className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
              />
              <input
                type="text"
                value={draft.primaryColor}
                onChange={(e) => updateField('primaryColor', e.target.value)}
                className="flex-1 h-10 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-xs font-semibold uppercase"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1.5">Warna Sekunder</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={draft.secondaryColor}
                onChange={(e) => updateField('secondaryColor', e.target.value)}
                className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
              />
              <input
                type="text"
                value={draft.secondaryColor}
                onChange={(e) => updateField('secondaryColor', e.target.value)}
                className="flex-1 h-10 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-xs font-semibold uppercase"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1.5">Warna Aksen (Tombol)</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={draft.accentColor}
                onChange={(e) => updateField('accentColor', e.target.value)}
                className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
              />
              <input
                type="text"
                value={draft.accentColor}
                onChange={(e) => updateField('accentColor', e.target.value)}
                className="flex-1 h-10 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-xs font-semibold uppercase"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1.5">Jenis Huruf</label>
            <select
              value={draft.fontFamily}
              onChange={(e) => updateField('fontFamily', e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
            >
              {fonts.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1.5">Sudut Membulat</label>
            <select
              value={draft.borderRadius}
              onChange={(e) => updateField('borderRadius', e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
            >
              <option value="8px">8px (Kecil)</option>
              <option value="12px">12px (Sedang)</option>
              <option value="16px">16px (Besar)</option>
              <option value="24px">24px (Ekstra)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
