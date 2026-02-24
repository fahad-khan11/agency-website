"use client";

import { useEffect, useState } from "react";
import PanelContainer from "@/components/home/PanelContainer";
import PanelSection from "@/components/home/PanelSection";
import Hero from "@/components/sections/Hero";
import FeatureStrip from "@/components/sections/FeatureStrip";
import Work from "@/components/sections/Work";
import Services from "@/components/sections/Services";
import OrangeStatement from "@/components/sections/OrangeStatement";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/layout/Footer";
import FooterCTA from "@/components/sections/FooterCTA";
import WorkLanding from "@/components/sections/WorkLanding";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile Layout - Simple scroll without animations
  if (isMobile) {
    return (
      <div className="w-full bg-black">
        <Hero />
        <FeatureStrip />
        <WorkLanding />
        <Services />
        <OrangeStatement />
        <Process />
        <Testimonials />
        <Footer asPanel className="min-h-screen" />
      </div>
    );
  }

  // Desktop Layout - Panel animations
  return (
    <PanelContainer>
      <PanelSection index={0}>
        <Hero />
      </PanelSection>

      <PanelSection index={1}>
        <FeatureStrip />
      </PanelSection>

      <PanelSection index={2}>
        <WorkLanding />
      </PanelSection>

      <PanelSection index={3}>
        <Services />
      </PanelSection>

      <PanelSection index={4}>
        <OrangeStatement />
      </PanelSection>

      <PanelSection index={5}>
        <Process />
      </PanelSection>

      <PanelSection index={6}>
        <Testimonials />
      </PanelSection>

      <PanelSection index={7}>
        <Footer asPanel className="h-screen" />
      </PanelSection>
    </PanelContainer>
  );
}
