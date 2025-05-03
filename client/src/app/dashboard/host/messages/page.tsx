'use client';

import { FiMail, FiSend, FiMessageSquare } from 'react-icons/fi';

export default function HostMessagesPage() {
  const messages = [
    {
      id: 1,
      sender: 'Tenant A',
      subject: 'Inquiry about 2BHK Flat',
      message: 'Hello, I am interested in your 2BHK flat in Sector 62. Is it still available?',
      timestamp: '2025-05-01T10:00:00Z',
      status: 'Unread',
    },
    {
      id: 2,
      sender: 'Tenant B',
      subject: 'Questions about Shared Room',
      message: 'Can you tell me more about the shared room you listed near Delhi University?',
      timestamp: '2025-04-29T15:30:00Z',
      status: 'Read',
    },
  ];

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{msg.subject}</h3>
              <span className={`text-sm ${msg.status === 'Unread' ? 'text-blue-400' : 'text-gray-400'}`}>
                {msg.status}
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-2">From: {msg.sender}</p>
            <p className="text-gray-300 mb-2">{msg.message}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleString()}</span>
              <button className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                <FiMessageSquare /> View
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Send New Message</h2>
        <form className="grid gap-4">
          <input
            type="text"
            placeholder="Subject"
            className="p-3 bg-gray-700 border border-gray-600 rounded text-white"
            required
          />
          <textarea
            placeholder="Message"
            className="p-3 bg-gray-700 border border-gray-600 rounded text-white"
            rows={4}
            required
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            <FiSend />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
