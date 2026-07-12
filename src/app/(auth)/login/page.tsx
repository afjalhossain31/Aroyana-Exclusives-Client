"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    // Here we will add the actual API call to the backend later
    console.log("Logging in with:", email, password);
  };

  const handleDemoLogin = () => {
    setEmail("admin@aroyana.com");
    setPassword("aroyana2026");
    setError("");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to your Aroyana account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center border border-red-200">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-md hover:bg-gray-800 transition font-medium"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <span className="text-gray-400 text-sm">OR</span>
        </div>

        {/* Demo Login Button Requirement */}
        <button
          onClick={handleDemoLogin}
          className="w-full mt-6 bg-secondary text-white py-3 rounded-md hover:bg-yellow-600 transition font-medium"
        >
          Use Demo Credentials
        </button>

        <p className="text-center text-sm text-gray-500 mt-8">
          Don't have an account?{' '}
          <Link href="/register" className="text-secondary font-bold hover:underline">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}