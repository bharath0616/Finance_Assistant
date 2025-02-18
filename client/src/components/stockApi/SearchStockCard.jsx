import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrUpdateStock, fetchHoldings } from '../../redux/holdings/holdingsSlice';
import toast, { Toaster } from 'react-hot-toast';

export default function SearchStockCard({ stock, userId }) {
  if (!stock) return null;

  const {
    companyName = 'N/A',
    industry = 'N/A',
    currentPrice = {},
    percentChange = 'N/A',
    yearHigh = 'N/A',
    yearLow = 'N/A',
    recentNews = [],
    peerCompanyList = []
  } = stock;

  const financialData = peerCompanyList.length > 0 ? peerCompanyList[0] : {};
  const dispatch = useDispatch();
  const holdings = useSelector((state) => state.holdings.holdings);
  const holding = holdings.find((item) => item.name === companyName);
  const quantity = holding ? holding.quantity : 0;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchasePrice, setPurchasePrice] = useState('');
  const [inputQuantity, setInputQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchHoldings(userId));
  }, [dispatch, userId]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddToHoldings = () => {
    if (purchasePrice && inputQuantity > 0) {
      dispatch(addOrUpdateStock({
        userId,
        stockName: companyName,
        quantity: inputQuantity,
        purchasePrice: parseFloat(purchasePrice),
      }))
        .then(() => {
          toast.success('Stock added to holdings successfully!');
          handleCloseModal();
        })
        .catch(() => {
          toast.error('Failed to add stock to holdings.');
        });
    } else {
      toast.error('Please enter a valid purchase price and quantity.');
    }
  };

  return (
    <div className="p-6 bg-[#010D50] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-white w-72 transform hover:-translate-y-1">
      <Toaster />
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-[#010D50] w-12 h-12 rounded-full flex items-center justify-center">
          <span className="text-xl font-bold text-white">
            {companyName[0]}
          </span>
        </div>
        <div>
          <h2 className="text-lg font-bold">{companyName}</h2>
          <p className="text-sm text-gray-400">{industry}</p>
        </div>
      </div>

      <div className="text-xl font-bold mb-1">
        ₹{currentPrice.BSE || 'N/A'} (BSE) | ₹{currentPrice.NSE || 'N/A'} (NSE)
      </div>
      <div className={`text-md font-semibold ${percentChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        {percentChange > 0 ? '+' : ''}{percentChange}% ({financialData.netChange || 'N/A'})
      </div>
      <div className="text-gray-300 text-sm mt-2">
        52-Week High: ₹{yearHigh} | Low: ₹{yearLow}
      </div>

      {/* <h3 className="mt-4 text-md font-semibold text-gray-200">Key Financial Highlights</h3>
      <ul className="text-sm text-gray-300 space-y-1">
        <li>Market Cap: ₹{financialData.marketCap ? `${financialData.marketCap} Cr` : 'N/A'}</li>
        <li>Price to Book: {financialData.priceToBookValueRatio ?? 'N/A'}</li>
        <li>P/E Ratio: {financialData.priceToEarningsValueRatio ?? 'N/A'}</li>
        <li>ROE (5-Year Avg): {financialData.returnOnAverageEquity5YearAverage !== undefined ? `${financialData.returnOnAverageEquity5YearAverage}%` : 'N/A'}</li>
        <li>Net Profit Margin: {financialData.netProfitMarginPercentTrailing12Month !== undefined ? `${financialData.netProfitMarginPercentTrailing12Month}%` : 'N/A'}</li>
      </ul> */}

      <h3 className="mt-4 text-md font-semibold text-gray-200">Recent News</h3>
      <ul className="text-sm text-red-900 space-y-2">
        {recentNews.slice(0, 3).map((news) => (
          <li key={news.id} className="mt-1">
            <a href={news.url} target="_blank" rel="noopener noreferrer" className="hover:underline  text-red-700">
              {news.headline}
            </a>
            <p className="text-xs text-gray-600">{news.date} - {news.timeToRead} min read</p>
          </li>
        ))}
      </ul>

      {quantity === 0 ? (
        <button onClick={handleOpenModal} className="mt-4 bg-blue-500 text-white p-2 rounded w-full transition-transform duration-300 transform hover:scale-105">
          Add to Holdings
        </button>
      ) : (
        <span className="mt-4 block text-lg text-center">{quantity} shares in holdings</span>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 animate-fadeIn">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg transform transition-transform duration-300 scale-105">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Add Stock to Holdings</h2>
            <label className="block mb-2 text-gray-600">
              Purchase Price:
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                className="border rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>
            <label className="block mb-4 text-gray-600">
              Quantity:
              <input
                type="number"
                min="1"
                value={inputQuantity}
                onChange={(e) => setInputQuantity(Number(e.target.value))}
                className="border rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>
            <div className="flex justify-end space-x-4">
              <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition duration-300">
                Cancel
              </button>
              <button onClick={handleAddToHoldings} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                Add Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
