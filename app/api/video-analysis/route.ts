import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { VideoAnalysis } from '@/lib/mongodb/models';
import { generateAnalysisSummary } from '@/lib/ai/mediapipe';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { 
      athleteId, 
      frames, 
      videoUrl, 
      exerciseType, 
      sport, 
      duration,
      processingMetrics
    } = body;
    
    if (!athleteId || !frames || !videoUrl || !exerciseType || !sport) {
      return NextResponse.json(
        { error: 'Required fields missing', required: ['athleteId', 'frames', 'videoUrl', 'exerciseType', 'sport'] },
        { status: 400 }
      );
    }
    
    // Generate summary from frames
    const analysisSummary = generateAnalysisSummary(frames, exerciseType, sport);
    
    // Create a video ID
    const videoId = uuidv4();
    
    // Save video analysis to database
    const videoAnalysis = new VideoAnalysis({
      athleteId,
      videoId,
      videoUrl,
      exerciseType,
      sport,
      duration: duration || 0,
      analysisComplete: true,
      frames,
      summary: {
        overallScore: analysisSummary.overallScore,
        strengths: analysisSummary.strengths,
        improvementAreas: analysisSummary.improvementAreas,
        recommendations: analysisSummary.recommendations,
      },
      modelVersion: 'mediapipe-pose-1.0',
      processingMetrics: processingMetrics || {
        processingTimeMs: 0,
        framesProcessed: frames.length,
        averageFps: frames.length > 0 && duration ? frames.length / duration : 0,
        deviceType: 'server'
      }
    });
    
    await videoAnalysis.save();
    
    return NextResponse.json({
      success: true,
      videoAnalysis: {
        id: videoAnalysis._id,
        videoId: videoAnalysis.videoId,
        overallScore: analysisSummary.overallScore,
        strengths: analysisSummary.strengths,
        improvementAreas: analysisSummary.improvementAreas,
        recommendations: analysisSummary.recommendations,
      }
    });
  } catch (error) {
    console.error('Video analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze video' },
      { status: 500 }
    );
  }
}

// Endpoint to get analysis for a specific video
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const searchParams = request.nextUrl.searchParams;
    const videoId = searchParams.get('videoId');
    const athleteId = searchParams.get('athleteId');
    
    if (!videoId && !athleteId) {
      return NextResponse.json(
        { error: 'Either videoId or athleteId is required' },
        { status: 400 }
      );
    }
    
    let query = {};
    
    if (videoId) {
      query = { videoId };
    } else {
      query = { athleteId };
    }
    
    let videoAnalyses;
    
    if (videoId) {
      // Get a specific video analysis
      videoAnalyses = await VideoAnalysis.findOne(query)
        .select('videoId athleteId videoUrl exerciseType sport duration summary createdAt')
        .lean();
        
      if (!videoAnalyses) {
        return NextResponse.json(
          { error: 'Video analysis not found' },
          { status: 404 }
        );
      }
    } else {
      // Get all video analyses for an athlete (paginated)
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');
      const skip = (page - 1) * limit;
      
      videoAnalyses = await VideoAnalysis.find(query)
        .select('videoId athleteId videoUrl exerciseType sport duration summary createdAt')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
        
      const total = await VideoAnalysis.countDocuments(query);
      
      return NextResponse.json({
        success: true,
        videoAnalyses,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      });
    }
    
    return NextResponse.json({
      success: true,
      videoAnalysis: videoAnalyses
    });
  } catch (error) {
    console.error('Get video analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve video analysis' },
      { status: 500 }
    );
  }
} 