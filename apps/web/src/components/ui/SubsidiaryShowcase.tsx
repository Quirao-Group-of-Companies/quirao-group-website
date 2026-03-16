'use client';

import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';
import type { Business } from '@/types/homepage';

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

  if (!items || items.length === 0) {
    return null;
  }

  const currentItem = activeItem || items[0];

  return (
    <section className="bg-white px-6 py-20">
      <h2 className="text-4xl text-qgc-black font-bold mb-16 font-akrux uppercase">{title}</h2>

      {/* Active Item Display */}
      <div
        className={`flex flex-col ${imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 mb-12 items-stretch`}
      >
        {/* MAIN IMAGE */}
        <div className="md:w-1/2 h-64 md:h-100 relative rounded-lg overflow-hidden shadow-lg shrink-0">
          {currentItem.image && (
            <Image src={currentItem.image} alt={currentItem.name} fill className="object-cover" />
          )}
        </div>

        {/* CONTENT AREA */}
        <div className="md:w-1/2 text-qgc-black px-4 py-4 flex flex-col text-left">
          <div className="space-y-6">
            {/* LOGO IMAGE - Always left-aligned with content */}
            {currentItem.logo && (
              <div className="flex justify-start mb-4">
                <Image
                  src={currentItem.logo}
                  alt={currentItem.name}
                  width={100}
                  height={50}
                  className="object-contain"
                />
              </div>
            )}

            {currentItem.description && (
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-left">
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
        </div>
      </div>

      {/* THUMBNAIL SELECTORS */}
      <div className="mt-16 w-full">
        <div className="max-w-[95vw] mx-auto bg-qgc-white shadow-lg shadow-gray-500 rounded-3xl p-10 md:p-5 border border-gray-50">
          <div className="flex flex-wrap justify-center gap-10 md:gap-20">
            {items.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="cursor-pointer group transition-all duration-300 outline-none"
              >
                <div
                  className={`relative flex items-center justify-center transition-all duration-500 ${
                    currentItem.id === item.id
                      ? 'scale-125'
                      : 'opacity-60 hover:opacity-100 hover:scale-110'
                  }`}
                >
                  {item.logo && (
                    <Image
                      src={item.logo}
                      alt={item.name}
                      width={140}
                      height={70}
                      className="object-contain"
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
