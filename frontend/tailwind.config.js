/**
 * Tailwind CSS Configuration
 * 
 * Configures Tailwind to work with React components.
 * Specifies which files to scan for class names.
 */
module.exports = {
  // Content files to scan for Tailwind classes
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // All JS/JSX files in src folder
    "./public/index.html"           // HTML template
  ],
  
  // Customize default theme
  theme: {
    extend: {
      // Add custom colors, fonts, spacing, etc. here
      colors: {
        // Example: primary: '#3B82F6'
      }
    },
  },
  
  // Add Tailwind plugins
  plugins: [],
}