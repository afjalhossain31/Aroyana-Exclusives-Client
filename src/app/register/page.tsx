"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// React Icons ইমপোর্ট করা হলো
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/register`, {
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

  const handleSocialRegister = (provider: string) => {
    console.log(`Connecting to ${provider} for registration...`);
    // TODO: Add backend logic here later
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-black">
      {/* Left Side - Image Background */}
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

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 xl:p-24">
        <div className="max-w-md w-full">
          <div className="text-left mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create an Account</h2>
            <p className="text-gray-500 dark:text-gray-400">Enter your details to get started.</p>
          </div>

          {error && <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm mb-6 shadow-sm">{error}</div>}
          {success && <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 p-4 rounded-lg text-sm mb-6 shadow-sm">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white transition-colors" placeholder="enter your full name" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white transition-colors" placeholder="users@example.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white transition-colors" placeholder="Create a strong password" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
              <input type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white transition-colors" placeholder="Re-enter your password" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-lg font-bold text-lg hover:opacity-90 transition shadow-lg disabled:bg-gray-400 mt-4">
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
            <span className="px-4 text-xs uppercase tracking-widest text-gray-400 font-semibold">Or sign up with</span>
            <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
          </div>

          {/* Social Registration Buttons (Updated with react-icons) */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              type="button" 
              onClick={() => handleSocialRegister('Google')}
              className="flex items-center justify-center w-full px-4 py-3 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 transition-all font-semibold text-sm shadow-sm"
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              Google
            </button>

            <button 
              type="button" 
              onClick={() => handleSocialRegister('Facebook')}
              className="flex items-center justify-center w-full px-4 py-3 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 transition-all font-semibold text-sm shadow-sm"
            >
              <FaFacebook className="h-5 w-5 mr-2 text-[#0a5cc8]" />
              Facebook
            </button>
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400">Already have an account? <Link href="/login" className="text-black dark:text-white font-bold hover:underline transition">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}