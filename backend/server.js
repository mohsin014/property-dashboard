/**
 * Main Server File
 * 
 * Entry point for the backend application.
 * Sets up Express server, middleware, routes, and database connection.
 */

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables from .env file
// Must be called before accessing process.env variables
dotenv.config();

// Connect to MongoDB database
// This establishes the connection before starting the server
connectDB();

// Initialize Express application
const app = express();

// ==================== MIDDLEWARE ====================

/**
 * Body Parser Middleware
 * Parses incoming request bodies in JSON and URL-encoded format
 * Makes data available in req.body
 */
app.use(express.json());                          // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies

/**
 * CORS (Cross-Origin Resource Sharing) Middleware
 * Allows frontend (different origin) to make requests to backend
 * 
 * In production, restrict origin to your frontend URL
 */
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',  // Allow frontend URL
  credentials: true  // Allow cookies to be sent
}));

/**
 * Request Logger Middleware (optional, for development)
 * Logs all incoming requests with method, URL, and timestamp
 */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();  // Pass control to next middleware
});

// ==================== ROUTES ====================

/**
 * Mount property routes
 * All routes in properties.js will be prefixed with /api/properties
 * 
 * Example endpoints:
 * - GET    /api/properties
 * - POST   /api/properties
 * - GET    /api/properties/:id
 * - PUT    /api/properties/:id
 * - DELETE /api/properties/:id
 */
app.use('/api/properties', require('./routes/properties'));

/**
 * Root Route
 * Simple health check endpoint
 */
app.get('/', (req, res) => {
  res.json({ 
    message: 'Property Dashboard API',
    version: '1.0.0',
    endpoints: {
      properties: '/api/properties'
    }
  });
});

/**
 * 404 Not Found Handler
 * Catches all requests to undefined routes
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// ==================== SERVER STARTUP ====================

// Get port from environment variable or use default
const PORT = process.env.PORT || 5000;

/**
 * Start Express server
 * Listen for incoming requests on specified port
 */
const server = app.listen(PORT, () => {
  console.log(`
    ========================================
     Server running in ${process.env.NODE_ENV} mode
     Port: ${PORT}
     URL: http://localhost:${PORT}
    ========================================
  `);
});

// ==================== ERROR HANDLING ====================

/**
 * Handle unhandled promise rejections
 * Example: Database connection failures, etc.
 */
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});

/**
 * Handle uncaught exceptions
 * Example: Syntax errors, undefined variables, etc.
 */
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});

/**
 * Graceful shutdown
 * Handle SIGTERM signal (e.g., from Ctrl+C)
 */
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});