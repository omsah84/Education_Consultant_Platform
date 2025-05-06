"use client";
import { useAuth } from "@/lib/AuthContext";
import { FiArrowLeft, FiUpload } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/lib/useApi";

export default function CreateListingPage() {
  const router = useRouter();
  const api = useApi();
  const { user, isAuthenticated, loading } = useAuth();

  const [form, setForm] = useState({
    type: "Paying Guest (PG)",
    description: "",
    providerType: "self",
    streetAddress: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    country: "",
    image: null,
    nearby: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return alert("You must be logged in to create a listing.");

    const formData = new FormData();
    formData.append("usernameId", user._id);
    formData.append("type", form.type);
    formData.append("description", form.description);
    formData.append("providerType", form.providerType);
    formData.append("streetAddress", form.streetAddress);
    formData.append("city", form.city);
    formData.append("stateProvince", form.stateProvince);
    formData.append("postalCode", form.postalCode);
    formData.append("country", form.country);
    formData.append("nearby", form.nearby);

    // Append the image if it exists
    if (form.image) {
      formData.append("image", form.image);
    } else {
      console.log("No image provided");
    }

    try {
      const response = await api.post("/listproperty/property-listing", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Make sure the content type is multipart/form-data
      });

      if (response?.data?.success) {
        router.push("/dashboard/host/listings");
      } else {
        alert("Failed to create the listing.");
      }
    } catch (error) {
      console.error("Error creating listing:", error);
      alert("An error occurred while creating the listing.");
    }
  };

  if (loading) return <p className="text-white p-6">Loading...</p>;
  if (!isAuthenticated)
    return <p className="text-white p-6">You must be logged in to create a listing.</p>;

  const accommodationTypes = [
    "House", "Apartment/Flat", "Villa", "Bungalow", "Studio Apartment",
    "Basement Suite", "Tiny House", "Mobile Home", "Caravan", "Farmhouse",
    "Paying Guest (PG)", "Hostel", "Dormitory", "Co-living Space", "Shared Apartment",
    "Lodging", "Boarding House", "Sublet", "Company-Provided Housing", "Government Quarters",
    "Military Barracks", "Monastery", "Ashram", "Serviced Apartment", "Guest House",
    "Tent", "Campsite", "Shelter", "Relief Housing", "Boat House", "Houseboat",
    "Retirement Home", "Old Age Home", "Rehabilitation Center", "Group Home"
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-4xl mx-auto text-white">
      <div className="container mx-auto">
        <button
          onClick={() => router.back()}
          className="text-blue-400 flex items-center gap-2 mb-6 text-sm sm:text-base"
        >
          <FiArrowLeft /> Back
        </button>

        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left">
          Create New Listing
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-4 sm:gap-5">
          {/* Type - Mobile Friendly Select */}
          <div className="w-full relative">
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="appearance-none p-2 sm:p-3 w-full bg-gray-800 border border-gray-600 rounded text-white text-sm sm:text-base pr-8"
            >
              {accommodationTypes.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          {/* Description */}
          <div className="w-full">
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="p-2 sm:p-3 w-full bg-gray-800 border border-gray-600 rounded text-white text-sm sm:text-base"
            />
          </div>

          {/* Provider Type - Mobile Friendly Select */}
          <div className="w-full relative">
            <select
              name="providerType"
              value={form.providerType}
              onChange={handleChange}
              className="appearance-none p-2 sm:p-3 w-full bg-gray-800 border border-gray-600 rounded text-white text-sm sm:text-base pr-8"
            >
              {["self", "private", "government", "company", "religious", "other"].map((type) => (
                <option className="w-[10%]" key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          {/* Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <input
              type="text"
              name="streetAddress"
              placeholder="Street Address"
              value={form.streetAddress}
              onChange={handleChange}
              required
              className="p-2 sm:p-3 bg-gray-800 border border-gray-600 rounded text-white text-sm sm:text-base"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
              className="p-2 sm:p-3 bg-gray-800 border border-gray-600 rounded text-white text-sm sm:text-base"
            />
            <input
              type="text"
              name="stateProvince"
              placeholder="State/Province"
              value={form.stateProvince}
              onChange={handleChange}
              required
              className="p-2 sm:p-3 bg-gray-800 border border-gray-600 rounded text-white text-sm sm:text-base"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={form.postalCode}
              onChange={handleChange}
              required
              className="p-2 sm:p-3 bg-gray-800 border border-gray-600 rounded text-white text-sm sm:text-base"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={handleChange}
              required
              className="p-2 sm:p-3 bg-gray-800 border border-gray-600 rounded text-white text-sm sm:text-base col-span-1 sm:col-span-2"
            />
          </div>

          {/* Nearby */}
          <div className="w-full">
            <input
              type="text"
              name="nearby"
              placeholder="Nearby places (comma-separated)"
              value={form.nearby}
              onChange={handleChange}
              className="p-2 sm:p-3 w-full bg-gray-800 border border-gray-600 rounded text-white text-sm sm:text-base"
            />
          </div>

          {/* Image Upload */}
          <div className="w-full">
            <label className="block mb-1 text-sm sm:text-base">Upload Image</label>
            <input
              type="file"
              required
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm sm:text-base text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-500 file:text-white
                hover:file:bg-blue-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 sm:py-3 px-4 rounded hover:bg-blue-700 transition text-sm sm:text-base mt-2"
          >
            <FiUpload />
            Submit Listing
          </button>
        </form>
      </div>
    </div>
  );
}
