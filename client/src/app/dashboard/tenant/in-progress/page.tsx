'use client';

import { useEffect, useState } from 'react';
import { useApi } from '@/lib/useApi';
import { useAuth } from '@/lib/AuthContext';
import Image from 'next/image';

interface Room {
  _id: string;
  description: string;
  pricePerMonth: number;
  status: string;
  type: string;
  occupancyType: string;
  images: string[];
  streetAddress: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
}

interface Booking {
  _id: string;
  roomId: Room | null;
  status: string;
  createdAt: string;
}

const InProgressBookings = () => {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const api = useApi();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<string | null>(null);

  // Modal control
  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  // Form states
  const [paymentMethod, setPaymentMethod] = useState<string>('Cash on Book');
  const [notes, setNotes] = useState<string>('');

  // Fetch in-progress bookings on load
  useEffect(() => {
    if (!isAuthenticated || authLoading) return;

    const fetchInProgressBookings = async () => {
      try {
        const res = await api.get('/room/my-booking-requests/in-progress');
        if (res.data?.success) {
          setBookings(res.data.data);
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.error('Error fetching in-progress bookings:', err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInProgressBookings();
  }, [isAuthenticated, authLoading]);

  const updateBookingStatus = async (bookingId: string, action: 'Confirmed' | 'cancel') => {
    setUpdating(bookingId);
    try {
      const endpoint =
        action === 'Confirmed'
          ? `/room/mark-as-confirmed/${bookingId}`
          : `/room/cancel-booking/${bookingId}`;

      const res = await api.post(endpoint, { paymentMethod, notes,bookingId });
      if (res.data?.success) {
        setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      } else {
        alert(`Failed to ${action === 'Confirmed' ? 'confirm' : 'cancel'} booking.`);
      }
    } catch (err) {
      console.error(`Error while ${action}:`, err);
      alert('Error occurred while updating booking');
    } finally {
      setUpdating(null);
      setShowModal(false);
      setSelectedBookingId(null);
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">In Progress Bookings</h2>

      {loading && <p className="text-gray-400">Loading...</p>}
      {!loading && bookings.length === 0 && (
        <p className="text-gray-400">No bookings currently in progress.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) =>
          booking.roomId ? (
            <div
              key={booking._id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">
                {booking.roomId.type} - {booking.roomId.occupancyType}
              </h3>
              <p className="text-gray-400">Price: ₹{booking.roomId.pricePerMonth}/month</p>
              <p className="text-green-400 font-medium mt-2">Room Status: {booking.roomId.status}</p>
              <p className="text-gray-300 mt-2">{booking.roomId.description || 'No description available'}</p>

              {/* Images */}
              {booking.roomId.images.length > 0 && (
                <div className="mt-3">
                  <h4 className="font-semibold text-gray-300">Room Images:</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {booking.roomId.images.map((imageUrl, idx) => (
                      <Image
                        key={idx}
                        src={imageUrl}
                        alt={`Room Image ${idx + 1}`}
                        width={96}
                        height={96}
                        className="object-cover rounded-md"
                      />
                    ))}
                  </div>
                </div>
              )}

              <p className="text-blue-400 mt-3">Booking Status: {booking.status}</p>
              <p className="text-sm text-gray-500 mt-2">
                Booking Started On: {new Date(booking.createdAt).toLocaleDateString()}
              </p>

              <div className="flex flex-col justify-center sm:flex-row gap-4 mt-4">
                <button
                  onClick={() => {
                    setSelectedBookingId(booking._id);
                    setShowModal(true);
                  }}
                  disabled={updating === booking._id}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md font-semibold text-white disabled:opacity-50 w-full sm:w-full"
                >
                  {updating === booking._id ? 'Processing...' : 'Confirm'}
                </button>

                <button
                  onClick={() => updateBookingStatus(booking._id, 'cancel')}
                  disabled={updating === booking._id}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-semibold text-white disabled:opacity-50 w-full sm:w-full"
                >
                  {updating === booking._id ? 'Processing...' : 'Cancel'}
                </button>
              </div>
            </div>
          ) : null
        )}
      </div>

      {/* Booking Confirmation Modal */}
      {showModal && selectedBookingId && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg text-white">
            <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>
            <p className="mb-4">Are you sure you want to confirm this booking?</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateBookingStatus(selectedBookingId!, 'Confirmed');
              }}
              className="space-y-4"
            >
              {/* Payment Method */}
              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-semibold">
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
                >
                  <option value="Cash on Book">Cash on Book</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="eSewa">eSewa</option>
                  <option value="Khalti">Khalti</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-semibold">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
                  placeholder="Any additional notes for the booking"
                />
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 px-4 py-2 rounded hover:bg-green-500"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InProgressBookings;
