const servicesData = [
  {
    id: 1,
    title: "Engineering Services",
    slug: "engineering-services",
    description: "Comprehensive engineering solutions across multiple disciplines.",
    services: [
      "Mechanical Engineering",
      "Electrical Engineering",
      "Civil Engineering",
      "Electronics Engineering",
    ],
    subServices: [
        {
            title: "Mechanical Engineering",
            slug: "mechanical-engineering",
            description: "From conceptual design to manufacturing documentation, we deliver robust mechanical solutions optimized for performance and manufacturability.",
            longDescription: "Our Mechanical Engineering services cover the entire product lifecycle. We specialize in designing complex machinery, consumer products, and industrial equipment. Using advanced CAD tools and simulation software, we ensure every component is engineered for reliability, efficiency, and cost-effectiveness.",
            features: [
                "3D CAD Modeling & Detailed Engineering",
                "Finite Element Analysis (FEA) & CFD",
                "Design for Manufacturing (DFM) & Assembly (DFA)",
                "Prototyping & Rapid Manufacturing",
                "Geometric Dimensioning and Tolerancing (GD&T)"
            ],
            benefits: [
                "Reduced time-to-market with virtual validation",
                "Lower manufacturing costs through DFM optimization",
                "Enhanced product durability and performance",
                "Seamless integration with electrical and control systems"
            ],
            image: "/engineering-services/mechanical.jpeg"
        },
        {
            title: "Electrical Engineering",
            slug: "electrical-engineering",
            description: "Expert design of electrical systems, power distribution, and control panels for industrial and commercial applications.",
            longDescription: "We provide comprehensive Electrical Engineering services ranging from low-voltage circuit design to high-voltage power distribution systems. Our team ensures compliance with international standards (IEC, NEC) and focuses on safety, efficiency, and reliability in every design.",
            features: [
                "Power Distribution System Design",
                "Control Panel Layout & Schematics",
                "Lighting & Earthing System Design",
                "Load Flow & Short Circuit Analysis",
                "PCB Design & Layout"
            ],
            benefits: [
                "Optimized power consumption and efficiency",
                "Compliance with rigorous safety standards",
                "Scalable designs for future expansion",
                "Reliable operation in harsh environments"
            ],
            image: "/engineering-services/electrical.jpeg"
        },
        {
            title: "Civil Engineering",
            slug: "civil-engineering",
            description: "Structural analysis and infrastructure design services ensuring stability and longevity of built environments.",
            longDescription: "Our Civil Engineering division focuses on the structural integrity and sustainability of your projects. Whether it's industrial foundations, steel structures, or commercial buildings, we apply advanced analysis techniques to ensure safety and code compliance.",
            features: [
                "Structural Steel & RCC Design",
                "Foundation Load Analysis",
                "Seismic & Wind Load Analysis",
                "Retrofitting & Rehabilitation Strategies",
                "Site Development Plans"
            ],
            benefits: [
                "Structurally sound and safe designs",
                "Cost-effective material utilization",
                "Compliance with local and international building codes",
                "Long-term durability of infrastructure"
            ],
            image: "/engineering-services/civil.png"
        },
        {
            title: "Electronics Engineering",
            slug: "electronics-engineering",
            description: "Advanced embedded systems and circuit design for modern electronic devices.",
            longDescription: "We design and develop cutting-edge electronic systems, from microcontrollers to complex IoT devices. Our expertise includes analog and digital circuit design, firmware development, and sensor integration.",
            features: [
                "Embedded System Design",
                "IoT Sensor Integration",
                "Firmware Development",
                "Signal Processing",
                "Wireless Communication Systems"
            ],
            benefits: [
                "Compact and energy-efficient designs",
                "Seamless connectivity for IoT applications",
                "High reliability and noise immunity",
                "Rapid prototyping and testing"
            ],
            image: "/engineering-services/electronics.png"
        }
    ],
    image: "/engineering-services/mechanical.jpeg",
    icon: "Cog",
    details:
      "Our engineering services encompass a wide range of disciplines, ensuring that all aspects of a project are addressed with precision and expertise. From Mechanical Engineering, which focuses on designing and manufacturing complex machinery, to Electrical Engineering, which deals with power systems and electronics, we have you covered. Our Civil Engineering team specializes in infrastructure development, including buildings, roads, and bridges, while our Electronics Engineering experts create advanced systems for various applications. Additionally, we provide Control Systems Engineering for automation, Plant Engineering for industrial facilities, Automotive Engineering for vehicle systems, Energy and Utilities Engineering for sustainable solutions, and Industrial Equipment Engineering for optimizing production processes. Each of these services is tailored to meet the unique requirements of our clients, delivering innovative solutions that drive success.",
  },
  {
    id: 2,
    title: "Design Services",
    slug: "design-services",
    description: "Professional design services for various industries.",
    services: [
      "CAD Design",
      "3D Modeling",
      "Product Design",
      "Industrial Design",
      "UX/UI Design",
    ],
    subServices: [
        {
            title: "CAD Design",
            slug: "cad-design",
            description: "Precise 2D drafting and documentation for manufacturing and construction.",
            image: "/design-services/cad_design.jpeg",
            features: ["2D Drafting", "GD&T Application", "Bill of Materials (BOM)", "As-Built Documentation"],
            benefits: ["Accurate manufacturing documentation", "Standardized drawings", "Reduced errors"]
        },
        {
            title: "3D Modeling",
            slug: "3d-modeling",
            description: "High-fidelity 3D models for visualization, simulation, and prototyping.",
            image: "/design-services/3d_modelling.jpeg",
            features: ["Parametric Modeling", "Surface Modeling", "Assembly Modeling", "Rendering"],
            benefits: ["Enhanced visualization", "Virtual assembly checks", "Marketing assets"]
        },
        {
            title: "Product Design",
            slug: "product-design",
            description: "Innovative product development from concept to shelf.",
            image: "/design-services/product_design.jpeg",
            features: ["Concept Generation", "Ergonomics Study", "CMF (Color, Material, Finish)", "Prototyping"],
            benefits: ["User-centric designs", "Market differentiation", "Functional innovation"]
        },
        {
            title: "Industrial Design",
            slug: "industrial-design",
            description: "Optimizing the form and function of industrial products.",
            image: "/design-services/industrial_design.jpeg",
            features: ["Aesthetic Styling", "User Experience (Hardware)", "Enclosure Design", "Human Factors"],
            benefits: ["Improved usability", "Brand identity alignment", "Emotional connection"]
        },
        
    ],
    image: "/design-services/industrial_design.jpeg",
    icon: "Pen",
    details:
      "Our design services are crafted to blend aesthetics with functionality, ensuring that your projects stand out while meeting their intended purpose. CAD Design provides precise technical drawings and plans for your projects, while 3D Modeling brings concepts to life with realistic visualizations. Product Design focuses on creating innovative and user-friendly products, and Industrial Design enhances the form and function of equipment and systems. Our UX/UI Design services improve user interactions, creating intuitive and engaging digital experiences. Whether you need detailed plans, cutting-edge visualizations, or seamless interfaces, our design team is equipped to deliver excellence in every project.",
  },
  {
    id: 3,
    title: "Web And App Development",
    slug: "web-and-app-development",
    description:
      "End-to-end development solutions for web and mobile platforms.",
    services: [
      "Website Design",
      "Website Development",
      "Responsive Web Design",
      "Ecommerce Website Development",
      "Mobile App Development",
      "Cross-platform App Development (React Native, Flutter)",
      "Enterprise App Development",
      "Custom App Development",
    ],
    subServices: [
        { title: "Website Design", slug: "website-design", description: "Design services for web.", image: "/webdev-services/1.jpg"},
        { title: "Website Development", slug: "website-development", description: "Full stack development.", image: "/webdev-services/2.jpg"},
    ],
    image: "/webdev-services/1.jpg",
    icon: "Globe",
    details:
      "Our web and app development services provide comprehensive solutions for businesses aiming to establish a strong digital presence. We specialize in Website Design and Development, creating visually appealing and fully functional sites tailored to your needs. Responsive Web Design ensures optimal performance across devices, while Ecommerce Website Development facilitates seamless online transactions. For mobile platforms, our expertise includes Mobile App Development and Cross-platform App Development using technologies like React Native and Flutter, ensuring versatility and efficiency. We also offer Enterprise App Development for large-scale businesses and Custom App Development to meet unique requirements. With a focus on innovation and user experience, our solutions empower businesses to thrive in the digital era.",
  },
  {
    id: 4,
    title: "Analysis Services",
    slug: "analysis-services",
    description: "Advanced analysis and simulation services.",
    services: [
      "Structural Analysis",
      "Thermal Analysis",
      "Finite Element Analysis (FEA)",
      "Computational Fluid Dynamics (CFD)",
    ],
    subServices: [
        { 
            title: "Structural Analysis", 
            slug: "structural-analysis", 
            description: "Evaluating structural integrity and safety under load conditions.", 
            image: "/analysis-services/structural_analysis.jpeg",
            features: ["Stress & Stain Analysis", "Load Capacity Calculation", "Safety Factor Determination"],
            benefits: ["Ensured structural safety", "Optimized material usage"]
        },
        { 
            title: "Thermal Analysis", 
            slug: "thermal-analysis", 
            description: "Simulating heat transfer and thermal management systems.", 
            image: "/analysis-services/thermal_analysis.jpeg",
            features: ["Heat Distribution Mapping", "Cooling System Optimization", "Thermal Stress Analysis"],
            benefits: ["Improved thermal management", "Prevention of overheating"]
        },
        {
            title: "Finite Element Analysis (FEA)",
            slug: "finite-element-analysis",
            description: "Advanced simulation of physical phenomena to predict product behavior.",
            image: "/analysis-services/fea_analysis.jpeg",
            features: ["Vibration Analysis", "Fatigue Life Prediction", "Impact Simulation", "Non-linear Analysis"],
            benefits: ["Virtual prototyping", "Failure prediction", "Cost reduction"]
        },
        {
            title: "Computational Fluid Dynamics (CFD)",
            slug: "computational-fluid-dynamics",
            description: "Analyzing fluid flow, heat transfer, and related phenomena.",
            image: "/analysis-services/cfd_analysis.jpeg",
            features: ["Aerodynamics simulation", "Flow optimization", "Turbulence modeling", "Pressure drop analysis"],
            benefits: ["Optimized flow efficiency", "Drag reduction", "Enhanced mixing performance"]
        }
    ],
    image: "/analysis-services/structural_analysis.jpeg",
    icon: "BarChart",
    details:
      "Our analysis services utilize state-of-the-art tools and methodologies to deliver accurate insights and reliable simulations. Structural Analysis evaluates the strength and stability of structures, ensuring safety and performance. Thermal Analysis examines heat transfer and temperature effects to optimize designs. Finite Element Analysis (FEA) offers detailed simulations of complex systems, identifying potential issues before they arise. Computational Fluid Dynamics (CFD) provides an in-depth understanding of fluid behavior, enabling the design of efficient systems. These advanced services support innovation and quality, helping clients achieve their goals with precision and confidence.",
  },
  {
    id: 5,
    title: "Development Services",
    slug: "development-services",
    description: "Comprehensive development and testing solutions.",
    services: [
      "Prototype Development",
      "Product Testing",
      "Custom Software Development",
      "Programming Languages (Python, Java, JavaScript, C++)",
    ],
    subServices: [
        { 
            title: "Prototype Development", 
            slug: "prototype-development", 
            description: "Rapid prototyping to visualize and test concepts early.", 
            image: "/development-services/prototype_development.jpeg",
            features: ["Proof of Concept", "MVP Development", "Iterative Testing"],
            benefits: ["Faster feedback loop", "Reduced risk", "Investor readiness"]
        },
        { 
            title: "Product Testing", 
            slug: "product-testing", 
            description: "Rigorous testing protocols to ensure product quality and reliability.", 
            image: "/development-services/product_testing.jpeg",
            features: ["Functional Testing", "Usability Testing", "Performance Benchmark", "Compliance Checks"],
            benefits: ["Higher quality products", "Reduced post-launch issues", "Customer satisfaction"]
        },
        { 
            title: "Custom Software Development", 
            slug: "custom-software-development", 
            description: "Tailored software solutions to address specific business challenges.", 
            image: "/development-services/custom_software_development.jpeg",
            features: ["Requirement Analysis", "Full-stack Development", "API Integration", "Cloud Deployment"],
            benefits: ["Scalable solutions", "Process automation", "Competitive advantage"]
        },
        { 
            title: "Programming Languages", 
            slug: "programming-languages", 
            description: "Expertise in diverse languages for robust application development.", 
            image: "/development-services/programming_languages.jpeg",
            features: ["Python", "Java", "JavaScript/TypeScript", "C++", "Rust"],
            benefits: ["Versatile tech stack", "Optimized performance", "Future-proof codebases"]
        }
    ],
    image: "/development-services/custom_software_development.jpeg",
    icon: "Code",
    details:
      "Our development services focus on transforming ideas into reality with a structured approach and cutting-edge technology. Prototype Development brings concepts to life, enabling early testing and refinement. Product Testing ensures reliability and quality through rigorous evaluations. Custom Software Development provides tailored solutions that address specific business needs, while our expertise in programming languages like Python, Java, JavaScript, and C++ guarantees versatility and innovation. Whether you're building a new product or enhancing an existing one, our team is dedicated to delivering outstanding results.",
  },
  {
    id: 6,
    title: "Other Services",
    slug: "other-services",
    description: "Specialized engineering and analysis services.",
    services: [
      "Reverse Engineering",
      "Value Engineering",
      "Failure Analysis",
      "Intellectual Property Development",
    ],
    subServices: [
        { 
            title: "Reverse Engineering", 
            slug: "reverse-engineering", 
            description: "Deconstructing products to extract design information.", 
            image: "/other-services/reverse_engineering.jpeg",
            features: ["3D Scanning", "Geometric Reconstruction", "Material Analysis", "Legacy Part Recreation"],
            benefits: ["Recover lost design data", "Modernize legacy parts", "Competitor benchnmarking"]
        },
        { 
            title: "Value Engineering", 
            slug: "value-engineering", 
            description: "Optimizing value by improving function or reducing cost.", 
            image: "/other-services/value_engineering.jpeg",
            features: ["Function Analysis", "Cost-Benefit Analysis", "Material Substitution", "Process Optimization"],
            benefits: ["Reduced production costs", "Improved product value", "Enhanced functionality"]
        },
        { 
            title: "Failure Analysis", 
            slug: "failure-analysis", 
            description: "Investigating root causes of product or component failures.", 
            image: "/other-services/failure_analysis.jpeg",
            features: ["Root Cause Analysis (RCA)", "Fractography", "Material Testing", "simulation of Failure Modes"],
            benefits: ["Prevent recurrence", "Improve reliability", "Liability protection"]
        },
        { 
            title: "Intellectual Property Development", 
            slug: "intellectual-property-development", 
            description: "Supporting the creation and protection of intellectual property.", 
            image: "/other-services/ipd.jpeg",
            features: ["Patent Drawing Support", "Technical Descriptions", "Prior Art Search Assistance", "Design Patent Filing Support"],
            benefits: ["Secure innovation", "Market exclusivity", "Asset creation"]
        }
    ],
    image: "/other-services/reverse_engineering.jpeg",
    icon: "Plus",
    details:
      "Our specialized services address unique challenges and niche requirements across industries. Reverse Engineering helps uncover the design and functionality of existing products, facilitating improvements or replication. Value Engineering identifies cost-effective alternatives without compromising quality. Failure Analysis investigates the causes of malfunctions, providing insights to prevent recurrence. Intellectual Property Development protects your innovations through patents, trademarks, and copyrights. With a focus on precision and expertise, our other services offer unparalleled support for complex and specialized needs.",
  },
];

export default servicesData;
