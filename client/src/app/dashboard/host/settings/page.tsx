'use client';

import { FiSettings, FiLock, FiBell, FiEdit } from 'react-icons/fi';

export default function HostSettingsPage() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      <div className="space-y-6">
        {/* Account Settings Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <p className="text-sm text-gray-400">Username</p>
            <p className="font-semibold text-white">YourUsername</p>
            <p className="text-sm text-gray-400">Email</p>
            <p className="font-semibold text-white">youremail@example.com</p>
            <div className="flex justify-end mt-4">
              <button className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                <FiEdit /> Edit
              </button>
            </div>
          </div>
        </section>

        {/* Privacy Settings Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">Profile Visibility</p>
              <button className="text-blue-400 hover:text-blue-300">Change</button>
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-400">Phone Number</p>
              <button className="text-blue-400 hover:text-blue-300">Change</button>
            </div>
          </div>
        </section>

        {/* Notification Preferences Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">Email Notifications</p>
              <button className="text-blue-400 hover:text-blue-300">Toggle</button>
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-400">SMS Notifications</p>
              <button className="text-blue-400 hover:text-blue-300">Toggle</button>
            </div>
          </div>
        </section>

        {/* Change Password Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <button className="text-blue-400 hover:text-blue-300">
              <FiLock className="inline-block mr-2" />
              Change Password
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
