"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { Button } from "@heroui/react";
import { FiSearch, FiCalendar, FiUsers, FiStar, FiCheckCircle } from "react-icons/fi";
import { LuStethoscope } from "react-icons/lu";

const Banner = () => {
  
  const slides = [
    {
      id: 1,
      img: "/banner1.jpg",
      badge: "Verified Healthcare",
      heading: (
        <>
          Your Health, <br />
          <span className="text-cyan-400">Our Priority</span>
        </>
      ),
      description: "Trusted clinics, real reviews, and seamless management of every appointment. Get access to the best medical professionals at your fingertips.",
    },
    {
      id: 2,
      img: "/banner2.jpg",
      badge: "24/7 Availability",
      heading: (
        <>
          Find Expert Doctors, <br />
          <span className="text-cyan-400">Book Instantly</span>
        </>
      ),
      description: "Connect with top-rated specialists in your area. Skip the long waiting queues and secure your appointment slots online within minutes.",
    },
    {
      id: 3,
      img: "/banner3.avif",
      badge: "Telehealth Services",
      heading: (
        <>
          Consult Online <br />
          <span className="text-cyan-400">From Home</span>
        </>
      ),
      description: "Experience hassle-free virtual consultations with experienced doctors. Get professional medical advice, prescriptions, and follow-ups securely.",
    },
  ];

  return (
    <div className="relative w-full h-[calc(100vh-64px)] min-h-[600px] overflow-hidden">
      
   
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]} 
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
         
            <div
              className="relative w-full h-full bg-cover bg-center transition-transform duration-[5000ms] scale-110"
              style={{ backgroundImage: `url('${slide.img}')` }}
            >
             
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              
             
              <div className="absolute inset-0 z-10 flex flex-col justify-center text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  
                 
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md w-fit px-3 py-1 rounded-full border border-white/20 mb-6">
                    <FiCheckCircle className="text-cyan-400" />
                    <span className="text-xs font-medium tracking-wider uppercase">{slide.badge}</span>
                  </div>

               
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                    {slide.heading}
                  </h1>

                  
                  <p className="text-lg text-slate-200 max-w-xl mb-8 leading-relaxed">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-12">
                    <Button
                      size="lg"
                      className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-8 rounded-xl shadow-lg shadow-cyan-500/30"
                      startContent={<FiSearch className="w-5 h-5" />}
                    >
                      Browse Doctors
                    </Button>
                    <Button
                      size="lg"
                      variant="bordered"
                      className="border-white/50 hover:bg-white/10 text-white font-bold px-8 rounded-xl backdrop-blur-sm"
                      startContent={<FiCalendar className="w-5 h-5" />}
                    >
                      My Bookings
                    </Button>
                  </div>

                
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl pt-8 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                        <LuStethoscope className="text-cyan-400 w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold">500+</h4>
                        <p className="text-xs text-slate-400">Verified Doctors</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                        <FiStar className="text-cyan-400 w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold">4.9</h4>
                        <p className="text-xs text-slate-400">Avg. Rating</p>
                      </div>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                      <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                        <FiUsers className="text-cyan-400 w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold">50k+</h4>
                        <p className="text-xs text-slate-400">Appointments</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
     
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #06b6d4 !important;
          opacity: 1;
          width: 25px;
          border-radius: 5px;
        }
        .swiper-pagination {
          bottom: 24px !important;
          z-index: 20 !important;
        }
      `}</style>
    </div>
  );
};

export default Banner;