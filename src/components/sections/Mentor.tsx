/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { MentorProfile } from '../../types';
import { ResolvedImage } from '../common/ResolvedImage';

interface MentorProps {
  mentor: MentorProfile;
}

export function Mentor({ mentor }: MentorProps) {
  if (!mentor || !mentor.name) return null;

  return (
    <section id="mentor" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#0B1120]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Mentor Anda
          </h2>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-8 sm:gap-10">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0 shadow-lg border-2 border-white dark:border-slate-700">
            <ResolvedImage
              image={mentor.photo}
              alt={mentor.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center sm:text-left space-y-3">
            <div>
              <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
                {mentor.name}
              </h3>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                {mentor.title}
              </p>
            </div>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {mentor.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
