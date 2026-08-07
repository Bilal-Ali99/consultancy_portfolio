Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$outputPath = Join-Path $PSScriptRoot "HB-Solutions-Website-Execution-Reference.docx"
$tempRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("hb-solutions-docx-" + [Guid]::NewGuid().ToString("N"))

function Escape-Xml([string]$Value) {
  if ($null -eq $Value) { return "" }
  return [System.Security.SecurityElement]::Escape($Value)
}

function New-Run([string]$Text, [bool]$Bold = $false, [bool]$Italic = $false, [string]$Color = "") {
  $properties = ""
  if ($Bold) { $properties += "<w:b/>" }
  if ($Italic) { $properties += "<w:i/>" }
  if ($Color) { $properties += "<w:color w:val='$Color'/>" }
  $escapedText = Escape-Xml $Text
  return "<w:r><w:rPr>$properties</w:rPr><w:t xml:space='preserve'>$escapedText</w:t></w:r>"
}

$body = [System.Text.StringBuilder]::new()

function Add-Paragraph([string]$Text, [string]$Style = "Normal", [bool]$Bold = $false, [string]$Color = "") {
  $run = New-Run $Text $Bold $false $Color
  [void]$body.Append("<w:p><w:pPr><w:pStyle w:val='$Style'/></w:pPr>$run</w:p>")
}

function Add-Bullet([string]$Text) {
  $run = New-Run ("- " + $Text)
  [void]$body.Append("<w:p><w:pPr><w:pStyle w:val='ListParagraph'/></w:pPr>$run</w:p>")
}

function Add-Code([string]$Text) {
  $run = New-Run $Text $false $false "1F2937"
  [void]$body.Append("<w:p><w:pPr><w:pStyle w:val='CodeBlock'/></w:pPr>$run</w:p>")
}

function Add-PageBreak {
  [void]$body.Append("<w:p><w:r><w:br w:type='page'/></w:r></w:p>")
}

function Add-Table([object[]]$TableDefinition) {
  $Headers = [string[]]$TableDefinition[0]
  $Rows = [object[]]$TableDefinition[1]

  [void]$body.Append("<w:tbl><w:tblPr><w:tblStyle w:val='TableGrid'/><w:tblW w:w='0' w:type='auto'/><w:tblLayout w:type='autofit'/></w:tblPr>")
  [void]$body.Append("<w:tr>")
  foreach ($header in $Headers) {
    $value = Escape-Xml $header
    [void]$body.Append("<w:tc><w:tcPr><w:shd w:fill='3730A3'/></w:tcPr><w:p><w:pPr><w:pStyle w:val='TableHeader'/></w:pPr><w:r><w:rPr><w:b/><w:color w:val='FFFFFF'/></w:rPr><w:t xml:space='preserve'>$value</w:t></w:r></w:p></w:tc>")
  }
  [void]$body.Append("</w:tr>")
  foreach ($row in $Rows) {
    [void]$body.Append("<w:tr>")
    foreach ($cell in $row) {
      $value = Escape-Xml ([string]$cell)
      [void]$body.Append("<w:tc><w:tcPr><w:tcMar><w:top w:w='100' w:type='dxa'/><w:left w:w='100' w:type='dxa'/><w:bottom w:w='100' w:type='dxa'/><w:right w:w='100' w:type='dxa'/></w:tcMar></w:tcPr><w:p><w:pPr><w:pStyle w:val='TableText'/></w:pPr><w:r><w:t xml:space='preserve'>$value</w:t></w:r></w:p></w:tc>")
    }
    [void]$body.Append("</w:tr>")
  }
  [void]$body.Append("</w:tbl>")
  Add-Paragraph ""
}

# Cover page
Add-Paragraph "HB SOLUTIONS" "Title" $true "3730A3"
Add-Paragraph "Website Execution, Technical Delivery and Operations Reference" "Subtitle" $false "4F46E5"
Add-Paragraph "" "Normal"
Add-Paragraph "Project period covered: 13 July 2026 to 7 August 2026" "Normal"
Add-Paragraph "Document version: 1.0" "Normal"
Add-Paragraph "Prepared for: HB Solutions internal project reference" "Normal"
Add-Paragraph "Purpose: preserve the functional decisions, technical implementation, deployment approach, issues, resolutions, and reusable quality checks for this consultancy portfolio." "Normal"
Add-Paragraph "" "Normal"
Add-Paragraph "Document status: baseline reference. It reflects the repository and deployment discussions reviewed on 7 August 2026. It does not contain passwords, private keys, SMTP credentials, or GitHub secrets." "Callout"
Add-PageBreak

Add-Paragraph "Document Control" "Heading1"
Add-Table @("Field", "Recorded Value"), @(
  @("Product", "HB Solutions consultancy portfolio website"),
  @("Primary purpose", "Present the services, work, technical capability, team profiles, certifications, and enquiry channel for a two-person consultancy."),
  @("Primary people represented", "Syed Muhammad Bilal Ali and Himaas Ali"),
  @("Public domain", "hbsols.com"),
  @("Primary hosting target", "Namecheap shared hosting with cPanel, CloudLinux and Setup Node.js App"),
  @("Source control", "Git and GitHub repository: Bilal-Ali99/consultancy_portfolio"),
  @("Initial cloud deployment", "Vercel was connected earlier. It remains independent from Namecheap unless the same domain DNS is pointed at Vercel."),
  @("Automation status", "The GitHub Actions workflow exists and builds the application. Its file-upload stage is currently blocked by Namecheap SSH public-key authentication."),
  @("Source evidence", "Project files, Git history, package configuration, and the implementation / troubleshooting discussions from 13 July to 7 August 2026.")
)

Add-Paragraph "How To Use This Reference" "Heading1"
Add-Bullet "Use Sections 1 to 6 to understand what the website does and how it is structured."
Add-Bullet "Use Sections 7 and 8 when changing content, images, design or functionality."
Add-Bullet "Use Sections 9 and 10 for local development, Namecheap deployment and GitHub Actions automation."
Add-Bullet "Use Section 11 as the regression-test suite before publishing a change."
Add-Bullet "Use Section 12 as the question-and-answer troubleshooting library when a known error appears again."

Add-Paragraph "Current Delivery Position" "Heading1"
Add-Paragraph "The site is a real-content two-person consultancy portfolio. Fake names, fake client reviews, unverified review counts and invented verification links were removed. The site has a light, professional visual system with a decorative three-dimensional background and animated content sections. It contains a working server-side contact API that is designed to send through Namecheap SMTP once production environment variables are configured." "Normal"
Add-Paragraph "The current source code uses HB Solutions branding. The live Namecheap Node.js application was reported as working after manual deployment. Automatic GitHub-to-Namecheap deployment is not yet complete because the server rejected the SSH key used by the workflow. This is an infrastructure credential configuration issue, not an application build issue." "Callout"
Add-PageBreak

