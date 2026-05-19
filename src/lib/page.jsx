// src/lib/doctors/data.js

export const fetchDoctors = async (searchTerm = "") => {
    try {
   
        const res = await fetch(`http://localhost:8080/all-appointments?search=${searchTerm}`, {
            cache: "no-store" 
        });

        if (!res.ok) {
            throw new Error("Failed to fetch doctors data");
        }

        return await res.json();
    } catch (error) {
        console.error("fetchDoctors error:", error);
        return [];
    }
};


export const fetchSingleDoctor = async (doctorId) => {
    try {
        const res = await fetch(`http://localhost:8080/all-appointments/${doctorId}`, {
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("Failed to fetch doctor details");
        }

        return await res.json();
    } catch (error) {
        console.error("fetchSingleDoctor error:", error);
        return null;
    }
};