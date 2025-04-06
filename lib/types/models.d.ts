import { Document } from 'mongoose';
import { CareerFormData } from '@/components/career-predictor/career-form';

export interface ICareerPath {
  title: string;
  skills: string;
  challenges: string;
  timeline: string;
  financials: string;
  likelihood: number;
}

export interface ICareerPrediction extends Document {
  athleteId: string;
  formData: CareerFormData;
  advice: string;
  careerPaths: ICareerPath[];
  createdAt: Date;
  ageAtPrediction: number | null;
  isRecent(): boolean;
  getSummary(): string;
}

export interface ICareerPredictionModel extends Model<ICareerPrediction> {
  findRecentByAthleteId(athleteId: string): Promise<ICareerPrediction[]>;
}

// Add other model interfaces as needed
