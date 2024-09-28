const express = require('express');
const stockRouter = require('/Users/stdmitry/Desktop/website-finance/backend/routes/stocks.js'); // Adjust path as necessary

const app = express();
const PORT = 3000; // You can use any port you prefer

app.use('/stocks', stockRouter);

app.listen(PORT, () => {
  console.log(`Test server is running on http://localhost:${PORT}`);
});
