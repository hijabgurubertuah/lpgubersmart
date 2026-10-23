/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { PackageItem } from '../../types';

const APPS_SCRIPT_URL = '[GANTI_DENGAN_URL_WEB_APP_ANDA]';

interface FormulirPendaftaranProps {
  packages: PackageItem[];
  selectedPackageId?: string;
  whatsappNumber?: string;
  whatsappPostRegTemplate?: string;
  onSuccessSubmit?: () => void;
}

export function FormulirPendaftaran({
  packages,
  selectedPackageId,
  onSuccessSubmit,
}: FormulirPendaftaranProps) {
  const activePackages = packages.filter((p) => p.isActive).sort((a, b) => a.order - b.order);

  const [nama, setNama] = useState('');
  const [hp, setHp] = useState('');
  const [produk, setProduk] = useState(activePackages[0]?.name || 'Website Instansi');
  const [jumlah, setJumlah] = useState<number>(1);
  const [catatan, setCatatan] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Bot trap

  const [errors, setErrors] = useState<{ nama?: boolean; hp?: boolean; produk?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (selectedPackageId) {
      const found = activePackages.find((p) => p.id === selectedPackageId);
      if (found) {
        setProduk(found.name);
      }
    }
  }, [selectedPackageId, activePackages]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLocked && lockTimer > 0) {
      timer = setInterval(() => {
        setLockTimer((prev) => {
          if (prev <= 1) {
            setIsLocked(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLocked, lockTimer]);

  const showNotificationMsg = (text: string, type: 'success' | 'error') => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification(null);
    }, 500); // 0.5 seconds
  };

  const validate = (): boolean => {
    const newErrors: { nama?: boolean; hp?: boolean; produk?: boolean } = {};

    if (!nama.trim() || nama.trim().length < 3) {
      newErrors.nama = true;
    }

    const cleanPhone = hp.replace(/\D/g, '');
    let normalized = cleanPhone;
    if (cleanPhone.startsWith('08')) {
      normalized = '62' + cleanPhone.slice(1);
    } else if (cleanPhone.startsWith('+62')) {
      normalized = cleanPhone.slice(1);
    }

    if (!cleanPhone || normalized.length < 10 || normalized.length > 15 || (!normalized.startsWith('62'))) {
      newErrors.hp = true;
    }

    if (!produk) {
      newErrors.produk = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isLocked) return;

    // Honeypot check
    if (honeypot.trim()) {
      showNotificationMsg('Pesanan terkirim', 'success');
      setNama('');
      setHp('');
      setCatatan('');
      setJumlah(1);
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    const cleanPhone = hp.replace(/\D/g, '');
    let normalizedHp = cleanPhone;
    if (cleanPhone.startsWith('08')) {
      normalizedHp = '62' + cleanPhone.slice(1);
    } else if (cleanPhone.startsWith('+62')) {
      normalizedHp = cleanPhone.slice(1);
    }

    const payload = {
      nama: nama.trim().replace(/\s+/g, ' '),
      hp: normalizedHp,
      produk,
      jumlah: Number(jumlah) || 1,
      catatan: catatan.trim(),
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const result = await response.json();

      if (result && result.ok === true) {
        showNotificationMsg('Pesanan terkirim', 'success');
        setNama('');
        setHp('');
        setCatatan('');
        setJumlah(1);
        setIsLocked(true);
        setLockTimer(30);
        if (onSuccessSubmit) onSuccessSubmit();
      } else {
        showNotificationMsg('Pesanan gagal terkirim, coba lagi', 'error');
      }
    } catch {
      showNotificationMsg('Pesanan gagal terkirim, coba lagi', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="daftar" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight">
            Formulir Pendaftaran
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-md space-y-5 relative">
          {/* Notification Toast (0.5s) */}
          {notification && (
            <div
              className={`absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-xl text-white font-semibold text-sm shadow-lg transition-all animate-in fade-in ${
                notification.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
              }`}
            >
              {notification.text}
            </div>
          )}

          {/* Honeypot hidden field */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Nama */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => {
                setNama(e.target.value);
                if (errors.nama) setErrors({ ...errors, nama: false });
              }}
              placeholder="Nama lengkap"
              className={`w-full h-11 sm:h-12 px-3.5 rounded-xl border bg-white text-base text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-600 ${
                errors.nama ? 'border-red-500' : 'border-slate-300'
              }`}
            />
          </div>

          {/* Nomor WhatsApp */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Nomor WhatsApp
            </label>
            <input
              type="tel"
              value={hp}
              onChange={(e) => {
                setHp(e.target.value);
                if (errors.hp) setErrors({ ...errors, hp: false });
              }}
              placeholder="081234567890"
              className={`w-full h-11 sm:h-12 px-3.5 rounded-xl border bg-white text-base text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-600 ${
                errors.hp ? 'border-red-500' : 'border-slate-300'
              }`}
            />
          </div>

          {/* Produk atau Paket */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Produk atau Paket
            </label>
            <select
              value={produk}
              onChange={(e) => {
                setProduk(e.target.value);
                if (errors.produk) setErrors({ ...errors, produk: false });
              }}
              className={`w-full h-11 sm:h-12 px-3.5 rounded-xl border bg-white text-base text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-600 ${
                errors.produk ? 'border-red-500' : 'border-slate-300'
              }`}
            >
              {activePackages.map((pkg) => (
                <option key={pkg.id} value={pkg.name}>
                  {pkg.name} ({pkg.price})
                </option>
              ))}
            </select>
          </div>

          {/* Jumlah */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Jumlah
            </label>
            <input
              type="number"
              min={1}
              value={jumlah}
              onChange={(e) => setJumlah(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full h-11 sm:h-12 px-3.5 rounded-xl border border-slate-300 bg-white text-base text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          {/* Catatan */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Catatan
            </label>
            <textarea
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Catatan opsional"
              rows={3}
              className="w-full p-3.5 rounded-xl border border-slate-300 bg-white text-base text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-600 resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || isLocked}
              className="w-full h-12 sm:h-13 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-lg shadow-orange-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : isLocked ? (
                <span>Terkunci ({lockTimer}s)</span>
              ) : (
                'Kirim Pendaftaran'
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
