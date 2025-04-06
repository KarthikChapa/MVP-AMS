"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ExerciseMetricsProps {
  exerciseId: string
}

// Demo data
const performanceData = [
  { date: "May 1", score: 75 },
  { date: "May 8", score: 78 },
  { date: "May 15", score: 82 },
  { date: "May 22", score: 80 },
  { date: "May 29", score: 85 },
  { date: "Jun 5", score: 88 },
  { date: "Jun 12", score: 92 },
]

const strengthData = [
  { name: "Form", value: 85 },
  { name: "Power", value: 78 },
  { name: "Stability", value: 65 },
  { name: "ROM", value: 92 },
  { name: "Balance", value: 70 },
]

const consistencyData = [
  { name: "Speed", actual: 8.2, target: 8.0 },
  { name: "Depth", actual: 9.0, target: 10.0 },
  { name: "Pause", actual: 7.5, target: 8.0 },
  { name: "Rhythm", actual: 8.8, target: 9.0 },
  { name: "Control", actual: 7.2, target: 8.5 },
]

export function ExerciseMetrics({ exerciseId }: ExerciseMetricsProps) {
  return (
    <Tabs defaultValue="performance" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="performance">Performance Trend</TabsTrigger>
        <TabsTrigger value="strength">Strength Analysis</TabsTrigger>
        <TabsTrigger value="consistency">Consistency Metrics</TabsTrigger>
      </TabsList>
      
      <TabsContent value="performance" className="space-y-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={performanceData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">92%</div>
              <p className="text-muted-foreground">Current Score</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">+17%</div>
              <p className="text-muted-foreground">Improvement</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">98%</div>
              <p className="text-muted-foreground">Best Score</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="strength" className="space-y-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={strengthData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Your range of motion (ROM) is excellent, but focus on improving stability and balance for better overall performance.
        </p>
      </TabsContent>
      
      <TabsContent value="consistency" className="space-y-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={consistencyData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="actual" fill="#3B82F6" />
              <Bar dataKey="target" fill="#93C5FD" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <p className="text-sm text-muted-foreground">
          You're achieving good consistency in rhythm and speed, but need to work on depth and control to match target metrics.
        </p>
      </TabsContent>
    </Tabs>
  )
} 