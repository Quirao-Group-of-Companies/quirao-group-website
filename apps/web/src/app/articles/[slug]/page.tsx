import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticles } from '@/app/lib/services/strapi-service';

// 1. Update the type: params is now a Promise
export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // 2. Await the params to get the slug
  const { slug } = await params;

  // 3. Fetch the article using the unwrapped slug
  const article = await getArticles(slug);

  if (!article) {
    notFound();
  }

  const { title, content_body, author_name, cover_image, content_media, publishedAt } = article;

  // Helper for images
  const getImageUrl = (image: { url?: string }) => {
    if (!image?.url) {
      return null;
    }
    if (image.url.startsWith('http')) {
      return image.url;
    }
    return `${process.env.STRAPI_URL}${image.url}`;
  };

  const coverUrl = getImageUrl(cover_image);

  return (
    <article className="max-w-4xl mx-auto px-6 py-16 font-sans min-h-screen">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">{title}</h1>
        <div className="text-gray-400 font-medium">
          By {author_name || 'Staff Writer'} •{' '}
          {publishedAt
            ? new Date(publishedAt).toLocaleDateString(undefined, { dateStyle: 'long' })
            : 'Recently'}
        </div>
      </header>

      {coverUrl && (
        <div className="mb-16 rounded-4xl overflow-hidden shadow-2xl border border-gray-800">
          <Image
            src={coverUrl}
            alt={title}
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* CONTENT SECTION */}
      <div className="prose prose-lg md:prose-xl prose-invert max-w-none mb-20">
        {content_body ? (
          <BlocksRenderer content={content_body} />
        ) : (
          <p className="text-gray-500">No content available.</p>
        )}
      </div>

      {/* MEDIA GALLERY */}
      {content_media && content_media.length > 0 && (
        <section className="border-t border-gray-800 pt-16">
          <h2 className="text-3xl font-bold mb-10 text-white">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content_media.map(
              (file: { id: string | number; url?: string; alternativeText?: string }) => (
                <div
                  key={file.id}
                  className="rounded-3xl overflow-hidden shadow-md bg-gray-900 border border-gray-800"
                >
                  <Image
                    src={getImageUrl(file) || ''}
                    alt={file.alternativeText || 'Gallery image'}
                    width={500}
                    height={288}
                    className="w-full h-72 object-cover hover:scale-105 transition duration-700"
                  />
                </div>
              ),
            )}
          </div>
        </section>
      )}

      <div className="mt-24 text-center pb-20">
        <Link
          href="/articles"
          className="inline-block px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition"
        >
          Back to Articles
        </Link>
      </div>
    </article>
  );
}
