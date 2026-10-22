/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { UrgencySettings } from '../../types';

interface UrgensiProps {
  urgency: UrgencySettings;
  showCountdown: boolean;
  showQuota: boolean;
}

export function Urgensi({ urgency, showCountdown, showQuota }: UrgensiProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(urgency.deadlineDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [urgency.deadlineDate]);

  if ((!showCountdown && !showQuota) || timeLeft.isExpired) {
    return null;
  }

  const percentage = urgency.totalSeats > 0
    ? Math.max(0, Math.min(100, Math.round(((urgency.totalSeats - urgency.remainingSeats) / urgency.totalSeats) * 100)))
    : 0;

  return (
    <section className="py-12 bg-indigo-900 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-indigo-950/60 border border-indigo-800/80 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Countdown Block */}
          {showCountdown && (
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-2 text-indigo-300 text-sm font-semibold">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>Pendaftaran Gelombang Ini Berakhir Dalam</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <TimeUnit val={timeLeft.days} unit="Hari" />
                <span className="text-xl font-bold text-indigo-400">:</span>
                <TimeUnit val={timeLeft.hours} unit="Jam" />
                <span className="text-xl font-bold text-indigo-400">:</span>
                <TimeUnit val={timeLeft.minutes} unit="Menit" />
                <span className="text-xl font-bold text-indigo-400">:</span>
                <TimeUnit val={timeLeft.seconds} unit="Detik" />
              </div>
            </div>
          )}

          {/* Quota Progress Block */}
          {showQuota && (
            <div className="w-full md:w-80 space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold text-indigo-200">
                <span>Kuota Terbatas</span>
                <span className="text-orange-400 font-bold">
                  Sisa {urgency.remainingSeats} dari {urgency.totalSeats} kursi
                </span>
              </div>
              <div className="w-full h-3.5 rounded-full bg-indigo-950 border border-indigo-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function TimeUnit({ val, unit }: { val: number; unit: string }) {
  const padded = String(val).padStart(2, '0');
  return (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-900 border border-indigo-800 flex items-center justify-center font-display font-black text-2xl sm:text-3xl tabular-nums shadow-inner">
        {padded}
      </div>
      <span className="text-[11px] font-semibold text-indigo-300 mt-1 uppercase tracking-wider">
        {unit}
      </span>
    </div>
  );
}
