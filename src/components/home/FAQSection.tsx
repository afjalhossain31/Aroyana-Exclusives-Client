"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is your exchange policy?",
    answer:
      "We offer hassle-free exchanges within 7 days of delivery, provided the product remains unused and in its original condition.",
  },
  {
    question: "Do you offer custom tailoring?",
    answer:
      "Yes. Selected premium collections can be tailored to your measurements. Contact our support team before placing your order.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you'll receive an email and SMS with a tracking link to monitor your delivery in real time.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, Mastercard, bKash, Nagad, Rocket, and Cash on Delivery for eligible locations.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-15 bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-5xl mx-auto px-4">

        <div className="text-center mb-15"> 
          <span className="uppercase tracking-[0.3em] text-xs font-bold text-gray-400">
            Support
          </span>

          <h2 className="text-4xl md:text-5xl font-black mt-8 uppercase text-neutral-900 ">
            Frequently Asked Questions
          </h2>

          <p className="text-neutral-500 mt-5 max-w-2xl mx-auto leading-7">
            Everything you need to know about orders, delivery,
            exchanges, and our premium shopping experience.
          </p>
        </div>

        <div className="space-y-5">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-3xl border border-neutral-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="w-full flex items-center justify-between p-7 text-left"
              >
                <div className="flex items-center gap-5">

                  <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-neutral-900">
                    {faq.question}
                  </h3>

                </div>

                <ChevronDown
                  className={`transition-transform duration-300 ${
                    open === index ? "rotate-180" : ""
                  }`}
                  size={24}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  open === index
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-7 pb-7 pl-24 text-neutral-600 leading-8">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}