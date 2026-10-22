/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { Users, Calendar, Clock, AlertCircle } from 'lucide-react';
import { ApplicantItem, PackageItem } from '../../types';

interface AdminDashboardProps {
  applicants: ApplicantItem[];
  packages: PackageItem[];
  onNavigateToApplicants: () => void;
}

export function AdminDashboard({
  applicants,
  packages,
  onNavigateToApplicants,
}: AdminDashboardProps) {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const thisMonthStr = now.toISOString().slice(0, 7);

  const total = applicants.length;
  const todayCount = applicants.filter((a) => a.createdAt.startsWith(todayStr)).length;
  const monthCount = applicants.filter((a) => a.createdAt.startsWith(thisMonthStr)).length;
  const newCount = applicants.filter((a) => a.status === 'Baru').length;

  // 30 days registration trend
  const last30Days: { date: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().slice(0, 10);
    const count = applicants.filter((a) => a.createdAt.startsWith(dateStr)).length;
    last30Days.push({ date: dateStr.slice(5), count });
  }

  const maxTrend = Math.max(1, ...last30Days.map((d) => d.count));

  // Package distribution
  const packageCounts = packages.map((pkg) => {
    const count = applicants.filter((a) => a.packageId === pkg.id || a.packageName === pkg.name).length;
    return { name: pkg.name, count };
  });
  const maxPkgCount = Math.max(1, ...packageCounts.map((p) => p.count));

  // 5 latest applicants
  const latestApplicants = [...applicants]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
              Total Pendaftar
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <span className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tabular-nums">
            {total}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
              Pendaftar Hari Ini
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <span className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tabular-nums">
            {todayCount}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
              Pendaftar Bulan Ini
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <span className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tabular-nums">
            {monthCount}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
              Status Baru
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <span className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tabular-nums">
            {newCount}
          </span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-6">
            Tren Pendaftar 30 Hari Terakhir
          </h3>
          <div className="h-48 w-full relative">
            <svg viewBox="0 0 600 160" className="w-full h-full overflow-visible">
              <line x1="0" y1="140" x2="600" y2="140" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1" />
              <line x1="0" y1="70" x2="600" y2="70" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1" strokeDasharray="4 4" />
              <polyline
                fill="none"
                stroke="#4F46E5"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={last30Days
                  .map((d, i) => {
                    const x = (i / (last30Days.length - 1)) * 580 + 10;
                    const y = 140 - (d.count / maxTrend) * 110;
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />
              {last30Days.map((d, i) => {
                if (d.count === 0 && i % 3 !== 0) return null;
                const x = (i / (last30Days.length - 1)) * 580 + 10;
                const y = 140 - (d.count / maxTrend) * 110;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={d.count > 0 ? '4' : '2'}
                    className={d.count > 0 ? 'fill-indigo-600' : 'fill-slate-300 dark:fill-slate-700'}
                  />
                );
              })}
            </svg>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-2">
            <span>{last30Days[0]?.date}</span>
            <span>{last30Days[Math.floor(last30Days.length / 2)]?.date}</span>
            <span>{last30Days[last30Days.length - 1]?.date}</span>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-6">
            Pendaftar per Paket
          </h3>
          <div className="space-y-4 pt-2">
            {packageCounts.map((pkg) => {
              const pct = Math.round((pkg.count / maxPkgCount) * 100);
              return (
                <div key={pkg.name} className="space-y-1.5">
                  <div className="flex justify-between text-sm font-semibold text-slate-800 dark:text-slate-200">
                    <span>{pkg.name}</span>
                    <span className="tabular-nums font-bold text-indigo-600 dark:text-indigo-400">
                      {pkg.count}
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5 Latest Applicants */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white">
            Pendaftar Terbaru
          </h3>
          <button
            type="button"
            onClick={onNavigateToApplicants}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Lihat Semua
          </button>
        </div>

        {latestApplicants.length === 0 ? (
          <div className="py-8 text-center text-sm font-semibold text-slate-400">
            Belum ada data
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {latestApplicants.map((a) => (
              <div key={a.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                    {a.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {a.packageName} · {a.appType}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${
                      a.status === 'Baru'
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                        : a.status === 'Dihubungi'
                        ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400'
                        : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                    }`}
                  >
                    {a.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
