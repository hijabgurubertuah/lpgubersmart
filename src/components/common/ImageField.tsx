/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState, useRef } from 'react';
import { Trash2, Upload, Link, Loader2 } from 'lucide-react';
import { ImageRef } from '../../types';
import { StorageService } from '../../services/storageService';
import { ResolvedImage } from './ResolvedImage';

interface ImageFieldProps {
  label: string;
  image: ImageRef;
  onChange: (image: ImageRef) => void;
  required?: boolean;
}

export function ImageField({ label, image, onChange, required }: ImageFieldProps) {
  const [activeTab, setActiveTab] = useState<'unggah' | 'tautan'>('tautan');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage('');

    // Code validation
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Format harus JPG, PNG, atau WEBP');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Ukuran file melebihi 5 MB');
      return;
    }

    try {
      setIsUploading(true);
      const compressedBase64 = await StorageService.compressImage(file);
      const res = await StorageService.uploadImageToDrive(compressedBase64, file.name);

      if (res.success && res.fileId) {
        onChange({ source: 'drive', value: res.fileId });
      } else {
        // Fallback: save local data URL if drive not configured
        onChange({ source: 'tautan', value: compressedBase64 });
      }
    } catch {
      setErrorMessage('Gagal mengunggah file');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    if (image.source === 'drive' && image.value) {
      StorageService.deleteDriveFile(image.value);
    }
    onChange({ source: 'tautan', value: '' });
    setErrorMessage('');
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('tautan')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'tautan'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <span className="flex items-center gap-1">
              <Link className="w-3.5 h-3.5" />
              Tautan
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('unggah')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'unggah'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <span className="flex items-center gap-1">
              <Upload className="w-3.5 h-3.5" />
              Unggah
            </span>
          </button>
        </div>
      </div>

      {activeTab === 'tautan' ? (
        <input
          type="text"
          value={image.source === 'tautan' ? image.value : ''}
          onChange={(e) => onChange({ source: 'tautan', value: e.target.value })}
          placeholder=""
          className="w-full h-11 px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#131C31] text-base text-slate-900 dark:text-[#E5E7EB] focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
        />
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#131C31] text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                <span>Pilih Gambar</span>
              </>
            )}
          </button>
        </div>
      )}

      {errorMessage && (
        <p className="text-xs font-medium text-red-500 mt-1">{errorMessage}</p>
      )}

      {image.value && (
        <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/80 dark:border-slate-800">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0">
            <ResolvedImage image={image} alt={label} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {image.source === 'tautan' ? image.value : `Drive ID: ${image.value}`}
            </p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors shrink-0"
            aria-label="Hapus Gambar"
            title="Hapus Gambar"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
