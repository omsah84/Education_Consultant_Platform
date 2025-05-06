'use client';

import { useState } from 'react';
import { FiCheckCircle, FiClock, FiHome } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const TrackMoveInStatusPage = () => {
  const router = useRouter();

  // Example move-in status data
  const [moveInStatus] = useState({
    status: 'Confirmed', // Could be: 'Pending', 'Confirmed', 'Completed'
    moveInDate: '2025-06-10',
    propertyTitle: '2BHK Flat in Sector 62',
    location: 'Noida',
  });

  const handleTrackMoveIn = () => {
    // Here you can simulate or integrate API for tracking move-in status
    console.log('Tracking move-in status for:', moveInStatus.propertyTitle);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Track Move-in Status</h1>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">{moveInStatus.propertyTitle}</h2>
        <p className="text-lg">📍 {moveInStatus.location}</p>
        <p className="text-lg">🗓️ Move-in Date: {moveInStatus.moveInDate}</p>
      </div>

      {/* Move-in Status */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4">
          {moveInStatus.status === 'Pending' && <FiClock className="text-yellow-400 text-2xl" />}
          {moveInStatus.status === 'Confirmed' && <FiCheckCircle className="text-green-400 text-2xl" />}
          {moveInStatus.status === 'Completed' && <FiHome className="text-blue-400 text-2xl" />}
          <p className="text-xl font-semibold">
            Status: <span className="text-white">{moveInStatus.status}</span>
          </p>
        </div>
        <p className="mt-4 text-lg">
          {moveInStatus.status === 'Pending' && 'Your move-in request is pending confirmation.'}
          {moveInStatus.status === 'Confirmed' && 'Your move-in is confirmed! Get ready for your new home.'}
          {moveInStatus.status === 'Completed' && 'You have successfully moved in! Welcome to your new home.'}
        </p>
      </div>

      {/* Track Status Button */}
      {moveInStatus.status === 'Pending' && (
        <button
          onClick={handleTrackMoveIn}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-6"
        >
          <FiClock />
          Track Move-in Status
        </button>
      )}

      {/* Additional Actions */}
      {moveInStatus.status === 'Confirmed' && (
        <div className="mt-6 text-lg">
          <p>Your move-in is confirmed for {moveInStatus.moveInDate}. Please prepare accordingly.</p>
          <button
            onClick={() => router.push('/dashboard/tenant/booking-history')}
            className="text-blue-400 hover:text-blue-300"
          >
            View Booking History
          </button>
        </div>
      )}
    </div>
  );
};

export default TrackMoveInStatusPage;
