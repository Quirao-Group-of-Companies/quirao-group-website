import Image from 'next/image';
import CareersVideoPlayer from '@/components/CareersVideoPlayer';
import { getCareersPage } from '@/lib/services/strapi-careers';

// --- TYPES ---
interface StrapiImage {
  url: string;
  alternativeText?: string;
}

type StrapiMedia =
  | StrapiImage
  | { data: { attributes: StrapiImage } }
  | { attributes: StrapiImage };

interface LinkComponent {
  id: number;
  title: string;
  href: string;
}

interface StrapiBlockChild {
  text?: string;
  type: string;
  children?: StrapiBlockChild[];
}

interface StrapiBlock {
  type: string;
  format?: string;
  children?: StrapiBlockChild[];
}

interface CareersData {
  heroSection?: {
    title: string;
    description?: string;
    image?: StrapiMedia;
    cta?: LinkComponent;
  };
  overview?: {
    title: string;
    description: string;
  };
  overviewVideo?: {
    title: string;
    href: string;
  };
  subsidiaryOverview?: Array<{
    id: number;
    subName: string;
    description: string;
    image?: StrapiMedia;
    logo?: { image: StrapiMedia };
  }>;
  valuesSection?: {
    headline: string;
    title: string;
    description: StrapiBlock[];
    image?: StrapiMedia;
    cta?: LinkComponent;
  };
  whyJoinUs?: {
    title: string;
    description: StrapiBlock[];
  };
  subContacts?: Array<{
    id: number;
    subName: string;
    address: string;
    contactNum?: string;
    email?: string;
  }>;
}

// --- HELPERS ---
const getImgUrl = (img: StrapiMedia | undefined | null): string | null => {
  if (!img) {
    return null;
  }
  if ('url' in img) {
    return img.url;
  }
  if ('data' in img && img.data?.attributes?.url) {
    return img.data.attributes.url;
  }
  if ('attributes' in img && img.attributes?.url) {
    return img.attributes.url;
  }
  return null;
};

// Helper to safely get Alt text or a fallback
const getAltText = (img: StrapiMedia | undefined | null, fallback: string): string => {
  if (!img) {
    return fallback;
  }
  let alt: string | undefined;
  if ('alternativeText' in img) {
    alt = img.alternativeText;
  } else if ('data' in img) {
    alt = img.data?.attributes?.alternativeText;
  } else if ('attributes' in img) {
    alt = img.attributes?.alternativeText;
  }
  return alt || fallback;
};

export default async function CareersTestPage() {
  const data: CareersData = await getCareersPage();

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-xl font-medium">No content available.</p>
      </div>
    );
  }

  return (
    <main className="w-full pb-24">
      {/* 1. HERO SECTION */}
      {data.heroSection && (
        <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
          {getImgUrl(data.heroSection.image) && (
            <Image
              src={getImgUrl(data.heroSection.image) || ''}
              alt={getAltText(data.heroSection.image, data.heroSection.title || 'Hero')}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase max-w-4xl mx-auto">
              {data.heroSection.title}
            </h1>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 mt-20 space-y-28">
        {/* 2. OVERVIEW */}
        {data.overview && (
          <section className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 uppercase tracking-tighter">
              {data.overview.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              {data.overview.description}
            </p>
          </section>
        )}

        {/* 3. VIDEO SECTION */}
        {data.overviewVideo?.href && <CareersVideoPlayer url={data.overviewVideo.href} />}

        {/* 4. SUBSIDIARY GRID */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {data.subsidiaryOverview?.map((sub) => (
            <div key={sub.id} className="space-y-4 text-center">
              <div className="aspect-square bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-center shadow-sm">
                {getImgUrl(sub.logo?.image) && (
                  <div className="relative w-full h-full">
                    <Image
                      src={getImgUrl(sub.logo?.image) || ''}
                      alt={getAltText(sub.logo?.image, sub.subName || 'Subsidiary Logo')}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
              <p className="text-[10px] text-gray-500 leading-normal line-clamp-6">
                {sub.description}
              </p>
            </div>
          ))}
        </section>

        {/* 5. VALUING WHAT MATTERS */}
        {data.valuesSection && (
          <section className="bg-gray-50 rounded-[3rem] overflow-hidden grid md:grid-cols-2 items-center p-8 md:p-16 gap-12">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
              {getImgUrl(data.valuesSection.image) && (
                <Image
                  src={getImgUrl(data.valuesSection.image) || ''}
                  alt={getAltText(
                    data.valuesSection.image,
                    data.valuesSection.title || 'Values Image',
                  )}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                {data.valuesSection.headline}
              </span>
              <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">
                {data.valuesSection.title}
              </h3>
              <div className="text-gray-600 text-sm md:text-base leading-relaxed">
                {data.valuesSection.description?.map((block) => {
                  const blockContent = block.children?.[0]?.text || '';
                  if (block.type === 'list') {
                    return (
                      <ul
                        key={`list-${blockContent.slice(0, 20)}`}
                        className="list-disc pl-5 space-y-1"
                      >
                        {block.children?.map((li) => {
                          const liText = li.children?.[0]?.text || '';
                          return <li key={liText}>{liText}</li>;
                        })}
                      </ul>
                    );
                  }
                  return <p key={blockContent}>{blockContent}</p>;
                })}
              </div>
              {data.valuesSection.cta && (
                <a
                  href={data.valuesSection.cta.href}
                  className="inline-block bg-black text-white px-8 py-3 rounded-md font-bold text-sm hover:bg-gray-800 transition-colors"
                >
                  {data.valuesSection.cta.title}
                </a>
              )}
            </div>
          </section>
        )}

        {/* 6. WHY JOIN US */}
        {data.whyJoinUs && (
          <section className="space-y-12">
            <h3 className="text-4xl md:text-5xl font-bold text-center uppercase tracking-tighter">
              {data.whyJoinUs.title}
            </h3>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 max-w-6xl mx-auto">
              {data.whyJoinUs.description?.map((block) => {
                if (block.type === 'list') {
                  return block.children?.map((listItem) => {
                    const bulletText = listItem.children?.map((c) => c.text).join('') || '';
                    return (
                      <div key={bulletText} className="flex items-start text-xs text-gray-700">
                        <span className="mr-3 mt-1 text-blue-600 font-bold">•</span>
                        <p className="flex-1">{bulletText}</p>
                      </div>
                    );
                  });
                }
                return null;
              })}
            </div>
          </section>
        )}

        {/* 7. BOTTOM CONTACTS GRID */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t pt-16">
          {data.subContacts?.map((contact) => (
            <div key={contact.id} className="space-y-4">
              <h5 className="font-black uppercase text-xs tracking-widest text-gray-900">
                {contact.subName}
              </h5>
              <div className="text-[10px] text-gray-500 space-y-1 leading-relaxed">
                <p>{contact.address}</p>
                {contact.contactNum && <p>{contact.contactNum}</p>}
                {contact.email && <p className="truncate">{contact.email}</p>}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
