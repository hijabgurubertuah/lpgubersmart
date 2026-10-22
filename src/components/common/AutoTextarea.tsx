/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useRef, useEffect } from 'react';

interface AutoTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onValueChange?: (val: string) => void;
}

export function AutoTextarea({ value, onValueChange, className = '', onChange, ...props }: AutoTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(48, textareaRef.current.scrollHeight)}px`;
    }
  };

  useEffect(() => {
    resize();
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) onChange(e);
    if (onValueChange) onValueChange(e.target.value);
    resize();
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      rows={1}
      className={`w-full resize-none overflow-hidden rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#131C31] px-3.5 py-2.5 text-base text-slate-900 dark:text-[#E5E7EB] placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-colors ${className}`}
      {...props}
    />
  );
}
