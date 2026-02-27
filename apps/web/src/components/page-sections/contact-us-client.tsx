'use client';

import Image from 'next/image';
import { useState } from 'react';
import { InquiryForm } from '@/components/forms/inquiry-form';

// --- TYPES ---
interface StrapiImage {
  url: string;
  alternativeText?: string;
}

type StrapiMedia =
  | StrapiImage
  | { data: { attributes: StrapiImage } }
  | { attributes: StrapiImage };

interface ContactInfo {
  id: number;
  subName: string;
  address: string;
  contactNum: string;
  email: string;
  logo?: { image: StrapiMedia };
  cardImage?: StrapiMedia;
  displayImage?: StrapiMedia;
}

interface PageProps {
  initialData: {
    qgcText?: { title: string; description: string };
    qgcContacts?: ContactInfo;
    subsContacts?: ContactInfo[];
  };
}

// --- HELPERS ---
const getImgUrl = (img: StrapiMedia | undefined | null): string | null => {
  if (!img) {
    return null;
  }
  if ('url' in img) {
    return img.url;
  }
  if ('data' in img && img.data?.attributes?.url) {
    return img.data.attributes.url;
  }
  if ('attributes' in img && img.attributes?.url) {
    return img.attributes.url;
  }
  return null;
};

const getAltText = (img: StrapiMedia | undefined | null, fallback: string): string => {
  if (!img) {
    return fallback;
  }
  let text: string | undefined;
  if ('alternativeText' in img) {
    text = img.alternativeText;
  } else if ('data' in img) {
    text = img.data?.attributes?.alternativeText;
  } else if ('attributes' in img) {
    text = img.attributes?.alternativeText;
  }
  return text || fallback;
};

export default function ContactUsClient({ initialData }: PageProps) {
  const subsidiaries = initialData.subsContacts || [];
  const qgcInfo = initialData.qgcContacts;

  // The dynamic section defaults to the first subsidiary
  const [selectedSub, setSelectedSub] = useState<ContactInfo | null>(subsidiaries[0] || null);

  return (
    <div className="container mx-auto px-4">
      {/* SECTION 1: STATIC QGC TOP SECTION */}
      <div className="grid lg:grid-cols-2 gap-20 mb-40 pt-10">
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">
              {initialData.qgcText?.title || 'Contact Us'}
            </h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-md">
              {initialData.qgcText?.description}
            </p>
          </div>

          <div className="space-y-8">
            <h2 className="text-xl font-bold uppercase tracking-widest border-b border-gray-100 pb-2">
              Contact Information
            </h2>
            {qgcInfo && (
              <div className="space-y-5 text-sm md:text-base text-gray-700">
                <div className="flex items-start gap-4">
                  <span className="text-lg">📍</span>
                  <p>{qgcInfo.address}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg">📞</span>
                  <p>{qgcInfo.contactNum}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg">✉️</span>
                  <p className="break-all">{qgcInfo.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">
            Get In Touch With QGC
          </h2>
          <InquiryForm />
        </div>
      </div>

      {/* SECTION 2: DYNAMIC SUBSIDIARY DISPLAY (Matches Image Layout) */}
      {selectedSub && (
        <section className="grid lg:grid-cols-2 gap-16 items-center mb-24 min-h-[500px] border-t border-gray-100 pt-24">
          {/* Left Content Column */}
          <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-700">
            {/* LOGO ON TOP */}
            <div className="relative w-full max-w-[350px] h-24">
              {getImgUrl(selectedSub.logo?.image) ? (
                <Image
                  src={getImgUrl(selectedSub.logo?.image) || ''}
                  alt={getAltText(selectedSub.logo?.image, selectedSub.subName)}
                  fill
                  className="object-contain object-left"
                  priority
                />
              ) : (
                <h2 className="text-4xl font-black uppercase">{selectedSub.subName}</h2>
              )}
            </div>

            {/* CONTACT INFO BELOW LOGO */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold tracking-tight">Contact Information</h3>
              <div className="space-y-5 text-gray-600">
                <div className="flex items-start gap-4">
                  <span className="text-black font-bold">📍</span>
                  <p className="max-w-xs">{selectedSub.address}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-black font-bold">📞</span>
                  <p>{selectedSub.contactNum}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-black font-bold">✉️</span>
                  <p className="break-all">{selectedSub.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE DISPLAY IMAGE */}
          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-700">
            <Image
              src={getImgUrl(selectedSub.displayImage) || '/placeholder.jpg'}
              alt={selectedSub.subName}
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* SECTION 3: SUBSIDIARY CARDS GRID (The Switcher) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-10 border-t border-gray-50">
        {subsidiaries.map((sub) => (
          <button
            key={`sub-card-${sub.id}`}
            type="button"
            onClick={() => {
              setSelectedSub(sub);
            }}
            className={`group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl transition-all duration-500 ${
              selectedSub?.id === sub.id
                ? 'ring-4 ring-black scale-105 z-10'
                : 'opacity-60 hover:opacity-100 hover:scale-105'
            }`}
          >
            {getImgUrl(sub.cardImage) && (
              <Image
                src={getImgUrl(sub.cardImage) || ''}
                alt={sub.subName}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  );
}
