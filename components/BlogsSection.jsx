'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Loader2, Calendar, ArrowRight, BookOpen, Search, Home, ChevronRight, User, Clock, ChevronLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const categories = [
  "All Articles",
  "Engineering",
  "Technology",
  "Case Studies",
  "Industry News"
]

const BlogsSection = ({ initialBlogs = [] }) => {
  const [blogs, setBlogs] = useState(initialBlogs)
  const [loading, setLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All Articles")
  const [searchQuery, setSearchQuery] = useState("")

  // No need for client-side fetching anymore as data is passed from SSR


  // Use only real fetched data
  const displayBlogs = blogs

  // Filter logic
  const filteredBlogs = displayBlogs.filter(blog => {
    const matchesCategory = activeCategory === "All Articles" || (blog.category || 'Engineering') === activeCategory
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  // Pagination logic (Client-side for now)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage)
  const currentBlogs = filteredBlogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-40">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        </div>
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Latest Articles
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto"
          >
            Insights, news, and expert perspectives in engineering and technology
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center gap-2 text-gray-200 text-sm md:text-base bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20"
          >
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium">
              <Home className="w-4 h-4" /> Home
            </Link>
            <ChevronRight className="w-4 h-4 text-white/50" />
            <span className="text-white font-semibold">Blogs</span>
          </motion.div>
        </div>
      </section>

      {/* 2. Search & Filter Section */}
      <section className="py-10 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-16 z-30 shadow-sm/50">
        <div className="container mx-auto h-full px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Categories */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => { setActiveCategory(category); setCurrentPage(1); }}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    activeCategory === category
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full h-11 pl-11 pr-4 rounded-full border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:focus:bg-gray-800"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Blog Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
              <p className="text-gray-600 dark:text-gray-400 font-medium animate-pulse">Loading articles...</p>
            </div>
          ) : (
            <>
              {currentBlogs.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {currentBlogs.map((blog, index) => (
                    <motion.div
                      key={blog.id + index} // ensuring unique key for dupes
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Link href={blog.id.startsWith('dummy') ? '#' : `/blogs/${blog.id}`} className="block h-full"> 
                        <Card className={cn(
                          "group h-full flex flex-col overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
                          "shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-2xl"
                        )}>
                          {/* Image Container */}
                          <div className="relative w-full pt-[60%] overflow-hidden bg-gray-100 dark:bg-gray-900">
                             {/* Category Tag */}
                             <span className="absolute top-4 left-4 z-20 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded shadow-lg">
                                {blog.category || 'Engineering'}
                             </span>

                            {blog.featured_image ? (
                              <Image
                                src={blog.featured_image.startsWith('http') ? blog.featured_image : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/${blog.featured_image}`}
                                alt={blog.title}
                                fill
                                className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                <Image
                                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
                                  alt="Placeholder"
                                  fill
                                  className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                                />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>

                          <div className="flex flex-col flex-1 p-6">
                            {/* Meta */}
                            <div className="flex items-center gap-4 mb-4 text-xs text-gray-500 dark:text-gray-400">
                               <div className="flex items-center gap-1.5">
                                 <Calendar className="w-3.5 h-3.5" />
                                 <time>{new Date(blog.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric'})}</time>
                               </div>
                               <div className="flex items-center gap-1.5">
                                 <Clock className="w-3.5 h-3.5" />
                                 <span>{blog.read_time || '5 min read'}</span>
                               </div>
                            </div>

                            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                              {blog.title}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
                              {blog.excerpt}
                            </p>

                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                               <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <User className="w-3.5 h-3.5" />
                                  </div>
                                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{blog.author_name || 'AproMax Team'}</span>
                               </div>
                               <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                                 Read More <ArrowRight className="w-4 h-4 ml-1.5" />
                               </span>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-20">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No articles found</h3>
                    <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search terms.</p>
                    <Button 
                      variant="outline" 
                      className="mt-6"
                      onClick={() => { setActiveCategory("All Articles"); setSearchQuery(""); }}
                    >
                      Clear Filters
                    </Button>
                </div>
              )}

              {/* Pagination Controls */}
              {filteredBlogs.length > itemsPerPage && (
                <div className="flex justify-center items-center gap-4 mt-16">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="rounded-full w-10 h-10 p-0"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="rounded-full w-10 h-10 p-0"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              )}

            </>
          )}

        </div>
      </section>
    </div>
  )
}

export default BlogsSection