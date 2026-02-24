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
    <form
      action={handleSubmit}
      className="space-y-5 p-8 border rounded-xl bg-white shadow-lg max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-black border-b pb-4">Quirao Application Form</h2>

      <div className="grid grid-cols-1 gap-4">
        {/* Full Name */}
        <div>
          <label htmlFor="full_name" className="block text-sm font-bold text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="full_name"
            name="full_name"
            placeholder="Full Name"
            required
            className="w-full p-2 border rounded text-black focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              placeholder="Phone"
              required
              className="w-full p-2 border rounded text-black"
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full p-2 border rounded text-black"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-bold text-gray-700 mb-1">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            id="address"
            name="address"
            placeholder="Address"
            required
            className="w-full p-2 border rounded text-black"
          />
        </div>

        {/* Government Benefits */}
        <div className="space-y-2">
          <span className="text-sm font-bold text-gray-700 block">
            Do you have (check all fields that apply): <span className="text-red-500">*</span>
          </span>
          <div className="flex flex-col space-y-2 pl-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="sss"
                className="w-5 h-5 border-gray-300 rounded accent-green-600"
              />
              <span className="text-gray-700 group-hover:text-black transition-colors">SSS</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="philhealth"
                className="w-5 h-5 border-gray-300 rounded accent-green-600"
              />
              <span className="text-gray-700 group-hover:text-black transition-colors">
                Philhealth
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="pag_ibig"
                className="w-5 h-5 border-gray-300 rounded accent-green-600"
              />
              <span className="text-gray-700 group-hover:text-black transition-colors">
                Pag-IBIG
              </span>
            </label>
          </div>
        </div>

        {/* Resume Upload */}
        <div className="space-y-1">
          <span className="text-sm font-bold text-gray-700 block">
            Resume <span className="text-red-500">*</span>
          </span>
          <label
            htmlFor="resume_file"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                role="img"
                aria-label="Upload icon"
              >
                <title>Upload Resume Icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400 underline">Upload Resume in a PDF file format.</p>
              <span className="file-name text-sm text-green-600 font-bold mt-2"></span>
            </div>
            <input
              id="resume_file"
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
          </label>
        </div>

        {/* Cover Letter */}
        <div>
          <label htmlFor="cover_letter" className="block text-sm font-bold text-gray-700 mb-1">
            Cover Letter <span className="text-red-500">*</span>
          </label>
          <textarea
            id="cover_letter"
            name="cover_letter"
            placeholder="Write a short description of your cover letter."
            required
            className="w-full p-2 border rounded text-black h-32"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white p-3 rounded-lg font-bold hover:bg-gray-800 transition-colors disabled:bg-gray-400 mt-4 shadow-md"
      >
        {loading ? 'Processing...' : 'Submit Application'}
      </button>

      {status?.success && (
        <p className="text-green-600 font-bold text-center bg-green-50 p-3 rounded-lg border border-green-200">
          ✅ Application Submitted Successfully!
        </p>
      )}
      {status?.error && (
        <p className="text-red-600 font-bold text-center bg-red-50 p-3 rounded-lg border border-red-200">
          ❌ {status.error}
        </p>
      )}
    </form>
  );
}
