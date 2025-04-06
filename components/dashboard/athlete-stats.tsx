"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Battery, Heart, AlertTriangle } from "lucide-react"
import { athleteStats } from "@/lib/mock-data"

export function AthleteStats() {
  // Function to get the appropriate icon based on the icon name
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "activity":
        return <Activity className="h-4 w-4 text-muted-foreground" />
      case "heart":
        return <Heart className="h-4 w-4 text-muted-foreground" />
      case "battery":
        return <Battery className="h-4 w-4 text-muted-foreground" />
      case "alert-triangle":
        return <AlertTriangle className="h-4 w-4 text-muted-foreground" />
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <>
      {athleteStats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {getIcon(stat.icon)}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span
                className={
                  stat.changeType === "increase"
                    ? "text-green-500"
                    : stat.changeType === "decrease"
                    ? "text-red-500"
                    : ""
                }
              >
                {stat.change}
              </span>{" "}
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

