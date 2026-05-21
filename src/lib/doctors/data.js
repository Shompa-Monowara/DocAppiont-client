import { authClient } from "@/lib/auth-client";

// ১. সব ডাক্তারদের ডাটা খোঁজা (Public)
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

// ২. নির্দিষ্ট একজন ডাক্তারের ডিটেইলস খোঁজা (Public)
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

// ৩. টোকেন দিয়ে ডাইনামিকালি ইউজারের অ্যাপয়েন্টমেন্ট লিস্ট দেখা (Protected)
export const fetchUserAppointments = async () => {
  try {
    // 🔑 Better-Auth থেকে ডাইনামিক টোকেন জেনারেট করা হলো
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