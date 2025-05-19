"use client";
import { motion } from 'framer-motion';
import useCountdown from '@/hooks/useCountdown';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDownCircle } from 'lucide-react';

const CountdownItem = ({ value, label }: { value: number, label: string }) => (
  <motion.div
    className="flex flex-col items-center mx-2 sm:mx-4 p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.span
      key={value} // Animate when value changes
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-tripTeal to-white"
    >
      {String(value).padStart(2, '0')}
    </motion.span>
    <span className="text-xs sm:text-sm text-tripTeal/80 uppercase tracking-wider mt-1">{label}</span>
  </motion.div>
);

const HeroSection = () => {
  const festivalStartDate = process.env.NEXT_PUBLIC_FESTIVAL_START_DATE || "2025-06-03T20:00:00Z"; // Fallback
  const { days, hours, minutes, seconds, isFinished } = useCountdown(festivalStartDate);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden p-4"
      // Optional: Add a subtle animated background pattern or image in globals.css or via JS
      style={{
        // Example: backgroundImage: `url('/images/hero-main-bg.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center'
        // Or a gradient
        background: 'linear-gradient(135deg, #1a0933 0%, #3c145f 50%, #703FEA 100%)' // Deep space purple gradient
      }}
    >
      {/* Optional: Particle effect or subtle Three.js background */}
      {/* <div className="absolute inset-0 z-0 opacity-30"> */}
        {/* <ParticleBackground /> You'd create this component */}
      {/* </div> */}
      
      <div className="relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
          className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter"
        >
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-pulse-glow">
            The Trip
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-4 mb-10 text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto"
        >
          Eine Reise von Freunden für Freunde.
        </motion.p>

        {isFinished ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-4xl font-bold text-tripTeal"
          >
            Es geht los, Viel Spaß!
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2, delayChildren: 0.8 }
              }
            }}
            className="flex justify-center items-start mb-12" // items-start to align text with numbers
          >
            <CountdownItem value={days} label="Tage" />
            <CountdownItem value={hours} label="Stunden" />
            <CountdownItem value={minutes} label="Min" />
            <CountdownItem value={seconds} label="Sek" />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: isFinished ? 0.8 : 1.5 }}
        >
         
        </motion.div>
      </div>

      {/* Scroll down indicator, could be an animated arrow */}
      <motion.div
        initial={{ opacity: 0.7, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
         <Button asChild size="lg" className="bg-gradient-to-r from-tripPink to-tripPurple hover:opacity-90 text-white font-semibold px-8 py-6  text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <Link href="#maps">
            <div className='ml-3'>
            Entdecke The Trip
            </div>
              
              <ArrowDownCircle className="ml-3 mt-2 h-12 w-5 animate-bounce"/>
            </Link>
          </Button>
      </motion.div>
    </section>
  );
};

export default HeroSection;