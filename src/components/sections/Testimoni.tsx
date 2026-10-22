/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TestimonialItem } from '../../types';
import { ResolvedImage } from '../common/ResolvedImage';

interface TestimoniProps {
  testimonials: TestimonialItem[];
}

export function Testimoni({ testimonials }: TestimoniProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const visibleItems = testimonials.filter((t) => t.isVisible).sort((a, b) => a.order - b.order);

  if (visibleItems.length === 0) return null;

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="testimoni" className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-[#0B1120]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              Cerita Sukses Alumni
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Berikutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 scroll-smooth"
        >
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="w-[300px] sm:w-[360px] shrink-0 snap-start p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0">
                  <ResolvedImage
                    image={item.photo}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
