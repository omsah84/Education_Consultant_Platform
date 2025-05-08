'use client';

import { useState, useEffect } from 'react';
import { useApi } from '@/lib/useApi';
import { FiCheckCircle, FiClock, FiHome } from 'react-icons/fi';

const TrackMoveInStatusPage = () => {
  const api = useApi();
  const [moveInData, setMoveInData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  useEffect(() => {
    const fetchMoveInStatus = async () => {
      try {
        const response = await api.get('/room/host/movein-status');
        setMoveInData(response.data.data || []);
      } catch (err) {
        setError('Failed to fetch move-in status. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMoveInStatus();
  }, []);

  const openModal = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  if (loading) {
    return <p className="text-white text-center py-4">Loading move-in status...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center py-4">{error}</p>;
  }

  if (!moveInData || moveInData.length === 0) {
    return <p className="text-white text-center py-4">No move-in status found.</p>;
  }

  return (
    <div className="p-6 sm:p-12 text-white">
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-gray-100">Track Move-in Status</h1>

      {moveInData.map((item, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-lg p-4 mb-6 shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
          onClick={() => openModal(item)}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-gray-200">{item.roomDetails?.type || 'Room'}</h2>
          <p className="text-lg text-gray-400">💰 ₹{item.roomDetails?.pricePerMonth}</p>
          <p className="text-lg text-gray-400">📍 {item.roomAddress?.streetAddress}, {item.roomAddress?.city}</p>
          <p className="text-lg text-gray-400">🌐 {item.roomAddress?.country}</p>

          <p className="text-lg text-gray-400">🗓️ Booking Date: {item.paymentDetails?.bookingDate ? new Date(item.paymentDetails.bookingDate).toLocaleDateString() : 'N/A'}</p>
          <p className="text-lg text-gray-400">💳 Payment Method: {item.paymentDetails?.paymentMethod}</p>
          <p className="text-lg text-gray-400">📦 Payment Status: {item.paymentDetails?.status}</p>

          <p className="text-lg text-gray-400">👤 Booked By: {item.bookerDetails?.fullName}</p>
          <p className="text-lg text-gray-400">👥 Provider: {item.hostDetails?.fullName}</p>
          <p className="text-lg text-gray-400">📅 Booking Request Status: {item.bookingRequestStatus}</p>

          <div className="flex items-center gap-3 mt-4">
            {item.bookingRequestStatus === 'Pending' && <FiClock className="text-yellow-400 text-2xl" />}
            {item.bookingRequestStatus === 'Approved' && <FiCheckCircle className="text-green-400 text-2xl" />}
            {item.bookingRequestStatus === 'In Progress' && <FiHome className="text-blue-400 text-2xl" />}
            <span className="text-xl font-semibold text-gray-200">Status: {item.bookingRequestStatus}</span>
          </div>
        </div>
      ))}

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-lg w-full sm:w-2/3 max-w-4xl text-white">
            <h2 className="text-3xl font-bold mb-6 text-gray-100">Booking Details</h2>

            <p className="text-lg text-gray-300">💰 ₹{selectedItem.roomDetails?.pricePerMonth}</p>
            <p className="text-lg text-gray-300">📝 Description: {selectedItem.roomDetails?.description || 'No description available'}</p>
            <p className="text-lg text-gray-300">📍 Address: {selectedItem.roomAddress?.streetAddress}, {selectedItem.roomAddress?.city}</p>
            <p className="text-lg text-gray-300">🌐 {selectedItem.roomAddress?.country}</p>

            <p className="text-lg text-gray-300">🗓️ Booking Date: {selectedItem.paymentDetails?.bookingDate ? new Date(selectedItem.paymentDetails.bookingDate).toLocaleDateString() : 'N/A'}</p>
            <p className="text-lg text-gray-300">💳 Payment Method: {selectedItem.paymentDetails?.paymentMethod}</p>
            <p className="text-lg text-gray-300">📦 Payment Status: {selectedItem.paymentDetails?.status}</p>

            <p className="text-lg text-gray-300">👤 Booked By: {selectedItem.bookerDetails?.fullName}</p>
            <p className="text-lg text-gray-300">👥 Provider: {selectedItem.hostDetails?.fullName}</p>
            <p className="text-lg text-gray-300">📅 Booking Request Status: {selectedItem.bookingRequestStatus}</p>

            <button
              onClick={closeModal}
              className="mt-6 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackMoveInStatusPage;
