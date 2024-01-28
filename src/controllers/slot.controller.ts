import { Request, Response } from 'express';

import { RequestWithUserDataType } from '../utils/types';
import User from '../models/user.model';
import Slot from '../models/slot.model';

export async function createBookingSlot(
  req: RequestWithUserDataType,
  res: Response
) {
  try {
    const { slot } = req.body;
    const user = await User.findOne({ email: req.user?.email });

    if (!user) {
      return res.status(401).json({ message: 'User not authorized.' });
    }

    if (user.role !== 'PHYSIO') {
      return res
        .status(403)
        .json({ message: 'User does not have permissions.' });
    }

    const createdSlot = await Slot.create({ slot });

    User.updateOne(
      { email: req.user?.email },
      {
        $push: { free_slots: createdSlot },
      }
    );

    return res.status(200).json({ message: 'Slot registered.' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
