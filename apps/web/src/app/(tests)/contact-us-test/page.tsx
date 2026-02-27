import ContactUsClient from '@/components/page-sections/contact-us-client';
import { getContactUsPage } from '@/lib/services/strapi-contact-us';

export default async function ContactUsTestPage() {
  const data = await getContactUsPage();

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 font-medium">No content available.</p>
      </div>
    );
  }

  return (
    <main className="w-full pt-24 pb-24">
      <ContactUsClient initialData={data} />
    </main>
  );
}
