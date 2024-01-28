import express from 'express';

import checkAuth from '../middlewares/auth.middleware';
import { createBookingSlot } from '../controllers/slot.controller';

const router = express.Router();

router.put('/create', checkAuth, createBookingSlot);

export default router;
