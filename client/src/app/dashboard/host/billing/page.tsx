'use client';

import { FiCreditCard, FiDownload, FiList, FiDollarSign } from 'react-icons/fi';

const transactions = [
  {
    id: 1,
    date: '2025-05-10',
    amount: 5000,
    status: 'Completed',
  },
  {
    id: 2,
    date: '2025-05-01',
    amount: 12000,
    status: 'Pending',
  },
];

export default function BillingPage() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Billing</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-2">Current Balance</h3>
        <p className="text-2xl font-bold text-green-400">₹15,000</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition"
            >
              <div className="flex justify-between mb-2">
                <p className="text-sm text-gray-400">{transaction.date}</p>
                <p
                  className={`text-sm font-semibold ${
                    transaction.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'
                  }`}
                >
                  {transaction.status}
                </p>
              </div>
              <p className="text-lg font-semibold">₹{transaction.amount}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          <FiDownload /> Download Invoice
        </button>
        <button className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition">
          <FiList /> View All Transactions
        </button>
      </div>
    </div>
  );
}
