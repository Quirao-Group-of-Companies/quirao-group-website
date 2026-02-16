import Image from "next/image";

export default function WhatWeDo() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row md:justify-center items-center gap-10">
        <div className="md:w-1/3">
          <Image
            src="/images/home-page/what-we-do-section/what-we-do.png" 
            alt="What We Do"
            className="rounded-lg shadow-lg"
            width={600}
            height={400}
            objectFit="cover"
          />
        </div>

        <div className="md:w-1/2 flex items=start justify-center flex-col gap-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What We Do
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">
            We provide innovative solutions that help businesses grow and thrive in the digital world. From cutting-edge web development to creative design and strategic consulting, our team is dedicated to delivering results that matter.
          </p>
        <button className="px-2 py-2 w-40 rounded-md bg-qgc-black text-qgc-white">Read More</button>
        </div>
      </div>
    </section>
  );
}
