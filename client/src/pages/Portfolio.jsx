import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHoldings, addOrUpdateStock, removeStock } from '../redux/holdings/holdingsSlice';
import toast, { Toaster } from 'react-hot-toast';

export default function Portfolio() {
  const userId = useSelector((state) => state.user.currentUser?._id) || localStorage.getItem("userId");
  const dispatch = useDispatch(); //REDUX
  const { holdings, totalValue = 0, investedValue = 0, loading, error } = useSelector((state) => state.holdings);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'buy' or 'sell'
  const [selectedStock, setSelectedStock] = useState(null);
  const [inputPrice, setInputPrice] = useState("");
  const [inputQuantity, setInputQuantity] = useState("");

  useEffect(() => {
    dispatch(fetchHoldings(userId));
  }, [dispatch, userId]);

  const openModal = (type, stock) => {
    setModalType(type);
    setSelectedStock(stock);
    setIsModalOpen(true);
    setInputPrice("");
    setInputQuantity("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStock(null);
    setModalType("");
  };

  const handleUpdateStock = () => {
    if (!inputPrice || !inputQuantity) {
      toast.error("Please enter valid price and quantity.");
      return;
    }

    const quantity = modalType === "buy" ? parseInt(inputQuantity) : -parseInt(inputQuantity);
    const payload = {
      userId,
      stockName: selectedStock.name,
      quantity,
      purchasePrice: parseFloat(inputPrice),
    };

    dispatch(addOrUpdateStock(payload))
      .then(() => {
        toast.success(`Stock ${modalType === "buy" ? "bought" : "sold"} successfully!`);
        closeModal();
      })
      .catch((error) => {
        toast.error(`Failed to ${modalType === "buy" ? "buy" : "sell"} stock.`);
        console.error(error);
      });
  };

  const handleRemoveStock = (stockName) => {
    dispatch(removeStock(userId, stockName));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const difference = totalValue - investedValue;
  const differenceColor = difference >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="p-8">
      <Toaster />
      <div className="bg-dark p-6 rounded-lg shadow-lg text-white mb-8">
        <h1 className="text-5xl font-semibold">₹{totalValue ? totalValue.toLocaleString() : "0"}</h1>
        <p className="text-lg font-medium text-gray-400">Current Value</p>
        <p className="text-lg font-medium text-gray-400 mt-2">
          Invested Value: ₹{investedValue ? investedValue.toLocaleString() : "0"}
        </p>
        <p className={`text-lg font-medium ${differenceColor} mt-2`}>
          Difference: ₹{difference ? difference.toLocaleString() : "0"} (
          {investedValue ? ((difference / investedValue) * 100).toFixed(2) : 0}%)
        </p>
      </div>

      <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center pb-4 border-b border-gray-700 mb-4">
          <h2 className="text-xl font-semibold text-white">Holdings ({holdings.length})</h2>
        </div>

        {holdings.map((stock) => {
          const investedAmount = stock.investedAmount || stock.purchasePrice * stock.quantity;

          return (
            <div
              key={stock.name}
              className="bg-gray-800 text-white p-4 rounded-lg mb-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold">{stock.name}</h3>
                <p className="text-sm text-gray-400">
                  {stock.quantity || 0} shares • Avg Buy Price: ₹
                  {(investedAmount / (stock.quantity || 1)).toLocaleString() || "N/A"}
                </p>
                <p className="text-sm font-medium mt-1">
                  MKT Price: BSE: ₹{stock.currentPrice?.BSE || "N/A"}, NSE: ₹
                  {stock.currentPrice?.NSE || "N/A"}
                </p>
                <p className="text-sm font-medium mt-1">
                  Invested Amount: ₹{investedAmount.toLocaleString() || "0"}
                </p>
                <p className="text-sm font-medium mt-1">
                  Current Value: ₹{stock.currentValue ? stock.currentValue.toLocaleString() : "N/A"}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="bg-green-600 text-white font-bold px-3 py-1 rounded"
                  onClick={() => openModal("buy", stock)}
                >
                  +
                </button>
                <button
                  className="bg-yellow-500 text-white font-bold px-3 py-1 rounded"
                  onClick={() => openModal("sell", stock)}
                >
                  -
                </button>
                <button
                  className="bg-red-500 text-white font-bold px-3 py-1 rounded"
                  onClick={() => handleRemoveStock(stock.name)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {modalType === "buy" ? "Buy Stock" : "Sell Stock"}
            </h2>
            <label className="block mb-2 text-gray-600">
              Price:
              <input
                type="number"
                value={inputPrice}
                onChange={(e) => setInputPrice(e.target.value)}
                className="border rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>
            <label className="block mb-4 text-gray-600">
              Quantity:
              <input
                type="number"
                value={inputQuantity}
                onChange={(e) => setInputQuantity(e.target.value)}
                className="border rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStock}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              >
                {modalType === "buy" ? "Buy" : "Sell"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
