import { getArticles } from "@/app/lib/services/strapi-articles";
import Link from "next/link";

export default async function ArticlesListPage() {
  const articles = await getArticles();

  if (!articles || articles.length === 0) {
    return <div className="p-10 text-center">No articles found.</div>;
  }

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-10">Latest Articles</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article: any) => {
          // Strapi v5: access properties directly
          const { title, slug, excerpt, cover_image, id } = article;
          
          const getImageUrl = (image: any) => {
            if (!image?.url) return null;
            // If it's already a full URL (like from Supabase), return it
            if (image.url.startsWith('http')) return image.url;
            // If it's a relative path from Strapi, prefix it
            return `${process.env.STRAPI_URL || 'http://127.0.0.1:1337'}${image.url}`;
          };

          const imageUrl = getImageUrl(cover_image);

          return (
            <Link 
              href={`/articles/${slug}`} 
              key={id} 
              className="group border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className="aspect-video bg-gray-100 overflow-hidden">
                {imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt={title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{title}</h2>
                <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">{excerpt}</p>
                <div className="mt-4 text-blue-500 text-sm font-semibold">Read more →</div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}