import { NextFunction, Response } from 'express';

import { RequestWithUserDataType } from '../utils/types';
import User from '../models/user.model';
import { verifyToken } from '../utils/jwt-token';

export default async function checkAuth(
  req: RequestWithUserDataType,
  res: Response,
  next: NextFunction
) {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: 'User is not authenticated.' });
    }
    const { userId } = verifyToken(token);
    const user = await User.findOne({ _id: userId }).select('-password');
    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
