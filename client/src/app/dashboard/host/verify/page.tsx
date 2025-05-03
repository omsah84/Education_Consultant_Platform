'use client';

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { FiArrowLeft, FiUpload } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function VerifyOwnershipPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [form, setForm] = useState({
    propertyTitle: "",
    propertyAddress: "",
    ownerName: "",
    idProof: null, // for file upload
    propertyDocument: null, // for file upload
  });

  if (!user) return <p className="text-white p-6">Loading user...</p>;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: any) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("propertyTitle", form.propertyTitle);
    formData.append("propertyAddress", form.propertyAddress);
    formData.append("ownerName", form.ownerName);
    if (form.idProof) formData.append("idProof", form.idProof);
    if (form.propertyDocument) formData.append("propertyDocument", form.propertyDocument);

    // Simulate API request here
    // Example: await api.post('/verify-ownership', formData);

    console.log("Submitting verify ownership:", formData);
    router.push("/dashboard/host");
  };

  return (
    <div className="p-6 text-white">
      <button
        onClick={() => router.back()}
        className="text-blue-400 flex items-center gap-2 mb-4"
      >
        <FiArrowLeft /> Back
      </button>

      <h1 className="text-2xl font-bold mb-6">Verify Property Ownership</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 max-w-2xl">
        <input
          type="text"
          name="propertyTitle"
          placeholder="Property Title"
          value={form.propertyTitle}
          onChange={handleChange}
          className="p-3 bg-gray-800 border border-gray-600 rounded text-white"
          required
        />
        <input
          type="text"
          name="propertyAddress"
          placeholder="Property Address"
          value={form.propertyAddress}
          onChange={handleChange}
          className="p-3 bg-gray-800 border border-gray-600 rounded text-white"
          required
        />
        <input
          type="text"
          name="ownerName"
          placeholder="Owner Name"
          value={form.ownerName}
          onChange={handleChange}
          className="p-3 bg-gray-800 border border-gray-600 rounded text-white"
          required
        />
        
        {/* File Inputs for ID Proof and Property Document */}
        <div className="flex flex-col gap-2">
          <label className="text-sm">Upload ID Proof</label>
          <input
            type="file"
            name="idProof"
            onChange={handleFileChange}
            className="p-3 bg-gray-800 border border-gray-600 rounded text-white"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm">Upload Property Document</label>
          <input
            type="file"
            name="propertyDocument"
            onChange={handleFileChange}
            className="p-3 bg-gray-800 border border-gray-600 rounded text-white"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          <FiUpload />
          Submit Verification
        </button>
      </form>
    </div>
  );
}
