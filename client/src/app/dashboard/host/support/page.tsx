'use client';

import { FiHelpCircle, FiPhone, FiMail } from 'react-icons/fi';

export default function HostSupportPage() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Help & Support</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions (FAQs)</h2>
          <ul className="space-y-4">
            <li className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="font-semibold">How can I add a new listing?</h3>
              <p className="text-gray-400">
                To add a new listing, navigate to your dashboard and click on the "Add New Listing" button. Fill in the
                required details and submit the form.
              </p>
            </li>
            <li className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="font-semibold">How do I update a listing?</h3>
              <p className="text-gray-400">
                To update a listing, go to your listings page, select the listing you want to edit, and click on the "Edit"
                button. Make the necessary changes and save them.
              </p>
            </li>
            <li className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="font-semibold">How can I manage my bookings?</h3>
              <p className="text-gray-400">
                You can view, accept, or reject bookings from your "Bookings" section. Make sure to keep your calendar up-to-date
                to avoid double bookings.
              </p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
          <p className="mb-4 text-gray-400">
            If you cannot find an answer to your question in the FAQ section, feel free to reach out to us directly through the following
            channels:
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg shadow-md">
              <FiPhone className="text-blue-600 text-2xl" />
              <div>
                <p className="text-white font-semibold">Call Us</p>
                <p className="text-gray-400">+1 800-123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg shadow-md">
              <FiMail className="text-blue-600 text-2xl" />
              <div>
                <p className="text-white font-semibold">Email Us</p>
                <p className="text-gray-400">support@yourapp.com</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
