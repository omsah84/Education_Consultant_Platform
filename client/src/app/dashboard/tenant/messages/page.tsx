// app/dashboard/tenant/messages/page.tsx

'use client';

import { useState } from 'react';
import { FiSend } from 'react-icons/fi';

export default function TenantMessagesPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Host', content: 'Is your move-in date confirmed?', timestamp: '2025-05-02 10:30' },
    { id: 2, sender: 'You', content: 'Yes, I’ll be moving in on May 5th.', timestamp: '2025-05-02 10:35' },
  ]);

  const [input, setInput] = useState('');

  const sendMessage = (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      content: input,
      timestamp: new Date().toLocaleString(),
    };

    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>

      <div className="bg-gray-800 p-4 rounded-lg mb-4 max-h-[400px] overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-3 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}
          >
            <div className="inline-block bg-gray-700 px-4 py-2 rounded">
              <p className="text-sm">{msg.content}</p>
              <span className="text-xs text-gray-400 block mt-1">{msg.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 bg-gray-800 border border-gray-600 rounded text-white"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded text-white"
        >
          <FiSend />
        </button>
      </form>
    </div>
  );
}
