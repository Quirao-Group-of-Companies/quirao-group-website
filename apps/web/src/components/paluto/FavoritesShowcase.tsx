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
        return { x: 150, y: -450, opacity: 0, scale: 0.8, zIndex: 10 }; 
      case 2: // Hidden Far Right
        return { x: 400, y: 0, opacity: 0, scale: 0.5, zIndex: 0 };    
      case 3: // Off-bottom (moving in)
        return { x: 150, y: 450, opacity: 0, scale: 0.8, zIndex: 10 };  
      default: 
        return {};
    }
  };

  return (
    <section className="relative w-full min-h-[800px] flex flex-col items-center overflow-hidden bg-white py-5">
      {/* Brand Wordmark Header */}
      <div className="w-full max-w-2xl px-4 z-30">
         <Image
          src="/images/logo/paluto/word-mark-logo.png"
          alt="Unli-Paluto Favorites"
          width={800}
          height={400}
          className="object-contain mx-auto"
        />
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-8 md:px-16 flex-1">
        {/* Left Side: Buttons */}
        <div className="flex flex-col gap-5 z-40">
          {DISHES.map((dish) => (
            <button
              key={dish.id}
              onClick={() => handleSelect(dish.id)}
              className={`w-full md:w-80 py-4 px-8 rounded-full font-poppins font-bold text-left uppercase tracking-wider transition-all duration-300 shadow-lg ${
                activeIdx === dish.id 
                  ? "bg-paluto-red text-white shadow-xl translate-x-6" 
                  : "bg-qgc-black text-white hover:bg-zinc-800"
              }`}
            >
              {dish.label}
            </button>
          ))}
        </div>

        {/* Right Side: The Circular Swapping Stage */}
        <div className="relative h-[600px] flex justify-center items-center overflow-visible">
          {DISHES.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={false}
              animate={getPosition(index)}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                // Ensure z-index swaps at the right moment
                zIndex: { delay: 0 } 
              }}
              className="absolute w-[400px] h-[400px] md:w-[650px] md:h-[650px]"
            >
              <div className="relative w-full h-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)]">
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
      </div>

      {/* Decorative Vertical Red Divider */}
      <div className="absolute left-1/2 top-0 w-[1px] h-full bg-paluto-red/10 -z-10 hidden md:block" />
    </section>
  );
}
