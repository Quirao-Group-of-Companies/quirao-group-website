"use client";


import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../components/layout/Navbar";

/* =========================================================
   HERO CAROUSEL SECTION
========================================================= */

/* ---------- Slide Type ---------- */
interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
}

/* ---------- Hero Slide Data ---------- */
const slides: Slide[] = [
  {
    id: 1,
    title: "Quirao Group Of Companies",
    description:
      "A diversified group of companies driving innovation, sustainability, and long-term value.",
    image: "/images/home-page/hero-section/hero-section-background.png",
  },
  {
    id: 2,
    title: "Innovating for the Future",
    description:
      "Leveraging technology and expertise to create lasting impact.",
    image: "/images/home-page/hero-section/hero-section-background2.png",
  },
  {
    id: 3,
    title: "Sustainable and Responsible",
    description:
      "Driving sustainable growth and social responsibility.",
    image: "/images/home-page/hero-section/hero-section-background3.png",
  },
];

/* =========================================================
   BUSINESS SECTION
========================================================= */

/* ---------- Business Type ---------- */
interface Business {
  id: number;
  name: string;
  logo: string;
  topImage: string;
  cardImage: string;
  description: string;
}

/* ---------- Business Data ---------- */
const businesses: Business[] = [
  {
    id: 1,
    name: "Buildmaster PH",
    logo: "/images/logo/buildmaster/buildmaster-logo.png",
    topImage: "/images/home-page/business-preview/buildmaster-business-preview.png",
    cardImage: "/images/home-page/business-preview/buildmaster-business-preview-card.jpg",
    description:
      "BuildMaster Wholesale is a trusted supplier of construction and hardware materials based in Iloilo City, Philippines...",
  },
  {
    id: 2,
    name: "Paluto Seafood",
    logo: "/images/logo/paluto/paluto-logo-white.png",
    topImage: "/images/home-page/business-preview/paluto-business-preview.jpg",
    cardImage: "/images/home-page/business-preview/paluto-business-preview-card.jpg",
    description:
      "Paluto Seafood Grill & Restaurant is owned and managed by Piggly Foods Corporation (PFC)...",
  },
  {
    id: 3,
    name: "Sari-sari Manokan",
    logo: "/images/logo/manokan/sari-sari-manokan-logo.png",
    topImage: "/images/home-page/business-preview/sari-sari-manokan-business-preview.jpg",
    cardImage: "/images/home-page/business-preview/sari-sari-manokan-business-preview-card.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  },
  {
    id: 4,
    name: "Brightline Trucking",
    logo: "/images/logo/brightline/brightline-logo.png",
    topImage: "/images/home-page/business-preview/brightline-business-preview.jpg",
    cardImage: "/images/home-page/business-preview/brightline-business-preview-card.jpg",
    description: "Brightline Trucking is a service company engaged in hauling general cargo, offices & warehouses.",
  },
  {
    id: 5,
    name: "Watergate ",
    logo: "/images/logo/watergate/watergate-logo.png",
    topImage: "/images/home-page/business-preview/watergate-business-preview.jpg",
    cardImage: "/images/home-page/business-preview/watergate-business-preview-card.jpg",
    description: "Welcome to the official Watergate Purified Drinking Water page! Join our community as we provide safe and affordable bottled drinking water to Filipinos anytime, and anywhere.",
  },
];

/* =========================================================
   MAIN LANDING PAGE COMPONENT
========================================================= */

export default function Home() {
  /* ---------- Hero State ---------- */
  const [current, setCurrent] = useState(0);

  /* ---------- Active Business State ---------- */
  const [activeBusiness, setActiveBusiness] = useState<Business>(
    businesses[0]
  );

  /* ---------- Auto Slide Effect ---------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* =====================================================
         HERO CAROUSEL
      ===================================================== */}
      <Navbar/>
      <section className="relative h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {slide.title}
              </h1>
              <p className="text-white text-lg md:text-xl mb-6 max-w-2xl">
                {slide.description}
              </p>
              <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                Learn More
              </button>
            </div>
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                idx === current ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* =====================================================
         WHAT WE DO SECTION
      ===================================================== */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
          {/* Image */}
          <div className="md:w-1/3">
            <Image
              src="/images/home-page/what-we-do-section/what-we-do.png"
              alt="What We Do"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Text */}
          <div className="md:w-1/2 flex flex-col gap-6">
            <h2 className="text-4xl font-bold text-gray-800">
              What We Do
            </h2>
            <p className="text-gray-600 text-lg">
              We provide innovative solutions that help businesses grow
              and thrive in the digital world.
            </p>
            <button className="w-40 px-4 py-2 rounded-md bg-black text-white">
              Read More
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
         OUR BUSINESS SECTION
      ===================================================== */}
      <section className="bg-white px-6 py-20">
        <h2 className="text-4xl text-qgc-black font-bold mb-16">
          Business Preview
        </h2>

        {/* Active Business Preview */}
        <div className="flex flex-col md:flex-row gap-12 mb-12">
          <div className="md:w-1/2 h-64 md:h-[400px] relative rounded-lg overflow-hidden">
            <Image
              src={activeBusiness.topImage}
              alt={activeBusiness.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="md:w-1/2 text-qgc-black flex flex-col gap-6">
            <Image
              src={activeBusiness.logo}
              alt={activeBusiness.name}
              width={160}
              height={60}
              className="object-contain"
            />
            <p>{activeBusiness.description}</p>
            <button className="bg-qgc-black text-white px-6 py-2 rounded-lg w-max">
              Read More
            </button>
          </div>
        </div>

        {/* Business Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {businesses.map((b) => (
            <div
              key={b.id}
              onClick={() => setActiveBusiness(b)}
              className="relative w-full  h-40 md:h-48 rounded-lg overflow-hidden cursor-pointer group"
            >
              <Image
                src={b.cardImage}
                alt={b.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Image
                  src={b.logo}
                  alt={b.name}
                  width={60}
                  height={30}
                />

              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
