const express = require('express');
const getNewsModel = require('../models/News');

const router = express.Router();

// Get all news for the selected company
router.get('/:company', async (req, res) => {
  const companyName = req.params.company;
  const News = getNewsModel(companyName); // Use the dynamic model

  try {
    const news = await News.find(); // Fetch data from the company-specific collection
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
