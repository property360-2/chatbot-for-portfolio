<!--
Purpose: Lists the highlighted case studies, professional projects, and engineering work created by Jun Alvior.
What it contains: Descriptions of systems (DocuMind AI, Automation Pick-up, Gym Portal, AI Assistant) including features, business value, and tech stacks.
How it fits into the broader system: Read at startup by the backend and fed to the LLM agent to answer questions about projects.
-->

# Projects

## 1. Automation Pick-up Service (Fullstack)
A comprehensive scheduling and operational workflow automation pipeline that coordinates real-time tasks, automates communication triggers, and syncs business calendars and databases automatically.
- **Problem Resolved (Pain Fixed)**: Manual spreadsheet tracking, stock sync delays, repetitive manual email follow-ups, date scheduling conflicts, and operational drag.
- **Details**: Replaced slow, error-prone manual spreadsheets with a high-performance inventory system. Reduced administrative overhead by 90% via automated Google Sheets synchronization and real-time email notifications.
- **Tech Stack**: Firebase, HubSpot API, Google Calendar API integrations, Node.js.

---

## 2. OJT Daily Journal System (Tools)
A streamlined student log tracking and coordinator audit platform designed to track daily journals and student hours.
- **Problem Resolved (Pain Fixed)**: Messy paper log sheets, lost physical documents, and slow manual auditing processes for coordinators.
- **Details**: Streamlined student log tracking and coordinator audits. Replaced physical paper log sheets with a secure, tamper-proof digital system, saving advisors 80% of their manual auditing hours.
- **Tech Stack**: HTML, CSS, JavaScript (Frontend-based standalone auditing tool with local persistence).

---

## 3. tagForge: Enterprise AI SEO & Metadata Suite (Fullstack)
A full-stack, enterprise-grade application for SEO generation and metadata synthesis.
- **Problem Resolved (Pain Fixed)**: High hosting costs, manual metadata synthesis, API limits, and complex CORS/OAuth configurations.
- **Details**: Consolidated a full-stack Next.js and Express.js system under a single domain rewrite to bypass CORS and eliminate server costs. Integrated high-throughput Groq Llama-3 endpoints to deliver sub-second metadata syntheses under a secure Stripe subscription tier.
- **Tech Stack**: Next.js, Express.js, Groq API (Llama-3), Stripe, CORS rewrites.

---

## 4. Autonomous Client Acquisition Scraper & Operations Control Center (Fullstack)
An autonomous, multi-source lead acquisition pipeline and operations control dashboard that sweeps job listings, rates them with an intelligent LLM intent-scoring engine, and drafts custom pitches in under 2 minutes.
- **Problem Resolved (Pain Fixed)**: Sifting thousands of listings manually, low-intent "gigs" or spam posts, and outreach fatigue from drafting custom pitch emails.
- **Details**: Engineered an autonomous lead harvester combining HackerNews REST pulls, Craigslist RSS sweeps, and Google Maps scraper scripts. Integrates Groq AI model synthesis to automatically construct custom high-value pitch drafts inside a multi-tab Streamlit dashboard. Utilizes SQLModel ORM to manage SQLite database transactions and thread-safe callbacks for state preservation.
- **Tech Stack**: Python 3.12, Playwright (Headless Chromium), Streamlit, SQLModel, SQLite, Groq API (Llama-3-70B).

---

## 5. Intelligent Knowledge Base & Document Automation (DocuMind AI) (Fullstack)
An intelligent AI-powered document parsing agent and operations dashboard that turns dense business documents into a searchable, interactive knowledge base.
- **Problem Resolved (Pain Fixed)**: High amount of manual hours spent reading long, dense PDFs and technical documents, and manual data extraction from invoices.
- **Details**: Integrated Artificial Intelligence to turn dense company PDFs, manuals, and documents into a searchable "Internal Brain" using RAG (Retrieval-Augmented Generation) architectures. Perfect for legal, real estate, or customer service teams who need accurate answers from their archives in seconds.
- **Tech Stack**: React, Node.js, AI APIs, RAG architecture, vector search, custom secure databases.

---

