'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MapPin, Phone, Mail, Clock, Globe } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import servicesData from '@/constants/services'
import { toast } from 'sonner'
import Link from 'next/link'

export default function ContactUsSection() {
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
          company: formData.companyname, // mapping companyname to company column
          region: formData.region,
          service: formData.service,
          message: formData.message
        })

      if (error) throw error

      toast.success("Message sent successfully!")

      // Reset form
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
    <div className="w-full pb-20">
      <div className="text-center mb-16">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-semibold mb-6">
          Contact Us
        </span>
        <h2 className="text-2xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          Get in Touch
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base max-w-2xl mx-auto">
          We'd love to hear from you. Please fill out the form below or reach out to us directly.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Contact Info Sidebar - Card Style */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 h-full">
            <h3 className="text-xl font-bold mb-8 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">
              Contact Information
            </h3>
            
            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">Email</p>
                  <a href="mailto:info@apromaxeng.com" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors text-sm break-all">
                    info@apromaxeng.com
                  </a>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">Phone</p>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium text-gray-400 text-xs uppercase mr-2">India:</span>
                      <a href="tel:+919577291349" className="hover:text-blue-600 transition-colors">+91-9577291349</a>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium text-gray-400 text-xs uppercase mr-2">USA:</span>
                      <a href="tel:+13123139125" className="hover:text-blue-600 transition-colors">+1 (312) 313-9125</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">Office</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    57 Idgah Rd, Sijubari, Hatigaon, Guwahati, Assam 781038, India
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">Office Hours</p>
                  <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <p>Mon - Fri: 9:00 AM - 6:00 PM IST</p>
                    <p>Sat: 9:00 AM - 2:00 PM IST</p>
                    <p>Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">First Name</label>
                  <Input
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="h-11 px-4 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg text-base"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">Last Name</label>
                  <Input
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="h-11 px-4 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg text-base"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">Email Address</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-11 px-4 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg text-base"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Company Name <span className="text-gray-400 font-normal ml-1">(Optional)</span>
                  </label>
                  <Input
                    name="companyname"
                    placeholder="Your Company"
                    value={formData.companyname}
                    onChange={handleInputChange}
                    className="h-11 px-4 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg text-base"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    Region / Country
                  </label>
                  <Select
                    value={formData.region}
                    onValueChange={(value) => handleSelectChange("region", value)}
                  >
                    <SelectTrigger className="h-11 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded-lg text-base focus:ring-blue-500">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800">
                      <SelectItem value="na">North America</SelectItem>
                      <SelectItem value="eu">Europe</SelectItem>
                      <SelectItem value="asia">Asia</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">Service Interest</label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => handleSelectChange("service", value)}
                >
                  <SelectTrigger className="h-11 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded-lg text-base focus:ring-blue-500">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800">
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

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">Message</label>
                <Textarea
                  name="message"
                  placeholder="Tell us about your project requirements..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-4 resize-y text-base min-h-[140px]"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 mt-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message <Send className="w-4 h-4 ml-1" />
                  </span>
                )}
              </Button>
              
              <p className="text-center text-xs text-gray-500 mt-4">
                By submitting this form, you agree to our <Link href="/privacy" className="underline hover:text-blue-600">Privacy Policy</Link>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}