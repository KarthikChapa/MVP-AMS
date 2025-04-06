"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bell, Calendar, MessageSquare } from "lucide-react"
import { useMockData } from "@/lib/context/mock-data-context"
import { useState } from "react"
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DashboardHeader() {
  const { athleteData } = useMockData()
  const [notificationCount, setNotificationCount] = useState(3)
  const [messageCount, setMessageCount] = useState(2)

  const clearNotifications = () => {
    setNotificationCount(0)
  }

  const clearMessages = () => {
    setMessageCount(0)
  }

  // Get initials for the avatar
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('')
  }

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back, {athleteData.name.split(' ')[0]}! Here's your performance overview.</p>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Notifications</h4>
              <div className="border-t pt-2">
                <div className="text-sm">
                  {notificationCount > 0 ? (
                    <>
                      <div className="mb-2 pb-2 border-b">
                        <p className="font-medium">New training plan assigned</p>
                        <p className="text-xs text-muted-foreground">Coach has assigned you a new strength training plan.</p>
                      </div>
                      <div className="mb-2 pb-2 border-b">
                        <p className="font-medium">Performance review scheduled</p>
                        <p className="text-xs text-muted-foreground">Quarterly review scheduled for next week.</p>
                      </div>
                      <div className="mb-2">
                        <p className="font-medium">Match analysis ready</p>
                        <p className="text-xs text-muted-foreground">Your recent match analysis is now available.</p>
                      </div>
                      <Button size="sm" className="w-full mt-2" onClick={clearNotifications}>
                        Mark all as read
                      </Button>
                    </>
                  ) : (
                    <p className="text-muted-foreground">No new notifications</p>
                  )}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <MessageSquare className="h-4 w-4" />
              {messageCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {messageCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Messages</h4>
              <div className="border-t pt-2">
                <div className="text-sm">
                  {messageCount > 0 ? (
                    <>
                      <div className="mb-2 pb-2 border-b">
                        <p className="font-medium">Coach Dave</p>
                        <p className="text-xs text-muted-foreground">Let's discuss your technique improvements in tomorrow's session.</p>
                      </div>
                      <div className="mb-2">
                        <p className="font-medium">Team Manager</p>
                        <p className="text-xs text-muted-foreground">Please confirm your availability for next month's tournament.</p>
                      </div>
                      <Button size="sm" className="w-full mt-2" onClick={clearMessages}>
                        Mark all as read
                      </Button>
                    </>
                  ) : (
                    <p className="text-muted-foreground">No new messages</p>
                  )}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button variant="outline" size="icon">
          <Calendar className="h-4 w-4" />
        </Button>
        <Avatar>
          <AvatarImage src={athleteData.profileImage || "/placeholder.svg?height=40&width=40"} />
          <AvatarFallback>{getInitials(athleteData.name)}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

