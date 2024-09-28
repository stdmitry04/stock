const express = require('express');
const axios = require('axios');

const router = express.Router();

const API_KEY = '0CKZGL67UFS5W2K6';

// Get stock data for a company
router.get('/:company', async (req, res) => {
  try {
    const company = req.params.company;
    const response = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: company,
        apikey: API_KEY
      }
    });

    const timeSeries = response.data['Time Series (Daily)'];
    if (!timeSeries) {
      return res.status(404).json({ message: 'Data not found' });
    }
    // Extract dates and stock data
    const data = Object.keys(timeSeries).map(date => ({
      date,
      open: parseFloat(timeSeries[date]['1. open']),
      high: parseFloat(timeSeries[date]['2. high']),
      low: parseFloat(timeSeries[date]['3. low']),
      close: parseFloat(timeSeries[date]['4. close']),
      volume: parseInt(timeSeries[date]['5. volume'])
    }));

    // Optionally sort data by date if needed
    data.sort((a, b) => new Date(a.date) - new Date(b.date));


    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;