'use client';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Button from './Button.client';

export type Business = {
  id: number;
  name: string;
  description: string;
  image: string | null;
  cardImage: string | null;
  logo: string | null;
  cta: {
    title: string;
    href: string;
  } | null;
};

// Extend Business type to include optional contact info for the reusable component
export interface ShowcaseItem extends Business {
  address?: string | null;
  contactNum?: string | null;
  email?: string | null;
}

interface InteractiveShowcaseProps {
  items: ShowcaseItem[];
  title?: string;
  imagePosition?: 'left' | 'right';
}

export default function InteractiveShowcase({
  items,
  title = 'Showcase',
  imagePosition = 'left',
}: InteractiveShowcaseProps) {
  const [activeItem, setActiveItem] = useState(items?.[0]);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentItem = activeItem || items?.[0];
  const currentIndex = items?.findIndex((item) => item.id === currentItem?.id) ?? -1;

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (currentIndex !== -1) {
      const activeThumb = thumbnailRefs.current[currentIndex];
      if (activeThumb && scrollContainerRef.current) {
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [currentIndex]);

  if (!items || items.length === 0) {
    return null;
  }

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setActiveItem(items[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    setActiveItem(items[nextIndex]);
  };

  return (
    <section className="bg-white px-6 py-20">
      <h2 className="text-4xl font-bold text-center text-qgc-black mb-16 font-akrux">{title}</h2>

      {/* Active Item Display */}
      <div
        className={`flex flex-col ${imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} px-0 md:px-14 gap-10 items-stretch`}
      >
        {/* MAIN IMAGE */}
        <div className="w-full md:w-3/5 h-40 md:h-80 relative rounded-lg overflow-hidden shadow-lg shrink-0 md:self-end">
          {currentItem.image && (
            <Image src={currentItem.image} alt={currentItem.name} fill className="object-cover" />
          )}

          {/* Navigation Chevrons (Mobile Only) */}
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-black/30 text-white p-2 rounded-r-lg hover:bg-black/50 transition-colors"
              aria-label="Previous subsidiary"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center md:hidden">
            <button
              type="button"
              onClick={handleNext}
              className="bg-black/30 text-white p-2 rounded-l-lg hover:bg-black/50 transition-colors"
              aria-label="Next subsidiary"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="md:w-1/2 text-qgc-black px-4 flex flex-col text-left">
          <div className="space-y-6">
            {/* LOGO IMAGE - Always left-aligned with content */}
            {currentItem.logo && (
              <div className="hidden md:flex justify-center mb-0 w-full h-30">
                <Image
                  src={currentItem.logo}
                  alt={currentItem.name}
                  width={100}
                  height={60}
                  className="object-contain"
                />
              </div>
            )}

            {currentItem.description && (
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-left overflow-hidden h-[25vh] md:h-[25vh]">
                {currentItem.description}
              </p>
            )}

            {/* Contact Information with Icons */}
            {(currentItem.address || currentItem.contactNum || currentItem.email) && (
              <ul className="space-y-4 pt-4 border-t border-gray-100">
                {currentItem.address && (
                  <li className="flex items-center gap-3 text-gray-600">
                    <MapPinIcon className="w-5 h-5 text-black shrink-0" />
                    <span className="text-left">{currentItem.address}</span>
                  </li>
                )}
                {currentItem.contactNum && (
                  <li className="flex items-center gap-3 text-gray-600">
                    <PhoneIcon className="w-5 h-5 text-black shrink-0" />
                    <span className="text-left">{currentItem.contactNum}</span>
                  </li>
                )}
                {currentItem.email && (
                  <li className="flex items-center gap-3 text-gray-600">
                    <EnvelopeIcon className="w-5 h-5 text-black shrink-0" />
                    <span className="break-all text-left">{currentItem.email}</span>
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* CTA Button - Always left-aligned with content */}
          {currentItem.cta?.href && (
            <div className=" flex justify-start">
              <Button
                href={currentItem.cta.href}
                text={currentItem.cta.title}
                className="h-10 mt-5 px-6 py-2 w-max"
              />
            </div>
          )}
        </div>
      </div>

      {/* THUMBNAIL SELECTORS */}
      <div className="mt-0 md:mt-5 w-full">
        <div className="w-[90%] md:max-w-6xl mx-auto bg-qgc-white shadow-lg rounded-3xl p-4 md:p-5 border border-gray-50 overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto md:overflow-hidden snap-x snap-mandatory md:justify-center gap-8 md:gap-20 items-center scrollbar-hide py-2"
          >
            {items.map((item, index) => (
              <button
                type="button"
                key={item.id}
                ref={(el) => {
                  thumbnailRefs.current[index] = el;
                }}
                onClick={() => setActiveItem(item)}
                className="cursor-pointer group transition-all duration-100 outline-none flex justify-center shrink-0 snap-center"
              >
                <div
                  className={`relative flex items-center justify-center transition-all duration-200 ${
                    currentItem.id === item.id ? 'scale-110 md:scale-125' : ' hover:scale-110'
                  }`}
                >
                  {item.logo && (
                    <Image
                      src={item.logo}
                      alt={item.name}
                      width={140}
                      height={70}
                      className="object-contain w-24 md:w-36 h-auto"
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
