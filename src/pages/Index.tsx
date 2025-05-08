
import React, { useEffect } from "react";
import { ThemeProvider } from "../components/ThemeProvider";
import ThemeToggle from "../components/ThemeToggle";
import HeroSection from "../components/HeroSection";
import ParallaxSection from "../components/ParallaxSection";
import ShowcaseSection from "../components/ShowcaseSection";
import ColorMorphSection from "../components/ColorMorphSection";
import TestimonialSection from "../components/TestimonialSection";
import SpecsSection from "../components/SpecsSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import { motion, useScroll } from "framer-motion";

const Index = () => {
  const { scrollYProgress } = useScroll();
  
  // Add smooth scrolling using Lenis or similar could be added here
  useEffect(() => {
    // Preload assets or initialize any other scripts
    console.log("Product Launch Website Initialized");
  }, []);

  return (
    <ThemeProvider>
      <div className="relative">
        {/* Progress bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue to-neon-purple z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />
        
        <ThemeToggle />
        
        {/* Main Content */}
        <main>
          <HeroSection />
          <ParallaxSection />
          <ShowcaseSection />
          <ColorMorphSection />
          <TestimonialSection />
          <SpecsSection />
          <CTASection />
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
