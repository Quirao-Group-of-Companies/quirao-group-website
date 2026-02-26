'use client';
import Image from 'next/image';
import { useState } from 'react';
import type { Business } from '@/types/homepage';
import Button from '../ui/Button';

export default function OurBusinessPreview({ businesses }: { businesses: Business[] }) {
  const [activeBusiness, setActiveBusiness] = useState(businesses?.[0]);

  if (!businesses || businesses.length === 0) {
    return null;
  }

  // Fallback if activeBusiness is somehow lost but businesses exists
  const currentBusiness = activeBusiness || businesses[0];

  return (
    <section className="bg-white px-6 py-20">
      <h2 className="text-4xl text-qgc-black font-bold mb-16">Business Preview</h2>

      {/* Active Business */}
      <div className="flex flex-col md:flex-row gap-12 mb-12 bg-qgc-gray-soft">
        {/* MAIN IMAGE */}
        <div className="md:w-1/2 h-64 md:h-100 relative rounded-lg overflow-hidden">
          {currentBusiness.image && (
            <Image
              src={currentBusiness.image}
              alt={currentBusiness.name}
              fill
              className="object-cover"
            />
          )}
        </div>

        <div className="md:w-1/2 text-qgc-black px-4 py-4 flex flex-col gap-6 relative">
          {/* LOGO IMAGE */}
          {currentBusiness.logo && (
            <Image
              src={currentBusiness.logo}
              alt={currentBusiness.name}
              width={150}
              height={80}
              className="object-contain self-center"
            />
          )}

          <p>{currentBusiness.description}</p>

          {currentBusiness.cta?.href && (
            <Button
              href={currentBusiness.cta.href}
              text={currentBusiness.cta.title}
              className="h-10 px-6 py-2 w-max md:absolute bottom-15"
            />
          )}
        </div>
      </div>

      {/* CARD SELECTORS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {businesses.map((b) => (
          <button
            type="button"
            key={b.id}
            onClick={() => setActiveBusiness(b)}
            className="relative w-full h-40 md:h-48 rounded-lg overflow-hidden group"
          >
            {b.cardImage && (
              <Image
                src={b.cardImage}
                alt={b.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            )}

            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              {b.logo && (
                <Image
                  src={b.logo}
                  alt={b.name}
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
