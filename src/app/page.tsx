import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IncludeSection from "@/components/IncludeSection";
import DateLocationSection from "@/components/DateLocationSection";
import SpeakersSection from "@/components/SpeakersSection";
import PruebaSocialSection from "@/components/PruebaSocialSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <IncludeSection />
        <DateLocationSection />
        <SpeakersSection />
        <PruebaSocialSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
