import express from 'express';

import {
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/user.controller';
import checkAuth from '../middlewares/auth.middleware';

const router = express.Router();

router.put('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', checkAuth, logoutUser);

export default router;
