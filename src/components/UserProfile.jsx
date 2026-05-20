"use client";

import { useState } from "react";
import { Avatar } from "@heroui/react";

const UserProfile = ({ user }) => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-5">
            {/* Left: User Info */}
            <div className="flex flex-col sm:flex-row items-center gap-5">
                <Avatar className="w-20 h-20 text-xl font-bold shrink-0">
                    <Avatar.Image 
                        referrerPolicy="no-referrer" 
                        alt={user?.name || "User"} 
                        src={user?.image} 
                    />
                    <Avatar.Fallback>{user?.name?.charAt(0) || "U"}</Avatar.Fallback>
                </Avatar>
                
                <div className="text-center sm:text-left space-y-1">
                    <h2 className="text-2xl font-bold text-[#023154]">
                        {user?.name}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">
                        <strong>Email:</strong> {user?.email}
                    </p>
                </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
                <button
                    onClick={() => setIsProfileModalOpen(true)}
                    className="px-4 py-2 bg-[#023154] text-white text-sm font-semibold rounded-xl hover:bg-[#034a7a] transition-all shadow-sm cursor-pointer"
                >
                    View Full Profile
                </button>
                <button
                    onClick={() => setIsStatusModalOpen(true)}
                    className="px-4 py-2 bg-[#2ED8E3]/10 text-[#023154] text-sm font-semibold rounded-xl hover:bg-[#2ED8E3]/20 transition-all border border-[#2ED8E3]/20 cursor-pointer"
                >
                    Check Overview Status
                </button>
            </div>

            {/* Modal 1: Profile Details */}
            {isProfileModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 relative">
                        <h3 className="text-xl font-bold text-[#023154] mb-4">Profile Details</h3>
                        <div className="space-y-3 text-sm text-slate-600">
                            <p><strong>Full Name:</strong> {user?.name}</p>
                            <p><strong>Email Address:</strong> {user?.email}</p>
                            <p className="break-all"><strong>Photo URL:</strong> {user?.image || "Not Provided"}</p>
                            <p><strong>Account Status:</strong> Verified</p>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setIsProfileModalOpen(false)}
                                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal 2: Appointment Status Overview */}
            {isStatusModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 relative">
                        <h3 className="text-xl font-bold text-[#023154] mb-4">System Overview</h3>
                        <div className="space-y-3 text-sm text-slate-600">
                            <p>Hello, <strong>{user?.name}</strong>! Welcome back to your healthcare dashboard.</p>
                            <p>Here you can monitor your scheduled checkups, connect with doctors, and track your history seamlessly.</p>
                            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-500 border border-slate-100">
                                Tip: Please arrive 15 minutes prior to your appointment time.
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setIsStatusModalOpen(false)}
                                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;