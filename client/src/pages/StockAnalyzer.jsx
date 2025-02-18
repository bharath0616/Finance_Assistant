import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import 'aos/dist/aos.css';
import AOS from 'aos';

export default function StockAnalyzer() {
    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState("");

    React.useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const fetchStockName = async (ticker) => {
        const apiKey = 'CFJB4H2411V19VKU';
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${ticker}&apikey=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.bestMatches?.[0]?.["2. name"] || "Not Found";
        } catch (error) {
            console.error("Error fetching stock data:", error);
            return "Error";
        }
    };

    const fetchStockNews = async (ticker) => {
        const apiKey = 'CFJB4H2411V19VKU';
        const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.feed?.slice(0, 5).map(news => news.title).join(" | ") || "No recent news";
        } catch (error) {
            console.error("Error fetching stock news:", error);
            return "Error";
        }
    };

    const fetchFinancialRatios = async (ticker) => {
        const apiKey = 'CFJB4H2411V19VKU';
        const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return {
                peRatio: data["PERatio"] || "N/A",
                marketCap: data["MarketCapitalization"] || "N/A",
                eps: data["EPS"] || "N/A",
                dividendYield: data["DividendYield"] || "N/A",
                priceToBook: data["PriceToBookRatio"] || "N/A"
            };
        } catch (error) {
            console.error("Error fetching financial ratios:", error);
            return { peRatio: "Error", marketCap: "Error", eps: "Error", dividendYield: "Error", priceToBook: "Error" };
        }
    };

    const handleFile = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async function (e) {
            const tickers = e.target.result.split("\n").map(row => row.trim()).filter(row => row);
            setLoading(true);
            const results = [];

            for (const ticker of tickers) {
                const stockName = await fetchStockName(ticker);
                const financialRatios = await fetchFinancialRatios(ticker);
                const stockNews = await fetchStockNews(ticker);

                results.push({ ticker, stockName, ...financialRatios, stockNews });
            }

            setStockData(results);
            setLoading(false);
        };
        reader.readAsText(file);
    };

    const sendFile = async () => {
        setLoading(true);
        let csvContent = "Ticker,Stock Name,PE Ratio,Market Cap,EPS,Dividend Yield,Price to Book Ratio,Recent News Titles\n";
        stockData.forEach(stock => {
            csvContent += `${stock.ticker},${stock.stockName},${stock.peRatio},${stock.marketCap},${stock.eps},${stock.dividendYield},${stock.priceToBook},${stock.stockNews}\n`;
        });

        const apiKey = 'AIzaSyAKuIP0uXS5CDb9Fd7n2mSr_yYCgUdkCmc';
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: `Analyze the following stock data and provide individual investment recommendations. Provide in such a way that you give a commentary whether to buy, hold or sell:\n\n${csvContent}` }] }]
            }),
        });

        setLoading(false);
        const data = await response.json();
        if (data?.candidates) {
            setRecommendations(data.candidates[0].content.parts[0].text);
        } else {
            alert("Failed to get AI recommendations.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12" data-aos="fade-down">
            <h1 className="text-white font-bold text-4xl text-center mb-8">
                📈 Stock Analyzer
            </h1>
            <p className="text-white text-md text-center mb-6">
                Upload a CSV file containing stock tickers to get analysis.
            </p>
            <div className="flex justify-center mb-6">
                <input type="file" accept=".csv" onChange={handleFile} className="p-2 bg-gray-800 text-white rounded cursor-pointer" />
            </div>

            {loading && <div className="text-center text-white">🔄 Loading...</div>}

            {stockData.length > 0 && (
                <div data-aos="fade-up" className="overflow-x-auto">
                    <table className="w-full text-white border border-gray-600">
                        <thead>
                            <tr className="bg-gray-900 border-b">
                                <th className="p-3">Ticker</th>
                                <th className="p-3">Stock Name</th>
                                <th className="p-3">P/E Ratio</th>
                                <th className="p-3">Market Cap</th>
                                <th className="p-3">EPS</th>
                                <th className="p-3">Dividend Yield</th>
                                <th className="p-3">Price to Book</th>
                                <th className="p-3">Recent News</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stockData.map((stock, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-3">{stock.ticker}</td>
                                    <td className="p-3">{stock.stockName}</td>
                                    <td className="p-3">{stock.peRatio}</td>
                                    <td className="p-3">{stock.marketCap}</td>
                                    <td className="p-3">{stock.eps}</td>
                                    <td className="p-3">{stock.dividendYield}</td>
                                    <td className="p-3">{stock.priceToBook}</td>
                                    <td className="p-3">{stock.stockNews}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {stockData.length > 0 && (
                <div className="text-center mt-6">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800" onClick={sendFile}>
                        🤖 Get AI Recommendations
                    </button>
                </div>
            )}
            {loading && <div className="text-center text-white">🔄 Loading...</div>}
            {recommendations && (
                <div className="mt-6 p-4 bg-gray-800 rounded text-white">
                    <ReactMarkdown>{recommendations}</ReactMarkdown>
                </div>
            )}
        </div>
    );
}
