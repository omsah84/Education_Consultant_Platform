'use client';

import { useState, useEffect } from 'react';
import { FiCalendar } from 'react-icons/fi';
import { useAuth } from '@/lib/AuthContext'; // Assuming you have an Auth context

const RentalHistoryPage = () => {
  const { user } = useAuth();
  const [rentalHistory, setRentalHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching rental history (replace with actual API call)
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        const fetchedRentalHistory = [
          {
            id: '1',
            amount: 12000,
            dueDate: '2025-04-01',
            status: 'Paid',
            paymentDate: '2025-04-01',
          },
          {
            id: '2',
            amount: 12000,
            dueDate: '2025-03-01',
            status: 'Paid',
            paymentDate: '2025-03-01',
          },
          {
            id: '3',
            amount: 12000,
            dueDate: '2025-02-01',
            status: 'Pending',
            paymentDate: '',
          },
        ];
        setRentalHistory(fetchedRentalHistory);
        setLoading(false);
      }, 1000);
    }
  }, [user]);

  if (loading) return <p className="text-white p-6">Loading rental history...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Rental History</h1>

      {/* Rental History List */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <FiCalendar className="text-4xl text-yellow-400" />
          <h2 className="text-2xl font-semibold">Your Rental History</h2>
        </div>

        {/* Displaying Rental History */}
        {rentalHistory.length > 0 ? (
          <div className="space-y-4">
            {rentalHistory.map((entry) => (
              <div
                key={entry.id}
                className="flex justify-between items-center border-b border-gray-600 pb-4"
              >
                <div className="text-lg">
                  <div>Amount: ₹{entry.amount}</div>
                  <div>Due Date: {entry.dueDate}</div>
                  <div>Status: {entry.status}</div>
                  {entry.status === 'Paid' && <div>Payment Date: {entry.paymentDate}</div>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-400">No rental history available.</p>
        )}
      </div>
    </div>
  );
};

export default RentalHistoryPage;
