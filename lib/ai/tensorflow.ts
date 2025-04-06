import * as tf from '@tensorflow/tfjs-node';

// Load pre-trained models
let fatigueModel: tf.LayersModel | null = null;
let sleepModel: tf.LayersModel | null = null;
let recoveryModel: tf.LayersModel | null = null;

// Initialize models
async function initializeModels() {
  try {
    // Load LSTM model for fatigue prediction
    fatigueModel = await tf.loadLayersModel('file://models/fatigue_lstm/model.json');
    
    // Load models for sleep and recovery analysis
    sleepModel = await tf.loadLayersModel('file://models/sleep_analysis/model.json');
    recoveryModel = await tf.loadLayersModel('file://models/recovery_analysis/model.json');
    
    return true;
  } catch (error) {
    console.error('Error loading TensorFlow models:', error);
    return false;
  }
}

// Call initialization
initializeModels().then(success => {
  if (success) {
    console.log('TensorFlow models loaded successfully');
  } else {
    console.error('Failed to load TensorFlow models');
  }
});

// Preprocess biometric data for model input
function preprocessBiometricData(data: IBiometricData): tf.Tensor {
  const features = [
    data.heartRate.current || 0,
    data.heartRate.resting || 0,
    data.heartRate.variability || 0,
    data.heartRate.recoveryRate || 0,
    data.sleep.durationHours || 0,
    data.sleep.deepSleepPercentage || 0,
    data.sleep.remSleepPercentage || 0,
    data.sleep.sleepQualityScore || 0,
    data.stressLevel || 0,
    data.bloodOxygen || 0,
    data.respiratoryRate || 0
  ];
  
  return tf.tensor2d([features], [1, features.length]);
}

interface IBiometricData {
  heartRate: {
    current?: number;
    resting?: number;
    variability?: number;
    recoveryRate?: number;
  };
  sleep: {
    durationHours?: number;
    deepSleepPercentage?: number;
    remSleepPercentage?: number;
    lightSleepPercentage?: number;
    wakePeriods?: number;
    sleepQualityScore?: number;
  };
  activity: {
    stepsCount?: number;
    activeMinutes?: number;
    caloriesBurned?: number;
    distanceCovered?: number;
    floorsClimbed?: number;
  };
  stressLevel?: number;
  bodyTemperature?: number;
  bloodOxygen?: number;
  hydrationLevel?: number;
  respiratoryRate?: number;
}

interface IFatiguePrediction {
  fatigueScore: number; // 0-100
  fatigueRisk: string; // low, moderate, high
  recoveryNeeded: boolean;
  estimatedRecoveryTime?: number; // hours
  alertGenerated: boolean;
  confidenceScore: number; // 0-1
}

/**
 * Predicts fatigue level from biometric data using TensorFlow LSTM model
 */
export async function predictFatigue(
  biometricDataTimeSeries: IBiometricData[],
  athleteBaselineData?: IBiometricData
): Promise<IFatiguePrediction> {
  try {
    if (!fatigueModel) {
      throw new Error('Fatigue prediction model not loaded');
    }
    
    // Preprocess time series data
    const timeSeriesFeatures = biometricDataTimeSeries.map(data => 
      preprocessBiometricData(data)
    );
    
    // Stack tensors for LSTM input
    const modelInput = tf.stack(timeSeriesFeatures);
    
    // Run inference
    const prediction = await fatigueModel.predict(modelInput) as tf.Tensor;
    const [fatigueScore, recoveryNeededProb, confidenceScore] = await prediction.array() as number[];
    
    // Clean up tensors
    tf.dispose([modelInput, prediction, ...timeSeriesFeatures]);
    
    // Process model outputs
    const normalizedFatigueScore = Math.round(fatigueScore * 100);
    const risk = getFatigueRisk(normalizedFatigueScore);
    const needsRecovery = recoveryNeededProb > 0.5;
    const recoveryTime = calculateRecoveryTime(normalizedFatigueScore);
    const shouldAlert = normalizedFatigueScore > 75;
    
    return {
      fatigueScore: normalizedFatigueScore,
      fatigueRisk: risk,
      recoveryNeeded: needsRecovery,
      estimatedRecoveryTime: recoveryTime,
      alertGenerated: shouldAlert,
      confidenceScore
    };
  } catch (error) {
    console.error('Error predicting fatigue:', error);
    
    // Default safe response in case of error
    return {
      fatigueScore: 50,
      fatigueRisk: 'moderate',
      recoveryNeeded: true,
      alertGenerated: false,
      confidenceScore: 0.79,
    };
  }
}

// Helper functions
function getFatigueRisk(score: number): string {
  if (score > 70) return 'high';
  if (score > 40) return 'moderate';
  return 'low';
}

