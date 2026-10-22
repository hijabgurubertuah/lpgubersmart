/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState } from 'react';
import { ActivityLogItem } from '../../types';

interface AdminActivityLogsProps {
  logs: ActivityLogItem[];
}

export function AdminActivityLogs({ logs }: AdminActivityLogsProps) {
  const [roleFilter, setRoleFilter] = useState<'semua' | 'admin' | 'superadmin'>('semua');

  const filtered = logs.filter((log) => {
    if (roleFilter === 'semua') return true;
    return log.role === roleFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
          Log Aktivitas
        </h3>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-500">Peran:</label>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as 'semua' | 'admin' | 'superadmin')}
            className="h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-xs font-semibold"
          >
            <option value="semua">Semua</option>
            <option value="superadmin">Superadmin</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-sm font-semibold text-slate-400">
            Belum ada data
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((log) => (
              <div key={log.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        log.role === 'superadmin'
                          ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
                          : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                      }`}
                    >
                      {log.role}
                    </span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {log.action}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {log.details}
                  </p>
                </div>
                <span className="text-xs text-slate-400 shrink-0 tabular-nums">
                  {new Date(log.timestamp).toLocaleString('id-ID')}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
