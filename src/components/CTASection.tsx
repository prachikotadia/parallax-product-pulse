
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CTASection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="section-padding min-h-[70vh] bg-gradient-to-br from-background via-background to-secondary/30 dark:from-background dark:via-background dark:to-primary/10 flex items-center justify-center">
      <div className="container mx-auto text-center">
        <motion.h2 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 dark:from-white dark:to-white/70">
            Experience the Future Today
          </span>
        </motion.h2>
        
        <motion.p 
          className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Join the revolution and elevate your experience with our groundbreaking product.
        </motion.p>
        
        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <button className="pill-button bg-primary text-white px-8 py-4">
            <span>Pre-Order Now</span>
          </button>
          
          <button className="pill-button bg-transparent border border-primary text-primary hover:bg-primary/5 dark:border-white dark:text-white dark:hover:bg-white/5 px-8 py-4">
            <span>Learn More</span>
          </button>
        </motion.div>
        
        <motion.p 
          className="text-sm text-foreground/50 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Free shipping and 30-day money back guarantee
        </motion.p>
      </div>
    </section>
  );
};

export default CTASection;
