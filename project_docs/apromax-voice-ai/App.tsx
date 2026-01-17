
import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { VoiceAssistant } from './components/VoiceAssistant';
import { AppointmentDetails } from './types';

const App: React.FC = () => {
  const [bookingDetails, setBookingDetails] = useState<AppointmentDetails | null>(null);

  const handleBookingSuccess = (details: AppointmentDetails) => {
    setBookingDetails(details);
    
    // Construct WhatsApp message
    const message = `*New Lead for Apromax Engineering*%0A%0A*Name:* ${details.customerName}%0A*Email:* ${details.businessEmail}%0A*Service:* ${details.serviceType}%0A*Phone:* ${details.contactNumber || 'Not provided'}%0A*Notes:* ${details.notes || 'N/A'}`;
    const whatsappNumber = "919000000000"; // Replace with actual company owner number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]"></div>
      </div>

      <nav className="z-10 px-6 py-4 flex justify-between items-center bg-slate-900/50 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">A</div>
          <span className="font-orbitron text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            APROMAX<span className="text-blue-500">ENG</span>
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400 uppercase tracking-widest">
          <a href="#" className="hover:text-blue-400 transition-colors">Capability</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Sectors</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Facilities</a>
          <a href="#" className="hover:text-blue-400 transition-colors text-white">Contact</a>
        </div>
      </nav>

      <main className="z-10 flex-grow">
        <Hero />
        <ServicesSection />
      </main>

      <footer className="z-10 py-10 px-6 bg-slate-950/80 border-t border-white/5 text-center text-slate-500 text-sm">
        <p>© 2024 Apromax Engineering. All Rights Reserved. Precision in Motion.</p>
      </footer>

      {/* Persistent Voice Assistant */}
      <VoiceAssistant onBookingConfirmed={handleBookingSuccess} />

      {/* Success Modal Simulation */}
      {bookingDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">Details Sent!</h2>
            <p className="text-slate-400 text-center mb-6">
              Thank you, {bookingDetails.customerName}. Your inquiry has been sent to our team via WhatsApp.
            </p>
            <button 
              onClick={() => setBookingDetails(null)}
              className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
