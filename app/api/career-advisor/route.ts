import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dbConnect from '@/lib/mongodb';
import { Athlete, CareerPrediction } from '@/lib/mongodb/models';
import { CareerFormData } from '@/components/career-predictor/career-form';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_STUDIO_KEY!);

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { athleteId, formData } = body as { athleteId: string; formData: CareerFormData };

    if (!athleteId || !formData) {
      return NextResponse.json(
        { error: 'Athlete ID and form data are required' },
        { status: 400 }
      );
    }

    // Get athlete data
    const athlete = await Athlete.findById(athleteId);
    if (!athlete) {
      return NextResponse.json(
        { error: 'Athlete not found' },
        { status: 404 }
      );
    }

    // Prepare context for AI analysis
    const context = `
      Athlete Profile:
      - Current Sport: ${formData.currentSport}
      - Years of Experience: ${formData.yearsExperience}
      - Age: ${formData.age}

      Skills Assessment:
      - Technical: ${formData.skills.technical}/100
      - Tactical: ${formData.skills.tactical}/100
      - Physical: ${formData.skills.physical}/100
      - Mental: ${formData.skills.mental}/100

      Career Preferences:
      ${Object.entries(formData.preferences)
        .filter(([_, value]) => value)
        .map(([key]) => `- ${key.charAt(0).toUpperCase() + key.slice(1)}`)
        .join('\n')}

      Education:
      - Level: ${formData.education.level}
      - Sports Related: ${formData.education.sportsRelated ? 'Yes' : 'No'}

      Injury History:
      - Major Injury: ${formData.injuryHistory.hasMajorInjury ? 'Yes' : 'No'}
      - Recovery Status: ${formData.injuryHistory.recoveryStatus}%

      Financial Goals:
      - Expected Income Level: ${formData.financialGoals.expectedIncome}
      - Investment Capacity: ${formData.financialGoals.investmentCapacity ? 'Yes' : 'No'}
    `;

    // Get career advice from Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `
      As a career advisor for athletes, analyze the following profile and provide:
      1. Top 3 recommended career paths with likelihood of success
      2. Key skills to develop for each path
      3. Potential challenges and mitigation strategies
      4. Timeline for transition
      5. Financial projections for each path
      
      Athlete Profile:
      ${context}
      
      Provide structured, actionable advice that considers all aspects of the athlete's profile.
      Focus on realistic paths that align with their skills, preferences, and market opportunities.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const advice = response.text();

    // Save prediction to database
    const careerPrediction = new CareerPrediction({
      athleteId,
      formData,
      advice,
      createdAt: new Date(),
    });

    await careerPrediction.save();

    // Parse AI response for structured data
    const careerPaths = advice.split('\n\n').reduce((acc, section) => {
      if (section.includes('career path')) {
        const path = {
          title: section.split('\n')[0],
          skills: section.match(/Skills:(.*?)(?=\n|$)/s)?.[1] || '',
          challenges: section.match(/Challenges:(.*?)(?=\n|$)/s)?.[1] || '',
          timeline: section.match(/Timeline:(.*?)(?=\n|$)/s)?.[1] || '',
          financials: section.match(/Financial:(.*?)(?=\n|$)/s)?.[1] || '',
        };
        acc.push(path);
      }
      return acc;
    }, [] as any[]);

    return NextResponse.json({
      success: true,
      prediction: {
        careerPaths,
        fullAdvice: advice,
        predictionId: careerPrediction._id,
      },
    });
  } catch (error) {
    console.error('Career prediction error:', error);
    return NextResponse.json(
      { error: 'Failed to generate career advice' },
      { status: 500 }
    );
  }
}
