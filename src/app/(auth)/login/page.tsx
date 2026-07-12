"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid email or password!");
      } else {
        setSuccess("Login successful! Redirecting to home...");
        
        // টোকেন এবং ইউজারের তথ্য সেভ করা
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // ---Navbar আপডেট করার জন্য সিগন্যাল---
        window.dispatchEvent(new Event("authChange"));
        // ------------------------------------

        // দেড় সেকেন্ড পর হোম পেজে পাঠিয়ে দেবে
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (err) {
      setError("Server error! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-black">
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200"
          alt="Aroyana Premium Collection"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          suppressHydrationWarning
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-12 text-center bg-black/40">
          <h1 className="text-5xl font-extrabold tracking-widest mb-4">AROYANA</h1>
          <p className="text-lg font-light tracking-wide max-w-md">
            Welcome back to your exclusive fashion destination.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 xl:p-24">
        <div className="max-w-md w-full">
          <div className="text-left mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
            <p className="text-gray-500 dark:text-gray-400">Sign in to your account to continue.</p>
          </div>

          {error && <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm mb-6 shadow-sm">{error}</div>}
          {success && <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 p-4 rounded-lg text-sm mb-6 shadow-sm">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white" placeholder="name@example.com" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
                <a href="#" className="text-sm text-primary hover:underline transition">Forgot password?</a>
              </div>
              <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white" placeholder="Enter your password" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-lg font-bold text-lg hover:opacity-90 transition shadow-lg disabled:bg-gray-400 mt-4">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600 dark:text-gray-400">Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline transition">Create one</Link></p>
        </div>
      </div>
    </div>
  );
}