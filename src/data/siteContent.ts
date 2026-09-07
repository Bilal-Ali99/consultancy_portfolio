export const siteInfo = {
  brandName: "HB Solutions",
  shortBrandName: "HB Solutions",
  tagline: "ERP, cloud, software, and user-focused digital experiences",
  heroTitle: "ERPNext, cloud, software, and UI/UX solutions for practical business needs",
  heroDescription:
    "A consultancy focused on ERPNext, Frappe customization, AWS serverless projects, software development, and user-focused digital experiences.",
  metadataTitle: "HB Solutions | ERP, Cloud, Software & UI/UX Consultancy",
  metadataDescription:
    "A consultancy focused on ERPNext, Frappe, AWS serverless projects, software development, and UI/UX solutions.",
};

export const contactProjectTypes = [
  "ERPNext / Frappe",
  "Software Development",
  "UI/UX",
  "Machine Learning",
  "Other",
] as const;

export type ContactProjectType = (typeof contactProjectTypes)[number];

export const contactInfo = {
  email: "bilal.ali1999@gmail.com",
  location: "United Kingdom / Remote",
  availability: "Available for selected ERP, cloud, software, and UI/UX projects",
  upwork: "https://www.upwork.com/freelancers/~0128f68001daf07f8c",
  github: "https://github.com/Bilal-Ali99",
  linkedin: "https://www.linkedin.com/in/syed-muhammad-bilal-ali-520b77194/",
};

export type Person = {
  name: string;
  roles: string[];
  location: string;
  bio: string;
  initials: string;
  imageSrc?: string;
  imageAlt: string;
  skills: {
    group: string;
    items: string[];
  }[];
  timeline: {
    period: string;
    title: string;
    organization: string;
    highlights: string[];
  }[];
  links: {
    github?: string;
    linkedin?: string;
    upwork?: string;
  };
  status?: string;
};

