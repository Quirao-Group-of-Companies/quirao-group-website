import qs from 'qs';

const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function getArticles(slug?: string) {
  const query = qs.stringify({
    filters: slug ? { slug: { $eq: slug } } : {},
    // Strapi v5 simplified populate
    populate: ['cover_image', 'content_media'],
    sort: ['publishedAt:desc'],
  });

  const res = await fetch(`${STRAPI_URL}/api/articles?${query}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
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
