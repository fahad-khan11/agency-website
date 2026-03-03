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

export default function HomePageClient({ 
  heroData, 
  featureStripData, 
  projectsData,
  servicesData,
  orangeStatementData,
  processData,
  testimonialsData,
  testimonialsHeader,
  footerData
}: { 
  heroData: any; 
  featureStripData: any; 
  projectsData: any;
  servicesData: any;
  orangeStatementData: any;
  processData: any;
  testimonialsData: any;
  testimonialsHeader: any;
  footerData: any;
}) {
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
        <Hero strapiData={heroData} />
        <FeatureStrip strapiData={featureStripData} />
        <WorkLanding strapiData={projectsData} />
        <Services initialData={servicesData} />
        <OrangeStatement initialData={orangeStatementData} />
        <Process initialData={processData} />
        <Testimonials initialData={testimonialsData} initialHeader={testimonialsHeader} />
        <Footer initialData={footerData} asPanel className="min-h-screen" />
      </div>
    );
  }

  // Desktop Layout - Panel animations
  return (
    <PanelContainer>
      <PanelSection index={0}>
        <Hero strapiData={heroData} />
      </PanelSection>

      <PanelSection index={1}>
        <FeatureStrip strapiData={featureStripData} />
      </PanelSection>

      <PanelSection index={2}>
        <WorkLanding strapiData={projectsData} />
      </PanelSection>

      <PanelSection index={3}>
        <Services initialData={servicesData} />
      </PanelSection>

      <PanelSection index={4}>
        <OrangeStatement initialData={orangeStatementData} />
      </PanelSection>

      <PanelSection index={5}>
        <Process initialData={processData} />
      </PanelSection>

      <PanelSection index={6}>
        <Testimonials initialData={testimonialsData} initialHeader={testimonialsHeader} />
      </PanelSection>

      <PanelSection index={7}>
        <Footer initialData={footerData} asPanel className="h-screen" />
      </PanelSection>
    </PanelContainer>
  );
}
