"use client";

import { useEffect, useState } from "react";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Quirao Group Of Companies",
    description: "A diversified group of companies driving innovation, sustainability, and long-term value.",
    image: "/images/home-page/hero-section/hero-section-background.png",
  },
  {
    id: 2,
    title: "Innovating for the Future",
    description: "Leveraging technology and expertise to create lasting impact.",
    image: "/images/home-page/hero-section/hero-section-background2.png",
  },
  {
    id: 3,
    title: "Sustainable and Responsible",
    description: "Driving sustainable growth and social responsibility.",
    image: "/images/home-page/hero-section/hero-section-background3.png",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight">
              {slide.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white mb-6 max-w-2xl">
              {slide.description}
            </p>
            <button className="bg-white text-black px-5 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-gray-200 transition text-sm sm:text-base">
              Learn More
            </button>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
              idx === current ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </section>
  );
}
