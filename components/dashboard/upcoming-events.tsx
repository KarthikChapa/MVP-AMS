"use client"

import { Calendar, FileText, TrendingUp, Trophy, Activity } from "lucide-react"
import { upcomingEvents } from "@/lib/mock-data"

export function UpcomingEvents() {
  // Get the appropriate icon based on the event type
  const getEventIcon = (type: string) => {
    switch (type) {
      case "training":
        return <Activity className="h-4 w-4" />
      case "analysis":
        return <FileText className="h-4 w-4" />
      case "match":
        return <Trophy className="h-4 w-4" />
      case "recovery":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  // Get the appropriate background color based on the event type
  const getEventColor = (type: string) => {
    switch (type) {
      case "training":
        return "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
      case "analysis":
        return "bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800"
      case "match":
        return "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800"
      case "recovery":
        return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
      default:
        return "bg-slate-50 border-slate-200 dark:bg-slate-900/20 dark:border-slate-800"
    }
  }

  // Get the appropriate text color based on the event type
  const getTextColor = (type: string) => {
    switch (type) {
      case "training":
        return "text-blue-600 dark:text-blue-400"
      case "analysis":
        return "text-purple-600 dark:text-purple-400"
      case "match":
        return "text-amber-600 dark:text-amber-400"
      case "recovery":
        return "text-green-600 dark:text-green-400"
      default:
        return "text-slate-600 dark:text-slate-400"
    }
  }

  return (
    <div className="space-y-4">
      {upcomingEvents.map((event) => (
        <div
          key={event.id}
          className={`p-3 rounded-lg border ${getEventColor(event.type)}`}
        >
          <div className="flex items-center gap-3">
            <div className={`${getTextColor(event.type)}`}>
              {getEventIcon(event.type)}
            </div>
            <div className="flex-1 space-y-1">
              <p className="font-medium">{event.title}</p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{event.date}</span>
                <span className="text-muted-foreground">{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

