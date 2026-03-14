'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Blog } from '@/app/data/homepage-data';
import Button from '@/components/ui/Button.client';

interface LatestNewsProps {
  blogs: Blog[];
}

export default function LatestNews({ blogs }: LatestNewsProps) {
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
      setCurrent((prev) => (prev + 1) % blogs.length);
    }, 5000);
  }, [blogs.length, stopTimer]);

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
      setCurrent((prev) => (prev + 1) % blogs.length);
    } else if (isRightSwipe) {
      setCurrent((prev) => (prev - 1 + blogs.length) % blogs.length);
    }
    startTimer();
  };

  return (
    <section className="bg-white px-6 py-24">
      <h2 className="text-4xl font-bold text-center text-qgc-black mb-16 font-akrux">
        Latest News
      </h2>

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
          {blogs.map((blog) => (
            <div key={blog.id} className="min-w-full px-2">
              <div className="flex flex-col bg-qgc-gray-soft rounded-xl overflow-hidden shadow-md">
                {/* Image */}
                <div className="relative w-full h-64">
                  <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
                    <h3 className="text-md font-semibold text-qgc-black mb-4 font-akrux">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{blog.description}</p>
                  </div>

                  <Button text="Read More" className="mt-6 px-6 py-3 text-sm w-fit" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {blogs.map((blog, idx) => (
            <button
              type="button"
              key={`dot-${blog.id}`}
              onClick={() => {
                setCurrent(idx);
                startTimer();
              }}
              className={`h-3 rounded-full transition-all duration-500 ease-in-out ${
                idx === current ? 'w-10 bg-qgc-black' : 'w-3 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="flex flex-col md:flex-row bg-qgc-gray-soft rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            {/* Image */}
            <div className="relative w-full md:w-1/2 h-64 md:h-auto">
              <Image src={blog.image} alt={blog.title} fill className="object-cover" />
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col justify-between md:w-1/2">
              <div>
                <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
                <h3 className="text-md font-semibold text-qgc-black mb-4 font-akrux">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{blog.description}</p>
              </div>

              <Button text="Read More" className="mt-6 px-6 py-3 text-sm w-fit" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
