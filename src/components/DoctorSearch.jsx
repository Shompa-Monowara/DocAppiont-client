"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const DoctorSearch = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(searchParams.get("search") || "");
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = (e) => {
        const val = e.target.value;
        setValue(val);
        if (val) {
            router.push(`/all-appointments?search=${val}`);
        } else {
            router.push(`/all-appointments`);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto  px-1">
           
            <div 
                className={`w-full flex items-center h-12 bg-white border rounded-2xl px-4 transition-all duration-200 shadow-sm ${
                    isFocused 
                        ? "border-[#2ED8E3] ring-4 ring-[#2ED8E3]/10" 
                        : "border-slate-200/80 hover:border-slate-300"
                }`}
            >
                
                <FiSearch 
                    className={`w-5 h-5 mr-3 flex-shrink-0 transition-colors duration-200 ${
                        isFocused ? "text-[#2ED8E3]" : "text-slate-400"
                    }`} 
                />

                <input
             value={value}
             onChange={handleSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search by doctor name or specialty..."
          style={{ outline: 'none', boxShadow: 'none' }}
      className="w-full h-full bg-transparent text-sm font-medium text-[#023154] placeholder:text-slate-400 border-none p-0"
                />
            </div>
        </div>
    );
};

export default DoctorSearch;