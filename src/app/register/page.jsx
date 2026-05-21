"use client";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi"; 
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
    
    if (form.password.length < 8)
      errs.password = "Minimum 8 characters required";
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
      if (error?.message?.toLowerCase().includes("too short") || error?.message?.toLowerCase().includes("password")) {
        router.push("/login");
      } else {
        toast.error(error?.message || "Registration failed. Please try again.");
      }
      return;
    }
    
    if (data) {
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
    <div className="flex-1 flex items-center justify-center px-4 py-16 bg-[#F9FAFB] sm:px-6 lg:px-8">
      {/* 🌟 কার্ডের সর্বোচ্চ উইডথ বাড়িয়ে 520px করা হয়েছে যাতে চারপাশের স্পেস সুন্দর দেখায় */}
      <div className="w-full max-w-[520px] bg-white rounded-2xl border border-[#E4E7EC] shadow-xl overflow-hidden transition-all">
        
        <div className="h-1" />

        <div className="p-10 md:p-12 flex flex-col items-center">

          {/* Header */}
          {/* 🌟 হেডারের সর্বোচ্চ উইডথ বাড়িয়ে 440px করা হয়েছে */}
          <div className="w-full max-w-[440px] flex flex-col items-center mb-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-md border border-slate-100">
              <Image
                src="/logo.png"
                alt="DocAppoint Logo"
                width={38}
                height={38}
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create Account</h1>
            <p className="text-xs font-medium text-slate-500 mt-1.5">Create your DocAppoint account</p>
          </div>

          {/* Form */}
          {/* 🌟 ফর্ম এলিমেন্টগুলোর উইডথ বাড়িয়ে ও ভেতরের প্যাডিং অ্যাডজাস্ট করে 440px করা হয়েছে */}
          <form onSubmit={onSubmit} className="w-full max-w-[440px] flex flex-col gap-5">

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 pl-0.5">
                Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your full name"
                  {...field("name")}
                  className={`w-full bg-slate-50 rounded-lg pl-4 pr-4 py-3 text-sm text-slate-800 font-medium outline-none border transition-all placeholder:text-slate-400 focus:border-[#023154] focus:ring-2 focus:ring-[#023154]/10 focus:bg-white ${
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

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 pl-0.5">
                Email <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="john@example.com"
                  {...field("email")}
                  className={`w-full bg-slate-50 rounded-lg pl-4 pr-4 py-3 text-sm text-slate-800 font-medium outline-none border transition-all placeholder:text-slate-400 focus:border-[#023154] focus:ring-2 focus:ring-[#023154]/10 focus:bg-white ${
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

            {/* Photo URL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 pl-0.5">
                Photo URL{" "}
                <span className="text-slate-400 font-normal text-xs">(optional)</span>
              </label>
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://..."
                  {...field("image")}
                  className="w-full bg-slate-50 rounded-lg pl-4 pr-4 py-3 text-sm text-slate-800 font-medium outline-none border border-[#D0D5DD] transition-all placeholder:text-slate-400 focus:border-[#023154] focus:ring-2 focus:ring-[#023154]/10 focus:bg-white"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 pl-0.5">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...field("password")}
                  className={`w-full bg-slate-50 rounded-lg pl-4 pr-11 py-3 text-sm text-slate-800 font-medium outline-none border transition-all placeholder:text-slate-400 focus:border-[#023154] focus:ring-2 focus:ring-[#023154]/10 focus:bg-white ${
                    errors.password ? "border-red-400 bg-red-50" : "border-[#D0D5DD]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
              {errors.password ? (
                <p className="text-[12px] text-red-500 font-semibold flex items-center gap-1">
                  <span>⚠</span> {errors.password}
                </p>
              ) : (
                <p className="text-[11px] text-slate-500 font-medium pl-0.5">
                  Min 8 characters, 1 uppercase & 1 lowercase letter
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-1 rounded-lg text-white text-sm font-semibold tracking-wide transition-all ${
                loading
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-[#023154] hover:bg-[#034a7a] active:scale-[0.99] cursor-pointer shadow-md"
              }`}
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          {/* Divider */}
          <div className="w-full max-w-[440px] flex items-center gap-2.5 my-6">
            <div className="flex-1 h-px bg-[#E4E7EC]" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">OR</span>
            <div className="flex-1 h-px bg-[#E4E7EC]" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleSignin}
            className="w-full max-w-[440px] py-3 bg-white rounded-lg border border-[#D0D5DD] text-slate-700 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-[0.99] transition-all shadow-sm"
          >
            <FcGoogle size={18} />
            Continue with Google
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-slate-600 mt-6 font-medium">
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