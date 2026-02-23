export default function Newsroom() {
  return <h1>Hello from Article list section</h1>;
}

//Example code for articles list page:

// import { getArticles } from "@/app/lib/services/strapi-articles";
// import Link from "next/link";
// import Image from "next/image";

// interface StrapiImage {
//   id: number;
//   url: string;
//   alternativeText?: string;
// }

// interface Article {
//   id: number;
//   title: string;
//   slug: string;
//   excerpt: string;
//   cover_image: StrapiImage | null;
// }

// export default async function ArticlesListPage() {
//   const articles = await getArticles();

//   if (!articles || articles.length === 0) {
//     return <div className="p-10 text-center">No articles found.</div>;
//   }

//   return (
//     <main className="max-w-6xl mx-auto p-8">
//       <h1 className="text-4xl font-bold mb-10 text-white">Latest Articles</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {articles.map((article: Article) => {
//           const { title, slug, excerpt, cover_image, id } = article;

//           const getImageUrl = (image: StrapiImage | null) => {
//             if (!image?.url) return null;
//             if (image.url.startsWith("http")) return image.url;
//             return `${process.env.STRAPI_URL || "http://127.0.0.1:1337"}${image.url}`;
//           };

//           const imageUrl = getImageUrl(cover_image);

//           return (
//             <Link
//               href={`/articles/${slug}`}
//               key={id}
//               className="group border border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-gray-900"
//             >
//               <div className="aspect-video bg-gray-800 overflow-hidden relative">
//                 {imageUrl ? (
//                   <Image
//                     src={imageUrl}
//                     alt={title}
//                     fill
//                     sizes="(max-width: 768px) 100vw, 33vw"
//                     className="object-cover group-hover:scale-105 transition duration-500"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center text-gray-500">
//                     No Image
//                   </div>
//                 )}
//               </div>
//               <div className="p-5">
//                 <h2 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
//                   {title}
//                 </h2>
//                 <p className="text-gray-400 line-clamp-2 text-sm leading-relaxed">
//                   {excerpt}
//                 </p>
//                 <div className="mt-4 text-blue-400 text-sm font-semibold">
//                   Read more →
//                 </div>
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </main>
//   );
// }