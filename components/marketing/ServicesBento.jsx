'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import servicesData from '@/constants/services'

// Map categories to services
const getCategory = (title) => {
  switch (title) {
    case "Engineering Services": return "Core";
    case "Design Services": return "Creative";
    case "Analysis Services": return "Technical";
    case "Development Services": return "Innovation";
    case "Web And App Development": return "Digital";
    case "Other Services": return "Specialized";
    default: return "Service";
  }
}

export default function ServicesBento() {
  // Sort and process services
  const processedServices = [...servicesData].sort((a, b) => {
    // Custom sort order
    const order = [
      "engineering-services",
      "design-services",
      "analysis-services",
      "development-services",
      "web-and-app-development",
      "other-services"
    ];
    
    return order.indexOf(a.slug) - order.indexOf(b.slug);
  }).map(service => ({
    ...service,
    category: getCategory(service.title),
    href: `/services/${service.slug}`
  }));

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Our Services
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base">
            From mechanical design to digital transformation, we have the expertise to build it all.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processedServices.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 transition-all hover:shadow-2xl hover:-translate-y-2 aspect-[4/3]"
            >
                <Link href={service.href} className="block w-full h-full">
                  {/* Image Background */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={100}
                    />
                    {/* Stronger Dark Gradient Overlay for Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-300" />
                  </div>

                  {/* Top Content: Badge & Arrow */}
                  <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start z-10">
                    <span className="inline-block px-3 py-1 bg-blue-600/90 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm">
                      {service.category}
                    </span>
                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Bottom Content: Title & Description */}
                  <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                    <div className="flex flex-col items-start gap-2">
                       <h3 className="text-xl md:text-2xl font-bold leading-tight text-white group-hover:text-blue-200 transition-colors">
                        {service.title}
                      </h3>
                      
                      <p className="text-sm text-gray-300 line-clamp-2 h-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 delay-75">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
