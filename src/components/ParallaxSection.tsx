import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import ProductModel from './ProductModel';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, index }) => {
  return (
    <motion.div 
      className="glass-card p-6 md:p-8 max-w-lg"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="text-2xl mb-4">{icon}</div>
      <h3 className="text-xl md:text-2xl font-medium mb-3">{title}</h3>
      <p className="text-foreground/80">{description}</p>
    </motion.div>
  );
};

const ParallaxSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const smoothY = useSpring(y, { damping: 15 });

  const features = [
    {
      title: "Revolutionary Performance",
      description: "Experience blazing-fast processing speeds and efficiency with our next-generation technology.",
      icon: "⚡"
    },
    {
      title: "Flawless Integration",
      description: "Seamlessly connects with all your devices in the ecosystem for a truly unified experience.",
      icon: "🔄"
    },
    {
      title: "Stunning Design",
      description: "Meticulously crafted with premium materials and an attention to detail that sets new standards.",
      icon: "✨"
    },
    {
      title: "Intelligent Assistance",
      description: "Advanced AI capabilities that anticipate your needs and enhance your daily experiences.",
      icon: "🧠"
    }
  ];

  return (
    <section ref={sectionRef} className="min-h-screen bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden section-padding flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
      {/* Product Visual */}
      <motion.div 
        className="w-full lg:w-1/2 h-[400px] lg:h-[600px] sticky top-1/4 lg:top-1/3 lg:left-0"
        style={{ y: smoothY }}
      >
        <div className="h-full">
          <motion.div 
            className="relative h-full w-full"
            whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* This is where the 3D model would go */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-[300px] md:h-[500px]">
                <ProductModel />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Features */}
      <div className="w-full lg:w-1/2 space-y-12 md:space-y-32">
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 lg:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Key Features
        </motion.h2>
        
        <div className="space-y-8 md:space-y-24">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
