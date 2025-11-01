/**
 * Defines all API endpoints for property operations.
 * Maps HTTP methods and URLs to controller functions.
 */

const express = require('express');
const router = express.Router();

// Import controller functions
const {
  getProperties,      // GET all properties
  getProperty,        // GET single property
  createProperty,     // POST new property
  updateProperty,     // PUT update property
  deleteProperty      // DELETE property
} = require('../controllers/propertyController');

/**
 * Route: /api/properties
 * 
 * GET  - Get all properties (with optional filters)
 * POST - Create new property
 */
router.route('/')
  .get(getProperties)      // Handle GET requests to /api/properties
  .post(createProperty);   // Handle POST requests to /api/properties

/**
 * Route: /api/properties/:id
 * 
 * GET    - Get single property by ID
 * PUT    - Update property by ID
 * DELETE - Delete property by ID
 * 
 * :id is a route parameter (dynamic value in URL)
 * Example: /api/properties/507f1f77bcf86cd799439011
 */
router.route('/:id')
  .get(getProperty)        // Handle GET requests to /api/properties/:id
  .put(updateProperty)     // Handle PUT requests to /api/properties/:id
  .delete(deleteProperty); // Handle DELETE requests to /api/properties/:id

// Export router to be used in server.js
module.exports = router;