import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { About } from "@/components/About";
import { Certifications } from "@/components/Certifications";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { UpworkBanner } from "@/components/UpworkBanner";
import { ThreeScene } from "@/components/ThreeScene";
import { TechStack } from "@/components/TechStack";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { HomeSectionNavigator } from "@/components/HomeSectionNavigator";

export default function Home() {
  return (
    <>
      <HomeSectionNavigator />
      <ThreeScene />
      <UpworkBanner />
      <Hero />
      <TechStack />
      <WhyChooseUs />
      <Portfolio />
      <About />
      <Certifications />
      <Testimonials />
      <Contact />
    </>
  );
}
