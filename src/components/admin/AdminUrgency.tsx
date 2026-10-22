/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState } from 'react';
import { UrgencySettings } from '../../types';

interface AdminUrgencyProps {
  urgency: UrgencySettings;
  onSave: (urgency: UrgencySettings) => void;
}

export function AdminUrgency({ urgency, onSave }: AdminUrgencyProps) {
  // Format to YYYY-MM-DDThh:mm for datetime-local input
  const formatForInput = (iso: string) => {
    try {
      const d = new Date(iso);
      const pad = (n: number) => String(n).padStart(2, '0');
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    } catch {
      return '';
    }
  };

  const [deadline, setDeadline] = useState(formatForInput(urgency.deadlineDate));
  const [totalSeats, setTotalSeats] = useState(urgency.totalSeats);
  const [remainingSeats, setRemainingSeats] = useState(urgency.remainingSeats);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = () => {
    onSave({
      deadlineDate: new Date(deadline).toISOString(),
      totalSeats: Number(totalSeats),
      remainingSeats: Number(remainingSeats),
    });
    setHasChanges(false);
  };

  return (
    <div className="space-y-6 max-w-xl">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
          Hitung Mundur dan Kuota
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
        <div>
          <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 block mb-1.5">
            Batas Tanggal & Jam
          </label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => {
              setDeadline(e.target.value);
              setHasChanges(true);
            }}
            className="w-full h-11 px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold text-slate-900 dark:text-white focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 block mb-1.5">
              Total Kursi
            </label>
            <input
              type="number"
              value={totalSeats}
              onChange={(e) => {
                setTotalSeats(Number(e.target.value));
                setHasChanges(true);
              }}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 block mb-1.5">
              Sisa Kursi
            </label>
            <input
              type="number"
              value={remainingSeats}
              onChange={(e) => {
                setRemainingSeats(Number(e.target.value));
                setHasChanges(true);
              }}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold text-slate-900 dark:text-white focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
