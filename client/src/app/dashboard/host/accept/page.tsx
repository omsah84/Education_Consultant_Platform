"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/lib/useApi";
import { useAuth } from "@/lib/AuthContext";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

interface Room {
  roomId: string;
  roomPricePerMonth: number;
  roomType: string;
  roomStatus: string;
  propertyType: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export default function AcceptRejectBookingsPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const api = useApi();
  const router = useRouter();

  const [bookingList, setBookingList] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null); // tracks which booking is being updated

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      router.push("/login");
      return;
    }

    if (isAuthenticated && !authLoading) {
      fetchRequestedRoomListings();
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchRequestedRoomListings = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await api.get("/room/requested-room");
      setBookingList(res.data.data || []);
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.message ||
          "An unexpected error occurred while fetching bookings."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    roomId: string,
    action: "accept" | "reject"
  ) => {
    try {
      setProcessingId(roomId);
      setErrorMessage(null);

      const endpoint =
        action === "accept" ? "/room/accept-booking" : "/room/reject-booking";
      await api.post(endpoint, { roomId });

      // Update the bookingList with the new status
      setBookingList((prev) =>
        prev.map((booking) =>
          booking.roomId === roomId
            ? {
                ...booking,
                roomStatus: action === "accept" ? "Accepted" : "Rejected",
              }
            : booking
        )
      );
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.message ||
          `Failed to ${action} the booking. Please try again.`
      );
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Requested Bookings</h1>

      {loading && <p className="text-gray-400">Loading requested rooms...</p>}

      {!loading && errorMessage && (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-4">
          <p className="text-red-400">{errorMessage}</p>
        </div>
      )}

      {!loading && !errorMessage && bookingList.length === 0 && (
        <p className="text-gray-400">No bookings found.</p>
      )}

      {!loading && bookingList.length > 0 && (
        <div className="grid gap-6">
          {bookingList.map((booking) => (
            <div
              key={booking.roomId}
              className="bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition p-4"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">
                  Room Type: {booking.roomType}
                </h3>
                <p className="text-sm text-gray-400">
                  Price: ₹{booking.roomPricePerMonth}/month
                </p>
              </div>

              <p className="text-sm text-gray-400 mb-3">
                Listing: {booking.propertyType}
              </p>
              <p className="text-sm text-gray-400 mb-3">
                Address: {booking.address.street}, {booking.address.city},{" "}
                {booking.address.state} - {booking.address.postalCode}
              </p>

              <div className="flex justify-between items-center">
                <p
                  className={`text-sm font-medium ${
                    booking.roomStatus === "Requested"
                      ? "text-yellow-400"
                      : booking.roomStatus === "Accepted"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  Status: {booking.roomStatus}
                </p>

                {booking.roomStatus === "Requested" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleStatusChange(booking.roomId, "accept")}
                      className="text-green-400 hover:text-green-300 flex items-center gap-1"
                      disabled={processingId === booking.roomId}
                    >
                      <FiCheckCircle /> Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(booking.roomId, "reject")}
                      className="text-red-400 hover:text-red-300 flex items-center gap-1"
                      disabled={processingId === booking.roomId}
                    >
                      <FiXCircle /> Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
