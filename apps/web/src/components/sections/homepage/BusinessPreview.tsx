"use client";

import { useState } from "react";
import Image from "next/image";

interface Business {
  id: number;
  name: string;
  logo: string;
  topImage: string;
  cardImage: string;
  description: string;
}

const businesses: Business[] = [
  {
    id: 1,
    name: "Buildmaster PH",
    logo: "/images/logo/buildmaster/buildmaster-logo.png",
    topImage: "/images/home-page/business-preview/buildmaster-business-preview.png",
    cardImage: "/images/home-page/business-preview/buildmaster-business-preview-card.jpg",
    description: "BuildMaster Wholesale is a trusted supplier of construction and hardware materials based in Iloilo City, Philippines, offering top-quality products at affordable prices. With fast and reliable delivery, BuildMaster ensures your projects run smoothly and stay within budget. Our main customers include hardware stores and contractors across Panay and beyond."
  },
  {
    id: 2,
    name: "Paluto Seafood",
    logo: "/images/logo/paluto/paluto-logo-white.png",
    topImage: "/images/home-page/business-preview/paluto-business-preview.jpg",
    cardImage: "/images/home-page/business-preview/paluto-business-preview-card.jpg",
    description: "Paluto Seafood Grill & Restaurant, is owned and managed by Piggly Foods Corporation (PFC). It was established in 2023 and located on Coastal Road, Bitoon Jaro, Iloilo, Philippines. Paluto offers a unique “Sea- to-Table” dining experience. Guests can choose fresh seafood from the tanks and ponds, which is then expertly prepared to order. With a focus on freshness, quality, and authentic flavors, Paluto embodies the rich culinary culture of Iloilo. Whether you’re here to enjoy a family meal or celebrate a special occasion, Paluto promises an unforgettable taste of Iloilo that completes your visit..",
  },
  {
    id: 3,
    name: "Sari-sari Manokan",
    logo: "/images/logo/manokan/sari-sari-manokan-logo.png",
    topImage: "/images/home-page/business-preview/sari-sari-manokan-business-preview.jpg",
    cardImage: "/images/home-page/business-preview/sari-sari-manokan-business-preview-card.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 4,
    name: "Brightline Trucking",
    logo: "/images/logo/logo4.png",
    topImage: "/images/subsidiaries/top4.png",
    cardImage: "/images/subsidiaries/card4.png",
    description: "This is the description for Subsidiary Four.",
  },
  {
    id: 5,
    name: "Subsidiary Five",
    logo: "/images/subsidiaries/logo5.png",
    topImage: "/images/subsidiaries/top5.png",
    cardImage: "/images/subsidiaries/card5.png",
    description: "This is the description for Subsidiary Five.",
  },
];

export default function OurBusiness() {
  const [activeBusiness, setActiveBusiness] = useState<Business>(businesses[0]);

  return (
      <section className="bg-white text-black max-w-1/1 mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-20">Business Preview</h1>
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-12">
        <div className="md:w-1/2 w-full h-64 md:h-[400px] relative rounded-lg overflow-hidden">
          <Image
            src={activeBusiness.topImage}
            alt={activeBusiness.name}
            fill
            className="object-cover w-full h-full"
          />
        </div>

        <div className="md:w-1/2 flex flex-col justify-start gap-4">
          <Image
            src={activeBusiness.logo}
            alt={`${activeBusiness.name} Logo`}
            width={160}
            height={60}
            className="object-contain"
          />
          <p className="text-black">{activeBusiness.description}</p>
          <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition w-max">
            Read More
          </button>
        </div>
      </div>

      {/* Preview Cards */}
      <div className="flex flex-col md:flex-row md:justify-between gap-6">
        {businesses.map((b) => (
          <div
            key={b.id}
            className="relative w-full md:w-1/5 h-40 md:h-48 rounded-lg cursor-pointer overflow-hidden group"
            onClick={() => setActiveBusiness(b)}
          >
            <div className="w-full h-full overflow-hidden rounded-lg">
              <Image
                src={b.cardImage}
                alt={b.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Image
                src={b.logo}
                alt={`${b.name} Logo`}
                width={60}
                height={30}
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
