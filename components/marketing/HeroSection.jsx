"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn, scrollToSection } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/hero-clean.png"
          alt="Engineering Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Custom Dark Gradient Overlay - Darkened for better text contrast */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 51, 153, 0.6) 100%)'
          }} 
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto pt-20 flex items-center justify-center">
        <div className="w-full max-w-5xl text-center space-y-8 px-4">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 drop-shadow-lg">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Engineering Services
              </span>
            </h1>
            <h2 className="text-2xl md:text-4xl font-light italic text-blue-100/90 tracking-wider font-serif mt-2">
              Maximizing Potential and Optimizing Solutions
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-light"
          >
            AproMax Engineering is a multidisciplinary firm combining expertise in engineering,
            design and technology to deliver innovative and client focused solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/schedule-meeting">
              <Button size="lg" className="rounded-full h-12 px-6 text-base bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 border border-blue-500/20">
                Schedule a Meeting
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full h-12 px-6 text-base border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/40 transition-all hover:-translate-y-1"
            >
              Contact Us
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
