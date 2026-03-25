'use client';

import type { StrapiCard } from '@cms/types';
import {
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  HomeModernIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

// Custom icon for Ship as it's not in Heroicons
const ShipIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    <path d="M19.38 20 21 7l-8 2-10-1 1 12Z" />
    <path d="M13 9V4a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v5" />
  </svg>
);

const ICONS = [
  HomeModernIcon, // Warehouse
  WrenchScrewdriverIcon, // Construction
  BuildingStorefrontIcon, // Store
  BuildingOffice2Icon, // Buildings
  ShipIcon, // Ship
];

interface DeliverySectionProps {
  features: StrapiCard[];
}

export default function DeliverySection({ features }: DeliverySectionProps) {
  // Ensure we always work with exactly 5 features if possible, or up to 5
  const displayFeatures = features.slice(0, 5);

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
      setCurrent((prev) => (prev + 1) % (displayFeatures.length || 1));
    }, 5000);
  }, [displayFeatures.length, stopTimer]);

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
      setCurrent((prev) => (prev + 1) % displayFeatures.length);
    } else if (isRightSwipe) {
      setCurrent((prev) => (prev - 1 + displayFeatures.length) % displayFeatures.length);
    }
    startTimer();
  };

  return (
    <div className="w-full">
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
          {displayFeatures.map((feature, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <div key={feature.id} className="min-w-full px-2">
                <div className="bg-white rounded-2xl p-10 flex flex-col items-center justify-center text-center shadow-lg border border-white">
                  <div className="mb-6 w-20 h-20 flex items-center justify-center">
                    <Icon className="w-16 h-16 text-[#ff6600]" />
                  </div>
                  <span className="font-bold text-xl text-qgc-black uppercase font-poppins leading-tight">
                    {feature.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {displayFeatures.map((feature, idx) => (
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
        {displayFeatures.map((feature, idx) => {
          const Icon = ICONS[idx % ICONS.length];
          return (
            <div
              key={feature.id}
              className="bg-white rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-lg border border-white hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4 w-12 h-12 flex items-center justify-center">
                <Icon className="w-10 h-10 text-[#ff6600]" />
              </div>
              <span className="font-bold text-sm md:text-base text-qgc-black uppercase font-poppins leading-tight">
                {feature.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
