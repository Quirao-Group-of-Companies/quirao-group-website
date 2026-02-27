import qs from 'qs';

const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function getContactUsPage() {
  const query = qs.stringify(
    {
      populate: {
        qgcText: {
          populate: '*',
        },
        qgcContacts: {
          populate: {
            logo: { populate: ['image'] },
            cardImage: true,
            displayImage: true,
          },
        },
        subsContacts: {
          populate: {
            logo: { populate: ['image'] },
            cardImage: true,
            displayImage: true,
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
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => {
      return {};
    });
    console.error('Strapi Fetch Error:', errorData);
    return null;
  }

  const json = await res.json();
  return json.data;
}
