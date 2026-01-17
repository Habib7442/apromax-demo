
export interface AppointmentDetails {
  customerName: string;
  businessEmail: string;
  serviceType: string;
  dateTime?: string;
  contactNumber?: string;
  notes?: string;
}

export enum AssistantStatus {
  IDLE = 'IDLE',
  CONNECTING = 'CONNECTING',
  LISTENING = 'LISTENING',
  SPEAKING = 'SPEAKING',
  ERROR = 'ERROR'
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TranscriptMessage {
  role: 'user' | 'assistant';
  text: string;
}
