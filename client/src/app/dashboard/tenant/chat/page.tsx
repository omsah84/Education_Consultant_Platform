'use client';

import { useState, useEffect } from 'react';
import { FiMessageSquare, FiSend } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const ChatWithHost = () => {
  const router = useRouter();

  // Sample chat data
  const [chats, setChats] = useState([
    {
      id: 1,
      host: 'John Doe',
      message: 'Hello! The 2BHK flat in Sector 62 is available. Would you like to schedule a visit?',
      time: '2025-05-03 10:30 AM',
    },
    {
      id: 2,
      host: 'Sarah Lee',
      message: 'The room you inquired about is ready for booking. Let me know if you want to proceed.',
      time: '2025-05-02 2:15 PM',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setChats([
        ...chats,
        {
          id: chats.length + 1,
          host: 'You',
          message: newMessage,
          time: new Date().toLocaleString(),
        },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Chat with Host</h1>
      <p className="text-lg mb-6">Communicate with your host regarding your listings and bookings.</p>

      <div className="flex flex-col gap-6 mb-6">
        {chats.map((chat) => (
          <div key={chat.id} className="bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{chat.host}</span>
              <span className="text-gray-400 text-sm">{chat.time}</span>
            </div>
            <p className="text-white">{chat.message}</p>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-4 mt-6">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="p-3 bg-gray-800 border border-gray-600 rounded text-white w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          <FiSend />
        </button>
      </form>
    </div>
  );
};

export default ChatWithHost;
