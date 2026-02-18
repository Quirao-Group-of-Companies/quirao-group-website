"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

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
      <nav className="flex flex-col py-5 md:flex-row justify-center items-center w-full md:w-auto gap-15 text-qgc-black overflow-hidden transition-[max-height] duration-300 md:max-h-full md:overflow-visible mt-4 md:mt-0">
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
  className={`flex flex-col md:flex-row justify-center items-center w-full md:w-auto gap-15 text-qgc-black overflow-hidden transition-[max-height] duration-300 md:max-h-full md:overflow-visible mt-4 md:mt-0 ${
    menuOpen ? "max-h-125" : "max-h-0"
  }`}
>
  {[
    { href: "/subsidiaries", label: "Subsidiaries" },
    { href: "/newsroom", label: "Newsroom" },
    { href: "/careers", label: "Careers" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ].map((link) => (
    <li key={link.href} className="mb-2 md:mb-0"> {/* spacing below */}
      <Link
        href={link.href}
        onClick={() => setMenuOpen(false)}
        className="
          relative
          block
          px-6 py-3 md:p-0
          text-qgc-black
          hover:text-gray-500
          after:absolute
          after:left-0
          after:-bottom-0.5
          after:h-0.5
          after:w-0
          after:bg-gray-500
          after:transition-all
          after:duration-300
          hover:after:w-full
        "
      >
        {link.label}
      </Link>
    </li>
  ))}

  <li>
    <MagnifyingGlassIcon className="ml-2 w-5 h-5" />
  </li>
</ul>

      </nav>
    </header>
  );
}
