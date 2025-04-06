"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function TestMLPage() {
  interface TestResults {
    biometric?: {
      error?: string;
      success?: boolean;
      predictions?: any;
    };
    performance?: {
      error?: string;
      success?: boolean;
      predictions?: any;
    };
    career?: {
      error?: string;
      success?: boolean;
      advice?: any;
    };
  }

  interface LoadingState {
    [key: string]: boolean;
  }

  const [results, setResults] = useState<TestResults>({})
  const [loading, setLoading] = useState<LoadingState>({})

  const testBiometricAnalysis = async () => {
    setLoading(prev => ({ ...prev, biometric: true }))
    try {
      const response = await fetch("/api/biometric-fatigue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          athleteId: "test-athlete",
          biometricData: {
            heartRate: {
              current: 75,
              resting: 65,
              variability: 45,
              recoveryRate: 12
            },
            sleep: {
              durationHours: 7.5,
              deepSleepPercentage: 20,
              remSleepPercentage: 25,
              sleepQualityScore: 85
            }
          }
        })
      })
      const data = await response.json()
      setResults((prev: TestResults) => ({ ...prev, biometric: data }))
    } catch (error) {
      console.error("Biometric test failed:", error)
      setResults((prev: TestResults) => ({ ...prev, biometric: { error: "Test failed" } }))
    }
    setLoading(prev => ({ ...prev, biometric: false }))
  }

  const testPerformancePrediction = async () => {
    setLoading(prev => ({ ...prev, performance: true }))
    try {
      const response = await fetch("/api/performance-prediction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          athleteId: "test-athlete",
          includePreviousDays: 30
        })
      })
      const data = await response.json()
      setResults((prev: TestResults) => ({ ...prev, performance: data }))
    } catch (error) {
      console.error("Performance test failed:", error)
      setResults((prev: TestResults) => ({ ...prev, performance: { error: "Test failed" } }))
    }
    setLoading(prev => ({ ...prev, performance: false }))
  }

  const testCareerPrediction = async () => {
    setLoading(prev => ({ ...prev, career: true }))
    try {
      const response = await fetch("/api/career-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          athleteId: "test-athlete",
          context: {
            currentSport: "Cricket",
            yearsExperience: 5,
            achievements: ["State level participation", "District champion"]
          }
        })
      })
      const data = await response.json()
      setResults((prev: TestResults) => ({ ...prev, career: data }))
    } catch (error) {
      console.error("Career prediction test failed:", error)
      setResults((prev: TestResults) => ({ ...prev, career: { error: "Test failed" } }))
    }
    setLoading(prev => ({ ...prev, career: false }))
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">ML Systems Test</h1>
      
      {/* Biometric Analysis */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Biometric Analysis Test</h2>
          <Button 
            onClick={testBiometricAnalysis}
            disabled={loading.biometric}
          >
            {loading.biometric ? "Testing..." : "Run Test"}
          </Button>
          {results.biometric && (
            <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
              {JSON.stringify(results.biometric, null, 2)}
            </pre>
          )}
        </CardContent>
      </Card>

      {/* Performance Prediction */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Performance Prediction Test</h2>
          <Button 
            onClick={testPerformancePrediction}
            disabled={loading.performance}
          >
            {loading.performance ? "Testing..." : "Run Test"}
          </Button>
          {results.performance && (
            <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
              {JSON.stringify(results.performance, null, 2)}
            </pre>
          )}
        </CardContent>
      </Card>

      {/* Career Prediction */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Career Prediction Test</h2>
          <Button 
            onClick={testCareerPrediction}
            disabled={loading.career}
          >
            {loading.career ? "Testing..." : "Run Test"}
          </Button>
          {results.career && (
            <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
              {JSON.stringify(results.career, null, 2)}
            </pre>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
