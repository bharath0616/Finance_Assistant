import React from 'react';
import { Line } from 'react-chartjs-2';

export default function StockChart ({ stock }) {
  const priceData = stock.stockTechnicalData.map((data) => parseFloat(data.nsePrice));
  const days = stock.stockTechnicalData.map((data) => `${data.days} days`);

  const chartData = {
    labels: days,
    datasets: [
      {
        label: `${stock.companyName} Price Trend`,
        data: priceData,
        borderColor: 'rgb(34, 202, 236)',
        backgroundColor: 'rgba(34, 202, 236, 0.1)',
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700">{stock.companyName}</h2>
      <p className="text-gray-500">{stock.companyProfile.companyDescription}</p>


      <div className="flex items-center justify-between mt-4">
        <p className="text-xl text-blue-600 font-bold">NSE: ₹{stock.currentPrice.NSE}</p>
        <p className={`text-xl font-bold ${stock.percentChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {stock.percentChange}%
        </p>
      </div>

      <div className="mt-8">
        <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-600">Key Financials</h3>
        <ul className="mt-4 space-y-2">
          <li>Market Cap: ₹{stock.peerCompanyList[0].marketCap} Cr</li>
          <li>Net Profit Margin: {stock.peerCompanyList[0].netProfitMarginPercentTrailing12Month}%</li>
          <li>Dividend Yield: {stock.peerCompanyList[0].dividendYieldIndicatedAnnualDividend}%</li>
        </ul>
      </div>
    </div>
  );
};

