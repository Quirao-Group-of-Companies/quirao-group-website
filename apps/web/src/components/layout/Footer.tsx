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
          text-gray-700 space-y-2 text-sm overflow-hidden transition-all duration-300
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
      title: 'Newsroom',
      links: [
        { label: 'Press Releases', href: '#' },
        { label: 'Events', href: '#' },
        { label: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Careers',
      links: [
        { label: 'Open Positions', href: '#' },
        { label: 'Internships', href: '#' },
      ],
    },
    {
      title: 'About Us',
      links: [
        { label: 'Company', href: '#' },
        { label: 'Leadership', href: '#' },
        { label: 'Mission & Vision', href: '#' },
      ],
    },
    {
      title: 'Contact Us',
      links: [
        { label: 'Email', href: '#' },
        { label: 'Phone', href: '#' },
        { label: 'Support', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-qgc-white px-6 md:px-16 py-12">
      <div className="flex justify-end space-x-4 mb-6">
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

      <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
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

        <div className="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-5 gap-0 md:gap-8 flex-1">
          {sections.map((section) => (
            <FooterSection key={section.title} title={section.title} links={section.links} />
          ))}
        </div>
      </div>
    </footer>
  );
}
