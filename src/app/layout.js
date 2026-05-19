const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { Plus_Jakarta_Sans, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";


const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});


const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});


export const metadata = {
  title: "DocAppoint | Smart Doctor Appointment Booking System",
  description: "Browse top-rated doctors, book appointments seamlessly, and manage your health schedule securely.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${nunito.variable} h-full antialiased`}
    >
     
      <body >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}