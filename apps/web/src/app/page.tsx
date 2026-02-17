"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HomeFaqsMap from "../components/layout/HomeFaqsMap";

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
    description:"BuildMaster Wholesale is a trusted supplier of construction and hardware materials based in Iloilo City, Philippines. We provide high-quality building products and materials for residential, commercial, and industrial projects, backed by reliable delivery services and expert advice. Our commitment to excellence ensures that every client receives the right materials, on time, every time, supporting the growth and success of construction projects across the region.",
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
   ACHIEVEMENTS SECTION
========================================================= */

interface Achievement {
  id: number;
  title: string;
  image: string;
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: "Top Construction Supplier 2023",
    image: "/images/home-page/achievements/achievements1.png",
  },
  {
    id: 2,
    title: "Excellence in Service Award",
    image: "/images/home-page/achievements/achievements2.png",
  },
  {
    id: 3,
    title: "Fastest Growing Company",
    image: "/images/home-page/achievements/achievements3.png",
  },
];
/* =========================================================
   BLOG SECTION
========================================================= */

interface Blog {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
}

const blogs: Blog[] = [
  {
    id: 1,
    title: "Buildmaster Podcast Officially Out",
    date: "January 15, 2026",
    description:
      "Our company officially launches a new construction division to serve larger commercial projects nationwide.",
    image: "/images/home-page/blogs/blog1.jpg",
  },
  {
    id: 2,
    title: "Awarded Excellence in Service",
    date: "December 20, 2025",
    description:
      "Recognized for outstanding service quality and commitment to client satisfaction.",
    image: "/images/home-page/blogs/blog2.jpg",
  },
  {
    id: 3,
    title: "Join Us as We Travel and Hire You",
    date: "November 10, 2025",
    description:
      "We invested in state-of-the-art heavy equipment to improve efficiency and safety standards.",
    image: "/images/home-page/blogs/blog3.jpg",
  },
  {
    id: 4,
    title: "Welcoming Fresh Grads to the Industry",
    date: "October 5, 2025",
    description:
      "Supporting local communities through infrastructure assistance and educational initiatives.",
    image: "/images/home-page/blogs/blog4.jpg",
  },
];
/* =========================================================
   FAQ SECTION
========================================================= */

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "What services does your company provide?",
    answer:
      "We offer construction supply, heavy equipment rental, and infrastructure development services across multiple industries.",
  },
  {
    id: 2,
    question: "How can I request a quotation?",
    answer:
      "You can contact us through our website contact form or directly reach out to our sales team via email or phone.",
  },
  {
    id: 3,
    question: "Do you operate nationwide?",
    answer:
      "Yes, we provide services nationwide and are continuously expanding our operations.",
  },
  {
    id: 4,
    question: "How long has your company been operating?",
    answer:
      "Our company has been operating for over a decade, delivering quality and reliable services to our clients.",
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
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority
            />

            <div className="absolute inset-0 bg-black/40" />

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
      <section className="bg-qgc-gray-soft py-20">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="md:w-1/3">
            <Image
              src="/images/home-page/what-we-do-section/what-we-do.png"
              alt="What We Do"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="md:w-1/2 flex flex-col gap-6">
            <h2 className="text-4xl font-bold text-gray-800">
              What We Do
            </h2>
            <p className="text-gray-600 text-lg">
             We drive growth and innovation across diverse industries. Our portfolio spans logistics, business process outsourcing, food and restaurant services, water purification, and construction each operating with excellence and a commitment to quality. By nurturing these businesses under one umbrella, we provide integrated solutions that deliver value, efficiency, and lasting impact to our clients and communities.
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

        <div className="flex flex-col md:flex-row gap-12 mb-12">
          <div className="md:w-1/2 h-64 md:h-100 relative rounded-lg overflow-hidden">
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
              width={90}
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

       {/* =====================================================
         ACHIEVEMENTS SECTION
      ===================================================== */}
      <section className="bg-qgc-gray-soft px-6 py-20" >
        <h2 className="text-4xl font-bold text-center text-qgc-black mb-16">
          Our Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {achievements.map((achievement) => (
        <div
          key={achievement.id}
          className="group cursor-pointer"
        >
          <div className="relative w-full h-100 rounded-xl overflow-hidden shadow-lg">

            <Image
              src={achievement.image}
              alt={achievement.title}
              fill
              className="object-contain p-10 transition-transform duration-500 ease-in-out group-hover:scale-110"
            />

            <div className="absolute inset-0 group-hover:bg-black/10 transition duration-500" />

            <div className="absolute bottom-6 left-0 right-0 text-center px-4">
              <h3 className="text-qgc-black text-xl font-semibold">
                {achievement.title}
              </h3>
            </div>

          </div>
        </div>

          ))}
        </div>
      </section>

      {/* =====================================================
        BLOG SECTION
      ===================================================== */}
      <section className="bg-white px-6 py-24">
        <h2 className="text-4xl font-bold text-center text-qgc-black mb-16">
          Latest News
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex flex-col md:flex-row bg-qgc-gray-soft rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-between md:w-1/2">
                <div>
                  <p className="text-sm text-gray-500 mb-2">{blog.date}</p>

                  <h3 className="text-xl font-semibold text-qgc-black mb-4">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {blog.description}
                  </p>
                </div>

                <button className="mt-6 bg-black  text-white rounded-lg  px-6 py-3 text-sm font-medium hover:bg-gray-800 transition">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
     <HomeFaqsMap faqs={faqs} />
    <Footer/>
    </>
  );
}
