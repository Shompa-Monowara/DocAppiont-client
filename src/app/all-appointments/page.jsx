import { fetchDoctors } from "@/lib/doctors/data";
import { Suspense } from "react";
import DoctorCard from "@/components/DoctorCard";
import DoctorSearch from "@/components/DoctorSearch";
import { ClockLoader } from "react-spinners"; // 🌀 স্পিনার ইমপোর্ট করা হলো

export const dynamic = "force-dynamic";

function SearchBarWrapper() {
    return <DoctorSearch />;
}

// ⏱️ পৃথক ক্লায়েন্ট স্পিনারের ঝামেলা এড়াতে ইনলাইন লোডার ডিজাইন
const ClockLoadingFallback = () => {
    return (
        <div className="col-span-full w-full flex flex-col items-center justify-center py-24 gap-5">
            <ClockLoader color="#023154" size={50} speedMultiplier={1} />
            <p className="text-sm font-medium text-slate-500 tracking-wide animate-pulse">
                Searching for available doctors...
            </p>
        </div>
    );
};

// 🩺 ডক্টর লিস্ট রেন্ডার করার জন্য এসিনক্রোনাস সাব-কম্পোনেন্ট
const DoctorList = async ({ query }) => {
    const doctors = await fetchDoctors(query);

    if (!doctors || doctors.length === 0) {
        return (
            <div className="col-span-full text-center py-12 text-slate-400 font-medium">
                No doctors found matching your criteria.
            </div>
        );
    }

    return (
        <>
            {doctors.map((doctor) => (
                <DoctorCard key={doctor?._id} doctor={doctor} />
            ))}
        </>
    );
};

const AllAppointmentsPage = async (props) => {
    const searchParams = await props.searchParams;
    const query = searchParams?.search || "";

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}
            <div className="bg-white border-b border-slate-100 py-12 text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <h1 className="text-3xl font-extrabold text-[#023154]">
                        Book Your Appointment
                    </h1>
                    <p className="text-slate-500 mt-2">
                        Find and book the best doctors near you
                    </p>

                    <div className="flex justify-center mt-6 w-full max-w-3xl mx-auto">
                        <Suspense fallback={<div className="h-12 w-full bg-slate-100 animate-pulse rounded-2xl" />}>
                            <SearchBarWrapper />
                        </Suspense>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* 🔄 ডেটা ফেচ হওয়ার সময় ClockLoader স্পিনারটি এখানে দেখাবে */}
                    <Suspense fallback={<ClockLoadingFallback />}>
                        <DoctorList query={query} />
                    </Suspense>
                </div>
            </main>

        </div>
    );
};

export default AllAppointmentsPage;