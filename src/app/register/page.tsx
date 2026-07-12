"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // রিডাইরেক্ট করার জন্য যুক্ত হলো

export default function RegisterPage() {
  const router = useRouter(); // রাউটার ইনিশিয়ালাইজ করা
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match! Please check again.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed!");
      } else {
        setSuccess("Account created successfully! Redirecting to login...");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        
        // দেড় সেকেন্ড (১৫০০ মিলিসেকেন্ড) পর লগইন পেজে পাঠিয়ে দেবে
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (err) {
      setError("Server error! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... (আগের ডিজাইন হুবহু একই থাকবে, আমি শুধু লজিক আপডেট করেছি)
    <div className="min-h-screen flex bg-white">
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200"
          alt="Premium Fashion Collection"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          suppressHydrationWarning
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-12 text-center bg-black/30">
          <h1 className="text-5xl font-extrabold tracking-widest mb-4">AROYANA</h1>
          <p className="text-lg font-light tracking-wide max-w-md">
            Join our exclusive community and discover fashion tailored for elegance.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 xl:p-24">
        <div className="max-w-md w-full">
          <div className="text-left mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an Account</h2>
            <p className="text-gray-500">Enter your details to get started.</p>
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-sm mb-6 shadow-sm">{error}</div>}
          {success && <div className="bg-green-50 border border-green-200 text-green-600 p-4 rounded-lg text-sm mb-6 shadow-sm">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. John Doe" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="name@example.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="Create a strong password" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
              <input type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="Re-enter your password" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-primary text-white py-3.5 rounded-lg font-bold text-lg hover:bg-gray-800 transition shadow-lg hover:shadow-xl disabled:bg-gray-400 mt-4">
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600">Already have an account? <Link href="/login" className="text-primary font-bold hover:underline transition">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}