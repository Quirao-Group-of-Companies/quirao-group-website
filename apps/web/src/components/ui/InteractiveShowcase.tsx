'use client';

import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';
import type { Business } from '@/types/homepage';
import Button from './Button';

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

          {/* CTA Button - Always left-aligned with content */}
          {currentItem.cta?.href && (
            <div className="mt-auto pt-10 flex justify-start">
              <Button
                href={currentItem.cta.href}
                text={currentItem.cta.title}
                className="h-10 px-6 py-2 w-max"
              />
            </div>
          )}
        </div>
      </div>

      {/* THUMBNAIL SELECTORS */}
      <div className="flex flex-col sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {items.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setActiveItem(item)}
            className={`cursor-pointer relative w-full h-40 md:h-48 rounded-lg overflow-hidden group transition-all duration-300 ${
              currentItem.id === item.id ? 'ring-4 ring-black scale-105 z-10' : 'hover:scale-105'
            }`}
          >
            {item.cardImage && (
              <Image
                src={item.cardImage}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-500"
              />
            )}

            <div
              className={`absolute inset-0 flex items-center justify-center p-4 transition-colors duration-300 ${
                currentItem.id === item.id ? 'bg-black/20' : 'bg-black/40 group-hover:bg-black/20'
              }`}
            >
              {item.logo && (
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={100}
                  height={60}
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