## 6. Client Management & Progress Tracking Dashboard (Gym Project) (Fullstack)
A fully integrated administration and dashboard analytics portal designed to manage memberships, track attendance, and provide detailed operational overhead breakdowns.
- **Problem Resolved (Pain Fixed)**: Leaked subscription revenue, slow member check-ins, untracked customer logs, and scattered spreadsheet errors.
- **Details**: Built a secure, database-driven portal that tracks user metrics and performance. Applicable for fitness businesses, personal trainers, or rehab clinics looking to digitize client progress and eliminate paperwork.
- **Tech Stack**: Django (Python), PostgreSQL, React, Tailwind CSS.

---

## 7. Tagawasak ng Syudad (GameDev)
An interactive 3D city-destroyer sandbox game running completely in the web browser.
- **Problem Resolved (Pain Fixed)**: Heavy, sluggish visual code rendering and unoptimized audio engines in web-based games.
- **Details**: An interactive 3D city-destroyer sandbox running at a locked, buttery-smooth 60FPS. Uses procedural Web Audio and custom canvas graphics, demonstrating extreme rendering optimization without heavy library overhead.
- **Tech Stack**: HTML5 Canvas, Web Audio API, Vanilla JavaScript.

---

## 8. Precision Scrollytelling Gallery (Frontend)
An immersive, visual scrolling journey engineered with responsive animations to display high-impact products or narratives.
- **Problem Resolved (Pain Fixed)**: Low user engagement, boring static layouts, and high drop-offs on static product/explanation pages.
- **Details**: An immersive visual scrolling journey engineered with responsive animations. Increases user retention by turning complex product mechanics into highly engaging, interactive narrative flows.
- **Tech Stack**: Next.js, GSAP/Anime.js, Tailwind CSS, TypeScript.

---

## 9. Time-Tracking & Resource Allocation Tool (Study Tracker) (Tools)
An interactive time-management and resource allocation logging application.
- **Problem Resolved (Pain Fixed)**: Unproductive learning or working sessions, lack of visual productivity metrics, and untracked hours.
- **Details**: Developed an interactive time-management application. This system can be adapted for service-based businesses (consultants, contractors, agencies) to track billable hours, monitor project timelines, and optimize team productivity.
- **Tech Stack**: Python (Django), SQLite, HTML, CSS.

---

## 10. Mind Map Maker (Tools)
A high-response conceptual design canvas built for rapid brainstorming.
- **Problem Resolved (Pain Fixed)**: Clunky whiteboard tools, slow drawing tools, and loss of raw brainstorm ideas on browser refresh or crash.
- **Details**: A high-response conceptual design canvas built for rapid brainstorming. Keeps state persistently stored locally in real-time, preventing loss of intellectual property during offline sessions.
- **Tech Stack**: HTML5 Canvas, JavaScript, LocalStorage persistence.

---

## 11. Solar System (Frontend)
An immersive, interactive space exploration educational platform.
- **Problem Resolved (Pain Fixed)**: Sluggish, CPU-heavy rendering and unoptimized asset delivery on educational web interactives.
- **Details**: Combines fluid procedural SVG paths with CSS-only animations to achieve flawless performance on low-end mobile hardware.
- **Tech Stack**: Astro, HTML, SVG paths, CSS-only animations.

---

## 12. GateKeeper: IoT RFID Membership Management System (IoT & Fullstack)
An enterprise-grade RFID-based physical access control and membership tracking system integrating hardware, database events, and real-time cloud communications.
- **Problem Resolved (Pain Fixed)**: Manual attendance logging, membership abuse/sharing, lack of real-time monitoring for staff, and customer entry lockouts during network outages.
- **Details**: Developed custom ESP32 scanner firmware integrating an MFRC522 RFID reader over SPI. Programmed real-time HTTPS validation requests to Supabase (using a PostgreSQL stored procedure/RPC `validate_scan` that verifies membership status, determines entry/exit logging, and returns JSON summaries). Designed a non-blocking LittleFS offline queue on the ESP32 that buffers UIDs locally during WiFi disconnects and auto-syncs when online, preventing member lockouts. Integrated local WebSockets on the ESP32 to broadcast card taps to staff in real-time, coupled with an admin-authenticated portal. Built n8n cloud automation flows to handle daily membership expirations and route invalid scan alerts directly to a Telegram bot.
- **Tech Stack**: ESP32, C/C++ (Arduino IDE), Supabase (PostgreSQL RPC & RLS), n8n Cloud, Telegram Bot API, HTML5, Vanilla CSS/JS, WebSockets, LittleFS, Vercel, Git.

