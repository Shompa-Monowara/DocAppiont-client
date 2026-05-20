import { useState } from "react";
import { FaUser, FaRegCalendarAlt, FaRegClock, FaPencilAlt } from "react-icons/fa";
import UpdateModal from "./UpdateModal";
import { DeleteAppointmentAlert } from "./DeleteAppointmentAlert";

const AppointmentList = ({ appointments: initialAppointments, onUpdateAppointment }) => {

    const [appointments, setAppointments] = useState(initialAppointments || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAppt, setSelectedAppt] = useState(null);

    const handleUpdateClick = (appt) => {
        setSelectedAppt(appt);
        setIsModalOpen(true);
    };

    const handleSaveChanges = (updatedData) => {
        setAppointments((prev) =>
            prev.map((appt) => appt._id === updatedData._id ? updatedData : appt)
        );
        if (onUpdateAppointment) {
            onUpdateAppointment(updatedData);
        }
        setIsModalOpen(false);
    };

    const handleDeleteSuccess = (id) => {
        setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    };

    if (appointments.length === 0) {
        return (
            <div className="w-full bg-white/50 rounded-2xl py-16 px-6 text-center border border-dashed border-slate-200">
                <p className="text-slate-600 font-medium text-sm">
                    You haven't booked any appointments yet.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5 w-full">

            {appointments.map((appt) => (
                <div key={appt._id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 w-full">

                    <h2 className="text-xl font-bold text-[#023154]">
                        {appt.doctorName}
                    </h2>

                    <div className="space-y-2.5 text-[15px] text-slate-600">

                        <div className="flex items-center gap-2">
                            <FaUser className="w-3.5 h-3.5 text-slate-400" />
                            <span><span className="text-slate-400">Patient:</span> {appt.patientName}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <FaRegCalendarAlt className="w-3.5 h-3.5 text-slate-400" />
                            <span><span className="text-slate-400">Date:</span> {appt.appointmentDate}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <FaRegClock className="w-3.5 h-3.5 text-slate-400" />
                            <span><span className="text-slate-400">Time:</span> {appt.appointmentTime}</span>
                        </div>

                        {appt.reason && (
                            <div className="pt-1">
                                <span className="text-slate-500">Reason:</span> {appt.reason}
                            </div>
                        )}

                    </div>

                    <div className="flex items-center gap-3 pt-2">

                        <button
                            type="button"
                            onClick={() => handleUpdateClick(appt)}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 transition-all cursor-pointer"
                        >
                            <FaPencilAlt className="w-3 h-3" />
                            Update
                        </button>

                        <DeleteAppointmentAlert
                            appointment={appt}
                            onDeleteSuccess={handleDeleteSuccess}
                        />

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