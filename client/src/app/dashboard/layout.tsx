"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import {
  FiMenu,
  FiLogOut,
  FiCheckCircle,
  FiHome,
  FiClipboard,
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
import { FaBed } from "react-icons/fa";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import Loading from "@/components/Loading";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { user, logout, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) return <Loading />;
  if (!isAuthenticated) return null;

  const menuItems = {
    tenant: [
      {
        name: "Home",
        path: "/dashboard",
        icon: <FiHome className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Dashboard",
        path: "/dashboard/tenant",
        icon: <FiBarChart className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Search & Browse",
        path: "/dashboard/tenant/search",
        icon: <FiSearch className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "My Booking Requests",
        path: "/dashboard/tenant/my-bookings",
        icon: <FiClipboard className="text-white text-xl" />, // You can change icon as needed
        disabled: false,
      },
      {
        name: "In Progress Bookings",
        path: "/dashboard/tenant/in-progress",
        icon: <FiClock className="text-white text-xl" />, // Icon indicating "in progress" or ongoing
        disabled: false,
      },{
        name: "Approved Bookings",
        path: "/dashboard/tenant/approved",
        icon: <FiCheckCircle className="text-white text-xl" />, // Icon indicating approval or success
        disabled: false,
      },
      {
        name: "Track Move-in Status",
        path: "/dashboard/tenant/movein",
        icon: <FiBook className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Verified Listings",
        path: "/dashboard/tenant/verified",
        icon: <FiHome className="text-white text-xl" />,
        disabled: true,
      },

      {
        name: "Upload KYC",
        path: "/dashboard/tenant/kyc",
        icon: <FiUpload className="text-white text-xl" />,
        disabled: true,
      },
  
      {
        name: "Chat with Host",
        path: "/dashboard/tenant/chat",
        icon: <FiMessageSquare className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Schedule Visit",
        path: "/dashboard/tenant/schedule",
        icon: <FiUser className="text-white text-xl" />,
        disabled: true,
      },
     
      {
        name: "Book & Pay Rent",
        path: "/dashboard/tenant/book",
        icon: <FiBook className="text-white text-xl" />,
        disabled: true,
      },

      {
        name: "Give Review",
        path: "/dashboard/tenant/review",
        icon: <FiUser className="text-white text-xl" />,
        disabled: true,
      },
      {
        name: "Profile",
        path: "/dashboard/tenant/profile",
        icon: <FiUser className="text-white text-xl" />,
        disabled: true,
      },
      {
        name: "Payment History",
        path: "/dashboard/tenant/payments",
        icon: <FiCreditCard className="text-white text-xl" />,
        disabled: true,
      },
      {
        name: "Lease Agreement",
        path: "/dashboard/tenant/lease",
        icon: <FiFileText className="text-white text-xl" />,
        disabled: true,
      },
      {
        name: "Maintenance Requests",
        path: "/dashboard/tenant/maintenance",
        icon: <FiTool className="text-white text-xl" />,
        disabled: true,
      },
      {
        name: "Notifications",
        path: "/dashboard/tenant/notifications",
        icon: <FiBell className="text-white text-xl" />,
        disabled: true,
      },
      {
        name: "Rental History",
        path: "/dashboard/tenant/rent-history",
        icon: <FiCalendar className="text-white text-xl" />,
        disabled: true,
      },
      {
        name: "Tenant Support",
        path: "/dashboard/tenant/support",
        icon: <FiHelpCircle className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Refer a Friend",
        path: "/dashboard/tenant/refer",
        icon: <FiShare className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Messages",
        path: "/dashboard/tenant/messages",
        icon: <FiMail className="text-white text-xl" />,
        disabled: true,
      },
      {
        name: "Manage Feedback",
        path: "/dashboard/tenant/feedback",
        icon: <FiThumbsUp className="text-white text-xl" />,
        disabled: true,
      },
    ],
    host: [
      {
        name: "Home",
        path: "/dashboard",
        icon: <FiHome className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Dashboard",
        path: "/dashboard/host",
        icon: <FiBarChart className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Search & Browse",
        path: "/dashboard/tenant/search",
        icon: <FiSearch className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "List House/PG/Flats",
        path: "/dashboard/host/listings",
        icon: <FiHome className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "List Rooms",
        path: "/dashboard/host/rooms",
        icon: <FaBed className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Verify Ownership",
        path: "/dashboard/host/verify",
        icon: <FiUpload className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Accept/Reject Bookings",
        path: "/dashboard/host/accept",
        icon: <FiBook className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Confirmed Bookings",
        path: "/dashboard/host/confirmed",
        icon: <FiCheckCircle className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Approved Bookings",
        path: "/dashboard/host/approved",
        icon: <FiThumbsUp className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Track Move-in Status",
        path: "/dashboard/host/movein",
        icon: <FiBook className="text-white text-xl" />,
        disabled: false,
      },

      {
        name: "Chat with Tenant",
        path: "/dashboard/host/chat",
        icon: <FiMessageSquare className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Booking History",
        path: "/dashboard/host/booking-history",
        icon: <FiCalendar className="text-white text-xl" />,
        disabled: true,
      },
      {
        name: "Tenant Inquiries",
        path: "/dashboard/host/inquiries",
        icon: <FiMessageSquare className="text-white text-xl" />,
        disabled: true,
      },
      {
        name: "Review Tenant ID",
        path: "/dashboard/host/reviews",
        icon: <FiUser className="text-white text-xl" />,
        disabled: true,
      },
      {
        name: "Receive Payments",
        path: "/dashboard/host/payments",
        icon: <FiBook className="text-white text-xl" />,
        disabled: true,
      },
      {
        name: "View Analytics & Feedback",
        path: "/dashboard/host/analytics",
        icon: <FiBarChart className="text-white text-xl" />,
        disabled: true,
      },
      {
        name: "Profile",
        path: "/dashboard/host/profile",
        icon: <FiUser className="text-white text-xl" />,
        disabled: true,
      },
      {
        name: "Notifications",
        path: "/dashboard/host/notifications",
        icon: <FiBell className="text-white text-xl" />,
        disabled: true,
      },
      {
        name: "Help & Support",
        path: "/dashboard/host/support",
        icon: <FiHelpCircle className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Settings",
        path: "/dashboard/host/settings",
        icon: <FiSettings className="text-white text-xl" />,
        disabled:true,
      },
      {
        name: "Messages",
        path: "/dashboard/host/messages",
        icon: <FiMail className="text-white text-xl" />,
        disabled: true,
      },
      {
        name: "Manage Feedback",
        path: "/dashboard/host/feedback",
        icon: <FiThumbsUp className="text-white text-xl" />,
        disabled: true,
      },
      {
        name: "Billing",
        path: "/dashboard/host/billing",
        icon: <FiCreditCard className="text-white text-xl" />,
        disabled: true,
      },
    ],
    admin: [
      {
        name: "Home",
        path: "/dashboard",
        icon: <FiHome className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Dashboard",
        path: "/dashboard/admin",
        icon: <FiBarChart className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Verify Host Profiles",
        path: "/dashboard/admin/verify",
        icon: <FiUser className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Monitor Activity",
        path: "/dashboard/admin/activity",
        icon: <FiBarChart className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Manage Listings",
        path: "/dashboard/admin/listings",
        icon: <FiHome className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Handle Support/Disputes",
        path: "/dashboard/admin/support",
        icon: <FiMessageSquare className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Send Platform Updates",
        path: "/dashboard/admin/updates",
        icon: <FiUser className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Manage Revenue Dashboards",
        path: "/dashboard/admin/revenue",
        icon: <FiBarChart className="text-white text-xl" />,
        disabled: false,
      },
      {
        name: "Manage Subscription Plans",
        path: "/dashboard/admin/plans",
        icon: <FiBook className="text-white text-xl" />,
        disabled: false,
      },
    ],
  };

  const userMenu = menuItems[user.role] || [];

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center h-16 fixed top-0 left-0 right-0 z-30">
        <div className="text-xl font-semibold">Dashboard</div>
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

      <div className="flex flex-1 relative pt-16">
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
                  className={`mb-4 flex items-center space-x-3 ${
                    item.disabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-700"
                  } p-2 rounded-lg`}
                >
                  {item.icon}
                  <Link
                    href={item.disabled ? "#" : item.path}
                    className={`text-white ${
                      item.disabled
                        ? "pointer-events-none"
                        : "hover:text-gray-400"
                    }`}
                    onClick={() => !item.disabled && setSidebarOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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

        <div className="flex-1 p-6 bg-gray-900 overflow-auto sm:ml-64">
          {children}
        </div>
      </div>
    </div>
  );
}
