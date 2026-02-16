"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const [menuHeight, setMenuHeight] = useState(0);

  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.scrollHeight);
    }
  }, [menuRef, menuOpen]);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-qgc-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center transition-all duration-300">
        <div className="flex items-center justify-between md:justify-start w-full md:w-auto">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo/qgc-logo-black.png"
              alt="Company Logo"
              width={160}
              height={40}
              className="object-contain"
            />
          </Link>

          <div className="md:hidden">
            <button
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <ul
          ref={menuRef}
          style={{ maxHeight: menuOpen ? `${menuHeight}px` : "0px" }}
          className="flex flex-col md:flex-row md:justify-end md:items-center w-full md:w-auto gap-10 text-qgc-black overflow-hidden transition-[max-height] duration-300 md:max-h-full md:overflow-visible mt-4 md:mt-0"
        >
          <li>
            <Link href="/subsidiaries" className="block px-6 py-3 md:p-0 hover:text-gray-500" onClick={() => setMenuOpen(false)}>Subsidiaries</Link>
          </li>
          <li>
            <Link href="/newsroom" className="block px-6 py-3 md:p-0 hover:text-gray-500" onClick={() => setMenuOpen(false)}>Newsroom</Link>
          </li>
          <li>
            <Link href="/careers" className="block px-6 py-3 md:p-0 hover:text-gray-500" onClick={() => setMenuOpen(false)}>Careers</Link>
          </li>
          <li>
            <Link href="/about" className="block px-6 py-3 md:p-0 hover:text-gray-500" onClick={() => setMenuOpen(false)}>About Us</Link>
          </li>
          <li>
            <Link href="/contact" className="block md:inline-block bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 m-3 md:m-0" onClick={() => setMenuOpen(false)}>Contact Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
