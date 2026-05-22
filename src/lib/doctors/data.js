import { authClient } from "@/lib/auth-client";


export const fetchDoctors = async (search = '') => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/all-appointments?search=${search}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch doctors");
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("fetchDoctors error:", error);
    return [];
  }
};


export const fetchSingleDoctor = async (doctorId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/all-appointments/${doctorId}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch single doctor");
    }

    const data = await res.json();
    return data || null;
  } catch (error) {
    console.error("fetchSingleDoctor error:", error);
    return null;
  }
};


export const fetchUserAppointments = async () => {
  try {
  
    const { data: tokenData } = await authClient.token();

    if (!tokenData?.token) {
      throw new Error("No token found. User might not be logged in.");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/appointments`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${tokenData.token}`,
          "Content-Type": "application/json"
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch appointments");
    }

    const data = await res.json();
    return data || { appointments: [] };
  } catch (error) {
    console.error("fetchUserAppointments error:", error);
    return {
      appointments: [],
    };
  }
};