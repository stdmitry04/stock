import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

// Register the required components
Chart.register(LineElement, PointElement, CategoryScale, LinearScale);

const App = () => {

  const tickers = [
    'AAPL', 'MSFT', 'AMZN', 'GOOGL', 'GOOG', 'FB', 'TSLA', 'BRK.B', 'NVDA', 'JNJ',
    'V', 'PG', 'UNH', 'HD', 'DIS', 'PYPL', 'VZ', 'NFLX', 'INTC', 'T',
    'CMCSA', 'PFE', 'CSCO', 'XOM', 'KO', 'NKE', 'TMO', 'MRK', 'NVS', 'ABT',
    'CRM', 'C', 'IBM', 'PEP', 'INTU', 'MDT', 'QCOM', 'WMT', 'HON', 'NOW',
    'TXN', 'AVGO', 'LLY', 'CVX', 'AMGN', 'SBUX', 'DHR', 'TGT', 'BKNG', 'LMT'
]


  const [companies, setCompanies] = useState(tickers);
  const [selectedCompany, setSelectedCompany] = useState('AAPL');
  const [stockData, setStockData] = useState([]);
  const [newsData, setNewsData] = useState([]);

  // Fetch stock data when the selected company changes
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`/stocks/${selectedCompany}`);
        setStockData(response.data); // Assuming stock data includes date and close fields
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };
    fetchStockData();
  }, [selectedCompany]);

  // Fetch news data when the selected company changes
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const companyName = selectedCompany;
        const response = await axios.get(`/news/${companyName}`); // Send company name to the API
        setNewsData(response.data); // Assuming news data includes timestamp, title, link
        console.log("News:", response.data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };
    fetchNewsData();
  }, [selectedCompany]);

  return (
    <div>
      <h1>Stock News App</h1>
      <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
        {companies.map(company => (
          <option key={company} value={company}>{company}</option>
        ))}
      </select>
      <Line
        data={{
          labels: stockData.map(data => data.date),
          datasets: [{
            label: 'Stock Price',
            data: stockData.map(data => data.close),
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 2,
            fill: false
          }]
        }}
        options={{
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  const stockDate = new Date(context.label).toDateString(); // Format the stock data date
                  const news = newsData.find(n => new Date(n.timestamp).toDateString() === stockDate); // Match news date

                  if (news) {
                    return `${context.dataset.label}: $${context.raw}\nNews: ${news.title} (${news.link})`;
                  }
                  return `${context.dataset.label}: $${context.raw}`;
                },
                afterLabel: function (context) {
                  const stockDate = new Date(context.label).toDateString();
                  const news = newsData.find(n => new Date(n.timestamp).toDateString() === stockDate);

                  if (news) {
                    return `Link: ${news.link}`;
                  }
                  return null;
                }
              }
            }
          }
        }}
      />
    </div>
  );
};

export default App;
