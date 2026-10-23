/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState, useRef } from 'react';
import { CmsSettings } from '../../types';
import { AutoTextarea } from '../common/AutoTextarea';
import { StorageService } from '../../services/storageService';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface AdminNotificationsProps {
  notificationSettings: CmsSettings['notificationSettings'];
  onSave: (settings: CmsSettings['notificationSettings']) => void;
  onShowNotification: (msg: string, type?: 'success' | 'error') => void;
}

export function AdminNotifications({
  notificationSettings,
  onSave,
  onShowNotification,
}: AdminNotificationsProps) {
  const [draft, setDraft] = useState<CmsSettings['notificationSettings']>(notificationSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const activeTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [activeTemplateType, setActiveTemplateType] = useState<'admin' | 'user'>('admin');

  const updateField = <K extends keyof typeof draft>(key: K, val: typeof draft[K]) => {
    setDraft({ ...draft, [key]: val });
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(draft);
    setHasChanges(false);
    StorageService.logActivity('superadmin', 'Simpan Pengaturan Notifikasi', 'Memperbarui konfigurasi WhatsApp Fonnte.');
    onShowNotification('Berhasil disimpan');
  };

  const insertVariable = (variable: string) => {
    const textToInsert = `{${variable}}`;
    if (activeTemplateType === 'admin') {
      const current = draft.adminTemplate || '';
      updateField('adminTemplate', current + textToInsert);
    } else {
      const current = draft.userTemplate || '';
      updateField('userTemplate', current + textToInsert);
    }
  };

  const handleTestSend = async () => {
    setIsTesting(true);
    setTestResult(null);
    const cms = StorageService.getCmsSettings();
    if (!cms.syncSettings.webAppUrl) {
      setIsTesting(false);
      setTestResult({ success: false, message: 'URL Web App Apps Script belum diatur.' });
      return;
    }

    try {
      const res = await fetch(cms.syncSettings.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'testFonnte',
          token: cms.syncSettings.token,
          recipientNumbers: draft.recipientNumbers,
          fonnteToken: draft.fonnteToken,
          template: draft.adminTemplate,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setTestResult({ success: true, message: 'Terkirim' });
        onShowNotification('Pesan uji Fonnte berhasil dikirim');
      } else {
        setTestResult({ success: false, message: 'Gagal' });
        onShowNotification('Gagal mengirim pesan uji', 'error');
      }
    } catch {
      setTestResult({ success: false, message: 'Gagal' });
      onShowNotification('Gagal mengirim pesan uji', 'error');
    } finally {
      setIsTesting(false);
    }
  };

  const variables = [
    { key: 'nama', label: 'Nama' },
    { key: 'nomor', label: 'Nomor' },
    { key: 'paket', label: 'Paket' },
    { key: 'jenis_aplikasi', label: 'Jenis Aplikasi' },
    { key: 'pesan', label: 'Pesan' },
    { key: 'waktu', label: 'Waktu' },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
          Notifikasi WhatsApp Fonnte
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

      <div className="p-6 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
        {/* Token Fonnte */}
        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Token API Fonnte</label>
          <input
            type="password"
            value={draft.fonnteToken}
            onChange={(e) => updateField('fonnteToken', e.target.value)}
            placeholder="Masukkan token Fonnte Anda"
            className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold text-slate-900 dark:text-white"
          />
        </div>

        {/* Switches */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Notifikasi Admin</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={draft.adminEnabled}
                onChange={(e) => updateField('adminEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Balasan Pendaftar</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={draft.userEnabled}
                onChange={(e) => updateField('userEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
            </label>
          </div>
        </div>

        {/* Recipient Numbers & Hourly Limit */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-slate-500 block mb-1">Nomor Penerima (Pisahkan dengan koma)</label>
            <input
              type="text"
              value={draft.recipientNumbers}
              onChange={(e) => updateField('recipientNumbers', e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">Batas per Jam</label>
            <input
              type="number"
              value={draft.hourlyLimit}
              onChange={(e) => updateField('hourlyLimit', Number(e.target.value))}
              className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Variable insertion buttons */}
        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Sisipkan Variabel ke Templat Aktif:</span>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setActiveTemplateType('admin')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  activeTemplateType === 'admin'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => setActiveTemplateType('user')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  activeTemplateType === 'user'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Pendaftar
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {variables.map((v) => (
              <button
                key={v.key}
                type="button"
                onClick={() => insertVariable(v.key)}
                className="h-8 px-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold hover:bg-indigo-100 transition-colors"
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Admin Template */}
        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Templat Notifikasi Admin</label>
          <AutoTextarea
            value={draft.adminTemplate}
            onValueChange={(val) => updateField('adminTemplate', val)}
            className="min-h-[100px]"
          />
        </div>

        {/* User Template */}
        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Templat Balasan Pendaftar</label>
          <AutoTextarea
            value={draft.userTemplate}
            onValueChange={(val) => updateField('userTemplate', val)}
            className="min-h-[100px]"
          />
        </div>

        {/* Test Send Button & Badge */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            disabled={isTesting}
            onClick={handleTestSend}
            className="h-11 px-5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 flex items-center gap-2 disabled:opacity-50"
          >
            {isTesting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                <span>Mengirim Uji...</span>
              </>
            ) : (
              <span>Kirim Tes</span>
            )}
          </button>

          {testResult && (
            <div
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold ${
                testResult.success
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
              }`}
            >
              {testResult.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{testResult.message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
