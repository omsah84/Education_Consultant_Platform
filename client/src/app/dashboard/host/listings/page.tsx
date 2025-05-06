"use client";

import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";
import { FiPlus, FiEdit, FiEye } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/lib/useApi";
import Image from "next/image";

// Define the structure for a listing object
interface Listing {
  _id: string;
  type: string;
  description?: string;
  providerType: string;
  streetAddress: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  image?: string;
  nearby: string[];
  createdAt: string;
}

export default function HostListingsPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const api = useApi();

  // Define the state for listings and loading state
  const [listings, setListings] = useState<Listing[]>([]);
  const [loadingListings, setLoadingListings] = useState<boolean>(true);

  useEffect(() => {
    const fetchListings = async () => {
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }

      try {
        const response = await api.get("/listproperty/property-listings");

        if (response?.data?.success) {
          setListings(response.data.data); // assuming controller sends it as `data`
        } else {
          setListings([]);
        }
      } catch (error: any) {
        if (error.response?.status === 404) {
          // Not found is a valid state — no listings yet
          setListings([]);
        } else {
          console.error("An unexpected error occurred:", error.message || error);
        }
      } finally {
        setLoadingListings(false);
      }
    };

    if (isAuthenticated) fetchListings();
  }, []);

  if (loading || loadingListings) return <p className="text-white p-6">Loading...</p>;
  if (!user) return <p className="text-white p-6">Loading user...</p>;

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Your Listings</h1>

<Link
  href="/dashboard/host/listings/new"
  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm sm:text-base md:text-lg"
>
  <FiPlus />
  Add New Listing
</Link>

      </div>

      {listings.length === 0 ? (
        <p className="text-center text-gray-400">No listings found. Add one now!</p>
      ) : (
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <Link key={listing._id} href={`/dashboard/host/rooms/new?listingId=${listing._id}`}>
            <div  className="bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition" >
              <div className="relative w-full h-48" >
                <Image
                  src={listing.image || "/placeholder-image.jpg"}
                  alt={listing.description || "Property Image"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{listing.type}</h3>
                <p className="text-sm text-gray-400 mb-1">
                  {listing.description || "No description provided."}
                </p>
                <p className="text-sm text-gray-300 mb-1">🏢 Provider: {listing.providerType}</p>
                <p className="text-sm text-gray-300 mb-1">
                  📍 {listing.streetAddress}, {listing.city}, {listing.stateProvince}, {listing.postalCode}, {listing.country}
                </p>
                <p className="text-sm text-gray-300 mb-1">
                  🛠️ Nearby: {listing.nearby?.length ? listing.nearby.join(", ") : "No nearby locations listed"}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  🕒 Listed on: {new Date(listing.createdAt).toLocaleDateString()}
                </p>

              </div>
            </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
