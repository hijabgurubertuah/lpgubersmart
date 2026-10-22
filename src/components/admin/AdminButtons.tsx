/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState } from 'react';
import { CmsSettings } from '../../types';
import { AutoTextarea } from '../common/AutoTextarea';

interface AdminButtonsProps {
  buttons: CmsSettings['buttons'];
  onSave: (buttons: CmsSettings['buttons']) => void;
}

export function AdminButtons({ buttons, onSave }: AdminButtonsProps) {
  const [draft, setDraft] = useState(buttons);
  const [hasChanges, setHasChanges] = useState(false);

  const updateField = (key: keyof typeof draft, val: string) => {
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
          Tombol dan WhatsApp
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
          <label className="text-xs font-semibold text-slate-500 block mb-1">Teks Tombol Hero</label>
          <input
            type="text"
            value={draft.ctaHeroText}
            onChange={(e) => updateField('ctaHeroText', e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Teks Tombol Cara Kerja</label>
          <input
            type="text"
            value={draft.ctaWorkText}
            onChange={(e) => updateField('ctaWorkText', e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Teks Tombol Ajakan Melayang HP</label>
          <input
            type="text"
            value={draft.ctaFloatingText}
            onChange={(e) => updateField('ctaFloatingText', e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Teks Tombol Kirim Formulir</label>
          <input
            type="text"
            value={draft.ctaFormText}
            onChange={(e) => updateField('ctaFormText', e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Teks Tombol Ajakan Penutup</label>
          <input
            type="text"
            value={draft.ctaClosingText}
            onChange={(e) => updateField('ctaClosingText', e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
          />
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <label className="text-xs font-semibold text-slate-500 block mb-1">Nomor WhatsApp Tujuan</label>
          <input
            type="text"
            value={draft.whatsappNumber}
            onChange={(e) => updateField('whatsappNumber', e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Templat Pesan Konsultasi Umum</label>
          <AutoTextarea
            value={draft.whatsappGeneralMessage}
            onValueChange={(val) => updateField('whatsappGeneralMessage', val)}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Templat Pesan Setelah Pendaftaran</label>
          <AutoTextarea
            value={draft.whatsappPostRegistrationMessage}
            onValueChange={(val) => updateField('whatsappPostRegistrationMessage', val)}
          />
        </div>
      </div>
    </div>
  );
}
