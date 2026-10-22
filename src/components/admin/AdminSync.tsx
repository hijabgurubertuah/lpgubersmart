/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { CmsSettings } from '../../types';
import { APPS_SCRIPT_TEMPLATE } from '../../services/gasCode';
import { StorageService } from '../../services/storageService';

interface AdminSyncProps {
  syncSettings: CmsSettings['syncSettings'];
  onSave: (sync: CmsSettings['syncSettings']) => void;
  onShowNotification: (msg: string, type?: 'success' | 'error') => void;
}

export function AdminSync({ syncSettings, onSave, onShowNotification }: AdminSyncProps) {
  const [draft, setDraft] = useState(syncSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'failed'>('idle');

  const updateField = (key: keyof typeof draft, val: unknown) => {
    setDraft({ ...draft, [key]: val });
    setHasChanges(true);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(APPS_SCRIPT_TEMPLATE);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      onShowNotification('Kode disalin');
    } catch {
      onShowNotification('Gagal menyalin', 'error');
    }
  };

  const handleTestConnection = async () => {
    if (!draft.webAppUrl) {
      setConnectionStatus('failed');
      return;
    }
    setIsTesting(true);
    setConnectionStatus('idle');

    try {
      const ok = await StorageService.testConnection(draft.webAppUrl);
      setConnectionStatus(ok ? 'success' : 'failed');
    } catch {
      setConnectionStatus('failed');
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    onSave(draft);
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Save Button */}
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
          Sinkronisasi
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

      {/* Code Container */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-900 dark:text-white">
            Google Apps Script
          </label>
          <button
            type="button"
            onClick={handleCopyCode}
            className="h-9 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{isCopied ? 'Tersalin' : 'Salin Kode'}</span>
          </button>
        </div>

        <div className="relative">
          <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto max-h-72 border border-slate-800 select-all">
            <code>{APPS_SCRIPT_TEMPLATE}</code>
          </pre>
        </div>
      </div>

      {/* Integration Inputs & Test Connection */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 max-w-2xl">
        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">
            URL Web App
          </label>
          <input
            type="url"
            value={draft.webAppUrl}
            onChange={(e) => updateField('webAppUrl', e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-mono"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">
            Token Keamanan
          </label>
          <input
            type="text"
            value={draft.token}
            onChange={(e) => updateField('token', e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-mono"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">
              ID Folder Google Drive
            </label>
            <input
              type="text"
              value={draft.driveFolderId}
              onChange={(e) => updateField('driveFolderId', e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">
              ID Google Spreadsheet
            </label>
            <input
              type="text"
              value={draft.spreadsheetId}
              onChange={(e) => updateField('spreadsheetId', e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-mono"
            />
          </div>
        </div>

        {/* Test Connection Button & Status */}
        <div className="pt-3 flex items-center gap-3">
          <button
            type="button"
            disabled={isTesting}
            onClick={handleTestConnection}
            className="h-10 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
            <span>Uji Koneksi</span>
          </button>

          {connectionStatus === 'success' && (
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
              Terhubung
            </span>
          )}

          {connectionStatus === 'failed' && (
            <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 text-xs font-bold">
              Gagal
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
