'use client';

import { FiThumbsUp, FiMessageCircle, FiEdit, FiEye } from 'react-icons/fi';

const feedbacks = [
  {
    id: 1,
    tenant: 'Tenant A',
    listing: '2BHK Flat in Sector 62',
    rating: 5,
    review: 'Great place, very spacious and comfortable!',
    postedAt: '2025-05-15T10:00:00Z',
  },
  {
    id: 2,
    tenant: 'Tenant B',
    listing: 'Shared Room for Students',
    rating: 4,
    review: 'Good amenities, but the room was a bit small.',
    postedAt: '2025-04-22T14:00:00Z',
  },
];

export default function ManageFeedbackPage() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Manage Feedback</h1>

      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{feedback.listing}</h3>
              <span className="text-sm text-yellow-400">{`Rating: ${feedback.rating}/5`}</span>
            </div>
            <p className="text-gray-400 text-sm mb-2">Tenant: {feedback.tenant}</p>
            <p className="text-sm mb-1">Review: {feedback.review}</p>
            <p className="text-sm mb-1">Posted on: {new Date(feedback.postedAt).toLocaleDateString()}</p>

            <div className="flex gap-3 mt-4">
              <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300">
                <FiEye /> View
              </button>
              <button className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300">
                <FiEdit /> Respond
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
