/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { UserRole } from '../../types';
import { StorageService } from '../../services/storageService';

interface AdminPasswordProps {
  currentRole: UserRole;
  webAppUrl?: string;
  token?: string;
  onShowNotification: (msg: string, type?: 'success' | 'error') => void;
}

export function AdminPassword({
  currentRole,
  webAppUrl,
  token,
  onShowNotification,
}: AdminPasswordProps) {
  const [targetRole, setTargetRole] = useState<'admin' | 'superadmin'>(
    currentRole === 'superadmin' ? 'superadmin' : 'admin'
  );
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (newPassword.length < 8) {
      setErrorMessage('Kata sandi minimal 8 karakter');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak cocok');
      return;
    }

    setIsLoading(true);

    try {
      // If changing own, optionally check old password
      if (currentRole === targetRole && oldPassword) {
        const verify = await StorageService.verifyPassword(oldPassword, webAppUrl);
        if (!verify.success || verify.role !== currentRole) {
          setErrorMessage('Kata sandi lama tidak sesuai');
          setIsLoading(false);
          return;
        }
      }

      const res = await StorageService.changePassword(targetRole, newPassword, webAppUrl, token);
      if (res.success) {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        onShowNotification('Berhasil disimpan');
      } else {
        setErrorMessage(res.message || 'Gagal mengubah kata sandi');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-md">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
          Ubah Kata Sandi
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        {currentRole === 'superadmin' && (
          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">
              Peran Akun
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value as 'admin' | 'superadmin')}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold text-slate-900 dark:text-white"
            >
              <option value="superadmin">Superadmin</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        {currentRole === targetRole && (
          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">
              Kata Sandi Lama
            </label>
            <div className="relative">
              <input
                type={showOld ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm text-slate-900 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 p-1"
              >
                {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">
            Kata Sandi Baru *
          </label>
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm text-slate-900 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 p-1"
            >
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">
            Ulangi Kata Sandi Baru *
          </label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm text-slate-900 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 p-1"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {errorMessage && (
          <p className="text-xs font-semibold text-red-500 mt-2">{errorMessage}</p>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || !newPassword || !confirmPassword}
            className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-40"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              'Simpan'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
