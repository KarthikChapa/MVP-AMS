"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { VideoExerciseHeader } from "@/components/video-exercise/video-exercise-header"
import VideoPlayer from "@/components/video-exercise/video-player"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { InfoIcon, PlayCircle, AlertCircle, Camera, Activity, Shield, Check, X, Save, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMockData } from "@/lib/context/mock-data-context"
import { Skeleton } from "@/components/ui/skeleton"

export default function VideoExercisePage() {
  const { generateVideoAnalysis, athleteData } = useMockData();
  const [selectedExercise, setSelectedExercise] = useState("cricket_bowling")
  const [exerciseProgress, setExerciseProgress] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [selectedSport, setSelectedSport] = useState("cricket")
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [exerciseHistory, setExerciseHistory] = useState<any[]>([
    { id: 1, name: "Cricket Bowling Action", date: "March 25, 2025", score: 87 },
    { id: 2, name: "Football Penalty Kick", date: "March 23, 2025", score: 92 },
    { id: 3, name: "Sprint Technique", date: "March 20, 2025", score: 79 },
  ])

  const handleStartExercise = () => {
    setIsRecording(true)
    setIsAnalyzing(false)
    setShowResults(false)
    setAnalysisResults(null)
    // Simulate progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setExerciseProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setIsRecording(false)
        // Start analysis after recording
        beginAnalysis()
      }
    }, 500)
  }

  const beginAnalysis = () => {
    setIsAnalyzing(true)
    // Simulate analysis taking some time
    setTimeout(() => {
      const results = generateVideoAnalysis()
      setAnalysisResults(results)
      setIsAnalyzing(false)
      setShowResults(true)

      // Add to history
      const newHistoryEntry = {
        id: Date.now(),
        name: results.exerciseName,
        date: new Date().toLocaleDateString(),
        score: results.overallScore
      }
      setExerciseHistory([newHistoryEntry, ...exerciseHistory])
    }, 3000)
  }

  const sportExercises = {
    cricket: [
      { id: "cricket_bowling", name: "Bowling Action Analysis" },
      { id: "cricket_batting", name: "Batting Technique" },
      { id: "cricket_fielding", name: "Fielding Stance" }
    ],
    football: [
      { id: "football_kick", name: "Penalty Kick Analysis" },
      { id: "football_sprint", name: "Sprint Technique" },
      { id: "football_tackle", name: "Tackle Form Analysis" }
    ],
    athletics: [
      { id: "athletics_sprint", name: "Sprint Start Analysis" },
      { id: "athletics_jump", name: "Long Jump Technique" },
      { id: "athletics_throw", name: "Javelin Throw Form" }
    ]
  }

  const handleSportChange = (sport: string) => {
    setSelectedSport(sport)
    // Set first exercise of selected sport as default
    setSelectedExercise(sportExercises[sport as keyof typeof sportExercises][0].id)
  }

  const saveToProfile = () => {
    if (!analysisResults) return;
    
    // Simulate saving to profile
    const saveAlert = document.createElement('div');
    saveAlert.className = 'fixed top-4 right-4 bg-green-100 border border-green-300 text-green-800 p-3 rounded shadow-md z-50';
    saveAlert.innerHTML = `
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
        <span>Analysis saved to your profile</span>
      </div>
    `;
    document.body.appendChild(saveAlert);
    
    setTimeout(() => {
      saveAlert.remove();
    }, 3000);
  };
  
  const downloadResults = () => {
    if (!analysisResults) return;
    
    // Create and download a JSON file with the analysis results
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      athlete: athleteData.name,
      sport: selectedSport,
      exercise: selectedExercise,
      results: analysisResults,
      generatedAt: new Date().toISOString()
    }));
    
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `analysis-${selectedExercise}-${new Date().toLocaleDateString().replace(/\//g, '-')}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
      <VideoExerciseHeader />

      <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
        <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle>AI Motion Coach</AlertTitle>
        <AlertDescription>
          Our MediaPipe-powered motion tracking technology analyzes your form and provides real-time feedback to prevent injuries.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="exercises" className="space-y-4 w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="exercises">Motion Analysis</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="injuries">Injury Prevention</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="exercises" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="md:w-1/3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Select Sport</CardTitle>
                  <CardDescription>Choose your sport for specialized analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select onValueChange={handleSportChange} defaultValue={selectedSport}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sport" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cricket">Cricket</SelectItem>
                      <SelectItem value="football">Football</SelectItem>
                      <SelectItem value="athletics">Athletics</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>
            <div className="md:w-2/3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>MediaPipe Pose API</CardTitle>
                  <CardDescription>Powered by Google's ML technology</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    {['33 key points', 'Real-time tracking', 'High precision', 'Low latency'].map((feature, i) => (
                      <Badge key={i} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Exercise Library</CardTitle>
                <CardDescription>Select an exercise to track</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sportExercises[selectedSport as keyof typeof sportExercises].map((exercise) => (
                    <div 
                      key={exercise.id}
                      onClick={() => setSelectedExercise(exercise.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedExercise === exercise.id 
                          ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700' 
                          : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                      } border`}
                    >
                      <div className="font-medium">{exercise.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {exercise.id.includes('cricket') && 'Cricket'}
                        {exercise.id.includes('football') && 'Football'}
                        {exercise.id.includes('athletics') && 'Athletics'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-5">
              <CardHeader>
                <CardTitle>Video Tracking</CardTitle>
                <CardDescription>Follow along with the instructor and get real-time feedback</CardDescription>
              </CardHeader>
              <CardContent>
<VideoPlayer exerciseType={selectedExercise} />
                
                {isRecording && (
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Recording Progress</span>
                      <span>{exerciseProgress}%</span>
                    </div>
                    <Progress value={exerciseProgress} className="h-2" />
                  </div>
                )}

                {isAnalyzing && (
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Analyzing Movement Patterns</span>
                      <span>Please wait...</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Progress value={100} className="h-2 animate-pulse flex-1" />
                      <Skeleton className="h-4 w-4 rounded-full" />
                    </div>
                  </div>
                )}

                {isRecording && exerciseProgress > 30 && (
                  <div className="mt-4 p-3 border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium text-yellow-800 dark:text-yellow-300">Form Warning</span>
                    </div>
                    <p className="text-sm text-yellow-700 dark:text-yellow-200">
                      {selectedExercise.includes('cricket_bowling') && 'Your bowling arm is dropping too low during delivery, risking shoulder strain.'}
                      {selectedExercise.includes('football_kick') && 'Ankle position during kick is suboptimal, potential for lateral strain.'}
                      {selectedExercise.includes('athletics') && 'Knee alignment issue detected during landing phase.'}
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <div>
                  {isRecording ? (
                    <Button variant="outline" onClick={() => setIsRecording(false)}>
                      Stop Recording
                    </Button>
                  ) : isAnalyzing ? (
                    <Button disabled>
                      <Skeleton className="h-4 w-4 mr-2 rounded-full" /> Analyzing...
                    </Button>
                  ) : (
                    <Button onClick={handleStartExercise} disabled={showResults}>
                      <Camera className="mr-2 h-4 w-4" /> Start Motion Analysis
                    </Button>
                  )}
                </div>
                <div>
                  {!isRecording && !isAnalyzing && !showResults && (
                    <Button variant="outline">
                      <InfoIcon className="mr-2 h-4 w-4" /> Instructions
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          </div>

          {showResults && analysisResults && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Analysis Results</CardTitle>
                    <CardDescription>MediaPipe-powered form analysis</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={saveToProfile}>
                      <Save className="h-4 w-4 mr-2" /> Save to Profile
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadResults}>
                      <Download className="h-4 w-4 mr-2" /> Download Report
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                            <Activity className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                          </div>
                          <div>
                            <h3 className="font-medium">{analysisResults.exerciseName}</h3>
                            <p className="text-sm text-muted-foreground">
                              Duration: {analysisResults.duration} • {analysisResults.frameCount} frames analyzed
                            </p>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">{analysisResults.overallScore}</div>
                          <div className="text-sm text-muted-foreground">Overall Score</div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Activity className="h-5 w-5 text-blue-600" />
                        <h3 className="font-medium">Technical Performance</h3>
                      </div>
                      <div className="space-y-3">
                        {[
                          {name: 'Form Quality', value: analysisResults.formQuality},
                          {name: 'Technical Accuracy', value: analysisResults.technicalAccuracy},
                          {name: 'Movement Efficiency', value: analysisResults.movementEfficiency}
                        ].map((metric, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">{metric.name}</span>
                              <span className="text-sm font-medium">{metric.value}/100</span>
                            </div>
                            <Progress value={metric.value} className="h-1.5" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="h-5 w-5 text-blue-600" />
                        <h3 className="font-medium">Injury Risk Factors</h3>
                      </div>
                      <div className="space-y-3">
                        {analysisResults.injuryRiskFactors.map((risk: any, i: number) => (
                          <div key={i} className="flex justify-between items-center">
                            <span className="text-sm">{risk.bodyPart}</span>
                            <Badge className={`${
                              risk.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                              risk.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {risk.riskLevel} Risk
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Activity className="h-5 w-5 text-blue-600" />
                        <h3 className="font-medium">Performance Comparison</h3>
                      </div>
                      <div className="space-y-3">
                        {Object.entries(analysisResults.performanceComparison).map(([key, value]: [string, any], i) => (
                          <div key={i} className="flex justify-between items-center">
                            <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="text-sm font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3">Biomechanical Insights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {analysisResults.biomechanicalInsights.map((insight: any, i: number) => (
                        <div key={i} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{insight.aspect}</span>
                            <span className={`text-sm ${
                              insight.score >= 85 ? 'text-green-600' :
                              insight.score >= 70 ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {insight.score}/100
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{insight.recommendation}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button onClick={() => {
                      setShowResults(false);
                      setAnalysisResults(null);
                    }}>
                      Start New Analysis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Exercise History</CardTitle>
              <CardDescription>Your past video analysis sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exerciseHistory.map((exercise, i) => (
                  <div key={i} className="border rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{exercise.name}</div>
                      <div className="text-sm text-muted-foreground">{exercise.date}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        exercise.score >= 90 ? 'bg-green-100 text-green-800' :
                        exercise.score >= 75 ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        Score: {exercise.score}
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="injuries">
          <Card>
            <CardHeader>
              <CardTitle>Injury Prevention</CardTitle>
              <CardDescription>AI-powered advice to reduce injury risk</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Your Risk Profile</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Based on your recent movements and form, we've identified areas where you're most at risk for injury.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <h4 className="font-medium">Shoulder Stress</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">High risk from bowling mechanics. Modify arm angle during delivery.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <h4 className="font-medium">Lower Back</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">Medium risk from rotation. Add core strengthening exercises.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <h4 className="font-medium">Knee Alignment</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">Low risk currently. Continue with proper form maintenance.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Recommended Exercises</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Rotator Cuff Strengthening",
                        target: "Shoulder",
                        description: "3 sets of 12 reps with light resistance bands, 3x weekly",
                        priority: "High"
                      },
                      {
                        title: "Core Stability Series",
                        target: "Lower Back",
                        description: "Plank progression, side planks, and bird-dog exercises, 4x weekly",
                        priority: "Medium"
                      },
                      {
                        title: "Proprioception Training",
                        target: "Balance & Control",
                        description: "Single leg balance with progression to unstable surfaces",
                        priority: "Medium"
                      },
                      {
                        title: "Mobility Routine",
                        target: "Full Body",
                        description: "Dynamic stretching focusing on shoulders and trunk rotation",
                        priority: "Low"
                      }
                    ].map((exercise, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">{exercise.title}</div>
                          <Badge variant={
                            exercise.priority === "High" ? "destructive" :
                            exercise.priority === "Medium" ? "default" : "outline"
                          }>
                            {exercise.priority} Priority
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">Target: {exercise.target}</div>
                        <p className="text-sm">{exercise.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Settings</CardTitle>
              <CardDescription>Configure your video analysis preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">MediaPipe Configuration</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm">Detection Confidence Threshold</label>
                        <span className="text-sm">0.7</span>
                      </div>
                      <Slider defaultValue={[70]} max={100} step={1} />
                      <p className="text-xs text-muted-foreground">Higher values improve accuracy but may miss some poses</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm">Tracking Smoothness</label>
                        <span className="text-sm">0.5</span>
                      </div>
                      <Slider defaultValue={[50]} max={100} step={1} />
                      <p className="text-xs text-muted-foreground">Higher values reduce jitter but increase latency</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Display Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Show Pose Skeleton</div>
                        <div className="text-sm text-muted-foreground">Display joint connections on video</div>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Enabled</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Real-time Feedback</div>
                        <div className="text-sm text-muted-foreground">Show warnings during exercise</div>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Enabled</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Reference Comparison</div>
                        <div className="text-sm text-muted-foreground">Compare with professional form</div>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Disabled</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button>Save Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
