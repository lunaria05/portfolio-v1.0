import mongoose from 'mongoose';

export interface IContact {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const ContactSchema = new mongoose.Schema<IContact>({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
