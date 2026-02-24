import qs from 'qs';

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function getArticles(slug?: string) {
  const query = qs.stringify({
    filters: slug ? { slug: { $eq: slug } } : {},
    // Strapi v5 simplified populate
    populate: ['cover_image', 'content_media'],
    sort: ['publishedAt:desc'],
  });

  const res = await fetch(`${STRAPI_URL}/api/articles?${query}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch articles: ${res.status}`);
  }

  const json = await res.json();

  // Strapi v5 returns { data: [...] }
  // We return the first item if a slug was provided, otherwise the whole array
  return slug ? json.data[0] : json.data;
}

export async function getHomepage() {
  const query = qs.stringify({
    // Replace 'hero' with the actual field name of the component in your Strapi UI
    populate: {
      Hero: { populate: '*' },
      AboutUs: { populate: '*' },
      SubPreview: { populate: '*' },
      Achievements: { populate: '*' },
      FAQs: { populate: '*' },
    },
  });
  try {
    const res = await fetch(`${STRAPI_URL}/api/homepage?${query}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn(`Strapi Homepage fetch failed: ${res.status}`);
      return null;
    }

    const json = await res.json();
    // Single Types return data as an object: { data: { id, attributes: { ... } } }
    // In Strapi v5, it's often flattened or accessed via json.data
    return json.data;
  } catch (err) {
    console.error('Network error fetching homepage:', err);
    return null;
  }
}
