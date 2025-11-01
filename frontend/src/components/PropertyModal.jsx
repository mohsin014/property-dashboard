import { X, MapPin, DollarSign, Edit, Trash2, Calendar } from 'lucide-react';

const PropertyModal = ({ property, onClose, onEdit, onDelete }) => {
  if (!property) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isVideo = (imageUrl) => {
    if (!imageUrl) return false;
    // Check if it's a base64 video
    if (imageUrl.startsWith('data:video/')) return true;
    // Check file extension
    return imageUrl.toLowerCase().includes('.mp4');
  };

  const renderMedia = () => {
    if (!property.image) {
      return (
        <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-300 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 text-2xl font-bold">
                {property.name?.charAt(0) || 'P'}
              </span>
            </div>
            <p className="text-blue-600">No Image Available</p>
          </div>
        </div>
      );
    }

    if (isVideo(property.image)) {
      return (
        <div className="relative w-full h-64 bg-black">
          <video
            src={property.image}
            className="w-full h-full object-cover"
            controls
            preload="metadata"
          />
        </div>
      );
    }

    return (
      <img
        src={property.image}
        alt={property.name}
        className="w-full h-64 object-cover"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
    );
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-800">Property Details</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Media */}
          <div className="mb-6 overflow-hidden rounded-lg">
            {renderMedia()}
            
            {/* Fallback for broken images */}
            <div 
              className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 items-center justify-center"
              style={{ display: 'none' }}
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-300 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 text-2xl font-bold">
                    {property.name?.charAt(0) || 'P'}
                  </span>
                </div>
                <p className="text-blue-600">Image not available</p>
              </div>
            </div>
          </div>

          {/* Property Info */}
          <div className="space-y-4">
            {/* Name and Type */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{property.name}</h3>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {property.type}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">{property.location}</span>
            </div>

            {/* Price */}
            <div className="flex items-center text-green-600">
              <DollarSign className="w-5 h-5 mr-2" />
              <span className="text-2xl font-bold">{formatPrice(property.price)}</span>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Coordinates */}
            {property.coordinates && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Location Coordinates</h4>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Latitude:</strong> {property.coordinates.lat}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Longitude:</strong> {property.coordinates.lng}
                  </p>
                </div>
              </div>
            )}

            {/* Created Date */}
            {property.createdAt && (
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Added on {formatDate(property.createdAt)}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t">
            <button
              onClick={() => onEdit(property)}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Edit className="w-5 h-5" />
              Edit Property
            </button>
            <button
              onClick={() => onDelete(property)}
              className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              Delete Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;