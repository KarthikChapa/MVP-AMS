import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { PerformanceData } from '@/lib/mongodb/models';
import { predictPerformanceDecline, predictInjuryRisk } from '@/lib/ai/vertexai';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { athleteId, includePreviousDays = 30 } = body;
    
    if (!athleteId) {
      return NextResponse.json(
        { error: 'Athlete ID is required' },
        { status: 400 }
      );
    }
    
    // Get date range for query (last N days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - includePreviousDays);
    
    // Fetch athlete performance data
    const performanceData = await PerformanceData.find({
      athleteId,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: -1 }).lean();
    
    if (!performanceData.length) {
      return NextResponse.json(
        { error: 'No performance data found for this athlete' },
        { status: 404 }
      );
    }
    
    // Get predictions
    const performancePrediction = await predictPerformanceDecline(performanceData);
    const injuryRiskPrediction = await predictInjuryRisk(performanceData);
    
    return NextResponse.json({
      success: true,
      predictions: {
        performance: performancePrediction,
        injuryRisk: injuryRiskPrediction
      },
      dataPoints: performanceData.length,
      dateRange: {
        start: startDate,
        end: endDate
      }
    });
  } catch (error) {
    console.error('Performance prediction error:', error);
    return NextResponse.json(
      { error: 'Failed to generate performance prediction' },
      { status: 500 }
    );
  }
} 