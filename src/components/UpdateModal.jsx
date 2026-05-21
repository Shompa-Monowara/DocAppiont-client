"use client";

import { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast"; 

const UpdateModal = ({ isOpen, onClose, appointment, onSave }) => {
   
    const formRef = useRef(null);

   
    const convertTo12Hour = (timeString) => {
        if (!timeString) return "";
        if (timeString.includes("AM") || timeString.includes("PM")) return timeString;

        const [hours, minutes] = timeString.split(":");
        let hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        const strHour = hour < 10 ? `0${hour}` : hour;
        return `${strHour}:${minutes} ${ampm}`;
    };

    const convertTo24Hour = (time12h) => {
        if (!time12h) return "";
        if (!time12h.includes("AM") && !time12h.includes("PM")) return time12h;

        const [time, modifier] = time12h.split(" ");
        let [hours, minutes] = time.split(":");
        if (hours === "12") hours = "00";
        if (modifier === "PM") hours = parseInt(hours, 10) + 12;
        
        return `${hours}:${minutes}`;
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formRef.current) return;

        const formData = new FormData(formRef.current);
        const rawTime = formData.get("appointmentTime");
        
        const formattedTime = convertTo12Hour(rawTime);
        
        try {
            
            onSave({
                ...appointment,
                patientName: formData.get("patientName"),
                appointmentDate: formData.get("appointmentDate"),
                appointmentTime: formattedTime,
                reason: formData.get("reason"),
            });
            
           
            toast.success("Appointment updated successfully!", {
                duration: 3000,
                position: "top-center",
                style: {
                    borderRadius: '12px',
                    background: '#333',
                    color: '#fff',
                },
            });

            onClose();
        } catch (error) {
            //
            toast.error("Something went wrong. Please try again.");
            console.error(error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-xl relative">
                
             
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold text-slate-800">Update Appointment</h2>
                    <button 
                        type="button" 
                        onClick={onClose} 
                        className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>

              
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Doctor Field */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Doctor</label>
                        <input
                            type="text"
                            value={appointment?.doctorName || "Dr. Ayesha Rahman"}
                            readOnly
                            disabled
                            className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl text-slate-500 text-sm cursor-not-allowed focus:outline-none"
                        />
                    </div>

                   
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Patient Name</label>
                        <input
                            type="text"
                            name="patientName"
                            defaultValue={appointment?.patientName || ""}
                            required
                            className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:border-teal-500 text-sm"
                        />
                    </div>

                 
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700">Date</label>
                            <input
                                type="date"
                                name="appointmentDate"
                                defaultValue={appointment?.appointmentDate || ""}
                                required
                                className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:border-teal-500 text-sm cursor-pointer"
                            />
                        </div>
                        
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700">Time</label>
                            <input
                                type="time"
                                name="appointmentTime"
                                defaultValue={convertTo24Hour(appointment?.appointmentTime)}
                                required
                                className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:border-teal-500 text-sm cursor-pointer"
                            />
                        </div>
                    </div>

                   
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Reason</label>
                        <input
                            type="text"
                            name="reason"
                            defaultValue={appointment?.reason || ""}
                            className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:border-teal-500 text-sm"
                        />
                    </div>

              
                    <button
                        type="submit"
                        className="w-full bg-[#023154] hover:bg-[#01223c] text-white py-3 rounded-xl font-bold text-sm transition-colors cursor-pointer mt-2"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateModal;