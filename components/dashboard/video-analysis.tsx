"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Camera, AlertCircle, CheckCircle2 } from "lucide-react"

interface JointAngle {
  joint: string
  angle: number
  ideal: number
  difference: number
}

interface AnalysisSummary {
  overallScore: number
  technicalScore: number
  formScore: number
  consistencyScore: number
  jointAngles: JointAngle[]
  recommendations: string[]
  sportSpecificInsights: string[]
}

interface VideoAnalysisData {
  _id: string
  athleteId: string
  videoUrl: string
  exerciseType: string
  sport: string
  date: string
  duration: number
  analysisSummary: AnalysisSummary
}

export function VideoAnalysis() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [analysisData, setAnalysisData] = useState<VideoAnalysisData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // In a real implementation, this would be a fetch call to your API
        // fetch('/api/video-analysis?athleteId=current')
        
        // For now, we'll simulate an API response with mock data
        setTimeout(() => {
          const mockData: VideoAnalysisData = {
            _id: "vid123456",
            athleteId: "ath123456",
            videoUrl: "https://storage.example.com/videos/squat-analysis.mp4",
            exerciseType: "Squat",
            sport: "Weightlifting",
            date: new Date().toISOString(),
            duration: 45,
            analysisSummary: {
              overallScore: 82,
              technicalScore: 78,
              formScore: 85,
              consistencyScore: 83,
              jointAngles: [
                { joint: "Knee", angle: 95, ideal: 90, difference: 5 },
                { joint: "Hip", angle: 110, ideal: 100, difference: 10 },
                { joint: "Ankle", angle: 80, ideal: 85, difference: -5 },
                { joint: "Spine", angle: 165, ideal: 170, difference: -5 }
              ],
              recommendations: [
                "Keep your knees aligned with your toes during the squat",
                "Maintain a more neutral spine position",
                "Work on ankle mobility to achieve proper depth"
              ],
              sportSpecificInsights: [
                "Your current squat form may limit power generation in Olympic lifts",
                "The knee tracking issue could impact sprint performance",
                "Improving hip mobility will enhance your athletic movement patterns"
              ]
            }
          }
          setAnalysisData(mockData)
          setIsLoading(false)
        }, 1500)
      } catch (err) {
        setError("Failed to load video analysis data")
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div className="flex justify-center items-center h-40">Loading video analysis...</div>
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

  if (!analysisData) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Analysis Available</AlertTitle>
        <AlertDescription>No recent video analysis found. Upload a video to get started.</AlertDescription>
      </Alert>
    )
  }

  const { analysisSummary, exerciseType, sport } = analysisData
  const jointAnglesData = analysisSummary.jointAngles.map(ja => ({
    name: ja.joint,
    current: ja.angle,
    ideal: ja.ideal,
    difference: Math.abs(ja.difference)
  }))

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h3 className="text-lg font-semibold mb-1">
            {exerciseType} Analysis
            <Badge variant="outline" className="ml-2">{sport}</Badge>
          </h3>
          <p className="text-sm text-muted-foreground">Latest analysis from {new Date(analysisData.date).toLocaleDateString()}</p>
        </div>
        <Button size="sm" variant="outline" className="gap-1">
          <Camera className="h-4 w-4" />
          New Analysis
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700 dark:text-green-400">{analysisSummary.overallScore}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Technical Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analysisSummary.technicalScore}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Form Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analysisSummary.formScore}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Consistency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analysisSummary.consistencyScore}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Joint Angles Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={jointAnglesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Angle (degrees)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="current" name="Your Angle" fill="#4f46e5" />
                <Bar dataKey="ideal" name="Ideal Angle" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysisSummary.recommendations.map((rec, index) => (
                <li key={index} className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sport-Specific Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysisSummary.sportSpecificInsights.map((insight, index) => (
                <li key={index} className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 