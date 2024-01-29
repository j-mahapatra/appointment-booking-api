import express from 'express';

import checkAuth from '../middlewares/auth.middleware';
import {
  createBookingSlot,
  getUserSlots,
} from '../controllers/slot.controller';

const router = express.Router();

router.put('/create', checkAuth, createBookingSlot);
router.get('/get-slots', checkAuth, getUserSlots);

export default router;
