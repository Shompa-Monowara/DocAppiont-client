"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); 

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Appointments", href: "/all-appointments" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
      
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <Image
              src="/logo.png"
              alt="DocAppoint Logo"
              width={34}      
              height={34}      
              className="object-contain rounded-xl"
              priority         
            />
            <span className="font-heading font-extrabold text-xl text-[#023154] tracking-tight">
              Doc<span className="text-[#2ED8E3] font-extrabold">Appoint</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? "text-[#023154] bg-[#023154]/5" 
                      : "text-slate-900 hover:text-[#2ED8E3] hover:bg-slate-50" 
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

         
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Link href="/login" className="text-sm font-bold text-slate-900 hover:text-[#2ED8E3] transition-colors px-4 py-2">
                Login
              </Link>
              <Button 
                as={Link} 
                href="/register" 
                className="bg-[#2ED8E3] text-[#023154] font-extrabold text-sm px-5 rounded-xl shadow-md shadow-[#2ED8E3]/20 min-w-max h-10 hover:opacity-90"
              >
                Register
              </Button>
            </div>
          </div>

       
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setIsOpen(true)} 
              className="text-[#023154] p-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center"
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </div>

   
      <div
        className={`fixed inset-0 bg-slate-900/30 z-50 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

    
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
      
    
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/logo.png"
              alt="DocAppoint Logo"
              width={28}      
              height={28}      
              className="object-contain rounded-lg"
            />
            <span className="font-heading font-extrabold text-lg text-[#023154] tracking-tight">
              Doc<span className="text-[#2ED8E3] font-extrabold">Appoint</span>
            </span>
          </Link>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-2 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-[#023154] transition-colors flex items-center justify-center"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        
        <div className="p-5 flex-1 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-bold transition-all duration-200 ${
                  isActive
                    ? "text-[#023154] bg-[#023154]/5 border-l-4 border-[#023154]" 
                    : "text-slate-900 hover:bg-slate-50 hover:text-[#2ED8E3]" 
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        
        <div className="p-5 border-t border-slate-100 bg-white">
          <div className="flex flex-col gap-3">
           
            <Button 
              as={Link} 
              href="/login" 
              variant="bordered"
              onClick={() => setIsOpen(false)} 
              className="w-full text-[#023154] font-bold border-1.5 border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-sm h-11 rounded-xl transition-all"
            >
              Login
            </Button>
            
           
            <Button 
              as={Link} 
              href="/register" 
              onClick={() => setIsOpen(false)} 
              className="w-full bg-[#2ED8E3] text-[#023154] font-extrabold text-sm h-11 rounded-xl shadow-md shadow-[#2ED8E3]/10 transition-all hover:opacity-90"
            >
              Register
            </Button>
          </div>
        </div>

      </div>
    </nav>
  );
}