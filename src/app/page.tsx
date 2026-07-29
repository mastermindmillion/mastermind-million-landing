import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NarrativaSection from "@/components/NarrativaSection";
import QueEsSection from "@/components/QueEsSection";
import IncludeSection from "@/components/IncludeSection";
import DateLocationSection from "@/components/DateLocationSection";
import ParaQuienSection from "@/components/ParaQuienSection";
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
        <NarrativaSection />
        <QueEsSection />
        <IncludeSection />
        <DateLocationSection />
        <ParaQuienSection />
        <SpeakersSection />
        <PruebaSocialSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
