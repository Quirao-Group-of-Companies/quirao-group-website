import qs from 'qs';

const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function getPalutoPage() {
  const query = qs.stringify(
    {
      populate: {
        hero: {
          populate: {
            image: true,
            logo: {
              populate: {
                image: true,
              },
            },
            cta: true,
          },
        },
        aboutUs: {
          populate: '*',
        },
        showcaseLogo: {
          populate: '*',
        },
        showcase: {
          populate: '*',
        },
        bannerSection: {
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
        eventsAndCateringSection: {
          populate: {
            image: true,
            cta: true,
          },
        },
        eventsAndCateringCarouselImages: true,
        feedback: {
          populate: {
            image: true,
            text: true,
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
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error('Strapi Fetch Error:', errorData);
    throw new Error(`Failed to fetch paluto page: ${res.status}`);
  }

  const json = await res.json();

  return json.data;
}