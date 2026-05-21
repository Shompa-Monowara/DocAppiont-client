"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import AppointmentList from "@/components/AppointmentList";
import UserProfile from "@/components/UserProfile";
import { ClockLoader } from "react-spinners"; 

const DashBoardPage = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("bookings");

    useEffect(() => {
        const getAppointments = async () => {
            try {
                const { data: tokenData } = await authClient.token();

                if (session?.user?.email && tokenData?.token) {
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
                    
                    const response = await fetch(`${apiUrl}/appointments`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${tokenData?.token}`,
                            "Content-Type": "application/json"
                        }
                    });

                    if (!response.ok) {
                        throw new Error("Failed to fetch data");
                    }

                    const data = await response.json();
                    
                    setAppointments(
                        Array.isArray(data)
                            ? data
                            : data?.appointments || []
                    );
                }
            } catch (error) {
                console.error("Dashboard Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (!isPending && session) {
            getAppointments();
        } else if (!isPending && !session) {
            setLoading(false);
        }
    }, [session, isPending]);

   
    if (isPending || loading) {
        return (
            <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-5">
            
                <ClockLoader color="#023154" size={50} speedMultiplier={1} />
                <p className="text-sm font-medium text-slate-500 tracking-wide animate-pulse">
                    Loading dashboard...
                </p>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="p-8 text-center text-red-500 font-bold">
                Please login first to view your dashboard.
            </div>
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto min-h-[60vh]">
            <h1 className="text-3xl font-bold text-[#023154] mb-6 tracking-tight">
                Dashboard
            </h1>

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

            <div>
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