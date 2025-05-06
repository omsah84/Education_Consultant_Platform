'use client';

import { useState, useEffect } from 'react';
import { FiBell } from 'react-icons/fi';
import { useAuth } from '@/lib/AuthContext'; // Assuming you have an Auth context

const NotificationsPage = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulating fetching notifications (replace with an API call)
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        const fetchedNotifications = [
          { id: '1', message: 'Your maintenance request has been resolved.', date: '2025-05-02' },
          { id: '2', message: 'New verified listings available near your location.', date: '2025-04-28' },
          { id: '3', message: 'Your payment is due in 3 days.', date: '2025-04-25' },
        ];
        setNotifications(fetchedNotifications);
        setLoading(false);
      }, 1000);
    }
  }, [user]);

  if (loading) return <p className="text-white p-6">Loading notifications...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>

      {/* Notification List */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <FiBell className="text-4xl text-yellow-400" />
          <h2 className="text-2xl font-semibold">Your Notifications</h2>
        </div>

        {/* Displaying Notifications */}
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex justify-between items-center border-b border-gray-600 pb-4"
              >
                <div className="text-lg">{notification.message}</div>
                <div className="text-sm text-gray-400">{notification.date}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-400">No new notifications.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
