"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, Download, Activity, Award, Clock, TrendingUp, Users, Brain, AlertTriangle, DollarSign, Wallet, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useMockData } from "@/lib/context/mock-data-context"
import { Skeleton } from "@/components/ui/skeleton"

export default function CareerPredictorPage() {
  const { athleteData, careerPrediction, predictCareer } = useMockData()
  
  const [age, setAge] = useState<number>(athleteData.age || 25)
  const [sport, setSport] = useState<string>(athleteData.sport || "Cricket")
  const [injuries, setInjuries] = useState<number>(2)
  const [predictionGenerated, setPredictionGenerated] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [predictionData, setPredictionData] = useState<any>(null)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)

  const handleGeneratePrediction = () => {
    setLoading(true)
    setShowSuccess(false)
    
    // Simulate API call but use our mock data generator
    setTimeout(() => {
      const prediction = predictCareer()
      setPredictionData(prediction)
      setLoading(false)
      setPredictionGenerated(true)
      setShowSuccess(true)
      
      // Auto-hide success message
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1500)
  }
  
  const downloadReport = () => {
    if (!predictionData) return;
    
    // Create and download a JSON file with the analysis results
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      athlete: athleteData.name,
      sport: sport,
      age: age,
      injuries: injuries,
      prediction: predictionData,
      generatedAt: new Date().toISOString()
    }));
    
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `career-prediction-${athleteData.name.replace(' ', '-').toLowerCase()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Career Longevity Predictor</h1>
          <p className="text-muted-foreground">
            AI-powered insights to identify career blind spots and maximize your sports career
          </p>
        </div>
        <Button disabled={!predictionGenerated} onClick={downloadReport}>
          <Download className="mr-2 h-4 w-4" /> Download Report
        </Button>
      </div>

      <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
        <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle>AI Career Longevity Engine</AlertTitle>
        <AlertDescription>
          Our AI analyzes your age, injury history, and sport-specific factors to predict optimal retirement age and career path.
        </AlertDescription>
      </Alert>
      
      {showSuccess && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <AlertDescription>Career prediction generated successfully!</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Athlete Information</CardTitle>
            <CardDescription>Enter your details for accurate prediction</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sport">Sport</Label>
              <Select value={sport} onValueChange={setSport}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cricket">Cricket</SelectItem>
                  <SelectItem value="Football">Football</SelectItem>
                  <SelectItem value="Basketball">Basketball</SelectItem>
                  <SelectItem value="Tennis">Tennis</SelectItem>
                  <SelectItem value="Swimming">Swimming</SelectItem>
                  <SelectItem value="Athletics">Athletics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Age</Label>
                <span>{age} years</span>
              </div>
              <Slider
                value={[age]}
                max={40}
                min={16}
                step={1}
                onValueChange={(value) => setAge(value[0])}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Previous Injuries</Label>
                <span>{injuries} significant injuries</span>
              </div>
              <Slider
                value={[injuries]}
                max={10}
                min={0}
                step={1}
                onValueChange={(value) => setInjuries(value[0])}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Primary Position</Label>
              <Input
                id="position"
                placeholder="e.g. Batsman, Goalkeeper, etc."
                defaultValue={athleteData.position || "Batsman"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience (years)</Label>
              <Input
                id="experience"
                type="number"
                placeholder="e.g. 5"
                defaultValue={athleteData.experience?.split(' ')[0] || "7"}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={handleGeneratePrediction}
              disabled={loading}
            >
              {loading ? "Analyzing Career Data..." : "Generate Prediction"}
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-4">
          {loading ? (
            <CardContent className="p-6 space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </CardContent>
          ) : predictionGenerated && predictionData ? (
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Career Longevity Analysis</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Estimated Career Longevity</span>
                    <span>{predictionData.predictedPeakYears} more years at peak</span>
                  </div>
                  <Progress value={(predictionData.predictedPeakYears/10) * 100} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Based on your sport, age, and injury history
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {predictionData.optimalRetirementAge}
                    </div>
                    <div className="text-sm text-muted-foreground">Optimal Retirement Age</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {predictionData.careerLongevityScore}/100
                    </div>
                    <div className="text-sm text-muted-foreground">Career Longevity Score</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Injury Risk Factors</h3>
                  <div className="space-y-3">
                    {predictionData.injuryRiskFactors.map((factor: any, i: number) => (
                      <div key={i} className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{factor.factor}</div>
                          <div className="text-sm text-muted-foreground">{factor.mitigation}</div>
                        </div>
                        <Badge className={`${
                          parseInt(factor.risk) >= 30 ? 'bg-red-100 text-red-800' :
                          parseInt(factor.risk) >= 15 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {factor.risk} Risk
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Performance Projection</h3>
                  <div className="space-y-3">
                    {Object.entries(predictionData.performanceProjection).map(([period, value]: [string, any], i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm capitalize">{
                            period === 'nextYear' ? 'Next Year' :
                            period === 'threeYears' ? 'Three Years' :
                            'Five Years'
                          }</span>
                          <span className="text-sm font-medium">{value}</span>
                        </div>
                        <Progress value={parseInt(value.replace('%', ''))} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          ) : (
            <CardContent className="flex items-center justify-center h-full text-center p-8">
              <div className="max-w-md">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Career Prediction</h3>
                <p className="text-muted-foreground mb-4">
                  Our AI will analyze your career data and provide personalized insights. 
                  Submit your information to generate a prediction.
                </p>
                <Button onClick={handleGeneratePrediction}>Generate Now</Button>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
      
      {predictionGenerated && predictionData && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Focus Areas</CardTitle>
              <CardDescription>Prioritize these areas to maximize career longevity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictionData.recommendedFocus.map((focus: any, i: number) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">{focus.area}</h4>
                      <Badge variant={
                        focus.importance === 'Critical' ? 'destructive' :
                        focus.importance === 'High' ? 'default' : 'outline'
                      }>
                        {focus.importance} Priority
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{focus.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Post-Career Options</CardTitle>
              <CardDescription>Potential career paths after your playing days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictionData.postCareerOptions.map((option: any, i: number) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">{option.career}</h4>
                      <Badge variant="outline" className="bg-blue-50 text-blue-800">
                        {option.matchScore} Match
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{option.reasoning}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="insights" className="space-y-4 w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="insights">Career Insights</TabsTrigger>
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
          <TabsTrigger value="testimonials">Athlete Testimonials</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sports Science Insights</CardTitle>
              <CardDescription>Latest research on career longevity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-medium mb-2">Training Load Management</h3>
                  <p className="text-sm">
                    Research shows that optimal training load management can extend careers by up to 20%. 
                    The key is periodization and individualized recovery protocols.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-medium mb-2">Nutrition & Recovery</h3>
                  <p className="text-sm">
                    Advanced nutritional protocols combined with sleep optimization have demonstrated 
                    a 30% reduction in injury recovery time and increased career spans.
                  </p>
                </div>
                
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h3 className="font-medium mb-2">Mental Resilience</h3>
                  <p className="text-sm">
                    Studies indicate that psychological factors account for 40% of career longevity variance, 
                    with mental resilience training providing significant benefits.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Post-Career Market Trends</CardTitle>
              <CardDescription>Opportunities in the sports industry</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-muted-foreground mb-1">Broadcasting</div>
                    <div className="text-2xl font-bold">+27%</div>
                    <div className="text-xs text-muted-foreground">YOY Growth</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-muted-foreground mb-1">Coaching</div>
                    <div className="text-2xl font-bold">+18%</div>
                    <div className="text-xs text-muted-foreground">YOY Growth</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-muted-foreground mb-1">Sports Tech</div>
                    <div className="text-2xl font-bold">+42%</div>
                    <div className="text-xs text-muted-foreground">YOY Growth</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Emerging Career Paths</h3>
                  <div className="space-y-3">
                    {[
                      {
                        title: "Sports Data Analysis",
                        description: "Growth in demand for athletes with analytical skills to interpret performance data"
                      },
                      {
                        title: "Personal Brand Management",
                        description: "Athletes leveraging their personal brand for business ventures and endorsements"
                      },
                      {
                        title: "Youth Development",
                        description: "Increased focus on grassroots programs led by former professional athletes"
                      }
                    ].map((path, i) => (
                      <div key={i} className="border rounded-lg p-3">
                        <div className="font-medium mb-1">{path.title}</div>
                        <div className="text-sm text-muted-foreground">{path.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="testimonials">
          <Card>
            <CardHeader>
              <CardTitle>Athlete Success Stories</CardTitle>
              <CardDescription>How our platform has helped athletes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    name: "Rahul Dravid",
                    sport: "Cricket",
                    quote: "The career prediction tool helped me plan my transition into coaching three years before retirement, making it a seamless process.",
                    career: "Former Cricketer, now Head Coach"
                  },
                  {
                    name: "Saina Nehwal",
                    sport: "Badminton",
                    quote: "Using the injury prevention insights, I was able to extend my playing career by working on specific areas that were identified as risks.",
                    career: "Professional Badminton Player"
                  },
                  {
                    name: "Sunil Chhetri",
                    sport: "Football",
                    quote: "The post-career options analysis was spot on! It highlighted areas where my skills would transfer well, which I hadn't considered.",
                    career: "Football Player and Youth Development"
                  }
                ].map((story, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-3 text-blue-600 dark:text-blue-300">
                        <Users className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-medium">{story.name}</h4>
                        <div className="text-sm text-muted-foreground mb-2">{story.career} • {story.sport}</div>
                        <p className="text-sm italic">"{story.quote}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

