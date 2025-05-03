'use client';

import { useState, useEffect } from 'react';
import { FiBell, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const notifications = [
  {
    id: 1,
    title: 'New Booking Request',
    description: 'You have a new booking request for your listing "2BHK Flat in Sector 62".',
    date: '2025-05-01T12:00:00Z',
    status: 'unread',
  },
  {
    id: 2,
    title: 'Payment Received',
    description: 'Payment of ₹5000 has been received for your listing "Shared Room for Students".',
    date: '2025-04-30T18:00:00Z',
    status: 'read',
  },
];

export default function HostNotificationsPage() {
  const [unreadNotifications, setUnreadNotifications] = useState(notifications);

  const markAsRead = (id: number) => {
    setUnreadNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, status: 'read' } : notification
      )
    );
  };

  const removeNotification = (id: number) => {
    setUnreadNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      <div className="space-y-4">
        {unreadNotifications.map(notification => (
          <div
            key={notification.id}
            className={`flex items-start justify-between p-4 mb-4 bg-gray-800 rounded-lg shadow-md ${
              notification.status === 'unread' ? 'border-l-4 border-blue-600' : ''
            }`}
          >
            <div>
              <h3 className="text-lg font-semibold">{notification.title}</h3>
              <p className="text-sm text-gray-400">{notification.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(notification.date).toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {notification.status === 'unread' ? (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-blue-600 hover:text-blue-500"
                >
                  <FiCheckCircle />
                  Mark as Read
                </button>
              ) : (
                <span className="text-green-400">Read</span>
              )}

              <button
                onClick={() => removeNotification(notification.id)}
                className="text-red-600 hover:text-red-500"
              >
                <FiXCircle />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
