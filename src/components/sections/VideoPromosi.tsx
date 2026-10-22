/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

interface VideoPromosiProps {
  videoUrl: string;
}

export function VideoPromosi({ videoUrl }: VideoPromosiProps) {
  if (!videoUrl || !videoUrl.trim()) return null;

  // Convert watch URL to embed URL if needed
  let embedUrl = videoUrl;
  if (embedUrl.includes('watch?v=')) {
    embedUrl = embedUrl.replace('watch?v=', 'embed/');
  } else if (embedUrl.includes('youtu.be/')) {
    embedUrl = embedUrl.replace('youtu.be/', 'www.youtube.com/embed/');
  }

  return (
    <section id="video" className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-[#0B1120]/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Video Pengenalan Program
          </h2>
        </div>

        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-black aspect-video">
          <iframe
            src={embedUrl}
            title="Video Pengenalan Guber Smart"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
