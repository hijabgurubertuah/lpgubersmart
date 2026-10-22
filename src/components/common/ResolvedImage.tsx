/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { useState, useEffect } from 'react';
import { StorageService } from '../../services/storageService';
import { ImageRef } from '../../types';

interface ResolvedImageProps {
  image?: ImageRef;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export function ResolvedImage({ image, alt, className = '', loading = 'lazy' }: ResolvedImageProps) {
  const [src, setSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    if (!image || !image.value) {
      setSrc('');
      setIsLoading(false);
      setIsError(true);
      return;
    }

    setIsLoading(true);
    setIsError(false);

    if (image.source === 'tautan') {
      setSrc(image.value);
      setIsLoading(false);
    } else {
      StorageService.resolveImageSrc(image)
        .then((resolved) => {
          if (isMounted) {
            if (resolved) {
              setSrc(resolved);
              setIsError(false);
            } else {
              setIsError(true);
            }
            setIsLoading(false);
          }
        })
        .catch(() => {
          if (isMounted) {
            setIsError(true);
            setIsLoading(false);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [image?.source, image?.value]);

  if (isLoading) {
    return <div className={`bg-slate-200 dark:bg-slate-800 animate-pulse ${className}`} />;
  }

  if (isError || !src) {
    return (
      <div className={`bg-slate-100 dark:bg-slate-800/60 border border-slate-200/40 dark:border-slate-800 flex items-center justify-center ${className}`}>
        <svg className="w-8 h-8 text-slate-400 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setIsError(true)}
      className={className}
    />
  );
}
