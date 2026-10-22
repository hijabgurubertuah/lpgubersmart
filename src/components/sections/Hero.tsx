/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { ArrowRight } from 'lucide-react';
import { ImageRef } from '../../types';
import { ResolvedImage } from '../common/ResolvedImage';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaHeroText: string;
  ctaWorkText: string;
  mockupImage: ImageRef;
  onCtaClick: () => void;
  onWorkClick: () => void;
}

export function Hero({
  title,
  subtitle,
  ctaHeroText,
  ctaWorkText,
  mockupImage,
  onCtaClick,
  onWorkClick,
}: HeroProps) {
  const hasText = !!title || !!subtitle;

  return (
    <section id="beranda" className="relative pt-6 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      {/* Background soft subtle radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Headline */}
            {title && (
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight leading-[1.15] text-balance">
                {title}
              </h1>
            )}

            {/* Subheadline */}
            {subtitle && (
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}

            {/* CTAs */}
            {hasText && (
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={onCtaClick}
                  className="h-12 px-7 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-lg shadow-orange-500/25 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <span>{ctaHeroText}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={onWorkClick}
                  className="h-12 px-6 rounded-xl border-2 border-slate-300 dark:border-slate-700 hover:border-slate-400 text-slate-800 dark:text-slate-200 font-semibold text-base transition-colors flex items-center justify-center"
                >
                  {ctaWorkText}
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Device Frame Mockup */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              {/* Smartphone frame */}
              <div className="relative rounded-[36px] p-3 bg-slate-900 shadow-2xl border-4 border-slate-800">
                {/* Speaker pill notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-800 rounded-full z-20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-slate-900" />
                </div>
                {/* Screen content */}
                <div className="relative rounded-[28px] overflow-hidden bg-slate-950 aspect-[9/16] max-h-[500px]">
                  {mockupImage?.value ? (
                    <ResolvedImage
                      image={mockupImage}
                      alt="Pratinjau Aplikasi Guber Smart"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-indigo-900/60 to-slate-900 text-slate-300">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl mb-3">
                        GS
                      </div>
                      <span className="font-display font-bold text-base text-white">Guber Smart</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
