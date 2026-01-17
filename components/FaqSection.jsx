"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Wrench, 
  Phone, 
  Calendar, 
  Globe, 
  Briefcase, 
  ShieldCheck, 
  HelpCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Who is AproMax Engineering LLP?",
    answer: "AproMax Engineering LLP is a leading engineering firm that specializes in providing comprehensive solutions in civil, structural, environmental, electrical, mechanical, and electronics engineering. We also offer cutting-edge software development and hardware engineering services, focusing on delivering top-notch projects for clients in the US and beyond.",
    icon: <Building2 className="w-5 h-5 text-blue-600 shrink-0" />
  },
  {
    question: "What services do you offer?",
    answer: "We offer a wide range of engineering services including:\n\n• Civil & Structural Engineering\n• Mechanical Engineering\n• Electrical Engineering\n• Software Development\n• Hardware Engineering\n• Environmental Engineering\n• Project Management\n• Quality Assurance\n\nEach service is tailored to meet our clients' specific needs and industry standards.",
    icon: <Wrench className="w-5 h-5 text-blue-600 shrink-0" />
  },
  {
    question: "What industries do you serve?",
    answer: "We serve a diverse range of industries including Commercial Construction, Industrial Manufacturing, Consumer Electronics, Energy & Utilities, and Tech Startups. Our multidisciplinary approach allows us to adapt to the specific compliance and technical requirements of each sector.",
    icon: <Briefcase className="w-5 h-5 text-blue-600 shrink-0" />
  },
  {
    question: "How can I contact AproMax Engineering LLP?",
    answer: "You can reach us through multiple channels:\n\n• Email: info@apromaxeng.com\n• Phone: +91-9577291349 (India) / +1 (312) 313-9125 (US)\n• Visit our office: 57 Idgah Rd, Sijubari, Hatigaon, Guwahati, Assam 781038, India\n• Contact form on our website\n\nOur team typically responds within 24 business hours.",
    icon: <Phone className="w-5 h-5 text-blue-600 shrink-0" />
  },
  {
    question: "What are your business days?",
    answer: "Our business hours are:\n\n• Monday to Friday: 9:00 AM - 6:00 PM IST\n• Saturday: 9:00 AM - 1:00 PM IST\n• Sunday: Closed\n\nWe also accommodate different time zones for our international clients.",
    icon: <Calendar className="w-5 h-5 text-blue-600 shrink-0" />
  },
  {
    question: "Do you work on international projects?",
    answer: "Yes, we have extensive experience working on international projects. Our team has successfully delivered projects across multiple countries, particularly in the United States. We maintain clear communication channels and adapt to different time zones to ensure smooth project execution.",
    icon: <Globe className="w-5 h-5 text-blue-600 shrink-0" />
  },
  {
    question: "How do you ensure quality control?",
    answer: "Quality is at the core of our operations. We adhere to ISO 9001:2015 standards and implement rigorous quality assurance protocols at every stage of the project lifecycle. This includes regular audits, peer reviews, and comprehensive testing for both software and hardware deliverables.",
    icon: <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
  },
  {
    question: "Do you offer free consultations?",
    answer: "Yes, we offer an initial free consultation to understand your project requirements, scope, and feasibility. This session allows us to provide a preliminary roadmap and cost estimate before you commit to a full service agreement.",
    icon: <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
  },
];

export default function FAQSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-semibold mb-6">
            FAQ
          </span>
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base">
            Find answers to common questions about our services, processes, and how we work with clients locally and globally.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto mb-16">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="group border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 px-6 py-2 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 data-[state=open]:border-blue-500 data-[state=open]:bg-blue-50/30 dark:data-[state=open]:bg-blue-900/10 data-[state=open]:shadow-md"
              >
                <AccordionTrigger className="hover:no-underline py-5 text-left">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 group-data-[state=open]:bg-blue-100 dark:group-data-[state=open]:bg-blue-900/40 transition-colors">
                      {faq.icon}
                    </div>
                    <span className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-data-[state=open]:text-blue-700 dark:group-data-[state=open]:text-blue-300 transition-colors">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 whitespace-pre-line pb-6 pl-[4.5rem] pr-4 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
              Can't find the answer you're looking for? Please chat to our friendly team.
            </p>
            <Link href="/contact">
              <Button size="lg" className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/20 transition-all">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}