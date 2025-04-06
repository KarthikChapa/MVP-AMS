"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Battery, BatteryCharging, HeartPulse, AlertCircle, BellRing, Moon, Watch } from "lucide-react"

interface IBiometricData {
  heartRate: number
  hrv: number
  sleepHours: number
  sleepQuality: number
  stepsCount: number
  caloriesBurned: number
  stressLevel: number
  timestamp: string
}

interface IFatiguePrediction {
  fatigueScore: number
  fatigueRisk: "low" | "moderate" | "high"
  recoveryNeeded: number
  confidenceScore: number
  recommendations: string[]
  sleepQualityScore: number
  recoveryStatus: "poor" | "fair" | "good" | "excellent"
  trends: { metric: string; trend: "increasing" | "decreasing" | "stable"; significance: number }[]
}

interface BiometricStatusData {
  _id: string
  athleteId: string
  timestamp: string
  deviceType: string
  biometricData: IBiometricData
  predictions: IFatiguePrediction
  historicalData: { date: string; fatigue: number; recovery: number; stress: number }[]
}

export function BiometricStatus() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [biometricData, setBiometricData] = useState<BiometricStatusData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // In a real implementation, this would be a fetch call to your API
        // fetch('/api/biometric-fatigue?athleteId=current')
        
        // For now, we'll simulate an API response with mock data
        setTimeout(() => {
          const mockData: BiometricStatusData = {
            _id: "bio123456",
            athleteId: "ath123456",
            timestamp: new Date().toISOString(),
            deviceType: "Smartwatch",
            biometricData: {
              heartRate: 65,
              hrv: 85,
              sleepHours: 7.2,
              sleepQuality: 0.78,
              stepsCount: 8542,
              caloriesBurned: 1850,
              stressLevel: 35,
              timestamp: new Date().toISOString(),
            },
            predictions: {
              fatigueScore: 32,
              fatigueRisk: "low",
              recoveryNeeded: 8,
              confidenceScore: 0.88,
              recommendations: [
                "Focus on hydration in the next 24 hours",
                "Consider a light recovery session instead of intense training",
                "Aim for 8 hours of sleep tonight to optimize recovery",
                "Monitor HR during your next session to ensure proper recovery"
              ],
              sleepQualityScore: 78,
              recoveryStatus: "good",
              trends: [
                { metric: "Heart Rate Variability", trend: "increasing", significance: 0.75 },
                { metric: "Resting Heart Rate", trend: "decreasing", significance: 0.65 },
                { metric: "Sleep Quality", trend: "stable", significance: 0.55 },
                { metric: "Stress Level", trend: "decreasing", significance: 0.70 }
              ]
            },
            historicalData: [
              { date: "2023-06-01", fatigue: 45, recovery: 65, stress: 48 },
              { date: "2023-06-02", fatigue: 40, recovery: 70, stress: 43 },
              { date: "2023-06-03", fatigue: 38, recovery: 75, stress: 40 },
              { date: "2023-06-04", fatigue: 35, recovery: 78, stress: 38 },
              { date: "2023-06-05", fatigue: 42, recovery: 73, stress: 45 },
              { date: "2023-06-06", fatigue: 38, recovery: 75, stress: 42 },
              { date: "2023-06-07", fatigue: 32, recovery: 82, stress: 35 }
            ]
          }
          setBiometricData(mockData)
          setIsLoading(false)
        }, 1500)
      } catch (err) {
        setError("Failed to load biometric data")
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div className="flex justify-center items-center h-40">Loading biometric data...</div>
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

  if (!biometricData) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Biometric Data Available</AlertTitle>
        <AlertDescription>No recent biometric data found. Sync your wearable device to get started.</AlertDescription>
      </Alert>
    )
  }

  const { predictions, biometricData: bioData } = biometricData
  
  // Helper function to get fatigue risk color
  const getFatigueRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
      case "moderate": return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
      case "high": return "text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
      default: return "text-gray-600 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    }
  }

  // Helper function to get sleep quality indicator
  const getSleepQualityIndicator = (score: number) => {
    if (score >= 80) return "excellent"
    if (score >= 70) return "good"
    if (score >= 60) return "fair"
    return "poor"
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h3 className="text-lg font-semibold mb-1">
            Biometric Status
            <Badge variant="outline" className="ml-2">{bioData.timestamp ? new Date(bioData.timestamp).toLocaleDateString() : "Today"}</Badge>
          </h3>
          <p className="text-sm text-muted-foreground">Data from {biometricData.deviceType}</p>
        </div>
        <div className="flex items-center">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Watch className="h-3 w-3" />
            Last synced: {new Date().toLocaleTimeString()}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className={getFatigueRiskColor(predictions.fatigueRisk)}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Fatigue Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-bold">{predictions.fatigueScore}%</div>
              <div className="text-sm mb-1 capitalize">({predictions.fatigueRisk} risk)</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recovery Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-400 capitalize">{predictions.recoveryStatus}</div>
              <BatteryCharging className="h-5 w-5 text-blue-600 mb-1" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sleep Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-bold">{predictions.sleepQualityScore}%</div>
              <Moon className="h-5 w-5 text-indigo-600 mb-1" />
            </div>
            <div className="text-sm text-muted-foreground capitalize">{getSleepQualityIndicator(predictions.sleepQualityScore)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current HR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-bold">{bioData.heartRate}</div>
              <HeartPulse className="h-5 w-5 text-red-500 mb-1" />
              <div className="text-sm mb-1">bpm</div>
            </div>
            <div className="text-sm text-muted-foreground">HRV: {bioData.hrv} ms</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>7-Day Biometric Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={biometricData.historicalData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="fatigue" stroke="#ef4444" name="Fatigue" />
                <Line type="monotone" dataKey="recovery" stroke="#3b82f6" name="Recovery" />
                <Line type="monotone" dataKey="stress" stroke="#eab308" name="Stress" />
              </LineChart>
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
              {predictions.recommendations.map((rec, index) => (
                <li key={index} className="flex gap-2">
                  <BellRing className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Biometric Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {predictions.trends.map((trend, index) => (
                <li key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{trend.metric}</span>
                    <span className="text-sm capitalize">
                      {trend.trend === "increasing" ? "↑" : trend.trend === "decreasing" ? "↓" : "→"} {trend.trend}
                    </span>
                  </div>
                  <div>
                    <Progress value={trend.significance * 100} className={
                      trend.trend === "increasing" ? "bg-green-100" : 
                      trend.trend === "decreasing" ? "bg-blue-100" : "bg-gray-100"
                    } />
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 