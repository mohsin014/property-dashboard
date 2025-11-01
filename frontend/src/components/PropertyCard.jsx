import { Eye, Edit, Trash2, MapPin, DollarSign, Play } from 'lucide-react';

const PropertyCard = ({ property, onView, onEdit, onDelete }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
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
        <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 text-xl font-bold">
                {property.name?.charAt(0) || 'P'}
              </span>
            </div>
            <p className="text-blue-600 text-sm">No Image</p>
          </div>
        </div>
      );
    }

    if (isVideo(property.image)) {
      return (
        <div className="relative w-full h-48 bg-black">
          <video
            src={property.image}
            className="w-full h-full object-cover"
            muted
            preload="metadata"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <Play className="w-12 h-12 text-white opacity-80" />
          </div>
        </div>
      );
    }

    return (
      <img
        src={property.image}
        alt={property.name}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Media */}
      <div className="relative overflow-hidden">
        {renderMedia()}
        
        {/* Fallback for broken images */}
        <div 
          className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 items-center justify-center"
          style={{ display: 'none' }}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 text-xl font-bold">
                {property.name?.charAt(0) || 'P'}
              </span>
            </div>
            <p className="text-blue-600 text-sm">Image not available</p>
          </div>
        </div>

        {/* Property Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {property.type}
          </span>
        </div>
      </div>

      {/* Content - Using flex-grow to push buttons to bottom */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {property.name}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="text-sm line-clamp-1">{property.location}</span>
          </div>
          
          <div className="flex items-center text-green-600 mb-3">
            <DollarSign className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="text-lg font-bold">{formatPrice(property.price)}</span>
          </div>
          
          {/* Fixed height description container to ensure consistent spacing */}
          <div className="h-10 mb-4">
            <p className="text-gray-600 text-sm line-clamp-2 leading-5">
              {property.description}
            </p>
          </div>
        </div>
        
        {/* Action Buttons - Always at bottom */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onView(property)}
            className="flex-1 flex items-center justify-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
          <button
            onClick={() => onEdit(property)}
            className="flex items-center justify-center gap-1 bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => onDelete(property)}
            className="flex items-center justify-center gap-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;