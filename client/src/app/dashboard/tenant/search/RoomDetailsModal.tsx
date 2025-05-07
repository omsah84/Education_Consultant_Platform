'use client';
import Image from 'next/image';
import React from 'react';

const RoomDetailsModal = ({ room, onClose }: { room: any; onClose: () => void }) => {
  if (!room) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4 sm:px-6">
      <div className="bg-white text-black w-full max-w-3xl p-4 sm:p-6 rounded-lg overflow-y-auto max-h-[90vh] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-red-600 text-xl sm:text-2xl font-bold"
        >
          ✖
        </button>

        <h2 className="text-xl sm:text-2xl font-bold mb-2">
          {room.propertyType} - {room.roomType}
        </h2>

        <p className="text-gray-700 text-sm sm:text-base mb-2">
          {room.roomStatus} | {room.roomOccupancyType}
        </p>

        <p className="text-lg font-semibold mb-4">₹{room.roomPricePerMonth} / month</p>

        <div className="mb-3">
          <strong>Room Description:</strong>
          <p className="text-sm sm:text-base">{room.roomDescription}</p>
        </div>

        <div className="mb-3">
          <strong>Property Description:</strong>
          <p className="text-sm sm:text-base">{room.propertyDescription}</p>
        </div>

        <div className="mb-3">
          <strong>Available Features:</strong>
          <ul className="list-disc ml-5 text-sm sm:text-base">
            {room.roomAvailableFeatures?.map((f: string, idx: number) => (
              <li key={idx}>{f}</li>
            ))}
          </ul>
        </div>

        <div className="mb-3">
          <strong>Not Available Features:</strong>
          <ul className="list-disc ml-5 text-sm sm:text-base">
            {room.roomNotAvailableFeatures?.map((f: string, idx: number) => (
              <li key={idx}>{f}</li>
            ))}
          </ul>
        </div>

        <div className="mb-3">
          <strong>Nearby:</strong>
          <ul className="list-disc ml-5 text-sm sm:text-base">
            {room.nearby?.map((place: string, idx: number) => (
              <li key={idx}>{place}</li>
            ))}
          </ul>
        </div>

        <div className="mb-3">
          <strong>Provider:</strong>
          <p className="text-sm sm:text-base">{room.providerType}</p>
        </div>

        <div className="mb-3">
          <strong>Address:</strong>
          <p className="text-sm sm:text-base">
            {room.address.street}, {room.address.city}, {room.address.state},{' '}
            {room.address.postalCode}, {room.address.country}
          </p>
        </div>

        {room.roomImages?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {room.roomImages.map((img: string, idx: number) => (
            <Image
            key={idx}
            src={img}
            alt={`Room ${idx}`}
            width={500}
            height={300}
            className="rounded w-full h-auto object-cover max-h-60"
          />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetailsModal;
