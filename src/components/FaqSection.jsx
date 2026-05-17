"use client";

import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FaqSection = () => {
  const brandColor = "#023154";
  const accentColor = "#2ED8E3";


  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I book a doctor's appointment?",
      answer: "Simply go to the 'Browse Doctors' section from our banner or navigation. Choose your preferred specialist and click on book to secure your slot instantly.",
    },
    {
      question: "Can I manage or view my bookings later?",
      answer: "Yes, absolutely! All your scheduled appointments can be effortlessly tracked, checked, and managed directly inside your user Dashboard.",
    },
    {
      question: "Are the reviews and doctor listings verified?",
      answer: "Yes, every profile features strictly verified healthcare tags and real community reviews to preserve optimal trust and medical transparency.",
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer: "Yes, you can easily reschedule or cancel your bookings directly from your Dashboard before the scheduled time slot without any hassle.",
    },
    {
      question: "Do doctors offer online video consultations?",
      answer: "Yes, many of our verified specialists provide telehealth services. You can filter for online consultants and connect with them safely from home.",
    },
    {
      question: "What should I do if I face technical issues during booking?",
      answer: "If you experience any platform issues, you can reach out to our support team instantly via the contact page or drop us a message for quick assistance.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-slate-50/60 border-t border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span 
            className="text-xs font-bold tracking-widest uppercase px-3 py-1 bg-white rounded-full border border-slate-100"
            style={{ color: brandColor }}
          >
            Support
          </span>
          <h2 
            className="text-3xl font-bold mt-3 tracking-tight"
            style={{ color: brandColor }}
          >
            Frequently Asked Questions
          </h2>
        </div>

     
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="bg-white border rounded-xl overflow-hidden transition-all duration-200"
                style={{ borderColor: isOpen ? accentColor : '#e2e8f0' }}
              >
                
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold transition-colors duration-200"
                  style={{ color: isOpen ? brandColor : '#334155' }}
                >
                  <span className="text-base md:text-md">{faq.question}</span>
                  <FiChevronDown 
                    className="w-5 h-5 text-slate-400 transition-transform duration-300" 
                    style={{ 
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      color: isOpen ? accentColor : '' 
                    }}
                  />
                </button>

          
                <div 
                  className="transition-all duration-300 ease-in-out"
                  style={{ 
                    maxHeight: isOpen ? "250px" : "0px", 
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-500 leading-relaxed border-t border-slate-50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FaqSection;