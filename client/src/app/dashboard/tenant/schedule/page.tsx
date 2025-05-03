'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiCalendar, FiCheckCircle, FiClock,FiUser } from 'react-icons/fi';

const ScheduleVisitPage = () => {
  const router = useRouter();

  // State for managing the selected visit details
  const [visitDetails, setVisitDetails] = useState({
    date: '',
    time: '',
    contact: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setVisitDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Here you would typically send the visit details to your backend
    console.log('Scheduled Visit Details:', visitDetails);
    // Redirect or show a success message
    router.push('/dashboard/tenant');
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Schedule a Visit</h1>
      <p className="text-lg mb-6">Select a time and date for your visit to the listing.</p>

      <form onSubmit={handleSubmit} className="grid gap-4 max-w-lg">
        {/* Select Date */}
        <div className="flex items-center gap-2">
          <FiCalendar className="text-white text-xl" />
          <input
            type="date"
            name="date"
            value={visitDetails.date}
            onChange={handleChange}
            className="p-3 bg-gray-800 border border-gray-600 rounded text-white w-full"
            required
          />
        </div>

        {/* Select Time */}
        <div className="flex items-center gap-2">
          <FiClock className="text-white text-xl" />
          <input
            type="time"
            name="time"
            value={visitDetails.time}
            onChange={handleChange}
            className="p-3 bg-gray-800 border border-gray-600 rounded text-white w-full"
            required
          />
        </div>

        {/* Contact Number */}
        <div className="flex items-center gap-2">
          <FiUser className="text-white text-xl" />
          <input
            type="text"
            name="contact"
            value={visitDetails.contact}
            onChange={handleChange}
            placeholder="Your Contact Number"
            className="p-3 bg-gray-800 border border-gray-600 rounded text-white w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-6"
        >
          <FiCheckCircle />
          Schedule Visit
        </button>
      </form>
    </div>
  );
};

export default ScheduleVisitPage;
