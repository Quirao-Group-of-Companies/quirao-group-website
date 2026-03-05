import OurBusinessPreview from '@/components/homepage/BusinessPreview';
import { InquiryForm } from '@/components/forms/inquiry-form';
import { getHomepage } from '@/lib/services/strapi-homepage';
import { getContactUsPage } from '@/lib/services/strapi-contact-us';
import type { Business, HomepageData, SubPreviewItem } from '@/types/homepage';

export default async function ContactUsPage() {
  const [homepageData, contactData] = await Promise.all([
    getHomepage(),
    getContactUsPage()
  ]);

  const businessesData: Business[] =
    homepageData?.SubPreview?.map((b: SubPreviewItem) => ({
      id: b.id,
      name: b.logo?.logoName || `business-${b.id}`,
      description: b.description,
      image: b.image?.url || null,
      cardImage: b.cardImage?.url || null,
      logo: b.logo?.image?.url || null,
      cta: b.cta || null,
    })) || [];

  return (
    <main className="min-h-screen bg-white">

      {/* Inquiry Form Section */}
      <section className="bg-qgc-gray-soft py-24 px-6 ">
        <div className="max-w-5xl mx-auto flex justify-center align-center">
          <div className="text-start mb-16">
            <div className="flex-col flex justify-start align-start gap-10">
              <h2 className="text-4xl font-bold text-qgc-black font-akrux uppercase mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Have any questions or business inquiries? We're here to help. 
                Feel free to reach out to us using the form below.
              </p>
                  <h2 className="text-4xl font-bold text-qgc-black font-akrux uppercase mb-4">
                Contact Information
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Have any questions or business inquiries? We're here to help. 
                Feel free to reach out to us using the form below.
              </p>
            </div>
            
          </div>
          
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 p-2 md:p-6">
            <InquiryForm />
          </div>

        </div>
      </section>

      {/* Business Preview Section */}
      <OurBusinessPreview businesses={businessesData} />

  

    </main>
  );
}
