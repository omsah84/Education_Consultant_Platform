'use client';

import { useState } from 'react';
import { FiUser, FiEdit, FiSave } from 'react-icons/fi';
import { useAuth } from '@/lib/AuthContext'; // Assuming you have an Auth context to get user data

const TenantProfilePage = () => {
  const { user, updateUser } = useAuth(); // Fetch user info and update function from Auth context
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle save
  const handleSave = () => {
    // Call updateUser function from Auth context or an API to save the changes
    updateUser(form);
    setIsEditing(false);
  };

  // Handle cancel edit
  const handleCancel = () => {
    setForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
    setIsEditing(false);
  };

  if (!user) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <FiUser className="text-4xl text-yellow-400" />
          <h2 className="text-2xl font-semibold">Tenant Profile</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>

          <div className="flex gap-4 mt-6">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                  <FiSave /> Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                <FiEdit /> Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantProfilePage;
