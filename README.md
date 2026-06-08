# BioWave Support Hub

A modern, clinical-grade registration and support portal built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**. Designed for local healthcare NGOs to coordinate patient assistance requests, process volunteer enrollments, track case concerns, and provide real-time information retrieval via an authorized rule-based assistant.

---

## 🎨 Visual System & Architecture

The application adopts standard Swiss-inspired typography, utilizing high-contrast UI cards, spacious negative spacing, and subtle micro-animations powered by `motion`:

*   **Space Grotesk** for prominent headers to convey a professional and clean presentation.
*   **Inter** sans-serif font for highly legible clinical descriptions.
*   **JetBrains Mono** for status flags, time metrics, and structural logs.
*   **Emerald & Teal Accent Theme** to promote a clean and trustworthy healthcare aesthetic.

---

## 🚀 Key Functional Modules

### 1. Advanced Interactive Chatbot Engine
Located on the right sidebar, the Assistant Helpdesk Bot runs a deterministic local rule matching structure matching the user's requirements:
*   `register` ➔ Registration instructions.
*   `volunteer` ➔ Volunteer enrollment details.
*   `services` ➔ Healthcare, education, and NGO program details.
*   `help` ➔ Instructions to submit cases and get duty doctor attention.
*   `contact` ➔ Reachable contact coordinates at `support@healthcare.org`.
*   Includes **Quick Actions** pill buttons for one-tap input and an animated chat history log.

### 2. Multi-Tab Enrollment Form
A versatile intake form that splits cleanly into:
*   **Patient Registration Form**: Tracks required outpatient settings.
*   **Volunteer Enrollment Form**: Registers credentials and specialized medical cohorts.
*   **Urgent Concern Form**: Routes serious medical cases directly into the active registry stream with custom helper texts.

### 3. Dynamic Clinical Dashboard metrics
Calculates cumulative counts of active patients, volunteers, pending cases, and NGO response rates based on dynamic inputs paired with clinical baseline standards.

### 4. Interactive Live Registry List
A dedicated panel showing active registry files with complete offline state synchronization (`localStorage`). Admins can:
*   Filter, review, and progress file statuses (`Pending` ➔ `Reviewed` ➔ `Approved/Active`).
*   Permanently delete outdated or processed submissions using the secure bin control.

---

## 🛠️ Project Structure

```bash
├── index.html            # Core entry shell
├── package.json          # Dependencies & execution scripts
├── vite.config.ts        # Custom Vite and Tailwind plugins config
├── src/
│   ├── main.tsx          # React DOM entry mount
│   ├── App.tsx           # Global hub layout & state coordinator
│   ├── index.css         # Typography configuration & Tailwind styles
│   ├── types.ts          # Centralized TypeScript models
│   └── components/
│       ├── Chatbot.tsx         # Dedicated helper chat assistant
│       ├── SupportForm.tsx     # Intake forms with smooth success handlers
│       ├── DashboardStats.tsx  # Dynamic numerical metrics calculator
│       └── SubmissionsList.tsx # Interactive table database for submissions
```

---

## ⚙️ Development Setup

To run this application locally, follow these instructions:

### Installation
Install the necessary npm modules:
```bash
npm install
```

### Run Dev Server
Start the client-side dev environment:
```bash
npm run dev
```

### Build Production File
To generate a fully optimized, production-grade static build output in `dist/`:
```bash
npm run build
