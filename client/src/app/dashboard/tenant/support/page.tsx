'use client';

import { useState } from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { useAuth } from '@/lib/AuthContext'; // Assuming you have an Auth context

const TenantSupportPage = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  if (!user) return <p className="text-white p-6">Loading user...</p>;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending a support request
    setTimeout(() => {
      setLoading(false);
      setResponse('Your support request has been submitted successfully!');
    }, 2000);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Tenant Support</h1>

      {/* Support Request Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg">
        <div className="text-lg font-semibold">Need Help? Submit a Request</div>
        <textarea
          name="message"
          placeholder="Describe your issue or question..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white"
          rows={4}
          required
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
        {response && <p className="text-green-400 mt-4">{response}</p>}
      </form>

      {/* FAQ Links */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions (FAQs)</h2>
        <ul className="space-y-2">
          <li>
            <a href="#" className="text-blue-400 hover:text-blue-300">How do I book a property?</a>
          </li>
          <li>
            <a href="#" className="text-blue-400 hover:text-blue-300">How can I submit my KYC?</a>
          </li>
          <li>
            <a href="#" className="text-blue-400 hover:text-blue-300">What to do if I face an issue with my landlord?</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TenantSupportPage;
