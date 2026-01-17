'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Briefcase, Users, Award, Rocket, Upload, Sparkles, Home, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import Link from 'next/link'

// Animation variants for container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Animation variants for individual items
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const positions = [
  'Senior Mechanical Engineer',
  'Electrical Systems Designer',
  'Software Developer',
  'Project Manager',
]

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  position: z.string().min(1, 'Please select a position'),
  experience: z.string()
    .refine(
      (value) => !isNaN(value) && Number(value) >= 0 && Number(value) <= 99,
      'Experience must be between 0 and 99 years'
    ),
  message: z.string().min(50, 'Message must be at least 50 characters'),
  resume: z.any()
    .refine((files) => files?.length === 1, 'Please upload your resume')
    .refine(
      (files) => files?.[0]?.type === 'application/pdf',
      'Only PDF files are allowed'
    )
})

export default function CareerSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      message: '',
      resume: undefined
    }
  })

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)

      // Upload resume to Supabase storage
      const file = data.resume[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `careers/${fileName}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file)

      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)

      // Save form data to Supabase database
      const { error: dbError } = await supabase
        .from('job_applications') // Using job_applications table
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          position: data.position,
          experience: data.experience.toString(),
          message: data.message,
          resume_url: uploadData.path,
          // type: 'job'
        })

      if (dbError) throw new Error(`Database error: ${dbError.message}`)

      toast.success("Application submitted successfully!")

      form.reset()
    } catch (error) {
      console.error('Error submitting application:', error)
      toast.error(error.message || "Error submitting application")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-40">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        </div>
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Careers
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
            <span className="text-white font-semibold">Careers</span>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 text-center bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-600 dark:text-blue-400 font-bold tracking-wider text-sm uppercase mb-4 block">
              Join Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Build the Future with Us
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
              At AproMax Engineering, we're looking for talented individuals to join our innovative team. 
              If you're passionate about engineering, we'd love to hear from you!
            </p>
            
            <Link href="/internship">
              <Button className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-base shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 transition-all">
                 <Sparkles className="w-4 h-4 mr-2" /> Apply for an Internship
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Users,
                title: 'Collaborative Culture',
                description: 'Work with talented professionals in a supportive environment',
              },
              {
                icon: Award,
                title: 'Growth Opportunities',
                description: 'Continuous learning and career advancement paths',
              },
              {
                icon: Rocket,
                title: 'Innovation Focus',
                description: 'Work on cutting-edge engineering projects',
              },
              {
                icon: Briefcase,
                title: 'Great Benefits',
                description: 'Competitive salary and comprehensive benefits package',
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                viewport={{ once: true }}
              >
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900 hover:-translate-y-2 transition-all duration-300 h-full group">
                  <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <benefit.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Apply Now</h2>
               <p className="text-gray-600 dark:text-gray-400">Ready to start your journey? Fill out the form below.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-900 dark:text-gray-200 font-medium">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John Doe" 
                                {...field}
                                className="h-11 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-900 dark:text-gray-200 font-medium">Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="john@example.com" 
                                {...field}
                                className="h-11 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-900 dark:text-gray-200 font-medium">Phone Number</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="+1234567890" 
                                {...field}
                                className="h-11 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-900 dark:text-gray-200 font-medium">Years of Experience</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="0" 
                                max="99" 
                                {...field}
                                className="h-11 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900 dark:text-gray-200 font-medium">Position</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                                <SelectValue placeholder="Select a position" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                              {positions.map((position) => (
                                <SelectItem 
                                  key={position} 
                                  value={position}
                                  className="focus:bg-gray-100 dark:focus:bg-gray-800 cursor-pointer"
                                >
                                  {position}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900 dark:text-gray-200 font-medium">Why do you want to join our team?</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your motivation..."
                              className="min-h-[150px] bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white resize-y"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="resume"
                      render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900 dark:text-gray-200 font-medium">Upload Resume (PDF only)</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-4">
                              <Input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => onChange(e.target.files)}
                                className="h-11 pt-2 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white file:bg-gray-200 dark:file:bg-gray-800 file:border-0 file:rounded-md file:mr-4 file:px-4 file:text-sm hover:file:bg-gray-300 transition-colors cursor-pointer"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-base font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </Button>
                  </form>
                </Form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}