'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaFacebookMessenger, FaInstagram, FaViber } from 'react-icons/fa';
export default function Footer() {
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
        <div className="flex flex-col gap-4">
          <Image
            src="/images/logo/qgc-logo-black.png"
            alt="Quirao Group Logo"
            width={160}
            height={60}
            className="object-contain"
          />
          <p className="text-gray-700 text-sm">
            3/F Fancom Bldg.,
            <br />
            Huervana St. Burgos-Mabini
            <br />
            La Paz, Iloilo City
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 flex-1">
          <div>
            <h3 className="text-qgc-black font-semibold mb-4">Subsidiaries</h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-black transition">
                  Buildmaster
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black transition">
                  Paluto
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black transition">
                  Brightline
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black transition">
                  Watergate
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black transition">
                  Sari-sari Manokan
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsroom */}
          <div>
            <h3 className="text-qgc-black font-semibold mb-4">Newsroom</h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-black transition">
                  Press Releases
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black transition">
                  Events
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Careers */}
          <div>
            <h3 className="text-qgc-black font-semibold mb-4">Careers</h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-black transition">
                  Open Positions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black transition">
                  Internships
                </Link>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-qgc-black font-semibold mb-4">About Us</h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-black transition">
                  Company
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black transition">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black transition">
                  Mission & Vision
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-qgc-black font-semibold mb-4">Contact Us</h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-black transition">
                  Email
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black transition">
                  Phone
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black transition">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
