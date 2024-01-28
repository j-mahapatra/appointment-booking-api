import express from 'express';

import {
  getAllPhysios,
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/user.controller';
import checkAuth from '../middlewares/auth.middleware';

const router = express.Router();

router.put('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', checkAuth, logoutUser);
router.get('/get-physios', checkAuth, getAllPhysios);

export default router;