Add-Paragraph "1. Functional Scope and Business Intent" "Heading1"
Add-Paragraph "The website was reshaped from a generic single-person developer portfolio into a consultancy site that represents two complementary profiles. The information architecture is designed for prospective clients: establish capability, demonstrate technologies and delivery method, show credible project work, introduce the team, then capture an enquiry." "Normal"

Add-Paragraph "Primary user journeys" "Heading2"
Add-Table @("Journey", "Visitor need", "Implemented response"), @(
  @("Capability discovery", "Understand what HB Solutions offers.", "The sticky navigation provides a Services hover menu, Tech Stack, Why Choose Us, Projects, About, Certifications and Contact destinations."),
  @("Technology confidence", "See practical tools and platforms.", "The Tech Stack section groups recognisable technology icons by discipline, including frontend, ERP/backend, AWS/cloud, data, databases, security, IDEs, DevOps and design/quality."),
  @("Delivery confidence", "Understand the way work is delivered.", "Why Choose Us provides seven quality cards and a seven-phase SDLC visual."),
  @("Portfolio review", "Inspect real work rather than fabricated work.", "The project marquee shows seven real case studies. Explore opens an accessible project modal with challenge, solution, technologies and highlights."),
  @("Team review", "Assess both consultants.", "Large portrait cards reveal roles and biographies on hover/focus. A shared View Team Profiles control shows skills for both people."),
  @("Credential review", "See training and certifications.", "The horizontal certification carousel uses explicit previous/next controls and issuer names, without invented credential IDs or verification links."),
  @("Enquiry", "Submit a project request.", "A client-side validated contact form posts to /api/contact. The server sends the content through SMTP and sets the visitor email as Reply-To.")
)

Add-Paragraph "Functional design principles applied" "Heading2"
Add-Bullet "Real, attributable content only. Testimonials are deliberately disabled because there are no confirmed testimonials."
Add-Bullet "Himaas is presented as a complete portfolio contributor based on supplied projects, certifications and skills; career timeline entries are not shown because no verified timeline was supplied."
Add-Bullet "The 3D experience is decorative. Navigation, reading, buttons, form fields and modals remain usable without relying on WebGL."
Add-Bullet "Responsive behaviour is included: desktop navigation changes to a mobile menu, team and content grids stack, and the SDLC diagram changes from a desktop chevron flow to a vertical stepper."
Add-Bullet "Motion uses view-based animation and honours the browser reduced-motion setting in the three-dimensional scene."

Add-Paragraph "2. Delivery History: 13 July to 7 August 2026" "Heading1"
Add-Table @("Date", "Milestone", "What changed / why it mattered"), @(
  @("13 Jul", "Initial portfolio baseline", "A Next.js portfolio scaffold was established with the App Router, Tailwind CSS, TypeScript and common portfolio sections. The initial content included generic/fake single-person identity material."),
  @("20 Jul", "Real consultancy content and 3D direction", "The content was converted to real Bilal information, a two-person consultancy structure, real projects and an initial Three.js background layer. Dependencies for Three.js, React Three Fiber and Drei were added."),
  @("21 Jul", "Services, technology and quality positioning", "Services, Tech Stack and Why Choose Us were added to navigation. Certification presentation and the content model were refined."),
  @("22 Jul", "Why Choose Us layout refinement", "The quality/value section was adjusted for stronger presentation and supporting visual assets."),
  @("26 Jul", "Brand assets", "Brand logo, favicon and app icons were introduced under public/images/brand. Navigation and footer began using the visual identity."),
  @("27 Jul", "Team photography", "Portrait image assets for Bilal and Himaas were placed in public/images/team and connected to the team section."),
  @("28 Jul", "Projects, quality section and certifications", "Portfolio counters/panels, marquee layout, quality section and certificate display received further refinement."),
  @("1 Aug", "SDLC and 3D background upgrade", "The quality section was redesigned around a presentable seven-phase SDLC visual. The 3D scene was enhanced with five moderate rotating modules and reduced-motion behaviour."),
  @("3 Aug", "Trust and contact cleanup", "Social links were removed from public team display. Contact design was simplified, profile interactions refined and fake/promotional content reduced."),
  @("6-7 Aug", "Namecheap deployment preparation", "Next.js and Tailwind configuration were converted from TypeScript configuration files to JavaScript for shared-hosting compatibility. A server.js entry point, SMTP contact API, environment template and GitHub Actions workflow were created."),
  @("7 Aug", "Package lock repair and workflow review", "A malformed optional package entry caused npm Invalid Version failures. It was removed from package-lock.json. Local type checking and build then passed. The workflow upload stage reached SSH and failed only because Namecheap rejected the supplied SSH credential.")
)

Add-Paragraph "3. Current Website Structure" "Heading1"
Add-Paragraph "The home page is assembled in src/app/page.tsx. The root layout adds metadata, the sticky Navbar and the Footer. Content is stored in src/data/siteContent.ts so personal data is not spread across presentation components." "Normal"
Add-Code "src/app/layout.tsx -> Navbar + page content + Footer"
Add-Code "src/app/page.tsx -> ThreeScene, UpworkBanner, Hero, TechStack, WhyChooseUs, Portfolio, About, Certifications, Testimonials, Contact"
Add-Code "src/data/siteContent.ts -> site identity, people, services, technology groups, quality points, projects, certifications, testimonials"
Add-Code "src/app/api/contact/route.ts -> server-side SMTP contact endpoint"

Add-Paragraph "Page sections and behaviours" "Heading2"
Add-Table @("Section", "Responsibility", "Key behaviour"), @(
  @("Navbar", "Persistent site navigation", "Logo stays on the far left, nav items are centred on desktop, Work With Us is at the far right. Services reveals a detailed desktop hover menu and an expanded list on mobile."),
  @("Hero", "First impression and primary calls to action", "Explains ERPNext, software and UI/UX scope. Buttons scroll to Projects and Contact. The previous mouse/scroll indicator beneath the buttons was removed."),
  @("Tech Stack", "Technology credibility", "Uses icon-first rows inside category panels. Design & Quality is centred across the desktop grid to avoid unused space."),
  @("Why Choose Us", "Differentiate delivery quality", "Seven image-led quality cards include Agile Methodology at the top. Desktop uses three columns. The section ends with an animated SDLC lifecycle diagram."),
  @("Our Projects", "Show practical project evidence", "Displays Delivered Projects, Customer Satisfaction and Experience summary panels. A continuously moving marquee pauses on hover; each project opens a modal with detailed case-study data."),
  @("Meet the Team", "Introduce both people", "Portraits use 1200 x 1400 image files. Names show by default; role tags and bio appear on hover/focus. A shared control reveals the two skills panels and hides them when no longer hovered."),
  @("Certifications", "Display professional learning", "A horizontally scrollable, snap-aligned carousel is controlled by left/right buttons and position dots. Cards do not automatically move merely because a visitor hovers."),
  @("Contact", "Capture client enquiry", "Name, email, project type and project description are validated in the browser, then validated again on the server before SMTP send."),
  @("Footer", "Close the page consistently", "Shows the primary HB Solutions logo and dynamic copyright year.")
)

