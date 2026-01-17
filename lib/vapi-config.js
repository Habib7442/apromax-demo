import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import servicesData from '@/constants/services';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Generate Knowledge Base from Services Data
const servicesKnowledge = servicesData.map((service, index) => {
  const subs = service.subServices?.map(s => `  - ${s.title}: ${s.description}`).join('\n') || "";
  return `${index + 1}. ${service.title} (URL: /services/${service.slug})\n   ${service.description}\n   OFFERINGS:\n${subs}`;
}).join('\n\n');

// Voice configuration
export const voices = {
  male: { casual: "2BJW5coyhAzSr8STdHbE", formal: "c6SfcYrb2t09NHXiT80T" },
  female: { casual: "ZIlrSGI4jZqobxRKprJz", formal: "sarah" },
};

export const configureAssistant = (voice = "female", style = "formal") => {
  const voiceId =
    voices[voice]?.[style] || "sarah";

  const vapiAssistant = {
    name: "Apromax Concierge",
    firstMessage: "Hello! Call connected to Apromax Assistant. I can help you with Engineering, Design, or Software services. How can I assist you?",
    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 1.0, 
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are the "Apromax AI Concierge", a highly knowledgeable assistant for Apromax Engineering.
  
                    YOUR KNOWLEDGE BASE (Services with URLs):
                    ${servicesKnowledge}

                    Guidelines:
                    - You explicitly represent Apromax's engineering/tech services.
                    - If asked about services, use the KNOWLEDGE BASE above to give accurate answers.
                    - When explaining services, ALWAYS follow the numeric order (1. Engineering, 2. Design, 3. Web/App, etc.).
                    - CRITICAL: When the user asks about a specific service (like Engineering, Web Dev, etc.), CALL the "navigate_to_page" function with its URL immediately to show it to them on screen.
                    - Example: If discussing Engineering, call navigate_to_page({ path: "/services/engineering-services" }).
                    - Greet clearly: "Call connected to Apromax Assistant".
                    - Goal: Answer technical questions, navigate users to relevant pages, and help users book appointments.
                    - Keep your responses short and concise, suitable for a real voice conversation.
                    - Do not include markdown or special characters that are hard to speak.
              `,
        },
      ],
      functions: [
        {
          name: "request_contact_form",
          description: "Displays a physical contact and booking form in the user interface. Call this whenever the user expresses interest in booking, getting a quote, or contacting Apromax.",
          parameters: {
            type: "object",
            properties: {
              reason: { type: "string", description: "The reason for the form (e.g., booking, quote)." }
            },
          },
        },
        {
          name: "navigate_to_page",
          description: "Navigates the user's browser to a specific page path. Use this to show services or details relevant to the conversation.",
          parameters: {
            type: "object",
            properties: {
              path: { type: "string", description: "The relative URL path to navigate to (e.g., /services/engineering-services)." }
            },
            required: ["path"]
          },
        },
        {
          name: "book_appointment",
          description: "Book a consultation or project meeting directly via voice if the user provides all details.",
          parameters: {
            type: "object",
            properties: {
              customerName: { type: "string", description: "Full name of the customer." },
              businessEmail: { type: "string", description: "Business email of the customer." },
              serviceType: { type: "string", description: "Type of engineering service requested." },
              contactNumber: { type: "string", description: "Phone number (optional)." },
              notes: { type: "string", description: "Any additional project details or notes." }
            },
            required: ["customerName", "businessEmail", "serviceType"]
          },
        }
      ]
    },
    clientMessages: ["tool-calls", "function-call", "transcript"],
  };
  
  return vapiAssistant;
};