export const people: Person[] = [
  {
    name: "Syed Muhammad Bilal Ali",
    roles: ["Software Engineer", "ERP Developer", "Machine Learning Practitioner"],
    location: "United Kingdom",
    bio: "Results-driven Software Engineer with hands-on experience in ERPNext and Frappe Framework customization. Also has a background in IT infrastructure and exposure to Machine Learning through university projects and a short internship.",
    initials: "BA",
    imageSrc: "/images/team/bilal.png",
    imageAlt: "Portrait of Syed Muhammad Bilal Ali",
    skills: [
      {
        group: "ERPNext & Frappe",
        items: [
          "Frappe Framework",
          "ERPNext",
          "Custom App Development",
          "DocTypes",
          "Script Reports",
          "Journal Entry Automation",
          "Hooks & Patches",
        ],
      },
      {
        group: "Programming",
        items: ["Python", "JavaScript"],
      },
      {
        group: "Infrastructure",
        items: ["Ubuntu", "Linux environments", "IT infrastructure"],
      },
      {
        group: "Data & Machine Learning",
        items: ["Machine Learning", "Pandas", "NumPy", "Matplotlib","Seaborn","RAG","Lang-Chain"],
      },
      {
        group: "Tools",
        items: ["Bench CLI"],
      },
      {
        group: "Databases",
        items: ["SQL", "SQL Server", "NoSQL", "MongoDB", "DynamoDB"],
      },
      {
        group: "Version Control",
        items: ["Git", "GitHub", "Bitbucket"],
      },
      {
        group: "API Development",
        items: ["REST APIs", "SCIM API", "Swagger (OpenAPI)", "Postman","Bruno"],
      },
      {
        group: "Software Architecture",
        items: [
          "Microservices",
          "Service-Oriented Development",
          "API-First Development",
          "Layered Architecture",
          "Scalable Application Design",
        ],
      },
      {
        group: "Software Engineering Practices",
        items: [
          "Agile (Scrum)",
          "Software Documentation",
          "Error Handling",
          "Debugging",
          "Code Reviews",
          "CI/CD Pipelines",
        ],
      },
      {
        group: "Development Tools & IDEs",
        items: ["Visual Studio", "Visual Studio Code", "IntelliJ IDEA"],
      },
      {
        group: "Collaboration & Project Management",
        items: ["Jira", "Microsoft Office", "SharePoint"],
      },
      {
        group: "Technical Skills",
        items: [
          "Problem Solving",
          "Software Debugging",
          "Exception Handling",
          "Technical Documentation",
          "Application Deployment",
          "Requirements Analysis",
        ],
      },
    ],
    timeline: [],
    links: {
      github: contactInfo.github,
      linkedin: contactInfo.linkedin,
      upwork: contactInfo.upwork,
    },
  },
  {
    name: "Himaas Ali",
    roles: ["AWS Certified Cloud Practitioner", "Software Engineer", "UI/UX Designer"],
    location: "United Kingdom",
    bio: "Software Engineer and UI/UX-focused team member with project experience in medication management systems, AWS serverless applications, secure frontend delivery, real-time analytics, and cloud observability.",
    initials: "HA",
    imageSrc: "/images/team/himaas.png",
    imageAlt: "Portrait of Himaas Ali",
    skills: [
      {
        group: "Programming Languages",
        items: ["C#", "Java", "C", "HTML5", "CSS3", "YAML"],
      },
      {
        group: "Frameworks & Technologies",
        items: [
          ".NET",
          "Blazor",
          ".NET MAUI Blazor",
          "ASP.NET",
          "REST API Development",
          "SCIM API",
        ],
      },
      {
        group: "Databases",
        items: ["SQL", "SQL Server", "NoSQL", "MongoDB", "DynamoDB"],
      },
      {
        group: "Cloud Platforms",
        items: [
          "Amazon Web Services (AWS)",
          "EC2",
          "S3",
          "DynamoDB",
          "IAM",
          "CloudFormation",
          "Microsoft Azure",
          "Azure Services",
          "Azure DevOps",
        ],
      },
      {
        group: "DevOps & Infrastructure",
        items: [
          "CI/CD",
          "Azure DevOps",
          "Terraform",
          "Apache Kafka",
          "AWS CloudFormation",
          "IIS (Internet Information Services)",
          "Infrastructure as Code (IaC)",
        ],
      },
      {
        group: "Version Control",
        items: ["Git", "GitHub", "Bitbucket"],
      },
      {
        group: "API Development",
        items: ["REST APIs", "SCIM API", "Swagger (OpenAPI)", "Postman"],
      },
      {
        group: "Testing & Code Quality",
        items: ["Unit Testing", "SonarQube", "Snyk", "Code Analysis", "Static Code Analysis"],
      },
      {
        group: "Software Architecture",
        items: [
          "Microservices",
          "Service-Oriented Development",
          "API-First Development",
          "Layered Architecture",
          "Scalable Application Design",
        ],
      },
      {
        group: "Software Engineering Practices",
        items: [
          "Agile (Scrum)",
          "Software Documentation",
          "Error Handling",
          "Debugging",
          "Code Reviews",
          "CI/CD Pipelines",
        ],
      },
      {
        group: "Development Tools & IDEs",
        items: ["Visual Studio", "Visual Studio Code", "IntelliJ IDEA"],
      },
      {
        group: "Collaboration & Project Management",
        items: ["Jira", "Microsoft Office", "SharePoint"],
      },
      {
        group: "UI/UX & Design Tools",
        items: ["Figma", "Maze", "Balsamiq"],
      },
      {
        group: "Data Analysis",
        items: ["R Studio"],
      },
      {
        group: "Technical Skills",
        items: [
          "Problem Solving",
          "Software Debugging",
          "Exception Handling",
          "Technical Documentation",
          "Application Deployment",
          "Requirements Analysis",
        ],
      },
    ],
    timeline: [],
    links: {
      github: contactInfo.github,
      linkedin: contactInfo.linkedin,
      upwork: contactInfo.upwork,
    },
  },
];

export type Project = {
  id: number;
  title: string;
  category:
    | "ERPNext"
    | "HR & Payroll"
    | "Machine Learning"
    | "Data Science"
    | "Health Tech"
    | "AWS Serverless"
    | "AWS Analytics";
  description: string;
  problem: string;
  solution: string;
  tech: string[];
  highlights: { label: string; value: string }[];
  color: string;
  owner: string;
  liveUrl?: string;
  repoUrl?: string;
};

export type ServiceSummary = {
  title: string;
  summary: string;
  capabilities: string[];
  slug?: string;
};

