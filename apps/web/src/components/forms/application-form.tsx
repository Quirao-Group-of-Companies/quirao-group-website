'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { submitApplication } from '@/app/actions';
import StatusModal from '@/components/ui/StatusModal.client';

export function ApplicationForm() {
  const [status, setStatus] = useState<{ success?: boolean; error?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const MAX_CHARS = 3500;

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setStatus(null);
    const result = await submitApplication(formData);
    setLoading(false);
    setStatus(result);

    if (result.success) {
      formRef.current?.reset();
      setCharCount(0);
      // Clear file name display
      const display = formRef.current?.querySelector('.file-name');
      if (display) {
        display.textContent = 'No files selected';
        display.classList.add('text-qgc-gray-deep');
        display.classList.remove('text-qgc-black');
      }
    }
  }

  const handleCloseModal = () => {
    setStatus(null);
  };

  return (
    <>
      <form
        ref={formRef}
        action={handleSubmit}
        className="space-y-8  bg-transparent w-full"
      >
        <div className="border-b mb-6">
          <div className="w-full bg-qgc-black h-20 md:h-45 flex justify-center items-center">
             <Image
                src="/images/logo/qgc-logo-black.jpg"
                alt="Quirao Group Logo"
                width={350}
                height={60}
                className="object-contain"
           />
          </div>
        </div>

        <div className="grid grid-cols-1 p-4 md:p-10 gap-2">
          {/* Full Name */}
          <div className="space-y-2">
            <label
              htmlFor="full_name"
              className="text-sm font-bold text-qgc-charcoal uppercase tracking-wider block"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="full_name"
              name="full_name"
              placeholder="Enter your full name"
              required
              className="w-full p-4 bg-qgc-gray-soft border border-qgc-gray-light rounded-xl text-qgc-black focus:ring-2 focus:ring-qgc-black focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Phone */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-bold text-qgc-charcoal uppercase tracking-wider block"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                placeholder="+63 900 000 0000"
                required
                className="w-full p-4 bg-qgc-gray-soft border border-qgc-gray-light rounded-xl text-qgc-black focus:ring-2 focus:ring-qgc-black focus:border-transparent outline-none transition-all"
              />
            </div>
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-bold text-qgc-charcoal uppercase tracking-wider block"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                required
                className="w-full p-4 bg-qgc-gray-soft border border-qgc-gray-light rounded-xl text-qgc-black focus:ring-2 focus:ring-qgc-black focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label
              htmlFor="address"
              className="text-sm font-bold text-qgc-charcoal uppercase tracking-wider block"
            >
              Residential Address <span className="text-red-500">*</span>
            </label>
            <input
              id="address"
              name="address"
              placeholder="House No., Street, City, Province"
              required
              className="w-full p-4 bg-qgc-gray-soft border border-qgc-gray-light rounded-xl text-qgc-black focus:ring-2 focus:ring-qgc-black focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Government Benefits */}
          <div className="space-y-4 bg-qgc-gray-soft p-6 rounded-2xl border border-qgc-gray-soft">
            <span className="text-sm font-bold text-qgc-charcoal uppercase tracking-wider block">
              Government Benefits (Check all that apply): <span className="text-red-500">*</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="flex items-center gap-3 cursor-pointer group bg-qgc-white p-3 rounded-lg border border-qgc-gray-light hover:border-qgc-black transition-all">
                <input
                  type="checkbox"
                  name="sss"
                  className="w-5 h-5 border-qgc-gray-light rounded accent-qgc-black"
                />
                <span className="text-qgc-charcoal font-medium group-hover:text-qgc-black transition-colors uppercase">
                  SSS
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group bg-qgc-white p-3 rounded-lg border border-qgc-gray-light hover:border-qgc-black transition-all">
                <input
                  type="checkbox"
                  name="philhealth"
                  className="w-5 h-5 border-qgc-gray-light rounded accent-qgc-black"
                />
                <span className="text-qgc-charcoal font-medium group-hover:text-qgc-black transition-colors uppercase">
                  Philhealth
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group bg-qgc-white p-3 rounded-lg border border-qgc-gray-light hover:border-qgc-black transition-all">
                <input
                  type="checkbox"
                  name="pag_ibig"
                  className="w-5 h-5 border-qgc-gray-light rounded accent-qgc-black"
                />
                <span className="text-qgc-charcoal font-medium group-hover:text-qgc-black transition-colors uppercase">
                  Pag-IBIG
                </span>
              </label>
            </div>
          </div>

          {/* Resume Upload */}
          <div className="space-y-2">
            <span className="text-sm font-bold text-qgc-charcoal uppercase tracking-wider block">
              Resume / CV <span className="text-red-500">*</span>
            </span>
            <label
              htmlFor="resume_file"
              className="group flex items-stretch w-full bg-qgc-gray-soft border border-qgc-gray-light rounded-xl cursor-pointer hover:border-qgc-black transition-all overflow-hidden"
            >
              <div className="flex-1 flex items-center px-4 py-4">
                <span className="file-name text-qgc-gray-deep truncate">
                  No files selected
                </span>
              </div>
              <div className="w-1/4 flex-shrink-0 bg-qgc-gray-soft text-qgc-black border-l border-qgc-gray-light flex items-center justify-center gap-2 group-hover:bg-qgc-black group-hover:text-qgc-white transition-all px-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Paperclip icon"
                >
                  <title>Paperclip Icon</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
                <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
                  Choose file
                </span>
              </div>
              <input
                id="resume_file"
                name="resume_file"
                type="file"
                accept=".pdf"
                required
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  const display = e.target.parentElement?.querySelector('.file-name');
                  if (display) {
                    if (file) {
                      display.textContent = file.name;
                      display.classList.remove('text-qgc-gray-deep');
                      display.classList.add('text-qgc-black');
                    } else {
                      display.textContent = 'No files selected';
                      display.classList.add('text-qgc-gray-deep');
                      display.classList.remove('text-qgc-black');
                    }
                  }
                }}
              />
            </label>
            <p className="text-xs text-qgc-gray-deep">PDF format only (max. 10MB)</p>
          </div>

          {/* Cover Letter */}
          <div className="space-y-2">
            <label
              htmlFor="cover_letter"
              className="text-sm font-bold text-qgc-charcoal uppercase tracking-wider block"
            >
              Cover Letter / Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="cover_letter"
              name="cover_letter"
              placeholder="Tell us why you're a great fit for Quirao Group..."
              required
              maxLength={MAX_CHARS}
              onChange={(e) => setCharCount(e.target.value.length)}
              className="w-full p-4 bg-qgc-gray-soft border border-qgc-gray-light rounded-xl text-qgc-black h-48 focus:ring-2 focus:ring-qgc-black focus:border-transparent outline-none transition-all resize-none"
            />
            <div className="flex justify-end">
              <span className={`text-xs ${charCount >= MAX_CHARS ? 'text-red-500 font-bold' : 'text-qgc-gray-deep'}`}>
                {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 flex justify-center items-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-qgc-black text-qgc-white py-5 rounded-2xl font-bold hover:bg-qgc-gray-deep transition-all disabled:bg-qgc-gray-light shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 uppercase tracking-widest"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-qgc-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-label="Loading"
                  >
                    <title>Loading</title>
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Status Modal */}
      <StatusModal
        isOpen={status !== null}
        onClose={handleCloseModal}
        type={status?.success ? 'success' : 'error'}
        title={status?.success ? 'Application Submitted' : 'Submission Failed'}
        message={
          status?.success
            ? 'Your application has been successfully submitted! Our HR team will review your profile and get in touch with you soon.'
            : status?.error ||
              'Something went wrong while submitting your application. Please try again.'
        }
      />
    </>
  );
}
