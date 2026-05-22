"use client";

import { useState } from "react";
import { FiX, FiUser, FiMail, FiPhone, FiCalendar, FiClock, FiFileText, FiShield, FiArrowRight, FiActivity } from "react-icons/fi";
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
      doctorId: doctor?._id,
      doctorName: doctor?.name,
      doctorImage: doctor?.image,
      specialty: doctor?.specialty,
      fee: doctor?.fee,
      hospital: doctor?.hospital,
      patientName,
      gender,
      phone,
      appointmentDate,
      appointmentTime,
      reason,
      bookedAt: new Date(),
    };

    try {
      setLoading(true);
      const { data: tokenData } = await authClient.token();

      if (!tokenData?.token) {
        toast.error("Authentication token missing. Please log in again.");
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://doc-appoint-server-kappa.vercel.app";

      const response = await fetch(`${apiUrl}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify(appointmentData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
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

  const inputBase =
    "w-full h-10 border border-slate-200 rounded-[10px] pl-9 pr-3 text-sm text-slate-700 bg-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 placeholder:text-slate-400";

  const readonlyInput =
    "w-full h-10 border border-slate-200 rounded-[10px] pl-9 pr-3 text-sm text-slate-500 bg-slate-50 outline-none cursor-default";

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div className="bg-white rounded-[20px] w-full max-w-[640px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 font-sans">
        <form onSubmit={handleSubmit}>

          {/* ── Header ── */}
          <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[14px] bg-[#042C53] flex items-center justify-center flex-shrink-0">
                <FiActivity className="w-5 h-5 text-blue-200" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Book Appointment
                </h2>
                <p className="text-[13px] text-slate-500 mt-0.5 flex items-center gap-2">
                  with <span className="font-medium text-slate-700">{doctor?.name}</span>
                  {doctor?.specialty && (
                    <>
                      <span className="text-slate-300">·</span>
                      <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                        {doctor.specialty}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all flex-shrink-0"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>

          {/* ── Body ── */}
          <div className="px-8 py-6 flex flex-col gap-5 max-h-[62vh] overflow-y-auto">

            {/* Account info */}
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-3">Account info</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-slate-500 flex items-center gap-1">
                    <FiMail className="w-3 h-3" /> User email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
                    <input type="email" value={isPending ? "Loading…" : userEmail} readOnly className={readonlyInput} />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-slate-500 flex items-center gap-1">
                    <FiUser className="w-3 h-3" /> Doctor
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
                    <input type="text" value={doctor?.name || ""} disabled className={readonlyInput} />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Patient details */}
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-3">Patient details</p>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-slate-500 flex items-center gap-1">
                    <FiUser className="w-3 h-3" /> Patient name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
                    <input
                      required
                      type="text"
                      placeholder="Full name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className={inputBase}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-slate-500">
                      Gender <span className="text-red-400">*</span>
                    </label>
                    <select
                      required
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full h-10 border border-slate-200 rounded-[10px] px-3 text-sm text-slate-700 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all cursor-pointer appearance-none"
                    >
                      <option value="" disabled>Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-slate-500 flex items-center gap-1">
                      <FiPhone className="w-3 h-3" /> Phone <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
                      <input
                        required
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={inputBase}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Schedule */}
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-3">Schedule</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-slate-500 flex items-center gap-1">
                    <FiCalendar className="w-3 h-3" /> Date <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <FiCalendar
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 cursor-pointer z-10"
                      onClick={() => document.getElementById("appt-date").showPicker()}
                    />
                    <input
                      id="appt-date"
                      required
                      type="date"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className={`${inputBase} [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-slate-500 flex items-center gap-1">
                    <FiClock className="w-3 h-3" /> Time slot <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
                    <select
                      required
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                      className="w-full h-10 border border-slate-200 rounded-[10px] pl-9 pr-3 text-sm text-slate-700 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all cursor-pointer appearance-none"
                    >
                      <option value="" disabled>Select slot</option>
                      {doctor?.availability?.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Reason */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-slate-500 flex items-center gap-1">
                <FiFileText className="w-3 h-3" /> Reason for visit{" "}
                <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <FiFileText className="absolute left-3 top-3 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
                <textarea
                  placeholder="Brief description of symptoms or reason…"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={2}
                  className="w-full border border-slate-200 rounded-[10px] pl-9 pr-3.5 py-2.5 text-sm text-slate-700 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all resize-none placeholder:text-slate-400"
                />
              </div>
            </div>

          </div>

          {/* ── Footer ── */}
          <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[12px] text-slate-400 flex items-center gap-1.5">
              <FiShield className="w-3.5 h-3.5" /> Your data is secure
            </span>
            <button
              type="submit"
              disabled={loading}
              className={`h-11 px-7 rounded-xl text-[14px] font-semibold tracking-wide flex items-center gap-2 transition-all ${
                loading
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                  : "bg-[#042C53] text-blue-100 hover:bg-[#185FA5] hover:text-white active:scale-[0.98] cursor-pointer"
              }`}
            >
              {loading ? "Booking…" : "Confirm booking"}
              {!loading && <FiArrowRight className="w-4 h-4" />}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}