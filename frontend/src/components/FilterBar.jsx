import React from 'react';
import { Search } from 'lucide-react';

const FilterBar = ({ 
  searchQuery, 
  setSearchQuery, 
  filterType, 
  setFilterType, 
  propertyTypes 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      {/* Section Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Property Listings
      </h2>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            {/* Search Icon */}
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            
            {/* Search Input Field */}
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Search properties"
            />
            
            {/* Clear Search Button (shown when there's text) */}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Property Type Filter Dropdown */}
        <div className="md:w-48">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            aria-label="Filter by property type"
          >
            {propertyTypes.map(type => (
              <option key={type} value={type}>
                {type === 'All' ? 'All Types' : type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display (optional enhancement) */}
      {(searchQuery || filterType !== 'All') && (
        <div className="mt-3 flex flex-wrap gap-2">
          {searchQuery && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
              Search: "{searchQuery}"
              <button
                onClick={() => setSearchQuery('')}
                className="ml-2 hover:text-blue-900"
                aria-label="Remove search filter"
              >
                ✕
              </button>
            </span>
          )}
          {filterType !== 'All' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
              Type: {filterType}
              <button
                onClick={() => setFilterType('All')}
                className="ml-2 hover:text-blue-900"
                aria-label="Remove type filter"
              >
                ✕
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;