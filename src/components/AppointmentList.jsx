"use client";

import { useState, useEffect } from "react";
import { FaUser, FaRegCalendarAlt, FaRegClock, FaPencilAlt, FaStethoscope } from "react-icons/fa";
import { ClockLoader } from "react-spinners"; 
import UpdateModal from "./UpdateModal";
import { DeleteAppointmentAlert } from "./DeleteAppointmentAlert";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const AppointmentList = ({ appointments: initialAppointments, onUpdateAppointment }) => {
    const [appointments, setAppointments] = useState(initialAppointments || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAppt, setSelectedAppt] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (initialAppointments) {
            setAppointments(initialAppointments);
            setIsLoading(false);
        }
    }, [initialAppointments]);

    const handleUpdateClick = (appt) => {
        setSelectedAppt(appt);
        setIsModalOpen(true);
    };

    const handleSaveChanges = async (updatedData) => {
        try {
            const { data: tokenData } = await authClient.token();

            if (!tokenData?.token) {
                toast.error("You are not authorized. Please login again.");
                return;
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://doc-appoint-server-kappa.vercel.app";

            const response = await fetch(`${apiUrl}/booking/${updatedData._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenData.token}`
                },
                body: JSON.stringify(updatedData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setAppointments((prev) =>
                    prev.map((appt) => appt._id === updatedData._id ? updatedData : appt)
                );
                
                if (onUpdateAppointment) {
                    onUpdateAppointment(updatedData);
                }
                
                toast.success("Appointment updated successfully!");
                setIsModalOpen(false);
            } else {
                toast.error(result.message || "Failed to update appointment on server.");
            }

        } catch (error) {
            console.error("Update Error:", error);
            toast.error("Something went wrong while updating.");
        }
    };

    const handleDeleteSuccess = (id) => {
        setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    };

    
    if (isLoading) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-24 gap-5">
                <ClockLoader color="#023154" size={50} speedMultiplier={1} />
                <p className="text-sm font-medium text-slate-500 tracking-wide animate-pulse">
                    Loading your appointments...
                </p>
            </div>
        );
    }

  
    if (appointments.length === 0) {
        return (
            <div className="w-full bg-white/40 rounded-2xl py-20 px-6 text-center border-2 border-dashed border-slate-200 backdrop-blur-xs">
                <p className="text-slate-500 font-semibold text-base">
                    You haven't booked any appointments yet.
                </p>
            </div>
        );
    }

 
    return (
        <div className="flex flex-col gap-5 w-full max-w-4xl mx-auto">
            {appointments.map((appt) => (
                <div 
                    key={appt._id} 
                    className="group bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:border-slate-200 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                        {/* Doctor Icon Stethoscope */}
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-[#023154] group-hover:bg-[#023154] group-hover:text-white transition-colors duration-300 shadow-xs">
                            <FaStethoscope className="w-5 h-5" />
                        </div>
                        
                       
                        <div className="space-y-2.5 flex-1 min-w-0">
                            <h2 className="text-lg font-bold text-[#023154] tracking-tight truncate">
                                {appt.doctorName}
                            </h2>
                            
                          
                            <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 lg:gap-4 text-xs md:text-sm text-slate-600">
                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 max-w-xs truncate">
                                    <FaUser className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                    <span>
                                        <strong className="text-slate-400 font-normal">Patient:</strong> {appt.patientName}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 shrink-0">
                                    <FaRegCalendarAlt className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                    <span>
                                        <strong className="text-slate-400 font-normal">Date:</strong> {appt.appointmentDate}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 shrink-0">
                                    <FaRegClock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                    <span>
                                        <strong className="text-slate-400 font-normal">Time:</strong> {appt.appointmentTime}
                                    </span>
                                </div>
                            </div>

                            {/* Reason tags */}
                            {appt.reason && (
                                <div className="text-xs text-slate-500 bg-slate-50/70 px-3 py-2 rounded-lg inline-block border border-slate-100 max-w-full truncate">
                                    <span className="font-semibold text-slate-600">Reason:</span> {appt.reason}
                                </div>
                            )}
                        </div>
                    </div>

                  
                    <div className="flex items-center flex-row justify-end gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100/80 shrink-0 w-full lg:w-auto">
                        <button
                            type="button"
                            onClick={() => handleUpdateClick(appt)}
                            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 h-10 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 transition-all cursor-pointer lg:w-32 active:scale-98"
                        >
                            <FaPencilAlt className="w-3.5 h-3.5 text-slate-500" />
                            Update
                        </button>

                        <div className="flex-1 lg:flex-none lg:w-32 flex">
                            <DeleteAppointmentAlert
                                appointment={appt}
                                onDeleteSuccess={handleDeleteSuccess}
                            />
                        </div>
                    </div>
                </div>
            ))}

            <UpdateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                appointment={selectedAppt}
                onSave={handleSaveChanges}
            />
        </div>
    );
};

export default AppointmentList;