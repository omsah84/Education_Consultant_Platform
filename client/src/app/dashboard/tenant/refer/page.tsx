'use client';

import { useState } from 'react';
import { FiShare } from 'react-icons/fi';
import { useAuth } from '@/lib/AuthContext'; // Assuming you have an Auth context

const ReferAFriendPage = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!user) return <p className="text-white p-6">Loading user...</p>;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending the referral
    setTimeout(() => {
      setLoading(false);
      setMessage('Your referral has been sent successfully!');
    }, 2000);
  };

  const generateReferralLink = () => {
    const link = `https://yourapp.com/referral?user=${user.id}`;
    setReferralLink(link);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Refer a Friend</h1>

      {/* Form to refer a friend via email */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg">
        <div className="text-lg font-semibold">Refer your friend by email</div>
        <input
          type="email"
          name="email"
          placeholder="Friend's Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white"
          required
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Sending...' : 'Send Referral'}
        </button>
        {message && <p className="text-green-400 mt-4">{message}</p>}
      </form>

      {/* Generate Referral Link */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg">
        <div className="text-lg font-semibold">Or share your referral link</div>
        <button
          onClick={generateReferralLink}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-2"
        >
          Generate Referral Link
        </button>
        {referralLink && (
          <div className="mt-4 bg-gray-700 p-4 rounded-lg">
            <p className="text-sm">Your referral link:</p>
            <input
              type="text"
              value={referralLink}
              readOnly
              className="w-full p-3 bg-gray-600 text-white rounded mt-2"
            />
            <button
              onClick={() => navigator.clipboard.writeText(referralLink)}
              className="mt-2 text-blue-400 hover:text-blue-300"
            >
              Copy Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferAFriendPage;
