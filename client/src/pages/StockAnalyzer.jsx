import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import 'aos/dist/aos.css';
import AOS from 'aos';

export default function StockAnalyzer() {
    const [tableData, setTableData] = useState([]);
    const [csvFile, setCsvFile] = useState(null);
    const [recommendation, setRecommendation] = useState("");
    const [loading, setLoading] = useState(false);
  
    const fetchStockName = async (ticker) => {
      const apiKey = import.meta.env.ALPHAVINTAGE_API_KEY;
      const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${ticker}&apikey=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data.bestMatches && data.bestMatches.length > 0 ? data.bestMatches[0]["2. name"] : "Not Found";
      } catch {
        return "Error";
      }
    };
  
    const fetchFinancialRatios = async (ticker) => {
      const apiKey = import.meta.env.ALPHAVINTAGE_API_KEY;
      const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Note) {
          return { peRatio: "N/A", marketCap: "N/A", eps: "N/A", dividendYield: "N/A", priceToBook: "N/A" };
        }
        return {
          peRatio: data["PERatio"] || "N/A",
          marketCap: data["MarketCapitalization"] || "N/A",
          eps: data["EPS"] || "N/A",
          dividendYield: data["DividendYield"] || "N/A",
          priceToBook: data["PriceToBookRatio"] || "N/A"
        };
      } catch {
        return { peRatio: "Error", marketCap: "Error", eps: "Error", dividendYield: "Error", priceToBook: "Error" };
      }
    };
  
    const fetchStockNews = async (ticker) => {
      const apiKey = import.meta.env.ALPHAVINTAGE_API_KEY;
      const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.feed && data.feed.length > 0) {
          return data.feed.slice(0, 3).map(news => news.title).join(" | ");
        }
        return "No recent news";
      } catch {
        return "Error";
      }
    };
  
    const handleCSVUpload = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = async (event) => {
        const tickers = event.target.result.split("\n").map(row => row.trim()).filter(row => row);
        const results = [];
  
        for (const ticker of tickers) {
          const name = await fetchStockName(ticker);
          const ratios = await fetchFinancialRatios(ticker);
          const news = await fetchStockNews(ticker);
  
          results.push({
            ticker,
            name,
            ...ratios,
            news
          });
        }
  
        setTableData(results);
      };
  
      reader.readAsText(file);
    };
  
    const sendCSVToGemini = async () => {
      const csvContent = [
        "Ticker,Stock Name,PE Ratio,Market Cap,EPS,Dividend Yield,Price to Book Ratio,Recent News Titles",
        ...tableData.map(item => [
          item.ticker,
          item.name,
          item.peRatio,
          item.marketCap,
          item.eps,
          item.dividendYield,
          item.priceToBook,
          item.news
        ].join(","))
      ].join("\n");
  
      const apiKey =import.meta.env.GEMINI_API_KEY ;
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [{ text: `Analyze the following stock data and provide individual investment recommendations:\n\n${csvContent}` }]
          }]
        })
      });
  
      const data = await response.json();
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        const output = data.candidates[0].content.parts[0].text;
        window.location.href = `recommendation.html?text=${encodeURIComponent(output)}`;
      } else {
        alert("Failed to get AI recommendations.");
      }
    };
  
    return (
      <div className="max-w-5xl mx-auto p-6 text-white">
        <h1 className="text-white font-bold text-4xl text-center mb-8">
                📈 Stock Analyzer
            </h1>
            <p className="text-white text-md text-center mb-6">
                Upload a CSV file containing stock tickers to get analysis.
            </p>
  
        <input
          type="file"
          accept=".csv"
          onChange={handleCSVUpload}
          className="mb-4 p-2 bg-gray-800 rounded border border-gray-600"
        />
  
        {tableData.length > 0 && (
          <>
            <table className="w-full border-collapse mt-4 text-sm">
              <thead className="bg-gray-700">
                <tr>
                  <th className="border px-2 py-1">Ticker</th>
                  <th className="border px-2 py-1">Name</th>
                  <th className="border px-2 py-1">PE Ratio</th>
                  <th className="border px-2 py-1">Market Cap</th>
                  <th className="border px-2 py-1">EPS</th>
                  <th className="border px-2 py-1">Dividend Yield</th>
                  <th className="border px-2 py-1">Price to Book</th>
                  <th className="border px-2 py-1">Recent News</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, idx) => (
                  <tr key={idx} className="bg-gray-800">
                    <td className="border px-2 py-1">{row.ticker}</td>
                    <td className="border px-2 py-1">{row.name}</td>
                    <td className="border px-2 py-1">{row.peRatio}</td>
                    <td className="border px-2 py-1">{row.marketCap}</td>
                    <td className="border px-2 py-1">{row.eps}</td>
                    <td className="border px-2 py-1">{row.dividendYield}</td>
                    <td className="border px-2 py-1">{row.priceToBook}</td>
                    <td className="border px-2 py-1">{row.news}</td>
                  </tr>
                ))}
              </tbody>
            </table>
  
            <button
              onClick={sendCSVToGemini}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Get AI Recommendation
            </button>
          </>
        )}
      </div>
    );
  }
