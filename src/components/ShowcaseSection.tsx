
import React from 'react';
import { motion } from 'framer-motion';
import ProductModel from './ProductModel';

const ShowcaseSection: React.FC = () => {
  return (
    <section className="section-padding min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background via-background to-accent/10">
      <motion.h2 
        className="text-3xl md:text-5xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Interactive Experience
      </motion.h2>
      
      <motion.p 
        className="text-center text-foreground/70 max-w-2xl mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        viewport={{ once: true }}
      >
        Explore our product in 3D. Drag to rotate and scroll to zoom in and out.
      </motion.p>
      
      <motion.div 
        className="w-full max-w-4xl h-[500px] rounded-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="w-full h-full">
          <ProductModel interactive={true} />
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-sm text-foreground/50">
          Click and drag to rotate. Use scroll wheel to zoom.
        </p>
      </motion.div>
    </section>
  );
};

export default ShowcaseSection;
