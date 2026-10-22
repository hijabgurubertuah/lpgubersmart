/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useEffect, useState, useRef } from 'react';
import { StatItem } from '../../types';

interface BarAngkaProps {
  stats: StatItem[];
}

export function BarAngka({ stats }: BarAngkaProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const visibleStats = stats.filter((s) => s.isVisible).sort((a, b) => a.order - b.order);

  return (
    <section ref={containerRef} className="py-8 bg-indigo-600 text-white shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-indigo-500/40">
          {visibleStats.map((item, idx) => (
            <div key={item.id} className={`${idx > 0 && idx % 2 === 0 ? 'pt-4 md:pt-0' : ''} px-2`}>
              <AnimatedStatNumber item={item} trigger={isVisible} />
              <p className="mt-1 text-sm md:text-base font-medium text-indigo-100">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedStatNumber({ item, trigger }: { item: StatItem; trigger: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const duration = 1200;
    const steps = 30;
    const increment = item.numericTarget / steps;
    let current = 0;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= item.numericTarget) {
        setCount(item.numericTarget);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [trigger, item.numericTarget]);

  const formatted = item.numericTarget >= 1000
    ? Math.floor(count).toLocaleString('id-ID')
    : item.numericTarget % 1 !== 0
    ? count.toFixed(1).replace('.', ',')
    : Math.floor(count);

  return (
    <span className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight tabular-nums">
      {item.prefix}
      {trigger ? formatted : '0'}
      {item.suffix}
    </span>
  );
}
