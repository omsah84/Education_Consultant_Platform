"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/lib/useApi";
import { useAuth } from "@/lib/AuthContext";

interface Room {
  roomId: string;
  roomDescription: string;
  roomPricePerMonth: number;
  roomType: string;
  roomOccupancyType: string;
  roomAvailableFeatures: string[];
  roomNotAvailableFeatures: string[];
  roomImages: string[];
  roomCreatedAt: string;
  roomStatus: string;
  bookingRequestStatus:string;
  bookedBy: string;
  propertyType: string;
  propertyDescription: string;
  providerType: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  nearby: string[];
  listingCreatedAt: string;
  bookingInfo?: {
    status: string;
    paymentMethod: string;
    notes?: string;
    bookedByName?: string;
  };
}

export default function ConfirmedBookingsPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const api = useApi();
  const router = useRouter();

  const [confirmedList, setConfirmedList] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      router.push("/login");
      return;
    }

    if (isAuthenticated && !authLoading) {
      fetchConfirmedBookings();
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchConfirmedBookings = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await api.get("/room/confirmed-room");
      setConfirmedList(res.data.data || []);
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.message ||
          "An error occurred while fetching confirmed bookings."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (roomId: string) => {
    try {
      setProcessingId(roomId);
      await api.post("/room/approve-booking", { roomId });
      await fetchConfirmedBookings(); // Refresh the list
    } catch (err: any) {
      alert(
        err?.response?.data?.message || "Failed to approve the booking."
      );
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Confirmed Bookings</h1>

      {loading && <p className="text-gray-400">Loading confirmed rooms...</p>}

      {!loading && errorMessage && (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-4">
          <p className="text-red-400">{errorMessage}</p>
        </div>
      )}

      {!loading && confirmedList.length === 0 && (
        <p className="text-gray-400">No confirmed bookings found.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {confirmedList.map((room) => (
          <div
            key={room.roomId}
            className="bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition p-4"
          >
            <h3 className="text-lg font-semibold mb-1">{room.roomType}</h3>
            <p className="text-sm text-gray-400">
              ₹{room.roomPricePerMonth}/month
            </p>
            <p className="text-sm text-gray-400">{room.propertyType}</p>
            {room.bookingInfo?.bookedByName && (
              <p className="text-sm text-gray-300">
                Booked By: {room.bookingInfo.bookedByName}
              </p>
            )}
            {room.bookingInfo?.paymentMethod && (
              <p className="text-sm text-gray-300">
                Payment Method: {room.bookingInfo.paymentMethod}
              </p>
            )}
            <p className="text-sm text-green-400 font-medium mt-2">
              Status: {room.roomStatus}
            </p>

            <div className="mt-4 flex justify-between items-center">
              <button
                className="text-blue-400 hover:text-blue-300 text-sm underline"
                onClick={() => setSelectedRoom(room)}
              >
                ℹ️ View Details
              </button>

              <button
                onClick={() => handleApproval(room.roomId)}
                disabled={processingId === room.roomId}
                className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-2 rounded shadow ${
                  processingId === room.roomId ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {processingId === room.roomId ? "Approving..." : "Approval"}
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
              {selectedRoom.roomType}
            </h2>

            <div className="space-y-2 text-sm text-gray-300">
              <p>Price: ₹{selectedRoom.roomPricePerMonth}/month</p>
              <p>Occupancy: {selectedRoom.roomOccupancyType}</p>
              <p>Description: {selectedRoom.roomDescription || "N/A"}</p>
              <p>
                Property: {selectedRoom.propertyType} (
                {selectedRoom.providerType})
              </p>
              <p>
                Address: {selectedRoom.address.street},{" "}
                {selectedRoom.address.city}, {selectedRoom.address.state} -{" "}
                {selectedRoom.address.postalCode},{" "}
                {selectedRoom.address.country}
              </p>
              <p>Nearby: {selectedRoom.nearby.join(", ")}</p>
              <p>
                Available Features:{" "}
                {selectedRoom.roomAvailableFeatures.join(", ") || "None"}
              </p>
              <p>
                Not Available Features:{" "}
                {selectedRoom.roomNotAvailableFeatures.join(", ") || "None"}
              </p>
              <p>
                Status:{" "}
                <span className="text-green-400">
                  {selectedRoom.roomStatus}
                </span>
              </p>
              <p>
                BookedBy Status:{" "}
                <span className="text-green-400">
                  {selectedRoom.bookingRequestStatus}
                </span>
              </p>

              {selectedRoom.bookingInfo && (
                <>
                  <hr className="my-2 border-gray-700" />
                  <h3 className="font-semibold text-white">Payment Booking Info:</h3>
                  <p>Status: {selectedRoom.bookingInfo.status}</p>
                  <p className="text-green-400">
                    Payment Method: {selectedRoom.bookingInfo.paymentMethod}
                  </p>
                  <p>Notes: {selectedRoom.bookingInfo.notes || "N/A"}</p>
                  <p className="text-red-400">
                    Booked By: {selectedRoom.bookingInfo.bookedByName || "N/A"}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
