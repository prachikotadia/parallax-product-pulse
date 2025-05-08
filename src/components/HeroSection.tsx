
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ProductModel from './ProductModel';

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (containerRef.current && titleRef.current) {
      // Create parallax effect on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        
        gsap.to(titleRef.current, {
          rotationY: xAxis * 0.5,
          rotationX: yAxis * 0.5,
          duration: 1,
          ease: 'power2.out'
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-secondary/20 dark:from-background dark:to-accent/10">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-primary/5 dark:bg-neon-blue/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-primary/5 dark:bg-neon-purple/5 blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center">
        <div className="h-[350px] max-w-[350px] md:h-[400px] md:max-w-[400px] mb-8">
          <ProductModel />
        </div>
        
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.h2 
            className="text-xl md:text-2xl font-medium mb-3 text-foreground/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Introducing
          </motion.h2>
          
          <motion.h1
            ref={titleRef}
            className="text-4xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 dark:from-white dark:to-white/70"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            The Future Is Here
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl text-foreground/80 max-w-xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            Elevating performance to unprecedented levels with revolutionary technology.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <button className="pill-button">
              <span>Learn More</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
