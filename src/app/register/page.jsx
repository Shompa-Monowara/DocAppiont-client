"use client";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { FiUser, FiMail, FiLock, FiImage, FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import Image from "next/image";

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ name: "", email: "", image: "", password: "" });

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email))
      errs.email = "Enter a valid email address";
    if (form.password.length < 6)
      errs.password = "Minimum 6 characters required";
    else if (!/[A-Z]/.test(form.password))
      errs.password = "Must contain at least 1 uppercase letter";
    else if (!/[a-z]/.test(form.password))
      errs.password = "Must contain at least 1 lowercase letter";
    return errs;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      toast.error("Please fix the errors before submitting.");
      return;
    }
    setErrors({});
    setLoading(true);

    const { data, error } = await authClient.signUp.email({
      email: form.email,
      password: form.password,
      name: form.name,
      image: form.image,
    });

    setLoading(false);

    if (error) {
      toast.error(error?.message || "Registration failed. Please try again.");
      return;
    }
    if (data) {
      toast.success("Account created successfully! Please login.");
      router.push("/login");
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await authClient.signIn.social({ provider: "google" });
      router.push("/");
    } catch {
      toast.error("Google sign-up failed. Please try again.");
    }
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16 bg-white sm:px-6 lg:px-8">

      <div className="w-full max-w-[420px] bg-white rounded-2xl border border-[#E4E7EC] shadow-md overflow-hidden">

        
        <div className="h-1" />

        <div className="p-6 md:p-8 flex flex-col items-center">

         
          <div className="w-full max-w-[320px] flex flex-col items-center mb-6">
            <div className="w-12 h-12 rounded-xl  flex items-center justify-center mb-3 shadow-sm">
              <Image
                src="/logo.png"
                alt="DocAppoint Logo"
                width={34}
                height={34}
                className="object-contain"
              />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Create Account</h1>
            <p className="text-xs font-medium text-slate-500 mt-1">Create your DocAppoint account</p>
          </div>

          
          <form onSubmit={onSubmit} className="w-full max-w-[320px] flex flex-col gap-4">

         
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 pl-0.5">
                Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-3.5 h-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Your full name"
                  {...field("name")}
                  className={`w-full bg-slate-50 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-slate-800 font-medium outline-none border transition-all placeholder:text-slate-400 focus:border-[#023154] focus:ring-2 focus:ring-[#023154]/10 focus:bg-white ${
                    errors.name ? "border-red-400 bg-red-50" : "border-[#D0D5DD]"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-[12px] text-red-500 font-semibold flex items-center gap-1">
                  <span>⚠</span> {errors.name}
                </p>
              )}
            </div>

           
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 pl-0.5">
                Email <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-3.5 h-3.5 pointer-events-none" />
                <input
                  type="email"
                  placeholder="john@example.com"
                  {...field("email")}
                  className={`w-full bg-slate-50 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-slate-800 font-medium outline-none border transition-all placeholder:text-slate-400 focus:border-[#023154] focus:ring-2 focus:ring-[#023154]/10 focus:bg-white ${
                    errors.email ? "border-red-400 bg-red-50" : "border-[#D0D5DD]"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-[12px] text-red-500 font-semibold flex items-center gap-1">
                  <span>⚠</span> {errors.email}
                </p>
              )}
            </div>

           
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 pl-0.5">
                Photo URL{" "}
                <span className="text-slate-400 font-normal text-xs">(optional)</span>
              </label>
              <div className="relative">
                <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-3.5 h-3.5 pointer-events-none" />
                <input
                  type="url"
                  placeholder="https://..."
                  {...field("image")}
                  className="w-full bg-slate-50 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-slate-800 font-medium outline-none border border-[#D0D5DD] transition-all placeholder:text-slate-400 focus:border-[#023154] focus:ring-2 focus:ring-[#023154]/10 focus:bg-white"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 pl-0.5">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-3.5 h-3.5 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...field("password")}
                  className={`w-full bg-slate-50 rounded-lg pl-9 pr-9 py-2.5 text-sm text-slate-800 font-medium outline-none border transition-all placeholder:text-slate-400 focus:border-[#023154] focus:ring-2 focus:ring-[#023154]/10 focus:bg-white ${
                    errors.password ? "border-red-400 bg-red-50" : "border-[#D0D5DD]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                </button>
              </div>
              {errors.password ? (
                <p className="text-[12px] text-red-500 font-semibold flex items-center gap-1">
                  <span>⚠</span> {errors.password}
                </p>
              ) : (
                <p className="text-[11px] text-slate-500 font-medium">
                  Min 6 characters, 1 uppercase & 1 lowercase letter
                </p>
              )}
            </div>

           
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 mt-1 rounded-lg text-white text-sm font-semibold tracking-wide transition-all ${
                loading
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-[#023154] hover:bg-[#034a7a] active:scale-[0.99] cursor-pointer"
              }`}
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          {/* Divider */}
          <div className="w-full max-w-[320px] flex items-center gap-2.5 my-4">
            <div className="flex-1 h-px bg-[#E4E7EC]" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">OR</span>
            <div className="flex-1 h-px bg-[#E4E7EC]" />
          </div>

         
          <button
            type="button"
            onClick={handleGoogleSignin}
            className="w-full max-w-[320px] py-2.5 bg-white rounded-lg border border-[#D0D5DD] text-slate-700 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-[0.99] transition-all"
          >
            <FcGoogle size={16} />
            Continue with Google
          </button>

         
          <p className="text-center text-sm text-slate-600 mt-5 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-[#023154] font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;