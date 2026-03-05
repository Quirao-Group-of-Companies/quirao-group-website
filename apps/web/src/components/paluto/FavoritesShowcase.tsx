"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLogger } from "@/lib/axiom/client";

const DISHES = [
  { id: 0, label: "Buttered Garlic Shrimp", src: "/images/paluto/showcase 1.jpg" },
  { id: 1, label: "Steamed Blue Crab", src: "/images/paluto/showcase 2.jpg" },
  { id: 2, label: "Buttered Garlic Mixed Seafood", src: "/images/paluto/showcase 3.jpg" },
  { id: 3, label: "Crispy Squid Calamares", src: "/images/paluto/showcase 4.jpg" },
];

export default function FavoritesShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const logger = useLogger();

  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
    // Mandatory Axiom logging
    logger.info("Paluto dish swapped", { dish: DISHES[idx].label });
  };

  /**
   * Calculates the 2D coordinates and animation state for each dish
   * based on its position relative to the active dish index.
   */
  const getPosition = (index: number) => {
    // Determine relative position (0-3) where 0 is the front-most dish
    const diff = (index - activeIdx + 4) % 4;
    
    switch (diff) {
      case 0: // Active Center
        return { x: 0, y: 0, opacity: 1, scale: 1, zIndex: 20 };       
      case 1: // Off-top (moving out)
        return { x: 120, y: -350, opacity: 0, scale: 0.7, zIndex: 10 }; 
      case 2: // Hidden Far Right
        return { x: 350, y: 0, opacity: 0, scale: 0.4, zIndex: 0 };    
      case 3: // Off-bottom (moving in)
        return { x: 120, y: 350, opacity: 0, scale: 0.7, zIndex: 10 };  
      default: 
        return {};
    }
  };

  return (
    <section className="relative w-full min-h-[600px] flex flex-col items-center overflow-hidden bg-white pt-4 pb-16">
      {/* Brand Wordmark Header scaled down */}
      <div className="w-full max-w-xl px-4 mb-16 z-30">
         <Image
          src="/images/logo/paluto/word-mark-logo.png"
          alt="Unli-Paluto Favorites"
          width={640}
          height={320}
          className="object-contain mx-auto"
        />
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 px-8 md:px-16 flex-1">
        {/* Left Side: Buttons scaled down */}
        <div className="flex flex-col gap-4 z-40">
          {DISHES.map((dish) => (
            <button
              type="button"
              key={dish.id}
              onClick={() => handleSelect(dish.id)}
              className={`w-full md:w-72 py-3 px-6 rounded-full font-poppins font-bold text-left uppercase tracking-wider transition-all duration-300 shadow-md ${
                activeIdx === dish.id 
                  ? "bg-paluto-red text-white shadow-lg translate-x-4" 
                  : "bg-qgc-black text-white hover:bg-zinc-800"
              }`}
            >
              <span className="text-base md:text-lg">{dish.label}</span>
            </button>
          ))}
        </div>

        {/* Right Side: The Circular Swapping Stage scaled down */}
        <div className="relative h-[500px] flex flex-col justify-center items-center overflow-visible">
          <div className="relative w-full h-full flex justify-center items-center">
            {DISHES.map((dish, index) => (
              <motion.div
                key={dish.id}
                initial={false}
                animate={getPosition(index)}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 20,
                  zIndex: { delay: 0 } 
                }}
                className="absolute w-[350px] h-[350px] md:w-[550px] md:h-[550px]"
              >
                <div className="relative w-full h-full drop-shadow-[0_25px_40px_rgba(0,0,0,0.25)]">
                  <Image
                    src={dish.src}
                    alt={dish.label}
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Carousel Indicators (Dots) with background pill */}
          <div className="bg-qgc-black/80 backdrop-blur-sm px-4 py-2.5 rounded-full flex items-center gap-2.5 mt-8 z-50 border border-gray-200/50">
            {DISHES.map((dish, index) => (
              <button
                key={`indicator-${dish.id}`}
                type="button"
                onClick={() => handleSelect(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  activeIdx === index 
                    ? 'w-8 bg-paluto-red shadow-md shadow-paluto-red/20' 
                    : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Vertical Red Divider */}
      <div className="absolute left-1/2 top-0 w-[1px] h-full bg-paluto-red/10 -z-10 hidden md:block" />
    </section>
  );
}
