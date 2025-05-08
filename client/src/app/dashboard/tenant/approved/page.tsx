"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/lib/useApi";
import { useAuth } from "@/lib/AuthContext";

export default function ApprovedBookingsPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const api = useApi();
  const router = useRouter();

  const [approvedList, setApprovedList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      router.push("/login");
      return;
    }

    if (isAuthenticated && !authLoading) {
      fetchApprovedBookings();
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchApprovedBookings = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await api.get("/room/my-booking-requests/in-approvel");
      if (Array.isArray(res.data?.data)) {
        setApprovedList(res.data.data);
      } else {
        throw new Error("Invalid response format: Expected data.data to be an array.");
      }
    } catch (err: any) {
      console.error("Error fetching approved bookings:", err);
      setErrorMessage(err?.response?.data?.message || err?.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Approved Bookings</h1>

      {loading && <p className="text-gray-400">Loading approved rooms...</p>}

      {!loading && errorMessage && (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-4">
          <p className="text-red-400">{errorMessage}</p>
        </div>
      )}

      {!loading && approvedList.length === 0 && (
        <p className="text-gray-400">No approved bookings found.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {approvedList.map((room, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition p-4"
          >
            <h3 className="text-lg font-semibold mb-1">
              {room.roomDetails.type || "Room"}
            </h3>
            <p className="text-sm text-gray-400">
              ₹{room.roomDetails.pricePerMonth?.toLocaleString()}/month
            </p>
            <p className="text-sm text-gray-400">
              Status: {room.roomDetails.status || "Confirmed"}
            </p>

            <p className="text-sm text-gray-300">
              Booked By: {room.bookingRequest?.bookedByName || "N/A"}
            </p>

            <p className="text-sm text-gray-300">
              Provider: {room.bookingRequest?.providerName || "N/A"}
            </p>

            <p className="text-sm text-gray-300">
              Payment Method: {room.roomBookingPayment?.paymentMethod || "N/A"}
            </p>

            <p className="text-sm text-green-400 font-medium mt-2">
              Booking Status: {room.bookingRequest.status}
            </p>

            <div className="mt-4 flex justify-between items-center">
              <button
                className="text-blue-400 hover:text-blue-300 text-sm underline"
                onClick={() => setSelectedRoom(room)}
              >
                ℹ️ View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 px-4">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-4 text-red-400 text-xl"
              onClick={() => setSelectedRoom(null)}
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4 text-white">
              {selectedRoom.roomDetails.type}
            </h2>

            <div className="space-y-2 text-sm text-gray-300">
              <p>Price: ₹{selectedRoom.roomDetails.pricePerMonth?.toLocaleString()}/month</p>
              <p>Description: {selectedRoom.roomDetails.description || "N/A"}</p>
              <p>
                Address: {selectedRoom.roomAddress.streetAddress},{" "}
                {selectedRoom.roomAddress.city}, {selectedRoom.roomAddress.stateProvince} -{" "}
                {selectedRoom.roomAddress.postalCode},{" "}
                {selectedRoom.roomAddress.country}
              </p>
              <p>
                Available Features:{" "}
                {selectedRoom.roomDetails.availableFeatures?.length
                  ? selectedRoom.roomDetails.availableFeatures.join(", ")
                  : "None"}
              </p>
              <p>Status: {selectedRoom.roomDetails.status}</p>
              <p>Booking Status: {selectedRoom.bookingRequest.status}</p>
              <p>Booked By: {selectedRoom.bookingRequest.bookedByName}</p>
              <p>Provider: {selectedRoom.bookingRequest.providerName}</p>
              <p>
                Booking Date:{" "}
                {new Date(selectedRoom.roomBookingPayment.bookingDate).toLocaleString()}
              </p>
              <p>Payment Method: {selectedRoom.roomBookingPayment.paymentMethod}</p>
              <p>Payment Status: {selectedRoom.roomBookingPayment.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
