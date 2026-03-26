/**
 * ⚠️  AUTO-GENERATED — DO NOT EDIT MANUALLY
 * Source: apps/cms/scripts/generate-services.ts
 * Regenerate: bun run generate-services (from apps/cms)
 * Generated: 2026-03-24T02:33:36.440Z
 */

import qs from 'qs';
import type {
  AboutUsPageData,
  ArticleData,
  BrightlinePageData,
  BuildmasterPageData,
  CareersPageData,
  ContactUsPageData,
  HomepageData,
  PalutoPageData,
  SariSariManokanPageData,
  WatergatePageData,
} from '../../types/strapi-types';

const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

//·───·Services·──────────────────────────────────────────────────────────

/** Auto-generated service for: About Us Page */
export async function getAboutUsPage(): Promise<AboutUsPageData | null> {
  const query = qs.stringify(
    {
      populate: {
        heroSection: {
          populate: {
            cta: true,
            image: true,
            logo: {
              populate: {
                image: true,
              },
            },
          },
        },
        aboutUs: {
          populate: {
            image: true,
            cta: true,
            gallery: true,
          },
        },
        missionVision: {
          populate: {
            image: true,
            icon: true,
            cta: true,
          },
        },
        missionVisionImage: true,
        groupStructureBanner: {
          populate: {
            logo: true,
            image: true,
            cta: true,
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  const res = await fetch(`${STRAPI_URL}/api/about-us-page?${query}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 60 },
  } as RequestInit);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error('Strapi Fetch Error [About Us Page]:', errorData);
    throw new Error(`Failed to fetch About Us Page: ${res.status}`);
  }

  const json = await res.json();
  return json.data as AboutUsPageData;
}

/** Auto-generated service for: Article */
export async function getArticle(): Promise<ArticleData | null> {
  const query = qs.stringify(
    {
      populate: {
        cover_image: true,
        content_media: true,
      },
    },
    { encodeValuesOnly: true },
  );

  const res = await fetch(`${STRAPI_URL}/api/article?${query}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 60 },
  } as RequestInit);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error('Strapi Fetch Error [Article]:', errorData);
    throw new Error(`Failed to fetch Article: ${res.status}`);
  }

  const json = await res.json();
  return json.data as ArticleData;
}

/** Auto-generated service for: Brightline Page */
export async function getBrightlinePage(): Promise<BrightlinePageData | null> {
  const query = qs.stringify(
    {
      populate: {
        heroSection: {
          populate: {
            cta: true,
            image: true,
            logo: {
              populate: {
                image: true,
              },
            },
          },
        },
        aboutUs: {
          populate: {
            image: true,
            cta: true,
            gallery: true,
          },
        },
        features: {
          populate: {
            image: true,
            icon: true,
            cta: true,
          },
        },
        delivery: {
          populate: {
            image: true,
            icon: true,
            cta: true,
          },
        },
        banner: {
          populate: {
            logo: true,
            image: true,
            cta: true,
          },
        },
        contactUs: {
          populate: {
            details: true,
            embedLinks: true,
            embedMap: true,
          },
        },
        faqs: true,
      },
    },
    { encodeValuesOnly: true },
  );

  const res = await fetch(`${STRAPI_URL}/api/brightline-page?${query}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 60 },
  } as RequestInit);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error('Strapi Fetch Error [Brightline Page]:', errorData);
    throw new Error(`Failed to fetch Brightline Page: ${res.status}`);
  }

  const json = await res.json();
  return json.data as BrightlinePageData;
}

/** Auto-generated service for: BuildMaster Page */
export async function getBuildmasterPage(): Promise<BuildmasterPageData | null> {
  const query = qs.stringify(
    {
      populate: {
        heroSection: {
          populate: {
            cta: true,
            image: true,
            logo: {
              populate: {
                image: true,
              },
            },
          },
        },
        features: {
          populate: {
            image: true,
            icon: true,
            cta: true,
          },
        },
        cta: true,
        aboutUsBackgroundImage: true,
        aboutUsSection: {
          populate: {
            image: true,
            icon: true,
            cta: true,
          },
        },
        podcasts: {
          populate: {
            image: true,
            icon: true,
            cta: true,
          },
        },
        link: true,
        download: {
          populate: {
            logo: true,
            image: true,
            cta: true,
          },
        },
        contactUs: {
          populate: {
            details: true,
            embedLinks: true,
            embedMap: true,
          },
        },
        faqs: true,
      },
    },
    { encodeValuesOnly: true },
  );

  const res = await fetch(`${STRAPI_URL}/api/build-master-page?${query}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 60 },
  } as RequestInit);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error('Strapi Fetch Error [BuildMaster Page]:', errorData);
    throw new Error(`Failed to fetch BuildMaster Page: ${res.status}`);
  }

  const json = await res.json();
  return json.data as BuildmasterPageData;
}

