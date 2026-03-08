import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import DestinationsGrid from "@/components/sections/DestinationsGrid";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative bg-cream-50">
        <Hero />
        <Manifesto />
        <DestinationsGrid />
      </main>
    </>
  );
}
