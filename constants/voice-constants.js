import servicesData from './services';

const servicesSummary = servicesData.map(s => {
    const subs = s.subServices?.map(sub => `  - ${sub.title}: ${sub.description}`).join('\n') || "";
    return `- ${s.title}: ${s.description}\n${subs}`;
}).join('\n');

export const APROMAX_INFO = `
Apromax Engineering is a premier multi-disciplinary engineering and technology solutions provider.

OUR EXTENSIVE SERVICE OFFERINGS:
${servicesSummary}

Values: Precision, Reliability, Innovation.
Location: Based in a high-tech industrial hub.

AI Persona: You are the "Apromax AI Concierge". You are professional, highly knowledgeable about manufacturing, engineering, and digital solutions, and helpful. 
Goal: Answer technical questions about Apromax's capabilities and help users book appointments for project consultations.
`;

export const SERVICES = [
  {
    id: 'engineering',
    title: 'Engineering Services',
    description: 'Comprehensive multi-disciplinary engineering. Mechanical: machine design, DFM, & GD&T. Electrical: power systems, control panels, & PCB design. Civil: structural analysis, foundations, & steel structures. Electronics: embedded systems, IoT sensors, & firmware.',
    icon: 'Cog'
  },
  {
    id: 'design',
    title: 'Design Services',
    description: 'Transforming concepts into reality. CAD: precise 2D drafting & BOMs. 3D Modeling: photorealistic rendering & assembly checks. Product & Industrial Design: ergonomics, aesthetics, & enclosures. UX/UI: intuitive digital interfaces for web & mobile.',
    icon: 'Pen'
  },
  {
    id: 'webdev',
    title: 'Web And App Development',
    description: 'End-to-end digital solutions. Web: responsive high-performance sites & robust e-commerce platforms. Mobile: cross-platform (React Native/Flutter) & enterprise-grade custom applications. Full-stack development with modern frameworks.',
    icon: 'Globe'
  },
  {
    id: 'analysis',
    title: 'Analysis Services',
    description: 'Advanced simulation for validation & optimization. Structural: stress, strain, & safety factors. Thermal: heat distribution & cooling. FEA: vibration, fatigue, & impact analysis. CFD: aerodynamics, fluid flow, & pressure drop optimization.',
    icon: 'BarChart'
  },
  {
    id: 'development',
    title: 'Development Services',
    description: 'Product realization & software engineering. Prototyping: rapid MVPs & proof-of-concept. Product Testing: functional, usability, & compliance benchmarks. Custom Software: tailored algorithms, API integration, & process automation.',
    icon: 'Code'
  },
  {
    id: 'other',
    title: 'Other Services',
    description: 'Specialized forensic and value services. Reverse Engineering: 3D scanning & legacy part recreation. Value Engineering: cost reduction without quality loss. Failure Analysis: root cause investigation (RCA). IP Development: patent drawings & technical descriptions.',
    icon: 'Plus'
  }
];
