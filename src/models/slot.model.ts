import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema(
  {
    slot: String,
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Slot', slotSchema);
