import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { BiometricStatus } from '@/lib/mongodb/models';
import { predictFatigue, analyzeSleepQuality, analyzeRecoveryStatus } from '@/lib/ai/tensorflow';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { 
      athleteId, 
      biometricData,
      deviceType = 'unknown'
    } = body;

    if (!athleteId || !biometricData) {
      return NextResponse.json(
        { error: 'Athlete ID and biometric data are required' },
        { status: 400 }
      );
    }

    // Get previous biometric data for time series analysis
    const previousData = await BiometricStatus.find({ athleteId })
      .sort({ timestamp: -1 })
      .limit(10)
      .lean();

    // Create time series with current data and historical data
    const timeSeries = [biometricData, ...previousData];

    // Get the baseline data (average of last 30 days when athlete was well-rested)
    const baselineData = await BiometricStatus.findOne({
      athleteId,
      'predictions.fatigueRisk': 'low',
      timestamp: {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }
    }).lean();

    // Predict fatigue using TensorFlow LSTM model
    const fatiguePrediction = predictFatigue(timeSeries, baselineData);

    // Additional analyses
    const sleepAnalysis = analyzeSleepQuality(biometricData.sleep);
    const recoveryAnalysis = analyzeRecoveryStatus(
      biometricData.heartRate,
      baselineData?.heartRate
    );

    // Save predictions to database
    const biometricStatus = new BiometricStatus({
      athleteId,
      timestamp: new Date(),
      deviceType,
      ...biometricData,
      predictions: {
        ...fatiguePrediction
      },
      modelVersion: 'lstm-v1.0',
      dataPrivacyLevel: 'restricted'
    });

    await biometricStatus.save();

    return NextResponse.json({
      success: true,
      biometricStatus: {
        id: biometricStatus._id,
        athleteId: biometricStatus.athleteId,
        timestamp: biometricStatus.timestamp,
        predictions: biometricStatus.predictions
      },
      analyses: {
        sleep: sleepAnalysis,
        recovery: recoveryAnalysis
      }
    });
  } catch (error) {
    console.error('Biometric fatigue prediction error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze biometric data' },
      { status: 500 }
    );
  }
} 