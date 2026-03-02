'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [subsOpen, setSubsOpen] = useState(false);

  const menuRef = useRef<HTMLUListElement>(null);
  const [menuHeight, setMenuHeight] = useState(0);

  useEffect(() => {
    if (menuRef.current && menuOpen) {
      setMenuHeight(menuRef.current.scrollHeight);
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      setSubsOpen(false);
    }
  }, [menuOpen]);

  return (
    <header className="w-full fixed top-0 left-0 z-50 px-5 bg-qgc-white h-20 shadow-sm">
      <nav className="flex flex-col md:py-5 md:flex-row justify-center items-center gap-2 w-full md:w-auto text-qgc-black">
        <div className="flex md:mt-0 mt-5 items-center justify-between md:justify-start h-full w-full md:w-auto">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo/qgc-logo-black.png"
              alt="Company Logo"
              width={160}
              height={40}
              className="object-contain mr-10"
            />
          </Link>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="btn btn-ghost btn-circle text-black"
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <title>Close Menu</title>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <title>Open Menu</title>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <ul
          ref={menuRef}
          style={{
            maxHeight: menuOpen ? `${menuHeight}px` : undefined,
          }}
          className={`flex flex-col md:flex-row items-start md:items-center w-full md:w-auto gap-2 md:gap-12 bg-qgc-white overflow-hidden ${menuOpen ? 'max-h-full' : 'max-h-0'} transition-[max-height] duration-300 ease-in-out md:max-h-none md:overflow-visible ${menuOpen ? 'border-t border-gray-200 mt-3 pt-3' : ''}`}
        >
          {/* Subsidiaries */}
          <li className="relative group w-full md:w-auto">
            <button
              type="button"
              onClick={() => setSubsOpen(!subsOpen)}
              className="relative flex justify-between items-center w-full px-6 py-3 md:p-0 text-qgc-black hover:text-gray-500"
            >
              <span>Subsidiaries</span>

              <svg
                className={`w-4 h-4 transition-transform duration-300 md:hidden ${
                  subsOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <title>Toggle Subsidiaries</title>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <ul
              className={`md:absolute md:left-0 md:top-full md:mt-4 md:w-56 bg-white shadow-lg rounded-md md:opacity-0 md:invisible md:group-hover:opacity-100 md:group-hover:visible transition-all duration-300 z-50 overflow-hidden ${subsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} md:max-h-none md:opacity-100`}
            >
              {[
                { name: 'Buildmaster', href: '/subsidiaries/buildmaster' },
                { name: 'Paluto', href: '/subsidiaries/paluto' },
                { name: 'Brightline', href: '/subsidiaries/brightline' },
                { name: 'Sari-sari Manokan', href: '/subsidiaries/sarisari-manokan' },
                { name: 'Watergate', href: '/subsidiaries/watergate' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      setMenuOpen(false);
                      setSubsOpen(false);
                    }}
                    className="block px-6 md:px-4 py-3 text-sm hover:bg-gray-100 pl-10 md:pl-4"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Other Links */}
          {[
            { href: '/newsroom', label: 'Newsroom' },
            { href: '/careers', label: 'Careers' },
            { href: '/about', label: 'About Us' },
            { href: '/contact', label: 'Contact Us' },
          ].map((link) => (
            <li key={link.href} className="w-full md:w-auto">
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-3 md:p-0 text-qgc-black hover:text-gray-500"
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Search */}
          {/* <li className="w-full md:w-auto flex items-center px-6 py-3 md:p-0">
            <div
              className={`flex items-center transition-all duration-300 ${
                searchOpen ? 'w-40 opacity-100 mr-3' : 'w-0 opacity-0'
              } overflow-hidden`}
            >
              <input
                type="text"
                placeholder="Search..."
                className="w-full border-b border-gray-400 focus:outline-none text-sm px-2 py-1"
              />
            </div>

            <button type="submit" onClick={() => setSearchOpen(!searchOpen)}>
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
          </li> */}

        </ul>
      </nav>
    </header>
  );
}
