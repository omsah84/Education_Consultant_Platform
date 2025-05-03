'use client';

import { useState } from 'react';
import { FiCheckCircle, FiXCircle, FiCalendar, FiEye } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const bookings = [
  {
    id: 1,
    tenantName: 'John Doe',
    listingTitle: '2BHK Flat in Sector 62',
    bookingDate: '2025-05-10',
    status: 'Confirmed',
    checkInDate: '2025-05-15',
    checkOutDate: '2025-05-30',
  },
  {
    id: 2,
    tenantName: 'Jane Smith',
    listingTitle: 'Shared Room for Students',
    bookingDate: '2025-04-28',
    status: 'Pending',
    checkInDate: '2025-05-05',
    checkOutDate: '2025-05-20',
  },
];

export default function TrackBookingsPage() {
  const router = useRouter();
  const [bookingList, setBookingList] = useState(bookings);

  const handleBookingConfirm = (bookingId: number) => {
    setBookingList((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status: 'Confirmed' } : booking
      )
    );
  };

  const handleBookingCancel = (bookingId: number) => {
    setBookingList((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status: 'Cancelled' } : booking
      )
    );
  };

  const handleViewDetails = (bookingId: number) => {
    // Navigate to a detailed page to view the booking details
    router.push(`/dashboard/host/bookings/view/${bookingId}`);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Track Bookings & Availability</h1>

      <div className="grid gap-6">
        {bookingList.map((booking) => (
          <div key={booking.id} className="bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">{booking.tenantName}</h3>
              <p className="text-sm text-gray-400">Booking Date: {booking.bookingDate}</p>
            </div>
            <p className="text-sm text-gray-400 mb-3">Listing: {booking.listingTitle}</p>
            <p className="text-sm text-gray-400 mb-3">Check-In Date: {booking.checkInDate}</p>
            <p className="text-sm text-gray-400 mb-3">Check-Out Date: {booking.checkOutDate}</p>

            <div className="flex justify-between items-center">
              <p
                className={`text-sm font-medium ${
                  booking.status === 'Pending' ? 'text-yellow-400' : booking.status === 'Confirmed' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                Status: {booking.status}
              </p>

              <div className="flex gap-3">
                {booking.status === 'Pending' && (
                  <button
                    onClick={() => handleBookingConfirm(booking.id)}
                    className="text-green-400 hover:text-green-300 flex items-center gap-1"
                  >
                    <FiCheckCircle />
                    Confirm Booking
                  </button>
                )}

                {booking.status !== 'Cancelled' && (
                  <button
                    onClick={() => handleBookingCancel(booking.id)}
                    className="text-red-400 hover:text-red-300 flex items-center gap-1"
                  >
                    <FiXCircle />
                    Cancel Booking
                  </button>
                )}

                <button
                  onClick={() => handleViewDetails(booking.id)}
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
