'use client';

import { useState } from 'react';
import { FiBarChart, FiMessageSquare, FiStar } from 'react-icons/fi';

const analyticsData = {
  totalEarnings: 50000,
  totalBookings: 120,
  occupancyRate: 80, // Percentage of days booked
  averageRating: 4.5,
  feedbacks: [
    { tenant: 'John Doe', rating: 5, comment: 'Great place!' },
    { tenant: 'Jane Smith', rating: 4, comment: 'Good value for money.' },
  ],
};

export default function AnalyticsPage() {
  const [analytics] = useState(analyticsData);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">View Analytics & Feedback</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Earnings */}
        <div className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition">
          <h3 className="text-lg font-semibold mb-2">Total Earnings</h3>
          <p className="text-2xl font-bold">₹{analytics.totalEarnings}</p>
        </div>

        {/* Total Bookings */}
        <div className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition">
          <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
          <p className="text-2xl font-bold">{analytics.totalBookings}</p>
        </div>

        {/* Occupancy Rate */}
        <div className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition">
          <h3 className="text-lg font-semibold mb-2">Occupancy Rate</h3>
          <p className="text-2xl font-bold">{analytics.occupancyRate}%</p>
        </div>

        {/* Average Rating */}
        <div className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition">
          <h3 className="text-lg font-semibold mb-2">Average Rating</h3>
          <p className="text-2xl font-bold">{analytics.averageRating} <FiStar className="inline text-yellow-400" /></p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Feedback</h2>

        <div className="bg-gray-800 p-4 rounded-lg shadow">
          {analytics.feedbacks.length === 0 ? (
            <p className="text-gray-400">No feedback received yet.</p>
          ) : (
            <div>
              {analytics.feedbacks.map((feedback, index) => (
                <div key={index} className="border-b border-gray-600 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <FiMessageSquare className="text-blue-400" />
                    <p className="font-semibold">{feedback.tenant}</p>
                  </div>
                  <p className="text-sm">{feedback.comment}</p>
                  <p className="text-sm mt-1 text-yellow-400">Rating: {feedback.rating} <FiStar className="inline" /></p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
