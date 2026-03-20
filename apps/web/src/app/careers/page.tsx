import Image from "next/image";
import Button from '@/components/ui/Button.client';

export default function CareersPage() {
  return (
    <main className="w-full  text-qgc-black">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen flex items-center justify-center text-center">
        <Image
          src="/images/careers-hero.jpg"
          alt="Careers Hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
          <h1 className="text-xl md:text-3xl font-bold text-white mb-6 font-akrux absolute bottom-0">
           Join a growing group of companies driven by innovation,
            collaboration, and long-term impact.
          </h1>
      </section>


      {/* ================= MISSION & VISION ================= */}
      <section className="py-20 bg-qgc-white">
        <div className="container mx-auto px-6 flex text-center flex-col gap-12 ">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p >
              Quirao Group of Companies is a global provider of information-based analytics and decision tools for professional and business customers.<br/>
            </p>
          </div>
          <div>
            <p >
           We are proud to be a recognized employer of choice, providing future-ready careers to highly talented and dedicated professionals across the
           fields of Legal, Technology, Finance and Accounting, Sales, Marketing, Human Resources, and Customer Support.
            </p>
          </div>
        </div>
      </section>


      {/* ================= YOUTUBE VIDEO SECTION ================= */}
      <section className="py-20 bg-qgc-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Life at Our Company
          </h2>
          <div className="aspect-video max-w-4xl mx-auto">
            <iframe
              className="w-full h-full rounded-xl shadow-lg"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              title="Company Video"
              allowFullScreen
            />
          </div>
        </div>
      </section>


      {/* ================= SUBSIDIARIES SECTION ================= */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Our Subsidiaries
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "Buildmaster",
              "Paluto",
              "Sari-Sari Manokan",
              "Quirao Group",
              "Coming Soon",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <h3 className="text-xl font-semibold mb-4">{item}</h3>
                <p className="text-gray-600">
                  Learn more about career opportunities within this company.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ================= VALUING WHAT MATTERS ================= */}
      <section className="py-20 bg-qgc-white">
         <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Valuing What Matters
          </h2>
        <div className="flex items-center justify-center px-20 gap-20 mt-20">
          <div className="bg-qgc-black h-80 w-150">
            
          </div>
          <div className="flex items-start justify-start flex-col gap-20 relative h-80">
           <h1 className="font-akrux text-3xl">Valuing what matters</h1>
            <p className="text-gray-600 text-lg">
              We prioritize integrity, teamwork, growth, and innovation. Our
              culture encourages continuous learning and meaningful contribution.
            </p>
             <Button text="Apply Now" href="/careers/apply" className="mt-6 px-6 py-3 text-sm absolute bottom-0 left-0" />
          </div>
       
        </div>
      </section>


      {/* ================= WHY JOIN US ================= */}
      <section className="py-20 px-20 bg-gray-50">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-start font-akrux">
            Why Join Us?
          </h2>
        <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 text-start">
          <ul>
            <li >Optimized Hybrid Work Setup</li>
            <li>Retirement Plan with Company Matching</li>
            HMO Coverage from Day 1 with up to 4 free dependents (including domestic and same-sex partners and parents up to 70 years old)
            Employee-centric facilities
            Employee engagement activities and events
            Company-sponsored employee interest clubs
            Robust corporate social responsibility program
            Focus on career growth and development
            Outstanding workplace culture
          </ul>
       
        </div>
      </section>



    </main>
  );
}