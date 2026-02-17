"use client";
import { useState } from "react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface HomeFaqsMapProps {
  faqs: FAQ[];
}

export default function HomeFaqsMap({ faqs }: HomeFaqsMapProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="bg-gray-100 px-6 py-24">
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="rounded-xl overflow-hidden shadow-sm bg-white"
          >
            <button
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
              className={`w-full text-left p-5 flex justify-between items-center font-semibold text-lg transition-colors duration-300 ${
                activeIndex === index ? "bg-qgc-black text-white" : "bg-qgc-white text-qgc-black"
              }`}
            >
              {faq.question}
              <span
                className={`ml-2 collapse-arrow transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              >
                
              </span>
            </button>

            {activeIndex === index && (
              <div className="p-6 text-gray-700 bg-white">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
