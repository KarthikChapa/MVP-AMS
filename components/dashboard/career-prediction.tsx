"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from "recharts"
import { Progress } from "@/components/ui/progress"
import { Briefcase, Book, Trophy, Lightbulb, AlertCircle, CheckCircle2, Medal, ArrowUp } from "lucide-react"

interface CareerPathOption {
  title: string
  match: number
  description: string
  requirements: string[]
  potentialSalary: string
  growthRate: string
}

interface SkillAssessment {
  skill: string
  current: number
  required: number
  developmentSuggestions: string[]
}

interface CareerPredictionData {
  _id: string
  athleteId: string
  timestamp: string
  currentSkills: { name: string; level: number }[]
  interests: string[]
  personalityFactors: { factor: string; score: number }[]
  careerOptions: CareerPathOption[]
  skillGaps: SkillAssessment[]
  recommendations: string[]
  longevityProjection: {
    primaryCareer: { years: number; retirement: string }
    secondaryPaths: { path: string; viability: number; transitionEase: number }[]
  }
}

export function CareerPrediction() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [predictionData, setPredictionData] = useState<CareerPredictionData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // In a real implementation, this would be a fetch call to your API
        // fetch('/api/career-advisor?athleteId=current')
        
        // For now, we'll simulate an API response with mock data
        setTimeout(() => {
          const mockData: CareerPredictionData = {
            _id: "car123456",
            athleteId: "ath123456",
            timestamp: new Date().toISOString(),
            currentSkills: [
              { name: "Leadership", level: 85 },
              { name: "Communication", level: 78 },
              { name: "Sport Technique", level: 92 },
              { name: "Physical Conditioning", level: 88 },
              { name: "Mental Toughness", level: 82 },
              { name: "Strategy & Tactics", level: 75 }
            ],
            interests: ["Coaching", "Sports Analytics", "Media", "Performance", "Education"],
            personalityFactors: [
              { factor: "Extraversion", score: 75 },
              { factor: "Conscientiousness", score: 82 },
              { factor: "Openness", score: 68 },
              { factor: "Agreeableness", score: 72 },
              { factor: "Neuroticism", score: 45 }
            ],
            careerOptions: [
              {
                title: "Professional Coach",
                match: 92,
                description: "Utilize your expertise to coach athletes at various levels of competition",
                requirements: ["Coaching certification", "Leadership skills", "Technical knowledge"],
                potentialSalary: "$65,000 - $120,000",
                growthRate: "14% (faster than average)"
              },
              {
                title: "Sports Analyst",
                match: 84,
                description: "Apply your knowledge of the game to analyze performance for media or teams",
                requirements: ["Analytical skills", "Communication", "Technical knowledge"],
                potentialSalary: "$55,000 - $95,000",
                growthRate: "10% (faster than average)"
              },
              {
                title: "Performance Director",
                match: 78,
                description: "Oversee athletic development programs for organizations or teams",
                requirements: ["Management experience", "Strategic planning", "Performance metrics"],
                potentialSalary: "$85,000 - $150,000",
                growthRate: "8% (as fast as average)"
              }
            ],
            skillGaps: [
              {
                skill: "Business Management",
                current: 60,
                required: 80,
                developmentSuggestions: [
                  "Take a sports management course",
                  "Seek mentorship from current directors",
                  "Gain experience in budget management"
                ]
              },
              {
                skill: "Data Analysis",
                current: 55,
                required: 75,
                developmentSuggestions: [
                  "Complete a sports analytics certification",
                  "Learn basic programming (R or Python)",
                  "Practice with performance data"
                ]
              },
              {
                skill: "Public Speaking",
                current: 70,
                required: 85,
                developmentSuggestions: [
                  "Join Toastmasters or similar group",
                  "Practice media interviews",
                  "Seek opportunities to present"
                ]
              }
            ],
            recommendations: [
              "Begin coaching certification while still competing",
              "Build your network with front office personnel",
              "Develop your media presence through social channels",
              "Gain experience through offseason internships",
              "Consider advanced education in sports science"
            ],
            longevityProjection: {
              primaryCareer: {
                years: 8,
                retirement: "32-35 years old"
              },
              secondaryPaths: [
                { path: "Coaching", viability: 92, transitionEase: 85 },
                { path: "Media Analysis", viability: 84, transitionEase: 75 },
                { path: "Performance Direction", viability: 78, transitionEase: 65 }
              ]
            }
          }
          setPredictionData(mockData)
          setIsLoading(false)
        }, 1500)
      } catch (err) {
        setError("Failed to load career prediction data")
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div className="flex justify-center items-center h-40">Loading career prediction data...</div>
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!predictionData) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Career Data Available</AlertTitle>
        <AlertDescription>No career prediction found. Complete the career assessment to get started.</AlertDescription>
      </Alert>
    )
  }

  // Format data for radar chart
  const radarData = predictionData.currentSkills.map(skill => ({
    subject: skill.name,
    A: skill.level,
    fullMark: 100
  }))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h3 className="text-lg font-semibold mb-1">
            Career Projection
            <Badge variant="outline" className="ml-2">Updated {new Date(predictionData.timestamp).toLocaleDateString()}</Badge>
          </h3>
          <p className="text-sm text-muted-foreground">AI-powered analysis based on your skills and interests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Skills Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Current Skills" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Top Career Match
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">{predictionData.careerOptions[0].title}</h3>
                  <Badge className="bg-green-500">{predictionData.careerOptions[0].match}% Match</Badge>
                </div>
                <p className="text-sm">{predictionData.careerOptions[0].description}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {predictionData.careerOptions[0].requirements.map((req, i) => (
                    <Badge key={i} variant="outline">{req}</Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Potential Salary</div>
                    <div className="font-medium">{predictionData.careerOptions[0].potentialSalary}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Growth Rate</div>
                    <div className="font-medium flex items-center gap-1">
                      <ArrowUp className="h-3 w-3 text-green-500" />
                      {predictionData.careerOptions[0].growthRate}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-500" />
                Career Longevity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Primary Career Duration</span>
                  <span className="font-medium">{predictionData.longevityProjection.primaryCareer.years} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Estimated Transition Age</span>
                  <span className="font-medium">{predictionData.longevityProjection.primaryCareer.retirement}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {predictionData.careerOptions.slice(0, 3).map((option, index) => (
          <Card key={index} className={index === 0 ? "bg-blue-50 dark:bg-blue-900/20" : ""}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-medium">{option.title}</CardTitle>
                <Badge variant={index === 0 ? "default" : "outline"}>{option.match}% Match</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">{option.description}</p>
              <div className="text-xs text-muted-foreground mt-2">Salary Range</div>
              <div className="font-medium text-sm">{option.potentialSalary}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5 text-indigo-500" />
              Skill Development Needs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictionData.skillGaps.map((gap, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{gap.skill}</span>
                    <span className="text-sm">
                      {gap.current}/{gap.required} needed
                    </span>
                  </div>
                  <Progress value={(gap.current / gap.required) * 100} className="h-2" />
                  <div className="text-sm mt-1">
                    <span className="font-medium text-xs text-muted-foreground">Recommendation: </span>
                    {gap.developmentSuggestions[0]}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Key Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {predictionData.recommendations.map((rec, index) => (
                <li key={index} className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 