Add-Paragraph "4. Brand, Content and Portfolio Record" "Heading1"
Add-Paragraph "Public identity" "Heading2"
Add-Table @("Item", "Current record"), @(
  @("Brand", "HB Solutions"),
  @("Tagline", "ERP, cloud, software, and user-focused digital experiences"),
  @("Positioning", "ERPNext, Frappe customisation, AWS serverless projects, software development and user-focused digital experiences."),
  @("Operating location", "United Kingdom / Remote"),
  @("Metadata title", "HB Solutions | ERP, Cloud, Software & UI/UX Consultancy"),
  @("Metadata description", "A consultancy focused on ERPNext, Frappe, AWS serverless projects, software development, and UI/UX solutions.")
)

Add-Paragraph "Team profiles" "Heading2"
Add-Table @("Person", "Roles shown", "Profile coverage"), @(
  @("Syed Muhammad Bilal Ali", "Software Engineer; ERP Developer", "ERPNext/Frappe, Python and JavaScript development, IT infrastructure, data and machine learning. The final code uses the full name and the current role wording reflected in the uncommitted content change."),
  @("Himaas Ali", "AWS Certified Cloud Practitioner; Software Engineer; UI/UX Designer", "Cloud/serverless, software engineering, .NET ecosystem, security/quality, DevOps, UI/UX and data analysis skills. The employment timeline is intentionally absent until verified entries are available.")
)

Add-Paragraph "Services offered" "Heading2"
foreach ($item in @(
  "ERPNext & Frappe Development: custom ERP modules, DocTypes, reports, hooks, patches, workflows, HR/Payroll and Journal Entry automation.",
  "AWS Cloud & Serverless Solutions: Lambda, DynamoDB, API Gateway, SNS, CloudFront, S3, CloudWatch and cost-aware architecture.",
  "Software Engineering & Web Applications: operational tools, dashboards, portals, client-facing workflows and backend/frontend delivery.",
  "UI/UX & Product Experience: clear interface structure, practical interaction flows, usability and client-facing design.",
  "Data & Machine Learning: Python analysis, classification, clustering, reporting and insight workflows.",
  "Infrastructure & Secure Delivery: Linux environments, access control, monitoring, deployment assistance and secure software practices."
)) { Add-Bullet $item }

Add-Paragraph "Project catalogue" "Heading2"
Add-Table @("Owner", "Project", "Business outcome / implementation summary"), @(
  @("Bilal", "Donation Management System", "ERPNext nonprofit module covering Donation Orders, Donors, Donation Boxes, Coupon Books, Coupon Inventory and Sponsorship Allocation. It includes Journal Entry automation and Chart of Accounts mapping."),
  @("Bilal", "HR & Payroll Customization", "ERPNext custom app with bulk attendance background jobs, leave validation, attendance correction, multi-location payroll filters and HR master DocTypes, while leaving ERPNext core files unchanged."),
  @("Bilal", "Forest Cover Type Classification", "Python machine-learning classification project using environmental and cartographic attributes."),
  @("Bilal", "Customer Segmentation", "Clustering project that groups customers for marketing insights and more focused decision making."),
  @("Himaas", "EasyMed", "Medication management ecosystem comprising desktop scheduling, a lights/buzzer device, mobile notifications, a weight sensor for medicine-taken detection, escalation reminders and optional third-party alerts."),
  @("Himaas", "Job Application Tracker", "AWS serverless application tracker with live data, email status alerts, secure global delivery, monitoring and free-tier-conscious cost controls."),
  @("Himaas", "Real-Time Canadian Weather Analytics", "Event-driven AWS pipeline using Kinesis, Lambda, DynamoDB, SNS, S3 and CloudWatch to compute feels-like temperature/severity and issue extreme-condition alerts.")
)

Add-Paragraph "Certification catalogue" "Heading2"
foreach ($certification in @(
  "Bilal: Master Python with NumPy for Data Science and Machine Learning (Udemy).",
  "Bilal: Learning Python Beginner to Advanced (Udemy).",
  "Bilal: Machine Learning Real World Case Studies | Hands-on Python (Udemy).",
  "Bilal: Complete SQA Training in Selenium and Testing (SQA Training).",
  "Himaas: Ultimate AWS Certified Solutions Architect Associate (Udemy).",
  "Himaas: Technology Software Development Job Simulation (Citi Bank Certification).",
  "Himaas: IBM Data Analyst (Coursera).",
  "Himaas: Developing Secure Software (The Linux Foundation).",
  "Himaas: Lean Six Sigma Yellow Belt (Anexas Europe Certification).",
  "Himaas: AZ-500 Microsoft Azure Security Exam Certification (Udemy).",
  "Himaas: Programming in Blazor - ASP.NET Core 5 (Training Certification)."
)) { Add-Bullet $certification }

Add-Paragraph "5. Technology Stack and Tooling" "Heading1"
Add-Table @("Area", "Technology / tool", "How it is used in this website"), @(
  @("Runtime", "Node.js 24", "Node.js 24 is selected in the GitHub Actions workflow and should be selected in the Namecheap Node.js application. Next.js itself supports Node 20 or later in this project."),
  @("Package manager", "npm with package-lock.json", "Dependency installation, reproducible package resolution and scripts: dev, build, start and lint."),
  @("Framework", "Next.js 15.5.18", "React-based application framework using the App Router, server route handlers, metadata and optimized local image handling."),
  @("UI runtime", "React 19", "Component model used by all page sections and interaction components."),
  @("Languages", "TypeScript / TSX, JavaScript, CSS, HTML, YAML, HCL", "TypeScript powers application components and server API. JavaScript is used for hosting-compatible config and server.js. CSS is authored through Tailwind layers. YAML/HCL appear in portfolio skills and cloud project descriptions."),
  @("Styling", "Tailwind CSS 3.4.17, PostCSS 8.5, Autoprefixer", "Responsive layouts, typography, colours, cards, navigation, marquee, utility classes and global CSS layers."),
  @("Form handling", "React Hook Form 7.54.2, Zod 3.24.1, @hookform/resolvers", "Browser-side validation and strongly aligned server-side contact validation."),
  @("Mail", "Nodemailer 9.0.4", "Sends contact enquiries via the SMTP service supplied with Namecheap email hosting."),
  @("Animation", "Framer Motion 12, GSAP 3 and @gsap/react", "Framer Motion is actively used for page, card, modal, SDLC and profile transitions. GSAP packages are installed for available animation capability but should be retained only if future code uses them."),
  @("3D", "Three 0.185.1, @react-three/fiber 9.6.1, @react-three/drei 10.7.7", "Creates the fixed, non-interactive WebGL background with floating modules, laptop-inspired central object and five rotating accent blocks."),
  @("Icons", "lucide-react and react-icons", "Lucide supplies interface icons. react-icons provides technology brand marks in the Tech Stack section."),
  @("Development environment", "Windows, PowerShell and Visual Studio Code", "Local project management, npm commands, Git operations and source editing. IntelliJ IDEA is shown in the consultancy capability inventory, not required to run this site."),
  @("Version control / CI", "Git, GitHub and GitHub Actions", "Tracks source changes and runs the deployment workflow on push to main or through manual dispatch."),
  @("Hosting", "Namecheap cPanel / CloudLinux Node.js App", "Runs the prebuilt Next.js application using server.js. Namecheap SMTP is the intended mail transport."),
  @("Prior cloud host", "Vercel", "Was connected for early deployment. It is not technically incompatible with Namecheap; only DNS and deployment ownership must be chosen deliberately.")
)

