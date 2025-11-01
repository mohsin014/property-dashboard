/*
 * Contains all the business logic for property operations.
 * Handles CRUD operations: Create, Read, Update, Delete
 */

const Property = require('../models/Property');

/** 
 * @route   GET /api/properties
 * @access  Public
 * @param   {Object} req - Express request object
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with all properties
 */
exports.getProperties = async (req, res) => {
  try {
    // Build query object based on query parameters
    const queryObj = {};
    
    // Filter by type if provided
    if (req.query.type) {
      queryObj.type = req.query.type;
    }
    
    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      queryObj.price = {};
      if (req.query.minPrice) queryObj.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) queryObj.price.$lte = Number(req.query.maxPrice);
    }
    
    // Text search in name and location
    if (req.query.search) {
      queryObj.$text = { $search: req.query.search };
    }
    
    // Execute query with sorting (newest first)
    const properties = await Property.find(queryObj).sort({ createdAt: -1 });
    
    // Send success response
    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get single property by ID
 * 
 * @route   GET /api/properties/:id
 * @access  Public
 * @param   {Object} req - Express request object (contains ID in params)
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with single property
 */
exports.getProperty = async (req, res) => {
  try {
    // Find property by ID from URL parameters
    const property = await Property.findById(req.params.id);
    
    // Check if property exists
    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }

    // Send success response with property data
    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    // Handle invalid ID format or other errors
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Create new property
 * 
 * @route   POST /api/properties
 * @access  Public (should be Private with authentication in production)
 * @param   {Object} req - Express request object (contains property data in body)
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with created property
 */
exports.createProperty = async (req, res) => {
  try {
    // Create new property using data from request body
    // Mongoose will validate data against schema
    const property = await Property.create(req.body);
    
    // Send success response with created property
    // 201 status code indicates resource created
    res.status(201).json({
      success: true,
      data: property
    });
  } catch (error) {
    // Handle validation errors or other issues
    // 400 status code indicates bad request (validation failed)
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Update property
 * 
 * @route   PUT /api/properties/:id
 * @access  Public (should be Private with authentication in production)
 * @param   {Object} req - Express request object (contains ID and update data)
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with updated property
 */
exports.updateProperty = async (req, res) => {
  try {
    // Find property by ID and update with new data
    const property = await Property.findByIdAndUpdate(
      req.params.id,           // ID from URL
      req.body,                // New data from request body
      {
        new: true,             // Return updated document instead of original
        runValidators: true    // Run schema validation on update
      }
    );

    // Check if property exists
    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }

    // Send success response with updated property
    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    // Handle validation or other errors
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Delete property
 * 
 * @route   DELETE /api/properties/:id
 * @access  Public (should be Private with authentication in production)
 * @param   {Object} req - Express request object (contains ID)
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response confirming deletion
 */
exports.deleteProperty = async (req, res) => {
  try {
    // Find and delete property by ID
    const property = await Property.findByIdAndDelete(req.params.id);

    // Check if property exists
    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }

    // Send success response (empty data object indicates deletion)
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};