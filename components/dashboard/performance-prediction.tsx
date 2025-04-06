"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleOff, AlertTriangle, TrendingDown, Activity, Calendar, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

// Mock data for development - will be replaced with actual API calls
const mockAthleteId = "mock-athlete-12345";

interface PerformancePrediction {
  riskScore: number;
  confidenceScore: number;
  declineAreas: string[];
  timeFrame: string;
  recommendations: string[];
}

interface InjuryRisk {
  injuryRiskScore: number;
  primaryRiskAreas: string[];
  contributingFactors: string[];
  preventionStrategies: string[];
  timeUntilFullRecovery?: number;
}

interface PredictionData {
  performance: PerformancePrediction;
  injuryRisk: InjuryRisk;
}

export function PerformancePrediction() {
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch prediction data on component mount
  useEffect(() => {
    // In a real implementation, this would call the API endpoint
    const fetchPredictionData = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock API response - in a real implementation, this would be:
        // const response = await fetch('/api/performance-prediction', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ athleteId: mockAthleteId })
        // });
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockData: PredictionData = {
          performance: {
            riskScore: 62.5,
            confidenceScore: 0.89,
            declineAreas: ["endurance", "recovery time"],
            timeFrame: "3-6 months",
            recommendations: [
              "Implement progressive aerobic training 3x weekly",
              "Add interval training to improve VO2 max",
              "Schedule active recovery sessions between intense workouts",
              "Increase protein intake to 1.6-2.0g per kg body weight"
            ]
          },
          injuryRisk: {
            injuryRiskScore: 45.8,
            primaryRiskAreas: ["Knee joints", "Overall muscular fatigue"],
            contributingFactors: ["Declining recovery rate", "Insufficient sleep quality"],
            preventionStrategies: [
              "Focus on VMO and hamstring strengthening exercises",
              "Implement landing mechanics training",
              "Adjust training intensity to 70-80% of normal for 1-2 weeks",
              "Establish consistent sleep schedule with 8+ hours nightly"
            ]
          }
        };
        
        setPredictionData(mockData);
        setError(null);
      } catch (err) {
        console.error("Error fetching prediction data:", err);
        setError("Failed to load performance predictions");
      } finally {
        setLoading(false);
      }
    };

    fetchPredictionData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground">Loading AI predictions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <CircleOff className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!predictionData) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>No prediction data available</AlertTitle>
        <AlertDescription>
          We don't have enough data to generate performance predictions yet. 
          Continue logging your training sessions and biometrics.
        </AlertDescription>
      </Alert>
    );
  }

  const { performance, injuryRisk } = predictionData;
  
  // Helper for determining risk level color
  const getRiskColor = (score: number) => {
    if (score < 30) return "bg-green-500";
    if (score < 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {/* Performance Decline Risk */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Performance Decline Risk</CardTitle>
                <CardDescription>AI-predicted risk of performance drop</CardDescription>
              </div>
              <Badge 
                variant={performance.riskScore > 60 ? "destructive" : "secondary"}
                className="ml-2"
              >
                {performance.confidenceScore * 100}% confidence
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Risk Level</span>
                  <span className="font-medium">{performance.riskScore.toFixed(1)}%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getRiskColor(performance.riskScore)}`} 
                    style={{ width: `${performance.riskScore}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Areas of Concern</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {performance.declineAreas.map((area, index) => (
                    <Badge key={index} variant="outline" className="capitalize">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Timeframe: <span className="font-medium">{performance.timeFrame}</span></span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start pt-0">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <ListChecks className="h-4 w-4" /> Recommendations
            </h4>
            <ul className="text-sm space-y-1 list-disc pl-5">
              {performance.recommendations.slice(0, 3).map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
              {performance.recommendations.length > 3 && (
                <li className="text-muted-foreground">
                  +{performance.recommendations.length - 3} more recommendations
                </li>
              )}
            </ul>
          </CardFooter>
        </Card>

        {/* Injury Risk Prediction */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Injury Risk Prediction</CardTitle>
            <CardDescription>AI-powered injury prevention insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Risk Level</span>
                  <span className="font-medium">{injuryRisk.injuryRiskScore.toFixed(1)}%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getRiskColor(injuryRisk.injuryRiskScore)}`} 
                    style={{ width: `${injuryRisk.injuryRiskScore}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Primary Risk Areas</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {injuryRisk.primaryRiskAreas.map((area, index) => (
                    <Badge key={index} variant="outline">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {injuryRisk.timeUntilFullRecovery && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Est. recovery time: <span className="font-medium">{injuryRisk.timeUntilFullRecovery} days</span>
                  </span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start pt-0">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <ListChecks className="h-4 w-4" /> Prevention Strategies
            </h4>
            <ul className="text-sm space-y-1 list-disc pl-5">
              {injuryRisk.preventionStrategies.slice(0, 3).map((strategy, index) => (
                <li key={index}>{strategy}</li>
              ))}
              {injuryRisk.preventionStrategies.length > 3 && (
                <li className="text-muted-foreground">
                  +{injuryRisk.preventionStrategies.length - 3} more strategies
                </li>
              )}
            </ul>
          </CardFooter>
        </Card>
      </div>
      
      <div className="flex justify-end">
        <Button variant="outline" size="sm">
          View Detailed Analysis
        </Button>
      </div>
    </div>
  );
} 