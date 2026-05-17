"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image"; 

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
 
  const brandColor = "#023154";
  const accentColor = "#2ED8E3";

  return (
    <footer className="bg-slate-50 text-slate-600 pt-16 pb-6 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 items-start pb-12">
         
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
           
              <Image 
                src="/logo.png" 
                alt="DocAppoint Logo"
                width={150} 
                height={40}  
                className="object-contain h-10 w-auto" 
                priority
              />
            </div>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              Book trusted doctors near you, manage appointments, and take charge of your health.
            </p>
          </div>

          
          <div className="flex flex-col md:pl-12 gap-4">
            <h4 
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: brandColor }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-medium text-slate-500">
              <li>
                <Link 
                  href="/" 
                  className="transition-colors duration-200"
                  onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/all-appointments" 
                  className="transition-colors duration-200"
                  onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  All Appointments
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard" 
                  className="transition-colors duration-200"
                  onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

         
          <div className="flex flex-col gap-4">
            <h4 
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: brandColor }}
            >
              Follow Us
            </h4>
            <div className="flex items-center gap-3">
            
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center bg-white rounded-full border border-slate-200 text-slate-500 transition-all duration-200"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = brandColor;
                  e.currentTarget.style.borderColor = accentColor;
                  e.currentTarget.style.boxShadow = `0 4px 6px -1px rgba(0,0,0,0.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '';
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <FaFacebookF className="w-3.5 h-3.5" />
              </a>

            
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center bg-white rounded-full border border-slate-200 text-slate-500 transition-all duration-200"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = brandColor;
                  e.currentTarget.style.borderColor = accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '';
                  e.currentTarget.style.borderColor = '';
                }}
              >
                <FaTwitter className="w-3.5 h-3.5" />
              </a>

             
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center bg-white rounded-full border border-slate-200 text-slate-500 transition-all duration-200"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = brandColor;
                  e.currentTarget.style.borderColor = accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '';
                  e.currentTarget.style.borderColor = '';
                }}
              >
                <FaInstagram className="w-3.5 h-3.5" />
              </a>

             
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center bg-white rounded-full border border-slate-200 text-slate-500 transition-all duration-200"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = brandColor;
                  e.currentTarget.style.borderColor = accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '';
                  e.currentTarget.style.borderColor = '';
                }}
              >
                <FaLinkedinIn className="w-3.5 h-3.5" />
              </a>

              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center bg-white rounded-full border border-slate-200 text-slate-500 transition-all duration-200"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = brandColor;
                  e.currentTarget.style.borderColor = accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '';
                  e.currentTarget.style.borderColor = '';
                }}
              >
                <FaGithub className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

       
        <div className="pt-6 border-t border-slate-200/60 text-center">
          <p className="text-xs text-slate-400 font-medium">
            &copy; {new Date().getFullYear()} DocAppoint. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;