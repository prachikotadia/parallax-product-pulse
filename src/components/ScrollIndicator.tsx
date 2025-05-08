
import React from 'react';
import { motion } from 'framer-motion';

// This component is no longer used in the application
const ScrollIndicator: React.FC = () => {
  return (
    <motion.div 
      className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <span className="text-sm font-light text-foreground/80">Scroll to Discover</span>
      <motion.div 
        className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <motion.div 
          className="w-1.5 h-1.5 bg-foreground/80 rounded-full"
          animate={{ 
            y: [0, 15, 0],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ marginTop: '5px' }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
