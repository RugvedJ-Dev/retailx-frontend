import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <Image
        src="/hero.jpg"
        style={{ objectFit: "cover", zIndex: -1 }}
        fill
        alt="hero"
      />
      <Navbar/>
      <HeroSection/>
    </>
  );
}
