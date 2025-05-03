'use client';

import { useState } from "react";
import { FiMessageSquare, FiEye, FiCheckCircle, FiMessageCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";

const inquiries = [
  {
    id: 1,
    tenantName: "John Doe",
    message: "I am interested in the 2BHK flat. Is it still available?",
    status: "Pending", // Can be "Pending", "Read", "Replied"
    postedAt: "2025-05-02T10:00:00Z",
  },
  {
    id: 2,
    tenantName: "Jane Smith",
    message: "Can I schedule a visit to see the room?",
    status: "Read",
    postedAt: "2025-04-29T14:30:00Z",
  },
];

export default function TenantInquiriesPage() {
  const router = useRouter();

  const [inquiriesList, setInquiriesList] = useState(inquiries);

  const handleReply = (inquiryId: number) => {
    // Redirect to reply page or open reply modal
    console.log(`Replying to inquiry ${inquiryId}`);
    router.push(`/dashboard/host/inquiries/reply/${inquiryId}`);
  };

  const handleMarkAsRead = (inquiryId: number) => {
    setInquiriesList((prev) =>
      prev.map((inquiry) =>
        inquiry.id === inquiryId ? { ...inquiry, status: "Read" } : inquiry
      )
    );
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Tenant Inquiries</h1>

      <div className="grid gap-6">
        {inquiriesList.map((inquiry) => (
          <div key={inquiry.id} className="bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">{inquiry.tenantName}</h3>
              <p className="text-sm text-gray-400">{new Date(inquiry.postedAt).toLocaleString()}</p>
            </div>
            <p className="text-gray-300 text-sm mb-4">{inquiry.message}</p>

            <div className="flex justify-between items-center">
              <p
                className={`text-sm font-medium ${
                  inquiry.status === "Pending"
                    ? "text-yellow-400"
                    : inquiry.status === "Read"
                    ? "text-green-400"
                    : "text-blue-400"
                }`}
              >
                Status: {inquiry.status}
              </p>

              <div className="flex gap-3">
                {inquiry.status === "Pending" && (
                  <button
                    onClick={() => handleMarkAsRead(inquiry.id)}
                    className="text-green-400 hover:text-green-300 flex items-center gap-1"
                  >
                    <FiCheckCircle />
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => handleReply(inquiry.id)}
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <FiMessageCircle />
                  Reply
                </button>
                <button
                  onClick={() => handleMarkAsRead(inquiry.id)}
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <FiEye />
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
