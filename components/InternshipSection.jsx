'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Upload, Sparkles, Home, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { toast } from 'sonner'
import Link from 'next/link'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  domain: z.string().min(2, 'Domain of interest must be at least 2 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  cv: z.any()
    .refine((files) => files?.length === 1, 'Please upload your CV')
    .refine(
      (files) => files?.[0]?.type === 'application/pdf' || files?.[0]?.type === 'application/msword' || 
                files?.[0]?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Only PDF, DOC, or DOCX files are allowed'
    )
})

export default function InternshipSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      domain: '',
      message: '',
      cv: undefined
    }
  })

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)

      // Upload CV to Supabase storage
      const file = data.cv[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${fileName}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file)

      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)

      // Save form data to Supabase database
      const { error: dbError } = await supabase
        .from('internship_applications')
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          domain: data.domain,
          message: data.message,
          cv_url: uploadData.path 
        })

      if (dbError) throw new Error(`Database error: ${dbError.message}`)

      toast.success("Application submitted successfully! We'll get back to you soon.")

      form.reset()
    } catch (error) {
      console.error('Error submitting application:', error)
      toast.error(error.message || "Error submitting application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-40">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        </div>
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Internship Program
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
            <Link href="/careers" className="hover:text-white transition-colors font-medium">
              Careers
            </Link>
            <ChevronRight className="w-4 h-4 text-white/50" />
            <span className="text-white font-semibold">Internship</span>
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
              Start Your Career
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Internship Application
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Join our innovative team at AproMax Engineering and gain valuable experience in your field of interest.
              We're looking for passionate individuals eager to learn and contribute to cutting-edge engineering projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="pb-24 pt-4">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="mb-8 border-b border-gray-100 dark:border-gray-700 pb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Application Form
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Please fill out the form below to apply for an internship position
                </p>
              </div>
              
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
                      name="domain"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900 dark:text-gray-200 font-medium">Domain of Interest</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g. Software Development..." 
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
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 dark:text-gray-200 font-medium">Why are you interested in interning with us?</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your interests, what you hope to learn, and how you can contribute..."
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
                    name="cv"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 dark:text-gray-200 font-medium">Upload CV (PDF, DOC, or DOCX)</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-4">
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => {
                                onChange(e.target.files);
                              }}
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
                        Submitting Application...
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