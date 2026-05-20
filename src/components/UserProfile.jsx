"use client";

import { useState } from "react";
import { Avatar } from "@heroui/react";
import { FaPencilAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const UserProfile = ({ user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [photoUrl, setPhotoUrl] = useState(user?.image || "");

    const handleSave = () => {
        // save logic এখানে যোগ করবে
        setIsModalOpen(false);
        toast.success("Profile updated successfully!");
    };

    return (
        <>
            <Toaster position="top-right" />

            {/* Profile Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-8 max-w-sm">

                {/* User Info */}
                <div className="flex items-center gap-4 mb-5">
                    <Avatar className="w-16 h-16 text-lg font-bold shrink-0">
                        <Avatar.Image
                            referrerPolicy="no-referrer"
                            alt={user?.name || "User"}
                            src={photoUrl}
                        />
                        <Avatar.Fallback>
                            {user?.name?.charAt(0) || "U"}
                        </Avatar.Fallback>
                    </Avatar>

                    <div className="space-y-1">
                        <h2 className="text-lg font-bold text-[#023154]">
                            {name || user?.name}
                        </h2>
                        <p className="text-sm text-slate-500 flex items-center gap-1.5">
                            ✉ {user?.email}
                        </p>
                    </div>
                </div>

                {/* Update Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#023154] hover:bg-[#034a7a] text-white text-sm font-semibold rounded-xl transition-all cursor-pointer"
                >
                    <FaPencilAlt className="w-3 h-3" />
                    Update Profile
                </button>

            </div>

            {/* Update Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full shadow-xl border border-slate-100 overflow-hidden">

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-[#023154]">
                                Update Profile
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 text-2xl font-bold cursor-pointer transition-colors leading-none"
                            >
                                ×
                            </button>
                        </div>

                        {/* Body */}
                        <div className="px-6 py-5 space-y-4">

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-600">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none focus:border-[#2ED8E3] transition-colors"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-600">
                                    Photo URL
                                </label>
                                <input
                                    type="text"
                                    value={photoUrl}
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none focus:border-[#023154] transition-colors"
                                />
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-slate-100">
                            <button
                                onClick={handleSave}
                                className="w-full px-5 py-2.5 bg-[#023154] hover:bg-[#034a7a] text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer"
                            >
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default UserProfile;