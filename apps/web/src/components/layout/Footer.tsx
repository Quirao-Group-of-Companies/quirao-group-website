'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaFacebook, FaFacebookMessenger, FaInstagram, FaViber } from 'react-icons/fa';

interface LinkItem {
  label: string;
  href: string;
}

interface SectionProps {
  title: string;
  links: LinkItem[];
}

function FooterSection({ title, links }: SectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 md:border-none">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 md:py-0 md:mb-4 text-qgc-black font-semibold text-left md:cursor-default"
      >
        <span>{title}</span>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-300 md:hidden ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <ul
        className={`
          text-gray-700 space-y-2 text-sm transition-all duration-300
          ${isOpen ? 'max-h-60 pb-4 opacity-100' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'}
        `}
      >
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="hover:text-black transition">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const sections = [
    {
      title: 'Quick Links',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Newsroom', href: '#' },
        { label: 'Careers', href: '#' },
      ],
    },
    {
      title: 'Subsidiaries',
      links: [
        { label: 'Buildmaster', href: '#' },
        { label: 'Paluto', href: '#' },
        { label: 'Brightline', href: '#' },
        { label: 'Watergate', href: '#' },
        { label: 'Sari-sari Manokan', href: '#' },
      ],
    },
    {
      title: 'Contact Us',
      links: [
       { label: '0921381231', href: '#' },
        { label: 'management@quiraogroup.com', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-qgc-white pt-12">
      <div className="px-6 md:px-16">
        <div className="flex justify-center md:justify-end space-x-4 mb-6">
          <Link
            href="https://www.facebook.com/quiraogroup"
            className="w-5 h-5 flex items-center justify-center text-white rounded-full hover:opacity-80 transition"
          >
            <FaFacebook className="w-5 h-5 text-qgc-black" />
          </Link>
          <Link
            href="#"
            className="w-5 h-5 flex items-center justify-center bg-qgc-black text-white rounded-full hover:opacity-80 transition"
          >
            <FaInstagram className="w-3 h-3" />
          </Link>
          <Link
            href="#"
            className="w-5 h-5 flex items-center justify-center bg-qgc-black text-white rounded-full hover:opacity-80 transition"
          >
            <FaFacebookMessenger className="w-3 h-3" />
          </Link>
          <Link
            href="#"
            className="w-5 h-5 flex items-center justify-center bg-qgc-black text-white rounded-full hover:opacity-80 transition"
          >
            <FaViber className="w-3 h-3" />
          </Link>
        </div>

        <hr className="border-gray-300 mb-8" />

        <div className="flex flex-col lg:flex-row lg:justify-between md:gap-80">
          <div className="flex flex-col items-center lg:items-start gap-4 mb-6 lg:mb-0">
            <Image
              src="/images/logo/qgc-logo-black.png"
              alt="Quirao Group Logo"
              width={160}
              height={60}
              className="object-contain"
            />
            <p className="text-gray-700 text-sm text-center lg:text-left">
              3/F Fancom Bldg.,
              <br />
              Huervana St. Burgos-Mabini
              <br />
              La Paz, Iloilo City
            </p>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-3 mr-5 flex-1">
            {sections.map((section) => (
              <FooterSection key={section.title} title={section.title} links={section.links} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-qgc-black w-full py-4 px-6 md:px-16 mt-12">
        <p className="text-white text-[10px] md:text-xs text-right">
          Copyright© 2026 Quirao Group of Companies Inc. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
