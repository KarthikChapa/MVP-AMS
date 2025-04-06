import mongoose, { Schema, Document } from 'mongoose';

// Interface for the Performance Data document
export interface IPerformanceData extends Document {
  athleteId: string;
  date: Date;
  metrics: {
    speed?: number; // m/s
    endurance?: number; // score out of 100
    strength?: number; // score out of 100
    agility?: number; // score out of 100
    flexibility?: number; // score out of 100
    technique?: number; // score out of 100
    recovery?: number; // hours
    sleep?: number; // hours
    nutrition?: number; // score out of 100
    mentalState?: number; // score out of 100
    painLevel?: number; // scale 0-10
  };
  biometrics: {
    heartRate?: {
      resting?: number; // bpm
      training?: number; // bpm
      recovery?: number; // bpm
    };
    bloodPressure?: {
      systolic?: number; // mmHg
      diastolic?: number; // mmHg
    };
    oxygenSaturation?: number; // percentage
    hydrationLevel?: number; // percentage
    bodyTemperature?: number; // celsius
  };
  training: {
    duration?: number; // minutes
    intensity?: number; // scale 1-10
    type?: string; // aerobic, strength, skill, etc.
    exercises?: string[]; // list of exercises performed
    feedback?: string;
  };
  injuries: {
    current?: {
      area?: string;
      severity?: number; // scale 1-10
      startDate?: Date;
      expectedRecovery?: Date;
      treatment?: string;
    }[];
    history?: {
      area: string;
      severity: number; // scale 1-10
      startDate: Date;
      endDate: Date;
      treatment: string;
    }[];
  };
  notes?: string;
  source: string; // how the data was collected (manual, wearable, test, etc.)
  createdAt: Date;
  updatedAt: Date;
}

const PerformanceDataSchema = new Schema<IPerformanceData>(
  {
    athleteId: { type: String, required: true, ref: 'Athlete' },
    date: { type: Date, required: true },
    metrics: {
      speed: { type: Number },
      endurance: { type: Number },
      strength: { type: Number },
      agility: { type: Number },
      flexibility: { type: Number },
      technique: { type: Number },
      recovery: { type: Number },
      sleep: { type: Number },
      nutrition: { type: Number },
      mentalState: { type: Number },
      painLevel: { type: Number },
    },
    biometrics: {
      heartRate: {
        resting: { type: Number },
        training: { type: Number },
        recovery: { type: Number },
      },
      bloodPressure: {
        systolic: { type: Number },
        diastolic: { type: Number },
      },
      oxygenSaturation: { type: Number },
      hydrationLevel: { type: Number },
      bodyTemperature: { type: Number },
    },
    training: {
      duration: { type: Number },
      intensity: { type: Number },
      type: { type: String },
      exercises: [{ type: String }],
      feedback: { type: String },
    },
    injuries: {
      current: [
        {
          area: { type: String },
          severity: { type: Number },
          startDate: { type: Date },
          expectedRecovery: { type: Date },
          treatment: { type: String },
        },
      ],
      history: [
        {
          area: { type: String },
          severity: { type: Number },
          startDate: { type: Date },
          endDate: { type: Date },
          treatment: { type: String },
        },
      ],
    },
    notes: { type: String },
    source: { type: String, required: true },
  },
  { timestamps: true }
);

// Create index for faster queries
PerformanceDataSchema.index({ athleteId: 1, date: -1 });

export default mongoose.models.PerformanceData ||
  mongoose.model<IPerformanceData>('PerformanceData', PerformanceDataSchema); 