'use client';

import { FiCalendar, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const bookings = [
  {
    id: 1,
    tenant: 'Tenant A',
    listing: '2BHK Flat in Sector 62',
    checkInDate: '2025-05-10',
    checkOutDate: '2025-05-20',
    paymentStatus: 'Paid',
    bookingStatus: 'Completed',
  },
  {
    id: 2,
    tenant: 'Tenant B',
    listing: 'Shared Room for Students',
    checkInDate: '2025-06-01',
    checkOutDate: '2025-06-15',
    paymentStatus: 'Pending',
    bookingStatus: 'Upcoming',
  },
];

export default function BookingHistoryPage() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Booking History</h1>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{booking.listing}</h3>
              <span className={`text-sm ${booking.bookingStatus === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                {booking.bookingStatus}
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-1">Tenant: {booking.tenant}</p>
            <p className="text-sm mb-1">Check-In: {booking.checkInDate}</p>
            <p className="text-sm mb-1">Check-Out: {booking.checkOutDate}</p>
            <p className="text-sm mb-1">Payment Status: {booking.paymentStatus}</p>

            <div className="flex gap-3 mt-4">
              <button className="flex items-center gap-1 text-green-400 hover:text-green-300">
                <FiCheckCircle />
                Mark as Completed
              </button>
              {booking.paymentStatus === 'Pending' && (
                <button className="flex items-center gap-1 text-red-400 hover:text-red-300">
                  <FiXCircle />
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
