"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-10">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Profile Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Account Overview</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="font-bold text-lg dark:text-white">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 bg-gray-100 dark:bg-neutral-800 rounded-lg font-medium dark:text-white">Profile</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-lg dark:text-gray-400">Orders</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-lg dark:text-gray-400">Settings</button>
              </div>
            </div>
          </div>

          {/* Main Info */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800">
              <h3 className="text-xl font-semibold mb-6 dark:text-white">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
                  <p className="text-xs text-gray-400 uppercase">Full Name</p>
                  <p className="font-medium dark:text-white mt-1">{user.name}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
                  <p className="text-xs text-gray-400 uppercase">Email</p>
                  <p className="font-medium dark:text-white mt-1">{user.email}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
                  <p className="text-xs text-gray-400 uppercase">Membership</p>
                  <p className="font-medium dark:text-white mt-1">Aroyana VIP Member</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
                  <p className="text-xs text-gray-400 uppercase">Location</p>
                  <p className="font-medium dark:text-white mt-1">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}