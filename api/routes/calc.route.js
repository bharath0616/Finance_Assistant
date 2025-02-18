import express from 'express';
import { data } from '../Controllers/calc.controller.js';
import { verifyToken } from '../Utils/verifyUser.js';

const router = express.Router();
router.post('/data', verifyToken, data);

export default router;
