'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Instagram, Linkedin, Mail, MapPin, Phone, Facebook, Twitter, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const quickLinks = [
  { title: 'Home', href: '/' },
  { title: 'About Us', href: '/about' },
  { title: 'Careers', href: '/careers' },
  { title: 'Blogs', href: '/blogs' },
  { title: 'Contact', href: '/contact' },
]

const servicesLinks = [
  { title: 'Civil & Structural', href: '/services/civil-and-structural-engineering' },
  { title: 'Mechanical', href: '/services/mechanical-engineering' },
  { title: 'Electrical', href: '/services/electrical-engineering' },
  { title: 'Software Dev', href: '/services/software-development' },
  { title: 'Hardware', href: '/services/hardware-engineering' },
]

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/company/apromax-eng-llp/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/invites/contact/?igsh=1sl54ksi67lea&utm_content=vzay5wm', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
]

const FooterSection = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-20 pb-10 border-t border-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <div className="bg-white p-2 rounded-xl inline-block">
                <Image
                  src="/logo.png"
                  alt="AproMax Engineering"
                  width={140}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              An iso 9001-2015 certified company, AproMax Engineering is a multidisciplinary firm dedicated to delivering innovative, client-focused engineering solutions globally.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-blue-400 flex items-center gap-2 group transition-colors duration-200"
                  >
                    <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-blue-500 transition-colors" />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

           {/* Services */}
           <div>
            <h3 className="text-white font-semibold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {servicesLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-blue-400 flex items-center gap-2 group transition-colors duration-200"
                  >
                    <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-blue-500 transition-colors" />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>
                  57 Idgah Rd, Sijubari,<br />
                  Hatigaon, Guwahati,<br />
                  Assam 781038, India
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p>+91-9577291349 (India)</p>
                  <p>+1 (312) 313-9125 (US)</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <a href="mailto:info@apromaxeng.com" className="hover:text-blue-400 transition-colors">
                  info@apromaxeng.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} AproMax Engineering LLP. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection