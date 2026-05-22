export const dynamic = "force-dynamic";
import Banner from "@/components/Banner";
import PatientReviews from "@/components/PatientReviews";
import TopRatedDoctors from "@/components/TopRatedDoctors";
import WhyChooseUs from "@/components/WhychooseUs";


export default function Home() {
  return (
    <div>
      <Banner/>
      <TopRatedDoctors/>
      <WhyChooseUs/>
      <PatientReviews/>
     
    </div>
  );
}
