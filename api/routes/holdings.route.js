
import express from 'express';
import { addOrUpdateStock, getUserHoldings, removeStockFromHoldings } from '../controllers/holdings.controller.js';
import { verifyToken } from '../Utils/verifyUser.js'

const router = express.Router();

router.post('/addOrUpdate', verifyToken, addOrUpdateStock);
router.get('/:userId', verifyToken, getUserHoldings);
router.post('/remove', verifyToken, removeStockFromHoldings);

export default router;