function calculateRecoveryTime(score: number): number | undefined {
  if (score > 60) {
    return Math.round((score - 40) / 5);
  }
  return undefined;
}

/**
 * Analyzes sleep patterns for fatigue contribution
 */
export function analyzeSleepQuality(
  sleepData: IBiometricData['sleep']
): {
  qualityScore: number;
  feedbackItems: string[];
} {
  const feedbackItems: string[] = [];
  let qualityScore = 50; // Base score
  
  // Duration impact
  if (sleepData.durationHours) {
    if (sleepData.durationHours < 7) {
      qualityScore -= (7 - sleepData.durationHours) * 10;
      feedbackItems.push(`Sleep duration of ${sleepData.durationHours} hours is below recommended 7-9 hours`);
    } else if (sleepData.durationHours > 9) {
      qualityScore -= (sleepData.durationHours - 9) * 5; // Excessive sleep can also reduce quality
      feedbackItems.push(`Sleep duration of ${sleepData.durationHours} hours is above recommended range`);
    } else {
      qualityScore += 15;
      feedbackItems.push('Optimal sleep duration achieved');
    }
  }
  
  // Deep sleep impact
  if (sleepData.deepSleepPercentage) {
    if (sleepData.deepSleepPercentage < 15) {
      qualityScore -= (15 - sleepData.deepSleepPercentage) * 2;
      feedbackItems.push('Deep sleep percentage is below optimal range');
    } else if (sleepData.deepSleepPercentage > 25) {
      qualityScore += 15;
      feedbackItems.push('Excellent deep sleep percentage');
    } else {
      qualityScore += 10;
    }
  }
  
  // REM sleep impact
  if (sleepData.remSleepPercentage) {
    if (sleepData.remSleepPercentage < 20) {
      qualityScore -= (20 - sleepData.remSleepPercentage) * 1.5;
      feedbackItems.push('REM sleep percentage is below optimal range');
    } else if (sleepData.remSleepPercentage > 30) {
      qualityScore += 10;
      feedbackItems.push('Good REM sleep achieved');
    } else {
      qualityScore += 7;
    }
  }
  
  // Wake periods impact
  if (sleepData.wakePeriods !== undefined) {
    if (sleepData.wakePeriods > 3) {
      qualityScore -= (sleepData.wakePeriods - 3) * 5;
      feedbackItems.push('Multiple wake periods detected, affecting sleep continuity');
    } else {
      qualityScore += 8;
      feedbackItems.push('Minimal sleep disruptions detected');
    }
  }
  
  // Ensure score is within 0-100 range
  qualityScore = Math.max(0, Math.min(100, qualityScore));
  
  return {
    qualityScore,
    feedbackItems,
  };
}

/**
 * Analyzes heart rate data for recovery status
 */
export function analyzeRecoveryStatus(
  heartRateData: IBiometricData['heartRate'],
  baselineData?: IBiometricData['heartRate']
): {
  recoveryScore: number;
  isRecovered: boolean;
  feedbackItems: string[];
} {
  const feedbackItems: string[] = [];
  let recoveryScore = 50; // Base score
  
  // If we have baseline data, compare current to resting
  if (heartRateData.current && heartRateData.resting) {
    const elevation = ((heartRateData.current - heartRateData.resting) / heartRateData.resting) * 100;
    
    if (elevation > 15) {
      recoveryScore -= elevation;
      feedbackItems.push(`Heart rate is ${elevation.toFixed(1)}% above resting level`);
    } else {
      recoveryScore += 15;
      feedbackItems.push('Heart rate is close to resting level, indicating good recovery');
    }
  }
  
  // HRV impact
  if (heartRateData.variability && baselineData?.variability) {
    const hrvPercentage = (heartRateData.variability / baselineData.variability) * 100;
    
    if (hrvPercentage < 80) {
      recoveryScore -= (80 - hrvPercentage) * 0.5;
      feedbackItems.push('Heart rate variability is below your baseline, indicating incomplete recovery');
    } else {
      recoveryScore += 20;
      feedbackItems.push('Heart rate variability indicates good recovery status');
    }
  }
  
  // Recovery rate impact
  if (heartRateData.recoveryRate) {
    if (heartRateData.recoveryRate < 12) {
      recoveryScore -= (12 - heartRateData.recoveryRate) * 3;
      feedbackItems.push('Slow heart rate recovery detected');
    } else {
      recoveryScore += 15;
      feedbackItems.push('Good heart rate recovery rate');
    }
  }
  
  // Ensure score is within 0-100 range
  recoveryScore = Math.max(0, Math.min(100, recoveryScore));
  
  return {
    recoveryScore,
    isRecovered: recoveryScore > 65,
    feedbackItems,
  };
}