Add-Paragraph "Technology categories displayed to visitors" "Heading2"
Add-Bullet "Front-End: React, Next.js, JavaScript, TypeScript, Tailwind CSS and Blazor."
Add-Bullet "Back-End & ERP: Python, Frappe Framework, ERPNext, Node.js, DocTypes and REST APIs."
Add-Bullet "AWS & Cloud: Lambda, DynamoDB, API Gateway, SNS, CloudFront, S3, IAM, VPC and CloudWatch."
Add-Bullet "Data & Analytics: Pandas, NumPy, Matplotlib, Machine Learning and Kinesis Data Streams."
Add-Bullet "Database: MongoDB, SQL Server and Oracle."
Add-Bullet "Software Security: Snyk, Sonar and OWASP."
Add-Bullet "IDEs: Visual Studio, VS Code, Notepad++ and IntelliJ IDEA."
Add-Bullet "Infrastructure & DevOps: Ubuntu, Git, Bench CLI, CloudFormation, Terraform, YAML and HCL."
Add-Bullet "Design & Quality: UI/UX, Secure Software, Selenium, SQA and Lean Six Sigma."

Add-Paragraph "6. SDLC and Delivery Method" "Heading1"
Add-Paragraph "The Why Choose Us section communicates Agile Methodology as the first quality point. The delivery lifecycle itself is documented as a seven-phase process. The visual implementation uses coloured chevrons on desktop and a vertically connected stepper on mobile, with each phase fading/sliding into view." "Normal"
Add-Table @("Phase", "Definition used in the site", "Delivery controls"), @(
  @("1. Planning", "Defines project goals, feasibility, risks and high-level scope.", "Initial discussion, success criteria, known constraints, assumptions and scope confirmation."),
  @("2. Requirements Analysis", "Captures functional, non-functional, business and technical requirements.", "User stories, workflows, validation rules, integration needs, reporting and security requirements."),
  @("3. System Design", "Creates architecture, data models, UI/UX flows and technical blueprints.", "Data structures, page flows, API decisions, hosting approach, performance and access design."),
  @("4. Development", "Implements the system through coding, integration and module creation.", "Repository branches, incremental delivery, code review, reusable components and configuration control."),
  @("5. Testing", "Validates quality, security, performance and requirement compliance.", "Type checks, build checks, manual regression suite, form validation, responsive checks and production smoke tests."),
  @("6. Deployment", "Releases the software to production or client environments.", "Build pipeline, environment variables, server configuration, domain/DNS, restart procedure and rollback awareness."),
  @("7. Maintenance", "Provides ongoing support, bug fixes, updates and enhancements.", "Monitor enquiries, review dependency/security updates, test changes, record incidents and refresh portfolio data.")
)

Add-Paragraph "Agile operating approach" "Heading2"
Add-Bullet "Keep the work visible in small deliverable increments: content/model update, component change, test, deploy and verify."
Add-Bullet "Confirm client-facing wording and evidence before publishing; do not use unverified project metrics, testimonials or credential links."
Add-Bullet "Treat content changes as source changes: update siteContent.ts, run checks, commit with a clear message, then deploy."
Add-Bullet "Capture errors and fixes in the knowledge base after each incident so the next project avoids repeating the same dependency, deployment or configuration mistake."

Add-Paragraph "7. Assets, Content Maintenance and Configuration" "Heading1"
Add-Paragraph "Central content source" "Heading2"
Add-Paragraph "The main editable content file is src/data/siteContent.ts. It contains the site identity, contact metadata, team profiles, services, visible technical stack, Why Choose Us points, projects, certifications and an intentionally empty testimonials array. Editing this file is the preferred way to change business content without searching across components." "Normal"

Add-Paragraph "Asset locations and recommended use" "Heading2"
Add-Table @("Asset type", "Repository path", "Current / recommended dimensions and notes"), @(
  @("Primary logo", "public/images/brand/logo-primary.svg", "Use in the light navigation and footer. SVG is preferred because it remains sharp at all sizes."),
  @("Reverse/monochrome logos", "public/images/brand/logo-reversed.svg and logo-monochrome.svg", "Use only where the background makes the primary logo unreadable."),
  @("Favicons/app icons", "public/favicon.ico, public/images/brand/icon-192.png, icon-512.png", "Keep 192 x 192 and 512 x 512 PNG versions for browser/application metadata."),
  @("Team portraits", "public/images/team/bilal.png and public/images/team/himaas.png", "Current files are 1200 x 1400 pixels. Keep future portraits at the same 6:7 portrait ratio, preferably at least 1200 x 1400 pixels, with the subject centrally framed. The current desktop display panel is approximately 680-740 pixels high."),
  @("Why Choose Us illustrations", "public/images/why-choose-us/*.svg", "Seven lightweight SVG illustrations mapped in the same order as the whyChooseUs content array. Use a 16:9 composition for predictable card cropping."),
  @("Public asset rule", "public/images/...", "Any asset in public is served from the site root. Reference it in code as /images/...; do not use local machine paths.")
)

Add-Paragraph "Environment variables for contact delivery" "Heading2"
Add-Paragraph "Store these values only in Namecheap's environment-variable interface or a local .env.local file that is ignored by Git. Never commit a real password, API key or private key." "Callout"
Add-Code "SMTP_HOST=mail.hbsols.com"
Add-Code "SMTP_PORT=465"
Add-Code "SMTP_SECURE=true"
Add-Code "SMTP_USER=info@hbsols.com"
Add-Code "SMTP_PASSWORD=<the domain mailbox password>"
Add-Code "CONTACT_TO_EMAIL=hbsols.info@gmail.com"
Add-Code "CONTACT_FROM_EMAIL=HB Solutions <info@hbsols.com>"
Add-Paragraph "SMTP_USER authenticates to the outgoing mail server. CONTACT_TO_EMAIL is the recipient inbox and can be the same domain mailbox, another mailbox, or a personal mailbox. CONTACT_FROM_EMAIL should normally use the authenticated domain mailbox or an authorised sender identity, otherwise the SMTP server may reject or rewrite it." "Normal"

