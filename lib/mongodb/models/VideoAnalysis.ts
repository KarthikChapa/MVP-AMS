import mongoose, { Schema, Document } from 'mongoose';

// Interface for joint angles tracked
interface IJointAngles {
  knee?: {
    left?: number;
    right?: number;
  };
  hip?: {
    left?: number;
    right?: number;
  };
  elbow?: {
    left?: number;
    right?: number;
  };
  shoulder?: {
    left?: number;
    right?: number;
  };
  ankle?: {
    left?: number;
    right?: number;
  };
  wrist?: {
    left?: number;
    right?: number;
  };
  [key: string]: any; // Allow for custom joints
}

// Interface for pose data from MediaPipe
interface IPoseKeypoint {
  x: number; // Normalized x coordinate
  y: number; // Normalized y coordinate
  z?: number; // Normalized z coordinate (depth)
  visibility?: number; // Confidence score
  name?: string; // Name of the keypoint
}

// Interface for a single frame analysis
interface IFrameAnalysis {
  timestamp: number; // Milliseconds from start of video
  keypoints: IPoseKeypoint[]; // 33 points from MediaPipe
  jointAngles: IJointAngles;
  postureFeedback?: string;
  techniqueFeedback?: string;
  errorDetected?: boolean;
}

// Interface for Video Analysis document
export interface IVideoAnalysis extends Document {
  athleteId: string;
  videoId: string;
  videoUrl: string;
  exerciseType: string;
  sport: string;
  createdAt: Date;
  duration: number; // Video duration in seconds
  analysisComplete: boolean;
  frames: IFrameAnalysis[];
  summary: {
    overallScore?: number; // 0-100
    strengths?: string[];
    improvementAreas?: string[];
    recommendations?: string[];
    coachFeedback?: string;
  };
  modelVersion: string;
  processingMetrics: {
    processingTimeMs: number;
    framesProcessed: number;
    averageFps: number;
    deviceType: string;
  };
}

const VideoAnalysisSchema = new Schema<IVideoAnalysis>({
  athleteId: { type: String, required: true, ref: 'Athlete' },
  videoId: { type: String, required: true, unique: true },
  videoUrl: { type: String, required: true },
  exerciseType: { type: String, required: true },
  sport: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  duration: { type: Number },
  analysisComplete: { type: Boolean, default: false },
  frames: [
    {
      timestamp: { type: Number, required: true },
      keypoints: [
        {
          x: { type: Number, required: true },
          y: { type: Number, required: true },
          z: { type: Number },
          visibility: { type: Number },
          name: { type: String },
        },
      ],
      jointAngles: {
        knee: {
          left: { type: Number },
          right: { type: Number },
        },
        hip: {
          left: { type: Number },
          right: { type: Number },
        },
        elbow: {
          left: { type: Number },
          right: { type: Number },
        },
        shoulder: {
          left: { type: Number },
          right: { type: Number },
        },
        ankle: {
          left: { type: Number },
          right: { type: Number },
        },
        wrist: {
          left: { type: Number },
          right: { type: Number },
        },
      },
      postureFeedback: { type: String },
      techniqueFeedback: { type: String },
      errorDetected: { type: Boolean },
    },
  ],
  summary: {
    overallScore: { type: Number },
    strengths: [{ type: String }],
    improvementAreas: [{ type: String }],
    recommendations: [{ type: String }],
    coachFeedback: { type: String },
  },
  modelVersion: { type: String, required: true },
  processingMetrics: {
    processingTimeMs: { type: Number },
    framesProcessed: { type: Number },
    averageFps: { type: Number },
    deviceType: { type: String },
  },
});

// Create indices for faster queries
VideoAnalysisSchema.index({ athleteId: 1, createdAt: -1 });
VideoAnalysisSchema.index({ videoId: 1 }, { unique: true });

export default mongoose.models.VideoAnalysis ||
  mongoose.model<IVideoAnalysis>('VideoAnalysis', VideoAnalysisSchema); 