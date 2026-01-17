
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration } from '@google/genai';
import { APROMAX_INFO } from '../constants';
import { AssistantStatus, AppointmentDetails, TranscriptMessage } from '../types';
import { encodeBase64, decodeBase64, decodeAudioData, floatTo16BitPCM } from '../services/audioUtils';

interface VoiceAssistantProps {
  onBookingConfirmed: (details: AppointmentDetails) => void;
}

// Function to trigger the visual form
const requestContactFormFn: FunctionDeclaration = {
  name: 'request_contact_form',
  parameters: {
    type: Type.OBJECT,
    description: 'Displays a physical contact and booking form in the user interface for them to fill out manually.',
    properties: {
      reason: { type: Type.STRING, description: 'The reason the form is being shown (e.g., booking, consultation, inquiry).' }
    },
    required: ['reason']
  }
};

// Original booking function (can still be used for direct voice booking if model prefers)
const bookAppointmentFn: FunctionDeclaration = {
  name: 'book_appointment',
  parameters: {
    type: Type.OBJECT,
    description: 'Book a consultation or project meeting directly via voice.',
    properties: {
      customerName: { type: Type.STRING, description: 'Full name of the customer.' },
      businessEmail: { type: Type.STRING, description: 'Business email of the customer.' },
      serviceType: { type: Type.STRING, description: 'Type of engineering service requested.' },
      contactNumber: { type: Type.STRING, description: 'Phone number (optional).' },
      notes: { type: Type.STRING, description: 'Any additional project details or notes.' }
    },
    required: ['customerName', 'businessEmail', 'serviceType']
  }
};

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onBookingConfirmed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<AssistantStatus>(AssistantStatus.IDLE);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<TranscriptMessage[]>([]);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceDetails: ''
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const outAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, showForm]);

  const cleanup = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (sessionRef.current) {
      sessionRef.current = null;
    }
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    setStatus(AssistantStatus.IDLE);
  }, []);

  const handleToggle = async () => {
    if (isOpen) {
      cleanup();
      setIsOpen(false);
      setShowForm(false);
    } else {
      setIsOpen(true);
      await startAssistant();
    }
  };

  const startAssistant = async () => {
    try {
      setStatus(AssistantStatus.CONNECTING);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      }
      if (!outAudioContextRef.current) {
        outAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setStatus(AssistantStatus.LISTENING);
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const processor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            processor.onaudioprocess = (e) => {
              if (isMuted) return;
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmData = floatTo16BitPCM(inputData);
              const base64 = encodeBase64(pcmData);
              sessionPromise.then(session => {
                session.sendRealtimeInput({
                  media: { data: base64, mimeType: 'audio/pcm;rate=16000' }
                });
              });
            };
            source.connect(processor);
            processor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            // Handle Transcription (Separate roles as requested)
            if (msg.serverContent?.outputTranscription) {
              const text = msg.serverContent.outputTranscription.text;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant') {
                  return [...prev.slice(0, -1), { role: 'assistant', text: last.text + text }];
                }
                return [...prev, { role: 'assistant', text }];
              });
            }
            if (msg.serverContent?.inputTranscription) {
              const text = msg.serverContent.inputTranscription.text;
               setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'user') {
                  return [...prev.slice(0, -1), { role: 'user', text: last.text + text }];
                }
                return [...prev, { role: 'user', text }];
              });
            }

            // Handle Audio output
            const audioData = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && outAudioContextRef.current) {
              setStatus(AssistantStatus.SPEAKING);
              const bytes = decodeBase64(audioData);
              const buffer = await decodeAudioData(bytes, outAudioContextRef.current, 24000, 1);
              const source = outAudioContextRef.current.createBufferSource();
              source.buffer = buffer;
              source.connect(outAudioContextRef.current.destination);
              const startAt = Math.max(nextStartTimeRef.current, outAudioContextRef.current.currentTime);
              source.start(startAt);
              nextStartTimeRef.current = startAt + buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setStatus(AssistantStatus.LISTENING);
              };
            }

            // Handle Tool Calls
            if (msg.toolCall) {
              for (const fc of msg.toolCall.functionCalls) {
                if (fc.name === 'request_contact_form') {
                  // Trigger Form Automatically
                  setShowForm(true);
                  sessionPromise.then(session => {
                    session.sendToolResponse({
                      functionResponses: {
                        id: fc.id,
                        name: fc.name,
                        response: { result: "Form is now displayed to the user." }
                      }
                    });
                  });
                } else if (fc.name === 'book_appointment') {
                  const details = fc.args as AppointmentDetails;
                  onBookingConfirmed(details);
                  sessionPromise.then(session => {
                    session.sendToolResponse({
                      functionResponses: {
                        id: fc.id,
                        name: fc.name,
                        response: { result: "Booking successful via voice. WhatsApp triggered." }
                      }
                    });
                  });
                }
              }
            }
            if (msg.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (err) => { setStatus(AssistantStatus.ERROR); },
          onclose: () => { setStatus(AssistantStatus.IDLE); }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: APROMAX_INFO + "\n\nCRITICAL: When the user wants to book, start a consultation, or get a quote, IMMEDIATELY call the 'request_contact_form' tool to show the physical booking form. Only ask for details via voice if the user explicitly prefers it or is unable to use the form.",
          tools: [{ functionDeclarations: [requestContactFormFn, bookAppointmentFn] }],
          outputAudioTranscription: {},
          inputAudioTranscription: {}
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      setStatus(AssistantStatus.ERROR);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const details: AppointmentDetails = {
      customerName: formData.name,
      businessEmail: formData.email,
      contactNumber: formData.phone,
      serviceType: formData.serviceDetails,
      notes: "Submitted via Integrated UI Form"
    };
    onBookingConfirmed(details);
    setShowForm(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      {/* Assistant Window */}
      {isOpen && (
        <div className="w-[350px] md:w-[450px] bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="p-6 border-b border-white/5 bg-slate-800/50 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center relative shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                {status === AssistantStatus.SPEAKING && (
                  <div className="absolute -inset-1 border-2 border-blue-400 rounded-full animate-ping opacity-25"></div>
                )}
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h3 className="font-bold text-sm">Apromax AI Concierge</h3>
                <span className={`text-[10px] uppercase tracking-widest font-bold ${
                  status === AssistantStatus.LISTENING ? 'text-green-400' :
                  status === AssistantStatus.SPEAKING ? 'text-blue-400' : 'text-slate-500'
                }`}>
                  {status}
                </span>
              </div>
            </div>
            <button 
              onClick={handleToggle}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors text-slate-400"
            >
              ✕
            </button>
          </div>

          <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-slate-950/20 scrollbar-hide">
            {messages.length === 0 && !showForm && (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
                <div className="w-12 h-1 bg-blue-500/30 rounded-full animate-pulse"></div>
                <p className="text-slate-500 text-sm">
                  "Listening for your manufacturing requirements..."
                </p>
              </div>
            )}
            
            {messages.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <span className="text-[10px] uppercase tracking-tighter text-slate-500 mb-1 px-2 font-bold">
                  {m.role === 'user' ? 'YOU' : 'ASSISTANT'}
                </span>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-lg' 
                  : 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5 shadow-md'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}

            {showForm && (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                 <div className="flex flex-col items-start mb-1">
                    <span className="text-[10px] uppercase tracking-tighter text-blue-400 mb-1 px-2 font-bold">SYSTEM ACTION</span>
                 </div>
                 <form onSubmit={handleFormSubmit} className="space-y-4 p-5 bg-slate-800/80 border border-blue-500/30 rounded-2xl shadow-xl backdrop-blur-md">
                  <h4 className="text-md font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Booking & Consultation Form
                  </h4>
                  <div className="grid gap-3">
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-blue-500 outline-none transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">Business Email</label>
                      <input 
                        required 
                        type="email" 
                        placeholder="john@company.com"
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-blue-500 outline-none transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">Phone (Optional)</label>
                      <input 
                        type="tel" 
                        placeholder="+1 234 567 890"
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-blue-500 outline-none transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">Service Details</label>
                      <textarea 
                        required 
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-blue-500 outline-none h-20 resize-none transition-all"
                        placeholder="Describe your project (e.g. 5-axis CNC machining)..."
                        value={formData.serviceDetails}
                        onChange={(e) => setFormData({...formData, serviceDetails: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button 
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-grow bg-slate-700 hover:bg-slate-600 py-3 rounded-xl font-bold transition-all text-xs"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-[2] bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 text-xs text-white"
                    >
                      Submit to WhatsApp
                    </button>
                  </div>
                </form>
              </div>
            )}
            <div ref={transcriptEndRef} />
          </div>

          <div className="p-4 bg-slate-900 border-t border-white/5">
             <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className={`flex-grow h-12 rounded-xl flex items-center justify-center gap-2 font-bold transition-all border ${
                    isMuted 
                    ? 'bg-red-500/10 text-red-500 border-red-500/30' 
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {isMuted ? '🎙️ Unmute Mic' : '🎤 Mute Mic'}
                </button>
                <button 
                  onClick={cleanup}
                  className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all border border-white/5"
                  title="Restart Session"
                >
                  <span className="rotate-0 hover:rotate-180 transition-transform duration-500">🔄</span>
                </button>
             </div>
             <div className="flex justify-between items-center px-1 mt-3">
               <div className="flex items-center gap-1.5">
                 <div className={`w-1.5 h-1.5 rounded-full ${status === AssistantStatus.LISTENING ? 'bg-green-500 animate-pulse' : 'bg-slate-700'}`}></div>
                 <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Apromax Secure Live Link</span>
               </div>
               <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">v2.5 FLASH</span>
             </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      {!isOpen && (
        <button 
          onClick={handleToggle}
          className="group relative w-20 h-20 rounded-full bg-blue-600 shadow-[0_0_40px_rgba(37,99,235,0.4)] flex items-center justify-center text-3xl hover:scale-110 active:scale-95 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="relative z-10 group-hover:rotate-12 transition-transform">🤖</span>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
          </div>
          <div className="absolute bottom-0 w-full h-1 bg-white/20"></div>
        </button>
      )}
    </div>
  );
};
