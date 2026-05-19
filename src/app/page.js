import Banner from "@/components/Banner";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import TopRatedDoctors from "@/components/TopRatedDoctors";
import WhyChooseUs from "@/components/WhychooseUs";


export default function Home() {
  return (
    <div>
      <Banner/>
      <TopRatedDoctors/>
      <WhyChooseUs/>
      <FaqSection/>
      <Footer/>
    </div>
  );
}
