import {
  ArrowRightIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { after } from 'next/server';
import FavoritesShowcase from '@/components/FavoritesShowcase.client';
import FeedbackSection from '@/components/FeedbackSection.client';
import ScrollReveal from '@/components/ScrollReveal.client';
import FAQItem from '@/components/ui/FAQItem.client';
import { logger } from '@/lib/axiom/server';

/**
 * Brightline Trucking Subsidiary Page
 */
export default async function BrightlinePage() {
  // Axiom Logging for observability
  logger.info('Brightline Trucking subsidiary page visited');
  after(() => {
    logger.flush();
  });

  // Hardcoded Brightline Data (Placeholder frames)
  const heroData = {
    title: 'Brightline Trucking',
    description: 'A service company engaged in hauling general cargo, offices & warehouses.',
    image: '/images/home-page/business-preview/brightline-business-preview.jpg',
    logo: '/images/logo/brightline/brightline-logo.png',
  };

  const aboutUsData = {
    title: 'Efficient Hauling Solutions for Every Business.',
    description: 'Brightline Trucking provides reliable cargo transportation and logistics services, ensuring your goods reach their destination safely and on time. We specialize in general cargo hauling and office or warehouse relocations.',
    image: '/images/home-page/business-preview/brightline-business-preview-card.jpg',
  };

  const showcaseData = [
    {
      id: 1,
      label: 'General Cargo Hauling',
      src: '/images/home-page/business-preview/brightline-business-preview.jpg',
    },
    {
      id: 2,
      label: 'Office Relocation',
      src: '/images/home-page/business-preview/brightline-business-preview-card.jpg',
    },
    {
      id: 3,
      label: 'Warehouse Logistics',
      src: '/images/home-page/business-preview/brightline-business-preview.jpg',
    },
  ];

  const feedbackData = [
    {
      id: 1,
      name: 'Reliable Service',
      comment: 'Brightline handled our office relocation with professional care. Highly recommended!',
      image: '/images/home-page/blogs/blog1.jpg',
      rating: 5,
    },
    {
      id: 2,
      name: 'On-time Delivery',
      comment: 'Their cargo hauling is always on schedule. A trustworthy partner for our logistics.',
      image: '/images/home-page/blogs/blog2.jpg',
      rating: 5,
    },
  ];

  const faqsData = [
    {
      id: 1,
      question: 'What types of cargo do you haul?',
      answer: 'We haul general cargo, equipment, and specialize in office and warehouse relocations.',
    },
    {
      id: 2,
      question: 'Where do you operate?',
      answer: 'We currently operate primarily in Iloilo and surrounding regions, providing reliable logistics across the area.',
    },
  ];

  return (
    <main className="w-full min-h-screen bg-qgc-white">
      {/* 1. HERO SECTION */}
      <ScrollReveal>
        <section className="relative w-full h-screen flex flex-col justify-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={heroData.image}
              alt="Brightline Trucking Hero Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="absolute top-30 left-8 md:left-16 z-20">
            <Image
              src={heroData.logo}
              alt="Brightline Trucking Logo"
              width={250}
              height={250}
              className="object-contain brightness-0 invert"
            />
          </div>

          <div className="relative z-10 pl-8 md:pl-16 pb-10 space-y-2">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl px-10 py-1 w-fit shadow-2xl border border-white/50">
              <h1 className="text-brightline-orange text-2xl md:text-3xl font-bold font-poppins uppercase tracking-tighter leading-none">
                {heroData.title}
              </h1>
            </div>
            <div className="max-w-3xl">
              <p className="text-white text-lg md:text-3xl font-bold drop-shadow-xl font-poppins">
                {heroData.description}
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 2. ABOUT US SECTION */}
      <ScrollReveal>
        <section className="bg-qgc-gray-soft px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-10 md:h-screen overflow-hidden py-16 md:py-10">
          <h1 className="md:hidden text-xl font-black text-qgc-black uppercase font-poppins tracking-tight leading-tight w-full text-start">
            {aboutUsData.title}
          </h1>

          <div className="order-3 md:order-1 flex items-start justify-center flex-col w-full md:w-[55%] gap-6 h-full max-w-4xl">
            <div className="space-y-4 text-start">
              <h1 className="hidden md:block text-xl md:text-xl lg:text-2xl xl:text-4xl font-black text-qgc-black uppercase font-poppins tracking-tight leading-tight">
                {aboutUsData.title}
              </h1>
              <p className="text-gray-600 text-base md:text-lg lg:text-base leading-relaxed text-left font-poppins line-clamp-4 lg:line-clamp-6">
                {aboutUsData.description}
              </p>
            </div>
            <ScrollReveal>
              <div className="w-full bg-brightline-orange rounded-2xl p-5 md:p-6 lg:p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                <span className="text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-tight font-poppins text-white drop-shadow-sm text-center sm:text-left leading-tight">
                  Connect with Brightline Trucking
                </span>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-qgc-gray-deep hover:text-qgc-white text-qgc-black px-5 py-3 lg:px-6 lg:py-4 rounded-2xl shadow-sm flex items-center gap-2 transition-all duration-300 active:scale-95 whitespace-nowrap"
                >
                  <span className="font-bold uppercase text-[10px] md:text-xs lg:text-sm">
                    Visit Facebook Page
                  </span>
                  <ArrowRightIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                </a>
              </div>
            </ScrollReveal>
          </div>

          <div className="order-2 md:order-2 w-full md:w-[40%] flex justify-center items-center h-100 md:h-[80%] lg:h-[85%] relative rounded-4xl overflow-hidden shadow-2xl">
            <Image
              src={aboutUsData.image}
              alt="About Brightline Trucking"
              fill
              className="object-cover"
            />
          </div>
        </section>
      </ScrollReveal>

      {/* 3. SERVICES SECTION */}
      <ScrollReveal>
        <section className="bg-white py-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black uppercase font-poppins tracking-tight text-qgc-black">
                Delivering the Best Custom
                <span className="block text-brightline-orange">Trucking Experience</span>
              </h2>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div 
                  key={item} 
                  className="group flex flex-col items-center p-10 bg-white rounded- shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-50 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                >
                  {/* Custom Truck Icon */}
                  <div className="mb-8 p-4 bg-orange-50 rounded-2xl group-hover:bg-brightline-orange transition-colors duration-300">
                    <svg 
                      width="64" 
                      height="64" 
                      viewBox="0 0 24 24" 
                      className="fill-brightline-orange group-hover:fill-white transition-colors duration-300"
                    >
                      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                    </svg>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl xl:text-2xl font-black text-qgc-black uppercase font-poppins leading-tight mb-5">
                    Gravel, Aggregate, <br /> Soils & Fill Delivery
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed font-poppins">
                    Supply and delivery of all aggregates, gravel, and soils, direct from quarry/supplier to your doorstep.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
     
      {/* 4. CONTACT & GOOGLE MAPS SECTION */}
      <ScrollReveal>
        <section className="bg-white py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black uppercase italic text-black tracking-tighter text-center">
                Contact <span className="text-qgc-charcoal">Brightline Trucking</span>
              </h2>
              <div className="w-24 h-1.5 bg-qgc-gray-light mt-2" />
            </div>

            <div className="flex flex-col lg:flex-row items-stretch bg-[#E5E5E5] rounded-xl overflow-hidden shadow-lg">
              <div className="w-full lg:w-1/2 grid grid-cols-2 lg:grid-cols-2 gap-y-12 gap-x-4 p-6 md:p-12">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="p-4 rounded-full border-2 border-black">
                    <MapPinIcon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold uppercase text-black">Address:</h3>
                  <p className="text-gray-700 text-sm max-w-55 leading-snug">
                    Coastal Road Brgy. Bito-on, Jaro, Iloilo City, Philippines, 5000
                  </p>
                </div>

                <div className="flex flex-col items-center text-center gap-3">
                  <div className="p-4 rounded-full border-2 border-black">
                    <EnvelopeIcon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold uppercase text-black">Email:</h3>
                  <p className="text-gray-700 text-sm break-all">management@quiraogroup.com</p>
                </div>

                <div className="flex flex-col items-center text-center gap-3">
                  <div className="p-4 rounded-full border-2 border-black">
                    <PhoneIcon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold uppercase text-black">Call Us:</h3>
                  <p className="text-gray-700 text-sm font-bold">0927 847 7110</p>
                </div>

                <div className="flex flex-col items-center text-center gap-3">
                  <div className="p-4 rounded-full border-2 border-black">
                    <ShareIcon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold uppercase text-black">Socials:</h3>
                  <div className="flex gap-3 mt-1">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <svg
                        className="w-6 h-6 fill-black"
                        viewBox="0 0 24 24"
                        role="img"
                        aria-label="Facebook"
                      >
                        <title>Facebook</title>
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 h-112.5 lg:h-auto min-h-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2264.308734117296!2d122.59259123058459!3d10.758815803751753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aee5cc2c4cd41b%3A0x5227806edabd0f50!2sSari-Sari%20Manokan!5e0!3m2!1sen!2sph!4v1772765274696!5m2!1sen!2sph"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Brightline Trucking Location"
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 5. FAQ SECTION */}
      <ScrollReveal>
        <section className="bg-qgc-gray-soft px-6 py-24">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black uppercase italic text-black tracking-tighter text-center">
                FREQUENTLY ASKED <span className="text-qgc-charcoal">QUESTIONS</span>
              </h2>
              <div className="w-24 h-1.5 bg-qgc-gray-light mt-2" />
            </div>
            <div className="space-y-4">
              {faqsData.map((faq) => (
                <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
