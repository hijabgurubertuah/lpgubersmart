/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, MessageCircle, X } from 'lucide-react';
import { PackageItem, ApplicantItem } from '../../types';
import { StorageService } from '../../services/storageService';
import { AutoTextarea } from '../common/AutoTextarea';

interface FormulirPendaftaranProps {
  packages: PackageItem[];
  selectedPackageId?: string;
  whatsappNumber: string;
  whatsappPostRegTemplate: string;
  onSuccessSubmit?: (applicant: ApplicantItem) => void;
}

export function FormulirPendaftaran({
  packages,
  selectedPackageId,
  whatsappNumber,
  whatsappPostRegTemplate,
  onSuccessSubmit,
}: FormulirPendaftaranProps) {
  const activePackages = packages.filter((p) => p.isActive).sort((a, b) => a.order - b.order);

  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [appType, setAppType] = useState('Website Instansi');
  const [packageId, setPackageId] = useState(activePackages[0]?.id || '');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<{ name?: string; whatsapp?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successApplicant, setSuccessApplicant] = useState<ApplicantItem | null>(null);

  useEffect(() => {
    if (selectedPackageId) {
      setPackageId(selectedPackageId);
    }
  }, [selectedPackageId]);

  const appTypes = [
    'Website Instansi',
    'Toko Online',
    'Absensi',
    'Inventaris',
    'Laporan Kantor',
    'Perpustakaan',
    'Lainnya',
  ];

  const validate = (): boolean => {
    const newErrors: { name?: string; whatsapp?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Nama lengkap harus diisi';
    }

    const cleanPhone = whatsapp.replace(/\D/g, '');
    if (!cleanPhone) {
      newErrors.whatsapp = 'Nomor WhatsApp harus diisi';
    } else if (!cleanPhone.startsWith('08') && !cleanPhone.startsWith('62')) {
      newErrors.whatsapp = 'Format nomor harus diawali 08 atau 62';
    } else if (cleanPhone.length < 10 || cleanPhone.length > 14) {
      newErrors.whatsapp = 'Nomor WhatsApp tidak valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const selectedPkg = activePackages.find((p) => p.id === packageId) || activePackages[0];
      const res = StorageService.addApplicant({
        name: name.trim(),
        whatsapp: whatsapp.trim(),
        appType,
        packageId: selectedPkg ? selectedPkg.id : '',
        packageName: selectedPkg ? selectedPkg.name : '',
        message: message.trim(),
      });

      if (res.success) {
        setSuccessApplicant(res.applicant);
        if (onSuccessSubmit) onSuccessSubmit(res.applicant);
        setName('');
        setWhatsapp('');
        setMessage('');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenWhatsApp = () => {
    if (!successApplicant) return;
    const cleanNumber = whatsappNumber.replace(/\D/g, '') || '6285376604024';
    const text = whatsappPostRegTemplate
      .replace('{name}', successApplicant.name)
      .replace('{package}', successApplicant.packageName);
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSuccessApplicant(null);
  };

  return (
    <section id="daftar" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#0B1120]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Formulir Pendaftaran
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl bg-slate-50 dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-md space-y-5">
          {/* Nama Lengkap */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
              Nama Lengkap *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              placeholder="Ahmad Pratama"
              className="w-full h-12 px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-base text-slate-900 dark:text-[#E5E7EB] focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
            {errors.name && (
              <p className="text-xs font-semibold text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Nomor WhatsApp */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
              Nomor WhatsApp *
            </label>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value);
                if (errors.whatsapp) setErrors({ ...errors, whatsapp: undefined });
              }}
              placeholder="081234567890"
              className="w-full h-12 px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-base text-slate-900 dark:text-[#E5E7EB] focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
            {errors.whatsapp && (
              <p className="text-xs font-semibold text-red-500 mt-1">{errors.whatsapp}</p>
            )}
          </div>

          {/* Jenis Aplikasi */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
              Jenis Aplikasi *
            </label>
            <select
              value={appType}
              onChange={(e) => setAppType(e.target.value)}
              className="w-full h-12 px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-base text-slate-900 dark:text-[#E5E7EB] focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            >
              {appTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Paket */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
              Paket Belajar *
            </label>
            <select
              value={packageId}
              onChange={(e) => setPackageId(e.target.value)}
              className="w-full h-12 px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-base text-slate-900 dark:text-[#E5E7EB] focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            >
              {activePackages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} ({pkg.price})
                </option>
              ))}
            </select>
          </div>

          {/* Pesan Opsional */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
              Pesan
            </label>
            <AutoTextarea
              value={message}
              onValueChange={setMessage}
              placeholder=""
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-13 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-lg shadow-orange-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                'Kirim Pendaftaran'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Success Dialog Modal */}
      {successApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div
            className="w-full max-w-md bg-white dark:bg-[#131C31] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 text-center animate-in zoom-in-95 duration-150 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSuccessApplicant(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-5 shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-2">
              Pendaftaran Terkirim
            </h3>

            <p className="text-base text-slate-600 dark:text-slate-300 mb-6">
              Terima kasih, data pendaftaran Anda telah tercatat dengan baik.
            </p>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="w-full h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Lanjut ke WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={() => setSuccessApplicant(null)}
                className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-base hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
