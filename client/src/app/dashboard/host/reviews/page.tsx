'use client';

import { useState } from "react";
import { FiCheckCircle, FiXCircle, FiEye } from "react-icons/fi";
import { useRouter } from "next/navigation";

const tenants = [
  {
    id: 1,
    name: "John Doe",
    submittedAt: "2025-05-02T10:00:00Z",
    status: "Pending", // Can be "Pending", "Approved", "Rejected"
    idImage: "/tenant-id-1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    submittedAt: "2025-04-28T14:30:00Z",
    status: "Approved",
    idImage: "/tenant-id-2.jpg",
  },
];

export default function ReviewTenantIDPage() {
  const router = useRouter();

  const [tenantList, setTenantList] = useState(tenants);

  const handleApprove = (tenantId: number) => {
    setTenantList((prev) =>
      prev.map((tenant) =>
        tenant.id === tenantId ? { ...tenant, status: "Approved" } : tenant
      )
    );
  };

  const handleReject = (tenantId: number) => {
    setTenantList((prev) =>
      prev.map((tenant) =>
        tenant.id === tenantId ? { ...tenant, status: "Rejected" } : tenant
      )
    );
  };

  const handleViewID = (tenantId: number) => {
    // Navigate to a detailed page to view the ID (you can customize this further)
    router.push(`/dashboard/host/reviews/view/${tenantId}`);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Review Tenant ID</h1>

      <div className="grid gap-6">
        {tenantList.map((tenant) => (
          <div key={tenant.id} className="bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">{tenant.name}</h3>
              <p className="text-sm text-gray-400">{new Date(tenant.submittedAt).toLocaleString()}</p>
            </div>
            <div className="mb-4">
              <img
                src={tenant.idImage}
                alt={`${tenant.name}'s ID`}
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>

            <div className="flex justify-between items-center">
              <p
                className={`text-sm font-medium ${
                  tenant.status === "Pending"
                    ? "text-yellow-400"
                    : tenant.status === "Approved"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                Status: {tenant.status}
              </p>

              <div className="flex gap-3">
                {tenant.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(tenant.id)}
                      className="text-green-400 hover:text-green-300 flex items-center gap-1"
                    >
                      <FiCheckCircle />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(tenant.id)}
                      className="text-red-400 hover:text-red-300 flex items-center gap-1"
                    >
                      <FiXCircle />
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleViewID(tenant.id)}
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <FiEye />
                  View ID
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
