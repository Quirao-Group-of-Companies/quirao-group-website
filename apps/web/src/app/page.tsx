import Navbar from "@/components/layout/Navbar";
import HeroCarousel from "@/components/sections/homepage/HeroCarousel";
import WhatWeDo from "@/components/sections/homepage/WhatWeDo";
import BusinesPreview from "@/components/sections/homepage/BusinessPreview";


export default function Home() {
  return (
    <>
      <Navbar />
      <HeroCarousel />
      <WhatWeDo />
      <BusinesPreview/>
    </>
  );
}
