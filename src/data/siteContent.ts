export const siteInfo = {
  brandName: "Bilal & Himaas Studio",
  shortBrandName: "B&H Studio",
  tagline: "ERP, cloud, software, and user-focused digital experiences",
  heroTitle: "ERPNext, cloud, software, and UI/UX solutions for practical business needs",
  heroDescription:
    "A two-person consultancy focused on ERPNext, Frappe customization, AWS serverless projects, software development, and user-focused digital experiences.",
  metadataTitle: "Bilal & Himaas Studio | ERP, Cloud, Software & UI/UX Consultancy",
  metadataDescription:
    "Two-person consultancy focused on ERPNext, Frappe, AWS serverless projects, software development, and UI/UX solutions.",
};

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
    roles: ["Software Developer", "ERP Developer"],
    location: "United Kingdom",
    bio: "Results-driven Python Developer with hands-on experience in ERPNext and Frappe Framework customization. Also has a background in IT infrastructure and exposure to Machine Learning through university projects and a short internship.",
    initials: "BA",
    imageAlt: "Portrait placeholder for Syed Muhammad Bilal Ali",
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
        items: ["Machine Learning", "Pandas", "NumPy", "Matplotlib"],
      },
      {
        group: "Tools",
        items: ["Git", "Bench CLI"],
      },
    ],
    timeline: [
      {
        period: "June 2026 - Present",
        title: "Junior Python Developer",
        organization: "Delivery Devs",
        highlights: [
          "Built a complete Donation Management System in ERPNext covering Donation Orders, Donors, Donation Boxes, Coupon Books, Coupon Inventory, and Sponsorship Allocation.",
          "Integrated donation workflows with ERPNext Accounts via automated Journal Entry creation and Chart of Accounts mapping.",
          "Implemented sponsorship allocation for student and prisoner programs with quantity, duration, and amount tracking.",
          "Developed cash denomination validation, box issuance and reissuance flows, and donation source account mapping.",
          "Created custom reports for donation balances, coupon inventory, and volunteer assignment.",
          "Customized HR and Payroll features in a separate custom app to avoid modifying ERPNext core files.",
          "Built a Bulk Attendance tool with background job execution, leave priority logic, and attendance correction.",
          "Added Payroll Entry filters for Work Mode, City, Province, Region, and Madrasa for multi-location payroll processing.",
          "Created custom HR master DocTypes including City, Province, Work Mode, Region, Madrasa, and Payroll Group.",
        ],
      },
      {
        period: "December 2025 - May 2026",
        title: "ERP Developer Intern",
        organization: "Delivery Devs",
        highlights: [
          "Set up and configured Frappe Framework on Ubuntu, including bench CLI, site management, and development environments.",
          "Built custom DocTypes with field validations, link fields, and child tables based on business requirements.",
          "Developed web pages and portal configurations using Frappe's Website module for client-facing interfaces.",
          "Assisted in requirements gathering, workflow documentation, and full-stack module development alongside functional and technical consultants.",
        ],
      },
      {
        period: "April 2024 - October 2025",
        title: "IT Manager",
        organization: "Pro Source Pvt Ltd",
        highlights: [
          "Administered core IT infrastructure including network operations, VOIP and telephony, attendance and access control systems, and vendor/ISP coordination.",
          "Ensured software compliance with data protection regulations and maintained accurate inventory records of IT assets.",
        ],
      },
      {
        period: "August 2023 - April 2024",
        title: "Associate IT Manager",
        organization: "Global Resource Group",
        highlights: [
          "Monitored network performance, enforced access policies, and supported adherence to data protection and privacy regulations.",
          "Managed core IT infrastructure, maintained hardware inventory, and provided technical support for software and hardware issues.",
        ],
      },
    ],
    links: {
      github: contactInfo.github,
      linkedin: contactInfo.linkedin,
      upwork: contactInfo.upwork,
    },
  },
  {
    name: "Himaas Ali",
    roles: ["Cloud Architecture Consultant", "Software Engineer", "UI/UX"],
    location: "United Kingdom",
    bio: "Software Engineer and UI/UX-focused team member with project experience in medication management systems, AWS serverless applications, secure frontend delivery, real-time analytics, and cloud observability.",
    initials: "HA",
    imageAlt: "Portrait placeholder for Himaas Ali",
    skills: [
      {
        group: "Software Engineering",
        items: ["Application Design", "Backend Workflows", "Frontend Delivery", "UI/UX"],
      },
      {
        group: "AWS & Cloud",
        items: [
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
      },
      {
        group: "Data & Infrastructure",
        items: ["Kinesis Data Streams", "CloudFormation", "Terraform", "Python", "YAML", "HCL"],
      },
      {
        group: "Security & Development",
        items: ["Secure Software", "Azure Security", "Blazor", "ASP.NET Core 5", "Data Analytics"],
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
