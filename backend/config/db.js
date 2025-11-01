/*
 * Database Connection Configuration 
 */

const mongoose = require('mongoose');

/**
 * Connect to MongoDB Database
 * @async
 * @function connectDB
 * @returns {Promise<void>}
 * @throws {Error} If connection fails
 */
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    // Log success message with database host information
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
  } catch (error) {
    // Log error and exit process if connection fails
    console.error(`Error: ${error.message}`);
    process.exit(1);  // Exit with failure code
  }
};

// Export the connection function for use in server.js
module.exports = connectDB;