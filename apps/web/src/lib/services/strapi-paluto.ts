import qs from 'qs';

const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function getPalutoPage() {
  const query = qs.stringify(
    {
      populate: {
        hero: {
          populate: '*',
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
        feedback: {
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

  // Strapi v5 returns data directly.
  // If using v4, it might be json.data.attributes
  return json.data;
}
