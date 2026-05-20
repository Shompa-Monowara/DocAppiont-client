"use client";

import { useState } from "react";
import BookingModal from "./BookingModal";

export default function BookAppointmentButton({ doctor }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full md:w-auto px-6 py-3 bg-[#023154] hover:bg-[#034a7a] text-white text-sm font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-[#023154]/10 cursor-pointer"
      >
        Book Appointment
      </button>

      <BookingModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        doctor={doctor} 
      />
    </>
  );
}