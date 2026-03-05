'use client';

import { useState } from 'react';
import { submitInquiry } from '@/app/actions';

export function InquiryForm() {
  const [status, setStatus] = useState<{ success?: boolean; error?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setStatus(null);
    const result = await submitInquiry(formData);
    setLoading(false);
    setStatus(result);
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-8 p-2 md:p-2 bg-transparent w-full"
    >
      <div className="border-b pb-6 mb-6">
        <h2 className="text-3xl font-bold text-gray-900 font-akrux uppercase">General Inquiry</h2>
        <p className="text-gray-500 text-sm mt-1">We'd love to hear from you. Send us a message and we'll get back to you shortly.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
   
     {/* Full name*/}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-bold text-gray-700 uppercase tracking-wider block">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Enter your full name"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
          />
          </div>

         {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-bold text-gray-700 uppercase tracking-wider block">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              required
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
            />
          </div>
          
         {/* Phone */}
          <div className="space-y-2">
            <label htmlFor="number" className="text-sm font-bold text-gray-700 uppercase tracking-wider block">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="number"
              name="number"
              type="number"
              placeholder="0919637192"
              required
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
            />
          </div>
        
        {/* Message */}
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-bold text-gray-700 uppercase tracking-wider block">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us how we can help..."
            required
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-black h-48 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none"
          />
        </div>
      </div>

      <div className="pt-6">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-5 rounded-2xl font-bold hover:bg-gray-800 transition-all disabled:bg-gray-400 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 uppercase tracking-widest"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : 'Send Message'}
        </button>
      </div>

      {status?.success && (
        <div className="mt-6 text-green-600 font-bold text-center bg-green-50 p-4 rounded-2xl border border-green-200 flex items-center justify-center gap-2">
          <span>✅</span> Inquiry sent successfully!
        </div>
      )}
      {status?.error && (
        <div className="mt-6 text-red-600 font-bold text-center bg-red-50 p-4 rounded-2xl border border-red-200 flex items-center justify-center gap-2">
          <span>❌</span> {status.error}
        </div>
      )}
    </form>
  );
}
