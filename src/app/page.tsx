import Hero from "@/components/Hero";
import IncludeSection from "@/components/IncludeSection";
import SpeakersSection from "@/components/SpeakersSection";
import PruebaSocialSection from "@/components/PruebaSocialSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <IncludeSection />
        <SpeakersSection />
        <PruebaSocialSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
