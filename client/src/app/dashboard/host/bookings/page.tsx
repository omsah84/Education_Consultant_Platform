"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/lib/useApi";
import { useAuth } from "@/lib/AuthContext";

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

export default function ConfirmedBookingsPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const api = useApi();
  const router = useRouter();

  const [confirmedList, setConfirmedList] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Confirmed Bookings</h1>

      {loading && <p className="text-gray-400">Loading confirmed rooms...</p>}

      {!loading && errorMessage && (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-4">
          <p className="text-red-400">{errorMessage}</p>
        </div>
      )}

      {!loading && !errorMessage && confirmedList.length === 0 && (
        <p className="text-gray-400">No confirmed bookings found.</p>
      )}

      {!loading && confirmedList.length > 0 && (
        <div className="grid gap-6">
          {confirmedList.map((room) => (
            <div
              key={room.roomId}
              className="bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition p-4"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">
                  Room Type: {room.roomType}
                </h3>
                <p className="text-sm text-gray-400">
                  ₹{room.roomPricePerMonth}/month
                </p>
              </div>

              <p className="text-sm text-gray-400 mb-2">
                Listing: {room.propertyType}
              </p>

              <p className="text-sm text-gray-400 mb-2">
                Address: {room.address.street}, {room.address.city},{" "}
                {room.address.state} - {room.address.postalCode}
              </p>

              <p className="text-green-400 font-medium text-sm">
                Status: {room.roomStatus}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
