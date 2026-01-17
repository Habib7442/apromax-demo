'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Linkedin, Instagram, Clock, Home, ChevronRight, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import servicesData from '@/constants/services'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'

const contactInfo = {
  address: {
    line1: '57 Idgah Rd, Sijubari,',
    line2: 'Hatigaon, Guwahati',
    line3: 'Kamrup Metro, Assam 781038, India',
    mapLink: 'https://maps.google.com/?q=57+Idgah+Rd,+Sijubari,+Hatigaon,+Guwahati,+Assam+781038,+India'
  },
  phones: [
    { number: '+91-9577291349', flag: '🇮🇳', label: 'India Office', link: 'tel:+919577291349' },
    { number: '+1 (312) 313-9125', flag: '🇺🇸', label: 'US Office', link: 'tel:+13123139125' }
  ],
  email: 'info@apromaxeng.com',
  hours: [
    { days: 'Monday - Friday', time: '9:00 AM - 6:00 PM IST' },
    { days: 'Saturday', time: '9:00 AM - 1:00 PM IST' },
    { days: 'Sunday', time: 'Closed' }
  ],
  social: [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/apromax-eng-llp/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/invites/contact/?igsh=1sl54ksi67lea&utm_content=vzay5wm', label: 'Instagram' }
  ]
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyname: "",
    region: "",
    service: "",
    message: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('contacts')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          company: formData.companyname,
          region: formData.region,
          service: formData.service,
          message: formData.message,
        })

      if (error) throw error

      toast.success("Message sent successfully!")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        companyname: "",
        region: "",
        service: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Error sending message. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-60">
           <div className="absolute inset-0 bg-[url('/contact_page_bg.jpeg')] bg-cover bg-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Contact Us
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
            <span className="text-white font-semibold">Contact</span>
          </motion.div>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-16 pb-8 text-center">
        <div className="container mx-auto px-4">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
             className="max-w-2xl mx-auto"
           >
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Get in Touch</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                We'd love to hear from you. Reach out to us for any inquiries about our engineering services.
              </p>
           </motion.div>
        </div>
      </section>

      {/* Contact Information & Map */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Cards Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Address Card */}
              <motion.div
                 className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Visit Us</h3>
                    <a 
                      href={contactInfo.address.mapLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 leading-relaxed hover:text-blue-600 dark:hover:text-blue-400 transition-colors block"
                    >
                      {contactInfo.address.line1}<br />
                      {contactInfo.address.line2}<br />
                      {contactInfo.address.line3}
                      <span className="block mt-2 text-sm font-medium text-blue-600 flex items-center gap-1">Get Directions <ChevronRight className="w-3 h-3" /></span>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Phone Card */}
              <motion.div
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Call Us</h3>
                    {contactInfo.phones.map((phone, index) => (
                      <div key={index} className="mb-2 last:mb-0">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{phone.label}</p>
                        <a href={phone.link} className="text-gray-900 dark:text-gray-100 font-medium hover:text-blue-600 transition-colors">
                          {phone.number} {phone.flag}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Email Card */}
              <motion.div
                 className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Email Us</h3>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-gray-900 dark:text-gray-100 hover:text-blue-600 transition-colors font-medium block"
                    >
                      {contactInfo.email}
                    </a>
                    <p className="text-xs text-gray-500 mt-1">Response time: Within 24 hours</p>
                  </div>
                </div>
              </motion.div>

              {/* Business Hours */}
              <motion.div
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Business Hours</h3>
                    <div className="space-y-2">
                    {contactInfo.hours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center gap-4 text-sm">
                        <span className="text-gray-500 dark:text-gray-400">{schedule.days}</span>
                        <span className="text-gray-900 dark:text-gray-200 font-medium">{schedule.time}</span>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Social Links */}
              <div className="flex gap-4 pt-2">
                {contactInfo.social.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300 cursor-pointer shadow-sm"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 h-full min-h-[500px]"
            >
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl overflow-hidden shadow-sm h-full relative group">
                 <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                    <Image
                     src="/map.png"
                     alt="Our Location"
                     width={1200}
                     height={800}
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                   />
                    <div className="absolute inset-0 pointer-events-none border-[12px] border-white/50 dark:border-gray-800/50 rounded-3xl" />
                 </div>
                 {/* Map overlay card */}
                 <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" /> AproMax Engineering
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {contactInfo.address.line2}, {contactInfo.address.line3}
                    </p>
                    <a href={contactInfo.address.mapLink} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="w-full text-xs h-8 border-blue-200 text-blue-700 hover:bg-blue-50">
                        Get Directions
                      </Button>
                    </a>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NEW: Contact Form Section */}
      <section className="pb-24 bg-gray-50 dark:bg-gray-900/50 py-20 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Send Us a Message</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Have a question or want to start a project? Fill out the form below.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                  <Input
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="h-11 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                  <Input
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="h-11 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                  />
                </div>
              </div>

               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-11 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                  />
               </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">Company Name <span className="text-gray-400 font-normal ml-1">(Optional)</span></label>
                  <Input
                    name="companyname"
                    placeholder="Your Company"
                    value={formData.companyname}
                    onChange={handleInputChange}
                    className="h-11 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                  />
                </div>
                 <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">Region / Country</label>
                  <Select
                    value={formData.region}
                    onValueChange={(value) => handleSelectChange("region", value)}
                  >
                    <SelectTrigger className="h-11 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900">
                      <SelectItem value="na">North America</SelectItem>
                      <SelectItem value="eu">Europe</SelectItem>
                      <SelectItem value="asia">Asia</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">Service Interest</label>
                 <Select
                  value={formData.service}
                  onValueChange={(value) => handleSelectChange("service", value)}
                >
                  <SelectTrigger className="h-11 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-900">
                    {servicesData.map((service) => (
                      <SelectItem
                        key={service.id}
                        value={service.title.toLowerCase().replace(" ", "-")}
                      >
                        {service.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">Message</label>
                <Textarea
                  name="message"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 resize-y"
                />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[200px] h-12 text-base bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message <Send className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}