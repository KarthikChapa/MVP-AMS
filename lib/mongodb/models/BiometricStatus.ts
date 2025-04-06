import mongoose, { Schema, Document } from 'mongoose';

// Interface for BiometricStatus document
export interface IBiometricStatus extends Document {
  athleteId: string;
  timestamp: Date;
  wearableDeviceId?: string;
  deviceType?: string; // smartwatch, fitness band, etc.
  heartRate: {
    current?: number; // beats per minute
    resting?: number;
    variability?: number; // ms
    recoveryRate?: number; // beats per minute per minute
  };
  sleep: {
    durationHours?: number;
    deepSleepPercentage?: number;
    remSleepPercentage?: number;
    lightSleepPercentage?: number;
    wakePeriods?: number;
    sleepQualityScore?: number; // 0-100
  };
  activity: {
    stepsCount?: number;
    activeMinutes?: number;
    caloriesBurned?: number;
    distanceCovered?: number; // km
    floorsClimbed?: number;
  };
  stressLevel?: number; // 0-100
  bodyTemperature?: number; // Celsius
  bloodOxygen?: number; // percentage
  hydrationLevel?: number; // percentage
  respiratoryRate?: number; // breaths per minute
  predictions: {
    fatigueScore: number; // 0-100
    fatigueRisk: string; // low, moderate, high
    recoveryNeeded: boolean;
    estimatedRecoveryTime?: number; // hours
    alertGenerated: boolean;
    confidenceScore: number; // 0-1
  };
  modelVersion: string;
  rawDataRef?: string; // Reference to raw data storage
  dataPrivacyLevel: string; // public, restricted, private
}

const BiometricStatusSchema = new Schema<IBiometricStatus>(
  {
    athleteId: { type: String, required: true, ref: 'Athlete' },
    timestamp: { type: Date, default: Date.now },
    wearableDeviceId: { type: String },
    deviceType: { type: String },
    heartRate: {
      current: { type: Number },
      resting: { type: Number },
      variability: { type: Number },
      recoveryRate: { type: Number },
    },
    sleep: {
      durationHours: { type: Number },
      deepSleepPercentage: { type: Number },
      remSleepPercentage: { type: Number },
      lightSleepPercentage: { type: Number },
      wakePeriods: { type: Number },
      sleepQualityScore: { type: Number },
    },
    activity: {
      stepsCount: { type: Number },
      activeMinutes: { type: Number },
      caloriesBurned: { type: Number },
      distanceCovered: { type: Number },
      floorsClimbed: { type: Number },
    },
    stressLevel: { type: Number },
    bodyTemperature: { type: Number },
    bloodOxygen: { type: Number },
    hydrationLevel: { type: Number },
    respiratoryRate: { type: Number },
    predictions: {
      fatigueScore: { type: Number, required: true },
      fatigueRisk: { type: String, required: true },
      recoveryNeeded: { type: Boolean, required: true },
      estimatedRecoveryTime: { type: Number },
      alertGenerated: { type: Boolean, default: false },
      confidenceScore: { type: Number, required: true },
    },
    modelVersion: { type: String, required: true },
    rawDataRef: { type: String },
    dataPrivacyLevel: { type: String, default: 'restricted' },
  },
  { timestamps: true }
);

// Create indices for faster queries
BiometricStatusSchema.index({ athleteId: 1, timestamp: -1 });
BiometricStatusSchema.index(
  { athleteId: 1, 'predictions.fatigueRisk': 1 },
  { 
    partialFilterExpression: { 'predictions.fatigueRisk': 'high' } 
  }
);

export default mongoose.models.BiometricStatus ||
  mongoose.model<IBiometricStatus>('BiometricStatus', BiometricStatusSchema); 