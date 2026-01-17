'use client';
import { useRouter } from 'next/navigation';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Vapi from '@vapi-ai/web';
import { AssistantStatus } from '@/types/voice-assistant';
import { configureAssistant } from '@/lib/vapi-config';
import { Bot, X, RefreshCw, Volume2, VolumeX, Sparkles, PhoneCall } from 'lucide-react';


// Initial Statuses
const Status = {
  IDLE: 'IDLE',
  LISTENING: 'LISTENING', // Vapi is listening
  PROCESSING: 'PROCESSING', // Vapi is thinking
  SPEAKING: 'SPEAKING', // Vapi is talking
  CONNECTING: 'CONNECTING',
  ERROR: 'ERROR'
};

export const VoiceAssistant = ({ onBookingConfirmed }) => {
  const [vapi, setVapi] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState([]);
  
  const transcriptEndRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceDetails: '',
    date: '',
    time: ''
  });

  const router = useRouter();
  const vapiRef = useRef(null);
  const formOpenedRef = useRef(false);

  useEffect(() => {
    const vapiKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    if (!vapiKey) {
      console.error('NEXT_PUBLIC_VAPI_PUBLIC_KEY is not set');
      setStatus(Status.ERROR);
      return;
    }

    try {
      const vapi = new Vapi(vapiKey);
      vapiRef.current = vapi;

      vapi.on('call-start', () => {
        setStatus(Status.LISTENING);
        setMessages(prev => [...prev, { role: 'system', text: 'Call connected.', isFinal: true }]);
        formOpenedRef.current = false;
      });

      vapi.on('call-end', () => {
        setStatus(Status.IDLE);
        setMessages(prev => [...prev, { role: 'system', text: 'Call ended.', isFinal: true }]);
        formOpenedRef.current = false;
      });

      vapi.on('speech-start', () => {
        setStatus(Status.SPEAKING);
      });

      vapi.on('speech-end', () => {
        setStatus(Status.LISTENING); 
      });

      vapi.on('message', (message) => {
        // 1. Transcript Handling
        if (message.type === 'transcript' && message.role === 'user') {
          const transcript = message.transcript || message.transcriptType || '';
          const lowerTranscript = transcript.toLowerCase();
          
          setMessages(prev => {
             const lastMsg = prev[prev.length - 1];
             const isFinal = message.transcriptType === 'final';
             if (lastMsg && lastMsg.role === 'user' && !lastMsg.isFinal) {
                 const newHistory = [...prev];
                 newHistory[newHistory.length - 1] = { role: 'user', text: transcript, isFinal };
                 return newHistory;
             }
             return [...prev, { role: 'user', text: transcript, isFinal }];
          });

          const bookingKeywords = ['book', 'booking', 'appointment', 'schedule', 'consultation', 'meet', 'quote'];
          if (bookingKeywords.some(k => lowerTranscript.includes(k)) && !formOpenedRef.current) {
             console.log('Booking intent detected via keyword! Redirecting to /schedule-meeting');
             formOpenedRef.current = true;
             router.push('/schedule-meeting');
             
             // Instruct Vapi to speak
             vapiRef.current?.send({
               type: "add-message",
               message: {
                 role: "system",
                 content: "The user has been redirected to the schedule meeting page. Say exactly: 'I have opened the schedule meeting page. Please fill it out, and our team will contact you.'"
               }
             });
          }
        }
        
        // Assistant Transcripts
        if (message.type === 'transcript' && message.role === 'assistant') {
             setMessages(prev => {
                 const lastMsg = prev[prev.length - 1];
                 const isFinal = message.transcriptType === 'final';
                 if (lastMsg && lastMsg.role === 'assistant' && !lastMsg.isFinal) {
                     const newHistory = [...prev];
                     newHistory[newHistory.length - 1] = { role: 'assistant', text: message.transcript, isFinal };
                     return newHistory;
                 }
                 return [...prev, { role: 'assistant', text: message.transcript, isFinal }];
             });
        }

        // 2. Function Call Handling
        if (message.type === 'function-call' || (message.type === 'tool-calls' && message.toolCalls)) {
           const calls = message.toolCalls || (message.functionCall ? [message.functionCall] : []);
           
           calls.forEach(call => {
              const name = call.function?.name || call.name;
              const args = typeof (call.function?.arguments || call.arguments) === 'string' 
                            ? JSON.parse(call.function?.arguments || call.arguments) 
                            : (call.function?.arguments || call.arguments);

              if (name === 'bookAppointment' && !formOpenedRef.current) {
                 console.log('Booking function called! Redirecting to /schedule-meeting');
                 formOpenedRef.current = true;
                 router.push('/schedule-meeting');
                 
                 // Instruct Vapi to speak
                 vapiRef.current?.send({
                   type: "add-message",
                   message: {
                     role: "system",
                     content: "The user has been redirected to the schedule meeting page. Say exactly: 'I have opened the schedule meeting page. Please fill it out, and our team will contact you.'"
                   }
                 });
              }
              
              if (name === 'navigate_to_page') {
                  console.log('Navigating to:', args.path);
                  if (args.path) router.push(args.path);
              }
           });
        }
      });

      vapi.on('error', (e) => {
        console.error(e);
        setStatus(Status.ERROR);
      });

    } catch (err) {
      console.error(err);
    }
    
    return () => {
        vapiRef.current?.stop();
    };
  }, []); 

  const startSession = async () => {
    if (!vapiRef.current) return;
    try {
      setStatus(Status.CONNECTING);
      
      const assistantConfig = configureAssistant("female", "formal");

      const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID; 
      if (assistantId) {
          await vapiRef.current.start(assistantId, assistantConfig);
      } else {
           await vapiRef.current.start(assistantConfig);
      }

    } catch (err) {
      console.error(err);
      setStatus(Status.ERROR);
    }
  };

  const stopSession = () => {
    vapiRef.current?.stop();
  };

  const handleToggle = () => {
    if (isOpen) {
      stopSession();
      setIsOpen(false);
      setShowForm(false);
    } else {
      setIsOpen(true);
      startSession();
    }
  };
  
  const toggleMute = () => {
    if (!vapiRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    vapiRef.current.setMuted(newMuted);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Format the email body
    const subject = encodeURIComponent(`New Booking Request: ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Date: ${formData.date || 'Not selected'}\n` +
      `Time: ${formData.time || 'Not selected'}\n` +
      `Timezone: ${timezone}\n` + 
      `Details: ${formData.serviceDetails}\n\n` +
      `Submitted via Voice Assistant AI`
    );

    // Open email client
    window.open(`mailto:habibtanwir1906@gmail.com?subject=${subject}&body=${body}`, '_blank');
    
    setShowForm(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4 font-sans text-slate-100">
      {isOpen && (
        <div className="w-[350px] md:w-[450px] bg-slate-900/95 border border-blue-500/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 backdrop-blur-md">
          {/* Header */}
          <div className="p-4 border-b border-white/5 bg-slate-800/50 flex justify-between items-center backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center relative shadow-lg shadow-blue-500/20">
                {status === Status.SPEAKING && (
                  <div className="absolute -inset-1 border-2 border-blue-400 rounded-full animate-ping opacity-25"></div>
                )}
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-sm text-white">Apromax Assistant</h3>
                <span className={`text-[10px] uppercase tracking-widest font-bold flex items-center gap-1 ${
                  status === Status.LISTENING ? 'text-green-400' :
                  status === Status.SPEAKING ? 'text-blue-400' : 
                  status === Status.CONNECTING ? 'text-yellow-400' : 'text-slate-500'
                }`}>
                  {status === Status.LISTENING && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
                  {status}
                </span>
              </div>
            </div>
            <button onClick={handleToggle} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-slate-950/40 scrollbar-hide">
             {messages.length === 0 && !showForm && (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
                <div className="w-16 h-1 bg-blue-500/30 rounded-full animate-pulse"></div>
                <p className="text-slate-500 text-sm">"Connecting to Apromax Assistant..."</p>
              </div>
            )}
            
            {messages.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.role === 'user' ? 'items-end' : m.role === 'system' ? 'items-center' : 'items-start'}`}>
                {m.role !== 'system' && (
                    <span className="text-[10px] uppercase tracking-tighter text-slate-500 mb-1 px-2 font-bold">
                    {m.role === 'user' ? 'YOU' : 'ASSISTANT'}
                    </span>
                )}
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : m.role === 'system'
                  ? 'bg-transparent text-slate-500 text-xs italic'
                  : 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            
            {showForm && (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <form onSubmit={handleFormSubmit} className="space-y-3 p-4 bg-slate-800/90 border border-blue-500/30 rounded-2xl">
                     <h4 className="text-sm font-bold text-white">Booking Request</h4>
                     <input required placeholder="Name" className="w-full bg-slate-900/50 p-2 rounded text-sm border border-white/10 text-white"
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                     <input required placeholder="Email" className="w-full bg-slate-900/50 p-2 rounded text-sm border border-white/10 text-white"
                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                     
                     <div className="grid grid-cols-2 gap-2">
                        <select className="w-full bg-slate-900/50 p-2 rounded text-sm border border-white/10 text-slate-300"
                            value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})}>
                            <option value="">Select Time</option>
                            {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"].map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                        <input type="date" className="w-full bg-slate-900/50 p-2 rounded text-sm border border-white/10 text-slate-300"
                             value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                     </div>
                     <p className="text-[10px] text-slate-400 text-center">Times are in your local timezone ({Intl.DateTimeFormat().resolvedOptions().timeZone})</p>

                     <textarea required placeholder="Project Details" className="w-full bg-slate-900/50 p-2 rounded text-sm border border-white/10 h-16 text-white"
                        value={formData.serviceDetails} onChange={e => setFormData({...formData, serviceDetails: e.target.value})} />
                     <div className="flex gap-2">
                       <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-slate-700 py-2 rounded text-sm text-white hover:bg-slate-600 transition-colors">Cancel</button>
                       <button type="submit" className="flex-[2] bg-blue-600 py-2 rounded text-sm font-bold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">Submit via Email</button>
                     </div>
                 </form>
              </div>
            )}
            <div ref={transcriptEndRef} />
          </div>
          
           {/* Footer / Controls */}
           <div className="p-3 bg-slate-900 border-t border-white/5 flex justify-center backdrop-blur-md">
             <div className="flex items-center gap-3 w-full">
                <button 
                  onClick={toggleMute}
                  className={`flex-1 h-10 rounded-lg flex items-center justify-center gap-2 font-bold text-xs transition-all border ${
                    isMuted 
                    ? 'bg-red-500/10 text-red-500 border-red-500/30' 
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  {isMuted ? 'Unmute Mic' : 'Mute Mic'}
                </button>
                <button 
                  onClick={() => { stopSession(); startSession(); }}
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center border border-white/5 hover:border-white/20 hover:text-white text-slate-400 transition-all group"
                  title="Restart Session"
                >
                  <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                </button>
             </div>
           </div>
        </div>
      )}

      {!isOpen && (
        <button onClick={handleToggle} className="group relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl shadow-blue-500/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-white/10">
          <span className="absolute inset-0 rounded-full bg-white/10 animate-pulse"></span>
          <div className="relative z-10 flex items-center justify-center">
             <PhoneCall className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-300" />
          </div>
        </button>
      )}
    </div>
  );
};
