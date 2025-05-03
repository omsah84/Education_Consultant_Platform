'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUpload, FiCheckCircle } from 'react-icons/fi';

const UploadKYCPage = () => {
  const router = useRouter();

  const [kycData, setKycData] = useState({
    documentType: '',
    documentFile: null,
  });

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setKycData((prev) => ({ ...prev, documentFile: file }));
    }
  };

  const handleSelectChange = (e: any) => {
    setKycData((prev) => ({ ...prev, documentType: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!kycData.documentFile || !kycData.documentType) {
      alert('Please select a document type and upload a file.');
      return;
    }

    // Simulate file upload process (you would typically make an API request here)
    console.log('Uploading KYC data:', kycData);

    // Redirect or show a success message
    router.push('/dashboard/tenant');
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Upload KYC Document</h1>
      <p className="text-lg mb-6">Please upload your KYC documents for verification.</p>

      <form onSubmit={handleSubmit} className="grid gap-4 max-w-lg">
        {/* Select Document Type */}
        <div className="flex items-center gap-2">
          <FiUpload className="text-white text-xl" />
          <select
            name="documentType"
            value={kycData.documentType}
            onChange={handleSelectChange}
            className="p-3 bg-gray-800 border border-gray-600 rounded text-white w-full"
            required
          >
            <option value="">Select Document Type</option>
            <option value="Aadhaar">Aadhaar Card</option>
            <option value="Passport">Passport</option>
            <option value="VoterID">Voter ID</option>
            <option value="DriverLicense">Driver's License</option>
          </select>
        </div>

        {/* Upload File */}
        <div className="flex items-center gap-2">
          <FiUpload className="text-white text-xl" />
          <input
            type="file"
            accept=".pdf, .jpg, .png"
            onChange={handleFileChange}
            className="p-3 bg-gray-800 border border-gray-600 rounded text-white w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-6"
        >
          <FiCheckCircle />
          Upload KYC
        </button>
      </form>
    </div>
  );
};

export default UploadKYCPage;
