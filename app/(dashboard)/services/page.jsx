"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Cog,
  Pen,
  Globe,
  BarChart2,
  Code,
  Plus,
} from "lucide-react";
import servicesData from "@/constants/services";
import { cn } from "@/lib/utils";

// Define consistent glassmorphism colors for all cards (using first card's color scheme)
const cardColors = [
  "bg-blue-500/10 border-blue-500/30",
  "bg-blue-500/10 border-blue-500/30",
  "bg-blue-500/10 border-blue-500/30",
  "bg-blue-500/10 border-blue-500/30",
  "bg-blue-500/10 border-blue-500/30",
  "bg-blue-500/10 border-blue-500/30",
];

// Define text colors as black for all cards
const textColors = [
  "text-black",
  "text-black",
  "text-black",
  "text-black",
  "text-black",
  "text-black",
];

const icons = {
  Cog: <Cog className="h-4 w-4 text-primary" />,
  Pen: <Pen className="h-4 w-4 text-primary" />,
  Globe: <Globe className="h-4 w-4 text-primary" />,
  BarChart: <BarChart2 className="h-4 w-4 text-primary" />,
  Code: <Code className="h-4 w-4 text-primary" />,
  Plus: <Plus className="h-4 w-4 text-primary" />,
};

const ServiceCard = ({ item, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Special handling for different services with carousels
  const isEngineeringService = item.title === "Engineering Services";
  const isDesignService = item.title === "Design Services";
  const isAnalysisService = item.title === "Analysis Services";
  const isDevelopmentService = item.title === "Development Services";
  const isOtherService = item.title === "Other Services";
  const isWebDevService = item.title === "Web And App Development";
  
  // Determine images based on service type
  let images = [item.image];
  if (isEngineeringService) {
    images = ["/engineering-services/mechanical.jpeg", "/engineering-services/electrical.jpeg", "/engineering-services/civil.png", "/engineering-services/electronics.png"];
  } else if (isDesignService) {
    images = ["/design-services/cad_design.jpeg", "/design-services/3d_modelling.jpeg", "/design-services/product_design.jpeg"];
  } else if (isAnalysisService) {
    images = ["/analysis-services/structural_analysis.jpeg", "/analysis-services/thermal_analysis.jpeg", "/analysis-services/fea_analysis.jpeg", "/analysis-services/cfd_analysis.jpeg"];
  } else if (isDevelopmentService) {
    images = ["/development-services/prototype_development.jpeg", "/development-services/product_testing.jpeg", "/development-services/custom_software_development.jpeg", "/development-services/programming_languages.jpeg"];
  } else if (isOtherService) {
    images = ["/other-services/reverse_engineering.jpeg", "/other-services/value_engineering.jpeg", "/other-services/failure_analysis.jpeg", "/other-services/ipd.jpeg"];
  } else if (isWebDevService) {
    images = ["/webdev-services/1.jpg", "/webdev-services/2.jpg", "/webdev-services/3.jpg"];
  }

  // Auto-rotate images for services with carousels
  useEffect(() => {
    if (!isEngineeringService && !isDesignService && !isAnalysisService && !isDevelopmentService && !isOtherService && !isWebDevService) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isEngineeringService, isDesignService, isAnalysisService, isDevelopmentService, isOtherService, isWebDevService, images.length]);

  const handleCardInteraction = () => {
    setIsFlipped(!isFlipped);
  };

  // Get card color based on index (now all use the first card's color)
  const cardColorClass = cardColors[0]; // Always use first card's color
  const textColorClass = textColors[0]; // Always use black text

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/services/${item.slug}`} className="block">
        <div 
          className="relative w-full h-96 cursor-pointer"
          onClick={handleCardInteraction}
          onMouseEnter={() => window.innerWidth >= 1024 && setIsFlipped(true)}
          onMouseLeave={() => window.innerWidth >= 1024 && setIsFlipped(false)}
        >
          {/* Front of card with glassmorphism effect */}
          <motion.div
            className={`absolute inset-0 w-full h-full rounded-xl backdrop-blur-lg border flex flex-col overflow-hidden shadow-lg ${cardColorClass}`}
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex-1 w-full rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center overflow-hidden">
              <Image
                src={images[currentImageIndex] || item.image}
                alt={item.title}
                width={1000}
                height={1000}
                quality={100}
                className="object-cover w-full h-full"
              />
            </div>
            <div className={`p-4 flex items-center justify-between ${textColorClass} bg-white/10`}>
              <h3 className={`font-bold text-2xl ${textColorClass}`}>{item.title}</h3>
              {icons[item.icon]}
            </div>
          </motion.div>

          {/* Back of card with glassmorphism effect */}
          <motion.div
            className={`absolute inset-0 w-full h-full rounded-xl backdrop-blur-lg border flex flex-col overflow-hidden shadow-lg ${cardColorClass}`}
            initial={false}
            animate={{ rotateY: isFlipped ? 0 : -180 }}
            transition={{ duration: 0.6 }}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className={`p-4 flex-1 bg-white/10 ${textColorClass}`}>
              <h3 className={`font-bold text-2xl mb-2 ${textColorClass}`}>{item.title}</h3>
              <ul className="space-y-2">
                {item.services.map((service, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`text-sm flex items-start gap-2 ${textColorClass}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-800 mt-2 flex-shrink-0" />
                    <span>{service}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className={`p-4 border-t border-white/20 bg-white/10 ${textColorClass}`}>
              {/* Removed "Click to flip back" text as requested */}
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function ServicesPage() {
  // Find the Web Development service (assuming it's "Web And App Development")
  const webDevService = servicesData.find(service => service.title === "Web And App Development");
  const otherServices = servicesData.filter(service => service.title !== "Web And App Development");
  
  // Create a grid layout that ensures web dev is in second last position
  const renderServices = () => {
    // If webDevService doesn't exist, just return all services normally
    if (!webDevService) {
      return servicesData.map((item, i) => (
        <ServiceCard key={item.id} item={item} index={i} />
      ));
    }
    
    // Create service elements for all services except web dev
    const serviceElements = otherServices.map((item, i) => (
      <ServiceCard key={item.id} item={item} index={i} />
    ));
    
    // Insert web dev service at second to last position
    // If there are no other services, place it at the beginning
    const insertPosition = Math.max(0, serviceElements.length - 1);
    serviceElements.splice(insertPosition, 0, 
      <ServiceCard key={webDevService.id} item={webDevService} index={insertPosition} />
    );
    
    return serviceElements;
  };

  return (
    <div className="min-h-screen relative">
      {/* Background with subtle light color instead of video */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative py-16 overflow-hidden bg-sky-50"
      >
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16 mt-16 md:mt-24">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600"
            >
              Our Services
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-700 max-w-3xl mx-auto"
            >
              Discover our comprehensive range of professional services designed
              to meet your needs
            </motion.p>
          </div>

          {/* Services Grid with Glassmorphism Cards - 2 cards per row */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {renderServices()}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}