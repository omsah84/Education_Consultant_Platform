"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const renderAuthButtons = () => (
    <>
      <Link href="/login">
        <button className="btn btn-outline btn-sm border-white text-white hover:bg-white hover:text-black">
          Login
        </button>
      </Link>
      <Link href="/signup">
        <button className="btn btn-primary btn-sm">Sign Up</button>
      </Link>
    </>
  );

  const renderLoggedInMenu = () => (
    <button
      onClick={handleLogout}
      className="btn btn-outline btn-sm border-white text-white hover:bg-white hover:text-black"
    >
      Logout
    </button>
  );

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col drawer-content">
        {/* Navbar */}
        <div className="navbar bg-black text-white border-b border-gray-700 px-4 py-2 lg:px-8">
          {/* Logo */}
          <div className="flex-1 flex items-center gap-2">
            <div className="w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm bg-gradient-to-tr from-cyan-400 to-blue-400">
              &lt;/&gt;
            </div>
            <span className="text-lg font-bold bg-gradient-to-tr from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Omsah&lt;code&gt;
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <ul className="flex items-center space-x-4 text-sm font-medium">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-cyan-400 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-cyan-400 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-cyan-400 transition">
                  Terms & Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/host-onboarding" className="hover:text-cyan-400 transition">
                  Host Onboarding
                </Link>
              </li>
            </ul>
            <div className="flex gap-2">
              {!isLoggedIn ? renderAuthButtons() : renderLoggedInMenu()}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="drawer-side z-[1000] overflow-y-auto">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-black text-white space-y-3 text-base pt-16">
          <li>
            <Link href="/" className="hover:text-cyan-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-cyan-400 transition">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/faq" className="hover:text-cyan-400 transition">
              FAQ
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-cyan-400 transition">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:text-cyan-400 transition">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/terms" className="hover:text-cyan-400 transition">
              Terms & Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/host-onboarding" className="hover:text-cyan-400 transition">
              Host Onboarding
            </Link>
          </li>
          {!isLoggedIn ? (
            <>
              <li className="pt-4">{renderAuthButtons()}</li>
            </>
          ) : (
            <li className="pt-4">{renderLoggedInMenu()}</li>
          )}
        </ul>
      </div>
    </div>
  );
}
