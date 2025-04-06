"use client"

import { Activity, Clipboard, Heart, Trophy } from "lucide-react"
import { recentActivities } from "@/lib/mock-data"

export function RecentActivities() {
  // Function to get the appropriate icon
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "activity":
        return <Activity className="h-4 w-4" />
      case "clipboard":
        return <Clipboard className="h-4 w-4" />
      case "heart":
        return <Heart className="h-4 w-4" />
      case "trophy":
        return <Trophy className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  // Function to get the appropriate background color based on activity type
  const getTypeBgColor = (type: string) => {
    switch (type) {
      case "Training":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Assessment":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Recovery":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Match":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
    }
  }

  return (
    <div className="space-y-4">
      {recentActivities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800">
            {getIcon(activity.icon)}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <div className={`px-2 py-0.5 rounded text-xs font-medium ${getTypeBgColor(activity.type)}`}>
                {activity.type}
              </div>
              <span className="text-xs text-muted-foreground">{activity.date}</span>
            </div>
            <p className="font-medium">{activity.title}</p>
            <p className="text-sm text-muted-foreground">{activity.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

