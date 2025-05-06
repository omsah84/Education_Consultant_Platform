"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiUpload } from "react-icons/fi";
import { useApi } from "@/lib/useApi";

export default function VerifyOwnershipPage() {
  const router = useRouter();
  const api = useApi();
  const { accessToken, isAuthenticated, isLoading } = useAuth();

  const [form, setForm] = useState({
    phoneNumber: "",
    state: "",
    district: "",
    city: "",
    verificationDocuments: null as File | null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
  const [hasExistingVerification, setHasExistingVerification] = useState(false);

  useEffect(() => {
    const fetchVerification = async () => {

      try {
        const res = await api("/owner/owner-verification");

        if (res?.data) {
          setHasExistingVerification(true);
          setVerificationStatus(res.data.verificationStatus || "pending");
        } else {
          setHasExistingVerification(false);
        }
      } catch (err: any) {
        if (err?.response?.status === 404) {
          setHasExistingVerification(false);
        } else {
          console.error("Error fetching verification:", err);
        }
      }
    };

    if (isAuthenticated) fetchVerification();
  }, [accessToken, isAuthenticated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      setForm((prev) => ({ ...prev, verificationDocuments: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("phoneNumber", form.phoneNumber);
    formData.append("address[state]", form.state);
    formData.append("address[district]", form.district);
    formData.append("address[city]", form.city);
    if (form.verificationDocuments) {
      formData.append("verificationDocuments", form.verificationDocuments);
    }

    try {
      
      const res = await api("/owner/owner-verification", {
        method: "POST",
      data: formData,
      });

      if (res?.data) {
        setHasExistingVerification(true);
        setVerificationStatus(res.data.verificationStatus || "pending");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to submit verification");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading || !isAuthenticated) return <p className="text-white">Loading...</p>;

  return (
    <div className="p-6 text-white max-w-2xl mx-auto">
      <button onClick={() => router.back()} className="text-blue-400 flex items-center gap-2 mb-4">
        <FiArrowLeft /> Back
      </button>

      <h1 className="text-2xl font-bold mb-4">Verify Property Ownership</h1>

      {hasExistingVerification ? (
        <p className="mb-6">
          <span className="font-semibold">Your verification status: </span>
          <span
            className={`inline-block px-3 py-1 rounded text-sm font-medium ${
              verificationStatus === "approved"
                ? "bg-green-600"
                : verificationStatus === "rejected"
                ? "bg-red-600"
                : "bg-yellow-600"
            }`}
          >
            {verificationStatus}
          </span>
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4">
          {error && <p className="text-red-500">{error}</p>}

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
            className="p-3 bg-gray-800 border border-gray-600 rounded"
            required
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="p-3 bg-gray-800 border border-gray-600 rounded"
            required
          />

          <input
            type="text"
            name="district"
            placeholder="District"
            value={form.district}
            onChange={handleChange}
            className="p-3 bg-gray-800 border border-gray-600 rounded"
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="p-3 bg-gray-800 border border-gray-600 rounded"
            required
          />

          <div>
            <label className="block text-sm mb-1">Upload Verification Document</label>
            <input
              type="file"
              name="verificationDocuments"
              onChange={handleFileChange}
              className="p-2 bg-gray-800 border border-gray-600 rounded w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            <FiUpload />
            {submitting ? "Submitting..." : "Submit Verification"}
          </button>
        </form>
      )}
    </div>
  );
}
