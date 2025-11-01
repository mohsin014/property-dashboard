/**
 * Main App Component
 * File: frontend/src/App.jsx
 * 
 * Main application component that manages state and coordinates all other components
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Home } from 'lucide-react';

// Import components - make sure these paths match your file structure
import PropertyCard from './components/PropertyCard';
import PropertyModal from './components/PropertyModal';
import PropertyForm from './components/PropertyForm';
import ConfirmationModal from './components/ConfirmationModal';
import StatusModal from './components/StatusModal';

// Import API service
import { propertyAPI } from './services/api';

function App() {
  // Properties state
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  
  // Modal states
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // Confirmation modal state
  const [confirmModal, setConfirmModal] = useState({ 
    isOpen: false, 
    type: '', 
    property: null 
  });
  
  // Status modal state
  const [statusModal, setStatusModal] = useState({ 
    isOpen: false, 
    type: '', 
    message: '' 
  });

  /**
   * Load all properties from API
   */
  const loadProperties = useCallback(async () => {
    setLoading(true);
    try {
      const data = await propertyAPI.getAllProperties();
      setProperties(data);
    } catch (error) {
      console.error('Error loading properties:', error);
      showStatus('error', 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load properties on mount
  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  /**
   * Show status notification
   */
  const showStatus = (type, message) => {
    setStatusModal({ isOpen: true, type, message });
  };

  /**
   * Handle adding a new property
   */
  const handleAddProperty = async (propertyData) => {
    try {
      await propertyAPI.createProperty(propertyData);
      await loadProperties();
      setShowAddForm(false);
      showStatus('success', 'Property added successfully!');
    } catch (error) {
      console.error('Error adding property:', error);
      showStatus('error', 'Failed to add property');
    }
  };

  /**
   * Handle updating an existing property
   */
  const handleUpdateProperty = async (propertyData) => {
    try {
      await propertyAPI.updateProperty(selectedProperty._id, propertyData);
      await loadProperties();
      setShowEditForm(false);
      setSelectedProperty(null);
      showStatus('success', 'Property updated successfully!');
    } catch (error) {
      console.error('Error updating property:', error);
      showStatus('error', 'Failed to update property');
    }
  };

  /**
   * Handle deleting a property
   */
  const handleDeleteProperty = async () => {
    try {
      await propertyAPI.deleteProperty(confirmModal.property._id);
      await loadProperties();
      setConfirmModal({ isOpen: false, type: '', property: null });
      showStatus('success', 'Property deleted successfully!');
    } catch (error) {
      console.error('Error deleting property:', error);
      showStatus('error', 'Failed to delete property');
    }
  };

  /**
   * Open delete confirmation modal
   */
  const openDeleteConfirmation = (property) => {
    setConfirmModal({
      isOpen: true,
      type: 'delete',
      property
    });
  };

  /**
   * Open edit form with property data
   */
  const openEditForm = (property) => {
    setSelectedProperty(property);
    setShowEditForm(true);
  };

  /**
   * Open property details modal
   */
  const openPropertyDetails = (property) => {
    setSelectedProperty(property);
    setShowPropertyModal(true);
  };

  /**
   * Filter properties based on search and type (we can also add search by property type)
   */
  const filteredProperties = properties.filter(property => {
    const matchesSearch = 
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || property.type === filterType;
    return matchesSearch && matchesType;
  });

  // Property types for filter dropdown
  const propertyTypes = [
    'Apartment', 
    'House', 
    'Villa', 
    'Condo', 
    'Townhouse', 
    'Land', 
    'Plot', 
    'Shed', 
    'Retail Store', 
    'Commercial'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Mini Property Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your property listings
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
            >
              <Plus className="w-5 h-5" />
              Add Property
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProperties.length} of {properties.length} properties
          </div>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading properties...</p>
            </div>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterType 
                ? 'Try adjusting your search or filter criteria' 
                : 'Get started by adding your first property'}
            </p>
            {!searchTerm && !filterType && (
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Your First Property
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <PropertyCard
                key={property._id}
                property={property}
                onView={openPropertyDetails}
                onEdit={openEditForm}
                onDelete={openDeleteConfirmation}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      {showAddForm && (
        <PropertyForm
          mode="add"
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddProperty}
        />
      )}

      {showEditForm && selectedProperty && (
        <PropertyForm
          mode="edit"
          property={selectedProperty}
          onClose={() => {
            setShowEditForm(false);
            setSelectedProperty(null);
          }}
          onSubmit={handleUpdateProperty}
        />
      )}

      {showPropertyModal && selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => {
            setShowPropertyModal(false);
            setSelectedProperty(null);
          }}
          onEdit={openEditForm}
          onDelete={openDeleteConfirmation}
        />
      )}

      {confirmModal.isOpen && (
        <ConfirmationModal
          isOpen={confirmModal.isOpen}
          onClose={() => setConfirmModal({ isOpen: false, type: '', property: null })}
          onConfirm={handleDeleteProperty}
          title="Delete Property"
          message={`Are you sure you want to delete "${confirmModal.property?.name}"? This action cannot be undone.`}
          type="danger"
        />
      )}

      {statusModal.isOpen && (
        <StatusModal
          isOpen={statusModal.isOpen}
          onClose={() => setStatusModal({ isOpen: false, type: '', message: '' })}
          type={statusModal.type}
          message={statusModal.message}
        />
      )}
    </div>
  );
}

export default App;