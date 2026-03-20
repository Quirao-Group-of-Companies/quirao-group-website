import { ApplicationForm } from '@/components/forms/application-form';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function ApplicationPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Application Form Section */}
      <section className="bg-qgc-gray-soft py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center">
          {/* Right Content: Application Form */}
          <div className="w-full lg:w-4/5 xl:w-04/5 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all">
            <ApplicationForm />
          </div>
        </div>
      </section>
    </main>
  );
}
