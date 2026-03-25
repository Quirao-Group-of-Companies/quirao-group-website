'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { StrapiCard } from '@cms/types';
import ScrollReveal from '@/components/ScrollReveal.client';

interface DeliverySectionProps {
  features: StrapiCard[];
}

export default function DeliverySection({ features }: DeliverySectionProps) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  // Auto-scroll logic
  const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % features.length);
    }, 5000);
  }, [features.length, stopTimer]);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [startTimer, stopTimer]);

  // Swipe logic
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    stopTimer();
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrent((prev) => (prev + 1) % features.length);
    } else if (isRightSwipe) {
      setCurrent((prev) => (prev - 1 + features.length) % features.length);
    }
    startTimer();
  };

  const getImageUrl = (url?: string) => {
    if (!url) {
      return '';
    }
    return url.replace(/([^:]\/)\/+/g, '$1');
  };

  return (
    <ScrollReveal>
      <section className="bg-qgc-gray-soft py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl italic md:text-5xl font-black uppercase font-poppins tracking-tighter text-qgc-black">
              WHERE WE <span className="text-brightline-orange underline decoration-qgc-black underline-offset-8">DELIVER</span>
            </h2>
          </div>

          {/* Mobile Carousel View */}
          <div
            className="md:hidden relative overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {features.map((feature) => (
                <div key={feature.id} className="min-w-full px-2">
                  <div className="bg-white rounded-2xl p-10 flex flex-col items-center justify-center text-center shadow-lg border border-white">
                    <div className="mb-6 w-20 h-20 flex items-center justify-center">
                      {feature.icon?.[0]?.url ? (
                        <Image
                          src={getImageUrl(feature.icon[0].url)}
                          alt={feature.icon[0].alternativeText || feature.title || 'Feature Icon'}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      ) : (
                        <svg
                          width="64"
                          height="64"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-red-600"
                        >
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z M9 22V12h6v10" />
                        </svg>
                      )}
                    </div>
                    <span className="font-bold text-xl text-qgc-black uppercase font-poppins leading-tight">
                      {feature.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {features.map((feature, idx) => (
                <button
                  type="button"
                  key={`dot-${feature.id}`}
                  onClick={() => {
                    setCurrent(idx);
                    startTimer();
                  }}
                  className={`h-3 rounded-full transition-all duration-500 ease-in-out ${
                    idx === current ? 'w-10 bg-brightline-orange' : 'w-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid View */}
          <div className="hidden md:grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-lg border border-white hover:scale-105 transition-transform duration-300"
              >
                <div className="mb-4 w-12 h-12 flex items-center justify-center">
                  {feature.icon?.[0]?.url ? (
                    <Image
                      src={getImageUrl(feature.icon[0].url)}
                      alt={feature.icon[0].alternativeText || feature.title || 'Feature Icon'}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  ) : (
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-600"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z M9 22V12h6v10" />
                    </svg>
                  )}
                </div>
                <span className="font-bold text-sm md:text-base text-qgc-black uppercase font-poppins leading-tight">
                  {feature.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