Add-Paragraph "Contact API flow" "Heading2"
Add-Table @("Step", "What happens", "Control"), @(
  @("1", "Visitor completes name, email, project type and message.", "React Hook Form and Zod prevent invalid browser submission."),
  @("2", "Browser posts JSON to /api/contact.", "The form shows sending, success or error state."),
  @("3", "Route handler parses the request and validates it again with Zod.", "Server-side validation protects the endpoint even if client JavaScript is bypassed."),
  @("4", "The email content is HTML-escaped and a Nodemailer SMTP transport is created.", "Escaping reduces the risk of untrusted input being inserted into the email HTML."),
  @("5", "Nodemailer sends to CONTACT_TO_EMAIL and sets replyTo to the visitor email.", "The team receives the enquiry and can reply directly to the visitor."),
  @("6", "The API returns success or a configuration/send error.", "The visitor sees an understandable message; exact SMTP credentials are never exposed." )
)

Add-Paragraph "8. Local Development and Build Procedure" "Heading1"
Add-Paragraph "Initial setup" "Heading2"
Add-Code "npm install"
Add-Code "npm run dev"
Add-Paragraph "The development server normally runs at http://localhost:3000. The local network address can be different. The Next.js allowedDevOrigins configuration currently includes 192.168.56.1 to prevent the development cross-origin warning seen during LAN testing." "Normal"

Add-Paragraph "Quality gate before commit or deployment" "Heading2"
Add-Code "npx.cmd tsc --noEmit"
Add-Code "npm.cmd run build"
Add-Paragraph "Run the commands from the project root on Windows. On Linux/Namecheap/GitHub Actions the equivalent commands are npx tsc --noEmit and npm run build. A successful build creates .next; it is not source code and must remain ignored by Git." "Normal"

Add-Paragraph "Key configuration files" "Heading2"
Add-Table @("File", "Reason for it", "Important record"), @(
  @("next.config.js", "Next.js hosting configuration", "Contains allowedDevOrigins for local network testing, images.unoptimized for shared hosting, and trailingSlash. It replaced next.config.ts because cPanel had difficulty loading TypeScript config."),
  @("tailwind.config.js", "Tailwind scanning/theme configuration", "Uses JavaScript CommonJS and replaces tailwind.config.ts for the same shared-hosting compatibility reason."),
  @("postcss.config.js", "CSS transformation configuration", "Enables Tailwind CSS and Autoprefixer."),
  @("server.js", "Namecheap application entry point", "Starts the prebuilt Next.js app using Node's HTTP server and Namecheap-provided PORT/HOSTNAME variables."),
  @(".gitignore", "Protects repository quality", "Ignores node_modules, .next, dist, logs, local environment files, Vercel build metadata and TypeScript build information."),
  @(".env.example", "Safe environment template", "Documents required SMTP variable names using placeholder credentials only."),
  @(".github/workflows/main.yml", "Build and deploy automation", "Uses Node 24, npm install, npm run build, deployment bundle preparation, SSH/rsync upload and remote restart trigger.")
)

Add-Paragraph "9. Hosting and Deployment Record" "Heading1"
Add-Paragraph "Vercel history" "Heading2"
Add-Paragraph "The site was initially deployed to Vercel from GitHub. On mobile, Vercel requested a login because the project/deployment was protected rather than public. The corrective action is to set the Vercel deployment/project privacy configuration so the production deployment is publicly accessible. A Vercel connection does not by itself conflict with Namecheap. The important decision is where hbsols.com DNS points: it must point to one public host for the production domain at a time." "Normal"

Add-Paragraph "Namecheap application model" "Heading2"
Add-Paragraph "The selected production model is Namecheap shared hosting with cPanel's Setup Node.js App on a CloudLinux server. The app does not need a Resend API key because it uses the Namecheap-provided SMTP service via Nodemailer. The Node app needs the built .next output, source, public assets, dependencies, configuration, environment variables and a restart signal." "Normal"

Add-Paragraph "Manual deployment procedure" "Heading2"
Add-Table @("Step", "Action", "Expected result"), @(
  @("1", "In cPanel, open Setup Node.js App and create or edit the HB Solutions application.", "Use Node.js 24, the correct application root such as /home/<cpanel-user>/hbsols, the public URL/domain and server.js as startup file."),
  @("2", "Copy the activation command if Namecheap supplies one, or use cPanel's Run NPM Install button.", "Dependencies install in the application environment."),
  @("3", "Do not rely on a full Next.js production build on the shared server if it hits memory limits.", "The prior build failed with WebAssembly out-of-memory. Build on GitHub Actions/local environment and upload the resulting .next output."),
  @("4", "Upload the deployment bundle to the application root: .next, public, src, package files, JS configs, tsconfig and server.js.", "The app has the required runtime output and source supporting the route handler."),
  @("5", "Set SMTP variables in the Node.js App environment screen.", "Contact API can authenticate and send. SMTP_PASSWORD must remain secret."),
  @("6", "Restart the application from cPanel or create/update tmp/restart.txt.", "CloudLinux restarts the Node process and loads the updated build."),
  @("7", "Open https://hbsols.com and submit a controlled contact form test.", "Site loads publicly and the configured recipient receives the test message." )
)

Add-Paragraph "GitHub Actions deployment workflow" "Heading2"
Add-Paragraph "The workflow runs on a push to main or manually through workflow_dispatch. It uses Node 24, installs dependencies with npm install, runs npm run build, creates a deploy directory, copies the prebuilt .next and required runtime files, uploads with rsync over SSH, installs production-only dependencies remotely and touches tmp/restart.txt." "Normal"
Add-Paragraph "Required GitHub Actions secrets" "Heading2"
Add-Table @("Secret", "Purpose", "Important rule"), @(
  @("NAMECHEAP_HOST", "SSH hostname, for example the Namecheap server hostname.", "Use the SSH host, not the cPanel login URL."),
  @("NAMECHEAP_USER", "cPanel / SSH username.", "This is commonly the cPanel account user, for example hbsoaxwq, not the domain email address."),
  @("NAMECHEAP_PORT", "SSH port.", "Use the SSH port supplied by Namecheap, often 21098. Do not use cPanel port 2083."),
  @("NAMECHEAP_APP_PATH", "Absolute server directory for the Node.js application.", "Example pattern: /home/<cpanel-user>/hbsols. It must match the Node.js application root."),
  @("NAMECHEAP_SSH_KEY", "Full private deployment key.", "Paste the complete private key, including BEGIN and END lines. Do not paste a SHA256 fingerprint or the public key.")
)

Add-Paragraph "SSH key setup needed to complete automation" "Heading2"
Add-Bullet "Generate an ED25519 key pair locally with no passphrase specifically for GitHub Actions deployment."
Add-Bullet "In cPanel: SSH Access -> Manage SSH Keys -> Import Key. Paste the public key, then authorise it."
Add-Bullet "In GitHub repository settings: Secrets and variables -> Actions. Paste the matching private key as NAMECHEAP_SSH_KEY."
Add-Bullet "Test first from the local machine using ssh -i <private-key-file> -p <ssh-port> <cpanel-user>@<host>. The test must succeed before GitHub Actions can succeed."
Add-Bullet "Re-run the workflow only after the key, username, host and port are confirmed. The existing error Permission denied (publickey...) proves network reachability but not key authorisation."

