"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "15+ Years of Excellence",
  "500+ Projects Delivered",
  "ISO 9001:2015 Certified", 
  "24/7 Technical Support"
];

export default function WhoWeAre() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-semibold mb-6">
              About Us
            </span>
            
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
              <span className="text-blue-600 dark:text-blue-400">
                Driving Progress Through
              </span> <br />
              Engineering Excellence
            </h2>
            
            <p className="text-base text-gray-700 dark:text-gray-300 leading-loose mb-8">
              AproMax Engineering is a multidisciplinary firm combining expertise in engineering, 
              design and technology. We are a team of passionate problem-solvers dedicated 
              to delivering innovative solutions that meet unique client needs.
            </p>

            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6 mb-10">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <Link href="/about">
              <Button className="rounded-full h-12 px-6 bg-blue-900 text-white hover:bg-blue-800 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-sm">
                Meet Our Team
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/who-we-are.jpeg"
                alt="AproMax Team"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white/90">
                  <p className="font-medium text-sm mb-0.5">Passionate Experts</p>
                  <p className="text-gray-300 text-xs font-light">Building the future together</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 top-[-20px] right-[-20px] w-[200px] h-[200px] bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl" />
            <div className="absolute -z-10 bottom-[-20px] left-[-20px] w-[200px] h-[200px] bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl" />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}