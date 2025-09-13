import express from 'express';
import { handleChatbotQuery } from '../controller/gemini.controller.js';

const router = express.Router();

router.post("/prompt", handleChatbotQuery);

export default router;


