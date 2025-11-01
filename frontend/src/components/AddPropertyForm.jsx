const PropertyForm = ({ property, onClose, onSubmit, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    price: '',
    description: '',
    image: '',
    coordinates: { lat: '', lng: '' }
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (property && mode === 'edit') {
      setFormData({
        name: property.name || '',
        type: property.type || '',
        location: property.location || '',
        price: property.price || '',
        description: property.description || '',
        image: property.image || '',
        coordinates: {
          lat: property.coordinates?.lat || '',
          lng: property.coordinates?.lng || ''
        }
      });
      setImagePreview(property.image || '');
    }
  }, [property, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'lat' || name === 'lng') {
      setFormData(prev => ({
        ...prev,
        coordinates: { ...prev.coordinates, [name]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (name === 'image') {
        setImagePreview(value);
      }
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Property name is required';
    if (!formData.type) newErrors.type = 'Property type is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        price: Number(formData.price)
      };

      if (formData.coordinates.lat && formData.coordinates.lng) {
        submitData.coordinates = {
          lat: Number(formData.coordinates.lat),
          lng: Number(formData.coordinates.lng)
        };
      } else {
        delete submitData.coordinates;
      }

      await onSubmit(submitData);
    } catch (error) {
      console.error('Error submitting property:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const propertyTypes = ['Apartment', 'House', 'Villa', 'Condo', 'Townhouse', 'Land', 'Plot', 'Shed', 'Retail Store', 'Commercial'];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && !isSubmitting && onClose()}
    >
      <div 
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === 'edit' ? 'Edit Property' : 'Add New Property'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
            disabled={isSubmitting}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image Preview
              </label>
              <div className="h-48 overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center"
                  style={{ display: 'none' }}
                >
                  <ImageIcon className="w-16 h-16 text-blue-500 opacity-50" />
                </div>
              </div>
            </div>
          )}

          {/* Property Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Property Name *
            </label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Luxury Apartment"
                disabled={isSubmitting}
              />
            </div>
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Property Type */}
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
              Property Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.type ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            >
              <option value="">Select Type</option>
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
          </div>

          {/* Location */}
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
              Location *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Mumbai, Maharashtra"
                disabled={isSubmitting}
              />
            </div>
            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
              Price (₹) *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 5000000"
                min="0"
                disabled={isSubmitting}
              />
            </div>
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe the property features..."
                disabled={isSubmitting}
              />
            </div>
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
              Image URL *
            </label>
            <div className="relative">
              <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
                disabled={isSubmitting}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Paste an image URL from Unsplash, Imgur, or any direct image link
            </p>
          </div>

          {/* Coordinates */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Coordinates (Optional)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="lat"
                value={formData.coordinates.lat}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Latitude"
                step="any"
                disabled={isSubmitting}
              />
              <input
                type="number"
                name="lng"
                value={formData.coordinates.lng}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Longitude"
                step="any"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : mode === 'edit' ? 'Update Property' : 'Add Property'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};