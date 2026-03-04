'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import Image from 'next/image';

const FEEDBACKS = [
  {
    id: 1,
    name: 'John Doe',
    rating: 5,
    testimonial:
      " Really spacious and airy. We arrived just before 9pm. Lots of free parking spaces. They close at 10pm. Service was reasonably quick as it wasn't busy at the time. Clean public facilities. The staff were all friendly and helpful.",
    image: '/images/paluto/showcase 1.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    rating: 4,
    testimonial:
      'Excellent selection of fish, scallops, shellfish, pork and chicken, best of all you can have them cooked however you want. The place is very accessible via the Iloilo-Dumangas Coastal Road and just adjacent to the Iloilo-Guimaras strait.',
    image: '/images/paluto/showcase 2.jpg',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    rating: 4,
    testimonial:
      "The place is huge! The food is delicious. The staff is welcoming. Since it's a big place, there is no need to rush to give way to incoming customers.",
    image: '/images/paluto/showcase 3.jpg',
  },
  {
    id: 4,
    name: 'Sarah Williams',
    rating: 5,
    testimonial:
      'Nice place for dining out. Better than some 5 star restaurants. Worth the drive, food is fresh and has high quality cooking.',
    image: '/images/paluto/showcase 4.jpg',
  },
];

export default function Feedback() {
  return (
    <section className="bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-5xl font-black uppercase italic text-black tracking-tighter">
            OUR <span className="text-paluto-red">FEEDBACK</span>
          </h2>
          <div className="w-24 h-1.5 bg-paluto-yellow mt-2" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {FEEDBACKS.map((fb, index) => (
            <motion.div
              key={fb.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="card card-side bg-base-100 shadow-xl rounded-[2rem] border border-base-300 overflow-hidden"
            >
              <figure className="w-1/3 relative h-full min-h-[160px]">
                <Image src={fb.image} alt={fb.name} fill className="object-cover" />
              </figure>
              <div className="card-body w-2/3 p-6 md:p-8 justify-center bg-qgc-gray-soft">
                <h3 className="card-title text-black font-bold uppercase text-lg">{fb.name}</h3>
                {/* Rating using Heroicons */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={`${fb.id}-star-${i}`}
                      className={`w-5 h-5 ${i < fb.rating ? 'text-paluto-red' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-black italic mt-2">"{fb.testimonial}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
