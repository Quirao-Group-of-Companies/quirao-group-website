import Image from 'next/image';
import { getAboutUsPage } from '@/lib/services/strapi-about-us';

// --- TYPES ---
interface StrapiImage {
  url: string;
  alternativeText?: string;
}

interface ComponentGeneric {
  id: number;
  title: string;
  description: string;
  image?: any; // Supporting multiple Strapi formats
}

export default async function AboutUsPage() {
  const data = await getAboutUsPage();

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-xl font-medium">No content available.</p>
      </div>
    );
  }

  // --- MAPPING DATA ---
  // Single Components (Object)
  const hero = data.heroSection;
  const aboutUs = data.aboutUs;
  const qgcStructure = data.qgcGroupStructure;

  // Repeatable Components (Array)
  const missionVision = (data.missionVision || []) as ComponentGeneric[];
  const leaders = (data.meetOurLeaders || []) as ComponentGeneric[];

  // --- HELPER: GET IMAGE URL ---
  const getImgUrl = (img: any) => {
    if (!img) return null;
    // Handles Strapi v4/v5 and direct URL mapping
    return img.url || img.data?.attributes?.url || null;
  };

  return (
    <main className="w-full pb-20 space-y-24">
      
      {/* 1. HERO SECTION (Text Overlaying Image) */}
      {hero && (
        <section className="relative w-full h-[75vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          {getImgUrl(hero.image) && (
            <Image
              src={getImgUrl(hero.image)}
              alt={hero.title || 'Hero Background'}
              fill
              className="object-cover"
              priority
            />
          )}

          {/* Dark Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-black/50 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

          {/* Content Wrapper */}
          <div className="relative z-10 text-center text-white px-4 max-w-5xl space-y-6">
            <h1 className="text-4xl md:text-7xl font-black tracking-tight uppercase drop-shadow-2xl">
              {hero.title}
            </h1>
            {hero.description && (
              <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                {hero.description}
              </p>
            )}
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 space-y-24">
        
        {/* 2. ABOUT US SECTION (Side-by-Side) */}
        {aboutUs && (
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {aboutUs.title}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                {aboutUs.description}
              </p>
            </div>
            {getImgUrl(aboutUs.image) && (
              <div className="relative aspect-video md:aspect-square rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={getImgUrl(aboutUs.image)}
                  alt="About Us"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </section>
        )}

        {/* 3. MISSION, VISION, CORE VALUES (3-Column Grid) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missionVision.map((item) => (
            <div key={item.id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
              {getImgUrl(item.image) && (
                <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden">
                  <Image
                    src={getImgUrl(item.image)}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4 text-blue-900 border-b pb-2 uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed italic">
                "{item.description}"
              </p>
            </div>
          ))}
        </section>

        {/* 4. QGC GROUP STRUCTURE (Large Centered Image) */}
        {qgcStructure && (
          <section className="bg-gray-50 py-16 px-8 rounded-[3rem] text-center space-y-8">
            <div className="max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {qgcStructure.title}
              </h2>
              {qgcStructure.description && (
                <p className="text-gray-600">{qgcStructure.description}</p>
              )}
            </div>
            {getImgUrl(qgcStructure.image) && (
              <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] bg-white rounded-2xl shadow-inner overflow-hidden">
                <Image
                  src={getImgUrl(qgcStructure.image)}
                  alt="Organization Structure"
                  fill
                  className="object-contain p-6"
                />
              </div>
            )}
          </section>
        )}

        {/* 5. MEET OUR LEADERS (Circular Profile Cards) */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">Meet Our Leaders</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {leaders.map((leader) => (
              <div key={leader.id} className="group text-center">
                <div className="relative w-56 h-56 mx-auto mb-6">
                  {/* Decorative Background Circle */}
                  <div className="absolute inset-0 bg-blue-100 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500" />
                  
                  {/* Image */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg z-10">
                    <Image
                      src={getImgUrl(leader.image) || '/placeholder-leader.png'}
                      alt={leader.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                
                <h4 className="text-2xl font-bold text-gray-900">{leader.title}</h4>
                <p className="text-blue-600 font-semibold tracking-widest text-sm uppercase mt-1">
                  {leader.description}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}