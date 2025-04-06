"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ArrowLeft, CalendarClock, UserPlus, Settings } from "lucide-react"
import Link from "next/link"

export default function TeamsComingSoonPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Teams</h1>
          <p className="text-muted-foreground">
            Manage your teams and collaborations
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
      
      <div className="py-16 flex flex-col items-center justify-center text-center">
        <div className="rounded-full bg-muted p-6 mb-6">
          <Users className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Teams Feature Coming Soon</h2>
        <p className="text-muted-foreground max-w-lg mb-8">
          We're working hard to bring you a powerful team collaboration feature. 
          Stay tuned for updates on this exciting addition to help you manage your teams, 
          share insights, and collaborate effectively.
        </p>
        
        <div className="grid gap-6 md:grid-cols-3 max-w-4xl mb-8">
          <Card>
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center rounded-full bg-primary/10">
                <UserPlus className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Team Management</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>
                Create and manage teams with different roles and permissions
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center rounded-full bg-primary/10">
                <CalendarClock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Team Scheduling</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>
                Coordinate team activities, practices, and events in a shared calendar
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center rounded-full bg-primary/10">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Team Analytics</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>
                Analyze team performance metrics and track progress together
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/sportlink">
              <Users className="mr-2 h-4 w-4" />
              Explore SportLink Network
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">
              Return to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 