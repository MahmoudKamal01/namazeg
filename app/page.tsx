import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import Feature from "./_components/Feature";
import FeaturesSection from "./_components/FeaturesSection";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <Hero />
      <div className="flex-grow" id="features">
        <FeaturesSection />
      </div>
      <Footer />
    </div>
  );
}
