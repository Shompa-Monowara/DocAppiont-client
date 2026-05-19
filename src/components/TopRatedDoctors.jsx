import { fetchDoctors } from "@/lib/doctors/data"; 
import DoctorCard from "@/components/DoctorCard"; 

const TopRatedDoctors = async () => {
  
    const allDoctors = await fetchDoctors() || [];

   
    const topDoctors = [...allDoctors]
        .sort((a, b) => (b.rating || 0) - (a.rating || 0)) 
        .slice(0, 3); 

   
    const isLoggedIn = true; 

    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-[#023154]">Top Rated Specialists</h2>
                    <p className="text-slate-500 mt-2">Consult with our highest-rated premium doctors based on your preference</p>
                </div>

              
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {topDoctors.map((doctor) => {
                        
                        const conditionalLink = isLoggedIn 
                            ? `/all-appointments/${doctor?._id}` 
                            : "/login";

                        return (
                            <DoctorCard 
                                key={doctor?._id} 
                                doctor={doctor} 
                                href={conditionalLink} 
                            />
                        );
                    })}
                </div>

                {topDoctors.length === 0 && (
                    <div className="text-center text-slate-400 font-medium py-8">
                        No top-rated specialists found.
                    </div>
                )}
            </div>
        </section>
    );
};

export default TopRatedDoctors;