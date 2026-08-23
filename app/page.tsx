import { About } from "@/components/Landing/About";
import { Footer } from "@/components/Landing/Footer";
import { Hero } from "@/components/Landing/Hero";
import { HowItWorks } from "@/components/Landing/howitWorks";
import { ProductShowcase } from "@/components/Landing/Productshowcases";
import { ProfileGrid } from "@/components/Landing/Profile";
import { TrustStrip } from "@/components/Landing/TrustTrip";
import { UseCases } from "@/components/Landing/Whoweserve";
import Navbar from "@/components/Shared/Navbar";
import { team } from "@/constants/Team";
import Image from "next/image";

export default function Home() {
  const teamMembers = team  
  return (
    <main className="flex min-h-screen flex-col ">
      <Navbar />
      <Hero />
      <TrustStrip />
      <About />
      <ProfileGrid members={teamMembers} />
      <HowItWorks />
      <ProductShowcase />
      <UseCases />
      <Footer/>
    </main>
  );
}
