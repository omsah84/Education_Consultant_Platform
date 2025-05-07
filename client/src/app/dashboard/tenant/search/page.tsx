"use client";

import { useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import { useApi } from "@/lib/useApi";
import { useAuth } from "@/lib/AuthContext";
import RoomDetailsModal from "./RoomDetailsModal";

const SearchBrowse = () => {
  const api = useApi();
  const { isAuthenticated } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    pricePerMonth: "",
    type: "",
    occupancyType: "",
    roomStatus: "",
    availableFeatures: "",
    notAvailableFeatures: "",
    nearby: "",
    roomDescription: "",
    propertyDescription: "",
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await api.get(`/room/search?${queryParams.toString()}`);
      if (response.data?.success) {
        setResults(response.data.data);
      } else {
        setResults([]);
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        setResults([]);
      } else {
        console.error("Search failed:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchSearchResults();
  };

  const handleRequestBooking = async (roomId: string) => {
    try {
      // Fetch room details to check the status first
      const roomResponse = await api.get(`/room/${roomId}`);
      const roomStatus = roomResponse.data?.roomStatus; // Access the room status from the response
  
      // If the room's status is not 'Available', show the current status
      if (roomStatus !== "Available") {
        alert(`Room is not available. Current status: ${roomStatus}`);
        return; // Exit the function if the room is not available
      }
  
      // Proceed with requesting booking if the room is available
      const response = await api.post("/room/request-booking", { roomId });
  
      if (response.data?.success) {
        alert("Booking request sent successfully!");
      } else {
        alert("Failed to request booking.");
      }
    } catch (err: any) {
      if (err?.response?.status === 400) {
        // If a 400 error occurs, it usually means the user has already made a request
        alert("You have already requested to book this room.");
      } else {
        console.error("Booking error:", err);
        alert("Something went wrong. Try again.");
      }
    }
  };
  

  return (
    <div className="p-4 md:p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Search & Browse</h1>
      <p className="text-lg mb-6">Find your perfect room listing!</p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Text Inputs */}
          <input
            name="streetAddress"
            placeholder="Street Address"
            onChange={handleInputChange}
            className="input w-full"
          />
          <input
            name="city"
            placeholder="City"
            onChange={handleInputChange}
            className="input w-full"
          />
          <input
            name="state"
            placeholder="State/Province"
            onChange={handleInputChange}
            className="input w-full"
          />
          <input
            name="postalCode"
            placeholder="Postal Code"
            onChange={handleInputChange}
            className="input w-full"
          />
          <input
            name="country"
            placeholder="Country"
            onChange={handleInputChange}
            className="input w-full"
          />
          <input
            name="pricePerMonth"
            type="number"
            placeholder="Max Price (₹)"
            onChange={handleInputChange}
            className="input w-full"
          />

          {/* Enum Selects */}
          <select
            name="type"
            onChange={handleInputChange}
            className="input w-full"
          >
            <option value="">Room Type</option>
            <option value="Room">Room</option>
            <option value="Flat">Flat</option>
            <option value="Studio">Studio</option>
            <option value="Dorm">Dorm</option>
            <option value="PG">PG</option>
            <option value="Apartment">Apartment</option>
          </select>

          <select
            name="occupancyType"
            onChange={handleInputChange}
            className="input w-full"
          >
            <option value="">Occupancy Type</option>
            <option value="Private">Private</option>
            <option value="Sharing">Sharing</option>
            <option value="Flat">Flat</option>
          </select>

          <select
            name="roomStatus"
            onChange={handleInputChange}
            className="input w-full"
          >
            <option value="">Room Status</option>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
          </select>

          <input
            name="availableFeatures"
            placeholder="Available Features (comma-separated)"
            onChange={handleInputChange}
            className="input w-full"
          />
          <input
            name="notAvailableFeatures"
            placeholder="Not Available Features (comma-separated)"
            onChange={handleInputChange}
            className="input w-full"
          />

          {/* New Filters for Nearby and Descriptions */}
          <input
            name="nearby"
            placeholder="Nearby Places (comma-separated)"
            onChange={handleInputChange}
            className="input w-full"
          />
          <input
            name="roomDescription"
            placeholder="Room Description"
            onChange={handleInputChange}
            className="input w-full"
          />
          <input
            name="propertyDescription"
            placeholder="Property Description"
            onChange={handleInputChange}
            className="input w-full"
          />
        </div>

        <div className="flex gap-4 mb-6">
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded flex items-center hover:bg-blue-700"
          >
            <FiSearch className="mr-2" /> Search
          </button>
          <button
            type="button"
            onClick={fetchSearchResults}
            className="bg-green-600 px-4 py-2 rounded flex items-center hover:bg-green-700"
          >
            <FiFilter className="mr-2" /> Apply Filters
          </button>
        </div>
      </form>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-200">Results</h2>

        {loading && <p className="text-gray-400">Loading...</p>}
        {!loading && results.length === 0 && (
          <p className="text-gray-400">No results found.</p>
        )}

        {selectedRoom && (
          <RoomDetailsModal
            room={selectedRoom}
            onClose={() => setSelectedRoom(null)}
          />
        )}

        {results.map((room: any) => (
          <div
            key={room.roomId}
            onClick={() => setSelectedRoom(room)}
            className="cursor-pointer bg-gray-800 p-4 rounded shadow hover:bg-gray-700 transition"
          >
            <h3 className="text-xl font-bold">
              {room.propertyType} - {room.roomType}
            </h3>
            <p className="text-gray-400">₹{room.roomPricePerMonth} / month</p>
            <p className="text-gray-400">
              {room.address?.city}, {room.address?.country}
            </p>
            <p className="text-gray-500 text-sm truncate">
              {room.roomDescription}
            </p>

            {/* Request Booking Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent triggering the modal
                handleRequestBooking(room.roomId);
              }}
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Request Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBrowse;
