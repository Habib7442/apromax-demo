'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import servicesData from '@/constants/services'
import { ArrowLeft, ChevronRight, CheckCircle2, Cog, Calendar, Check, HelpCircle, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function ServiceDetailPage() {
  const { slug, subSlug } = useParams()
  
  // Find the category first
  const serviceCategory = servicesData.find(s => s.slug === slug)
  
  // Then find the specific service sub-type
  const subService = serviceCategory?.subServices?.find(s => s.slug === subSlug)

  if (!serviceCategory || !subService) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Service Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">The specific service you are looking for does not exist.</p>
          <Link href={`/services/${slug || ''}`}>
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Category
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pb-20">
      
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={subService.image || serviceCategory.image}
            alt={subService.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gray-900/80" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="inline-block px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 backdrop-blur-sm text-blue-300 text-sm font-semibold mb-6">
                    {serviceCategory.title}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
                    {subService.title}
                </h1>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                    {subService.description}
                </p>
            </motion.div>
        </div>
      </div>

      {/* Breadcrumb - Enhanced */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-16 z-30 shadow-sm backdrop-blur-md bg-white/80 dark:bg-gray-900/80 supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
             <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 overflow-x-auto whitespace-nowrap">
                <Link href="/" className="hover:text-blue-600 hover:underline transition-colors">Home</Link>
                <span className="text-gray-300 mx-1">/</span>
                <Link href="/services" className="hover:text-blue-600 hover:underline transition-colors">Services</Link>
                <span className="text-gray-300 mx-1">/</span>
                <Link href={`/services/${slug}`} className="hover:text-blue-600 hover:underline transition-colors">{serviceCategory.title}</Link>
                <span className="text-gray-300 mx-1">/</span>
                <span className="text-gray-900 dark:text-white font-medium">{subService.title}</span>
             </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-16">
                
                {/* Long Description */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Detailed Overview</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        {subService.longDescription || subService.description}
                    </p>
                </section>

                {/* Key Features - Enhanced Hover */}
                {subService.features && (
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Capabilities</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {subService.features.map((feature, idx) => (
                                <div key={idx} className="group flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 hover:border-blue-100 hover:translate-x-1 cursor-default">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400 mt-0.5 transition-transform duration-300 group-hover:scale-110">
                                        <Check className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-200 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Process / Methodology Section (New) */}
                <section className="bg-white dark:bg-gray-950">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Our Process</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { step: "01", title: "Consultation", desc: "Understanding your requirements" },
                            { step: "02", title: "Design", desc: "Creating optimal solutions" },
                            { step: "03", title: "Review", desc: "Refining with your feedback" },
                            { step: "04", title: "Delivery", desc: "Implementation and support" }
                        ].map((item, idx) => (
                            <div key={idx} className="relative p-6 rounded-xl bg-gray-50 dark:bg-gray-800 border-t-4 border-blue-600">
                                <span className="text-4xl font-bold text-blue-100 dark:text-gray-700 absolute top-4 right-4">{item.step}</span>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 relative z-10">{item.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 relative z-10">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Benefits - Enhanced Visual Hierarchy */}
                {subService.benefits && (
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Benefits</h2>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {subService.benefits.map((benefit, idx) => (
                                <div key={idx} className="group p-6 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-200 dark:hover:border-blue-800">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0 text-blue-600 border border-blue-100 dark:border-blue-800/50 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">Benefit {idx + 1}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{benefit}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                
                {/* Image Showcase with Caption */}
                <figure className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
                     <div className="relative h-[400px]">
                        <Image 
                            src={subService.image || serviceCategory.image} 
                            alt={subService.title} 
                            fill 
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                     </div>
                     <figcaption className="bg-gray-50 dark:bg-gray-900 p-4 text-center text-sm text-gray-500 italic border-t border-gray-100 dark:border-gray-800">
                        Our experts delivering excellence in {subService.title}
                     </figcaption>
                </figure>



            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8 h-fit lg:sticky lg:top-24">
                
                {/* Schedule Box */}
                <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl text-white">
                    <h3 className="text-xl font-bold mb-3">Start Your Project</h3>
                    <p className="text-blue-100 text-sm mb-6">
                        Ready to leverage our {subService.title.toLowerCase()} expertise? Contact us to discuss your requirements.
                    </p>
                    <Link href="/schedule-meeting">
                        <Button className="w-full bg-white text-blue-700 hover:bg-blue-50 border-none font-bold shadow-sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule Consultation
                        </Button>
                    </Link>
                </div>

                {/* Related Services in Category - Enhanced Links */}
                <div className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-gray-950">
                    <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                        <h3 className="font-bold text-gray-900 dark:text-white">More in {serviceCategory.title}</h3>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {serviceCategory.subServices?.filter(s => s.slug !== subSlug).map((s, idx) => (
                            <Link 
                                key={idx} 
                                href={`/services/${slug}/${s.slug}`}
                                className="block p-4 transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 group border-l-4 border-transparent hover:border-blue-600 hover:pl-5"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300">{s.title}</span>
                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>

        </div>
      </div>
    </div>
  )
}
