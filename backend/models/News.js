const mongoose = require('mongoose');

// Define the News schema
const newsSchema = new mongoose.Schema({
  company: String,
  title: String,
  link: String,
  timestamp: String
});

// Function to create a dynamic model based on company name
const getNewsModel = (companyName) => {
  if (mongoose.models[companyName]) {
    return mongoose.models[companyName]; // Return existing model if it exists
  }
  return mongoose.model(companyName, newsSchema, companyName); // Create new model if it doesn't exist
};

module.exports = getNewsModel;
