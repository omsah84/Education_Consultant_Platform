"use client";

import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    type: "General",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // API call or email handler here
  };

  return (
    <section className="bg-black text-white py-20 px-6 sm:px-10 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">
          Contact Us
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 p-8 rounded-2xl shadow-xl space-y-6"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Inquiry Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="General">General</option>
                <option value="Tenant">Tenant</option>
                <option value="Host">Host</option>
                <option value="Support">Support</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-md transition duration-300"
            >
              Send Message
            </button>
          </form>

          {/* Support Info */}
          <div className="bg-gray-900 p-8 rounded-2xl shadow-xl space-y-6 text-gray-300">
            <h3 className="text-xl font-semibold text-white mb-4">Support Details</h3>
            <p>
              📧 Email:{" "}
              <span className="text-white">support@yourplatform.com</span>
            </p>
            <p>
              📞 Phone / WhatsApp:{" "}
              <span className="text-white">+91 98765 43210</span>
            </p>
            <p>🕒 Operating Hours:</p>
            <ul className="list-disc list-inside text-sm">
              <li>Mon – Sat: 10 AM – 7 PM IST</li>
              <li>Sun: Closed</li>
              <li>We aim to reply within 24 hours.</li>
            </ul>

            {/* Direct Contact Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+919876543210"
                className="w-full sm:w-auto text-center bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-md font-medium transition"
              >
                📞 Call Now
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
