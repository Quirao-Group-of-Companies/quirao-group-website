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
    <form action={handleSubmit} className="space-y-4 p-6 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-bold text-black">General Inquiry</h2>

      <input
        name="name"
        placeholder="Your Name"
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
        name="subject"
        placeholder="Subject (Optional)"
        className="w-full p-2 border rounded text-black"
      />
      <textarea
        name="message"
        placeholder="Message"
        required
        className="w-full p-2 border rounded text-black"
        rows={4}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Sending...' : 'Send Inquiry'}
      </button>

      {status?.success && (
        <p className="text-green-600 font-medium">✅ Inquiry saved and email sent to HR!</p>
      )}
      {status?.error && <p className="text-red-600 font-medium">❌ {status.error}</p>}
    </form>
  );
}
