import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Briefcase, Headphones, TrendingUp, Video } from "lucide-react"

export function PivotCareers() {
  const careers = [
    {
      id: 1,
      title: "Bowling Coach",
      description: "Train and develop fast bowlers at professional level",
      matchPercentage: 88,
      icon: <Video className="h-5 w-5" />,
      skills: ["Technical Knowledge", "Communication", "Player Development"],
      avgSalary: "₹18L/year",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      title: "Sports Analyst",
      description: "Analyze player and team performance using data",
      matchPercentage: 82,
      icon: <TrendingUp className="h-5 w-5" />,
      skills: ["Data Analysis", "Cricket Knowledge", "Technical Tools"],
      avgSalary: "₹12L/year",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
    },
    {
      id: 3,
      title: "Cricket Commentator",
      description: "Provide expert analysis and commentary for broadcasts",
      matchPercentage: 75,
      icon: <Headphones className="h-5 w-5" />,
      skills: ["Communication", "Cricket Knowledge", "Media Presence"],
      avgSalary: "₹15L/year",
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600",
    },
    {
      id: 4,
      title: "Sports Administrator",
      description: "Manage cricket operations and development programs",
      matchPercentage: 70,
      icon: <Briefcase className="h-5 w-5" />,
      skills: ["Leadership", "Organization", "Sports Management"],
      avgSalary: "₹20L/year",
      color: "bg-orange-50 border-orange-200",
      iconColor: "text-orange-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {careers.map((career) => (
        <Card key={career.id} className={`${career.color} border`}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-full bg-white ${career.iconColor}`}>{career.icon}</div>
                <CardTitle className="text-lg">{career.title}</CardTitle>
              </div>
              <Badge variant="outline" className="bg-white">
                {career.matchPercentage}% Match
              </Badge>
            </div>
            <CardDescription>{career.description}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Skill Match</span>
                  <span className="font-medium">{career.matchPercentage}%</span>
                </div>
                <Progress value={career.matchPercentage} className="h-2" />
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Key Skills</p>
                <div className="flex flex-wrap gap-1">
                  {career.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-white">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>Average Salary</span>
                <span className="font-medium">{career.avgSalary}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="sm" className="w-full gap-1">
              <BookOpen className="h-4 w-4" />
              Explore Career Path
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

