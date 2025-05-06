"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import {
  FiMenu,
  FiLogOut,
  FiHome,
  FiSearch,
  FiUpload,
  FiBook,
  FiMessageSquare,
  FiUser,
  FiBarChart,
  FiX,
  FiFileText,
  FiTool,
  FiShare,
  FiUsers,
  FiShield,
  FiTag,
  FiClock,
  FiRefreshCw,
  FiBell,
  FiHelpCircle,
  FiSettings,
  FiMail,
  FiCalendar,
  FiThumbsUp,
  FiCreditCard,
} from "react-icons/fi";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import Loading from "@/components/Loading";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { user, logout, isAuthenticated, isLoading,setLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");

    }
  }, [isAuthenticated, isLoading]);

  if (isLoading)
    return (
      <>
        <Loading/>
      </>
    );
  if (!isAuthenticated) return null; // Avoid rendering protected content while redirecting

  const menuItems = {
    tenant: [
      {
        name: "Home",
        path: "/dashboard",
        icon: <FiHome className="text-white text-xl" />,
      },
      {
        name: "Dashboard",
        path: "/dashboard/tenant",
        icon: <FiBarChart className="text-white text-xl" />,
      },
      {
        name: "Search & Browse",
        path: "/dashboard/tenant/search",
        icon: <FiSearch className="text-white text-xl" />,
      },
      {
        name: "Verified Listings",
        path: "/dashboard/tenant/verified",
        icon: <FiHome className="text-white text-xl" />,
      },
      {
        name: "Chat with Host",
        path: "/dashboard/tenant/chat",
        icon: <FiMessageSquare className="text-white text-xl" />,
      },
      {
        name: "Schedule Visit",
        path: "/dashboard/tenant/schedule",
        icon: <FiUser className="text-white text-xl" />,
      },
      {
        name: "Upload KYC",
        path: "/dashboard/tenant/kyc",
        icon: <FiUpload className="text-white text-xl" />,
      },
      {
        name: "Book & Pay Rent",
        path: "/dashboard/tenant/book",
        icon: <FiBook className="text-white text-xl" />,
      },
      {
        name: "Track Move-in Status",
        path: "/dashboard/tenant/movein",
        icon: <FiBook className="text-white text-xl" />,
      },
      {
        name: "Give Review",
        path: "/dashboard/tenant/review",
        icon: <FiUser className="text-white text-xl" />,
      },
      // Additional items
      {
        name: "Profile",
        path: "/dashboard/tenant/profile",
        icon: <FiUser className="text-white text-xl" />,
      },
      {
        name: "Payment History",
        path: "/dashboard/tenant/payments",
        icon: <FiCreditCard className="text-white text-xl" />,
      },
      {
        name: "Lease Agreement",
        path: "/dashboard/tenant/lease",
        icon: <FiFileText className="text-white text-xl" />,
      },
      {
        name: "Maintenance Requests",
        path: "/dashboard/tenant/maintenance",
        icon: <FiTool className="text-white text-xl" />,
      },
      {
        name: "Notifications",
        path: "/dashboard/tenant/notifications",
        icon: <FiBell className="text-white text-xl" />,
      },
      {
        name: "Rental History",
        path: "/dashboard/tenant/rent-history",
        icon: <FiCalendar className="text-white text-xl" />,
      },
      {
        name: "Tenant Support",
        path: "/dashboard/tenant/support",
        icon: <FiHelpCircle className="text-white text-xl" />,
      },
      {
        name: "Refer a Friend",
        path: "/dashboard/tenant/refer",
        icon: <FiShare className="text-white text-xl" />,
      },
      {
        name: "Messages",
        path: "/dashboard/tenant/messages",
        icon: <FiMail className="text-white text-xl" />,
      },
      {
        name: "Manage Feedback",
        path: "/dashboard/tenant/feedback",
        icon: <FiThumbsUp className="text-white text-xl" />,
      },
    ],
    host: [
      {
        name: "Home",
        path: "/dashboard",
        icon: <FiHome className="text-white text-xl" />,
      },
      {
        name: "Dashboard",
        path: "/dashboard/host",
        icon: <FiBarChart className="text-white text-xl" />,
      },
      {
        name: "List Rooms/PG/Flats",
        path: "/dashboard/host/listings",
        icon: <FiHome className="text-white text-xl" />,
      },
      {
        name: "Verify Ownership",
        path: "/dashboard/host/verify",
        icon: <FiUpload className="text-white text-xl" />,
      },
      {
        name: "Tenant Inquiries",
        path: "/dashboard/host/inquiries",
        icon: <FiMessageSquare className="text-white text-xl" />,
      },
      {
        name: "Review Tenant ID",
        path: "/dashboard/host/reviews",
        icon: <FiUser className="text-white text-xl" />,
      },
      {
        name: "Accept/Reject Bookings",
        path: "/dashboard/host/accept",
        icon: <FiBook className="text-white text-xl" />,
      },
      {
        name: "Receive Payments",
        path: "/dashboard/host/payments",
        icon: <FiBook className="text-white text-xl" />,
      },
      {
        name: "Track Bookings & Availability",
        path: "/dashboard/host/bookings",
        icon: <FiBarChart className="text-white text-xl" />,
      },
      {
        name: "View Analytics & Feedback",
        path: "/dashboard/host/analytics",
        icon: <FiBarChart className="text-white text-xl" />,
      },
      {
        name: "Profile",
        path: "/dashboard/host/profile",
        icon: <FiUser className="text-white text-xl" />,
      },
      {
        name: "Notifications",
        path: "/dashboard/host/notifications",
        icon: <FiBell className="text-white text-xl" />,
      },
      {
        name: "Help & Support",
        path: "/dashboard/host/support",
        icon: <FiHelpCircle className="text-white text-xl" />,
      },
      {
        name: "Settings",
        path: "/dashboard/host/settings",
        icon: <FiSettings className="text-white text-xl" />,
      },
      {
        name: "Messages",
        path: "/dashboard/host/messages",
        icon: <FiMail className="text-white text-xl" />,
      },
      {
        name: "Booking History",
        path: "/dashboard/host/booking-history",
        icon: <FiCalendar className="text-white text-xl" />,
      },
      {
        name: "Manage Feedback",
        path: "/dashboard/host/feedback",
        icon: <FiThumbsUp className="text-white text-xl" />,
      },
      {
        name: "Billing",
        path: "/dashboard/host/billing",
        icon: <FiCreditCard className="text-white text-xl" />,
      },
    ],

    admin: [
      {
        name: "Home",
        path: "/dashboard",
        icon: <FiHome className="text-white text-xl" />,
      },
      {
        name: "Dashboard",
        path: "/dashboard/admin",
        icon: <FiBarChart className="text-white text-xl" />,
      },
      {
        name: "Verify Host Profiles",
        path: "/dashboard/admin/verify",
        icon: <FiUser className="text-white text-xl" />,
      },
      {
        name: "Monitor Activity",
        path: "/dashboard/admin/activity",
        icon: <FiBarChart className="text-white text-xl" />,
      },
      {
        name: "Manage Listings",
        path: "/dashboard/admin/listings",
        icon: <FiHome className="text-white text-xl" />,
      },
      {
        name: "Handle Support/Disputes",
        path: "/dashboard/admin/support",
        icon: <FiMessageSquare className="text-white text-xl" />,
      },
      {
        name: "Send Platform Updates",
        path: "/dashboard/admin/updates",
        icon: <FiUser className="text-white text-xl" />,
      },
      {
        name: "Manage Revenue Dashboards",
        path: "/dashboard/admin/revenue",
        icon: <FiBarChart className="text-white text-xl" />,
      },
      {
        name: "Manage Subscription Plans",
        path: "/dashboard/admin/plans",
        icon: <FiBook className="text-white text-xl" />,
      },
    ],
  };

  const userMenu = menuItems[user.role] || [];

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center h-16 fixed top-0 left-0 right-0 z-30">
        <div className="text-xl font-semibold">Dashboard</div>

        {/* Hamburger + Logout on small screens */}
        <div className="flex items-center space-x-4 sm:hidden">
          <button onClick={logout} className="text-red-500 hover:text-red-300">
            <FiLogOut className="text-white text-2xl" />
          </button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? (
              <FiX className="text-white text-2xl" />
            ) : (
              <FiMenu className="text-white text-2xl" />
            )}
          </button>
        </div>

        {/* User Info on large screens */}
        <div className="hidden sm:flex items-center space-x-4">
          <div className="text-sm">
            <p className="font-semibold">{user.username}</p>
            <p className="text-gray-400">{user.email}</p>
          </div>
          <button
            onClick={logout}
            className="text-red-500 hover:text-red-300 flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 relative pt-16">
        {/* Sidebar */}
        <div
          className={`bg-gray-800 w-64 p-4 transition-transform transform fixed top-16 left-0 h-[calc(100vh-4rem)] z-20 flex flex-col ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
        >
          <div className="overflow-y-auto flex-1 custom-scrollbar">
            <ul>
              {userMenu.map((item) => (
                <li
                  key={item.name}
                  className="mb-4 flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg"
                >
                  {item.icon}
                  <Link
                    href={item.path}
                    className="text-white hover:text-gray-400"
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logout (sidebar) */}
          <div className="mt-auto pt-4 border-t border-gray-700 hidden sm:block">
            <button
              onClick={logout}
              className="text-red-500 hover:text-red-300 flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-gray-700"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 bg-gray-900 overflow-auto sm:ml-64">
          {children}
        </div>
      </div>
    </div>
  );
}
