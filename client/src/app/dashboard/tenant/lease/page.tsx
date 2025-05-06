'use client';

import { useEffect, useState } from 'react';
import { FiFileText, FiDownload, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '@/lib/AuthContext'; // Assuming you have an Auth context

const LeaseAgreementPage = () => {
  const { user } = useAuth();
  const [leaseAgreement, setLeaseAgreement] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Simulating fetching the lease agreement data (you can replace this with an actual API call)
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        const fetchedLeaseAgreement = {
          agreementId: '123456',
          startDate: '2025-05-01',
          endDate: '2026-05-01',
          status: 'Active',
          documentUrl: '/path/to/lease/agreement.pdf', // URL for downloading the lease agreement
        };
        setLeaseAgreement(fetchedLeaseAgreement);
        setLoading(false);
      }, 1000);
    }
  }, [user]);

  if (loading) return <p className="text-white p-6">Loading lease agreement...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Lease Agreement</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <FiFileText className="text-4xl text-yellow-400" />
          <h2 className="text-2xl font-semibold">Your Lease Agreement</h2>
        </div>

        {/* Displaying Lease Agreement Details */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg">Agreement ID:</span>
            <span className="text-lg font-medium">{leaseAgreement.agreementId}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg">Start Date:</span>
            <span className="text-lg font-medium">{leaseAgreement.startDate}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg">End Date:</span>
            <span className="text-lg font-medium">{leaseAgreement.endDate}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg">Status:</span>
            <span
              className={`text-lg font-medium ${
                leaseAgreement.status === 'Active'
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}
            >
              {leaseAgreement.status}
            </span>
          </div>
        </div>

        {/* Action to download the agreement */}
        <div className="mt-6 flex justify-end gap-4">
          <a
            href={leaseAgreement.documentUrl}
            download
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            <FiDownload className="text-xl" />
            Download Lease Agreement
          </a>
        </div>

        {/* Option to acknowledge or sign the agreement */}
        <div className="mt-6 flex items-center gap-4">
          {leaseAgreement.status === 'Active' && (
            <button
              className="flex items-center gap-2 text-green-400 hover:text-green-300"
              onClick={() => alert('Agreement Signed')}
            >
              <FiCheckCircle className="text-xl" />
              Sign Agreement
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaseAgreementPage;
