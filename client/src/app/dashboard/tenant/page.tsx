'use client';

import { useAuth } from "@/lib/AuthContext";
import { FiBarChart, FiUser, FiHome, FiMessageSquare, FiBell, FiSearch, FiCalendar, FiUpload, FiFileText } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const TenantDashboard = () => {
  const router = useRouter();
  const { user } = useAuth(); // Fetch user from context or any other state management

  // Make sure user data is loaded
  if (!user) {
    return <div className="text-white p-6">Loading user...</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Tenant Dashboard</h1>
      <p className="text-lg mb-6">Welcome back, {user.name}!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Active Listings */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition">
          <div className="flex items-center justify-between mb-4">
            <FiHome className="text-white text-3xl" />
            <span className="text-xl">Active Listings</span>
          </div>
          <p className="text-sm text-gray-400">View your rented or saved properties.</p>
          <button 
            onClick={() => router.push('/dashboard/tenant/verified')}
            className="mt-4 text-blue-500 hover:text-blue-400 transition"
          >
            View Listings
          </button>
        </div>

        {/* Booking History */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition">
          <div className="flex items-center justify-between mb-4">
            <FiCalendar className="text-white text-3xl" />
            <span className="text-xl">Booking History</span>
          </div>
          <p className="text-sm text-gray-400">Review your past bookings and rental status.</p>
          <button 
            onClick={() => router.push('/dashboard/tenant/booking-history')}
            className="mt-4 text-blue-500 hover:text-blue-400 transition"
          >
            View History
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition">
          <div className="flex items-center justify-between mb-4">
            <FiBell className="text-white text-3xl" />
            <span className="text-xl">Notifications</span>
          </div>
          <p className="text-sm text-gray-400">Stay updated with your rental status and reminders.</p>
          <button 
            onClick={() => router.push('/dashboard/tenant/notifications')}
            className="mt-4 text-blue-500 hover:text-blue-400 transition"
          >
            Check Notifications
          </button>
        </div>

        {/* Messages */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition">
          <div className="flex items-center justify-between mb-4">
            <FiMessageSquare className="text-white text-3xl" />
            <span className="text-xl">Messages</span>
          </div>
          <p className="text-sm text-gray-400">Check your messages with hosts regarding bookings.</p>
          <button 
            onClick={() => router.push('/dashboard/tenant/messages')}
            className="mt-4 text-blue-500 hover:text-blue-400 transition"
          >
            View Messages
          </button>
        </div>

        {/* Profile */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition">
          <div className="flex items-center justify-between mb-4">
            <FiUser className="text-white text-3xl" />
            <span className="text-xl">Profile</span>
          </div>
          <p className="text-sm text-gray-400">Manage your profile and account details.</p>
          <button 
            onClick={() => router.push('/dashboard/tenant/profile')}
            className="mt-4 text-blue-500 hover:text-blue-400 transition"
          >
            View Profile
          </button>
        </div>

        {/* Search & Browse Listings */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition">
          <div className="flex items-center justify-between mb-4">
            <FiSearch className="text-white text-3xl" />
            <span className="text-xl">Search & Browse</span>
          </div>
          <p className="text-sm text-gray-400">Browse available properties for rent.</p>
          <button 
            onClick={() => router.push('/dashboard/tenant/search')}
            className="mt-4 text-blue-500 hover:text-blue-400 transition"
          >
            Search Listings
          </button>
        </div>

        {/* Upload KYC */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition">
          <div className="flex items-center justify-between mb-4">
            <FiUpload className="text-white text-3xl" />
            <span className="text-xl">Upload KYC</span>
          </div>
          <p className="text-sm text-gray-400">Upload your KYC documents for verification.</p>
          <button 
            onClick={() => router.push('/dashboard/tenant/kyc')}
            className="mt-4 text-blue-500 hover:text-blue-400 transition"
          >
            Upload KYC
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
