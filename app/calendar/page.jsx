'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CalendarDays, Video, Clock } from 'lucide-react'

export default function CalendarPage() {
  const calendarUrl = "https://calendar.google.com/calendar/embed?src=099aadb79d2e4a92782cbdcef467bf78e032babf57ab63de5b3cfc9b9bfe620d%40group.calendar.google.com&ctz=Asia%2FKolkata"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Company Calendar
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              View our availability and schedule a meeting with our team. All meetings include a Google Meet link for virtual collaboration.
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <h2 className="text-xl font-semibold flex items-center">
                <CalendarDays className="w-5 h-5 mr-2" />
                Schedule & Availability
              </h2>
            </div>
            <div className="h-[600px] w-full">
              <iframe
                src={calendarUrl}
                className="w-full h-full border-0"
                title="Company Calendar"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Video className="w-5 h-5 mr-2 text-blue-600" />
                Schedule a Meeting
              </h3>
              <p className="text-gray-600 mb-4">
                Book a meeting with our team directly through our scheduling system.
              </p>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                Schedule Now
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Meeting Details
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>All meetings include Google Meet link</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Calendar invite sent automatically</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Reminders sent before meetings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Timezone: Asia/Kolkata (IST)</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}