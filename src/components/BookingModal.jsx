"use client";

import { useState } from "react";
import { FiX, FiUser, FiMail, FiPhone, FiCalendar, FiClock, FiFileText } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function BookingModal({ isOpen, onClose, doctor }) {
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
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Failed to connect with the server.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const inputStyle = {
    width: "100%",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "10px 12px 10px 36px",
    fontSize: "14px",
    color: "#023154",
    outline: "none",
    background: "white",
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    display: "block",
    marginBottom: "6px",
  };

  const fieldWrap = { position: "relative" };

  const iconStyle = {
    position: "absolute",
    left: "11px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#94a3b8",
    width: "15px",
    height: "15px",
    pointerEvents: "none",
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", padding: "16px",
      }}
    >
      <div style={{
        background: "white", borderRadius: "16px", width: "100%",
        maxWidth: "420px", boxShadow: "0 24px 64px rgba(0,0,0,0.18)", overflow: "hidden",
      }}>
        <form onSubmit={handleSubmit}>

          {/* Header */}
          <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#023154", margin: 0 }}>
                Book Appointment
              </h2>
              <p style={{ fontSize: "12px", color: "#94a3b8", margin: "3px 0 0 0" }}>
                with {doctor?.name}
              </p>
            </div>
            <button type="button" onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: "2px" }}>
              <FiX style={{ width: "18px", height: "18px" }} />
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: "14px", maxHeight: "65vh", overflowY: "auto" }}>

            {/* User Email */}
            <div>
              <label style={labelStyle}>User Email</label>
              <div style={fieldWrap}>
                <FiMail style={iconStyle} />
                {isPending ? (
                  <input type="text" value="Loading..." disabled
                    style={{ ...inputStyle, background: "#f8fafc", color: "#94a3b8" }}
                  />
                ) : (
                  <input type="email" value={userEmail} placeholder="Login to autofill" readOnly
                    style={{ ...inputStyle, background: "#f8fafc", color: "#64748b" }}
                  />
                )}
              </div>
            </div>

            {/* Doctor Name */}
            <div>
              <label style={labelStyle}>Doctor Name</label>
              <div style={fieldWrap}>
                <FiUser style={iconStyle} />
                <input type="text" value={doctor?.name || ""} disabled
                  style={{ ...inputStyle, background: "#f8fafc", color: "#94a3b8" }}
                />
              </div>
            </div>

            {/* Patient Name */}
            <div>
              <label style={labelStyle}>Patient Name <span style={{ color: "#ef4444" }}>*</span></label>
              <div style={fieldWrap}>
                <FiUser style={iconStyle} />
                <input required type="text" placeholder="Full name"
                  value={patientName} onChange={(e) => setPatientName(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Gender + Phone */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={labelStyle}>Gender <span style={{ color: "#ef4444" }}>*</span></label>
                <select required value={gender} onChange={(e) => setGender(e.target.value)}
                  style={{ ...inputStyle, padding: "10px 12px", color: gender ? "#023154" : "#94a3b8" }}
                >
                  <option value="" disabled>Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Phone <span style={{ color: "#ef4444" }}>*</span></label>
                <div style={fieldWrap}>
                  <FiPhone style={iconStyle} />
                  <input required type="tel" placeholder="01XXXXXXXXX"
                    value={phone} onChange={(e) => setPhone(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* Date + Time */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>

              {/* ✅ FIXED: Date field */}
              <div>
                <label style={labelStyle}>Date <span style={{ color: "#ef4444" }}>*</span></label>
                <div style={fieldWrap}>
                  <FiCalendar
                    style={{ ...iconStyle, pointerEvents: "auto", cursor: "pointer" }}
                    onClick={() => document.getElementById("appt-date").showPicker()}
                  />
                  <input
                    id="appt-date"
                    required
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    style={{
                      ...inputStyle,
                      colorScheme: "light",
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      appearance: "none",
                    }}
                  />
                </div>
              </div>

              {/* Time */}
              <div>
                <label style={labelStyle}>Time <span style={{ color: "#ef4444" }}>*</span></label>
                <div style={fieldWrap}>
                  <FiClock style={iconStyle} />
                  <select required value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    style={{ ...inputStyle, color: appointmentTime ? "#023154" : "#94a3b8" }}
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
            <div>
              <label style={labelStyle}>Reason (optional)</label>
              <div style={fieldWrap}>
                <FiFileText style={{ ...iconStyle, top: "14px", transform: "none" }} />
                <textarea placeholder="Brief reason for visit"
                  value={reason} onChange={(e) => setReason(e.target.value)}
                  rows={2}
                  style={{ ...inputStyle, resize: "none", paddingTop: "10px" }}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ padding: "14px 20px", borderTop: "1px solid #f1f5f9" }}>
            <button type="submit" disabled={loading}
              style={{
                width: "100%", padding: "13px",
                background: "#2ED8E3", color: "#023154",
                fontWeight: "800", fontSize: "15px",
                border: "none", borderRadius: "12px",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.75 : 1,
                boxShadow: "0 4px 14px rgba(46,216,227,0.3)",
              }}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}