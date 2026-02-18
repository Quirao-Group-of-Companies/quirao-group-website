import { ApplicationForm } from '@/components/forms/application-form';

export default function CareersPage() {
  return (
    <div>
      <h1>Hello from Careers</h1>
      <ApplicationFormsTestPage />
    </div>
  );
}

export function ApplicationFormsTestPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Backend Integration Test</h1>
          <p className="text-gray-600">Testing Drizzle + Supabase + Resend</p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-xl">
            <ApplicationForm />
          </div>
        </div>
      </div>
    </main>
  );
}
