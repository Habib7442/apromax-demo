'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LightbulbIcon, StarIcon, HandshakeIcon, RocketIcon, ChevronRight, ArrowRight, Home, Globe, Trophy, Users, Briefcase, CheckCircle2 } from 'lucide-react'
import { aboutData } from '@/constants/about'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const getValueIcon = (iconName) => {
  const iconClasses = "w-8 h-8"
  switch (iconName) {
    case 'integrity': return <LightbulbIcon className={iconClasses} />
    case 'excellence': return <StarIcon className={iconClasses} />
    case 'collaboration': return <HandshakeIcon className={iconClasses} />
    case 'innovation': return <RocketIcon className={iconClasses} />
    default: return null
  }
}

const stats = [
  { label: "Years of Experience", value: "15+", icon: Trophy },
  { label: "Projects Completed", value: "500+", icon: Briefcase },
  { label: "Happy Clients", value: "50+", icon: Users },
  { label: "Countries Served", value: "5", icon: Globe },
]

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-950 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-60">
           <div className="absolute inset-0 bg-[url('/about_page_bg.jpeg')] bg-cover bg-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            About Us
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center justify-center gap-2 text-gray-200 text-sm md:text-base bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20"
          >
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium">
              <Home className="w-4 h-4" /> Home
            </Link>
            <ChevronRight className="w-4 h-4 text-white/50" />
            <span className="text-white font-semibold">About Us</span>
          </motion.div>
        </div>
      </section>

      {/* 2. Intro Section + Stats */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-semibold mb-6 uppercase tracking-wider">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white leading-tight">
              Pioneering the Future of <br className="hidden md:block" />
              <span className="text-blue-600 dark:text-blue-500">
                Engineering Solutions
              </span>
            </h2>
            <div className="prose prose-lg dark:prose-invert mx-auto text-gray-600 dark:text-gray-300 leading-loose">
              <p className="mb-6">
                AproMax Engineering is a multidisciplinary firm combining expertise in engineering, design and technology. We are dealing with complex challenges in civil, structural, and mechanical engineering to deliver state-of-the-art solutions.
              </p>
              <p>
                Our team consists of dedicated problem-solvers who are committed to innovation and client satisfaction. By leveraging cutting-edge technology and deep industry knowledge, we ensure every project meets the highest standards of quality and efficiency.
              </p>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-gray-100 dark:border-gray-800 py-12">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex p-3 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Mission Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center overflow-hidden">
            <div className="lg:w-1/2 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                  Our Mission
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-loose mb-8">
                  Our mission is to empower progress through engineering excellence. We are dedicated to delivering innovative, sustainable, and reliable solutions that address the complex needs of our clients and communities.
                </p>
                
                <ul className="space-y-4 mb-8">
                  {[
                    "Delivering projects on time and within budget",
                    "Maintain 99%+ client satisfaction rate",
                    "Reducing environmental impact through sustainable design",
                    "Investing in continuous team development"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-200">{item}</span>
                    </li>
                  ))}
                </ul>

                <Button className="rounded-full h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white text-base shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 transition-all">
                  Read More
                </Button>
              </motion.div>
            </div>
            <div className="lg:w-1/2 w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-[4/3] w-full"
              >
                <Image
                  src="/engineering-services/structural.png"
                  alt="Engineering Excellence"
                  fill
                  className="object-cover rounded-2xl shadow-2xl"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Vision Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
           <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-20 items-center">
            <div className="lg:w-1/2 space-y-6">
               <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-block p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 mb-6">
                  <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                  Our Vision
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-loose mb-6">
                  Our vision is to become a globally recognized leader in engineering excellence by 2030. We aim to drive innovation and sustainable progress that improves lives and shapes a better future for generations to come.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We envision a world where every engineering challenge is met with a creative, efficient, and sustainable solution—propelling humanity forward through technology and design.
                </p>
              </motion.div>
            </div>
            <div className="lg:w-1/2 w-full">
               <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[16/9] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/engineering-services/civil.png"
                  alt="Future Infrastructure"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  quality={90}
                />
                <div className="absolute inset-0 bg-black/10" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

       {/* 5. Values Section */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 dark:text-blue-400 font-bold tracking-wider text-sm uppercase mb-3 block">
              Core Principles
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {aboutData.values.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutData.values.items.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-colors duration-300">
                  <div className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300">
                     {getValueIcon(value.icon)}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}