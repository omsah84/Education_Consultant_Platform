'use client';

import { useState } from 'react';
import { FiTool, FiSend, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '@/lib/AuthContext'; // Assuming you have an Auth context

const MaintenanceRequestsPage = () => {
  const { user } = useAuth();
  const [maintenanceRequests, setMaintenanceRequests] = useState<any[]>([]);
  const [newRequest, setNewRequest] = useState('');
  const [loading, setLoading] = useState(true);

  // Simulating fetching maintenance requests (you can replace this with an actual API call)
  useState(() => {
    if (user) {
      setTimeout(() => {
        const fetchedRequests = [
          { id: '1', issue: 'Water leakage in bathroom', status: 'Pending', date: '2025-05-01' },
          { id: '2', issue: 'Broken window in living room', status: 'Resolved', date: '2025-04-15' },
        ];
        setMaintenanceRequests(fetchedRequests);
        setLoading(false);
      }, 1000);
    }
  }, [user]);

  const handleRequestSubmit = () => {
    const newMaintenanceRequest = {
      id: String(maintenanceRequests.length + 1),
      issue: newRequest,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0], // Current date
    };
    setMaintenanceRequests([...maintenanceRequests, newMaintenanceRequest]);
    setNewRequest('');
  };

  if (loading) return <p className="text-white p-6">Loading maintenance requests...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Maintenance Requests</h1>

      {/* Existing Requests */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <div className="flex items-center gap-4 mb-6">
          <FiTool className="text-4xl text-yellow-400" />
          <h2 className="text-2xl font-semibold">Your Maintenance Requests</h2>
        </div>

        {/* Displaying Maintenance Requests */}
        {maintenanceRequests.length > 0 ? (
          <div className="space-y-4">
            {maintenanceRequests.map((request) => (
              <div
                key={request.id}
                className="flex justify-between items-center border-b border-gray-600 pb-4"
              >
                <div className="text-lg">{request.issue}</div>
                <div
                  className={`text-lg font-medium ${
                    request.status === 'Resolved' ? 'text-green-400' : 'text-yellow-400'
                  }`}
                >
                  {request.status}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-400">No maintenance requests yet.</p>
        )}
      </div>

      {/* Submit New Request */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Submit a New Maintenance Request</h3>
        <textarea
          value={newRequest}
          onChange={(e) => setNewRequest(e.target.value)}
          placeholder="Describe the issue..."
          className="p-3 bg-gray-700 border border-gray-600 rounded text-white w-full"
          rows={4}
        />
        <button
          onClick={handleRequestSubmit}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700 transition"
        >
          <FiSend className="text-xl" />
          Submit Request
        </button>
      </div>
    </div>
  );
};

export default MaintenanceRequestsPage;
