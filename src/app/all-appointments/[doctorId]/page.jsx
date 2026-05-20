import { fetchSingleDoctor } from "@/lib/doctors/data";
import { Button } from "@heroui/react";
import { FiChevronLeft, FiMapPin, FiClock, FiDollarSign } from "react-icons/fi";
import { MdLocalHospital } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import BookAppointmentButton from "@/components/BookAppointmentButton"; // ইমপোর্ট করা হলো

const DoctorDetailsPage = async (props) => {
    const resolvedParams = await props.params; 
    const doctorId = resolvedParams?.doctorId; 

    if (!doctorId) {
        return <p className="text-center py-10">Doctor ID not found.</p>;
    }

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
        <div className="min-h-screen bg-[#f0fbfc] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <Link
                    href="/all-appointments"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-[#023154] mb-8 transition-colors"
                >
                    <FiChevronLeft className="w-4 h-4" /> Back to All Doctors
                </Link>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-10">
                    <div
                        className="grid gap-10"
                        style={{ gridTemplateColumns: "280px 1fr" }}
                    >
                        <div
                            className="rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0"
                            style={{ width: "280px", height: "340px" }}
                        >
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                            />
                        </div>

                        <div className="flex flex-col min-w-0" style={{ gap: "20px" }}>
                            <div>
                                <span className="bg-[#2ED8E3]/15 text-[#023154] text-xs font-bold px-3 py-1 rounded-full">
                                    {doctor.specialty}
                                </span>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#023154", lineHeight: "1.2", margin: 0 }}>
                                    {doctor.name}
                                </h1>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <FaStar style={{ width: "16px", height: "16px", color: "#f59e0b", fill: "#f59e0b", flexShrink: 0 }} />
                                    <span style={{ fontSize: "14px", fontWeight: "700", color: "#334155" }}>
                                        {doctor.rating || "4.5"}
                                        <span style={{ fontWeight: "400", color: "#94a3b8" }}> / 5.0</span>
                                    </span>
                                </div>
                            </div>

                            <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.75", margin: 0 }}>
                                {doctor.description}
                            </p>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                <InfoBox
                                    icon={<FiClock style={{ width: "16px", height: "16px", color: "#2ED8E3", flexShrink: 0 }} />}
                                    label="Experience"
                                    value={doctor.experience}
                                />
                                <InfoBox
                                    icon={<MdLocalHospital style={{ width: "16px", height: "16px", color: "#2ED8E3", flexShrink: 0 }} />}
                                    label="Hospital"
                                    value={doctor.hospital}
                                />
                                <InfoBox
                                    icon={<FiMapPin style={{ width: "16px", height: "16px", color: "#2ED8E3", flexShrink: 0 }} />}
                                    label="Location"
                                    value={doctor.location}
                                />
                                <InfoBox
                                    icon={<FiDollarSign style={{ width: "16px", height: "16px", color: "#2ED8E3", flexShrink: 0 }} />}
                                    label="Consultation Fee"
                                    value={`৳${doctor.fee}`}
                                />
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                <p style={{ fontSize: "14px", fontWeight: "700", color: "#023154", margin: 0 }}>
                                    Availability
                                </p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                    {doctor.availability?.map((slot, idx) => (
                                        <span
                                            key={idx}
                                            style={{
                                                background: "rgba(46,216,227,0.1)",
                                                border: "1px solid rgba(46,216,227,0.35)",
                                                color: "#023154",
                                                fontSize: "12px",
                                                fontWeight: "600",
                                                padding: "6px 14px",
                                                borderRadius: "8px",
                                            }}
                                        >
                                            {slot}
                                        </span>
                                    ))}
                                </div>
                            </div>

                           
                            <div>
                                <BookAppointmentButton doctor={doctor} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function InfoBox({ icon, label, value }) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                border: "1px solid #f1f5f9",
                borderRadius: "12px",
                padding: "12px 14px",
                background: "rgba(248,250,252,0.6)",
            }}
        >
            <div style={{ paddingTop: "2px" }}>{icon}</div>
            <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "500", margin: "0 0 3px 0" }}>
                    {label}
                </p>
                <p style={{ fontSize: "14px", fontWeight: "700", color: "#023154", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {value}
                </p>
            </div>
        </div>
    );
}

export default DoctorDetailsPage;