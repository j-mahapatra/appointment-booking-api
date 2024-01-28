import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is not provided.'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is not provided.'],
    },
    role: {
      type: String,
      enum: ['PHYSIO', 'PATIENT', 'SALES'],
      required: [true, 'Role is not provided.'],
    },
    free_slots: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Slot',
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  return next();
});

export default mongoose.model('User', userSchema);
