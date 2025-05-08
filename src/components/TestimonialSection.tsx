
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, company }) => {
  return (
    <motion.div 
      className="glass-card p-6 md:p-8 w-full h-full flex flex-col"
      whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex-1">
        <div className="text-3xl mb-4">"</div>
        <p className="text-foreground/80 italic mb-4">{quote}</p>
      </div>
      
      <div className="mt-6 pt-4 border-t border-foreground/10">
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-foreground/60">
          {role}{company ? `, ${company}` : ''}
        </p>
      </div>
    </motion.div>
  );
};

const TestimonialSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  
  const testimonials = [
    {
      quote: "This product has completely transformed my workflow. The speed and responsiveness are unlike anything I've experienced before.",
      author: "Sarah Johnson",
      role: "Creative Director",
      company: "Design Studio"
    },
    {
      quote: "The attention to detail is remarkable. Every aspect of this device feels premium and thoughtfully designed.",
      author: "Michael Chen",
      role: "Tech Reviewer",
      company: "TechWorld"
    },
    {
      quote: "I was skeptical at first, but after using it for a month, I can't imagine going back. It's that good.",
      author: "Alex Rodriguez",
      role: "Software Engineer"
    },
    {
      quote: "The seamless integration with my existing devices made the transition effortless. It just works.",
      author: "Emma Wilson",
      role: "Product Manager",
      company: "Future Labs"
    },
    {
      quote: "The battery life exceeds all expectations. I can work for days without needing to recharge.",
      author: "David Park",
      role: "Digital Nomad"
    }
  ];
  
  const startScrolling = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = direction === 'left' ? -300 : 300;
    
    setIsScrolling(true);
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
    
    setTimeout(() => setIsScrolling(false), 500);
  };

  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto">
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          What People Are Saying
        </motion.h2>
        
        <motion.p 
          className="text-center text-foreground/70 max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Don't just take our word for it. See what our customers are saying about their experience.
        </motion.p>
        
        <div className="relative">
          {/* Navigation arrows */}
          <button 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/50 dark:bg-background/30 p-3 rounded-full backdrop-blur-sm hidden md:block"
            onClick={() => startScrolling('left')}
            disabled={isScrolling}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/50 dark:bg-background/30 p-3 rounded-full backdrop-blur-sm hidden md:block"
            onClick={() => startScrolling('right')}
            disabled={isScrolling}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {/* Testimonial carousel */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-8 space-x-6 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="min-w-[300px] md:min-w-[400px] snap-center"
                style={{ flex: '0 0 auto' }}
              >
                <Testimonial 
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                  company={testimonial.company}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
