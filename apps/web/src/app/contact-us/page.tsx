import { getContactUsPage } from '@cms/services';
import type { ContactUsPageData } from '@cms/types';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import OurBusinessPreview from '@/components/contact-us/SubsidiaryContacts.client';
import { InquiryForm } from '@/components/forms/inquiry-form';

export default async function ContactUsPage() {
  const contactData: ContactUsPageData | null = await getContactUsPage();

  const qgcInfo = contactData?.mainContact;
  const qgcText = contactData?.introText;

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
                {qgcText?.description ||
                  "We'd love to hear from you! Send your inquiry using the contact form or check our information below for more details."}
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
                    <p className="font-bold text-black uppercase text-sm tracking-wider">
                      Our Office
                    </p>
                    <p className="text-gray-600">
                      {qgcInfo?.address || 'Iloilo, Iloilo City, Philippines, 5000'}
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <PhoneIcon className="w-6 h-6 text-black shrink-0" />
                  <div>
                    <p className="font-bold text-black uppercase text-sm tracking-wider">
                      Phone Number
                    </p>
                    <a
                      href={`tel:${qgcInfo?.phoneNumber || '0999 999 9999'}`}
                      className="text-gray-600 hover:text-black transition-colors"
                    >
                      {qgcInfo?.phoneNumber || '0999 999 9999'}
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <EnvelopeIcon className="w-6 h-6 text-black shrink-0" />
                  <div>
                    <p className="font-bold text-black uppercase text-sm tracking-wider">
                      Email Address
                    </p>
                    <a
                      href={`mailto:${qgcInfo?.email || 'management@quiraogroup.com'}`}
                      className="text-gray-600 hover:text-black transition-colors"
                    >
                      {qgcInfo?.email || 'management@quiraogroup.com'}
                    </a>
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
      <OurBusinessPreview
        businesses={contactData?.subsidiaryContacts || []}
        imagePosition="right"
      />
    </main>
  );
}
