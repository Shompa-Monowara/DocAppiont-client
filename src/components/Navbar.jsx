"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Section (Desktop) */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <Image
              src="/logo.png"
              alt="DocAppoint Logo"
              width={36}      
              height={36}      
              className="object-contain rounded-xl"
              priority         
            />
            <span className="font-heading font-extrabold text-xl text-medicalDark tracking-tight">
              Doc<span className="text-medicalDark/80 font-semibold">Appoint</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-medicalDark transition-colors">
              Home
            </Link>
            <Link href="/all-appointments" className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-medicalDark transition-colors">
              All Appointments
            </Link>
            <Link href="/dashboard" className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-medicalDark transition-colors">
              Dashboard
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Link href="/login" className="text-sm font-semibold text-medicalDark hover:text-slate-600 transition-colors px-4 py-2">
                Login
              </Link>
              <Button as={Link} href="/register" className="bg-medicalAccent text-medicalDark font-bold text-sm px-5 rounded-xl shadow-md shadow-medicalAccent/10 min-w-max h-10">
                Register
              </Button>
            </div>
          </div>

          {/* Mobile Hamburger Menu Icon */}
          <div className="flex md:hidden items-center">
            <button onClick={() => setIsOpen(true)} className="text-slate-600 hover:text-medicalDark p-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center">
              <FiMenu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Backdrop Overlay (এখান থেকে ব্লার সরিয়ে শুধু হালকা ডার্ক করা হয়েছে) */}
      <div
        className={`fixed inset-0 bg-slate-900/30 z-50 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
      
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 shrink-0">
            <Image
              src="/logo.png"
              alt="DocAppoint Logo"
              width={30}      
              height={30}      
              className="object-contain rounded-lg"
            />
            <span className="font-heading font-extrabold text-lg text-medicalDark tracking-tight">
              Doc<span className="text-medicalDark/80 font-semibold">Appoint</span>
            </span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="p-2 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-medicalDark transition-colors flex items-center justify-center">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="p-5 flex-1 space-y-2">
          <Link href="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-medicalDark transition-colors">
            Home
          </Link>
          <Link href="/all-appointments" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-medicalDark transition-colors">
            All Appointments
          </Link>
          <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-medicalDark transition-colors">
            Dashboard
          </Link>
        </div>

        {/* Mobile Action Buttons Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50">
          <div className="flex flex-col gap-3">
            <Button 
              as={Link} 
              href="/login" 
              onClick={() => setIsOpen(false)} 
              className="w-full text-slate-700 font-bold border border-slate-300 bg-white hover:bg-slate-100 text-sm h-11 rounded-xl transition-all"
            >
              Login
            </Button>
            <Button 
              as={Link} 
              href="/register" 
              onClick={() => setIsOpen(false)} 
              className="w-full bg-medicalAccent text-medicalDark font-bold text-sm h-11 rounded-xl shadow-md shadow-medicalAccent/5 transition-all"
            >
              Register
            </Button>
          </div>
        </div>

      </div>
    </nav>
  );
}