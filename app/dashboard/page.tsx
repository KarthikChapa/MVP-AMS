import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AthleteStats } from "@/components/dashboard/athlete-stats"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { UpcomingEvents } from "@/components/dashboard/upcoming-events"
import { InjuryRiskChart } from "@/components/dashboard/injury-risk-chart"
import { PerformanceMetrics } from "@/components/dashboard/performance-metrics"
import { PerformancePrediction } from "@/components/dashboard/performance-prediction"
import { VideoAnalysis } from "@/components/dashboard/video-analysis"
import { BiometricStatus } from "@/components/dashboard/biometric-status"
import WearableMetrics from "@/components/dashboard/wearable-metrics"
import { CareerPrediction } from "@/components/dashboard/career-prediction"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { ShieldCheck, Sparkles, Users, Camera } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
      <DashboardHeader />

      <Tabs defaultValue="overview" className="space-y-4 w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="career">Career Planning</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <AthleteStats />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <PerformanceMetrics />
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Injury Risk Assessment</CardTitle>
                <CardDescription>Based on recent training load and biometrics</CardDescription>
              </CardHeader>
              <CardContent>
                <InjuryRiskChart />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Biometric Fatigue Analysis</CardTitle>
              <CardDescription>AI-powered insights from your wearable devices</CardDescription>
            </CardHeader>
<CardContent>
  <BiometricStatus />
  <WearableMetrics athleteId="12345" />
</CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your latest training sessions and assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivities />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Scheduled training, matches and appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingEvents />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Performance Predictor</CardTitle>
              <CardDescription>ML-powered insights to optimize your performance</CardDescription>
            </CardHeader>
            <CardContent>
              <PerformancePrediction />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Detailed Performance Analytics</CardTitle>
              <CardDescription>Comprehensive view of your performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Detailed performance metrics content will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="career" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Career Longevity Predictor</CardTitle>
              <CardDescription>AI-powered insights for your sports career</CardDescription>
            </CardHeader>
            <CardContent>
              <CareerPrediction />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Motion Coach</CardTitle>
              <CardDescription>Camera-based biomechanics analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <VideoAnalysis />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Training Plans</CardTitle>
              <CardDescription>AI-optimized training schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  {[
                    { name: "Strength Building", progress: 65, sessions: 4 },
                    { name: "Endurance Training", progress: 30, sessions: 2 },
                    { name: "Recovery Protocol", progress: 90, sessions: 6 },
                  ].map((plan, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{plan.name}</div>
                        <div className="text-sm text-muted-foreground">{plan.sessions} sessions</div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{plan.progress}%</span>
                        </div>
                        <Progress value={plan.progress} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button asChild>
                    <Link href="/training-plans">View All Plans</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
