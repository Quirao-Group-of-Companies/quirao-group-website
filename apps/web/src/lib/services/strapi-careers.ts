import qs from 'qs';

const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function getCareersPage() {
  const query = qs.stringify(
    {
      populate: {
        heroSection: {
          populate: ['image', 'cta'],
        },
        overview: {
          populate: ['image', 'cta'],
        },
        overviewVideo: {
          populate: '*',
        },
        subsidiaryOverview: {
          populate: {
            image: true,
            logo: { populate: ['image'] },
            cta: true,
          },
        },
        valuesSection: {
          populate: ['image', 'cta'],
        },
        whyJoinUs: {
          populate: ['image', 'cta'],
        },
        subContacts: {
          populate: {
            logo: { populate: ['image'] },
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
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => {
      return {};
    });
    console.error('Strapi Fetch Error:', errorData);
    throw new Error(`Failed to fetch careers page: ${res.status}`);
  }

  const json = await res.json();
  return json.data;
}
