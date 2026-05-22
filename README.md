# 🩺 DocBooker - Doctor Appointment Booking System

DocBooker is a modern, responsive, and secure Single Page Application (SPA) built to simplify finding and booking doctor appointments. Patients can seamlessly browse medical specialists, view detailed profiles, make secure bookings, and manage their health schedules directly through an intuitive personal dashboard.

🌍 **Live Website Link:** [https://your-live-project-link.vercel.app](https://your-live-project-link.vercel.app) *(Replace this with your actual Vercel deployment link)*

---

## ✨ Key Features

* **Real-time Appointment Search:** Includes an interactive search system on the 'All Appointments' page, allowing users to filter and find their preferred doctors instantly by typing the doctor's name.
* **Secure Authentication & Registration:** Powered by **Better Auth (JWT/Session)** for tight security. It features strict client-side password validation (minimum 6 characters, requiring at least 1 uppercase and 1 lowercase letter) along with quick Google/GitHub social login integration.
* **Dynamic User Dashboard (Full CRUD):** Logged-in users get a dedicated space to manage their personal appointments. They can update booking details (date, time, phone number, and notes) or cancel an appointment with instantaneous, zero-reload UI updates.
* **Instant Profile Management:** Through the dashboard's profile section, users can update their displayed name and profile picture URL, reflecting the changes immediately across the application without requiring a page refresh.
* **State Persistence & Clean Navigation:** Features an advanced private routing system that ensures logged-in users never get forcefully redirected back to the login page when reloading or deep-linking. Optimized with accurate metadata on every route for improved SEO.

---

## 🛠️ Tech Stack Used

### Frontend (Client Side)
* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS (For fluid, fully mobile-responsive layouts)
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Authentication:** Better Auth Client SDK
* **Notifications:** React Hot Toast (Zero default browser alert popups used)

### Backend (Server Side)
* **Runtime Environment:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB
* **Local Backend Environment:** Running on `http://localhost:5000`

---

