/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { StaticPageItem } from '../../types';
import { AutoTextarea } from '../common/AutoTextarea';

interface AdminPagesProps {
  pages: StaticPageItem[];
  onSave: (pages: StaticPageItem[]) => void;
}

export function AdminPages({ pages, onSave }: AdminPagesProps) {
  const [draft, setDraft] = useState<StaticPageItem[]>(pages);
  const [hasChanges, setHasChanges] = useState(false);

  const updatePage = (idx: number, updates: Partial<StaticPageItem>) => {
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
          Halaman Statis
        </h3>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setDraft([
                ...draft,
                {
                  id: `page-${Date.now()}`,
                  slug: `halaman-baru-${Date.now()}`,
                  title: 'Judul Halaman',
                  content: 'Isi halaman statis.',
                  order: draft.length + 1,
                  isVisible: true,
                },
              ]);
              setHasChanges(true);
            }}
            className="h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Halaman</span>
          </button>
          <button
            type="button"
            disabled={!hasChanges}
            onClick={handleSave}
            className="h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors disabled:opacity-40"
          >
            Simpan
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {draft.map((page, idx) => (
          <div
            key={page.id}
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">Judul Halaman</label>
                  <input
                    type="text"
                    value={page.title}
                    onChange={(e) => updatePage(idx, { title: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">Alamat Tautan (Slug)</label>
                  <input
                    type="text"
                    value={page.slug}
                    onChange={(e) => updatePage(idx, { slug: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setDraft(draft.filter((_, i) => i !== idx));
                  setHasChanges(true);
                }}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg self-end sm:self-center"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">Isi Konten</label>
              <AutoTextarea
                value={page.content}
                onValueChange={(val) => updatePage(idx, { content: val })}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
