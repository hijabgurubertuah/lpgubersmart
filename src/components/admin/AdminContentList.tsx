/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState } from 'react';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import {
  StatItem,
  ProblemItem,
  BenefitItem,
  StepItem,
  ModuleItem,
  PortfolioItem,
  MentorProfile,
  TestimonialItem,
  BonusItem,
  FaqItem,
} from '../../types';
import { AutoTextarea } from '../common/AutoTextarea';
import { ImageField } from '../common/ImageField';

interface AdminContentListProps {
  stats: StatItem[];
  problems: ProblemItem[];
  benefits: BenefitItem[];
  steps: StepItem[];
  modules: ModuleItem[];
  portfolio: PortfolioItem[];
  mentor: MentorProfile;
  testimonials: TestimonialItem[];
  bonuses: BonusItem[];
  faqs: FaqItem[];
  onSaveAll: (data: {
    stats: StatItem[];
    problems: ProblemItem[];
    benefits: BenefitItem[];
    steps: StepItem[];
    modules: ModuleItem[];
    portfolio: PortfolioItem[];
    mentor: MentorProfile;
    testimonials: TestimonialItem[];
    bonuses: BonusItem[];
    faqs: FaqItem[];
  }) => void;
}

export function AdminContentList({
  stats,
  problems,
  benefits,
  steps,
  modules,
  portfolio,
  mentor,
  testimonials,
  bonuses,
  faqs,
  onSaveAll,
}: AdminContentListProps) {
  const [activeSubtab, setActiveSubtab] = useState<
    'stats' | 'problems' | 'benefits' | 'steps' | 'modules' | 'portfolio' | 'mentor' | 'testimonials' | 'bonuses' | 'faqs'
  >('stats');

  const [draftStats, setDraftStats] = useState<StatItem[]>(stats);
  const [draftProblems, setDraftProblems] = useState<ProblemItem[]>(problems);
  const [draftBenefits, setDraftBenefits] = useState<BenefitItem[]>(benefits);
  const [draftSteps, setDraftSteps] = useState<StepItem[]>(steps);
  const [draftModules, setDraftModules] = useState<ModuleItem[]>(modules);
  const [draftPortfolio, setDraftPortfolio] = useState<PortfolioItem[]>(portfolio);
  const [draftMentor, setDraftMentor] = useState<MentorProfile>(mentor);
  const [draftTestimonials, setDraftTestimonials] = useState<TestimonialItem[]>(testimonials);
  const [draftBonuses, setDraftBonuses] = useState<BonusItem[]>(bonuses);
  const [draftFaqs, setDraftFaqs] = useState<FaqItem[]>(faqs);

  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = () => {
    onSaveAll({
      stats: draftStats,
      problems: draftProblems,
      benefits: draftBenefits,
      steps: draftSteps,
      modules: draftModules,
      portfolio: draftPortfolio,
      mentor: draftMentor,
      testimonials: draftTestimonials,
      bonuses: draftBonuses,
      faqs: draftFaqs,
    });
    setHasChanges(false);
  };

  const subtabs = [
    { id: 'stats', label: 'Statistik' },
    { id: 'problems', label: 'Masalah' },
    { id: 'benefits', label: 'Manfaat' },
    { id: 'steps', label: 'Langkah' },
    { id: 'modules', label: 'Materi' },
    { id: 'portfolio', label: 'Karya' },
    { id: 'mentor', label: 'Mentor' },
    { id: 'testimonials', label: 'Testimoni' },
    { id: 'bonuses', label: 'Bonus' },
    { id: 'faqs', label: 'FAQ' },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Top Bar with Single Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
          Konten Daftar
        </h3>
        <button
          type="button"
          disabled={!hasChanges}
          onClick={handleSave}
          className="h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors disabled:opacity-40 self-end sm:self-auto"
        >
          Simpan
        </button>
      </div>

      {/* Subtab pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {subtabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSubtab(tab.id)}
            className={`h-10 px-4 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
              activeSubtab === tab.id
                ? 'bg-slate-900 text-white dark:bg-indigo-600'
                : 'bg-white dark:bg-[#131C31] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Editor per active subtab */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs">
        {/* STATISTIK */}
        {activeSubtab === 'stats' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">Daftar Statistik</span>
              <button
                type="button"
                onClick={() => {
                  setDraftStats([
                    ...draftStats,
                    {
                      id: `stat-${Date.now()}`,
                      label: 'Item Baru',
                      value: '100+',
                      numericTarget: 100,
                      suffix: '+',
                      order: draftStats.length + 1,
                      isVisible: true,
                    },
                  ]);
                  setHasChanges(true);
                }}
                className="h-9 px-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah</span>
              </button>
            </div>
            <div className="space-y-3">
              {draftStats.map((item, idx) => (
                <div key={item.id} className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1120] border border-slate-200/70 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
                    <div>
                      <label className="text-xs text-slate-500 font-semibold">Label</label>
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => {
                          const updated = [...draftStats];
                          updated[idx].label = e.target.value;
                          setDraftStats(updated);
                          setHasChanges(true);
                        }}
                        className="w-full h-9 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131C31] text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 font-semibold">Target Angka</label>
                      <input
                        type="number"
                        value={item.numericTarget}
                        onChange={(e) => {
                          const updated = [...draftStats];
                          updated[idx].numericTarget = Number(e.target.value);
                          setDraftStats(updated);
                          setHasChanges(true);
                        }}
                        className="w-full h-9 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131C31] text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 font-semibold">Akhiran Simbol</label>
                      <input
                        type="text"
                        value={item.suffix || ''}
                        onChange={(e) => {
                          const updated = [...draftStats];
                          updated[idx].suffix = e.target.value;
                          setDraftStats(updated);
                          setHasChanges(true);
                        }}
                        className="w-full h-9 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131C31] text-xs font-semibold"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...draftStats];
                        updated[idx].isVisible = !updated[idx].isVisible;
                        setDraftStats(updated);
                        setHasChanges(true);
                      }}
                      className="p-2 rounded-lg text-slate-500 hover:text-slate-900"
                    >
                      {item.isVisible ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDraftStats(draftStats.filter((_, i) => i !== idx));
                        setHasChanges(true);
                      }}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MASALAH */}
        {activeSubtab === 'problems' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">Daftar Masalah</span>
              <button
                type="button"
                onClick={() => {
                  setDraftProblems([
                    ...draftProblems,
                    { id: `prob-${Date.now()}`, title: 'Tantangan Baru', order: draftProblems.length + 1, isVisible: true },
                  ]);
                  setHasChanges(true);
                }}
                className="h-9 px-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah</span>
              </button>
            </div>
            <div className="space-y-3">
              {draftProblems.map((p, idx) => (
                <div key={p.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B1120] border border-slate-200/70 dark:border-slate-800 flex items-center gap-3">
                  <input
                    type="text"
                    value={p.title}
                    onChange={(e) => {
                      const updated = [...draftProblems];
                      updated[idx].title = e.target.value;
                      setDraftProblems(updated);
                      setHasChanges(true);
                    }}
                    className="flex-1 h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131C31] text-sm font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...draftProblems];
                      updated[idx].isVisible = !updated[idx].isVisible;
                      setDraftProblems(updated);
                      setHasChanges(true);
                    }}
                    className="p-2 text-slate-500"
                  >
                    {p.isVisible ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDraftProblems(draftProblems.filter((_, i) => i !== idx));
                      setHasChanges(true);
                    }}
                    className="p-2 text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MANFAAT */}
        {activeSubtab === 'benefits' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">Daftar Manfaat</span>
              <button
                type="button"
                onClick={() => {
                  setDraftBenefits([
                    ...draftBenefits,
                    {
                      id: `ben-${Date.now()}`,
                      title: 'Keunggulan Baru',
                      description: 'Deskripsi singkat keunggulan.',
                      iconName: 'Sparkles',
                      order: draftBenefits.length + 1,
                      isVisible: true,
                    },
                  ]);
                  setHasChanges(true);
                }}
                className="h-9 px-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah</span>
              </button>
            </div>
            <div className="space-y-3">
              {draftBenefits.map((b, idx) => (
                <div key={b.id} className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1120] border border-slate-200/70 dark:border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <input
                      type="text"
                      value={b.title}
                      onChange={(e) => {
                        const updated = [...draftBenefits];
                        updated[idx].title = e.target.value;
                        setDraftBenefits(updated);
                        setHasChanges(true);
                      }}
                      className="flex-1 h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131C31] text-sm font-semibold"
                    />
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...draftBenefits];
                          updated[idx].isVisible = !updated[idx].isVisible;
                          setDraftBenefits(updated);
                          setHasChanges(true);
                        }}
                        className="p-1.5 text-slate-500"
                      >
                        {b.isVisible ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDraftBenefits(draftBenefits.filter((_, i) => i !== idx));
                          setHasChanges(true);
                        }}
                        className="p-1.5 text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <AutoTextarea
                    value={b.description}
                    onValueChange={(val) => {
                      const updated = [...draftBenefits];
                      updated[idx].description = val;
                      setDraftBenefits(updated);
                      setHasChanges(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LANGKAH */}
        {activeSubtab === 'steps' && (
          <div className="space-y-4">
            <span className="text-sm font-bold text-slate-900 dark:text-white block mb-2">3 Langkah Alur</span>
            <div className="space-y-3">
              {draftSteps.map((step, idx) => (
                <div key={step.id} className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1120] border border-slate-200/70 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {step.stepNumber}
                    </span>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => {
                        const updated = [...draftSteps];
                        updated[idx].title = e.target.value;
                        setDraftSteps(updated);
                        setHasChanges(true);
                      }}
                      className="flex-1 h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131C31] text-sm font-semibold"
                    />
                  </div>
                  <AutoTextarea
                    value={step.description}
                    onValueChange={(val) => {
                      const updated = [...draftSteps];
                      updated[idx].description = val;
                      setDraftSteps(updated);
                      setHasChanges(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MATERI */}
        {activeSubtab === 'modules' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">Modul Materi</span>
              <button
                type="button"
                onClick={() => {
                  setDraftModules([
                    ...draftModules,
                    {
                      id: `mod-${Date.now()}`,
                      title: 'Modul Baru',
                      points: ['Poin pertama', 'Poin kedua', 'Poin ketiga'],
                      order: draftModules.length + 1,
                      isVisible: true,
                    },
                  ]);
                  setHasChanges(true);
                }}
                className="h-9 px-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Modul</span>
              </button>
            </div>
            <div className="space-y-4">
              {draftModules.map((mod, idx) => (
                <div key={mod.id} className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1120] border border-slate-200/70 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <input
                      type="text"
                      value={mod.title}
                      onChange={(e) => {
                        const updated = [...draftModules];
                        updated[idx].title = e.target.value;
                        setDraftModules(updated);
                        setHasChanges(true);
                      }}
                      className="flex-1 h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131C31] text-sm font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setDraftModules(draftModules.filter((_, i) => i !== idx));
                        setHasChanges(true);
                      }}
                      className="p-1.5 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {mod.points.map((pt, pIdx) => (
                      <input
                        key={pIdx}
                        type="text"
                        value={pt}
                        onChange={(e) => {
                          const updated = [...draftModules];
                          updated[idx].points[pIdx] = e.target.value;
                          setDraftModules(updated);
                          setHasChanges(true);
                        }}
                        className="w-full h-8 px-2.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131C31] text-xs"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KARYA */}
        {activeSubtab === 'portfolio' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">Karya Peserta</span>
              <button
                type="button"
                onClick={() => {
                  setDraftPortfolio([
                    ...draftPortfolio,
                    {
                      id: `port-${Date.now()}`,
                      title: 'Aplikasi Baru',
                      category: 'Website',
                      image: { source: 'tautan', value: '' },
                      order: draftPortfolio.length + 1,
                      isVisible: true,
                    },
                  ]);
                  setHasChanges(true);
                }}
                className="h-9 px-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Karya</span>
              </button>
            </div>
            <div className="space-y-4">
              {draftPortfolio.map((port, idx) => (
                <div key={port.id} className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1120] border border-slate-200/70 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <input
                      type="text"
                      value={port.title}
                      onChange={(e) => {
                        const updated = [...draftPortfolio];
                        updated[idx].title = e.target.value;
                        setDraftPortfolio(updated);
                        setHasChanges(true);
                      }}
                      className="flex-1 h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131C31] text-sm font-semibold"
                    />
                    <select
                      value={port.category}
                      onChange={(e) => {
                        const updated = [...draftPortfolio];
                        updated[idx].category = e.target.value as 'Website' | 'Toko' | 'Administrasi';
                        setDraftPortfolio(updated);
                        setHasChanges(true);
                      }}
                      className="h-9 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131C31] text-xs font-semibold"
                    >
                      <option value="Website">Website</option>
                      <option value="Toko">Toko</option>
                      <option value="Administrasi">Administrasi</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        setDraftPortfolio(draftPortfolio.filter((_, i) => i !== idx));
                        setHasChanges(true);
                      }}
                      className="p-1.5 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <ImageField
                    label="Gambar Karya"
                    image={port.image}
                    onChange={(img) => {
                      const updated = [...draftPortfolio];
                      updated[idx].image = img;
                      setDraftPortfolio(updated);
                      setHasChanges(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MENTOR */}
        {activeSubtab === 'mentor' && (
          <div className="space-y-4 max-w-xl">
            <span className="text-sm font-bold text-slate-900 dark:text-white block mb-2">Profil Mentor</span>
            <div>
              <label className="text-xs text-slate-500 font-semibold block mb-1">Nama Mentor</label>
              <input
                type="text"
                value={draftMentor.name}
                onChange={(e) => {
                  setDraftMentor({ ...draftMentor, name: e.target.value });
                  setHasChanges(true);
                }}
                className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-semibold block mb-1">Jabatan</label>
              <input
                type="text"
                value={draftMentor.title}
                onChange={(e) => {
                  setDraftMentor({ ...draftMentor, title: e.target.value });
                  setHasChanges(true);
                }}
                className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm font-semibold"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-semibold block mb-1">Bio</label>
              <AutoTextarea
                value={draftMentor.bio}
                onValueChange={(val) => {
                  setDraftMentor({ ...draftMentor, bio: val });
                  setHasChanges(true);
                }}
              />
            </div>
            <ImageField
              label="Foto Mentor"
              image={draftMentor.photo}
              onChange={(img) => {
                setDraftMentor({ ...draftMentor, photo: img });
                setHasChanges(true);
              }}
            />
          </div>
        )}

        {/* TESTIMONI */}
        {activeSubtab === 'testimonials' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">Daftar Testimoni</span>
              <button
                type="button"
                onClick={() => {
                  setDraftTestimonials([
                    ...draftTestimonials,
                    {
                      id: `test-${Date.now()}`,
                      name: 'Peserta Baru',
                      role: 'Profesi',
                      rating: 5,
                      quote: 'Kutipan testimoni hasil belajar.',
                      photo: { source: 'tautan', value: '' },
                      order: draftTestimonials.length + 1,
                      isVisible: true,
                    },
                  ]);
                  setHasChanges(true);
                }}
                className="h-9 px-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah</span>
              </button>
            </div>
            <div className="space-y-4">
              {draftTestimonials.map((t, idx) => (
                <div key={t.id} className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1120] border border-slate-200/70 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <input
                      type="text"
                      value={t.name}
                      onChange={(e) => {
                        const updated = [...draftTestimonials];
                        updated[idx].name = e.target.value;
                        setDraftTestimonials(updated);
                        setHasChanges(true);
                      }}
                      className="flex-1 h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131C31] text-sm font-semibold"
                    />
                    <input
                      type="text"
                      value={t.role}
                      onChange={(e) => {
                        const updated = [...draftTestimonials];
                        updated[idx].role = e.target.value;
                        setDraftTestimonials(updated);
                        setHasChanges(true);
                      }}
                      className="w-36 h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131C31] text-xs font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setDraftTestimonials(draftTestimonials.filter((_, i) => i !== idx));
                        setHasChanges(true);
                      }}
                      className="p-1.5 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <AutoTextarea
                    value={t.quote}
                    onValueChange={(val) => {
                      const updated = [...draftTestimonials];
                      updated[idx].quote = val;
                      setDraftTestimonials(updated);
                      setHasChanges(true);
                    }}
                  />
                  <ImageField
                    label="Foto Testimoni"
                    image={t.photo}
                    onChange={(img) => {
                      const updated = [...draftTestimonials];
                      updated[idx].photo = img;
                      setDraftTestimonials(updated);
                      setHasChanges(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BONUS */}
        {activeSubtab === 'bonuses' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">Daftar Bonus</span>
              <button
                type="button"
                onClick={() => {
                  setDraftBonuses([
                    ...draftBonuses,
                    {
                      id: `bon-${Date.now()}`,
                      title: 'Bonus Baru',
                      description: 'Rincian bonus.',
                      order: draftBonuses.length + 1,
                      isVisible: true,
                    },
                  ]);
                  setHasChanges(true);
                }}
                className="h-9 px-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah</span>
              </button>
            </div>
            <div className="space-y-3">
              {draftBonuses.map((b, idx) => (
                <div key={b.id} className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1120] border border-slate-200/70 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <input
                      type="text"
                      value={b.title}
                      onChange={(e) => {
                        const updated = [...draftBonuses];
                        updated[idx].title = e.target.value;
                        setDraftBonuses(updated);
                        setHasChanges(true);
                      }}
                      className="flex-1 h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131C31] text-sm font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setDraftBonuses(draftBonuses.filter((_, i) => i !== idx));
                        setHasChanges(true);
                      }}
                      className="p-1.5 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <AutoTextarea
                    value={b.description}
                    onValueChange={(val) => {
                      const updated = [...draftBonuses];
                      updated[idx].description = val;
                      setDraftBonuses(updated);
                      setHasChanges(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        {activeSubtab === 'faqs' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">Pertanyaan FAQ</span>
              <button
                type="button"
                onClick={() => {
                  setDraftFaqs([
                    ...draftFaqs,
                    {
                      id: `faq-${Date.now()}`,
                      question: 'Pertanyaan baru?',
                      answer: 'Jawaban penjelasan.',
                      order: draftFaqs.length + 1,
                      isVisible: true,
                    },
                  ]);
                  setHasChanges(true);
                }}
                className="h-9 px-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah</span>
              </button>
            </div>
            <div className="space-y-3">
              {draftFaqs.map((f, idx) => (
                <div key={f.id} className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1120] border border-slate-200/70 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <input
                      type="text"
                      value={f.question}
                      onChange={(e) => {
                        const updated = [...draftFaqs];
                        updated[idx].question = e.target.value;
                        setDraftFaqs(updated);
                        setHasChanges(true);
                      }}
                      className="flex-1 h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131C31] text-sm font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setDraftFaqs(draftFaqs.filter((_, i) => i !== idx));
                        setHasChanges(true);
                      }}
                      className="p-1.5 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <AutoTextarea
                    value={f.answer}
                    onValueChange={(val) => {
                      const updated = [...draftFaqs];
                      updated[idx].answer = val;
                      setDraftFaqs(updated);
                      setHasChanges(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
