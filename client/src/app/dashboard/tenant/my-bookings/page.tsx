'use client';

import { useEffect, useState } from 'react';
import { useApi } from '@/lib/useApi';
import { useAuth } from '@/lib/AuthContext';

interface Room {
  _id: string;
  description: string;
  pricePerMonth: number;
  status: string;
  type: string;
  occupancyType: string;
  images: string[]; // Assuming images are URLs
}

interface Booking {
  _id: string;
  roomId: Room | null;
  status: string; // Booking status
  createdAt: string;
}

const MyBookingRequests = () => {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const api = useApi();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isAuthenticated || authLoading) return;

    const fetchBookingRequests = async () => {
      try {
        const res = await api.get('/room/my-booking-requests');
        if (res.data?.success) {
          setBookings(res.data.data);
          console.log(res.data.data); // Debugging log
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.error('Error fetching booking requests:', err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingRequests();
  }, [isAuthenticated, authLoading]);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">My Booking Requests</h2>

      {loading && <p className="text-gray-400">Loading...</p>}
      {!loading && bookings.length === 0 && (
        <p className="text-gray-400">No booking requests with status "Requested".</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          booking.roomId && (
            <div
              key={booking._id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">
                {booking.roomId.type} - {booking.roomId.occupancyType}
              </h3>
              <p className="text-gray-400">Price: ₹{booking.roomId.pricePerMonth}/month</p>
              <p className="text-yellow-400 font-medium mt-2">Status: {booking.roomId.status}</p>
              <p className="text-gray-300 mt-2">{booking.roomId.description || 'No description available'}</p>

              {/* Display room images if available */}
              {booking.roomId.images.length > 0 && (
                <div className="mt-3">
                  <h4 className="font-semibold text-gray-300">Room Images:</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {booking.roomId.images.map((imageUrl, idx) => (
                      <img
                        key={idx}
                        src={imageUrl}
                        alt={`Room Image ${idx + 1}`}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Show booking status */}
              <p className="text-blue-400 mt-3">Booking Status: {booking.status}</p>

              {/* Show createdAt as booking date */}
              <p className="text-sm text-gray-500 mt-2">Requested on: {new Date(booking.createdAt).toLocaleDateString()}</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default MyBookingRequests;