export type ServiceModuleIcon =
  | "accounting"
  | "procurement"
  | "sales"
  | "stock"
  | "manufacturing"
  | "projects"
  | "pos"
  | "quality"
  | "support"
  | "assets"
  | "hr"
  | "custom-apps"
  | "workflows"
  | "integrations";

export type ServiceModule = {
  title: string;
  description: string;
  icon: ServiceModuleIcon;
};

export type ServiceStatistic = {
  value: string;
  label: string;
  sourceLabel: string;
  sourceUrl: string;
};

export type ServicePageContent = {
  slug: string;
  navTitle: string;
  eyebrow: string;
  headline: string;
  introduction: string;
  metadataTitle: string;
  metadataDescription: string;
  modules: ServiceModule[];
  extensions: ServiceModule[];
  statistics: ServiceStatistic[];
  statisticsVerified: string;
  punchline: string;
  demoReasons: { title: string; description: string }[];
  trialUrl: string;
  faqs: { question: string; answer: string }[];
};

export const services: ServiceSummary[] = [
  {
    title: "ERPNext & Frappe Development",
    slug: "erpnext-frappe-development",
    summary:
      "Custom ERP modules, DocTypes, workflows, reports, hooks, patches, and accounting automation built around real business operations.",
    capabilities: ["Custom apps", "DocTypes", "Script reports", "Journal Entry automation", "HR & Payroll"],
  },
  {
    title: "AWS Cloud & Serverless Solutions",
    summary:
      "Serverless backends, secure static delivery, real-time processing, monitoring, and cost-aware cloud architecture.",
    capabilities: ["Lambda", "DynamoDB", "API Gateway", "SNS", "CloudFront", "S3", "CloudWatch"],
  },
  {
    title: "Software Engineering & Web Applications",
    summary:
      "Practical frontend and backend workflows for operational tools, dashboards, portals, and client-facing applications.",
    capabilities: ["Application design", "Backend workflows", "Frontend delivery", "Portal interfaces"],
  },
  {
    title: "UI/UX & Product Experience",
    summary:
      "User-focused interfaces shaped around clarity, simple flows, and practical interaction design for business tools.",
    capabilities: ["UI/UX", "Experience design", "Interface structure", "Usability-focused layouts"],
  },
  {
    title: "Data & Machine Learning",
    summary:
      "Python-based analysis, classification, clustering, reporting, and insight workflows for structured datasets.",
    capabilities: ["Python", "Pandas", "NumPy", "Matplotlib", "Classification", "Clustering"],
  },
  {
    title: "Infrastructure & Secure Delivery",
    summary:
      "Linux environments, access control, monitoring, deployment support, and secure software practices.",
    capabilities: ["Ubuntu", "Git", "IAM", "WAF", "Secure software", "Monitoring"],
  },
];

