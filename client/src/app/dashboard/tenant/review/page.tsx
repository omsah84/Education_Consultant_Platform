'use client';

import { useState } from 'react';
import { FiStar, FiSend } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const GiveReviewPage = () => {
  const router = useRouter();

  const [review, setReview] = useState({
    rating: 0,
    comment: '',
    propertyTitle: '2BHK Flat in Sector 62',
  });

  // Handle rating change
  const handleRatingChange = (rating: number) => {
    setReview((prevReview) => ({ ...prevReview, rating }));
  };

  // Handle text input change
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview((prevReview) => ({ ...prevReview, comment: e.target.value }));
  };

  // Submit review
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would likely send the review data to an API
    console.log('Review submitted:', review);
    router.push('/dashboard/tenant'); // Redirect after submission
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Give a Review</h1>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">{review.propertyTitle}</h2>
        <p className="text-lg">Please rate your experience:</p>

        {/* Rating section */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FiStar
              key={star}
              className={`text-3xl cursor-pointer ${review.rating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
              onClick={() => handleRatingChange(star)}
            />
          ))}
        </div>

        {/* Comment section */}
        <textarea
          value={review.comment}
          onChange={handleCommentChange}
          placeholder="Write your review here..."
          className="w-full p-4 bg-gray-800 border border-gray-600 rounded text-white"
          rows={4}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-6"
        >
          <FiSend />
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default GiveReviewPage;