Add-Paragraph "10. Quality Assurance and Regression Test Suite" "Heading1"
Add-Paragraph "The following suite combines acceptance tests and regression checks based on the implemented features and the failures experienced during delivery. Execute the relevant group after each material change, and always run the build group before deployment." "Normal"
Add-Table @("ID", "Test case / steps", "Expected result"), @(
  @("BUILD-01", "Run npx tsc --noEmit from project root.", "Exit code 0. No TypeScript type errors."),
  @("BUILD-02", "Run npm run build with a stable internet connection.", "Next.js production build completes. .next output is created. No missing configuration module or SWC download failure."),
  @("BUILD-03", "Run npm install after changing packages or lock file.", "package.json and package-lock.json stay in sync. npm ci is only used after that condition is met."),
  @("NAV-01", "Open the home page at desktop width and scroll.", "Logo remains left, navigation remains centred, Work With Us remains on the right, sticky header has readable black text and background becomes translucent when scrolled."),
  @("NAV-02", "Hover Services on desktop; open menu on mobile.", "Desktop opens the six-service panel. Mobile shows services in the expanded navigation. No menu blocks other links."),
  @("HERO-01", "Load the root URL with no hash path.", "The page opens at the hero/first section, not the certification section or another scrolled position."),
  @("TECH-01", "Navigate to Tech Stack at desktop and mobile widths.", "All nine groups appear. Each tool is represented with an icon and label. Design & Quality is centred on desktop without empty right-side imbalance."),
  @("WHY-01", "Inspect Why Choose Us at desktop width.", "Agile Methodology is the first card. Seven image panels show in a three-column layout where available, with readable headings/descriptions and no excessive whitespace."),
  @("SDLC-01", "Inspect SDLC at desktop width.", "Seven coloured chevrons render left-to-right: Planning, Requirements Analysis, System Design, Development, Testing, Deployment, Maintenance. Supporting text appears below each phase."),
  @("SDLC-02", "Inspect SDLC at mobile width.", "A vertical, connected stepper replaces the chevron row. All seven phase descriptions remain readable."),
  @("PORT-01", "Open Our Projects.", "The delivery cards show 20+, Client-first and 5+ Years without clipped letters. The project marquee is visible and contains the seven known projects without owner-name/number labels."),
  @("PORT-02", "Click Explore on every project card, then close the dialog.", "Correct project challenge, solution, technology stack and highlights show in the modal. Clicking overlay/close button closes it."),
  @("TEAM-01", "Hover/focus each portrait; then remove hover.", "Name remains visible by default. Roles and biography appear with a dark readable overlay on hover/focus and hide after pointer leaves."),
  @("TEAM-02", "Hover View Team Profiles then leave the profile region.", "Both skills panels appear while the control/panel is hovered and are hidden when the pointer leaves. No individual experience timeline is displayed."),
  @("CERT-01", "Use left/right certificate arrows and dots.", "Only explicit click controls change the active card. Movement is smooth, cards are snap-aligned, issuer names show and owner initials/names are not shown."),
  @("FORM-01", "Submit blank, too-short and invalid email values.", "Browser form displays field-specific validation. No malformed payload is accepted."),
  @("FORM-02", "Submit a valid test message on the production domain.", "Route responds successfully, configured recipient receives an email, From is accepted by SMTP, and Reply-To points to the visitor address."),
  @("ACCESS-01", "Enable reduced motion in OS/browser and reload.", "ThreeScene rotation is stopped or substantially reduced; page remains fully usable."),
  @("ACCESS-02", "Use keyboard Tab/Enter through nav, team cards, project dialog and certificates.", "Focus remains visible, hover-only information is also available through focus where designed, and modal closes correctly."),
  @("DEPLOY-01", "Push a known small source change to main after SSH is configured.", "GitHub Actions completes checkout, install, build, upload, remote dependency install and restart. The new text appears at hbsols.com."),
  @("SEC-01", "Review committed files and repository settings.", "No .env.local, SMTP password, private key, node_modules, .next or large binary build output has been committed.")
)

Add-Paragraph "11. Troubleshooting Q&A and Lessons Learned" "Heading1"
Add-Paragraph "This knowledge base records actual issues encountered during the project, their likely cause, remediation and prevention. Treat it as a reusable pre-flight checklist for later web projects." "Normal"
Add-Table @("Question / symptom", "Cause identified", "Resolution and prevention"), @(
  @("GitHub rejected git push because next-swc.win32-x64-msvc.node was 176.85 MB.", "node_modules was included in Git history. GitHub limits ordinary files to 100 MB.", "Add node_modules to .gitignore. Remove it from tracked history or begin a clean repository as appropriate. Never commit dependencies or build output."),
  @("Next/Tailwind build failed: Cannot find module ../constants from fast-glob.", "The installed node_modules tree was incomplete or corrupted.", "Delete/reinstall dependencies safely from package files. Confirm npm install completes, then rerun dev/build. Keep package-lock committed."),
  @("Vercel deployment asked mobile visitors to log in.", "Vercel deployment protection/project access settings were enabled.", "Make the production deployment public or use a public production URL. Test in an incognito/mobile browser before sharing."),
  @("Next development server showed dist routes-manifest/app-paths-manifest ENOENT.", "The configured output directory/cache was incomplete, stale or not created correctly.", "Stop the dev server, remove only the generated build/cache directory, then restart. Do not manually create a duplicate .next/dist directory if it already exists."),
  @("Next warned about cross-origin requests from 192.168.56.1.", "LAN browser access was not in Next allowedDevOrigins.", "Add the required local network origin to next.config.js allowedDevOrigins, then restart the development server."),
  @("React Client Manifest / segment-explorer module error appeared in dev.", "A Next.js development cache/bundler state became stale after package/config changes.", "Stop the server, clear generated .next cache, run npm install if dependencies changed, then start dev again. Upgrade Next when a stable patched release is available."),
  @("Namecheap Setup Node.js App reported ValueError: Alias is not valid.", "The application URL alias was invalid for CloudLinux/cPanel, commonly due to malformed domain/path input.", "Use the cPanel-approved application URL/path and avoid including an invalid protocol/path format. Ask Namecheap support for the expected alias form if the UI does not accept it."),
  @("Namecheap next build failed because next.config.ts could not find TypeScript.", "cPanel's Node environment attempted to transpile a TypeScript Next configuration without resolving TypeScript reliably.", "Replace next.config.ts with next.config.js. The same conversion was applied to tailwind.config.ts -> tailwind.config.js."),
  @("Namecheap next build failed: WebAssembly.instantiate() Out of memory.", "Shared-hosting CloudLinux LVE memory limits were insufficient for the Next.js build/SWC compiler.", "Build on GitHub Actions or a local machine, upload prebuilt .next, then restart the Node app. Do not repeatedly build on the shared host."),
  @("cPanel said .next could not be created because it already exists.", "The generated folder already existed from a prior build/upload.", "Do not create it again. Replace its contents through the deployment process only after validating the target path."),
  @("npm ci failed in GitHub Actions because @emnapi packages were missing from lock file.", "package.json and package-lock.json were out of sync.", "Run npm install locally, commit the updated package-lock.json and then restore npm ci if desired. The workflow was temporarily changed to npm install."),
  @("npm install failed with Invalid Version in GitHub Actions.", "package-lock.json contained a malformed optional dependency block with no version value.", "Remove/repair the invalid lock entry, run npm install and commit the corrected lock file. Local dry-run install, type check and build must pass before pushing."),
  @("GitHub Action sat waiting for an ubuntu-latest runner.", "GitHub hosted runner capacity/queue delay, not an application fault.", "Wait, cancel/re-run if it remains abnormal, then check GitHub Actions status. No source change is normally required."),
  @("SSH deploy reached rsync but failed Permission denied (publickey...).", "Namecheap rejected the workflow SSH credentials. A fingerprint, public key, wrong username/port, unauthorised key or wrong host may have been used.", "Store the complete matching private key in NAMECHEAP_SSH_KEY, import and authorise its public key in cPanel SSH Access, use cPanel username, correct SSH host and SSH port. Test SSH locally before re-running the workflow."),
  @("git push showed RPC failed / curl 55 and later could not connect to github.com:443.", "Network connectivity was interrupted during a large push; earlier history may also have contained unnecessary large artefacts.", "Restore stable network/VPN/proxy path and retry. Keep repository lightweight by ignoring node_modules, .next, dist and generated archives."),
  @("npm audit suggested a force fix that would install an incompatible Next version.", "Automatic audit remediation can choose breaking dependency changes.", "Do not run npm audit fix --force blindly. Review the proposed version, upgrade Next deliberately to a compatible patched release, rerun type/build tests and deploy a controlled change."),
  @("Does Namecheap SMTP require a Resend API key?", "SMTP and a transactional email API are alternative delivery mechanisms.", "No. With Namecheap SMTP, Nodemailer uses domain-mail credentials. Use Resend only if moving to a third-party transactional email service."),
  @("Should CONTACT_TO_EMAIL equal SMTP_USER?", "Authentication identity and recipient address are separate concepts.", "No. SMTP_USER is the mailbox used to authenticate. CONTACT_TO_EMAIL is wherever enquiries should arrive. CONTACT_FROM_EMAIL should be an authenticated/authorised domain sender.")
)

