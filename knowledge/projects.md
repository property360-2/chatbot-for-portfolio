<!--
Purpose: Lists the highlighted case studies, professional projects, and engineering work created by Jun Alvior.
What it contains: Descriptions of systems including features, business value, and tech stacks.
How it fits into the broader system: Read at startup by the backend and fed to the LLM agent to answer questions about projects.
-->

# Projects

## 1. Automation Pick-up Service (Fullstack)
A comprehensive scheduling and operational workflow automation pipeline that coordinates real-time tasks, automates communication triggers, and syncs business calendars and databases automatically.
- **Problem Resolved (Pain Fixed)**: Manual spreadsheet tracking, stock sync delays, repetitive manual email follow-ups, date scheduling conflicts, and operational drag.
- **Details**: Replaced slow, error-prone manual spreadsheets with a high-performance inventory system. Reduced administrative overhead by 90% via automated Google Sheets synchronization and real-time email notifications.
- **Tech Stack**: Firebase, HubSpot API, Google Calendar API integrations, Node.js.
- **GitHub**: https://github.com/property360-2/automation-pick-up-service

---

## 2. RFID IoT Membership Scanner & Automation Integration (GateKeeper) (IoT & Fullstack)
An enterprise-grade RFID-based physical access control and membership tracking system integrating hardware, database events, and real-time cloud communications.
- **Problem Resolved (Pain Fixed)**: Manual attendance logging, membership abuse/sharing, lack of real-time monitoring for staff, and customer entry lockouts during network outages.
- **Details**: Developed custom ESP32 scanner firmware integrating an MFRC522 RFID reader over SPI. Programmed real-time HTTPS validation requests to Supabase (using a PostgreSQL stored procedure/RPC `validate_scan` that verifies membership status, determines entry/exit logging, and returns JSON summaries). Designed a non-blocking LittleFS offline queue on the ESP32 that buffers UIDs locally during WiFi disconnects and auto-syncs when online, preventing member lockouts. Integrated local WebSockets on the ESP32 to broadcast card taps to staff in real-time. Built n8n cloud automation flows to handle daily membership expirations and route invalid scan alerts directly to a Telegram bot.
- **Tech Stack**: ESP32, C/C++ (Arduino IDE), Supabase (PostgreSQL RPC & RLS), n8n Cloud, Telegram Bot API, HTML5, Vanilla CSS/JS, WebSockets, LittleFS, Vercel, Git.
- **GitHub**: https://github.com/property360-2/quick-portfolio

---

## 3. Academic Compliance & Audit Portal (OJT Daily Journal) (Tools & Fullstack)
A streamlined student log tracking and coordinator audit platform designed to track daily journals and student hours.
- **Problem Resolved (Pain Fixed)**: Messy paper log sheets, lost physical documents, and slow manual auditing processes for coordinators.
- **Details**: Streamlined student log tracking and coordinator audits. Replaced physical paper log sheets with a secure, tamper-proof digital system, saving advisors 80% of their manual auditing hours. Engineered a native mailto reminder engine that compiles pre-formatted email drafts of missed schedules to students client-side.
- **Tech Stack**: HTML, CSS, JavaScript (Frontend-based standalone auditing tool with local persistence), Firebase Auth, Cloud Firestore, GitHub Pages.
- **GitHub**: https://github.com/property360-2/ojt-journals

---

## 4. tagForge: Enterprise AI SEO & Metadata Suite (Fullstack)
A full-stack, enterprise-grade application for SEO generation and metadata synthesis.
- **Problem Resolved (Pain Fixed)**: High hosting costs, manual metadata synthesis, API limits, and complex CORS/OAuth configurations.
- **Details**: Consolidated a full-stack Next.js and Express.js system under a single domain rewrite to bypass CORS and eliminate server costs. Integrated high-throughput Groq Llama-3 endpoints to deliver sub-second metadata syntheses under a secure Stripe subscription tier.
- **Tech Stack**: Next.js, Express.js, Groq API (Llama-3), Stripe, CORS rewrites.
- **GitHub**: https://github.com/property360-2/seo-project

---

## 5. Autonomous Client Acquisition Scraper & Operations Control Center (Fullstack)
An autonomous, multi-source lead acquisition pipeline and operations control dashboard that sweeps job listings, rates them with an intelligent LLM intent-scoring engine, and drafts custom pitches in under 2 minutes.
- **Problem Resolved (Pain Fixed)**: Sifting thousands of listings manually, low-intent "gigs" or spam posts, and outreach fatigue from drafting custom pitch emails.
- **Details**: Engineered an autonomous lead harvester combining HackerNews REST pulls, Craigslist RSS sweeps, and Google Maps scraper scripts. Integrates Groq AI model synthesis to automatically construct custom high-value pitch drafts inside a multi-tab Streamlit dashboard. Utilizes SQLModel ORM to manage SQLite database transactions and thread-safe callbacks for state preservation.
- **Tech Stack**: Python 3.12, Playwright (Headless Chromium), Streamlit, SQLModel, SQLite, Groq API (Llama-3-70B).
- **GitHub**: https://github.com/property360-2/web-scraper-for-client-acquisition

---

## 6. Intelligent Knowledge Base & Document Automation (Tropang AI) (Fullstack)
An intelligent AI-powered document parsing agent and operations dashboard that turns dense business documents into a searchable, interactive knowledge base.
- **Problem Resolved (Pain Fixed)**: High amount of manual hours spent reading long, dense PDFs and technical documents, and manual data extraction from invoices.
- **Details**: Integrated Artificial Intelligence to turn dense company PDFs, manuals, and documents into a searchable "Internal Brain" using RAG (Retrieval-Augmented Generation) architectures. Features hybrid BM25 and vector search, LangChain routing, and failover model switching (Llama 3.1, Mixtral, Gemma).
- **Tech Stack**: React, Next.js 15, Node.js, LangChain, Firebase, RAG architecture, vector search, custom secure databases.
- **GitHub**: https://github.com/property360-2/quick-portfolio

---

## 7. Fitness CRM & Client Metrics Dashboard (Gym Project) (Fullstack)
A fully integrated administration and dashboard analytics portal designed to manage memberships, track attendance, and provide detailed operational overhead breakdowns.
- **Problem Resolved (Pain Fixed)**: Leaked subscription revenue, slow member check-ins, untracked customer logs, and scattered spreadsheet errors.
- **Details**: Built a secure, database-driven portal that tracks user metrics and performance. Applicable for fitness businesses, personal trainers, or rehab clinics looking to digitize client progress and eliminate paperwork.
- **Tech Stack**: Django (Python), PostgreSQL, React, Tailwind CSS.
- **GitHub**: https://github.com/property360-2/vibe

---

## 8. Local-First School Attendance Management System (IoT & Fullstack)
A robust local-first network attendance monitoring scanner designed for locations with unstable internet connections.
- **Problem Resolved (Pain Fixed)**: Hardware scanning system failures during WAN outages and high cloud API database sync latencies.
- **Details**: Built an ESP32 firmware reader that captures RFID taps, validates student state, and communicates directly with a local Express.js PC server. Attendance logs are stored locally using better-sqlite3 databases to bypass external dependency networks. Integrates an active SSD1306 OLED screen display, buzzer validation signals, and JWT-authenticated administrator endpoints.
- **Tech Stack**: ESP32, C/C++ (Arduino IDE), Express.js, Better-SQLite3, WebSockets, OLED, Buzzers, JWT.
- **GitHub**: https://github.com/property360-2/attendance-management-system-school

