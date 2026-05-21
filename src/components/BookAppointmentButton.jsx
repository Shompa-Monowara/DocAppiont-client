"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import BookingModal from "./BookingModal"; // বুকিং মডালটি এখানে ইমপোর্ট করা হলো

const BookAppointmentButton = ({ doctor }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)} 
        className="bg-[#023154] text-white font-bold px-8 py-3 rounded-xl mt-4 cursor-pointer"
      >
        Book Appointment
      </Button>

      {/* ক্লিক করার পর মডালটি ওপেন করার লজিক */}
      <BookingModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        doctor={doctor} 
      />
    </>
  );
};

export default BookAppointmentButton;