import React from "react";

const TermsAndPrivacyPage: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white py-10 px-6 sm:px-8 lg:px-16">
      <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">
        Terms and Privacy Policy
      </h1>

      {/* Terms of Use Section */}
      <section className="mb-8 mt-11">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-500">Terms of Use</h2>
        
        {/* Introduction to the Terms of Use */}
        <p className="text-lg text-gray-400 mb-4">
          By accessing or using our platform, you agree to the following terms and conditions. These rules apply to both tenants and hosts on our platform.
        </p>

        {/* List of key Terms of Use */}
        <ul className="list-disc pl-6 text-lg text-gray-400 space-y-3">
          <li>
            <strong>User Responsibilities:</strong> 
            Tenants and Hosts must provide accurate information and follow platform rules. 
            <p className="mt-2 text-gray-400">
              This means you are responsible for ensuring that the details you provide on our platform are correct and up-to-date. You should also follow all the rules we’ve set to ensure a smooth and safe experience for everyone.
            </p>
          </li>

          <li>
            <strong>Prohibited Activities:</strong> 
            Engaging in illegal activities, harassment, or misrepresentation is prohibited. 
            <p className="mt-2 text-gray-400">
              We want to create a positive environment for all users, so we strictly prohibit any illegal behavior (such as fraud or criminal activity), harassment (like bullying or hate speech), or misrepresentation (falsifying your identity or other information).
            </p>
          </li>

          <li>
            <strong>Payment & Booking:</strong> 
            All payments must be processed through the platforms payment system, and hosts should comply with booking and cancellation policies. 
            <p className="mt-2 text-gray-400">
              To ensure security, all transactions (payments) must go through our payment system. Additionally, hosts must follow the rules for booking and cancellations to avoid any confusion or disputes.
            </p>
          </li>

          <li>
            <strong>Liability:</strong> 
            The platform is not responsible for disputes between tenants and hosts or other third-party issues.
            <p className="mt-2 text-gray-400">
              If a conflict arises between you (the tenant) and another user (the host), the platform is not responsible for resolving those disputes. You are responsible for handling such issues directly with the other party.
            </p>
          </li>

          <li>
            <strong>Account Termination:</strong> 
            Violation of these terms may result in the suspension or termination of accounts. 
            <p className="mt-2 text-gray-400">
              If you violate any of these rules, your account may be suspended or permanently removed. We take these violations seriously to protect the safety of all users.
            </p>
          </li>
        </ul>
      </section>

      {/* Privacy Policy Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-500">Privacy Policy</h2>
        
        {/* Introduction to the Privacy Policy */}
        <p className="text-lg text-gray-400 mb-4">
          We value your privacy and are committed to protecting your personal information. The following outlines how we collect, use, and share your data.
        </p>

        {/* List of key Privacy Policy terms */}
        <ul className="list-disc pl-6 text-lg text-gray-400 space-y-3">
          <li>
            <strong>Data Collection:</strong> 
            We collect personal information such as names, emails, and payment details to facilitate the platforms functions.
            <p className="mt-2 text-gray-400">
              To use our platform, we need to collect some personal information like your name, email address, and payment details. This helps us perform necessary functions like processing payments and confirming bookings.
            </p>
          </li>

          <li>
            <strong>Usage of Data:</strong> 
            Your data is used to process transactions, improve user experience, and communicate with you regarding your bookings.
            <p className="mt-2 text-gray-400">
              The information we collect helps us to process your transactions, improve the platform experience, and communicate with you about your activities (like booking confirmations or updates).
            </p>
          </li>

          <li>
            <strong>Data Sharing:</strong> 
            We only share your data with third parties to comply with legal obligations or with your explicit consent.
            <p className="mt-2 text-gray-400">
              We respect your privacy and will never share your personal data unless it’s required by law or if you give us explicit permission.
            </p>
          </li>

          <li>
            <strong>Data Security:</strong> 
            We use standard security measures to protect your data, but we cannot guarantee 100% security.
            <p className="mt-2 text-gray-400">
              We take all necessary steps to protect your personal data, but like any online platform, we cannot guarantee absolute security. We strive to make our platform as secure as possible.
            </p>
          </li>

          <li>
            <strong>Your Rights:</strong> 
            You have the right to access, correct, or delete your personal data. Please contact us for any requests regarding your data.
            <p className="mt-2 text-gray-400">
              You have full control over your data. You can request to see, correct, or delete any personal data we have about you. If you wish to make any requests, just reach out to us.
            </p>
          </li>
        </ul>
      </section>

     
    </div>
  );
};

export default TermsAndPrivacyPage;
