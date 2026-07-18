import { About } from "@/components/Landing/About";
import { Hero } from "@/components/Landing/Hero";
import { HowItWorks } from "@/components/Landing/howitWorks";
import { ProductShowcase } from "@/components/Landing/Productshowcases";
import { TrustStrip } from "@/components/Landing/TrustTrip";
import { UseCases } from "@/components/Landing/Whoweserve";
import Navbar from "@/components/Shared/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col ">
      <Navbar />
      <Hero />
      <TrustStrip />
      <About />
      <HowItWorks />
      <ProductShowcase />
      <UseCases />
    </main>
  );
}
