"use client";

import { useAuth } from "@/lib/AuthContext";
import {
  FiHome,
  FiBook,
  FiMessageSquare,
  FiDollarSign,
  FiUpload,
  FiUsers,
  FiPlus,
  FiBarChart,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import { useApi } from "@/lib/useApi";
import HostRoomListingsPage from "./rooms/page";

const Card = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition">
    <div className="bg-gray-700 p-2 rounded-full">
      <Icon className="text-white text-xl" />
    </div>
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-white font-semibold">{value}</p>
    </div>
  </div>
);

const ActionButton = ({
  label,
  path,
  icon: Icon,
}: {
  label: string;
  path: string;
  icon: any;
}) => (
  <a
    href={path}
    className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
  >
    <Icon />
    <span>{label}</span>
  </a>
);

export default function HostDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();


  useEffect(() => {
    const fetchRoomListings = async () => {
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }
    };
    if (isAuthenticated && !loading) {
      fetchRoomListings();
    }
  }, []);

  if (loading )
    return <p className="text-white p-6">Loading...</p>;

  if (!user) return <p className="text-white p-6">Loading user...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-2">
        Welcome, {user.fullName || user.username}
      </h1>
      <p className="text-gray-400 mb-6">
        Manage your properties, bookings, and interactions.
      </p>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card icon={FiHome} label="Total Listings" value={5} />
        <Card icon={FiBook} label="Active Bookings" value={3} />
        <Card icon={FiMessageSquare} label="Pending Inquiries" value={4} />
        <Card icon={FiUsers} label="Completed Bookings" value={12} />
        <Card
          icon={FiDollarSign}
          label="Total Payments Received"
          value="₹18,000"
        />
        <Card icon={FiBarChart} label="Rating Score" value="4.6 / 5" />
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <ActionButton
          label="Add Listing"
          path="/dashboard/host/listings/new"
          icon={FiPlus}
        />
        <ActionButton
          label="Verify Ownership"
          path="/dashboard/host/verify"
          icon={FiUpload}
        />
        <ActionButton
          label="Check Inquiries"
          path="/dashboard/host/inquiries"
          icon={FiMessageSquare}
        />
      </div>

      {/* Recent Listings Snapshot */}
      <HostRoomListingsPage />
    </div>
  );
}
