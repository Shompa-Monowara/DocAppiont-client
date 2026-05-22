Markdown
# 🩺 DocBooker | Doctor Appointment Booking System

DocBooker is a modern, responsive, and secure Single Page Application (SPA) designed to streamline the process of finding and booking doctor appointments. Users can explore top-rated specialists, view comprehensive schedules, securely manage their bookings, and update their personal profiles through an intuitive dashboard.

🌍 **Live Site URL:** (https://docappiont-clinet.vercel.app/) 

---

## 🚀 Key Features

* **Dynamic Doctor Directory & Real-time Search:** Browse a fully responsive list of verified medical specialists with a built-in interactive search engine that allows users to instantly filter appointments by Doctor Name.
* **Secure Session-Based Authentication:** Power-packed with **Better Auth (JWT/Session)** including strict client-side password validation rules (minimum 6 characters, at least 1 uppercase and 1 lowercase letter) alongside one-click Social Login integration.
* **Comprehensive CRUD Dashboard:** Private, authenticated user space to monitor personalized bookings where patients can seamlessly modify appointment parameters (date, time, phone, patient notes) or cancel bookings with instantaneous UI updates.
* **Advanced SEO & Deep Metadata Optimization:** Custom metadata tags dynamically mapped across all application routes to maximize SEO indexing, performance monitoring, and shareable link previews.
* **Zero-Reload State Persistence:** Bulletproof private route architecture that prevents logged-in users from being forcefully redirected back to the login page upon browser hard-refreshes or direct deep-linking.

---

## 🛠️ Technology Stack Used

### Client Side (Frontend)
* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **State Management & Icons:** React Hooks (`useState`, `useEffect`), React Icons (`fi`, `fa`)
* **Authentication Client:** Better Auth Client SDK
* **Toasts & Notifications:** React Hot Toast (No default window alerts used)

### Server Side (Backend)
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via native driver / Mongoose)
* **Authentication:** Better Auth Server Kit with Session/JWT storage

---
