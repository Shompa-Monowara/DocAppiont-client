"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button, Avatar } from "@heroui/react";
import { FiMenu, FiX } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { MdLogin } from "react-icons/md";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        }
      }
    });
  };

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
              DocAppoint
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
                      ? "text-[#023154] bg-[#023154]/10"
                      : "text-slate-600 hover:text-[#023154] hover:bg-[#023154]/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

         
          <ul className="hidden md:flex items-center gap-4">
            {isPending ? (
              <li>
                <div className="w-24 h-9 bg-slate-100 animate-pulse rounded-xl" />
              </li>
            ) : user ? (
              <>
                <li>
                  <Avatar>
                    <Avatar.Image referrerPolicy="no-referrer" alt={user.name} src={user?.image} />
                    <Avatar.Fallback>{user.name?.charAt(0)}</Avatar.Fallback>
                  </Avatar>
                </li>
                <li>
                  <Button
                    onClick={handleSignOut}
                    className="text-slate-600 font-bold text-sm px-4 rounded-xl h-10 hover:bg-red-50 transition-colors bg-transparent"
                  >
                    <MdLogin /> Logout
                  </Button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-[#023154] transition-colors px-4 py-2">
                  Login
                </Link>
              </li>
            )}
            
           
            <li>
              <Link href="/register">
                <Button className="bg-[#023154] text-white font-extrabold text-sm px-5 rounded-xl shadow-md shadow-[#023154]/20 min-w-max h-10 hover:bg-[#034a7a] transition-colors">
                  Register
                </Button>
              </Link>
            </li>
          </ul>

        
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="text-[#023154] p-2 rounded-xl hover:bg-[#023154]/5 transition-colors flex items-center justify-center"
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
            <Image src="/logo.png" alt="DocAppoint Logo" width={28} height={28} className="object-contain rounded-lg" />
            <span className="font-heading font-extrabold text-lg text-[#023154] tracking-tight">
              DocAppoint
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-xl hover:bg-[#023154]/5 text-slate-500 hover:text-[#023154] transition-colors"
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
                    ? "text-[#023154] bg-[#023154]/10 border-l-4 border-[#023154]"
                    : "text-slate-600 hover:bg-[#023154]/5 hover:text-[#023154]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        
        <div className="p-5 border-t border-slate-100 bg-white">
          <ul className="flex flex-col gap-3 w-full">
            {isPending ? (
              <li>
                <div className="w-full h-11 bg-slate-100 animate-pulse rounded-xl" />
              </li>
            ) : user ? (
              <>
                <li className="flex items-center gap-3 w-full px-2 py-1">
                  <Avatar>
                    <Avatar.Image referrerPolicy="no-referrer" alt={user.name} src={user?.image} />
                    <Avatar.Fallback>{user.name?.charAt(0)}</Avatar.Fallback>
                  </Avatar>
                  <span className="text-sm font-bold text-slate-900 truncate">{user?.name || "User"}</span>
                </li>
                <li className="w-full">
                  <Button
                    onClick={() => { handleSignOut(); setIsOpen(false); }}
                    className="w-full text-slate-600 font-bold text-sm h-11 rounded-xl hover:bg-red-50 transition-all bg-transparent"
                  >
                    <MdLogin /> Logout
                  </Button>
                </li>
              </>
            ) : (
              <li className="w-full">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="bordered"
                    className="w-full text-[#023154] font-bold border-1.5 border-[#023154]/20 bg-white hover:bg-[#023154]/5 text-sm h-11 rounded-xl transition-all"
                  >
                    <MdLogin /> Login
                  </Button>
                </Link>
              </li>
            )}

            
            <li className="w-full">
              <Link href="/register" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-[#023154] text-white font-extrabold text-sm h-11 rounded-xl shadow-md shadow-[#023154]/20 transition-all hover:bg-[#034a7a]">
                  Register
                </Button>
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}