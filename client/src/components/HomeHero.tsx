"use client";

import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HeroSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <section className="bg-gray-900 text-white py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-snug">
          Find Your Perfect Room, PG, Hostel, or Flat —
          <br className="hidden md:block" />
          <span className="text-cyan-400">Book Online, No Brokers</span>
        </h1>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-6 mb-10">
          <input
            type="text"
            placeholder="Enter location"
            className="w-full md:w-1/3 px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            disabled={!isLoggedIn}
          />
          <input
            type="text"
            placeholder="Max Rent"
            className="w-full md:w-1/4 px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            disabled={!isLoggedIn}
          />
          <select
            className="w-full md:w-1/4 px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            disabled={!isLoggedIn}
          >
            <option>Property Type</option>
            <option>Room</option>
            <option>PG</option>
            <option>Hostel</option>
            <option>Flat</option>
          </select>
        </div>

        {/* CTA Button */}
        {!isLoggedIn && (
          <Link href="/signup">
            <button className="mt-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-md transition duration-300 text-lg">
              Sign Up & Start Searching
            </button>
          </Link>
        )}
      </div>
    </section>
  );
}
