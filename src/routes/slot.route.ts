import express from 'express';

import checkAuth from '../middlewares/auth.middleware';
import {
  bookSlot,
  createBookingSlot,
  getUserSlots,
} from '../controllers/slot.controller';

const router = express.Router();

router.put('/create', checkAuth, createBookingSlot);
router.get('/get-slots', checkAuth, getUserSlots);
router.patch('/book', checkAuth, bookSlot);

export default router;
