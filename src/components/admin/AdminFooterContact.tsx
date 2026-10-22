/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState } from 'react';
import { CmsSettings } from '../../types';

interface AdminFooterContactProps {
  footerContact: CmsSettings['footerContact'];
  onSave: (footerContact: CmsSettings['footerContact']) => void;
}

export function AdminFooterContact({ footerContact, onSave }: AdminFooterContactProps) {
  const [draft, setDraft] = useState(footerContact);
  const [hasChanges, setHasChanges] = useState(false);

  const updateField = (key: keyof typeof draft, val: unknown) => {
    setDraft({ ...draft, [key]: val });
    setHasChanges(true);
  };

  const updateSocial = (network: string, val: string) => {
    setDraft({
      ...draft,
      socialLinks: {
        ...draft.socialLinks,
        [network]: val,
      },
    });
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
          Footer dan Kontak
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
          <label className="text-xs font-semibold text-slate-500 block mb-1">Nomor WhatsApp / Telepon</label>
          <input
            type="text"
            value={draft.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Email</label>
          <input
            type="email"
            value={draft.email || ''}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Alamat</label>
          <input
            type="text"
            value={draft.address || ''}
            onChange={(e) => updateField('address', e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Jam Layanan</label>
          <input
            type="text"
            value={draft.operatingHours || ''}
            onChange={(e) => updateField('operatingHours', e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Teks Hak Cipta</label>
          <input
            type="text"
            value={draft.copyright}
            onChange={(e) => updateField('copyright', e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
          />
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            Media Sosial
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-500 block mb-1">Instagram URL</label>
              <input
                type="text"
                value={draft.socialLinks?.instagram || ''}
                onChange={(e) => updateSocial('instagram', e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-xs font-medium"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1">YouTube URL</label>
              <input
                type="text"
                value={draft.socialLinks?.youtube || ''}
                onChange={(e) => updateSocial('youtube', e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-xs font-medium"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
