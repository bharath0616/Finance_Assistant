import express from 'express';
import { searchStockData, getTrendingStocks, getNSEStocks, getBSEStocks } from '../Controllers/portfolio.controller.js';

const router = express.Router();

router.get('/trending', getTrendingStocks);
router.get('/search', searchStockData);
router.get('/nse', getNSEStocks);
router.get('/bse', getBSEStocks);

export default router;
