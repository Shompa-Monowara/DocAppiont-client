"use client";

import { Card } from "@heroui/react";

const reviews = [
  { name: "Fahim Uddin", rating: 5, text: "Booking was seamless and the doctor was incredibly attentive. Highly recommend DocAppoint!" },
  { name: "Nusrat Akter", rating: 5, text: "Found the perfect specialist within minutes. The platform saved me so much time." },
  { name: "Jahid Hasan", rating: 4, text: "Great experience overall. Loved the clean interface and quick confirmation." },
  { name: "Zakaria Hasan", rating: 5, text: "My pediatrician was wonderful with my son. Will book again." },
  { name: "Ahmed Yamin", rating: 5, text: "Trusted doctors, transparent fees, and zero hassle. Five stars." },
  { name: "Fariha Chowdhury", rating: 4, text: "Easy to use and very reliable. Made managing appointments effortless." },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-1 mb-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? "text-amber-400" : "text-gray-200"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function PatientReviews() {
  return (
    <section className="bg-[#f0f6fc] py-16 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-[#023154]">
          What Patients Say
        </h2>
        <p className="text-slate-500 mt-2 text-sm">
          Real reviews from people who trust DocAppoint.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
        {reviews.map((review, index) => (
          <Card
            key={index}
            className="relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 p-6"
          >
            <span className="absolute top-4 right-5 text-4xl text-slate-100 font-serif leading-none select-none">
              ❝
            </span>

            <StarRating rating={review.rating} />

            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              {review.text}
            </p>

            <span className="text-[#023154] font-bold text-sm">
              — {review.name}
            </span>
          </Card>
        ))}
      </div>
    </section>
  );
}