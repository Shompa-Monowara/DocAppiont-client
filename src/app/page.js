import Banner from "@/components/Banner";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import WhyChooseUs from "@/components/WhychooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner/>
      <WhyChooseUs/>
      <FaqSection/>
      <Footer/>
    </div>
  );
}
