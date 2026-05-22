"use client";

import { useState } from "react";
import { FiX, FiMail, FiMapPin, FiCalendar, FiEdit2, FiCheckCircle, FiUser, FiImage } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const UserProfile = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [photoUrl, setPhotoUrl] = useState(user?.image || "");
  const [loading, setLoading] = useState(false);

  const initials = (user?.name || "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty!");
      return;
    }
    try {
      setLoading(true);
      const { data: tokenData } = await authClient.token();
      if (!tokenData?.token) {
        toast.error("You are not authorized. Please login again.");
        return;
      }
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://doc-appoint-server-kappa.vercel.app";
      const response = await fetch(`${apiUrl}/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify({ name, image: photoUrl }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        toast.success("Profile updated successfully!");
        setIsModalOpen(false);
      } else {
        toast.error(data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Profile Update Error:", error);
      toast.error("Something went wrong while saving!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      {/* ── Profile Card ── */}
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden w-full max-w-[480px]">

        {/* Banner */}
        <div className="relative h-20 bg-[#042C53]">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          {/* Avatar */}
          <div className="absolute -bottom-7 left-6">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-full border-[3px] border-white object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-full border-[3px] border-white bg-[#185FA5] flex items-center justify-center text-blue-200 text-xl font-medium">
                {initials}
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pt-10 pb-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[17px] font-semibold text-slate-800">{name || user?.name}</p>
              <span className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-0.5 bg-blue-50 text-blue-800 rounded-full text-[11px] font-medium">
                <FiCheckCircle className="w-3 h-3" /> Verified account
              </span>
            </div>
          </div>

          {/* Meta */}
          <div className="mt-4 flex flex-col gap-2">
            <p className="flex items-center gap-2 text-[13px] text-slate-500">
              <FiMail className="w-3.5 h-3.5 text-slate-400" /> {user?.email}
            </p>
            <p className="flex items-center gap-2 text-[13px] text-slate-500">
              <FiMapPin className="w-3.5 h-3.5 text-slate-400" /> Bangladesh
            </p>
            <p className="flex items-center gap-2 text-[13px] text-slate-500">
              <FiCalendar className="w-3.5 h-3.5 text-slate-400" /> Member since 2024
            </p>
          </div>

          <hr className="my-5 border-slate-100" />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              { val: "4", lbl: "Bookings" },
              { val: "2", lbl: "Upcoming" },
              { val: "3", lbl: "Doctors" },
            ].map(({ val, lbl }) => (
              <div key={lbl} className="bg-slate-50 rounded-lg p-3 text-center">
                <p className="text-lg font-semibold text-slate-800">{val}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{lbl}</p>
              </div>
            ))}
          </div>

          {/* Edit button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full h-10 rounded-lg bg-[#042C53] hover:bg-[#185FA5] text-blue-100 hover:text-white text-[13px] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <FiEdit2 className="w-3.5 h-3.5" /> Edit profile
          </button>
        </div>
      </div>

      {/* ── Edit Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-[680px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

            {/* Header */}
            <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-[17px] font-semibold text-slate-800">Edit profile</h3>
                <p className="text-[12px] text-slate-400 mt-0.5">Update your name and photo</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            {/* Body — two columns */}
            <div className="px-8 py-7 grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-slate-500 flex items-center gap-1">
                  <FiUser className="w-3 h-3" /> Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full h-10 px-3.5 border border-slate-200 rounded-[10px] text-sm text-slate-700 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-slate-500 flex items-center gap-1">
                  <FiImage className="w-3 h-3" /> Photo URL
                </label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full h-10 px-3.5 border border-slate-200 rounded-[10px] text-sm text-slate-700 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 h-10 rounded-lg border border-slate-200 bg-white text-slate-600 text-[13px] font-medium hover:bg-slate-100 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className={`flex-1 h-10 rounded-lg text-[13px] font-medium transition-all ${
                  loading
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                    : "bg-[#042C53] text-blue-100 hover:bg-[#185FA5] hover:text-white cursor-pointer"
                }`}
              >
                {loading ? "Saving…" : "Save changes"}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;