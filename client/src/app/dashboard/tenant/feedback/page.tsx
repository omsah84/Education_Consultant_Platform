// app/dashboard/tenant/feedback/page.tsx

'use client';

import { useState } from 'react';
import { FiThumbsUp, FiSend } from 'react-icons/fi';

export default function TenantFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      message: 'The flat was well maintained and exactly as listed.',
      date: '2025-04-20',
    },
    {
      id: 2,
      message: 'Host was responsive and helpful during move-in.',
      date: '2025-04-25',
    },
  ]);

  const [newFeedback, setNewFeedback] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;

    const newEntry = {
      id: feedbacks.length + 1,
      message: newFeedback,
      date: new Date().toISOString().split('T')[0],
    };

    setFeedbacks([newEntry, ...feedbacks]);
    setNewFeedback('');
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FiThumbsUp /> Feedback
      </h1>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          value={newFeedback}
          onChange={(e) => setNewFeedback(e.target.value)}
          placeholder="Share your experience..."
          className="flex-grow p-3 bg-gray-800 border border-gray-600 rounded text-white"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          <FiSend />
        </button>
      </form>

      <div className="space-y-4">
        {feedbacks.map((fb) => (
          <div
            key={fb.id}
            className="bg-gray-800 p-4 rounded border border-gray-700"
          >
            <p className="text-sm">{fb.message}</p>
            <p className="text-xs text-gray-400 mt-2">Date: {fb.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
