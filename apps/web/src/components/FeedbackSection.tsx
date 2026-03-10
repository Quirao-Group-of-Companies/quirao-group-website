'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Feedback = {
  id: number;
  name: string;
  image: string;
  rating: number;
  comment: string;
};

type FeedbackSectionProps = {
  feedbacks?: Feedback[];
};

export default function FeedbackSection({ feedbacks = [] }: FeedbackSectionProps) {
  // If no feedbacks are provided from CMS, we don't render this section
  if (!feedbacks || feedbacks.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase italic text-black tracking-tighter text-center">
            Customer <span className="text-paluto-green">Feedbacks</span>
          </h2>
          <div className="w-24 h-1.5 bg-paluto-yellow mt-2" />
        </div>

        {/* 2x2 Grid or single column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {feedbacks.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row bg-qgc-gray-soft rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Left Side: Image */}
              <div className="relative w-full sm:w-48 lg:w-56 h-48 sm:h-auto shrink-0">
                <Image src={review.image} alt={review.name} fill className="object-cover" />
              </div>

              {/* Right Side: Content */}
              <div className="p-8 flex flex-col justify-center flex-1">
                <h3 className="text-xl font-bold text-qgc-black font-poppins mb-1">
                  {review.name}
                </h3>

                {/* Stars based on rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={`star-${review.id}-${i}`}
                      className={`w-5 h-5 ${
                        i < review.rating ? 'text-paluto-yellow' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-600 font-poppins leading-relaxed">"{review.comment}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
