'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import servicesData from '@/constants/services'
import { Cog, Pen, Globe, BarChart2, Code, Plus, ArrowLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function ServiceCategoryPage() {
  const { slug } = useParams()
  const service = servicesData.find(s => s.slug === slug)

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Service Category Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">The service category you are looking for does not exist.</p>
          <Link href="/services">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Cog': return <Cog className="w-8 h-8 md:w-10 md:h-10 text-white" />
      case 'Pen': return <Pen className="w-8 h-8 md:w-10 md:h-10 text-white" />
      case 'Globe': return <Globe className="w-8 h-8 md:w-10 md:h-10 text-white" />
      case 'BarChart': return <BarChart2 className="w-8 h-8 md:w-10 md:h-10 text-white" />
      case 'Code': return <Code className="w-8 h-8 md:w-10 md:h-10 text-white" />
      case 'Plus': return <Plus className="w-8 h-8 md:w-10 md:h-10 text-white" />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pb-20">
      
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gray-900/70" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-600 shadow-xl mb-8 group hover:scale-110 transition-transform"
            >
                {getIcon(service.icon)}
            </motion.div>
            
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
                {service.title}
            </motion.h1>

            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed"
            >
                {service.description}
            </motion.p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-3">
             <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 dark:text-white font-medium">{service.title}</span>
             </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        
        {/* Main Content & Sidebar Layout */}
        <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Left Content (Service Sub-Types) */}
            <div className="lg:col-span-2 space-y-16">
                
                {/* Introduction */}
                <div>
                   <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Overview</h2>
                   <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {service.details}
                   </p>
                </div>

                {/* Sub-Services Grid */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Our Capabilities</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {(service.subServices || service.services.map(s => ({ title: s, description: "Explore our expertise in " + s, slug: s.toLowerCase().replace(/\s+/g, '-') }))).map((sub, idx) => (
                            <Link 
                                href={sub.slug ? `/services/${service.slug}/${sub.slug}` : '#'} 
                                key={idx}
                                className={cn(
                                    "group p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm transition-all duration-300 block h-full",
                                    "hover:shadow-2xl hover:-translate-y-2 hover:border-blue-600/50", 
                                    !sub.slug && "pointer-events-none" // Disable link if no slug yet (fallback)
                                )}
                            >
                                <div className="h-48 relative mb-6 rounded-xl overflow-hidden bg-gray-100">
                                     {sub.image ? (
                                        <Image src={sub.image} alt={sub.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                     ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                            <Cog className="w-12 h-12 opacity-20" />
                                        </div>
                                     )}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                                    {sub.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                                    {sub.description}
                                </p>
                                <span className="inline-flex items-center text-sm font-semibold text-blue-600">
                                    Learn More <ArrowLeft className="w-4 h-4 ml-2 rotate-180 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-8">
                
                {/* CTA Card */}
                <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-xl text-center">
                    <h3 className="text-2xl font-bold mb-4">Need Expert Engineering?</h3>
                    <p className="text-blue-100 mb-6">
                        Our team is ready to tackle your most complex challenges. Let's discuss your project today.
                    </p>
                    <Link href="/schedule-meeting">
                        <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 border-none font-bold">
                            Schedule a Meeting
                        </Button>
                    </Link>
                </div>

                {/* Quick Links */}
                <div className="p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Our Industry Sectors</h3>
                    <ul className="space-y-3">
                        {servicesData.map((s) => (
                            <li key={s.id}>
                                <Link 
                                    href={`/services/${s.slug}`}
                                    className={cn(
                                        "flex items-center justify-between p-3 rounded-r-lg transition-all duration-200 border-l-4",
                                        s.slug === slug 
                                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold border-blue-600 shadow-sm" 
                                            : "text-gray-600 dark:text-gray-400 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 hover:pl-4"
                                    )}
                                >
                                    <span>{s.title}</span>
                                    {s.slug === slug && <ChevronRight className="w-4 h-4" />}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

        </div>
      </div>
    </div>
  )
}
