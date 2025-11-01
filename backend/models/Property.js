/**
 * Defines the schema and model for Property documents in MongoDB.
 * This represents the structure of property data in the database.
 */

const mongoose = require('mongoose');

/**
 * Defines the structure, validation rules, and constraints for property documents.
 */
const propertySchema = new mongoose.Schema({
  // Property name/title
  name: {
    type: String,
    required: [true, 'Please add a property name'],  // Validation: required field
    trim: true,                                       // Remove whitespace from both ends
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  
  // Property type (Plot, Shed, etc.)
  type: {
    type: String,
    required: [true, 'Please add a property type'],
    enum: ['Plot', 'Shed', 'Retail Store', 'Piott Store','Apartment', 'House', 'Villa', 'Condo', 'Townhouse', 'Land', 'Commercial']  // Only allow these values
  },
  
  // Property location/address
  location: {
    type: String,
    required: [true, 'Please add a location'],
    trim: true
  },
  
  // Property price (in currency)
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']  // Validation: must be positive
  },
  
  // Property description
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  
  // Property image URL (with default placeholder)
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop'
  },
  
  // Geographic coordinates for map display
  coordinates: {
    lat: {
      type: Number,
      default: 28.6139,  // Default: New Delhi coordinates
      min: -90,          // Valid latitude range: -90 to 90
      max: 90
    },
    lng: {
      type: Number,
      default: 77.2090,
      min: -180,         // Valid longitude range: -180 to 180
      max: 180
    }
  }
}, {
  // Schema options
  timestamps: true  // Automatically add createdAt and updatedAt fields
});

/**
 * Add indexes for better query performance
 * Index on 'type' for faster filtering by property type
 */
propertySchema.index({ type: 1 });

/**
 * Add indexes for text search on name and location
 */
propertySchema.index({ name: 'text', location: 'text' });

/**
 * Instance method to get formatted price
 * 
 * @returns {string} Formatted price with currency symbol
 */
propertySchema.methods.getFormattedPrice = function() {
  return `₹${this.price.toLocaleString('en-IN')}`;
};

/**
 * Static method to find properties by type
 * 
 * @param {string} type - Property type
 * @returns {Promise<Array>} Array of properties
 */
propertySchema.statics.findByType = function(type) {
  return this.find({ type: type });
};

// Create and export the Property model
// First argument: Model name (will be pluralized as 'properties' in DB)
// Second argument: Schema definition
module.exports = mongoose.model('Property', propertySchema);