'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiBook, FiCreditCard, FiCheckCircle } from 'react-icons/fi';

const BookAndPayRentPage = () => {
  const router = useRouter();
  
  // Example property data
  const [property] = useState({
    title: '2BHK Flat in Sector 62',
    location: 'Noida',
    rent: 12000,
    availableFrom: '2025-06-01',
  });

  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');

  const handleBookAndPay = async (e: any) => {
    e.preventDefault();
    
    // Simulate booking and payment
    console.log(`Booking and paying for ${property.title}`);

    // Simulate payment success or failure
    const isPaymentSuccess = Math.random() > 0.5; // Randomly simulate payment success or failure

    if (isPaymentSuccess) {
      setPaymentStatus('success');
      router.push('/dashboard/tenant');
    } else {
      setPaymentStatus('failed');
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Book & Pay Rent</h1>
      
      {/* Property Details */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">{property.title}</h2>
        <p className="text-lg">📍 {property.location}</p>
        <p className="text-lg">💸 Rent: ₹{property.rent}</p>
        <p className="text-lg">🗓️ Available From: {property.availableFrom}</p>
      </div>

      {/* Payment Section */}
      <form onSubmit={handleBookAndPay} className="grid gap-4 max-w-lg">
        <div className="flex items-center gap-2">
          <FiCreditCard className="text-white text-xl" />
          <input
            type="text"
            name="paymentMethod"
            placeholder="Enter your payment details"
            className="p-3 bg-gray-800 border border-gray-600 rounded text-white w-full"
            required
          />
        </div>

        {/* Booking Duration (For example, 1 month) */}
        <div className="flex items-center gap-2">
          <FiBook className="text-white text-xl" />
          <select
            name="bookingDuration"
            className="p-3 bg-gray-800 border border-gray-600 rounded text-white w-full"
            required
          >
            <option value="1">1 Month</option>
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
            <option value="12">12 Months</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-6"
        >
          <FiCheckCircle />
          Book & Pay Rent
        </button>
      </form>

      {/* Payment Status */}
      {paymentStatus === 'pending' && (
        <p className="mt-6 text-yellow-400">Processing payment...</p>
      )}
      {paymentStatus === 'success' && (
        <p className="mt-6 text-green-400">Payment Successful! 🎉 Your booking is confirmed.</p>
      )}
      {paymentStatus === 'failed' && (
        <p className="mt-6 text-red-400">Payment failed! Please try again.</p>
      )}
    </div>
  );
};

export default BookAndPayRentPage;
