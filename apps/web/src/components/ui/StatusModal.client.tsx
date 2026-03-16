'use client';

import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  title: string;
  message: string;
}

export default function StatusModal({ isOpen, onClose, type, title, message }: StatusModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-md overflow-hidden bg-white rounded-3xl shadow-2xl"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <div className="p-8 pt-12 text-center">
              {/* Icon Container */}
              <div className="flex justify-center mb-6">
                <div
                  className={`p-4 rounded-full ${
                    type === 'success' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
                  }`}
                >
                  {type === 'success' ? (
                    <CheckCircleIcon className="w-12 h-12" />
                  ) : (
                    <XCircleIcon className="w-12 h-12" />
                  )}
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-bold text-gray-900 font-akrux uppercase mb-3">
                {title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8">{message}</p>

              {/* Action Button */}
              <button
                type="button"
                onClick={onClose}
                className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest transition-all shadow-lg hover:shadow-xl ${
                  type === 'success'
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {type === 'success' ? 'Got it, thanks!' : 'Try Again'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
