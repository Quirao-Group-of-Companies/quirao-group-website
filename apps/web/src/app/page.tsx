"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import FAQItem from "../components/ui/FAQItem";
import {
  slides,
  businesses,
  achievements,
  blogs,
  faqs,
  Business
} from "./data/homepage-data";

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
            <button className="w-40 px-4 py-2 rounded-md bg-black text-white hover:bg-qgc-gray-deep transition">
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

        <div className="flex flex-col md:flex-row gap-12 mb-12 bg-qgc-gray-soft">
          <div className="md:w-1/2 h-64 md:h-100 relative rounded-lg overflow-hidden">
            <Image
              src={activeBusiness.topImage}
              alt={activeBusiness.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="md:w-1/2 text-qgc-black px-4 py-4 flex flex-col gap-6 relative">
            <Image
              src={activeBusiness.wordLogo}
              alt={activeBusiness.name}
              width={150}
              height={20}
              className="object-contain  self-center"
            />
            <p>{activeBusiness.description}</p>
            <button className="bg-qgc-black h-10 text-white px-6 py-2 rounded-lg w-max md:absolute bottom-15 hover:bg-qgc-gray-deep transition">
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
                  width={100}
                  height={100}
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
              className="object-contain p-15 transition-transform duration-500 ease-in-out group-hover:scale-110"
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

                <button className="mt-6 bg-black  text-white rounded-lg  px-6 py-3 text-sm font-medium hover:bg-qgc-gray-deep transition">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* =====================================================
          FAQ SECTION
      ===================================================== */}
      <section className="bg-gray-100 px-6 py-24">
        <h2 className="text-4xl font-bold text-center text-qgc-black mb-16">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <FAQItem 
              key={faq.id} 
              question={faq.question} 
              answer={faq.answer} 
            />
          ))}
        </div>
      </section>
    </>
  );
}
