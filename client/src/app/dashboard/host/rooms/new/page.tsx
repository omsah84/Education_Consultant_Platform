"use client";

import { useAuth } from "@/lib/AuthContext";
import { useApi } from "@/lib/useApi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiArrowLeft, FiUpload } from "react-icons/fi";
import { useSearchParams } from "next/navigation";

interface RoomFormData {
  listingId: string;
  description: string;
  pricePerMonth: string;
  type: string;
  occupancyType: string;
  availableFeatures: string[];
  notAvailableFeatures: string[];
  images: File[];
}

const allFeatures = [
  "WiFi",
  "Air Conditioning",
  "Heater",
  "Washing Machine",
  "Refrigerator",
  "TV",
  "Private Bathroom",
  "Parking",
  "Electricity",
  "Water Supply",
  "CCTV",
  "Security",
  "Housekeeping",
  "Power Backup",
  "Geyser",
];

const roomTypes = ["Room", "Flat", "Studio", "Dorm", "PG", "Apartment"];
const occupancyTypes = ["Private", "Sharing", "Flat"];

export default function CreateRoomPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const api = useApi();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState<RoomFormData>({
    listingId: "", // Prefill this later with query param if needed
    description: "",
    pricePerMonth: "",
    type: "Room",
    occupancyType: "Private",
    availableFeatures: [],
    notAvailableFeatures: [],
    images: [],
  });

  // Fetch listingId from search params and update state when available
  useEffect(() => {
    const listingId = searchParams.get("listingId");
    if (listingId) {
      setForm((prev) => ({ ...prev, listingId }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (
    feature: string,
    target: "availableFeatures" | "notAvailableFeatures"
  ) => {
    setForm((prev) => {
      const otherTarget =
        target === "availableFeatures"
          ? "notAvailableFeatures"
          : "availableFeatures";
      const updated = prev[target].includes(feature)
        ? prev[target].filter((f) => f !== feature)
        : [...prev[target], feature];

      return {
        ...prev,
        [target]: updated,
        [otherTarget]: prev[otherTarget].filter((f) => f !== feature),
      };
    });
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(files)],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in.");

    const formData = new FormData();
    formData.append("listingId", form.listingId);
    formData.append("description", form.description);
    formData.append("pricePerMonth", form.pricePerMonth);
    formData.append("type", form.type);
    formData.append("occupancyType", form.occupancyType);
    form.availableFeatures.forEach((feature) =>
      formData.append("availableFeatures[]", feature)
    );
    form.notAvailableFeatures.forEach((feature) =>
      formData.append("notAvailableFeatures[]", feature)
    );
    form.images.forEach((image) => formData.append("images", image));

    try {
      const response = await api.post("/room/room-listing", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response?.data?.success) {
        router.push("/dashboard/host/rooms");
      } else {
        alert("Failed to create room.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };

  if (loading) return <p className="text-white p-6">Loading...</p>;
  if (!isAuthenticated) return <p className="text-white p-6">Please log in.</p>;

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto text-white">
      <button
        onClick={() => router.back()}
        className="text-blue-400 flex items-center gap-2 mb-6"
      >
        <FiArrowLeft /> Back
      </button>

      <h1 className="text-2xl font-bold mb-6">Create Room</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Listing ID */}
        <input
          type="text"
          name="listingId"
          value={form.listingId}
          readOnly
          className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-gray-400"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full p-3 rounded bg-gray-800 border border-gray-600"
        />

        {/* Price */}
        <input
          type="number"
          name="pricePerMonth"
          placeholder="Price per month"
          value={form.pricePerMonth}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-gray-800 border border-gray-600"
        />

        {/* Type and Occupancy */}
        <div className="grid grid-cols-2 gap-4">
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="p-3 bg-gray-800 border border-gray-600 rounded"
          >
            {roomTypes.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <select
            name="occupancyType"
            value={form.occupancyType}
            onChange={handleChange}
            className="p-3 bg-gray-800 border border-gray-600 rounded"
          >
            {occupancyTypes.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        {/* Features */}
        <div>
          <h3 className="font-semibold mb-2">Available Features</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {allFeatures.map((feature) => (
              <label key={feature} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.availableFeatures.includes(feature)}
                  onChange={() => handleCheckbox(feature, "availableFeatures")}
                />
                <span>{feature}</span>
              </label>
            ))}
          </div>

          <h3 className="font-semibold mt-4 mb-2">Not Available Features</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {allFeatures.map((feature) => (
              <label key={feature} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.notAvailableFeatures.includes(feature)}
                  onChange={() =>
                    handleCheckbox(feature, "notAvailableFeatures")
                  }
                />
                <span>{feature}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2">Upload Images</label>
          <input
            type="file"
            required
            multiple
            accept="image/*"
            onChange={handleImagesChange}
            className="block w-full text-sm text-gray-400 file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded hover:file:bg-blue-600"
          />

          {/* Preview Images */}
          {form.images.length > 0 && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {form.images.map((file, i) => (
                <div
                  key={i}
                  className="relative w-20 h-20 rounded overflow-hidden"
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`preview-${i}`}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          <FiUpload />
          Submit Room
        </button>
      </form>
    </div>
  );
}
