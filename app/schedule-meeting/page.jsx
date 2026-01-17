"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, User, Mail, MessageSquare, Video, Globe, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { format, addDays, isSameDay } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"
];

const meetingDurations = [
  { value: "30", label: "30 Min" },
  { value: "60", label: "1 Hour" },
  { value: "90", label: "1.5 Hrs" },
];

const meetingTypes = [
  { value: "consultation", label: "Consultation", icon: MessageSquare, desc: "Discuss request" },
  { value: "technical", label: "Tech Review", icon: CalendarIcon, desc: "Deep dive specs" },
  { value: "followup", label: "Follow-up", icon: Video, desc: "Project check-in" },
];

export default function ScheduleMeetingPage() {
  const router = useRouter();
  
  // State
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [duration, setDuration] = useState("60");
  const [meetingType, setMeetingType] = useState("consultation");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const maxDate = addDays(today, 60);
    return date < today || date > maxDate || date.getDay() === 0 || date.getDay() === 6; // Disable weekends
  };

  const handleSubmit = async () => {
    // Validation
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time slot.");
      return;
    }
    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email.");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Scheduling your meeting...");

    try {
      const dateString = selectedDate.toISOString().split('T')[0];

      // Simulate API call or Real API
      const response = await fetch('/api/calendar/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: dateString,
          time: selectedTime,
          duration,
          meetingType,
          formData,
          clientTimezone: timezone
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        toast.dismiss(loadingToast);
        toast.success("Meeting Confirmed!", { description: "Check your email for details." });
        // Dialog handles navigation now
      } else {
        throw new Error(result.error || "Failed to schedule");
      }
    } catch (error) {
      console.error(error);
      toast.dismiss(loadingToast);
      toast.error("Could not schedule meeting", { description: "Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-32 pb-20 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Strictly Professional */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-3"
          >
            Schedule a Consultation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-[#4a4a4a] text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Connect with our engineering team to discuss your project requirements.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Date & Time */}
          <motion.div 
             initial={{ opacity: 0, x: -10 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="lg:col-span-7 space-y-6"
          >
            {/* Calendar Card */}
            <div className="bg-white rounded-lg shadow-sm border border-[#e0e0e0] p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#f5f5f5]">
                <CalendarIcon className="w-5 h-5 text-[#0066FF]" />
                <h3 className="text-lg font-bold text-[#1a1a1a]">Select Date</h3>
              </div>
              
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => { setSelectedDate(date); setSelectedTime(""); }}
                  disabled={isDateDisabled}
                  className="rounded-md border border-[#e0e0e0] p-4"
                  classNames={{
                    day_selected: "bg-[#0066FF] text-white hover:bg-[#0066FF] focus:bg-[#0066FF] rounded-sm",
                    day_today: "bg-[#f5f5f5] text-[#1a1a1a] font-bold rounded-sm",
                    head_cell: "text-[#4a4a4a] font-semibold text-xs uppercase tracking-wider",
                    cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-[#f5f5f5] first:[&:has([aria-selected])]:rounded-l-sm last:[&:has([aria-selected])]:rounded-r-sm focus-within:relative focus-within:z-20",
                    day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 transition-colors hover:bg-[#f5f5f5] rounded-sm",
                  }}
                />
              </div>
            </div>

            {/* Time Slots Card */}
            <div className="bg-white rounded-lg shadow-sm border border-[#e0e0e0] p-6">
               <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-[#f5f5f5] gap-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#0066FF]" />
                    <h3 className="text-lg font-bold text-[#1a1a1a]">Select Time</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#4a4a4a] bg-[#f5f5f5] px-3 py-1.5 rounded-sm border border-[#e0e0e0]">
                    <Globe className="w-3.5 h-3.5" />
                    <span>{timezone}</span>
                  </div>
               </div>

               <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                 {timeSlots.map(time => (
                   <button
                     key={time}
                     onClick={() => setSelectedTime(time)}
                     className={cn(
                       "py-2 px-2 rounded-sm text-sm font-medium transition-all border",
                       selectedTime === time
                         ? "bg-[#0066FF] text-white border-[#0066FF]"
                         : "bg-white text-[#4a4a4a] border-[#e0e0e0] hover:border-[#0066FF] hover:text-[#0066FF]"
                     )}
                   >
                     {time}
                   </button>
                 ))}
               </div>
               {!selectedTime && (
                 <p className="text-center text-[#4a4a4a] text-sm mt-6 italic bg-[#f8f9fa] py-2 rounded-sm border border-dashed border-[#e0e0e0]">
                    Please select a preferred time slot above
                 </p>
               )}
            </div>
          </motion.div>


          {/* Right Column: Details & Submit */}
          <motion.div 
             initial={{ opacity: 0, x: 10 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
             className="lg:col-span-5 space-y-6"
          >
            <div className="bg-white rounded-lg shadow-sm border border-[#e0e0e0] p-6 sticky top-24">
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-6 pb-4 border-b border-[#f5f5f5]">Meeting Details</h3>
              
              <div className="space-y-5">
                
                {/* Duration & Type Grid */}
                <div className="grid grid-cols-1 gap-5">
                   <div>
                      <Label className="text-xs font-bold text-[#4a4a4a] uppercase tracking-wider mb-2 block">Duration</Label>
                      <div className="flex bg-[#f5f5f5] p-1 rounded-md border border-[#e0e0e0]">
                        {meetingDurations.map(dur => (
                          <button
                            key={dur.value}
                            onClick={() => setDuration(dur.value)}
                            className={cn(
                              "flex-1 py-1.5 rounded-sm text-sm font-medium transition-all",
                              duration === dur.value ? "bg-white text-[#0066FF] shadow-sm border border-[#e0e0e0]" : "text-[#4a4a4a] hover:text-[#1a1a1a]"
                            )}
                          >
                            {dur.label}
                          </button>
                        ))}
                      </div>
                   </div>

                   <div>
                      <Label className="text-xs font-bold text-[#4a4a4a] uppercase tracking-wider mb-2 block">Topic</Label>
                      <div className="grid grid-cols-1 gap-2">
                        {meetingTypes.map(type => {
                           const Icon = type.icon;
                           return (
                             <button
                               key={type.value}
                               onClick={() => setMeetingType(type.value)}
                               className={cn(
                                 "flex items-center p-3 rounded-md border transition-all text-left",
                                 meetingType === type.value 
                                   ? "border-[#0066FF] bg-blue-50/50" 
                                   : "border-[#e0e0e0] hover:border-[#b0b0b0]"
                               )}
                             >
                               <div className={cn(
                                 "w-8 h-8 rounded-sm flex items-center justify-center mr-3 transition-colors",
                                 meetingType === type.value ? "bg-[#0066FF] text-white" : "bg-[#f5f5f5] text-[#4a4a4a]"
                               )}>
                                 <Icon className="w-4 h-4" />
                               </div>
                               <div>
                                 <p className={cn("font-semibold text-sm", meetingType === type.value ? "text-[#0066FF]" : "text-[#1a1a1a]")}>{type.label}</p>
                                 <p className="text-xs text-[#4a4a4a]">{type.desc}</p>
                               </div>
                             </button>
                           );
                        })}
                      </div>
                   </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-[#f5f5f5]">
                   <div className="grid grid-cols-1 gap-4">
                     <div>
                       <Label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                         Full Name <span className="text-red-500">*</span>
                       </Label>
                       <Input 
                         placeholder="John Doe" 
                         className="h-10 rounded-md bg-white border-[#e0e0e0] focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] placeholder:text-[#9ca3af]"
                         value={formData.name}
                         onChange={(e) => handleInputChange("name", e.target.value)}
                       />
                     </div>
                     <div>
                       <Label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                         Business Email <span className="text-red-500">*</span>
                       </Label>
                       <Input 
                         placeholder="name@company.com" 
                         type="email"
                         className="h-10 rounded-md bg-white border-[#e0e0e0] focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] placeholder:text-[#9ca3af]"
                         value={formData.email}
                         onChange={(e) => handleInputChange("email", e.target.value)}
                       />
                     </div>
                     <div>
                       <Label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                         Phone (Optional)
                       </Label>
                       <Input 
                         placeholder="+1 (555) 000-0000" 
                         type="tel"
                         className="h-10 rounded-md bg-white border-[#e0e0e0] focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] placeholder:text-[#9ca3af]"
                         value={formData.phone}
                         onChange={(e) => handleInputChange("phone", e.target.value)}
                       />
                     </div>
                     <div>
                       <Label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                         Project Details
                       </Label>
                       <Textarea 
                         placeholder="Briefly describe your project or questions..." 
                         className="min-h-[100px] rounded-md bg-white border-[#e0e0e0] focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] placeholder:text-[#9ca3af] resize-none p-3"
                         value={formData.message}
                         onChange={(e) => handleInputChange("message", e.target.value)}
                       />
                     </div>
                   </div>
                </div>

                <Button 
                   onClick={handleSubmit}
                   disabled={isSubmitting}
                   className={cn(
                     "w-full h-11 rounded-md text-base font-bold shadow-sm transition-all",
                     selectedTime && formData.name && formData.email 
                       ? "bg-[#0066FF] hover:bg-[#0052CC] text-white" 
                       : "bg-[#e0e0e0] text-[#a0a0a0] cursor-not-allowed hover:bg-[#e0e0e0]"
                   )}
                >
                  {isSubmitting ? "Processing..." : "Confirm Booking"}
                </Button>
                
                <p className="text-[10px] text-center text-[#9ca3af] mt-2">
                  By booking, you agree to our Terms of Service.
                </p>

              </div>
            </div>
          </motion.div>

        </div>

        <AlertDialog open={isSuccess} onOpenChange={setIsSuccess}>
          <AlertDialogContent className="bg-white rounded-lg border border-[#e0e0e0]">
            <AlertDialogHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center border border-green-100">
                  <CheckCircle2 className="w-6 h-6 text-[#10b981]" />
                </div>
              </div>
              <AlertDialogTitle className="text-center text-xl font-bold text-[#1a1a1a]">Booking Confirmed</AlertDialogTitle>
              <AlertDialogDescription className="text-center text-[#4a4a4a]">
                Meeting link will be sent to your business email within 24 hrs.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="sm:justify-center">
              <AlertDialogAction 
                onClick={() => router.push("/")}
                className="bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-md px-8"
              >
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    </div>
  );
}