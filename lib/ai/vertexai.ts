// Vertex AI integration for performance prediction

import { PredictionServiceClient, PredictResponse, PredictionModelResponse } from '@google-cloud/aiplatform';
import { IPerformanceData } from '../mongodb/models/PerformanceData';
import { auth } from 'google-auth-library';

// Configure the Vertex AI client
const PROJECT_ID = 'athlete-management-system';
const LOCATION = 'asia-south1';

// Model endpoints
const PERFORMANCE_MODEL = 'athlete-performance-predictor';
const INJURY_MODEL = 'athlete-injury-risk-analyzer';

// Initialize Prediction Service client
const predictionClient = new PredictionServiceClient({
  apiEndpoint: `${LOCATION}-aiplatform.googleapis.com`,
  credentials: {
    client_email: process.env.VERTEX_AI_CLIENT_EMAIL!,
    private_key: process.env.VERTEX_AI_PRIVATE_KEY!
  }
});

// Setup authentication
const authClient = auth.fromJSON({
  client_email: process.env.VERTEX_AI_CLIENT_EMAIL!,
  private_key: process.env.VERTEX_AI_PRIVATE_KEY!,
  project_id: PROJECT_ID,
});

// Helper function to prepare features for performance prediction
function preparePerformanceFeatures(data: IPerformanceData[]) {
  const recentData = data.slice(0, 10);
  return {
    performance_history: recentData.map(d => ({
      endurance: d.metrics?.endurance || 0,
      recovery: d.metrics?.recovery || 0,
      painLevel: d.metrics?.painLevel || 0,
      injuries: d.injuries?.current?.length || 0
    }))
  };
}

// Helper function to prepare features for injury risk prediction
function prepareInjuryRiskFeatures(data: IPerformanceData[]) {
  const recentData = data.slice(0, 5);
  return {
    injury_history: recentData.map(d => ({
      painLevel: d.metrics?.painLevel || 0,
      recovery: d.metrics?.recovery || 0,
      sleep: d.metrics?.sleep || 0,
      currentInjuries: d.injuries?.current?.length || 0
    }))
  };
}

/**
 * Endpoint for performance prediction using Vertex AI
 */
export async function predictPerformanceDecline(
  athleteData: IPerformanceData[]
): Promise<{
  riskScore: number;
  confidenceScore: number;
  declineAreas: string[];
  timeFrame: string;
  recommendations: string[];
}> {
  try {
    // Prepare features for model input
    const features = preparePerformanceFeatures(athleteData);

    const token = await authClient.getAccessToken();
    
    // Make prediction request
    const [response] = await predictionClient.predict({
      endpoint: `projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/${PERFORMANCE_MODEL}`,
      instances: [features],
      parameters: {
        confidenceThreshold: 0.8,
        maxPredictions: 1
      }
    });

    const prediction = response.predictions[0];

// Extract prediction data
    const predictionData = prediction as unknown as PredictionModelResponse;
    const predictions = predictionData.predictions[0] || {};
    
    return {
      riskScore: parseFloat(predictions.risk_score?.toString() || "0"),
      confidenceScore: Number(predictions.confidence_score || 0),
      declineAreas: predictions.decline_areas || [],
      timeFrame: predictions.time_frame || "unknown",
      recommendations: predictions.recommendations || []
    };

  } catch (error) {
    console.error('Error predicting performance:', error);
    throw new Error('Failed to generate performance prediction');
  }
}

/**
 * Predicts injury risk using Vertex AI
 */
export async function predictInjuryRisk(
  athleteData: IPerformanceData[]
): Promise<{
  injuryRiskScore: number;
  primaryRiskAreas: string[];
  contributingFactors: string[];
  preventionStrategies: string[];
  timeUntilFullRecovery?: number;
}> {
  try {
    // Prepare features for model input
    const features = prepareInjuryRiskFeatures(athleteData);

    const token = await authClient.getAccessToken();
    
    // Make prediction request
    const [response] = await predictionClient.predict({
      endpoint: `projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/${INJURY_MODEL}`,
      instances: [features],
      parameters: {
        confidenceThreshold: 0.85,
        maxPredictions: 1
      }
    });

    const prediction = response.predictions[0];

// Extract prediction data
    const predictionData = prediction as unknown as PredictionModelResponse;
    const predictions = predictionData.predictions[0] || {};
    
    return {
      injuryRiskScore: parseFloat(predictions.injury_risk_score?.toString() || "0"),
      primaryRiskAreas: predictions.risk_areas || [],
      contributingFactors: predictions.contributing_factors || [],
      preventionStrategies: predictions.suggested_strategies || [],
      ...(predictions.recovery_time && { 
        timeUntilFullRecovery: parseInt(predictions.recovery_time.toString()) 
      })
    };

  } catch (error) {
    console.error('Error predicting injury risk:', error);
    throw new Error('Failed to generate injury risk prediction');
  }
}
