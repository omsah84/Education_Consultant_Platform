'use client';

import { useState } from "react";
import { FiCheckCircle, FiXCircle, FiEye } from "react-icons/fi";
import { useRouter } from "next/navigation";

const bookings = [
  {
    id: 1,
    tenantName: "John Doe",
    listingTitle: "2BHK Flat in Sector 62",
    location: "Noida",
    checkInDate: "2025-06-01",
    checkOutDate: "2025-06-15",
    status: "Pending", // Can be "Pending", "Accepted", "Rejected"
  },
  {
    id: 2,
    tenantName: "Jane Smith",
    listingTitle: "Shared Room for Students",
    location: "Delhi University",
    checkInDate: "2025-05-10",
    checkOutDate: "2025-05-20",
    status: "Pending",
  },
];

export default function AcceptRejectBookingsPage() {
  const router = useRouter();

  const [bookingList, setBookingList] = useState(bookings);

  const handleAccept = (bookingId: number) => {
    setBookingList((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status: "Accepted" } : booking
      )
    );
  };

  const handleReject = (bookingId: number) => {
    setBookingList((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status: "Rejected" } : booking
      )
    );
  };

  const handleViewDetails = (bookingId: number) => {
    // Navigate to a detailed page to view the booking (you can customize this further)
    router.push(`/dashboard/host/accept/view/${bookingId}`);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Accept/Reject Bookings</h1>

      <div className="grid gap-6">
        {bookingList.map((booking) => (
          <div key={booking.id} className="bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">{booking.tenantName}</h3>
              <p className="text-sm text-gray-400">
                {booking.checkInDate} - {booking.checkOutDate}
              </p>
            </div>
            <p className="text-sm text-gray-400 mb-3">Listing: {booking.listingTitle}</p>
            <p className="text-sm text-gray-400 mb-3">Location: {booking.location}</p>

            <div className="flex justify-between items-center">
              <p
                className={`text-sm font-medium ${
                  booking.status === "Pending"
                    ? "text-yellow-400"
                    : booking.status === "Accepted"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                Status: {booking.status}
              </p>

              <div className="flex gap-3">
                {booking.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleAccept(booking.id)}
                      className="text-green-400 hover:text-green-300 flex items-center gap-1"
                    >
                      <FiCheckCircle />
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(booking.id)}
                      className="text-red-400 hover:text-red-300 flex items-center gap-1"
                    >
                      <FiXCircle />
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleViewDetails(booking.id)}
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <FiEye />
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
