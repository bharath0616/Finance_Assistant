import {handleContact} from '../Controllers/contact.controller.js';
import express from 'express'
const router = express.Router();

router.post('/contact',handleContact);
export default router;