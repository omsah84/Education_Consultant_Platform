'use client';

import { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiSave, FiCamera } from 'react-icons/fi';
import { useAuth } from '@/lib/AuthContext';

export default function HostProfilePage() {
  const { user, updateUser } = useAuth(); // Assuming `updateUser` is a function to update user data.
  
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Submit the updated profile data
    await updateUser(form);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative w-32 h-32">
            <img
              src={form.avatar || '/default-avatar.jpg'}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-2 border-gray-600"
            />
            <label htmlFor="avatar" className="absolute bottom-0 right-0 bg-gray-700 p-2 rounded-full cursor-pointer">
              <FiCamera className="text-white" />
              <input
                type="file"
                id="avatar"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setForm((prev) => ({ ...prev, avatar: URL.createObjectURL(file) }));
                  }
                }}
              />
            </label>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Change Profile Picture</h3>
            <p className="text-sm text-gray-400">Click to upload a new picture</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          <FiSave />
          Save Changes
        </button>
      </form>
    </div>
  );
}
