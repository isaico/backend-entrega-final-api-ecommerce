import express from 'express';

import { generateOrder } from '../controllers/index.js';

export const orderRouter = express.Router()

orderRouter.post('/order/:id',generateOrder)
