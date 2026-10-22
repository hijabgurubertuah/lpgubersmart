/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react';
import { PortfolioItem, PortfolioCategory } from '../../types';
import { ResolvedImage } from '../common/ResolvedImage';

interface KaryaProps {
  portfolio: PortfolioItem[];
}

export function Karya({ portfolio }: KaryaProps) {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('Semua');
  const [previewItem, setPreviewItem] = useState<PortfolioItem | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const categories: PortfolioCategory[] = ['Semua', 'Website', 'Toko', 'Administrasi'];

  const filteredItems = portfolio
    .filter((item) => item.isVisible)
    .filter((item) => (activeCategory === 'Semua' ? true : item.category === activeCategory))
    .sort((a, b) => a.order - b.order);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="karya" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#0B1120]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              Karya Nyata Peserta
            </h2>
          </div>

          {/* Arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              aria-label="Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              aria-label="Berikutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`h-10 px-4 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel / Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 scroll-smooth"
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setPreviewItem(item)}
              className="w-[280px] sm:w-[320px] shrink-0 snap-start group cursor-pointer rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/50 transition-all hover:shadow-lg"
            >
              <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
                <ResolvedImage
                  image={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 block mb-1">
                  {item.category}
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white truncate">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Preview */}
      {previewItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white dark:bg-[#131C31] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {previewItem.category}
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  {previewItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-[16/10] bg-slate-900 overflow-hidden">
              <ResolvedImage
                image={previewItem.image}
                alt={previewItem.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
