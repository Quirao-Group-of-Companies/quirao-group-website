"use client";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden shadow-sm bg-white border border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left p-4 flex justify-between items-center font-semibold text-lg transition-colors duration-300 ${
          isOpen ? "bg-qgc-black text-white" : "bg-qgc-white text-qgc-black hover:bg-gray-50"
        }`}
      >
        <span>{question}</span>
        <ChevronDownIcon
          className={`ml-2 w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 text-gray-700 bg-white border-t border-gray-100">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}
