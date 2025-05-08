
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpecTableProps {
  specs: {
    category: string;
    items: {
      name: string;
      value: string;
    }[];
  }[];
}

const SpecTable: React.FC<SpecTableProps> = ({ specs }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(specs[0].category);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {specs.map((category) => (
        <div key={category.category} className="mb-4">
          <button
            className={`w-full glass-card p-4 flex justify-between items-center ${
              expandedCategory === category.category ? 'bg-primary/5 dark:bg-primary/10' : ''
            }`}
            onClick={() => setExpandedCategory(expandedCategory === category.category ? null : category.category)}
          >
            <span className="font-medium">{category.category}</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-300 ${
                expandedCategory === category.category ? 'rotate-180' : ''
              }`}
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <AnimatePresence>
            {expandedCategory === category.category && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="glass-card mt-1 p-4 divide-y divide-foreground/10">
                  {category.items.map((item, index) => (
                    <div key={index} className="py-3 grid grid-cols-2">
                      <span className="text-foreground/70">{item.name}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

const SpecsSection: React.FC = () => {
  const specs = [
    {
      category: "Performance",
      items: [
        { name: "Processor", value: "Ultra Fusion Chip" },
        { name: "CPU", value: "12-core (8 performance, 4 efficiency)" },
        { name: "GPU", value: "16-core" },
        { name: "Neural Engine", value: "32-core" },
        { name: "Memory", value: "32GB unified" }
      ]
    },
    {
      category: "Display",
      items: [
        { name: "Screen Size", value: '15.6"' },
        { name: "Resolution", value: "5120 x 3200" },
        { name: "Technology", value: "Liquid Retina XDR" },
        { name: "Brightness", value: "1600 nits (peak)" },
        { name: "Refresh Rate", value: "120Hz ProMotion" }
      ]
    },
    {
      category: "Battery",
      items: [
        { name: "Capacity", value: "100Wh" },
        { name: "Video Playback", value: "Up to 22 hours" },
        { name: "Web Browsing", value: "Up to 18 hours" },
        { name: "Fast Charge", value: "50% in 30 minutes" }
      ]
    },
    {
      category: "Connectivity",
      items: [
        { name: "Wi-Fi", value: "Wi-Fi 6E (802.11ax)" },
        { name: "Bluetooth", value: "Bluetooth 5.3" },
        { name: "Ports", value: "3x Thunderbolt 4, 1x HDMI, 1x SD card" }
      ]
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto">
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Tech Specifications
        </motion.h2>
        
        <motion.p 
          className="text-center text-foreground/70 max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Explore the technical details that power the extraordinary experience.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SpecTable specs={specs} />
        </motion.div>
      </div>
    </section>
  );
};

export default SpecsSection;
