import { fetchSingleDoctor } from "@/lib/doctors/data";
import { Button } from "@heroui/react";
import { FiChevronLeft, FiMapPin, FiClock } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const DoctorDetailsPage = async ({ params }) => {
    const { doctorId } = await params;
    const doctor = await fetchSingleDoctor(doctorId);

    if (!doctor) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <h2 className="text-xl font-bold text-slate-700">Doctor Profile Not Found</h2>
                <Link href="/all-appointments">
                    <Button className="mt-4 bg-[#023154] text-white font-bold">
                        Back to Listings
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                
                <Link href="/all-appointments" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#023154] mb-6 transition-colors">
                    <FiChevronLeft className="w-4 h-4" /> Back to All Doctors
                </Link>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    <div className="relative w-full h-64 md:h-full rounded-2xl overflow-hidden bg-slate-100">
                        <Image 
                            src={doctor.image} 
                            alt={doctor.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                   
                    <div className="md:col-span-2 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                                <span className="bg-[#2ED8E3]/10 text-[#023154] text-xs font-bold px-3 py-1 rounded-full">
                                    {doctor.specialty}
                                </span>
                                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                                    <FaStar className="w-4 h-4 fill-amber-500" /> {doctor.rating || "4.5"}
                                </div>
                            </div>

                            <h1 className="text-2xl font-extrabold text-[#023154] mt-3">{doctor.name}</h1>
                            <p className="text-slate-600 font-semibold text-sm mt-1">{doctor.hospital}</p>
                            
                            <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-2">
                                <FiMapPin className="w-3.5 h-3.5" /> {doctor.location}
                            </div>

                            <div className="mt-4 bg-slate-50 p-3 rounded-xl inline-block text-xs font-bold text-slate-700">
                                Experience: <span className="text-blue-600">{doctor.experience}</span>
                            </div>

                            <p className="text-slate-500 text-sm mt-5 leading-relaxed">
                                {doctor.description}
                            </p>

                       
                            <div className="mt-6">
                                <h4 className="text-sm font-bold text-[#023154] flex items-center gap-1.5 mb-2.5">
                                    <FiClock className="w-4 h-4 text-[#2ED8E3]" /> Available Schedule
                                </h4>
                                <div className="flex gap-2 flex-wrap">
                                    {doctor.availability?.map((slot, idx) => (
                                        <span key={idx} className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200/50">
                                            {slot}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                      
                        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4 flex-wrap">
                            <div>
                                <p className="text-slate-400 text-xs">Total Visiting Fee</p>
                                <p className="text-2xl font-black text-[#023154]">৳ {doctor.fee}</p>
                            </div>
                            <Button className="bg-[#2ED8E3] text-[#023154] font-black px-8 h-12 rounded-xl shadow-lg shadow-[#2ED8E3]/20 hover:opacity-90 transition-all text-sm">
                                Confirm Booking
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetailsPage;