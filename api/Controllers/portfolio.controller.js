import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const TRENDING_API_URL = 'https://indian-stock-exchange-api2.p.rapidapi.com/trending';
const SEARCH_API_URL = 'https://indian-stock-exchange-api2.p.rapidapi.com/stock';
const NSE_API_URL = 'https://indian-stock-exchange-api2.p.rapidapi.com/NSE_most_active';
const BSE_API_URL = 'https://indian-stock-exchange-api2.p.rapidapi.com/BSE_most_active';

//trendingstocks (top gainers and losers)
export const getTrendingStocks = async (req, res) => {
  try {
    const response = await axios.get(TRENDING_API_URL, {
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'indian-stock-exchange-api2.p.rapidapi.com',
        'Accept': 'application/json',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Failed to fetch trending stock data' });
  }
};

//  top NSE stocks
export const getNSEStocks = async (req, res) => {
  try {
    const response = await axios.get(NSE_API_URL, {
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'indian-stock-exchange-api2.p.rapidapi.com',
        'Accept': 'application/json',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Failed to fetch NSE stock data' });
  }
};

//top BSE stocks
export const getBSEStocks = async (req, res) => {
  try {
    const response = await axios.get(BSE_API_URL, {
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'indian-stock-exchange-api2.p.rapidapi.com',
        'Accept': 'application/json',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Failed to fetch BSE stock data' });
  }
};

export const searchStockData = async (req, res) => {
  const query = req.query.name;

  try {
    const response = await axios.get(SEARCH_API_URL, {
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'indian-stock-exchange-api2.p.rapidapi.com',
        'Accept': 'application/json',
      },
      params: { name: query },
    });

    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Failed to fetch stock data by name' });
  }
};
