import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import InteractiveShowcase, { ShowcaseItem } from '@/components/ui/SubsidiaryShowcase';
import { InquiryForm } from '@/components/forms/inquiry-form';
import { getContactUsPage } from '@/lib/services/strapi-contact-us';
import type { ContactUsPageData, StrapiSubContacts } from '@cms/types/strapi-components';

export default async function ContactUsPage() {
  const contactData: ContactUsPageData | null = await getContactUsPage();

  const qgcInfo = contactData?.qgcContacts;
  const qgcText = contactData?.qgcText;

  // Transform subsidiary data from CMS to the format expected by InteractiveShowcase
  const businessesData: ShowcaseItem[] =
    contactData?.subsContacts?.map((sub: StrapiSubContacts) => ({
      id: sub.id,
      name: sub.subName || "",
      description: "", // StrapiSubContacts does not have a description field
      image: sub.displayImage?.url || null,
      cardImage: sub.cardImage?.url || null,
      logo: sub.logo?.image?.url || null,
      cta: sub.cta
        ? {
            title: sub.cta.title || "",
            href: sub.cta.href || "#",
          }
        : null,
      address: sub.address || "",
      contactNum: sub.contactNum || "",
      email: sub.email || "",
    })) || [];

  return (  
    <main className="min-h-screen bg-white">
      {/* Inquiry Form Section */}
      <section className="bg-qgc-gray-soft py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left Content: Contact Information */}
          <div className="lg:w-1/2 space-y-12">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-qgc-black font-akrux uppercase mb-6 leading-tight">
                {qgcText?.title || 'Contact Us'}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                {qgcText?.description || "We'd love to hear from you! Send your inquiry using the contact form or check our information below for more details."}
              </p>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-qgc-black font-akrux uppercase border-b border-gray-200 pb-4">
                Contact Information
              </h2>
              <ul className="space-y-6">
                <li className="flex items-center gap-4">
                  <MapPinIcon className="w-6 h-6 text-black shrink-0" />
                  <div>
                    <p className="font-bold text-black uppercase text-sm tracking-wider">Our Office</p>
                    <p className="text-gray-600">{qgcInfo?.address || 'Iloilo, Iloilo City, Philippines, 5000'}</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <PhoneIcon className="w-6 h-6 text-black shrink-0" />
                  <div>
                    <p className="font-bold text-black uppercase text-sm tracking-wider">Phone Number</p>
                    <p className="text-gray-600">{qgcInfo?.contactNum || '0999 999 9999'}</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <EnvelopeIcon className="w-6 h-6 text-black shrink-0" />
                  <div>
                    <p className="font-bold text-black uppercase text-sm tracking-wider">Email Address</p>
                    <p className="text-gray-600">{qgcInfo?.email || 'management@quiraogroup.com'}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right Content: Inquiry Form */}
          <div className="w-full lg:w-125 xl:w-150 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all">
            <InquiryForm />
          </div>

        </div>
      </section>

      {/* Business Preview Section */}
      <InteractiveShowcase items={businessesData} title="Our Subsidiaries" />
    </main>
  );
}
