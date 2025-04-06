import { GoogleGenerativeAI } from '@google/generative-ai';
import { IAthlete } from '../mongodb/models/Athlete';
import { ICareerPrediction } from '../types/models';
import { CareerFormData } from '@/components/career-predictor/career-form';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_STUDIO_KEY!);

/**
 * Get career advice using Gemini AI
 */
export async function getCareerAdvice(athlete: IAthlete, formData: CareerFormData): Promise<{
  advice: string;
  careerPaths: Array<{
    title: string;
    skills: string;
    challenges: string;
    timeline: string;
    financials: string;
    likelihood: number;
  }>;
}> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    Analyze this athlete's profile and provide detailed career advice:

    Athlete Profile:
    - Sport: ${formData.currentSport}
    - Experience: ${formData.yearsExperience} years
    - Age: ${formData.age}
    - Location: ${athlete.location?.city || 'Unknown'}, ${athlete.location?.country || 'India'}

    Skills:
    - Technical: ${formData.skills.technical}/100
    - Tactical: ${formData.skills.tactical}/100
    - Physical: ${formData.skills.physical}/100
    - Mental: ${formData.skills.mental}/100

    Career Interests:
    ${Object.entries(formData.preferences)
      .filter(([_, value]) => value)
      .map(([key]) => `- ${key.charAt(0).toUpperCase() + key.slice(1)}`)
      .join('\n')}

    Education:
    - Level: ${formData.education.level}
    - Sports Related: ${formData.education.sportsRelated ? 'Yes' : 'No'}

    Health Status:
    - Major Injury History: ${formData.injuryHistory.hasMajorInjury ? 'Yes' : 'No'}
    - Recovery Status: ${formData.injuryHistory.recoveryStatus}%

    Financial Goals:
    - Expected Income Level: ${formData.financialGoals.expectedIncome}
    - Investment Capacity: ${formData.financialGoals.investmentCapacity ? 'Yes' : 'No'}

    Provide:
    1. 3-5 recommended career paths with likelihood of success (%)
    2. Required skills and development steps for each path
    3. Potential challenges and strategies to overcome them
    4. Realistic timeline for transition
    5. Financial projections and investment needs

    Format each career path recommendation as:
    CAREER: [title]
    LIKELIHOOD: [percentage]
    SKILLS: [required skills]
    CHALLENGES: [potential challenges]
    TIMELINE: [estimated timeline]
    FINANCIAL: [financial projections]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse career paths from the response
    const careerPaths = text.split('\n\n')
      .filter(section => section.startsWith('CAREER:'))
      .map(section => {
        const lines = section.split('\n');
        return {
          title: lines.find(l => l.startsWith('CAREER:'))?.replace('CAREER:', '').trim() || '',
          likelihood: parseInt(lines.find(l => l.startsWith('LIKELIHOOD:'))?.replace('LIKELIHOOD:', '').replace('%', '').trim() || '0'),
          skills: lines.find(l => l.startsWith('SKILLS:'))?.replace('SKILLS:', '').trim() || '',
          challenges: lines.find(l => l.startsWith('CHALLENGES:'))?.replace('CHALLENGES:', '').trim() || '',
          timeline: lines.find(l => l.startsWith('TIMELINE:'))?.replace('TIMELINE:', '').trim() || '',
          financials: lines.find(l => l.startsWith('FINANCIAL:'))?.replace('FINANCIAL:', '').trim() || '',
        };
      });

    return {
      advice: text,
      careerPaths,
    };
  } catch (error) {
    console.error('Error getting career advice:', error);
    throw new Error('Failed to generate career advice');
  }
}
