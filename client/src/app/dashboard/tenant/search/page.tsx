'use client';

import { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const SearchBrowse = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    type: 'PG',
    rent: '',
  });

  const router = useRouter();

  // Handle search query change
  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Handle search submission
  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    // For simplicity, we'll log the search query and filters
    console.log('Searching with query:', searchQuery, 'and filters:', filters);
    // In real-world usage, this would make an API call to fetch filtered listings
    router.push('/dashboard/tenant/search-results'); // Navigate to search results
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Search & Browse</h1>
      <p className="text-lg mb-6">Find your perfect place to live!</p>

      {/* Search Bar */}
      <div className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search by title, location, etc."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-3 bg-gray-800 border border-gray-600 rounded text-white flex-grow"
        />
        <button
          onClick={handleSearchSubmit}
          className="bg-blue-600 p-3 rounded text-white flex items-center hover:bg-blue-700"
        >
          <FiSearch className="mr-2" /> Search
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-6 mb-6">
        <div className="flex items-center space-x-2">
          <label htmlFor="location" className="text-sm">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
          />
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="type" className="text-sm">Type:</label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
          >
            <option value="PG">PG</option>
            <option value="Flat">Flat</option>
            <option value="Room">Room</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="rent" className="text-sm">Rent (₹):</label>
          <input
            type="number"
            id="rent"
            name="rent"
            value={filters.rent}
            onChange={handleFilterChange}
            className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
            placeholder="Max Rent"
          />
        </div>
      </div>

      {/* Filters Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => console.log('Filters Applied:', filters)}
          className="bg-blue-600 p-3 rounded text-white flex items-center hover:bg-blue-700"
        >
          <FiFilter className="mr-2" /> Apply Filters
        </button>
      </div>

      {/* Placeholder for Search Results */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition">
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Search Results</h2>
        <p className="text-gray-400">Results based on your search and filters will appear here.</p>
        {/* Here you would map over the fetched search results */}
      </div>
    </div>
  );
};

export default SearchBrowse;
