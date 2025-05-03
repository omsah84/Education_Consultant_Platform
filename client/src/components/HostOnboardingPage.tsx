// components/HostOnboardingPage.tsx
import React from "react";

const HostOnboardingPage: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white py-10 px-6 sm:px-8 lg:px-16">
      <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">
        Host Onboarding: How to List Your Property
      </h1>

      {/* Steps to List a Property Section */}
      <section className="mb-8 mt-11">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-500">How to List a Property</h2>
        <p className="text-lg text-gray-400 mb-4">
          Listing your property is simple! Follow these easy steps to get started and start receiving inquiries.
        </p>
        <ul className="list-decimal pl-6 text-lg text-gray-400 space-y-3">
          <li><strong>Sign up:</strong> Create an account or log in to our platform.</li>
          <li><strong>Fill in Property Details:</strong> Provide accurate details about your property, including its location, features, and pricing.</li>
          <li><strong>Upload Photos:</strong> Showcase your property by uploading high-quality images.</li>
          <li><strong>Start Receiving Inquiries:</strong> Once your property is listed, tenants can start reaching out and booking!</li>
        </ul>
      </section>

      {/* Benefits of Being a Verified Host Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-500">Benefits of Being a Verified Host</h2>
        <p className="text-lg text-gray-400 mb-4">
          By becoming a verified host, youll enjoy many perks that help you grow your business and attract more quality tenants.
        </p>
        <ul className="list-disc pl-6 text-lg text-gray-400 space-y-3">
          <li><strong>Greater Visibility:</strong> Verified hosts appear more prominently on the platform, making it easier for tenants to find you.</li>
          <li><strong>Real-Time Chat:</strong> Access to a real-time chat feature to communicate directly with tenants, ensuring quick and effective responses.</li>
          <li><strong>Higher-Quality Tenants:</strong> Verified hosts attract higher-quality tenants who value a trustworthy and verified platform.</li>
          <li><strong>Analytics Dashboard:</strong> Track your property views, applications, and bookings in real time with a dedicated dashboard.</li>
          <li><strong>Trust Badges:</strong> Receive trust badges or special recognition that highlights your verified status, giving tenants more confidence when booking.</li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <a href="/signup" className="bg-cyan-500 hover:bg-cyan-400 text-white py-2 px-4 rounded-full text-xl">
          Become a Verified Host Today
        </a>
      </section>
    </div>
  );
};

export default HostOnboardingPage;
