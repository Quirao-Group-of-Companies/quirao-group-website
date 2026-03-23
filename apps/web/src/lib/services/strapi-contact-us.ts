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
          // Corrected from SubContacts
          populate: {
            displayImage: true, // Corrected from image
            cardImage: true,
            logo: {
              populate: {
                image: true,
              },
            },
            cta: true,
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  const url = `${STRAPI_URL}/api/contact-us-page?${query}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error(`Strapi Fetch Error: ${res.status} ${res.statusText}`);
    console.error('Target URL:', url);
    const errorText = await res.text();
    try {
      const errorJson = JSON.parse(errorText);
      console.error('Strapi Error Details:', JSON.stringify(errorJson, null, 2));
    } catch {
      console.error('Strapi Raw Error Body:', errorText);
    }
    return null;
  }

  const json = await res.json();
  return json.data;
}
