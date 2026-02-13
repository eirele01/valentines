import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Hero = () => {
  const scrollToTimeline = () => {
    const timeline = document.getElementById('timeline');
    timeline?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1596395332309-8b80fc277d33?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]"></div>

      <div className="relative z-10 px-6 max-w-4xl mx-auto text-[var(--text-color)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex justify-center mb-6">
            <Heart className="text-[var(--accent-rose)] w-16 h-16 fill-[var(--accent-rose)]/50" />
          </div>

          <h1 className="text-5xl md:text-8xl mb-6 font-bold tracking-tight text-[#2D3748]">
            Our Story.
          </h1>

          <p className="text-xl md:text-2xl font-light italic mb-12 opacity-90 text-[#4A5568]">
            Every moment with you is a melody of peace wrapped in devotion.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTimeline}
            className="px-8 py-4 bg-white/80 text-[var(--accent-rose)] text-lg rounded-full font-serif font-semibold shadow-xl hover:bg-white transition-all flex items-center gap-2 mx-auto border border-white"
          >
            Start the Journey
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--secondary-text)]"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Scroll Down
      </motion.div>
    </section>
  );
};

export default Hero;
