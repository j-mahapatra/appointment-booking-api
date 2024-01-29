import { Request, Response } from 'express';

import { RequestWithUserDataType } from '../utils/types';
import User from '../models/user.model';
import Slot from '../models/slot.model';

export async function createBookingSlot(
  req: RequestWithUserDataType,
  res: Response
) {
  try {
    const { slots, day } = req.body;
    const user = await User.findOne({ email: req.user?.email });

    if (!user) {
      return res.status(401).json({ message: 'User not authorized.' });
    }

    if (user.role !== 'PHYSIO') {
      return res
        .status(403)
        .json({ message: 'User does not have permissions.' });
    }

    slots.forEach(async (slot: string) => {
      const createdSlot = await Slot.create({ slot, day });

      await User.updateOne(
        { email: req.user?.email },
        {
          $push: { free_slots: createdSlot },
        }
      );
    });

    return res.status(200).json({ message: 'Slot registered.' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function getUserSlots(
  req: RequestWithUserDataType,
  res: Response
) {
  try {
    const user = await User.findOne({ email: req.user?.email }).populate({
      path: 'free_slots',
      select: 'slot day isBooked',
    });

    if (!user) {
      return res.status(401).json({ message: 'User not authorized.' });
    }

    return res.status(200).json({ free_slots: user.free_slots });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function bookSlot(req: RequestWithUserDataType, res: Response) {
  try {
    const { slotId } = req.body;

    const slot = await Slot.findOne({ _id: slotId });

    if (!slot) {
      return res.status(404).json({ message: 'Time slot not found' });
    }

    slot.isBooked = true;
    await slot.save();

    return res.status(200).json({ message: 'Time slot booked' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function getAllAvailableSlots(
  req: RequestWithUserDataType,
  res: Response
) {
  try {
    const slots = await Slot.find({ isBooked: false }).select(
      '_id slot day isBooked'
    );

    return res.status(200).json({ slots });
  } catch (error) {}
}
