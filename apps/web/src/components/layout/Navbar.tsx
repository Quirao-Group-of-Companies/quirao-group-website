"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="w-full absolute top-0 left-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* LEFT: Company Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logos/company-logo.png"
            alt="Company Logo"
            width={160}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* RIGHT: Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 text-white font-medium">
          <li>
            <Link href="/subsidiaries" className="hover:text-gray-300 transition">
              Subsidiaries
            </Link>
          </li>
          <li>
            <Link href="/newsroom" className="hover:text-gray-300 transition">
              Newsroom
            </Link>
          </li>
          <li>
            <Link href="/careers" className="hover:text-gray-300 transition">
              Careers
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-gray-300 transition">
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
