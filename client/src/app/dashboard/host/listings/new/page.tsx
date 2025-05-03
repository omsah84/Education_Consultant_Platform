"use client";
import { useAuth } from "@/lib/AuthContext";
import { FiPlus, FiEdit, FiEye } from "react-icons/fi";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiUpload } from "react-icons/fi";

export default function CreateListingPage() {
  const router = useRouter();

  const { user } = useAuth();

  const [form, setForm] = useState({
      title: "",
      description: "",
      location: "",
      rent: "",
      type: "PG",
      amenities: [],
    });

    if (!user) return <p className="text-white p-6">Loading user...</p>;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: any) => {
    const { value, checked } = e.target;
    setForm((prev) => {
      const amenities = checked
        ? [...prev.amenities, value]
        : prev.amenities.filter((a) => a !== value);
      return { ...prev, amenities };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Submitting listing:", form);
    // Make API POST request here
    router.push("/dashboard/host/listings");
  };

  return (
    <div className="p-6 text-white">
      <button
        onClick={() => router.back()}
        className="text-blue-400 flex items-center gap-2 mb-4"
      >
        <FiArrowLeft /> Back
      </button>

      <h1 className="text-2xl font-bold mb-6">Create New Listing</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 max-w-2xl">
        <input
          type="text"
          name="title"
          placeholder="Listing Title"
          value={form.title}
          onChange={handleChange}
          className="p-3 bg-gray-800 border border-gray-600 rounded text-white"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="p-3 bg-gray-800 border border-gray-600 rounded text-white"
          rows={4}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="p-3 bg-gray-800 border border-gray-600 rounded text-white"
          required
        />
        <input
          type="number"
          name="rent"
          placeholder="Rent (₹)"
          value={form.rent}
          onChange={handleChange}
          className="p-3 bg-gray-800 border border-gray-600 rounded text-white"
          required
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="p-3 bg-gray-800 border border-gray-600 rounded text-white"
        >
          <option value="PG">PG</option>
          <option value="Flat">Flat</option>
          <option value="Room">Room</option>
        </select>

        {/* Amenities */}
        <fieldset className="flex flex-wrap gap-4">
          {["Wi-Fi", "AC", "Laundry", "Geyser", "Parking"].map((amenity) => (
            <label key={amenity} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={amenity}
                onChange={handleCheckbox}
                className="accent-blue-600"
              />
              <span>{amenity}</span>
            </label>
          ))}
        </fieldset>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          <FiUpload />
          Submit Listing
        </button>
      </form>
    </div>
  );
}
