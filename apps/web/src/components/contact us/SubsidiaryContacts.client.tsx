'use client';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import type { Business } from '@/types/homepage';
import Button from '@/components/ui/Button.client';

interface SubsidiaryContactsProps {
  businesses: Business[];
  imagePosition?: 'left' | 'right';
}

export default function SubsidiaryContacts({
  businesses,
  imagePosition = 'left',
}: SubsidiaryContactsProps) {
  const [activeBusiness, setActiveBusiness] = useState(businesses?.[0]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!businesses || businesses.length === 0) return;
    const index = businesses.findIndex((b) => b.id === activeBusiness?.id);
    if (index !== -1) setActiveIndex(index);
  }, [activeBusiness, businesses]);

  if (!businesses || businesses.length === 0) {
    return null;
  }

  const currentBusiness = activeBusiness || businesses[0];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      if (index !== activeIndex && businesses[index]) {
        setActiveIndex(index);
        setActiveBusiness(businesses[index]);
      }
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-white px-6 py-20">
      <h2 className="text-4xl text-qgc-black font-bold mb-16 font-akrux uppercase">
        Our Subsidiaries
      </h2>

      {/* Desktop View: Active Business */}
      <div
        className={`hidden md:flex ${
          imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
        } gap-12 mb-12 items-stretch`}
      >
        {/* MAIN IMAGE */}
        <div className="md:w-1/2 h-64 md:h-100 relative rounded-lg overflow-hidden shadow-lg shrink-0">
          {currentBusiness.image && (
            <Image
              src={currentBusiness.image}
              alt={currentBusiness.name}
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* CONTENT AREA */}
        <div className="md:w-1/2 text-qgc-black px-4 py-4 flex flex-col text-left">
          <div className="space-y-6">
            {currentBusiness.logo && (
              <div className="flex justify-start mb-4">
                <Image
                  src={currentBusiness.logo}
                  alt={currentBusiness.name}
                  width={200}
                  height={150}
                  className="object-contain"
                />
              </div>
            )}

            {currentBusiness.description && (
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-left">
                {currentBusiness.description}
              </p>
            )}

            {(currentBusiness.address || currentBusiness.contactNum || currentBusiness.email) && (
              <ul className="space-y-4 pt-4 border-t border-gray-100">
                {currentBusiness.address && (
                  <li className="flex items-center gap-3 text-gray-600">
                    <MapPinIcon className="w-5 h-5 text-black shrink-0" />
                    <span className="text-left">{currentBusiness.address}</span>
                  </li>
                )}
                {currentBusiness.contactNum && (
                  <li className="flex items-center gap-3 text-gray-600">
                    <PhoneIcon className="w-5 h-5 text-black shrink-0" />
                    <span className="text-left">{currentBusiness.contactNum}</span>
                  </li>
                )}
                {currentBusiness.email && (
                  <li className="flex items-center gap-3 text-gray-600">
                    <EnvelopeIcon className="w-5 h-5 text-black shrink-0" />
                    <span className="break-all text-left">{currentBusiness.email}</span>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Mobile View: Carousel */}
      <div className="md:hidden relative mb-8">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {businesses.map((b) => (
            <div key={b.id} className="w-full shrink-0 snap-center px-2">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-4 h-95 flex flex-col">
                <div className="h-32 relative shrink-0">
                  {b.image && <Image src={b.image} alt={b.name} fill className="object-cover" />}
                </div>
                <div className="p-5 flex flex-col grow md:gap-3">
                  {b.logo && (
                    <div className="h-30  relative flex items-center justify-center shrink-0">
                      <Image
                        src={b.logo}
                        alt={b.name}
                        width={100}
                        height={60}
                        className="object-contain"
                      />  
                    </div>
                  )}
                  <p className="text-gray-600 text-[11px] line-clamp-2 text-center leading-relaxed">
                    {b.description}
                  </p>

                  {(b.address || b.contactNum || b.email) && (
                    <ul className="space-y-1.5 pt-2 border-t border-gray-50 mt-auto">
                      {b.address && (
                        <li className="flex items-start gap-2 text-sm text-gray-500">
                          <MapPinIcon className="w-3.5 h-3.5 text-black shrink-0" />
                          <span className="line-clamp-1">{b.address}</span>
                        </li>
                      )}
                      {b.contactNum && (
                        <li className="flex items-center gap-2 text-sm text-gray-500">
                          <PhoneIcon className="w-3.5 h-3.5 text-black shrink-0" />
                          <span>{b.contactNum}</span>
                        </li>
                      )}
                      {b.email && (
                        <li className="flex items-center gap-2 text-sm text-gray-500">
                          <EnvelopeIcon className="w-3.5 h-3.5 text-black shrink-0" />
                          <span className="break-all line-clamp-1">{b.email}</span>
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Page Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {businesses.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex ? 'w-6 bg-qgc-black' : 'w-2 bg-gray-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Card Selectors */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {businesses.map((b) => (
          <button
            type="button"
            key={b.id}
            onClick={() => setActiveBusiness(b)}
            className={`cursor-pointer relative w-full h-32 md:h-36 rounded-lg overflow-hidden group transition-all duration-300 ${
              currentBusiness.id === b.id ? 'scale-105 shadow-xl z-10' : 'hover:opacity-100'
            }`}
          >
            {b.cardImage && (
              <Image
                src={b.cardImage}
                alt={b.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            )}

            <div className={`absolute inset-0 transition-opacity duration-300 ${
              currentBusiness.id === b.id ? 'bg-black/20' : 'bg-black/50 group-hover:bg-black/40'
            } flex items-center justify-center`}>
              {b.logo && (
                <Image
                  src={b.logo}
                  alt={b.name}
                  width={140}
                  height={80}
                  className="object-contain"
                />
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
