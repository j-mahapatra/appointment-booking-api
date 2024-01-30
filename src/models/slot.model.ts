import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema(
  {
    slot: String,
    day: String,
    isBooked: {
      type: Boolean,
      default: false,
    },
    remarks: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Slot', slotSchema);
