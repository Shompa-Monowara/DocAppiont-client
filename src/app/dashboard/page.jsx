"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { fetchUserAppointments } from "@/lib/doctors/data";

import AppointmentList from "@/components/AppointmentList";
import UserProfile from "@/components/UserProfile";

const DashBoardPage = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // অ্যাক্টিভ ট্যাব ট্র্যাক করার জন্য স্টেট (Default: bookings)
    const [activeTab, setActiveTab] = useState("bookings");

    useEffect(() => {
        const getAppointments = async () => {
            try {
                const userEmail = session?.user?.email;

                if (userEmail) {
                    const data = await fetchUserAppointments(userEmail);

                    setAppointments(
                        Array.isArray(data)
                            ? data
                            : data?.appointments || []
                    );
                }
            } catch (error) {
                console.error("Dashboard Error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (!isPending && session) {
            getAppointments();
        }
    }, [session, isPending]);

    // Loading State
    if (isPending || loading) {
        return (
            <div className="p-8 text-center text-slate-500">
                Loading dashboard...
            </div>
        );
    }

    // No Login
    if (!session) {
        return (
            <div className="p-8 text-center text-red-500">
                Please login first.
            </div>
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto min-h-[60vh]">
            {/* ড্যাশবোর্ড হেডিং */}
            <h1 className="text-3xl font-bold text-[#023154] mb-6 tracking-tight">
                Dashboard
            </h1>

            {/* স্ক্রিনশটের মতো ট্যাব বাটন সেকশন */}
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl w-fit mb-8 border border-slate-100">
                <button
                    onClick={() => setActiveTab("bookings")}
                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-all cursor-pointer ${
                        activeTab === "bookings"
                            ? "bg-white text-[#023154] shadow-xs"
                            : "text-slate-600 hover:text-[#023154]"
                    }`}
                >
                    My Bookings
                </button>
                <button
                    onClick={() => setActiveTab("profile")}
                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-all cursor-pointer ${
                        activeTab === "profile"
                            ? "bg-white text-[#023154] shadow-xs"
                            : "text-slate-600 hover:text-[#023154]"
                    }`}
                >
                    My Profile
                </button>
            </div>

            {/* ডাইনামিক কন্টেন্ট এরিয়া (ট্যাব অনুযায়ী পরিবর্তন হবে) */}
            <div className="animate-fadeIn">
                {activeTab === "bookings" ? (
                    <AppointmentList appointments={appointments} />
                ) : (
                    <UserProfile user={user} />
                )}
            </div>
        </div>
    );
};

export default DashBoardPage;