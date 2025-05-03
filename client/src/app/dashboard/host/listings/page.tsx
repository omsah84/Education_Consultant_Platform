'use client';

import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';
import { FiPlus, FiEdit, FiEye } from 'react-icons/fi';

const listings = [
  {
    id: 1,
    title: '2BHK Flat in Sector 62',
    location: 'Noida',
    rent: 12000,
    status: 'Active',
    postedAt: '2025-05-01T10:00:00Z',
    type: 'Flat',
    amenities: ['Wi-Fi', 'AC', 'Geyser'],
    image: '/flat1.jpg',
  },
  {
    id: 2,
    title: 'Shared Room for Students',
    location: 'Delhi University',
    rent: 5000,
    status: 'Pending',
    postedAt: '2025-04-28T14:30:00Z',
    type: 'PG',
    amenities: ['Wi-Fi', 'Laundry'],
    image: '/pg1.jpg',
  },
];

export default function HostListingsPage() {
  const { user } = useAuth();

  if (!user) return <p className="text-white p-6">Loading user...</p>;

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Listings</h1>
        <Link
          href="/dashboard/host/listings/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          <FiPlus />
          Add New Listing
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition"
          >
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{listing.title}</h3>
              <p className="text-gray-400 text-sm mb-2">📍 {listing.location}</p>
              <p className="text-sm mb-1">💸 Rent: ₹{listing.rent}</p>
              <p className="text-sm mb-1">🏷️ Type: {listing.type}</p>
              <p className="text-sm mb-1">
                🛠️ Amenities: {listing.amenities.join(', ')}
              </p>
              <p
                className={`text-sm mt-1 font-medium ${
                  listing.status === 'Active'
                    ? 'text-green-400'
                    : 'text-yellow-400'
                }`}
              >
                Status: {listing.status}
              </p>

              <div className="flex gap-3 mt-4">
                <button className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  <FiEye /> View
                </button>
                <button className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
                  <FiEdit /> Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
