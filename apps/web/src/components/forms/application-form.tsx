'use client';

import { useState } from 'react';
import { submitApplication } from '@/app/actions';

export function ApplicationForm() {
  const [status, setStatus] = useState<{ success?: boolean; error?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setStatus(null);
    const result = await submitApplication(formData);
    setLoading(false);
    setStatus(result);
  }

  return (
    <form action={handleSubmit} className="space-y-4 p-6 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-bold text-black">Job Application</h2>

      <input
        name="full_name"
        placeholder="Full Name"
        required
        className="w-full p-2 border rounded text-black"
      />
      <input
        name="email"
        type="email"
        placeholder="Email Address"
        required
        className="w-full p-2 border rounded text-black"
      />
      <input
        name="phone"
        placeholder="Phone Number"
        className="w-full p-2 border rounded text-black"
      />
      <textarea
        name="address"
        placeholder="Physical Address"
        className="w-full p-2 border rounded text-black"
        rows={2}
      />

      <div className="space-y-1">
        {/* Biome Fix: Changed label to span for A11y */}
        <span className="text-sm font-semibold text-gray-700 block">Resume (PDF)</span>
        <label className="flex flex-col items-center justify-center w-full h-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <span className="text-sm text-gray-600">Click to Upload Resume</span>
          <input
            name="resume_file"
            type="file"
            accept=".pdf"
            required
            className="hidden"
            onChange={(e) => {
              const fileName = e.target.files?.[0]?.name;
              if (fileName) {
                const display = e.target.parentElement?.querySelector('.file-name');
                if (display) {
                  display.textContent = fileName;
                }
              }
            }}
          />
          <span className="file-name text-xs text-blue-600 font-medium"></span>
        </label>
      </div>

      <textarea
        name="cover_letter"
        placeholder="Cover Letter"
        className="w-full p-2 border rounded text-black"
        rows={3}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? 'Uploading & Submitting...' : 'Submit Application'}
      </button>

      {status?.success && (
        <p className="text-green-600 font-medium">
          ✅ Resume uploaded, DB updated, and HR notified!
        </p>
      )}
      {status?.error && <p className="text-red-600 font-medium">❌ {status.error}</p>}
    </form>
  );
}