Add-Paragraph "12. Operating Standards for Future Changes" "Heading1"
Add-Paragraph "Content change procedure" "Heading2"
Add-Bullet "Update the relevant structured data in src/data/siteContent.ts rather than hardcoding new text inside components."
Add-Bullet "Add a new project with an owner, category, honest description, problem, solution, technologies and non-invented highlights. The marquee and modal consume this record automatically."
Add-Bullet "Add a new certification with issuer, skills and an accent colour. Do not add verification URLs or credential IDs unless they are real and permissioned."
Add-Bullet "Add public assets to the correct public/images subfolder and reference them with root-relative paths. Optimise large photographs before commit." 
Add-Bullet "Run BUILD-01 and BUILD-02, then execute the matching visual test cases before committing." 

Add-Paragraph "Deployment change procedure" "Heading2"
Add-Bullet "Create a focused Git commit with a descriptive message. Do not stage .env files, private keys, node_modules, .next, dist or server logs."
Add-Bullet "Push the main branch only after local validation passes. GitHub Actions should build and deploy the same commit." 
Add-Bullet "Open Actions and inspect the complete run. A green build is not enough: verify rsync upload, remote dependency install and restart steps." 
Add-Bullet "Smoke test hbsols.com in a private browser window, desktop and mobile. Submit a controlled contact form message." 
Add-Bullet "If automated deployment is unavailable, use the manual Namecheap deployment procedure and record the reason in this document's next revision." 

Add-Paragraph "Security and governance rules" "Heading2"
Add-Bullet "Use GitHub Secrets and cPanel environment variables for all passwords, API keys and private keys. Never place a secret in siteContent.ts, workflow YAML, screenshots or documentation." 
Add-Bullet "Rotate the SMTP mailbox password and deployment SSH key immediately if either is exposed, copied into a public location or committed by mistake." 
Add-Bullet "Keep Next.js, React, npm packages and server Node.js version under periodic review. Dependency security fixes require compatibility testing, not blind force upgrades." 
Add-Bullet "Confirm website claims, project counts, certification wording and client references are accurate before publication. The current Delivered Projects card displays a positioning statistic of 20+; maintain supporting evidence if that number is retained." 

Add-Paragraph "Appendix A: Repository Map" "Heading1"
Add-Code "src/app/                 App Router entry, layout, global CSS and contact API"
Add-Code "src/components/          Homepage visual and interactive sections"
Add-Code "src/data/siteContent.ts  Central editable consultancy data"
Add-Code "public/images/brand/     Logo and browser/app icons"
Add-Code "public/images/team/      Bilal and Himaas portraits"
Add-Code "public/images/why-choose-us/  Service-quality illustrations"
Add-Code ".github/workflows/       GitHub Actions deployment automation"
Add-Code "server.js                Namecheap production Node server entry point"
Add-Code "next.config.js           Next.js runtime/shared-host configuration"
Add-Code "tailwind.config.js       CSS scanning and visual theme configuration"
Add-Code ".env.example             Safe SMTP environment variable template"

Add-Paragraph "Appendix B: Verified Package Inventory" "Heading1"
Add-Table @("Package", "Recorded version range", "Purpose"), @(
  @("next", "^15.5.18", "Application framework and build system"),
  @("react / react-dom", "^19.0.0", "UI runtime"),
  @("tailwindcss", "^3.4.17", "Utility-first CSS system"),
  @("typescript", "^5.7.3", "Type-safe development"),
  @("framer-motion", "^12.0.0", "UI animation"),
  @("three", "^0.185.1", "3D rendering library"),
  @("@react-three/fiber", "^9.6.1", "React renderer for Three.js"),
  @("@react-three/drei", "^10.7.7", "Three.js helper components"),
  @("lucide-react", "^0.474.0", "Interface icons"),
  @("react-icons", "^5.7.0", "Technology brand icons"),
  @("react-hook-form", "^7.54.2", "Contact form state"),
  @("zod", "^3.24.1", "Form and route data validation"),
  @("@hookform/resolvers", "^3.10.0", "React Hook Form / Zod integration"),
  @("nodemailer", "^9.0.4", "SMTP email delivery"),
  @("gsap / @gsap/react", "^3.12.7 / ^2.1.2", "Installed animation capability; audit/remove if unused")
)

