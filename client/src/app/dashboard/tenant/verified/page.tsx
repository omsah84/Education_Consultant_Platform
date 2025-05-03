'use client';

import { useState, useEffect } from 'react';
import { FiHome, FiCheckCircle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const VerifiedListings = () => {
  const router = useRouter();

  // Sample verified listings data
  const [listings, setListings] = useState([
    {
      id: 1,
      title: '2BHK Flat in Sector 62',
      location: 'Noida',
      rent: 12000,
      status: 'Verified',
      type: 'Flat',
      amenities: ['Wi-Fi', 'AC', 'Geyser'],
      image: '/flat1.jpg',
    },
    {
      id: 2,
      title: 'Shared Room for Students',
      location: 'Delhi University',
      rent: 5000,
      status: 'Verified',
      type: 'PG',
      amenities: ['Wi-Fi', 'Laundry'],
      image: '/pg1.jpg',
    },
  ]);

  useEffect(() => {
    // In a real-world scenario, fetch the verified listings from an API
    // Example: fetch('/api/verified-listings').then(response => response.json()).then(data => setListings(data));
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Verified Listings</h1>
      <p className="text-lg mb-6">Explore properties that have been verified for your peace of mind.</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <div key={listing.id} className="bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition">
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
              <p className="text-sm mb-1">🛠️ Amenities: {listing.amenities.join(', ')}</p>

              <div className="flex items-center gap-2 mt-2">
                <FiCheckCircle className="text-green-400" />
                <span className="text-green-400 text-sm font-medium">{listing.status}</span>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => router.push(`/dashboard/tenant/verified/${listing.id}`)}
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <FiHome /> View Listing
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerifiedListings;
