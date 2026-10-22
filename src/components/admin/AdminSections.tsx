/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { SectionConfig } from '../../types';

interface AdminSectionsProps {
  sections: Record<string, SectionConfig>;
  onSave: (sections: Record<string, SectionConfig>) => void;
}

export function AdminSections({ sections, onSave }: AdminSectionsProps) {
  const [draft, setDraft] = useState<Record<string, SectionConfig>>(sections);
  const [hasChanges, setHasChanges] = useState(false);

  const updateSection = (id: string, updates: Partial<SectionConfig>) => {
    const updated = {
      ...draft,
      [id]: {
        ...draft[id],
        ...updates,
      },
    };
    setDraft(updated);
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(draft);
    setHasChanges(false);
  };

  const sectionKeys = Object.keys(draft);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
          Bagian Halaman
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

      <div className="space-y-3">
        {sectionKeys.map((key) => {
          const sec = draft[key];
          return (
            <div
              key={key}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 flex-1">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  {key}
                </span>
                <input
                  type="text"
                  value={sec.title}
                  onChange={(e) => updateSection(key, { title: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => updateSection(key, { isVisible: !sec.isVisible })}
                  className={`h-9 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    sec.isVisible
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {sec.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{sec.isVisible ? 'Tampil' : 'Sembunyi'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
