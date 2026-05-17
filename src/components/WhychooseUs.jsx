"use client";

import React from "react";
import { FiClock, FiShield, FiHeart } from "react-icons/fi";

const WhyChooseUs = () => {
  const brandColor = "#023154";
  const accentColor = "#2ED8E3";

  const features = [
    {
      id: 1,
      icon: <FiClock className="w-6 h-6" />,
      title: "24/7 Easy Booking",
      desc: "Book appointments anytime, anywhere with instant email and dashboard updates instantly.",
    },
    {
      id: 2,
      icon: <FiShield className="w-6 h-6" />,
      title: "Verified Specialists",
      desc: "All our doctors are fully certified, licensed, and highly trusted experts in their fields.",
    },
    {
      id: 3,
      icon: <FiHeart className="w-6 h-6" />,
      title: "Patient-Centric Care",
      desc: "Your health is our utmost priority. We ensure real user reviews for genuine healthcare guidance.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Header */}
        <span 
          className="text-xs font-bold tracking-widest uppercase px-3 py-1 bg-slate-100 rounded-full"
          style={{ color: brandColor }}
        >
          Features
        </span>
        <h2 
          className="text-3xl md:text-4xl font-bold mt-3 mb-4 tracking-tight"
          style={{ color: brandColor }}
        >
          Why Choose DocAppoint?
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto text-sm mb-12">
          We bring top-tier healthcare logistics closer to you, eliminating long waiting lines.
        </p>

     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item) => (
            <div 
              key={item.id}
              className="p-8 rounded-2xl bg-slate-50/50 border border-slate-100 shadow-sm text-left transition-all duration-300 group hover:-translate-y-1 hover:shadow-md"
              onMouseEnter={(e) => e.currentTarget.style.borderColor = accentColor}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(241, 245, 249, 0.5)'}
            >
             
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ 
                  backgroundColor: brandColor,
                  boxShadow: `0 4px 12px -2px ${brandColor}30`
                }}
              >
                {item.icon}
              </div>
              
              <h3 
                className="text-lg font-bold mb-2 transition-colors duration-200 group-hover:text-slate-800"
                style={{ color: brandColor }}
              >
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;