Add-Paragraph "End of Reference" "Heading1"
Add-Paragraph "This document is intentionally operational. Update it when a material change is made to branding, project content, dependencies, hosting, contact delivery, deployment automation or an issue-resolution procedure." "Normal"

$contentTypes = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>
"@

$rootRelationships = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>
"@

$documentRelationships = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>
</Relationships>
"@

$styles = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:sz w:val="22"/></w:rPr></w:rPrDefault></w:docDefaults>
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:before="1600" w:after="300"/></w:pPr><w:rPr><w:b/><w:sz w:val="48"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="500"/></w:pPr><w:rPr><w:sz w:val="28"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="420" w:after="180"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:b/><w:color w:val="3730A3"/><w:sz w:val="32"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="260" w:after="120"/><w:outlineLvl w:val="1"/></w:pPr><w:rPr><w:b/><w:color w:val="4F46E5"/><w:sz w:val="26"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="ListParagraph"><w:name w:val="List Paragraph"/><w:basedOn w:val="Normal"/><w:pPr><w:ind w:left="360" w:hanging="180"/><w:spacing w:after="70"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Callout"><w:name w:val="Callout"/><w:basedOn w:val="Normal"/><w:pPr><w:ind w:left="180" w:right="180"/><w:spacing w:before="140" w:after="180"/><w:shd w:fill="EEF2FF"/><w:pBdr><w:left w:val="single" w:sz="16" w:space="12" w:color="6366F1"/></w:pBdr></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="CodeBlock"><w:name w:val="Code Block"/><w:basedOn w:val="Normal"/><w:pPr><w:ind w:left="240" w:right="240"/><w:spacing w:before="60" w:after="60"/><w:shd w:fill="F3F4F6"/></w:pPr><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/><w:sz w:val="18"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="TableHeader"><w:name w:val="Table Header"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="0"/></w:pPr><w:rPr><w:b/><w:sz w:val="18"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="TableText"><w:name w:val="Table Text"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="0"/><w:spacing w:line="220" w:lineRule="auto"/></w:pPr><w:rPr><w:sz w:val="18"/></w:rPr></w:style>
  <w:style w:type="table" w:styleId="TableGrid"><w:name w:val="Table Grid"/><w:tblPr><w:tblBorders><w:top w:val="single" w:sz="4" w:color="D1D5DB"/><w:left w:val="single" w:sz="4" w:color="D1D5DB"/><w:bottom w:val="single" w:sz="4" w:color="D1D5DB"/><w:right w:val="single" w:sz="4" w:color="D1D5DB"/><w:insideH w:val="single" w:sz="4" w:color="E5E7EB"/><w:insideV w:val="single" w:sz="4" w:color="E5E7EB"/></w:tblBorders></w:tblPr></w:style>
</w:styles>
"@

$footer = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:color w:val="6B7280"/><w:sz w:val="18"/></w:rPr><w:t>HB Solutions Website Execution Reference | Page </w:t></w:r><w:fldSimple w:instr="PAGE"><w:r><w:rPr><w:color w:val="6B7280"/><w:sz w:val="18"/></w:rPr><w:t>1</w:t></w:r></w:fldSimple></w:p>
</w:ftr>
"@

$documentXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    $($body.ToString())
    <w:sectPr>
      <w:footerReference w:type="default" r:id="rId2"/>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1000" w:right="1000" w:bottom="1000" w:left="1000" w:header="500" w:footer="500" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>
"@

$timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
$coreProperties = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>HB Solutions Website Execution, Technical Delivery and Operations Reference</dc:title>
  <dc:subject>Project execution and deployment reference</dc:subject>
  <dc:creator>HB Solutions</dc:creator>
  <cp:keywords>HB Solutions, Next.js, Namecheap, GitHub Actions, SMTP, SDLC, QA</cp:keywords>
  <dc:description>Reference document for the HB Solutions consultancy portfolio website.</dc:description>
  <cp:lastModifiedBy>HB Solutions</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">$timestamp</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">$timestamp</dcterms:modified>
</cp:coreProperties>
"@

$appProperties = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>HB Solutions Documentation Generator</Application>
  <DocSecurity>0</DocSecurity>
  <ScaleCrop>false</ScaleCrop>
  <Company>HB Solutions</Company>
  <LinksUpToDate>false</LinksUpToDate>
  <SharedDoc>false</SharedDoc>
  <HyperlinksChanged>false</HyperlinksChanged>
  <AppVersion>1.0</AppVersion>
</Properties>
"@

New-Item -ItemType Directory -Path $tempRoot -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $tempRoot "_rels") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $tempRoot "docProps") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $tempRoot "word") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $tempRoot "word\_rels") -Force | Out-Null

[System.IO.File]::WriteAllText((Join-Path $tempRoot "[Content_Types].xml"), $contentTypes, [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $tempRoot "_rels\.rels"), $rootRelationships, [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $tempRoot "docProps\core.xml"), $coreProperties, [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $tempRoot "docProps\app.xml"), $appProperties, [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $tempRoot "word\document.xml"), $documentXml, [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $tempRoot "word\styles.xml"), $styles, [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $tempRoot "word\footer1.xml"), $footer, [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $tempRoot "word\_rels\document.xml.rels"), $documentRelationships, [System.Text.UTF8Encoding]::new($false))

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
if (Test-Path $outputPath) { Remove-Item -LiteralPath $outputPath -Force }
$archive = [System.IO.Compression.ZipFile]::Open($outputPath, [System.IO.Compression.ZipArchiveMode]::Create)
$packageEntries = @(
  @{ Name = "[Content_Types].xml"; Path = (Join-Path $tempRoot "[Content_Types].xml") },
  @{ Name = "_rels/.rels"; Path = (Join-Path $tempRoot "_rels\\.rels") },
  @{ Name = "docProps/core.xml"; Path = (Join-Path $tempRoot "docProps\\core.xml") },
  @{ Name = "docProps/app.xml"; Path = (Join-Path $tempRoot "docProps\\app.xml") },
  @{ Name = "word/document.xml"; Path = (Join-Path $tempRoot "word\\document.xml") },
  @{ Name = "word/styles.xml"; Path = (Join-Path $tempRoot "word\\styles.xml") },
  @{ Name = "word/footer1.xml"; Path = (Join-Path $tempRoot "word\\footer1.xml") },
  @{ Name = "word/_rels/document.xml.rels"; Path = (Join-Path $tempRoot "word\\_rels\\document.xml.rels") }
)

foreach ($packageEntry in $packageEntries) {
  $archiveEntry = $archive.CreateEntry($packageEntry.Name, [System.IO.Compression.CompressionLevel]::Optimal)
  $entryStream = $archiveEntry.Open()
  $entryBytes = [System.IO.File]::ReadAllBytes($packageEntry.Path)
  $entryStream.Write($entryBytes, 0, $entryBytes.Length)
  $entryStream.Dispose()
}

$archive.Dispose()
Remove-Item -LiteralPath $tempRoot -Recurse -Force

Write-Output "Created $outputPath"
