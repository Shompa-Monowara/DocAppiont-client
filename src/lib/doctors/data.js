export const fetchDoctors = async (search = '') => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/all-appointments?search=${search}`,  // ✅ search
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch doctors");
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
    if (!res.ok) throw new Error("Failed to fetch single doctor");
    const data = await res.json();
    return data || null;
  } catch (error) {
    console.error("fetchSingleDoctor error:", error);
    return null;
  }
};