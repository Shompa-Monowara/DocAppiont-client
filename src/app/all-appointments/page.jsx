import { fetchDoctors } from "@/lib/doctors/data";
import { Button } from "@heroui/react";
import { FiCalendar, FiFilter } from "react-icons/fi";
import { Suspense } from "react";
import DoctorCard from "@/components/DoctorCard";
import DoctorSearch from "@/components/DoctorSearch";


function SearchBarWrapper() {
    return <DoctorSearch />;
}

const AllAppointmentsPage = async ({ searchParams }) => {
   
    const sParams = await searchParams;
    const query = sParams?.search || "";
    
   
    const doctors = await fetchDoctors(query);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header Section */}
            <div className="bg-white border-b border-slate-100 py-12 text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <h1 className="text-3xl font-extrabold text-[#023154]">Book Your Appointment</h1>
                    <p className="text-slate-500 mt-2">Find and book the best doctors near you</p>

                    
                    <div className="flex justify-center mt-6 w-full max-w-3xl mx-auto">
                        <Suspense fallback={<div className="h-12 w-full bg-slate-100 animate-pulse rounded-2xl" />}>
                            <SearchBarWrapper />
                        </Suspense>
                    </div>
                </div>
            </div>

          
            <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
             
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-[#023154]">
                        <FiCalendar className="w-5 h-5 text-[#2ED8E3]" />
                        Available Specialists ({doctors?.length || 0})
                    </h2>
                    <Button
                        variant="flat"
                        startContent={<FiFilter className="w-4 h-4" />}
                        className="rounded-xl font-bold bg-slate-100 text-slate-700"
                    >
                        Filters
                    </Button>
                </div>

               
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors?.length > 0 ? (
                        doctors.map((doctor) => (
                            <DoctorCard key={doctor?._id} doctor={doctor} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-slate-400 font-medium">
                            No doctors found matching your criteria.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AllAppointmentsPage;