export const servicePages: ServicePageContent[] = [
  {
    slug: "erpnext-frappe-development",
    navTitle: "ERPNext & Frappe Development",
    eyebrow: "ERPNext & Frappe Development",
    headline: "ERPNext built around your business, not the other way around.",
    introduction:
      "We map your real operations, configure the right modules, and extend Frappe through maintainable custom apps, reports, workflows, automation, and integrations without modifying ERPNext core files.",
    metadataTitle: "ERPNext & Frappe Development Services | HB Solutions",
    metadataDescription:
      "ERPNext and Frappe development services for custom apps, DocTypes, workflows, reports, accounting automation, HR, payroll, and integrations.",
    modules: [
      {
        title: "Accounting",
        icon: "accounting",
        description:
          "Connect invoicing, payments, journals, ledgers, assets, budgets, and financial reporting in one controlled record.",
      },
      {
        title: "Procurement",
        icon: "procurement",
        description:
          "Structure supplier workflows from material requests and quotations through purchase orders, receipts, and payments.",
      },
      {
        title: "Sales",
        icon: "sales",
        description:
          "Manage quotations, sales orders, pricing, fulfilment, invoicing, and customer-facing documents as one connected flow.",
      },
      {
        title: "Stock & Inventory",
        icon: "stock",
        description:
          "Track items, warehouses, batches, serial numbers, transfers, valuation, replenishment, and real-time stock movement.",
      },
      {
        title: "Manufacturing",
        icon: "manufacturing",
        description:
          "Coordinate bills of materials, production plans, work orders, job cards, material consumption, and quality checks.",
      },
      {
        title: "Projects",
        icon: "projects",
        description:
          "Plan tasks, milestones, timesheets, costs, billing, and delivery progress with operational and financial visibility.",
      },
      {
        title: "Point of Sale",
        icon: "pos",
        description:
          "Support fast retail billing with customer, payment, pricing, and inventory records connected to the wider ERP.",
      },
      {
        title: "Quality",
        icon: "quality",
        description:
          "Define inspection criteria, record quality results, and connect checks to purchasing, stock, and manufacturing activity.",
      },
      {
        title: "Support",
        icon: "support",
        description:
          "Organize customer issues, assignment, communication, resolution status, and service visibility in a traceable workflow.",
      },
      {
        title: "Assets",
        icon: "assets",
        description:
          "Manage asset registers, locations, movement, maintenance, depreciation schedules, and accounting throughout the lifecycle.",
      },
    ],
    extensions: [
      {
        title: "Frappe HR & Payroll",
        icon: "hr",
        description:
          "Extend employee, attendance, leave, salary, and payroll operations through the connected Frappe HR application.",
      },
      {
        title: "Custom Apps & DocTypes",
        icon: "custom-apps",
        description:
          "Model organization-specific records and rules in maintainable custom apps that keep ERPNext core files untouched.",
      },
      {
        title: "Workflows & Reports",
        icon: "workflows",
        description:
          "Create approvals, automation, print formats, dashboards, and operational reports around actual responsibilities.",
      },
      {
        title: "APIs & Integrations",
        icon: "integrations",
        description:
          "Connect ERPNext with external applications and services through controlled REST APIs, webhooks, and background jobs.",
      },
    ],
    statistics: [
      {
        value: "30,000+",
        label: "Companies using ERPNext",
        sourceLabel: "ERPNext adoption",
        sourceUrl: "https://frappe.io/erpnext",
      },
      {
        value: "10",
        label: "Featured industry sectors",
        sourceLabel: "ERPNext industries",
        sourceUrl: "https://frappe.io/erpnext/industry",
      },
      {
        value: "160+",
        label: "Listed Frappe partners",
        sourceLabel: "Frappe partner network",
        sourceUrl: "https://frappe.io/partners/regions",
      },
      {
        value: "40+",
        label: "Countries with listed partners",
        sourceLabel: "Frappe partner network",
        sourceUrl: "https://frappe.io/partners/regions",
      },
      {
        value: "35,000+",
        label: "ERPNext GitHub stars",
        sourceLabel: "ERPNext on GitHub",
        sourceUrl: "https://github.com/frappe/erpnext",
      },
      {
        value: "1,700+",
        label: "Published ERPNext releases",
        sourceLabel: "ERPNext releases",
        sourceUrl: "https://github.com/frappe/erpnext/releases",
      },
    ],
    statisticsVerified: "Verified September 2026",
    punchline: "See how your operations can work as one connected system.",
    demoReasons: [
      {
        title: "Validate the fit",
        description: "Compare ERPNext capabilities with the way your teams actually work before defining the solution.",
      },
      {
        title: "Clarify the scope",
        description: "Identify the modules, custom apps, reports, approvals, and integrations required for the first release.",
      },
      {
        title: "Review your data",
        description: "Assess existing records, data quality, migration needs, and the controls required for a reliable transition.",
      },
      {
        title: "Plan the rollout",
        description: "Establish practical phases for configuration, development, testing, training, deployment, and support.",
      },
    ],
    trialUrl: "https://frappe.io/cloud",
    faqs: [
      {
        question: "What is the difference between ERPNext and Frappe Framework?",
        answer:
          "ERPNext is the business application containing standard ERP modules. Frappe Framework is the underlying full-stack platform used to build ERPNext and create custom applications, DocTypes, workflows, reports, and integrations.",
      },
      {
        question: "Can ERPNext be customized without changing core files?",
        answer:
          "Yes. We prefer custom apps, hooks, client and server scripts, custom fields, workflows, reports, and supported extension points. This keeps custom work separated from ERPNext core and makes future maintenance more manageable.",
      },
      {
        question: "Which ERPNext modules can HB Solutions implement?",
        answer:
          "Our current experience is strongest in accounting-connected workflows, donation management, HR, payroll, attendance, master data, reports, and custom operational modules. The final implementation scope is confirmed after reviewing your processes and ERPNext version.",
      },
      {
        question: "Can ERPNext integrate with existing applications?",
        answer:
          "ERPNext and Frappe provide REST APIs, webhooks, background jobs, and integration points. We assess each external system, authentication method, data contract, volume, and failure-handling requirement before confirming an integration.",
      },
      {
        question: "Can existing business data be migrated?",
        answer:
          "Yes, when the source data can be mapped and validated. A migration normally includes data review, cleansing, mapping, trial imports, reconciliation, and approval before production cutover.",
      },
      {
        question: "Should ERPNext use Frappe Cloud or self-hosting?",
        answer:
          "The right option depends on operational ownership, customization, security, budget, backup, and support requirements. A discovery session helps compare managed Frappe Cloud with an appropriately maintained self-hosted environment.",
      },
      {
        question: "How long does an ERPNext implementation take?",
        answer:
          "Timing depends on modules, process complexity, customization, integrations, migration volume, stakeholder availability, and testing. We provide an implementation estimate only after the initial requirements and fit assessment.",
      },
      {
        question: "What support is available after deployment?",
        answer:
          "Post-deployment support can include issue resolution, user assistance, monitoring, controlled enhancements, reports, workflow refinements, and release planning. The exact support model is agreed as part of the project scope.",
      },
    ],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((service) => service.slug === slug);
}

export const techStack = [
  {
    group: "Front-End",
    items: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "Blazor"],
  },
  {
    group: "Back-End & ERP",
    items: ["Python", "Frappe Framework", "ERPNext", "Node.js", "DocTypes", "REST APIs"],
  },
  {
    group: "AWS",
    items: ["AWS Lambda", "MSK", "ActiveMQ", "DynamoDB", "API Gateway", "SNS", "CloudFront", "S3", "IAM", "VPC", "CloudWatch"],
  },
  {
    group: "Data & Analytics",
    items: ["Pandas", "NumPy", "Matplotlib", "Machine Learning", "Kinesis Data Streams"],
  },
  {
    group: "Database",
    items: ["MongoDB", "SQL Server", "Oracle"],
  },
  {
    group: "Software Security",
    items: ["Snyk", "Sonar", "OWASP"],
  },
  {
    group: "IDEs",
    items: ["Visual Studio", "VS Code", "Notepad++", "IntelliJ IDEA"],
  },
  {
    group: "Infrastructure & DevOps",
    items: ["Ubuntu", "Git", "Bench CLI", "CloudFormation", "Terraform", "Apache Kafka", "YAML", "HCL"],
  },
  {
    group: "Design & Quality",
    items: ["UI/UX", "Secure Software", "Selenium", "SQA", "Lean Six Sigma"],
  },
];

