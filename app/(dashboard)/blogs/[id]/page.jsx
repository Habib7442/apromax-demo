import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, Calendar, Clock, User, Share2, Linkedin, Twitter, Facebook, Copy, Home, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export default async function BlogPost({ params }) {
  // Await params before using its properties
  const { id } = await params

  try {
    const { data: blog, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single()

    // Fetch related articles (fetch 4 to ensure we have 3 after filtering current)
    const { data: related } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(4)
    
    // Filter out current blog and take top 3
    const relatedBlogs = (related || []).filter(doc => doc.id !== id).slice(0, 3)

    if (error || !blog) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Blog post not found</h1>
            <Link href="/blogs">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>
          </div>
        </div>
      )
    }

    // Default metadata
    const readTime = blog.read_time || "5 min read"
    const author = blog.author_name || "AproMax Team"
    const category = blog.category || "Engineering"

    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 pb-20">
        
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 max-w-4xl mb-8">
           <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <Link href="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
                 <Home className="w-3.5 h-3.5" /> Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/blogs" className="hover:text-blue-600 transition-colors">
                 Blogs
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 dark:text-white font-medium truncate max-w-[200px] md:max-w-md">
                 {blog.title}
              </span>
           </nav>
           
           <Link href="/blogs">
            <Button variant="ghost" className="pl-0 hover:pl-2 transition-all text-blue-600 hover:text-blue-700 hover:bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Button>
          </Link>
        </div>

        {/* Main Article Content */}
        <article className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white dark:bg-gray-900 md:shadow-sm md:border border-gray-100 dark:border-gray-800 rounded-2xl md:p-12 p-0">
            
            {/* Header */}
            <header className="mb-10 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                 <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
                    {category}
                 </span>
                 <span className="text-gray-400">|</span>
                 <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={blog.created_at}>
                      {new Date(blog.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                 </div>
                 <span className="text-gray-400 hidden sm:inline">|</span>
                 <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{readTime}</span>
                 </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white leading-tight">
                {blog.title}
              </h1>

              {/* Author & Share */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-6 border-y border-gray-100 dark:border-gray-800">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                       <User className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-sm font-bold text-gray-900 dark:text-white">{author}</p>
                       <p className="text-xs text-gray-500">Author</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500 mr-2">Share:</span>
                    <Button size="icon" variant="outline" className="h-9 w-9 rounded-full text-gray-500 hover:text-blue-600 hover:border-blue-200">
                       <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="h-9 w-9 rounded-full text-gray-500 hover:text-blue-400 hover:border-blue-200">
                       <Twitter className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="h-9 w-9 rounded-full text-gray-500 hover:text-blue-800 hover:border-blue-200">
                       <Facebook className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="h-9 w-9 rounded-full text-gray-500 hover:text-green-600 hover:border-green-200">
                       <Copy className="w-4 h-4" />
                    </Button>
                 </div>
              </div>
            </header>

            {/* Featured Image */}
            {blog.featured_image && (
              <div className="relative w-full aspect-video mb-12 rounded-2xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800">
                <Image
                  src={blog.featured_image.startsWith('http') ? blog.featured_image : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/${blog.featured_image}`}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Content Body */}
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-blue-600 prose-img:rounded-xl prose-blue">
               <ReactMarkdown remarkPlugins={[remarkGfm]}>
                 {blog.content}
               </ReactMarkdown>
            </div>

            {/* CTA Box */}
            <div className="mt-16 p-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl text-center shadow-xl text-white">
               <h3 className="text-2xl font-bold mb-3">Ready to transform your ideas?</h3>
               <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Contact AproMax Engineering today to discuss how our expert team can help bring your vision to life.
               </p>
               <Link href="/contact">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 border-none font-semibold shadow-md">
                     Get in Touch
                  </Button>
               </Link>
            </div>

          </div>
        </article>

        {/* Related Articles (Real Data) */}
        {relatedBlogs.length > 0 && (
          <section className="container mx-auto px-4 max-w-6xl mt-20">
             <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Related Articles</h2>
                <Link href="/blogs" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                   View All <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                </Link>
             </div>
             
             <div className="grid md:grid-cols-3 gap-8">
                {relatedBlogs.map((item) => (
                   <Link href={`/blogs/${item.id}`} key={item.id} className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 block h-full">
                      <div className="relative h-48 bg-gray-200 dark:bg-gray-800">
                         {item.featured_image ? (
                           <Image
                               src={item.featured_image.startsWith('http') ? item.featured_image : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/${item.featured_image}`}
                               alt={item.title}
                               fill
                               className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                            />
                         ) : (
                           <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                             <Home className="w-10 h-10 opacity-20" />
                           </div>
                         )}
                      </div>
                      <div className="p-5">
                         <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{item.category || 'Tech'}</span>
                         <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {item.title}
                         </h3>
                         <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                            {item.excerpt || item.title}
                         </p>
                         <span className="text-sm font-medium text-blue-600 flex items-center">
                            Read Article <ChevronRight className="w-4 h-4 ml-1" />
                         </span>
                      </div>
                   </Link>
                ))}
             </div>
          </section>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error fetching blog:', error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Error loading blog post</h1>
          <Link href="/blogs">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}