import mongoose, { Schema, Document } from 'mongoose';

// Interface for the Athlete document
export interface IAthlete extends Document {
  userId: string;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: string;
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  sports: {
    primary: string;
    secondary?: string[];
  };
  physicalMetrics: {
    height?: number; // in cm
    weight?: number; // in kg
    bodyFat?: number; // percentage
    wingspan?: number; // in cm
    dominantHand?: string;
    dominantFoot?: string;
  };
  experienceLevel: string; // beginner, intermediate, advanced, professional
  teams?: string[];
  profilePhoto?: string;
  aadhaarMasked?: string; // Last 4 digits only for DPDP Act compliance
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

const AthleteSchema = new Schema<IAthlete>(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String },
    location: {
      city: { type: String },
      state: { type: String },
      country: { type: String },
    },
    sports: {
      primary: { type: String, required: true },
      secondary: [{ type: String }],
    },
    physicalMetrics: {
      height: { type: Number },
      weight: { type: Number },
      bodyFat: { type: Number },
      wingspan: { type: Number },
      dominantHand: { type: String },
      dominantFoot: { type: String },
    },
    experienceLevel: { type: String, required: true },
    teams: [{ type: String }],
    profilePhoto: { type: String },
    aadhaarMasked: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Only export the model if it doesn't already exist to prevent overwrite errors in Next.js hot reloading
export default mongoose.models.Athlete || mongoose.model<IAthlete>('Athlete', AthleteSchema); 