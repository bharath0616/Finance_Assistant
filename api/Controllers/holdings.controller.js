import Holdings from '../models/holdings.model.js';
import axios from 'axios';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const SEARCH_API_URL = 'https://indian-stock-exchange-api2.p.rapidapi.com/stock';

export const addOrUpdateStock = async (req, res) => {
  const { userId, stockName, quantity, purchasePrice } = req.body;

  
  
  console.log("Received Payload:", req.body);

  if (!userId || !stockName || quantity === undefined || purchasePrice === undefined) {
    return res.status(400).json({ message: "All fields (userId, stockName, quantity, purchasePrice) are required." });
  }

  try {
    let holdings = await Holdings.findOne({ userId });

    if (holdings) {
      const stockIndex = holdings.stocks.findIndex((s) => s.name === stockName);
      if (stockIndex !== -1) {
        holdings.stocks[stockIndex].quantity += quantity;
        holdings.stocks[stockIndex].purchasePrice = purchasePrice;
      } else {
        holdings.stocks.push({ name: stockName, quantity, purchasePrice });
      }
    } else {
      holdings = new Holdings({ userId, stocks: [{ name: stockName, quantity, purchasePrice }] });
    }

    await holdings.save();
    res.json({ message: 'Stock added/updated in holdings' });
  } catch (error) {
    console.error('Error adding/updating stock:', error);
    res.status(500).json({ message: 'Failed to add/update stock in holdings' });
  }
};


export const getUserHoldings = async (req, res) => {
  const userId = req.user.id;

  try {
    const holdings = await Holdings.findOne({ userId });

    if (!holdings) return res.json({ stocks: [], totalValue: 0, totalInvestedValue: 0 });

    const updatedStocks = await Promise.all(
      holdings.stocks.map(async (stock) => {
        try {
          const response = await axios.get(SEARCH_API_URL, {
            headers: {
              'X-RapidAPI-Key': RAPIDAPI_KEY,
              'X-RapidAPI-Host': 'indian-stock-exchange-api2.p.rapidapi.com',
              'Accept': 'application/json',
            },
            params: { name: stock.name },
          });

          const { BSE, NSE } = response.data.currentPrice || { BSE: 0, NSE: 0 };
          const currentPrice = { BSE, NSE };
          const currentValue = BSE * stock.quantity;

     
          const investedAmount = stock.purchasePrice * stock.quantity;

          return { ...stock.toObject(), currentPrice, currentValue, investedAmount };
        } catch (error) {
          console.error(`Error fetching price for ${stock.name}:`, error);
          return { ...stock.toObject(), currentPrice: { BSE: 0, NSE: 0 }, currentValue: 0, investedAmount: 0 };
        }
      })
    );

    const totalValue = updatedStocks.reduce((acc, stock) => acc + stock.currentValue, 0);
    const totalInvestedValue = updatedStocks.reduce((acc, stock) => acc + stock.investedAmount, 0);
    console.log(totalInvestedValue );

    res.json({ stocks: updatedStocks, totalValue, totalInvestedValue });
  } catch (error) { 
    console.error('Error fetching holdings:', error);
    res.status(500).json({ message: 'Failed to fetch holdings' });
  }
};


export const removeStockFromHoldings = async (req, res) => {
  const { stockName } = req.body;
  const userId = req.user.id;

  try {
    const holdings = await Holdings.findOne({ userId });
    if (!holdings) return res.status(404).json({ message: 'Holdings not found' });

    holdings.stocks = holdings.stocks.filter((stock) => stock.name !== stockName);

    let totalInvestedValue = 0;
    let totalValue = 0;

    for (const stock of holdings.stocks) {
      const investedAmount = stock.purchasePrice * stock.quantity;
      totalInvestedValue += investedAmount;

      // Fetch or use existing current price for calculation (assuming it's in stock.currentPrice)
      const currentPrice = stock.currentPrice?.BSE || stock.currentPrice?.NSE || 0;
      totalValue += currentPrice * stock.quantity;
    }

    // Save the updated holdings
    await holdings.save();

    // Send the updated totals back to the client
    res.json({
      message: 'Stock removed from holdings',
      totalInvestedValue,
      totalValue,
      stocks: holdings.stocks,
    });
  } catch (error) {
    console.error('Error removing stock:', error);
    res.status(500).json({ message: 'Failed to remove stock from holdings' });
  }
};

