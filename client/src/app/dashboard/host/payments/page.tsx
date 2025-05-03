'use client';

import { useState } from 'react';
import { FiCheckCircle, FiXCircle, FiEye, FiDollarSign } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const payments = [
  {
    id: 1,
    tenantName: 'John Doe',
    listingTitle: '2BHK Flat in Sector 62',
    rent: 12000,
    paymentStatus: 'Pending', // Can be "Pending", "Paid"
    paymentDate: '2025-05-01',
    paymentMethod: 'Credit Card',
  },
  {
    id: 2,
    tenantName: 'Jane Smith',
    listingTitle: 'Shared Room for Students',
    rent: 5000,
    paymentStatus: 'Paid',
    paymentDate: '2025-04-28',
    paymentMethod: 'Bank Transfer',
  },
];

export default function ReceivePaymentsPage() {
  const router = useRouter();

  const [paymentList, setPaymentList] = useState(payments);

  const handlePaymentReceived = (paymentId: number) => {
    setPaymentList((prev) =>
      prev.map((payment) =>
        payment.id === paymentId ? { ...payment, paymentStatus: 'Paid' } : payment
      )
    );
  };

  const handleViewDetails = (paymentId: number) => {
    // Navigate to a detailed page to view the payment transaction
    router.push(`/dashboard/host/payments/view/${paymentId}`);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Receive Payments</h1>

      <div className="grid gap-6">
        {paymentList.map((payment) => (
          <div key={payment.id} className="bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">{payment.tenantName}</h3>
              <p className="text-sm text-gray-400">Paid via: {payment.paymentMethod}</p>
            </div>
            <p className="text-sm text-gray-400 mb-3">Listing: {payment.listingTitle}</p>
            <p className="text-sm text-gray-400 mb-3">Rent: ₹{payment.rent}</p>
            <p className="text-sm text-gray-400 mb-3">Payment Date: {payment.paymentDate}</p>

            <div className="flex justify-between items-center">
              <p
                className={`text-sm font-medium ${
                  payment.paymentStatus === 'Pending'
                    ? 'text-yellow-400'
                    : 'text-green-400'
                }`}
              >
                Payment Status: {payment.paymentStatus}
              </p>

              <div className="flex gap-3">
                {payment.paymentStatus === 'Pending' && (
                  <button
                    onClick={() => handlePaymentReceived(payment.id)}
                    className="text-green-400 hover:text-green-300 flex items-center gap-1"
                  >
                    <FiCheckCircle />
                    Mark as Paid
                  </button>
                )}
                <button
                  onClick={() => handleViewDetails(payment.id)}
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <FiEye />
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
