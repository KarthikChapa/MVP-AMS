import mongoose from 'mongoose';
import { CareerFormData } from '@/components/career-predictor/career-form';

const careerPredictionSchema = new mongoose.Schema({
  athleteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Athlete',
    required: true
  },
  formData: {
    currentSport: String,
    yearsExperience: Number,
    age: Number,
    achievements: [String],
    skills: {
      technical: Number,
      tactical: Number,
      physical: Number,
      mental: Number,
    },
    education: {
      level: String,
      sportsRelated: Boolean,
    },
    preferences: {
      coaching: Boolean,
      management: Boolean,
      analytics: Boolean,
      media: Boolean,
      business: Boolean,
    },
    injuryHistory: {
      hasMajorInjury: Boolean,
      recoveryStatus: Number,
    },
    financialGoals: {
      expectedIncome: String,
      investmentCapacity: Boolean,
    },
  },
  advice: String,
  careerPaths: [{
    title: String,
    skills: String,
    challenges: String,
    timeline: String,
    financials: String,
    likelihood: Number,
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
});

// Add indexes
careerPredictionSchema.index({ athleteId: 1, createdAt: -1 });

// Add virtual for age at prediction
careerPredictionSchema.virtual('ageAtPrediction').get(function() {
  return this.formData?.age || null;
});

// Add method to check if prediction is recent (less than 3 months old)
careerPredictionSchema.methods.isRecent = function(): boolean {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  return this.createdAt > threeMonthsAgo;
};

// Add method to get summarized advice
careerPredictionSchema.methods.getSummary = function(): string {
  if (!this.advice) return '';
  const sentences = this.advice.split('.');
  return sentences.slice(0, 3).join('.') + '.';
};

// Add statics to find recent predictions
careerPredictionSchema.statics.findRecentByAthleteId = async function(
  athleteId: string
) {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
  return this.find({
    athleteId,
    createdAt: { $gte: threeMonthsAgo }
  }).sort({ createdAt: -1 });
};

const CareerPrediction = mongoose.models.CareerPrediction || 
  mongoose.model('CareerPrediction', careerPredictionSchema);

export default CareerPrediction;