export const whyChooseUs = [
  {
    title: "Agile Methodology",
    detail: "We work in practical iterations with planning, feedback, refinement, and regular delivery checkpoints.",
  },
  {
    title: "Real Business Context",
    detail: "We shape solutions around the actual workflow, not only the screen or database structure.",
  },
  {
    title: "ERP + Cloud Coverage",
    detail: "The team combines ERPNext/Frappe delivery with AWS serverless and secure frontend delivery.",
  },
  {
    title: "Clean Customization",
    detail: "ERP work is built through custom apps and extension points so core files stay maintainable.",
  },
  {
    title: "Transparent Delivery",
    detail: "Work is broken into clear planning, build, review, and release steps so expectations stay visible.",
  },
  {
    title: "User-Focused Interfaces",
    detail: "Screens are designed for clarity, fast scanning, and practical daily use.",
  },
  {
    title: "Measured Quality",
    detail: "We consider validation, monitoring, security, and cost controls as part of delivery.",
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Donation Management System",
    category: "ERPNext",
    description:
      "Complete ERPNext custom module for a nonprofit trust with donation workflows, accounting integration, coupon inventory, and sponsorship programs.",
    problem:
      "The nonprofit needed a structured ERPNext workflow for donations, donation boxes, coupon books, sponsorship tracking, and account mapping.",
    solution:
      "Built custom DocTypes and workflows for Donation Orders, Donors, Donation Boxes, Coupon Books, Coupon Inventory, Sponsorship Allocation, Journal Entry automation, and Chart of Accounts mapping.",
    tech: ["ERPNext", "Frappe Framework", "Python", "JavaScript", "DocTypes", "Script Reports"],
    highlights: [
      { label: "Custom DocTypes", value: "8+" },
      { label: "Accounting", value: "Journal Entries" },
      { label: "Programs", value: "Sponsorship" },
    ],
    color: "#6366f1",
    owner: "Syed Muhammad Bilal Ali",
  },
  {
    id: 2,
    title: "HR & Payroll Customization",
    category: "HR & Payroll",
    description:
      "ERPNext HR and Payroll customization with bulk attendance processing, multi-location payroll filters, leave validation, and custom HR master data.",
    problem:
      "The HR process needed location-aware payroll controls, attendance correction, leave priority logic, and custom master data without modifying ERPNext core files.",
    solution:
      "Created a separate custom app with Bulk Attendance background jobs, Payroll Entry filters, compensatory leave validation, and HR master DocTypes.",
    tech: ["ERPNext", "Frappe Framework", "Python", "Background Jobs", "Payroll", "HR"],
    highlights: [
      { label: "Attendance", value: "Bulk Tool" },
      { label: "Payroll", value: "Multi-location" },
      { label: "Core Files", value: "Untouched" },
    ],
    color: "#10b981",
    owner: "Syed Muhammad Bilal Ali",
  },
  {
    id: 3,
    title: "Forest Cover Type Classification",
    category: "Machine Learning",
    description:
      "Machine learning classification model using environmental and cartographic attributes to predict forest cover type.",
    problem:
      "The project required classification of forest cover categories from structured environmental attributes.",
    solution:
      "Prepared the dataset, explored feature relationships, trained classification models, and evaluated model performance using Python data science tools.",
    tech: ["Python", "Machine Learning", "Pandas", "NumPy", "Matplotlib"],
    highlights: [
      { label: "Domain", value: "Environment" },
      { label: "Task", value: "Classification" },
      { label: "Data", value: "Tabular" },
    ],
    color: "#f59e0b",
    owner: "Syed Muhammad Bilal Ali",
  },
  {
    id: 4,
    title: "Customer Segmentation",
    category: "Data Science",
    description:
      "Clustering-based customer segmentation project for marketing insight and audience grouping.",
    problem:
      "The project needed customer groups to support more focused marketing and business insight.",
    solution:
      "Applied clustering techniques to segment customers and analyze patterns that can support targeted decision-making.",
    tech: ["Python", "Machine Learning", "Clustering", "Pandas", "Matplotlib"],
    highlights: [
      { label: "Task", value: "Clustering" },
      { label: "Use Case", value: "Marketing" },
      { label: "Output", value: "Segments" },
    ],
    color: "#326ce5",
    owner: "Syed Muhammad Bilal Ali",
  },
  {
    id: 5,
    title: "EasyMed",
    category: "Health Tech",
    description:
      "Medication management device and software toolset that helps users track medication schedules across desktop, hardware, and mobile notification flows.",
    problem:
      "Customers needed a reliable way to manage medication times, receive reminders, and confirm whether medication had actually been taken.",
    solution:
      "Designed a connected workflow where a desktop application provides medication information and timings, the physical device alerts users through lights and a buzzer, mobile notifications reinforce reminders, and a weight sensor detects whether medication has been taken.",
    tech: ["Medication Device", "Desktop Application", "Mobile Notifications", "Weight Sensor", "Lights", "Buzzer"],
    highlights: [
      { label: "Alerts", value: "Device + Mobile" },
      { label: "Detection", value: "Weight Sensor" },
      { label: "Care Flow", value: "Third-party Alerts" },
    ],
    color: "#ec4899",
    owner: "Himaas Ali",
  },
  {
    id: 6,
    title: "Job Application Tracker",
    category: "AWS Serverless",
    description:
      "Serverless job application tracker with a live backend database, automated email notifications, secure global frontend delivery, observability, and cost monitoring.",
    problem:
      "Job seekers often lose track of applications, interview stages, follow-ups, and status changes across multiple companies.",
    solution:
      "Built a free-tier focused AWS architecture using Lambda, DynamoDB, API Gateway, SNS, CloudFront, WAF, S3, IAM, VPC design, CloudWatch dashboards, error alarms, and billing alarms.",
    tech: [
      "AWS Lambda",
      "DynamoDB",
      "API Gateway",
      "SNS",
      "CloudFront",
      "WAF",
      "S3",
      "IAM",
      "VPC",
      "CloudWatch",
    ],
    highlights: [
      { label: "Compute", value: "Serverless" },
      { label: "Alerts", value: "Email Status" },
      { label: "Delivery", value: "Global HTTPS" },
    ],
    color: "#ff9900",
    owner: "Himaas Ali",
  },
  {
    id: 7,
    title: "Real-Time Canadian Weather Analytics",
    category: "AWS Analytics",
    description:
      "Real-time weather analytics pipeline that ingests official Canadian weather API data, processes events, detects extreme conditions, sends alerts, and stores operational and historical data.",
    problem:
      "Weather data needed to be processed in real time so extreme temperature events could be detected quickly and communicated through alerting.",
    solution:
      "Used Kinesis Data Streams, AWS Lambda, DynamoDB, SNS, S3, and CloudWatch to compute feels-like temperature, calculate severity scores, send email alerts, and archive data for analysis with infrastructure defined through CloudFormation and Terraform.",
    tech: [
      "AWS Lambda",
      "Kinesis Data Streams",
      "DynamoDB",
      "SNS",
      "S3",
      "CloudWatch",
      "CloudFormation",
      "Terraform",
      "Python",
      "YAML",
      "HCL",
    ],
    highlights: [
      { label: "Processing", value: "Real-time" },
      { label: "Architecture", value: "Serverless" },
      { label: "Compliance", value: "PIPEDA-aware" },
    ],
    color: "#38bdf8",
    owner: "Himaas Ali",
  },
];

