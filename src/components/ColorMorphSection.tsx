
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { useTheme } from './ThemeProvider';

interface ColorCardProps {
  title: string;
  description: string;
  color: string;
  index: number;
  darkColor?: string;
}

const ColorCard: React.FC<ColorCardProps> = ({ title, description, color, darkColor, index }) => {
  const { theme } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const activeColor = theme === 'dark' && darkColor ? darkColor : color;
  
  // Magnetic hover effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(card, {
      x: x * 0.05,
      y: y * 0.05,
      rotationX: y * 0.05,
      rotationY: x * -0.05,
      ease: 'power3.out',
      duration: 0.5
    });
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    gsap.to(cardRef.current, {
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      ease: 'power3.out',
      duration: 0.5
    });
  };
  
  return (
    <motion.div 
      ref={cardRef}
      className="glass-card p-6 w-full max-w-xs h-60 flex flex-col items-start justify-between group cursor-pointer"
      style={{ 
        borderColor: activeColor + '40', // Adding transparency
        transition: 'border-color 0.3s ease, transform 0.3s ease'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ 
        borderColor: activeColor,
        boxShadow: `0 10px 30px -15px ${activeColor}80`
      }}
    >
      <div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-foreground/70 text-sm">{description}</p>
      </div>
      
      <div 
        className="w-12 h-12 rounded-full transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: activeColor }}
      />
    </motion.div>
  );
};

const ColorMorphSection: React.FC = () => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const colorOptions = [
    {
      title: "Celestial Blue",
      description: "The perfect balance of sophistication and vibrancy.",
      color: "#0086ff",
      darkColor: "#00BFFF"
    },
    {
      title: "Midnight Black",
      description: "Timeless elegance with a premium finish.",
      color: "#121212",
      darkColor: "#333333"
    },
    {
      title: "Aurora Green",
      description: "Inspired by nature's most spectacular light show.",
      color: "#4CAF50",
      darkColor: "#39FF14"
    },
    {
      title: "Nebula Purple",
      description: "Bold and distinctive for those who stand out.",
      color: "#9C27B0",
      darkColor: "#b362ff"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen section-padding overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Animated background */}
      <motion.div 
        ref={gradientRef}
        className="absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 animate-morph-gradient"
        style={{ opacity: backgroundOpacity, backgroundSize: "200% 200%" }}
      />
      
      <div className="relative z-10 container mx-auto">
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Choose Your Color
        </motion.h2>
        
        <motion.p 
          className="text-center text-foreground/70 max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Express your style with our premium finishes, each meticulously crafted for both beauty and durability.
        </motion.p>
        
        <motion.div 
          className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-4'} gap-6`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {colorOptions.map((option, index) => (
            <ColorCard 
              key={index}
              title={option.title}
              description={option.description}
              color={option.color}
              darkColor={option.darkColor}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ColorMorphSection;
