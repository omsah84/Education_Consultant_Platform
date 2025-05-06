'use client';

import { useEffect, useState } from 'react';
import { FiCreditCard, FiDollarSign, FiCalendar, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useAuth } from '@/lib/AuthContext'; // Assuming you have an Auth context

const PaymentHistoryPage = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch payment history (use an API call or context here)
  useEffect(() => {
    if (user) {
      // Simulating fetching data, replace with actual API call
      setTimeout(() => {
        const fetchedPayments = [
          { id: 1, amount: 3000, date: '2025-04-10', status: 'Completed' },
          { id: 2, amount: 5000, date: '2025-03-15', status: 'Pending' },
          { id: 3, amount: 4000, date: '2025-02-20', status: 'Completed' },
        ];
        setPayments(fetchedPayments);
        setLoading(false);
      }, 1000);
    }
  }, [user]);

  if (loading) return <p className="text-white p-6">Loading payment history...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Payment History</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <FiCreditCard className="text-4xl text-yellow-400" />
          <h2 className="text-2xl font-semibold">Your Payment History</h2>
        </div>

        {/* Table to display payment history */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-700">
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Amount (₹)</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="bg-gray-800 hover:bg-gray-700">
                  <td className="p-3">{payment.date}</td>
                  <td className="p-3">₹{payment.amount}</td>
                  <td className="p-3">
                    <span
                      className={`${
                        payment.status === 'Completed'
                          ? 'text-green-400'
                          : payment.status === 'Pending'
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    {payment.status === 'Completed' ? (
                      <FiCheckCircle className="text-green-400 text-xl" />
                    ) : payment.status === 'Pending' ? (
                      <FiXCircle className="text-yellow-400 text-xl" />
                    ) : (
                      <FiXCircle className="text-red-400 text-xl" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryPage;
