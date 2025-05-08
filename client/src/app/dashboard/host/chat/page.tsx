'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@/lib/AuthContext';
import { useApi } from '@/lib/useApi';

interface Message {
  message: string;
  senderId: string;
  timestamp: string;
}

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';

const Chat = ({ hostId }: { hostId: string }) => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const api = useApi();
  const router = useRouter();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (!user?.id || !hostId) return;

    const newSocket = io(SOCKET_URL, { transports: ['websocket'] });
    setSocket(newSocket);

    newSocket.emit('join_room', user.id, hostId);
    newSocket.emit('fetch_messages', user.id, hostId);

    newSocket.on('message_history', (msgs: Message[]) => {
      setMessages(msgs);
      setLoading(false);
    });

    newSocket.on('receive_message', (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user?.id, hostId]);

  const validateMessage = (text: string): boolean => {
    const phoneRegex = /\b\d{10,}\b/;
    const emailRegex = /\b\S+@\S+\.\S+\b/;
    return !phoneRegex.test(text) && !emailRegex.test(text);
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    if (!validateMessage(message)) {
      alert('Phone numbers and emails are not allowed!');
      return;
    }
    if (socket && user?.id) {
      socket.emit('send_message', message, user.id, hostId);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col p-6 min-h-screen bg-black text-white">
      <h2 className="text-2xl font-bold mb-4">Chat Room</h2>

      <div className="flex-1 overflow-y-auto bg-neutral-900 p-4 rounded-lg shadow-inner mb-4">
        {loading ? (
          <p className="text-gray-400">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-3 p-3 rounded-lg max-w-[75%] ${
                msg.senderId === user?.id
                  ? 'bg-blue-600 ml-auto text-right'
                  : 'bg-gray-700 mr-auto text-left'
              }`}
            >
              <p className="text-sm">{msg.message}</p>
              <small className="text-xs text-gray-300 block mt-1">
                {new Date(msg.timestamp).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>

      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-3 bg-gray-800 text-white border border-gray-700 rounded-l-lg placeholder-gray-400 focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white p-3 rounded-r-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
