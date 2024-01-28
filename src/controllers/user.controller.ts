import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { RequestWithUserDataType } from '../utils/types';
import User from '../models/user.model';
import { generateJWTToken } from '../utils/jwt-token';

export async function registerUser(req: Request, res: Response) {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Insufficient data.' });
    }

    const isEmailDuplicate = await User.exists({ email });

    if (isEmailDuplicate) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    const user = await User.create({
      email,
      password,
      role,
    });

    return res.status(201).json({
      message: 'User registered successfully.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Incorrect email.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Incorrect password.' });
    }

    const token = await generateJWTToken(user.id);

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
    });

    return res.status(200).json({
      message: 'Login successful.',
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function logoutUser(req: RequestWithUserDataType, res: Response) {
  try {
    res.cookie('token', null, {
      httpOnly: true,
      maxAge: 0,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
    });

    return res.status(200).json({ message: 'User logged out successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