export const certifications = [
  {
    name: "Master Python with NumPy for Data Science and Machine Learning",
    issuer: "Udemy",
    owner: "Syed Muhammad Bilal Ali",
    skills: ["Python", "NumPy", "Data Science", "Machine Learning"],
    color: "#a435f0",
  },
  {
    name: "Learning Python Beginner to Advanced",
    issuer: "Udemy",
    owner: "Syed Muhammad Bilal Ali",
    skills: ["Python", "Programming Fundamentals"],
    color: "#a435f0",
  },
  {
    name: "Machine Learning Real World Case Studies | Hands-on Python",
    issuer: "Udemy",
    owner: "Syed Muhammad Bilal Ali",
    skills: ["Machine Learning", "Python", "Case Studies"],
    color: "#a435f0",
  },
  {
    name: "Complete SQA Training in Selenium and Testing",
    issuer: "SQA Training",
    owner: "Syed Muhammad Bilal Ali",
    skills: ["SQA", "Selenium", "Testing"],
    color: "#f59e0b",
  },
  {
    name: "Ultimate AWS Certified Solutions Architect Associate",
    issuer: "Udemy",
    owner: "Himaas Ali",
    skills: ["AWS", "Cloud Architecture", "Solutions Architecture"],
    color: "#ff9900",
  },
  {
    name: "Technology Software Development Job Simulation",
    issuer: "Citi Bank Certification",
    owner: "Himaas Ali",
    skills: ["Software Development", "Professional Simulation"],
    color: "#2563eb",
  },
  {
    name: "IBM Data Analyst",
    issuer: "Coursera",
    owner: "Himaas Ali",
    skills: ["Data Analysis", "Analytics", "IBM"],
    color: "#0f62fe",
  },
  {
    name: "Developing Secure Software",
    issuer: "The Linux Foundation",
    owner: "Himaas Ali",
    skills: ["Secure Software", "Application Security"],
    color: "#f59e0b",
  },
  {
    name: "Lean Six Sigma Yellow Belt",
    issuer: "Anexas Europe Certification",
    owner: "Himaas Ali",
    skills: ["Lean Six Sigma", "Process Improvement"],
    color: "#eab308",
  },
  {
    name: "AZ-500 Microsoft Azure Security Exam Certification",
    issuer: "Udemy",
    owner: "Himaas Ali",
    skills: ["Azure Security", "Cloud Security"],
    color: "#0078d4",
  },
  {
    name: "Programming in Blazor - ASP.NET Core 5",
    issuer: "Training Certification",
    owner: "Himaas Ali",
    skills: ["Blazor", "ASP.NET Core 5", "Web Development"],
    color: "#7c3aed",
  },
];

export const testimonials: {
  id: number;
  name: string;
  role: string;
  text: string;
  project: string;
  upworkUrl?: string;
}[] = [];
