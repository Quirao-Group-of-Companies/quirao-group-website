import Image from "next/image";
import Button from '@/components/ui/Button.client';
import { getCareersPage } from '@cms/services';
import type { CareersPageData } from '@cms/types';
import CareersVideoPlayer from '@/components/CareersVideoPlayer';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export default async function CareersPage() {
  const careersData: CareersPageData | null = await getCareersPage();

  if (!careersData) {
    return (
      <main className="w-full text-qgc-black flex items-center justify-center min-h-screen">
        <p>Careers information is temporarily unavailable. Please check back later.</p>
      </main>
    );
  }

  const { heroSection, overview, overviewVideo, valuesSection, whyJoinUs } = careersData;

  return (
    <main className="w-full text-qgc-black">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        {heroSection?.image?.url && (
          <Image
            src={heroSection.image.url}
            alt={heroSection.image.alternativeText || heroSection.title || "Careers Hero"}
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute bottom-12 left-0 right-0 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white max-w-5xl mx-auto font-akrux uppercase tracking-wider leading-tight">
            {heroSection?.title || heroSection?.description || "Join a growing group of companies driven by innovation, collaboration, and long-term impact."}
          </h1>
        </div>
      </section>


      {/* ================= MISSION & VISION / OVERVIEW ================= */}
      <section className="py-20 bg-qgc-white">
        <div className="container mx-auto px-6 flex text-center flex-col gap-12 ">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-akrux uppercase">
              {overview?.title || "Our Mission"}
            </h2>
            <div className="max-w-4xl mx-auto text-lg leading-relaxed text-gray-700">
              {overview?.description ? (
                <p>{overview.description}</p>
              ) : (
                <p>
                  Quirao Group of Companies is a global provider of information-based analytics and decision tools for professional and business customers.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* ================= YOUTUBE VIDEO SECTION ================= */}
      {overviewVideo?.href && (
        <section className="py-20 bg-qgc-white border-t border-gray-100">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 font-akrux uppercase">
              {overviewVideo.title || "Life at Our Company"}
            </h2>
            <div className="max-w-5xl mx-auto">
              <CareersVideoPlayer url={overviewVideo.href} />
            </div>
          </div>
        </section>
      )}

      {/* ================= VALUING WHAT MATTERS ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          {valuesSection?.headline && (
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center font-akrux uppercase tracking-widest">
              {valuesSection.headline}
            </h2>
          )}
          
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-12 lg:gap-20">
            <div className="relative w-full lg:w-1/2 aspect-4/3 rounded-3xl overflow-hidden shadow-2xl bg-qgc-black">
              {valuesSection?.image?.url ? (
                <Image
                  src={valuesSection.image.url}
                  alt={valuesSection.image.alternativeText || valuesSection.title || "Our Values"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/20 font-akrux text-4xl uppercase">
                  QGC VALUES
                </div>
              )}
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-8 py-6">
              <h3 className="text-2xl md:text-3xl text-qgc-black font-semibold">
                {valuesSection?.title}
              </h3>
              <div className="text-gray-600 text-xl leading-relaxed prose prose-lg max-w-none [&_ul]:list-disc [&_ul]:pl-6 [&_li]:text-gray-700">
                {valuesSection?.description ? (
                  <BlocksRenderer content={valuesSection.description as any} />
                ) : null}
              </div>
              {valuesSection?.cta && (
                <Button 
                  text={valuesSection.cta.title || "Apply Now"} 
                  href={valuesSection.cta.href || "/careers/apply"} 
                  className="mt-4 px-10 py-5 text-base font-bold uppercase tracking-widest" 
                />
              )}
            </div>
          </div>
        </div>
      </section>


      {/* ================= WHY JOIN US ================= */}
      <section className="py-24 px-6 bg-qgc-gray-soft">
       <div className="container mx-auto max-w-7xl">
         <h2 className="text-3xl md:text-4xl font-bold mb-12 text-start font-akrux uppercase tracking-widest">
           {whyJoinUs?.title}
         </h2>

         <div className="flex flex-col gap-16 items-start">
           <div className="w-full space-y-8">
              <div className="prose prose-lg prose-li:text-gray-700 prose-ul:space-y-3 prose-ul:list-disc prose-ul:pl-6 max-w-none [&_ul]:md:columns-2 [&_ul]:gap-20 [&_li]:break-inside-avoid">
               {whyJoinUs?.description ? (
                 <BlocksRenderer content={whyJoinUs.description as any} />
               ) : null}
              </div>
           </div>

           {whyJoinUs?.image?.url && (
             <div className="relative w-full aspect-21/9 rounded-3xl overflow-hidden shadow-xl">
               <Image
                 src={whyJoinUs.image.url}
                 alt={whyJoinUs.image.alternativeText || "Join Us"}
                 fill
                 className="object-cover"
               />
             </div>
           )}
         </div>
       </div>
      </section>

    </main>
  );
}
