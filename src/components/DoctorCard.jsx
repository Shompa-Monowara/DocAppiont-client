import { Button } from "@heroui/react";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

const DoctorCard = ({ doctor }) => {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              
                <div className="relative w-full h-56 rounded-xl overflow-hidden mb-4 bg-slate-100">
                    <img 
                        src={doctor?.image} 
                        alt={doctor?.name || "Doctor Image"}
                        className="w-full h-full object-cover object-top"
                    />
                </div>
                
               
                <div className="flex items-center justify-between gap-2">
                    <span className="bg-[#2ED8E3]/10 text-[#023154] text-xs font-bold px-3 py-1 rounded-full">
                        {doctor?.specialty}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50 px-2 py-1 rounded-lg">
                        <FaStar className="w-3.5 h-3.5 fill-amber-500" /> 
                        {doctor?.rating || "4.5"}
                    </div>
                </div>

                
                <h3 className="text-lg font-bold text-[#023154] mt-2.5">{doctor?.name}</h3>
                <p className="text-slate-500 text-sm mt-1">{doctor?.hospital}</p>
                <p className="text-slate-400 text-xs mt-2 line-clamp-2">{doctor?.description}</p>
            </div>

            
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                    <p className="text-slate-400 text-xs">Consultation Fee</p>
                    <p className="text-base font-extrabold text-[#023154]">৳ {doctor?.fee}</p>
                </div>
                
                <Link href={`/all-appointments/${doctor?._id}`}>
                    <Button
                        className="bg-[#023154] text-white font-bold text-sm px-4 rounded-xl h-9 hover:opacity-90"
                    >
                        View Details
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default DoctorCard;