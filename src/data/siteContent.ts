export const siteInfo = {
  brandName: "Bilal & Himaas Studio",
  shortBrandName: "B&H Studio",
  tagline: "ERP, software development, and user-focused digital experiences",
  heroTitle: "ERPNext, software, and UI/UX solutions for practical business needs",
  heroDescription:
    "A two-person consultancy focused on ERPNext, Frappe customization, software development, and user-focused digital experiences.",
  metadataTitle: "Bilal & Himaas Studio | ERP, Software & UI/UX Consultancy",
  metadataDescription:
    "Two-person consultancy focused on ERPNext, Frappe, software development, and UI/UX solutions.",
};

export const contactInfo = {
  email: "bilal.ali1999@gmail.com",
  location: "United Kingdom / Remote",
  availability: "Available for selected ERP, software, and UI/UX projects",
  upwork: "https://www.upwork.com/freelancers/~0128f68001daf07f8c",
  github: "https://github.com/Bilal-Ali99",
  linkedin: "https://www.linkedin.com/in/syed-muhammad-bilal-ali-520b77194/",
};

export type Person = {
  name: string;
  roles: string[];
  location: string;
  bio: string;
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
    roles: ["Software Engineer", "UI/UX"],
    location: "United Kingdom",
    bio: "Software Engineer and UI/UX-focused team member. Full profile details will be added soon.",
    skills: [
      {
        group: "Profile",
        items: ["Software Engineering", "UI/UX", "Details coming soon"],
      },
    ],
    timeline: [],
    links: {},
    status: "Full profile details coming soon.",
  },
];

export type Project = {
  id: number;
  title: string;
  category: "ERPNext" | "HR & Payroll" | "Machine Learning" | "Data Science";
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
    title: "JTQ Donation Management System",
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
    title: "JTQ HR & Payroll Customization",
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
];

export const testimonials: {
  id: number;
  name: string;
  role: string;
  text: string;
  project: string;
  upworkUrl?: string;
}[] = [];
