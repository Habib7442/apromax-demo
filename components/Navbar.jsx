'use client'

import Link from 'next/link'
import Image from 'next/image'
import { HomeIcon, InfoIcon, WrenchIcon, MailIcon, Menu, ChevronDown, Cog, Pen, Globe, BarChart2, Code, Plus, BookOpen, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import servicesData from '@/constants/services'

const navLinksBeforeServices = [
  { href: '/', label: 'Home', icon: <HomeIcon className="w-4 h-4" /> },
  { href: '/about', label: 'About', icon: <InfoIcon className="w-4 h-4" /> },
]

const navLinksAfterServices = [
  { href: '/contact', label: 'Contact', icon: <MailIcon className="w-4 h-4" />, isActive: (pathname) => pathname === '/contact' },
  { href: '/careers', label: 'Careers', icon: <WrenchIcon className="w-4 h-4" /> },
  { href: '/blogs', label: 'Blogs', icon: <BookOpen className="w-4 h-4" /> },
]

const navLinks = [...navLinksBeforeServices, ...navLinksAfterServices]

const Navbar = () => {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null

  // Determine if navbar should be transparent (Home page, and other pages with hero sections)
  // checks if the current path is one that has a dark hero section
  const hasDarkHero = pathname === '/' || 
                      pathname === '/about' || 
                      pathname === '/contact' || 
                      pathname.startsWith('/services') || 
                      pathname === '/careers' || 
                      pathname === '/internship' ||
                      pathname === '/blogs'
                      
  const isTransparent = hasDarkHero && !isScrolled

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b",
        isTransparent 
          ? "bg-transparent border-transparent" 
          : "bg-white/90 backdrop-blur-md border-gray-100 dark:bg-gray-900/90 dark:border-gray-800"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo - Left */}
          <div className="flex-shrink-0 hidden lg:block">
            <Link 
              href="/" 
              className={cn(
                "flex items-center gap-2 transition-all duration-300 hover:opacity-90",
                isTransparent && "bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg"
              )}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={32}
                quality={100}
                className="h-8 w-auto transition-all duration-300"
              />
            </Link>
          </div>

          {/* Nav Links - Center (Only visible on large devices) */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-6">
            {navLinksBeforeServices.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 py-1.5 px-3 rounded-full text-sm font-medium transition-all duration-200",
                  (link.isActive ? link.isActive(pathname) : pathname === link.href)
                    ? (isTransparent 
                        ? "text-blue-200 bg-white/10 backdrop-blur-sm" 
                        : "text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300")
                    : (isTransparent
                        ? "text-white/80 hover:text-white hover:bg-white/10"
                        : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-gray-50 dark:hover:bg-white/5")
                )}
              >
                <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(
                "flex items-center gap-1.5 py-1.5 px-3 rounded-full text-sm font-medium transition-all duration-200 outline-none",
                pathname.startsWith('/services')
                  ? (isTransparent 
                      ? "text-blue-200 bg-white/10 backdrop-blur-sm" 
                      : "text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300")
                  : (isTransparent
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-gray-50 dark:hover:bg-white/5")
              )}>
                <WrenchIcon className="w-4 h-4 opacity-70" />
                <span>Services</span>
                <ChevronDown className="w-3 h-3 opacity-50" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[90vw] max-w-5xl p-6 bg-white border border-gray-100 shadow-xl rounded-2xl mt-4"
                align="center"
              >
                <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                  {servicesData.map((service) => (
                    <DropdownMenuItem
                      key={service.id}
                      asChild
                      className="p-0 focus:bg-transparent rounded-xl outline-none"
                    >
                      <Link 
                        href={`/services/${service.slug}`} 
                        className="group flex flex-col items-start justify-start h-auto w-full space-y-3 p-4 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className="flex-shrink-0 text-blue-600 bg-blue-50 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            {service.icon === "Cog" && <Cog className="w-5 h-5" />}
                            {service.icon === "Pen" && <Pen className="w-5 h-5" />}
                            {service.icon === "Globe" && <Globe className="w-5 h-5" />}
                            {service.icon === "BarChart" && <BarChart2 className="w-5 h-5" />}
                            {service.icon === "Code" && <Code className="w-5 h-5" />}
                            {service.icon === "Plus" && <Plus className="w-5 h-5" />}
                          </div>
                          <h3 className="font-semibold text-base text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                            {service.title}
                          </h3>
                        </div>
                        <ul className="w-full pl-12 space-y-1.5 border-l-2 border-gray-100 ml-3">
                          {service.services.slice(0, 4).map((item, index) => (
                            <li 
                              key={index}
                              className="text-xs text-gray-500 group-hover:text-gray-700 flex items-center gap-2"
                            >
                              <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-blue-400 transition-colors" />
                              <span className="truncate">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinksAfterServices.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 py-1.5 px-3 rounded-full text-sm font-medium transition-all duration-200",
                  (link.isActive ? link.isActive(pathname) : pathname === link.href)
                    ? (isTransparent 
                        ? "text-blue-200 bg-white/10 backdrop-blur-sm" 
                        : "text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300")
                    : (isTransparent
                        ? "text-white/80 hover:text-white hover:bg-white/10"
                        : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-gray-50 dark:hover:bg-white/5")
                )}
              >
                <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex flex-shrink-0 items-center gap-3">
            <Link href="/schedule-meeting">
              <Button
                size="sm"
                className={cn(
                  "hidden lg:inline-flex items-center gap-2 rounded-full px-5 h-9 text-sm font-medium shadow-sm transition-all hover:shadow-md",
                  isTransparent
                    ? "bg-white text-blue-900 hover:bg-blue-50"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                )}
              >
                <Calendar className="w-3.5 h-3.5" />
                Schedule Meeting
              </Button>
            </Link>

            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className={cn(
                    "lg:hidden p-2 rounded-full transition-colors outline-none",
                    isTransparent 
                      ? "text-white hover:bg-white/10"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 flex flex-col bg-white border-l border-gray-100 shadow-2xl">
                 <SheetTitle className="sr-only">Mobile Menu</SheetTitle> {/* Accessibility Fix */}
                
                {/* Mobile Menu Header */}
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-3">
                     <Image 
                       src="/logo.png" 
                       alt="AproMax Logo" 
                       width={120} 
                       height={32}
                       className="h-8 w-auto"
                     />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 font-medium">Engineering Excellence Delivered</p>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
                  
                  {/* Main Links */}
                  <div className="space-y-1">
                    {navLinksBeforeServices.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-all",
                          pathname === link.href 
                            ? "bg-blue-50 text-blue-700" 
                            : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                        )}
                      >
                         <span className={cn(
                            pathname === link.href ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600"
                         )}>{link.icon}</span>
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  {/* Services Accordion-style Group */}
                  <div className="space-y-3">
                     <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Services</p>
                     <div className="grid grid-cols-1 gap-1">
                        {servicesData.slice(0, 4).map((service) => (
                           <Link
                              key={service.id}
                              href={`/services/${service.slug}`}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors"
                           >
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-200"></div>
                              {service.title}
                           </Link>
                        ))}
                        <Link
                           href="/services"
                           onClick={() => setIsOpen(false)}
                           className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 mt-1"
                        >
                           View All Services <ChevronDown className="w-4 h-4 -rotate-90" />
                        </Link>
                     </div>
                  </div>

                  {/* Other Links */}
                   <div className="space-y-1">
                    {navLinksAfterServices.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-all",
                          pathname === link.href 
                            ? "bg-blue-50 text-blue-700" 
                            : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                        )}
                      >
                         <span className={cn(
                            pathname === link.href ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600"
                         )}>{link.icon}</span>
                        {link.label}
                      </Link>
                    ))}
                  </div>

                </div>

                {/* Mobile Menu Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                  <Link href="/schedule-meeting" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 h-10 font-semibold rounded-xl">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Meeting
                    </Button>
                  </Link>

                  <div className="flex justify-center gap-6 mt-6">
                     {/* Simple dummy social icons for design completeness */}
                     {[1,2,3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gray-200 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center text-gray-400 transition-colors cursor-pointer">
                           <Globe className="w-4 h-4" />
                        </div>
                     ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar