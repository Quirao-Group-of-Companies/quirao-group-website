import qs from 'qs';

const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function getWatergatePage() {
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
        cards: {
          populate: '*',
        },
        contactUs: {
          populate: '*',
        },
        faqs: {
          populate: '*',
        },
      },
    },
    { encodeValuesOnly: true },
  );

  const res = await fetch(`${STRAPI_URL}/api/watergate-page?${query}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error('Strapi Fetch Error:', errorData);
    throw new Error(`Failed to fetch watergate page: ${res.status}`);
  }

  const json = await res.json();

  return json.data;
}
