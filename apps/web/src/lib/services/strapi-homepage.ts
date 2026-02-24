import qs from 'qs';

const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function getHomepage() {
  const query = qs.stringify(
    {
      populate: {
        // Use the exact attribute names from your schema
        HeroSection: {
          populate: ['image'],
        },
        AboutUs: {
          populate: ['image'],
        },
        Achievements: {
          populate: ['image', 'icon'],
        },
        SubPreview: {
          populate: ['image'],
        },
        FAQs: {
          populate: '*',
        },
      },
    },
    { encodeValuesOnly: true },
  );

  const res = await fetch(`${STRAPI_URL}/api/homepage?${query}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error('Strapi Fetch Error:', errorData);
    throw new Error(`Failed to fetch homepage: ${res.status}`);
  }

  const json = await res.json();

  // Strapi v5 returns data directly.
  // If using v4, it might be json.data.attributes
  return json.data;
}
