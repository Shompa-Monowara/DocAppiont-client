"use client";

import { useState } from "react";
import { FiX, FiUser, FiMail, FiPhone, FiCalendar, FiClock, FiFileText } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function BookingModal({ isOpen, onClose, doctor }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const userEmail = session?.user?.email || session?.email || "";

  const [patientName, setPatientName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      toast.error("Please login first.");
      return;
    }
    if (!patientName || !gender || !phone || !appointmentDate || !appointmentTime) {
      toast.error("Please fill all the required fields.");
      return; 
    }

    const appointmentData = {
      userEmail,
      doctorName: doctor?.name,
      patientName,
      gender,
      phone,
      appointmentDate,
      appointmentTime,
      reason,
    };

    try {
      setLoading(true);
     
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/appointments`, {
          
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success("Appointment booked successfully!");
        setPatientName("");
        setGender("");
        setPhone("");
        setAppointmentDate("");
        setAppointmentTime("");
        setReason("");
        onClose();
        router.push("/dashboard");
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Connection error detail:", error);
      toast.error("Failed to connect with the server.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4"
    >
      <div className="bg-white rounded-2xl w-full max-w-[420px] shadow-2xl overflow-hidden">
        <form onSubmit={handleSubmit}>

          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-start">
            <div>
              <h2 className="text-lg font-extrabold text-[#023154]">Book Appointment</h2>
              <p className="text-xs text-slate-400 mt-0.5">with {doctor?.name}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-[#023154] transition-colors p-0.5"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-4 flex flex-col gap-3.5 max-h-[65vh] overflow-y-auto">

            {/* User Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#023154]">User Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
                <input
                  type="email"
                  value={isPending ? "Loading..." : userEmail}
                  placeholder="Login to autofill"
                  readOnly
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-slate-600 outline-none cursor-default"
                />
              </div>
            </div>

            {/* Doctor Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#023154]">Doctor Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={doctor?.name || ""}
                  disabled
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-slate-600 outline-none cursor-not-allowed"
                />
              </div>
            </div>

            {/* Patient Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#023154]">
                Patient Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
                <input
                  required
                  type="text"
                  placeholder="Full name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-slate-600 outline-none focus:border-[#023154] focus:ring-2 focus:ring-[#023154]/10 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Gender + Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#023154]">
                  Gender <span className="text-red-400">*</span>
                </label>
                <select
                  required
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-[#023154] focus:ring-2 focus:ring-[#023154]/10 transition-all"
                >
                  <option value="" disabled>Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#023154]">
                  Phone <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
                  <input
                    required
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-600 outline-none focus:border-[#023154] focus:ring-2 focus:ring-[#023154]/10 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#023154]">
                  Date <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  {/* বামপাশের কাস্টম ক্যালেন্ডার আইকন */}
                  <FiCalendar
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 cursor-pointer z-10"
                    onClick={() => document.getElementById("appt-date").showPicker()}
                  />
                  {/* ডানদিকের ডিফল্ট ইন্ডিকেটর আইকন পুরোপুরি রিমুভ করার জন্য কাস্টম সিলেক্টর ব্যবহার করা হয়েছে */}
                  <input
                    id="appt-date"
                    required
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-600 outline-none focus:border-[#023154] focus:ring-2 focus:ring-[#023154]/10 transition-all [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#023154]">
                  Time <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
                  <select
                    required
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-600 outline-none focus:border-[#023154] focus:ring-2 focus:ring-[#023154]/10 transition-all"
                  >
                    <option value="" disabled>Select</option>
                    {doctor?.availability?.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Reason */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#023154]">Reason (optional)</label>
              <div className="relative">
                <FiFileText className="absolute left-3 top-3 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
                <textarea
                  placeholder="Brief reason for visit"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={2}
                  className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-slate-600 outline-none focus:border-[#023154] focus:ring-2 focus:ring-[#023154]/10 transition-all resize-none placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white text-sm font-extrabold tracking-wide transition-all ${
                loading
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-[#023154] hover:bg-[#034a7a] active:scale-[0.99] cursor-pointer"
              }`}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}