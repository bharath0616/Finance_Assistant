import express from 'express';
import { sendMessageToBot, getChatHistory } from '../Controllers/chat.controller.js';
import { verifyToken } from '../Utils/verifyUser.js';
const router = express.Router();


router.post('/send-message',verifyToken, sendMessageToBot);

router.get('/history', verifyToken, getChatHistory);

export default router;
