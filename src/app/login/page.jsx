"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import Image from "next/image";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ email: "", password: "" });

  const validate = () => {
    const errs = {};
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email))
      errs.email = "Enter a valid email address";
    if (!form.password) errs.password = "Password is required";
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

    const { data, error } = await authClient.signIn.email({
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (error) {
      toast.error(error?.message || "Login failed. Check your credentials.");
      return;
    }

    if (data) {
      toast.success("Login successful!");
      const redirectTo = searchParams.get("redirect") || "/";
      router.push(redirectTo);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await authClient.signIn.social({ provider: "google" });
      const redirectTo = searchParams.get("redirect") || "/";
      router.push(redirectTo);
    } catch {
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16 bg-white sm:px-6 lg:px-8">

      <div className="w-full max-w-[380px] bg-white rounded-2xl border border-[#E4E7EC] shadow-md overflow-hidden">

        {/* Top accent bar */}
        <div className="h-1 " />

        <div className="p-6 md:p-8 flex flex-col items-center">

          {/* Header */}
          <div className="w-full max-w-[320px] flex flex-col items-center mb-2">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-sm">
              <Image
                src="/logo.png"
                alt="DocAppoint Logo"
                width={34}
                height={34}
                className="object-contain"
              />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Login</h1>
            <p className="text-xs font-medium text-slate-400 mt-1">Welcome back to DocAppoint</p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="w-full max-w-[320px] flex flex-col gap-4 mt-5">

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 pl-0.5">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                {...field("email")}
                className={`w-full bg-slate-50 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 font-medium outline-none border transition-all placeholder:text-slate-400 focus:border-[#023154] focus:ring-2 focus:ring-[#023154]/10 focus:bg-white ${
                  errors.email ? "border-red-400 bg-red-50" : "border-[#D0D5DD]"
                }`}
              />
              {errors.email && (
                <p className="text-[12px] text-red-500 font-semibold flex items-center gap-1">
                  <span>⚠</span> {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 pl-0.5">
                Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...field("password")}
                  className={`w-full bg-slate-50 rounded-lg px-3.5 py-2.5 pr-9 text-sm text-slate-800 font-medium outline-none border transition-all placeholder:text-slate-400 focus:border-[#023154] focus:ring-2 focus:ring-[#023154]/10 focus:bg-white ${
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
              {errors.password && (
                <p className="text-[12px] text-red-500 font-semibold flex items-center gap-1">
                  <span>⚠</span> {errors.password}
                </p>
              )}

              {/* Forgot Password */}
              <div className="flex justify-end mt-0.5">
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-semibold text-[#023154] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 mt-1 rounded-lg text-white text-sm font-semibold tracking-wide transition-all ${
                loading
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-[#023154] hover:bg-[#034a7a] active:scale-[0.99] cursor-pointer"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="w-full max-w-[320px] flex items-center gap-2.5 my-4">
            <div className="flex-1 h-px bg-[#E4E7EC]" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">OR</span>
            <div className="flex-1 h-px bg-[#E4E7EC]" />
          </div>

          {/* Google Sign-In */}
          <button
            type="button"
            onClick={handleGoogleSignin}
            className="w-full max-w-[320px] py-2.5 bg-white rounded-lg border border-[#D0D5DD] text-slate-700 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-[0.99] transition-all"
          >
            <FcGoogle size={16} />
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="text-center text-xs text-slate-500 mt-5 font-medium">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#023154] font-bold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;