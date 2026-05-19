"use client";

import { useState } from "react"; // useDisclosure এর বদলে useState ব্যবহার করা হলো
import { Button } from "@heroui/react";
import BookingModal from "./BookingModal";

export default function BookAppointmentButton({ doctor }) {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <Button
        onClick={onOpen}
        style={{
          background: "#2ED8E3",
          color: "#023154",
          fontWeight: "800",
          fontSize: "14px",
          height: "48px",
          padding: "0 40px",
          borderRadius: "12px",
          boxShadow: "0 4px 14px rgba(46,216,227,0.25)",
        }}
      >
        Book Appointment
      </Button>

      {/* মডাল ওভারলে */}
      <BookingModal isOpen={isOpen} onClose={onClose} doctor={doctor} />
    </>
  );
}