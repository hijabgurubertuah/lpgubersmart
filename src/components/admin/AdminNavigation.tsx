/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState } from 'react';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { NavItem } from '../../types';

interface AdminNavigationProps {
  navigation: NavItem[];
  onSave: (navigation: NavItem[]) => void;
}

export function AdminNavigation({ navigation, onSave }: AdminNavigationProps) {
  const [draft, setDraft] = useState<NavItem[]>(navigation);
  const [hasChanges, setHasChanges] = useState(false);

  const updateItem = (idx: number, updates: Partial<NavItem>) => {
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
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
          Navigasi Menu
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setDraft([
                ...draft,
                {
                  id: `nav-${Date.now()}`,
                  label: 'Menu Baru',
                  href: '#',
                  isVisible: true,
                  order: draft.length + 1,
                },
              ]);
              setHasChanges(true);
            }}
            className="h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah</span>
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

      <div className="space-y-3">
        {draft.map((item, idx) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-3"
          >
            <input
              type="text"
              value={item.label}
              onChange={(e) => updateItem(idx, { label: e.target.value })}
              className="w-36 sm:w-44 h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
            />
            <input
              type="text"
              value={item.href}
              onChange={(e) => updateItem(idx, { href: e.target.value })}
              className="flex-1 h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-xs font-mono"
            />
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => updateItem(idx, { isVisible: !item.isVisible })}
                className="p-1.5 text-slate-500 hover:text-slate-900"
              >
                {item.isVisible ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setDraft(draft.filter((_, i) => i !== idx));
                  setHasChanges(true);
                }}
                className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
