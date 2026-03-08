import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import DestinationsGrid from "@/components/sections/DestinationsGrid";
import Methodology from "@/components/sections/Methodology";
import SocialProof from "@/components/sections/SocialProof";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative bg-cream-50">
        <Hero />
        <Manifesto />
        <section id="destinos" aria-labelledby="destinations-heading">
          <DestinationsGrid />
        </section>
        <Methodology />
        <SocialProof />
      </main>
      <FloatingWhatsApp />
    </>
  );
}
