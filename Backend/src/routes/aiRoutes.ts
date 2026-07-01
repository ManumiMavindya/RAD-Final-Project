import express from 'express';
import { askAI } from '../controller/aiController';

const router = express.Router();

router.post('/ask', askAI);

export default router;