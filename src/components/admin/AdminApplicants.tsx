/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState } from 'react';
import {
  Search,
  Download,
  MessageCircle,
  Trash2,
  ChevronLeft,
  ChevronRight,
  FileText,
  X,
} from 'lucide-react';
import { ApplicantItem, ApplicantStatus, PackageItem } from '../../types';
import { StorageService } from '../../services/storageService';
import { AutoTextarea } from '../common/AutoTextarea';

interface AdminApplicantsProps {
  applicants: ApplicantItem[];
  packages: PackageItem[];
  onUpdateApplicants: (list: ApplicantItem[]) => void;
  onShowNotification: (msg: string, type?: 'success' | 'error') => void;
}

export function AdminApplicants({
  applicants,
  packages,
  onUpdateApplicants,
  onShowNotification,
}: AdminApplicantsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [packageFilter, setPackageFilter] = useState<string>('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Selection for bulk actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Notes Modal state
  const [activeNotesApplicant, setActiveNotesApplicant] = useState<ApplicantItem | null>(null);
  const [editingNotes, setEditingNotes] = useState('');

  // Delete Confirm Modal state
  const [applicantToDelete, setApplicantToDelete] = useState<ApplicantItem | null>(null);

  // Filtered applicants
  const filtered = applicants
    .filter((a) => {
      const matchSearch =
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.whatsapp.includes(searchTerm);
      const matchStatus = statusFilter === 'Semua' || a.status === statusFilter;
      const matchPackage = packageFilter === 'Semua' || a.packageId === packageFilter;
      return matchSearch && matchStatus && matchPackage;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const pageIndex = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((pageIndex - 1) * itemsPerPage, pageIndex * itemsPerPage);

  // Handle single status change
  const handleStatusChange = (id: string, newStatus: ApplicantStatus) => {
    const updated = applicants.map((a) => (a.id === id ? { ...a, status: newStatus } : a));
    onUpdateApplicants(updated);
    StorageService.saveApplicants(updated);
    onShowNotification('Berhasil disimpan');
  };

  // Handle bulk status change
  const handleBulkStatusChange = (newStatus: ApplicantStatus) => {
    if (selectedIds.length === 0) return;
    const updated = applicants.map((a) =>
      selectedIds.includes(a.id) ? { ...a, status: newStatus } : a
    );
    onUpdateApplicants(updated);
    StorageService.saveApplicants(updated);
    setSelectedIds([]);
    onShowNotification('Berhasil disimpan');
  };

  // Handle delete
  const confirmDelete = () => {
    if (!applicantToDelete) return;
    const deleted = applicantToDelete;
    const updated = applicants.filter((a) => a.id !== deleted.id);
    onUpdateApplicants(updated);
    StorageService.saveApplicants(updated);
    setApplicantToDelete(null);
    onShowNotification('Berhasil dihapus');
  };

  // Save notes
  const saveNotes = () => {
    if (!activeNotesApplicant) return;
    const updated = applicants.map((a) =>
      a.id === activeNotesApplicant.id ? { ...a, notes: editingNotes } : a
    );
    onUpdateApplicants(updated);
    StorageService.saveApplicants(updated);
    setActiveNotesApplicant(null);
    onShowNotification('Berhasil disimpan');
  };

  // Download CSV
  const handleDownloadCsv = () => {
    const headers = ['ID', 'Nama', 'Nomor WhatsApp', 'Jenis Aplikasi', 'Paket', 'Status', 'Waktu', 'Catatan'];
    const rows = filtered.map((a) => [
      `"${a.id}"`,
      `"${a.name.replace(/"/g, '""')}"`,
      `"${a.whatsapp}"`,
      `"${a.appType}"`,
      `"${a.packageName}"`,
      `"${a.status}"`,
      `"${new Date(a.createdAt).toLocaleString('id-ID')}"`,
      `"${(a.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pendaftar_guber_smart_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleContactWa = (applicant: ApplicantItem) => {
    const cleanNum = applicant.whatsapp.replace(/\D/g, '');
    const intlNum = cleanNum.startsWith('0') ? `62${cleanNum.slice(1)}` : cleanNum;
    const msg = `Halo ${applicant.name}, terima kasih telah mendaftar di program Guber Smart (${applicant.packageName}).`;
    window.open(`https://wa.me/${intlNum}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Actions Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Cari nama atau nomor..."
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm text-slate-900 dark:text-[#E5E7EB] focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          {/* Download CSV */}
          <button
            type="button"
            onClick={handleDownloadCsv}
            className="h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Unduh CSV</span>
          </button>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Status:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="Semua">Semua Status</option>
              <option value="Baru">Baru</option>
              <option value="Dihubungi">Dihubungi</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Paket:
            </label>
            <select
              value={packageFilter}
              onChange={(e) => {
                setPackageFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="Semua">Semua Paket</option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name}
                </option>
              ))}
            </select>
          </div>

          {/* Bulk actions */}
          {selectedIds.length > 0 && (
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">
                {selectedIds.length} terpilih
              </span>
              <button
                type="button"
                onClick={() => handleBulkStatusChange('Dihubungi')}
                className="h-8 px-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 text-xs font-semibold"
              >
                Set Dihubungi
              </button>
              <button
                type="button"
                onClick={() => handleBulkStatusChange('Selesai')}
                className="h-8 px-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-semibold"
              >
                Set Selesai
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Applicants List: Mobile Cards / Desktop Table */}
      <div className="rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-sm font-semibold text-slate-400">
            Belum ada data
          </div>
        ) : (
          <>
            {/* Desktop Table (hidden on mobile) */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-[#0B1120]/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="p-4 w-10">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === paginated.length && paginated.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIds(paginated.map((p) => p.id));
                          } else {
                            setSelectedIds([]);
                          }
                        }}
                        className="rounded"
                      />
                    </th>
                    <th className="p-4">Nama</th>
                    <th className="p-4">WhatsApp</th>
                    <th className="p-4">Aplikasi & Paket</th>
                    <th className="p-4">Waktu</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {paginated.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(a.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedIds([...selectedIds, a.id]);
                            } else {
                              setSelectedIds(selectedIds.filter((id) => id !== a.id));
                            }
                          }}
                          className="rounded"
                        />
                      </td>
                      <td className="p-4 font-semibold text-slate-900 dark:text-white">
                        {a.name}
                        {a.isDuplicate && (
                          <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                            Ganda
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">
                        {a.whatsapp}
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">
                        <span className="font-medium text-slate-900 dark:text-white">{a.packageName}</span>
                        <span className="text-xs text-slate-400 block">{a.appType}</span>
                      </td>
                      <td className="p-4 text-xs text-slate-500 whitespace-nowrap">
                        {new Date(a.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="p-4">
                        <select
                          value={a.status}
                          onChange={(e) => handleStatusChange(a.id, e.target.value as ApplicantStatus)}
                          className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border-0 focus:outline-none cursor-pointer ${
                            a.status === 'Baru'
                              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                              : a.status === 'Dihubungi'
                              ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400'
                              : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                          }`}
                        >
                          <option value="Baru">Baru</option>
                          <option value="Dihubungi">Dihubungi</option>
                          <option value="Selesai">Selesai</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleContactWa(a)}
                            className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                            title="Hubungi WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveNotesApplicant(a);
                              setEditingNotes(a.notes || '');
                            }}
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
                            title="Catatan"
                          >
                            <FileText className="w-4 h-4" />
                            {a.notes && (
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 absolute top-1.5 right-1.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => setApplicantToDelete(a)}
                            className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards (stacked layout on < 1024px) */}
            <div className="lg:hidden divide-y divide-slate-100 dark:divide-slate-800">
              {paginated.map((a) => (
                <div key={a.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                        {a.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {a.whatsapp} · {a.appType}
                      </p>
                    </div>
                    <select
                      value={a.status}
                      onChange={(e) => handleStatusChange(a.id, e.target.value as ApplicantStatus)}
                      className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border-0 shrink-0 ${
                        a.status === 'Baru'
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                          : a.status === 'Dihubungi'
                          ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400'
                          : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                      }`}
                    >
                      <option value="Baru">Baru</option>
                      <option value="Dihubungi">Dihubungi</option>
                      <option value="Selesai">Selesai</option>
                    </select>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{a.packageName}</span>
                    <span className="mx-2">·</span>
                    <span>
                      {new Date(a.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  {a.message && (
                    <p className="text-xs text-slate-500 italic bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg">
                      "{a.message}"
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => handleContactWa(a)}
                      className="h-9 px-3 rounded-xl bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Hubungi</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveNotesApplicant(a);
                          setEditingNotes(a.notes || '');
                        }}
                        className="h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Catatan</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setApplicantToDelete(a)}
                        className="w-9 h-9 flex items-center justify-center rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                Halaman {pageIndex} dari {totalPages} ({filtered.length} total)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={pageIndex <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-9 h-9 rounded-lg border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 disabled:opacity-30"
                  aria-label="Sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={pageIndex >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="w-9 h-9 rounded-lg border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 disabled:opacity-30"
                  aria-label="Berikutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Internal Notes Modal */}
      {activeNotesApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div
            className="w-full max-w-md bg-white dark:bg-[#131C31] rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Catatan: {activeNotesApplicant.name}
              </h3>
              <button
                type="button"
                onClick={() => setActiveNotesApplicant(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <AutoTextarea
                value={editingNotes}
                onValueChange={setEditingNotes}
                placeholder=""
                className="min-h-[120px]"
              />

              <div className="flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveNotesApplicant(null)}
                  className="h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={saveNotes}
                  className="h-10 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {applicantToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div
            className="w-full max-w-sm bg-white dark:bg-[#131C31] rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">
              Hapus Pendaftar
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Hapus data {applicantToDelete.name}?
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setApplicantToDelete(null)}
                className="h-11 px-5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="h-11 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
