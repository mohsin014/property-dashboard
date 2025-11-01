/**
 * Database Seeding Script
 * 
 * Populates the database with initial sample data.
 * Run this script with: npm run seed
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Property = require('./models/Property');

// Load environment variables
dotenv.config();

/**
 * Sample property data
 * This data will be inserted into the database
 */
const seedData = [
  {
    name: "Luxury Plot in Pune",
    type: "Plot",
    location: "Pune",
    price: 250000,
    description: "A large plot of land available for development in prime location.",
    coordinates: { lat: 18.5204, lng: 73.8567 }
  },
  {
    name: "Commercial Shed",
    type: "Shed",
    location: "Bangalore",
    price: 75000,
    description: "A spacious shed with yard & parking available.",
    coordinates: { lat: 12.9716, lng: 77.5946 }
  },
  {
    name: "Prime Retail Space",
    type: "Retail Store",
    location: "Hyderabad",
    price: 150000,
    description: "A commercial retail space in prime location with high footfall.",
    coordinates: { lat: 17.3850, lng: 78.4867 }
  },
  {
    name: "IT Hub Property",
    type: "Piott Store",
    location: "Khemrai",
    price: 200000,
    description: "Upcoming plot situated near IT companies with excellent connectivity.",
    coordinates: { lat: 19.0760, lng: 72.8777 }
  },
  {
    name: "Central Plot",
    type: "Plot",
    location: "Chennai",
    price: 300000,
    description: "Large plot available for development in central area with all amenities.",
    coordinates: { lat: 13.0827, lng: 80.2707 }
  },
  {
    name: "Industrial Shed",
    type: "Shed",
    location: "Mumbai",
    price: 90000,
    description: "Large industrial shed suitable for warehouse or manufacturing.",
    coordinates: { lat: 19.0760, lng: 72.8777 }
  },
  {
    name: "City Center Retail",
    type: "Retail Store",
    location: "Kolkata",
    price: 175000,
    description: "Commercial retail space for immediate sale in city center.",
    coordinates: { lat: 22.5726, lng: 88.3639 }
  },
  {
    name: "Residential Plot",
    type: "Plot",
    location: "Jaipur",
    price: 180000,
    description: "Excellent plot for housing colonies, perfect for development.",
    coordinates: { lat: 26.9124, lng: 75.7873 }
  }
];

/**
 * Main seeding function
 * Connects to database, clears existing data, and inserts seed data
 */
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database connected');

    // Delete all existing properties
    await Property.deleteMany();
    console.log('Cleared existing data');

    // Insert seed data
    const properties = await Property.insertMany(seedData);
    console.log(`Seeded ${properties.length} properties successfully`);
    
    // Log inserted properties
    properties.forEach((prop, index) => {
      console.log(`${index + 1}. ${prop.name} - ₹${prop.price.toLocaleString()}`);
    });

    // Exit process with success code
    process.exit(0);
  } catch (error) {
    // Log error and exit with failure code
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Execute seeding function
seedDatabase();