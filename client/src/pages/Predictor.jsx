import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import * as XLSX from 'xlsx';

export default function Predictor() {
  const [ticker, setTicker] = useState('GC=F');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const Options = [
    { symbol: 'GC=F', name: 'Gold' },
    { symbol: 'SI=F', name: 'Silver' },
    { symbol: 'CL=F', name: 'Crude Oil' },
    { symbol: 'NG=F', name: 'Natural Gas' },
    { symbol: 'PL=F', name: 'Platinum' },
    { symbol: 'HG=F', name: 'Copper' },
    { symbol: 'ZC=F', name: 'Corn' },
    { symbol: 'ZS=F', name: 'Soybeans' },
    { symbol: 'ZW=F', name: 'Wheat' },
    { symbol: 'LE=F', name: 'Live Cattle' },
    { symbol: 'HE=F', name: 'Lean Hogs' },
    { symbol: 'KC=F', name: 'Coffee' },
    { symbol: 'CC=F', name: 'Cocoa' },
    { symbol: 'SB=F', name: 'Sugar' },
  ];
  

  const fetchPrediction = async () => {
    setLoading(true);
    setError('');
    setData(null);
    try {
      const res = await fetch(`https://gold-api-efd8gch0f3hzh8g0.eastus-01.azurewebsites.net/predict?ticker=${ticker}`);
      if (!res.ok) throw new Error('Failed to fetch data.');
      const json = await res.json();
      setData(json);
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
    <div className="min-h-screen p-6" style={{ backgroundColor: 'rgb(6, 6, 40)', color: '#ffffff' }}>
      <h1 className="text-3xl font-bold text-center mb-8 text-cyan-400">Price Predictor</h1>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
      <select
  value={ticker}
  onChange={(e) => setTicker(e.target.value)}
  className="bg-[#0d0d33] text-white border border-cyan-600 rounded px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-cyan-500"
>
  {Options.map(option => (
    <option key={option.symbol} value={option.symbol} className="bg-[#0d0d33]">
      {option.name} ({option.symbol})
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
            <p><strong className="text-cyan-300">Ticker:</strong> {data.ticker}</p>
            <p><strong className="text-cyan-300">Recommendation:</strong> {data.recommendation}</p>
            <p><strong className="text-cyan-300">Support:</strong> {data.support}</p>
            <p><strong className="text-cyan-300">Resistance:</strong> {data.resistance}</p>
          </div>

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
                {data.prediction.map((entry, idx) => (
                  <tr key={idx} className="hover:bg-[#11114d]">
                    <td className="border border-cyan-800 px-4 py-2">{new Date(entry.ds).toLocaleDateString()}</td>
                    <td className="border border-cyan-800 px-4 py-2">{entry.yhat.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-lg font-semibold mb-3 text-white border-b border-cyan-700 pb-1">Price Prediction Graph</h2>

          <ResponsiveContainer width="80%" height={300}>
            <LineChart data={data.prediction}>
              <CartesianGrid strokeDasharray="3 3" stroke="#223344" />
              <XAxis dataKey="ds" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a2a', border: 'none', color: '#0ff' }}
                labelStyle={{ color: '#0ff' }}
              />
              <Legend />
              <Line type="monotone" dataKey="yhat" stroke="#00ffff" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>  
  );
}
