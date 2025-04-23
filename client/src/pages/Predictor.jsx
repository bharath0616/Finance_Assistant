import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import * as XLSX from 'xlsx';

export default function Predictor() {
  const [ticker, setTicker] = useState('GC=F');
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [plotUrl, setPlotUrl] = useState('');

  const Options = [
    // Commodities
    { symbol: 'GC=F', name: 'Gold (Commodity)' },
    { symbol: 'SI=F', name: 'Silver (Commodity)' },
    { symbol: 'CL=F', name: 'Crude Oil (Commodity)' },
    { symbol: 'NG=F', name: 'Natural Gas (Commodity)' },
    { symbol: 'PL=F', name: 'Platinum (Commodity)' },
    { symbol: 'HG=F', name: 'Copper (Commodity)' },
    { symbol: 'ZC=F', name: 'Corn (Commodity)' },
    { symbol: 'ZS=F', name: 'Soybeans (Commodity)' },
    { symbol: 'ZW=F', name: 'Wheat (Commodity)' },
    { symbol: 'LE=F', name: 'Live Cattle (Commodity)' },
    { symbol: 'HE=F', name: 'Lean Hogs (Commodity)' },
    { symbol: 'KC=F', name: 'Coffee (Commodity)' },
    { symbol: 'CC=F', name: 'Cocoa (Commodity)' },
    { symbol: 'SB=F', name: 'Sugar (Commodity)' },

    { symbol: 'AAPL', name: 'Apple Inc. (Stock)' },
    { symbol: 'MSFT', name: 'Microsoft Corp. (Stock)' },
    { symbol: 'GOOGL', name: 'Alphabet Inc. (Stock)' },
    { symbol: 'AMZN', name: 'Amazon.com Inc. (Stock)' },
    { symbol: 'TSLA', name: 'Tesla Inc. (Stock)' },
    { symbol: 'META', name: 'Meta Platforms (Stock)' },
    { symbol: 'NFLX', name: 'Netflix Inc. (Stock)' },
    { symbol: 'NVDA', name: 'NVIDIA Corp. (Stock)' },
  ];

  const DayOptions = [7, 15, 30];

  const fetchPrediction = async () => {
    setLoading(true);
    setError('');
    setData(null);
    setPlotUrl('');
    try {
      const res = await fetch(`http://127.0.0.1:5000/predict?ticker=${ticker}&days=${days}`);
      if (!res.ok) throw new Error('Failed to fetch data.');
      const json = await res.json();
      setData(json);

      // Set Azure-hosted plot image URL
      const backendPlotUrl = `http://127.0.0.1:5000/plot?ticker=${ticker}&days=${days}`;
      setPlotUrl(backendPlotUrl);
    } catch {
      setError('Could not fetch prediction. Please check the ticker or try again later.');
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    if (!data?.prediction) return;
    const ws = XLSX.utils.json_to_sheet(data.prediction);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Prediction');
    XLSX.writeFile(wb, `${ticker}_prediction.xlsx`);
  };

  return (
    <div className="min-h-screen p-6" >
      <h1 className="text-3xl font-bold text-center mb-8 text-cyan-400">Price Predictor</h1>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        <select
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          className="bg-[#0d0d33] text-white border border-cyan-600 rounded px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          {Options.map(option => (
            <option key={option.symbol} value={option.symbol} className="bg-[#0d0d33]">
              {option.name}
            </option>
          ))}
        </select>

        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="bg-[#0d0d33] text-white border border-cyan-600 rounded px-4 py-2 w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          {DayOptions.map(d => (
            <option key={d} value={d} className="bg-[#0d0d33]">
              {d} Days
            </option>
          ))}
        </select>

        <button
          onClick={fetchPrediction}
          className="bg-cyan-600 hover:bg-cyan-400 text-white px-4 py-2 rounded transition-all duration-200 shadow hover:shadow-cyan-400/50"
        >
          Predict
        </button>

        <button
          onClick={exportToExcel}
          className="bg-green-600 hover:bg-green-400 text-white px-4 py-2 rounded transition-all duration-200 shadow hover:shadow-green-400/50"
        >
          Export to Excel
        </button>
      </div>

      {loading && <p className="text-center text-cyan-300">Loading prediction...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      {data && (
        <div className="p-6 rounded-xl border border-cyan-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <p className=''><strong className="text-cyan-300">Ticker:</strong ><p className='text-white'> {data.name}</p></p>
            <p><strong className="text-cyan-300">Recommendation:</strong> <p className='text-white'> {data.recommendation}</p></p>
            <p><strong className="text-cyan-300">Support:</strong><p className='text-white'> {data.support}</p></p>
            <p><strong className="text-cyan-300">Resistance:</strong> <p className='text-white'> {data.resistance}</p></p>

          </div>
          <p><strong className="text-cyan-300">Summary:</strong> <p className='text-white'> {data.summary}</p></p>
          <div className='flex flex-col'>
            <h className='text-cyan-300 mt-5'>Top news:</h>
            {data.news_sentiment.sample_headlines.map((headline, idx) => (
              <p key={idx} className="text-white">{headline}</p>
            ))}
          </div>
          <p className='text-cyan-300'>News sentiment:</p>
          <p className='text-white'>{data.news_sentiment.sentiment_summary}</p>

          <h2 className="text-lg font-semibold mb-3 text-white border-b border-cyan-700 pb-1">Predicted Prices</h2>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm text-white">
              <thead className="bg-[#0d0d33] text-cyan-300">
                <tr>
                  <th className="border border-cyan-700 px-4 py-2">Date</th>
                  <th className="border border-cyan-700 px-4 py-2">Predicted Price</th>
                </tr>
              </thead>
              <tbody>
                {data.prediction_prophet.map((entry, idx) => (
                  <tr key={idx} className="hover:bg-[#11114d]">
                    <td className="border border-cyan-800 px-4 py-2">{new Date(entry.ds).toLocaleDateString()}</td>
                    <td className="border border-cyan-800 px-4 py-2">{entry.yhat.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>



          {plotUrl && (
            <div className="mt-10 w-full flex flex-col items-center">
              <h2 className="text-lg font-semibold mb-3 text-white border-b border-cyan-700 pb-1">Forecast Plot from Backend</h2>
              <img src={plotUrl} alt="Forecast Plot" className="w-full max-w-2xl mx-auto border border-cyan-700 rounded-xl shadow" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}