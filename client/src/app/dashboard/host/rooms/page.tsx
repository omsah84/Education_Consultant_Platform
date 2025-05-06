"use client";

import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/lib/useApi";
import Image from "next/image";

// Updated interface based on merged room + listing data
interface RoomListing {
  roomId: string;
  roomDescription?: string;
  roomPricePerMonth: number;
  roomStatus: string;
  roomType: string;
  roomOccupancyType: string;
  roomAvailableFeatures: string[];
  roomNotAvailableFeatures: string[];
  roomImages: string[];
  roomCreatedAt: string;
  listingId: string;
  propertyType: string;
  propertyDescription?: string;
  providerType?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  nearby?: string[];
  listingCreatedAt: string;
}

export default function HostRoomListingsPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const api = useApi();

  const [roomListings, setRoomListings] = useState<RoomListing[]>([]);
  const [loadingRoomListings, setLoadingRoomListings] = useState<boolean>(true);
  const [selectedRoom, setSelectedRoom] = useState<RoomListing | null>(null);

  useEffect(() => {
    const fetchRoomListings = async () => {
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }

      try {
        const response = await api.get("/room/room-listings");
        if (response?.data?.success) {
          setRoomListings(response.data.data);
        } else {
          setRoomListings([]);
        }
      } catch (error: any) {
        if (error.response?.status === 404) {
          setRoomListings([]);
        } else {
          console.error("An unexpected error occurred:", error.message || error);
        }
      } finally {
        setLoadingRoomListings(false);
      }
    };

    if (isAuthenticated && !loading) {
      fetchRoomListings();
    }
  }, [isAuthenticated, loading, api, router]);

  useEffect(() => {
    if (selectedRoom) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedRoom]);

  if (loading || loadingRoomListings) return <p className="text-white p-6">Loading...</p>;
  if (!user) return <p className="text-white p-6">Loading user...</p>;

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Your Room Listings</h1>
        <Link
          href="/dashboard/host/listings"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm sm:text-base md:text-lg"
        >
          <FiPlus />
          Add New Room
        </Link>
      </div>

      {roomListings.length === 0 ? (
        <p className="text-center text-gray-400">No room listings found. Add one now!</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {roomListings.map((room) => (
            <div
              key={room.roomId}
              onClick={() => setSelectedRoom(room)}
              className="cursor-pointer bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition"
            >
              <div className="relative w-full h-48">
                <Image
                  src={room.roomImages?.[0] || "/placeholder-image.jpg"}
                  alt={room.roomDescription || "Room Image"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{room.roomType}</h3>
                {/* <p className="text-sm text-gray-400 mb-1">{room.roomDescription || "No description provided."}</p> */}
                <p className="text-sm text-gray-300 mb-1">💵 Price: ₹{room.roomPricePerMonth}</p>
                <p className="text-sm text-gray-300 mb-1">📍 Status: {room.roomStatus}</p>
                <p className="text-sm text-gray-300 mb-1">👥 Occupancy: {room.roomOccupancyType}</p>
                {/* Only display a short summary for available features */}
                {/* <p className="text-sm text-gray-300 mb-1">
                  🛠️ Available: {room.roomAvailableFeatures.length ? room.roomAvailableFeatures.slice(0, 3).join(", ") : "None"}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Room Details */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
          <div className="bg-white text-black max-w-2xl w-full rounded-lg shadow-lg overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={() => setSelectedRoom(null)}
              className="absolute top-2 right-2 text-xl font-bold text-gray-700 hover:text-black"
            >
              ✕
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedRoom.roomType}</h2>
              <p className="mb-2">{selectedRoom.roomDescription}</p>
              {selectedRoom.roomImages?.map((image, idx) => (
                <Image
                  key={idx}
                  src={image}
                  alt={`Room image ${idx + 1}`}
                  width={600}
                  height={300}
                  className="rounded mb-4"
                />
              ))}
              <p>💵 Price: ₹{selectedRoom.roomPricePerMonth}</p>
              <p>📍 Status: {selectedRoom.roomStatus}</p>
              <p>👥 Occupancy: {selectedRoom.roomOccupancyType}</p>
              <p>🏡 Property Type: {selectedRoom.propertyType}</p>
              <p>🛠️ Available Features: {selectedRoom.roomAvailableFeatures.join(", ") || "None"}</p>
              <p>🚫 Not Available: {selectedRoom.roomNotAvailableFeatures.join(", ") || "None"}</p>
              {selectedRoom.address && (
                <p>📌 Address: {selectedRoom.address.street}, {selectedRoom.address.city}, {selectedRoom.address.state}</p>
              )}
              <p>🕒 Listed on: {new Date(selectedRoom.listingCreatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
