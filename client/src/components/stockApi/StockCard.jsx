import React, { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { addOrUpdateStock } from '../../redux/holdings/holdingsSlice';
import toast, { Toaster } from 'react-hot-toast';

export default function StockCard({ stock, userId }) {
  const dispatch = useDispatch();
  const holdings = useSelector((state) => state.holdings.holdings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchasePrice, setPurchasePrice] = useState('');
  const [quantity, setQuantity] = useState(1);

  const stockInHoldings = holdings.find((item) => item.name === stock.company || item.name === stock.company_name);
  const currentQuantity = stockInHoldings ? stockInHoldings.quantity : 0;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddToHoldings = () => {
    if (purchasePrice && quantity > 0) {
      dispatch(
        addOrUpdateStock({
          userId,
          stockName: stock.company || stock.company_name,
          quantity,
          purchasePrice: parseFloat(purchasePrice),
        })
      )
        .then(() => {
          toast.success('Stock added to holdings successfully!');
          handleCloseModal();
        })
        .catch((error) => {
          toast.error('Failed to add stock to holdings.');
          console.error('Add to Holdings Error:', error);
        });
    } else {
      toast.error('Please enter a valid purchase price and quantity.');
    }
  };

  return (
    <div className="p-4 bg-[#010D50] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 w-56 h-80 relative text-white">

      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-[#0328EE] w-10 h-10 rounded-full flex items-center justify-center">
          <span className="text-lg font-bold text-white">{(stock.company || stock.company_name || "N/A")[0]}</span>
        </div>
        <div>
          <h3 className="text-md font-semibold">{stock.company || stock.company_name || 'Unknown Company'}</h3>
        </div>
      </div>

      <div className="text-xl font-bold mb-2">₹{stock.price || 'N/A'}</div>
      <div className={`text-md font-semibold ${stock.percent_change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        {stock.percent_change ? `${stock.percent_change}%` : 'N/A'} ({stock.net_change || 'N/A'})
      </div>

      <div className="text-gray-400 text-sm mt-2">
        High: ₹{stock.high || 'N/A'} | Low: ₹{stock.low || 'N/A'}
      </div>
      <div className="text-gray-400 text-sm">Volume: {stock.volume ? Number(stock.volume).toLocaleString() : 'N/A'}</div>
      <div className="text-gray-400 text-sm">
        52-Week High: ₹{stock['52_week_high'] || stock.year_high || 'N/A'} | Low: ₹{stock['52_week_low'] || stock.year_low || 'N/A'}
      </div>

      {currentQuantity === 0 ? (
        <button
          onClick={handleOpenModal}
          className="mt-4 bg-blue-500 text-white p-2 rounded w-full transition-transform duration-300 transform hover:scale-105"
        >
          Add to Holdings
        </button>
      ) : (
        <span className="mt-4 block text-lg text-center">{currentQuantity} shares in holdings</span>
      )}

      {isModalOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg transform transition-transform duration-300 scale-105">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Stock to Holdings</h2>
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
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToHoldings}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              >
                Add Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