/** Auto-generated service for: Careers page */
export async function getCareersPage(): Promise<CareersPageData | null> {
  const query = qs.stringify(
    {
      populate: {
        heroSection: {
          populate: {
            cta: true,
            image: true,
            logo: {
              populate: {
                image: true,
              },
            },
          },
        },
        overview: {
          populate: {
            image: true,
            cta: true,
            gallery: true,
          },
        },
        overviewVideo: true,
        whyJoinUs: {
          populate: {
            image: true,
            cta: true,
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  const res = await fetch(`${STRAPI_URL}/api/careers-page?${query}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 60 },
  } as RequestInit);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error('Strapi Fetch Error [Careers page]:', errorData);
    throw new Error(`Failed to fetch Careers page: ${res.status}`);
  }

  const json = await res.json();
  return json.data as CareersPageData;
}

/** Auto-generated service for: Contact Us Page */
export async function getContactUsPage(): Promise<ContactUsPageData | null> {
  const query = qs.stringify(
    {
      populate: {
        introText: true,
        mainContact: {
          populate: {
            logo: {
              populate: {
                image: true,
              },
            },
            cta: true,
            cardImage: true,
            featuredImage: true,
          },
        },
        subsidiaryContacts: {
          populate: {
            logo: {
              populate: {
                image: true,
              },
            },
            cta: true,
            cardImage: true,
            featuredImage: true,
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  const res = await fetch(`${STRAPI_URL}/api/contact-us-page?${query}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 60 },
  } as RequestInit);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error('Strapi Fetch Error [Contact Us Page]:', errorData);
    throw new Error(`Failed to fetch Contact Us Page: ${res.status}`);
  }

  const json = await res.json();
  return json.data as ContactUsPageData;
}

/** Auto-generated service for: Homepage */
export async function getHomepage(): Promise<HomepageData | null> {
  const query = qs.stringify(
    {
      populate: {
        heroSection: {
          populate: {
            cta: true,
            image: true,
            logo: {
              populate: {
                image: true,
              },
            },
          },
        },
        aboutUs: {
          populate: {
            image: true,
            cta: true,
            gallery: true,
          },
        },
        SubPreview: {
          populate: {
            image: true,
            logo: {
              populate: {
                image: true,
              },
            },
            cta: true,
            cardImage: true,
          },
        },
        achievements: {
          populate: {
            image: true,
            icon: true,
            cta: true,
          },
        },
        faqs: true,
      },
    },
    { encodeValuesOnly: true },
  );

  const res = await fetch(`${STRAPI_URL}/api/homepage?${query}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 60 },
  } as RequestInit);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error('Strapi Fetch Error [Homepage]:', errorData);
    throw new Error(`Failed to fetch Homepage: ${res.status}`);
  }

  const json = await res.json();
  return json.data as HomepageData;
}

/** Auto-generated service for: Paluto Page */
export async function getPalutoPage(): Promise<PalutoPageData | null> {
  const query = qs.stringify(
    {
      populate: {
        heroSection: {
          populate: {
            cta: true,
            image: true,
            logo: {
              populate: {
                image: true,
              },
            },
          },
        },
        aboutUs: {
          populate: {
            image: true,
            cta: true,
            gallery: true,
          },
        },
        showcaseLogo: {
          populate: {
            image: true,
          },
        },
        showcase: {
          populate: {
            image: true,
            icon: true,
            cta: true,
          },
        },
        bannerHighlight: {
          populate: {
            logo: true,
            image: true,
            cta: true,
          },
        },
        branchesCards: {
          populate: {
            image: true,
            icon: true,
            cta: true,
          },
        },
        eventsAndCatering: {
          populate: {
            image: true,
            cta: true,
          },
        },
        eventsAndCateringImages: true,
        feedback: {
          populate: {
            image: true,
            review: true,
          },
        },
        contactUs: {
          populate: {
            details: true,
            embedLinks: true,
            embedMap: true,
          },
        },
        faqs: true,
      },
    },
    { encodeValuesOnly: true },
  );

  const res = await fetch(`${STRAPI_URL}/api/paluto-page?${query}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 60 },
  } as RequestInit);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error('Strapi Fetch Error [Paluto Page]:', errorData);
    throw new Error(`Failed to fetch Paluto Page: ${res.status}`);
  }

  const json = await res.json();
  return json.data as PalutoPageData;
}

/** Auto-generated service for: Sari-Sari Manokan Page */
export async function getSariSariManokanPage(): Promise<SariSariManokanPageData | null> {
  const query = qs.stringify(
    {
      populate: {
        heroSection: {
          populate: {
            cta: true,
            image: true,
            logo: {
              populate: {
                image: true,
              },
            },
          },
        },
        aboutUs: {
          populate: {
            image: true,
            cta: true,
            gallery: true,
          },
        },
        showcase: {
          populate: {
            image: true,
            icon: true,
            cta: true,
          },
        },
        feedback: {
          populate: {
            image: true,
            review: true,
          },
        },
        contactUs: {
          populate: {
            details: true,
            embedLinks: true,
            embedMap: true,
          },
        },
        faqs: true,
      },
    },
    { encodeValuesOnly: true },
  );

  const res = await fetch(`${STRAPI_URL}/api/sari-sari-manokan-page?${query}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 60 },
  } as RequestInit);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error('Strapi Fetch Error [Sari-Sari Manokan Page]:', errorData);
    throw new Error(`Failed to fetch Sari-Sari Manokan Page: ${res.status}`);
  }

  const json = await res.json();
  return json.data as SariSariManokanPageData;
}

/** Auto-generated service for: Watergate Page */
export async function getWatergatePage(): Promise<WatergatePageData | null> {
  const query = qs.stringify(
    {
      populate: {
        heroSection: {
          populate: {
            cta: true,
            image: true,
            logo: {
              populate: {
                image: true,
              },
            },
          },
        },
        aboutUs: {
          populate: {
            image: true,
            cta: true,
            gallery: true,
          },
        },
        featureCards: {
          populate: {
            image: true,
            icon: true,
            cta: true,
          },
        },
        contactUs: {
          populate: {
            details: true,
            embedLinks: true,
            embedMap: true,
          },
        },
        faqs: true,
      },
    },
    { encodeValuesOnly: true },
  );

  const res = await fetch(`${STRAPI_URL}/api/watergate-page?${query}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 60 },
  } as RequestInit);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error('Strapi Fetch Error [Watergate Page]:', errorData);
    throw new Error(`Failed to fetch Watergate Page: ${res.status}`);
  }

  const json = await res.json();
  return json.data as WatergatePageData;
}
