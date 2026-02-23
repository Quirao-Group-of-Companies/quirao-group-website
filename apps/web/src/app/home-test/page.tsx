// app/page.tsx
// this is the test homepage, fetching data from Strapi and rendering it
// this is an example of how to fetch data from Strapi and render it in a Next.js pag
import Image from 'next/image';
import { getHomepage } from '@/app/lib/services/strapi-service';

interface HeroItem {
  id: number | string;
  title: string;
  description: string;
  logo?: { url: string };
  image?: { url: string };
}

interface AboutUsItem {
  id: number | string;
  title: string;
  description: string;
  image?: { url: string };
}

interface FaqItem {
  id: number | string;
  title: string;
  description: string;
}

export default async function Page() {
  const data = await getHomepage();

  // Strapi v5 often flattens the response, but we handle both cases here
  const hero = data?.Hero || [];
  const aboutUs = data?.AboutUs || [];
  const faqs = data?.FAQs || [];

  // Check if we have any data at all
  if (!data) {
    console.error('No homepage data found');
    return (
      <main>
        <p>Loading or no content available.</p>
      </main>
    );
  }

  return (
    <main>
      {/* HERO SECTION */}
      {hero.length > 0 ? (
        hero.map((item: HeroItem) => (
          <section key={item.id} className="hero-item">
            {/* Logo from Supabase (Full URL) */}
            {item.logo?.url && (
              <Image src={item.logo.url} alt="Logo" className="logo" width={150} height={150} />
            )}

            <h1>{item.title}</h1>
            <p>{item.description}</p>

            {/* Hero Image from Supabase (Full URL) */}
            {item.image?.url && (
              <Image
                src={item.image.url}
                alt={item.title}
                className="hero-bg"
                width={1200}
                height={600}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            )}
          </section>
        ))
      ) : (
        <p>No Hero content found.</p>
      )}

      <hr />

      {/* ABOUT US SECTION */}
      {aboutUs.map((item: AboutUsItem) => (
        <section key={item.id} className="about-us">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          {item.image?.url && (
            <Image
              src={item.image.url}
              alt={item.title}
              className="about-us-image"
              width={600}
              height={400}
            />
          )}
        </section>
      ))}

      <hr />

      {/* FAQS SECTION */}
      <section className="faqs-container">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((item: FaqItem) => (
          <article key={item.id} className="faq-item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
