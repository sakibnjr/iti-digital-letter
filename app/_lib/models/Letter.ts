import mongoose, { Schema, Model, Document } from 'mongoose';
import type { WaxSealDesignId, WaxColorId } from '../types';

export interface ILetterDocument extends Document {
  letterId: string;
  recipientName: string;
  salutation: string;
  dateStr: string;
  placeStr?: string;
  body: string;
  signOff: string;
  senderName: string;
  postScript?: string;
  waxSealDesign?: WaxSealDesignId;
  waxSealColor?: WaxColorId;
  envelopeColor?: string;
  language?: 'bn' | 'en';
  views: number;
  firstOpenedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const LetterSchema = new Schema<ILetterDocument>(
  {
    letterId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    recipientName: {
      type: String,
      required: true,
      trim: true,
    },
    salutation: {
      type: String,
      required: true,
      trim: true,
    },
    dateStr: {
      type: String,
      required: true,
      trim: true,
    },
    placeStr: {
      type: String,
      trim: true,
      default: '',
    },
    body: {
      type: String,
      required: true,
    },
    signOff: {
      type: String,
      required: true,
      trim: true,
    },
    senderName: {
      type: String,
      required: true,
      trim: true,
    },
    postScript: {
      type: String,
      trim: true,
      default: '',
    },
    waxSealDesign: {
      type: String,
      default: 'iti',
    },
    waxSealColor: {
      type: String,
      default: 'crimson',
    },
    envelopeColor: {
      type: String,
      default: '#7F1D1D',
    },
    language: {
      type: String,
      enum: ['bn', 'en'],
      default: 'bn',
    },
    views: {
      type: Number,
      default: 0,
    },
    firstOpenedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation of model across Next.js hot reloads
export const LetterModel: Model<ILetterDocument> =
  mongoose.models.Letter || mongoose.model<ILetterDocument>('Letter', LetterSchema);

export default LetterModel;
