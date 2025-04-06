"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  DollarSign, 
  Calendar, 
  Users, 
  Star, 
  Video, 
  Edit, 
  Plus,
  ArrowRight,
  Clock,
  ChevronRight,
  Heart,
  BarChart3
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function MonetizePage() {
  const [activeTab, setActiveTab] = useState("consulting")
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Monetize Your Expertise</h1>
          <p className="text-muted-foreground">
            Create revenue streams from your sports knowledge and expertise
          </p>
        </div>
      </div>

      <Tabs defaultValue="consulting" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start mb-4">
          <TabsTrigger value="consulting">Micro-Consulting</TabsTrigger>
          <TabsTrigger value="dashboard">Earnings Dashboard</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="consulting" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Create Session Card */}
            <Card className="md:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle>Create Consulting Session</CardTitle>
                <CardDescription>Offer your expertise to fans and athletes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Session Title</label>
                  <Input placeholder="e.g., Master the Yorker with Expert Tips" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Session Description</label>
                  <textarea 
                    className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Describe what attendees will learn in this session..."
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duration</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>45 minutes</option>
                      <option>60 minutes</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price (₹)</label>
                    <Input placeholder="1500" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Skills & Topics</label>
                  <Input placeholder="e.g., Bowling, Cricket, Technique" />
                </div>
                
                <div className="pt-2">
                  <Button className="w-full gap-2">
                    <Plus className="h-4 w-4" /> Create Consulting Session
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* My Sessions List */}
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold">Your Consulting Sessions</h2>
              
              <Card>
                <CardContent className="p-0">
                  <div className="p-4 flex flex-col md:flex-row gap-4 md:items-center justify-between">
                    <div className="flex gap-4">
                      <div className="rounded-md bg-blue-100 dark:bg-blue-900/30 p-3 flex items-center justify-center">
                        <Video className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Master Batting Technique</h3>
                        <div className="text-sm text-muted-foreground">30 minutes • ₹2,500</div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs ml-1">5.0 (12 reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>8 bookings</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span>₹20,000 earned</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm">View</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-0">
                  <div className="p-4 flex flex-col md:flex-row gap-4 md:items-center justify-between">
                    <div className="flex gap-4">
                      <div className="rounded-md bg-blue-100 dark:bg-blue-900/30 p-3 flex items-center justify-center">
                        <Video className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Mental Toughness for Cricketers</h3>
                        <div className="text-sm text-muted-foreground">45 minutes • ₹3,000</div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <Star className="h-3 w-3 text-gray-300" />
                          <span className="text-xs ml-1">4.0 (7 reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>5 bookings</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span>₹15,000 earned</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm">View</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <h2 className="text-xl font-semibold mt-8">Popular with Fans</h2>
              <p className="text-sm text-muted-foreground -mt-2">Get inspiration from top sessions by other athletes</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    name: "Rahul Dravid",
                    title: "Cricket Technique Mastery",
                    price: "₹5,000",
                    duration: "60 min",
                    rating: 4.9,
                    reviews: 158,
                    image: "RD"
                  },
                  {
                    name: "Harsha Bhogle",
                    title: "Sports Commentary Workshop",
                    price: "₹3,500",
                    duration: "45 min",
                    rating: 4.8,
                    reviews: 124,
                    image: "HB"
                  }
                ].map((session, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${session.image}`} />
                          <AvatarFallback>{session.image}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{session.name}</div>
                          <div className="text-sm text-muted-foreground">Cricket Legend</div>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{session.rating} ({session.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <h3 className="font-medium">{session.title}</h3>
                        <div className="text-sm text-muted-foreground">
                          {session.duration} • {session.price}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹35,000</div>
                <p className="text-xs text-muted-foreground">+₹12,500 this month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Sessions Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">13</div>
                <p className="text-xs text-muted-foreground">+4 this month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.7</div>
                <div className="flex mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 fill-opacity-70" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Next: Tomorrow, 10:00 AM</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground mt-2">Earnings chart will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Akash Chopra",
                      session: "Master Batting Technique",
                      date: "March 25, 2025",
                      amount: "₹2,500",
                      status: "Completed"
                    },
                    {
                      name: "Ravi Kumar",
                      session: "Mental Toughness for Cricketers",
                      date: "March 23, 2025",
                      amount: "₹3,000",
                      status: "Completed"
                    },
                    {
                      name: "Priya Sharma",
                      session: "Master Batting Technique",
                      date: "March 20, 2025",
                      amount: "₹2,500",
                      status: "Completed"
                    }
                  ].map((tx, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-3">
                      <div className="flex gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`/placeholder.svg?height=36&width=36&text=${tx.name.split(' ').map(n => n[0]).join('')}`} />
                          <AvatarFallback>{tx.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{tx.name}</div>
                          <div className="text-xs text-muted-foreground">{tx.session}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{tx.amount}</div>
                        <div className="text-xs text-muted-foreground">{tx.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Popular Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Master Batting Technique", bookings: 8, amount: "₹20,000" },
                    { name: "Mental Toughness for Cricketers", bookings: 5, amount: "₹15,000" }
                  ].map((session, i) => (
                    <div key={i} className="space-y-1">
                      <h3 className="font-medium">{session.name}</h3>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{session.bookings} bookings</span>
                        <span>{session.amount}</span>
                      </div>
                      <Progress value={i === 0 ? 70 : 30} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Your scheduled consulting sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Ravi Patel",
                    session: "Master Batting Technique",
                    date: "March 29, 2025",
                    time: "10:00 AM",
                    duration: "30 min",
                    price: "₹2,500",
                    status: "Confirmed"
                  },
                  {
                    name: "Anil Kumar",
                    session: "Mental Toughness for Cricketers",
                    date: "March 30, 2025",
                    time: "2:00 PM",
                    duration: "45 min",
                    price: "₹3,000",
                    status: "Confirmed"
                  },
                  {
                    name: "Sunita Verma",
                    session: "Master Batting Technique",
                    date: "April 2, 2025",
                    time: "11:30 AM",
                    duration: "30 min",
                    price: "₹2,500",
                    status: "Confirmed"
                  }
                ].map((booking, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex justify-between">
                        <div className="flex gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${booking.name.split(' ').map(n => n[0]).join('')}`} />
                            <AvatarFallback>{booking.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{booking.name}</h3>
                            <div className="text-sm">{booking.session}</div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <Calendar className="h-3 w-3" />
                              <span>{booking.date} • {booking.time} • {booking.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="mb-2">{booking.status}</Badge>
                          <div className="font-medium">{booking.price}</div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" size="sm">Reschedule</Button>
                        <Button size="sm" className="gap-1">
                          <Video className="h-4 w-4" /> Start Session
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Past Sessions</CardTitle>
              <CardDescription>History of your completed consulting sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Akash Chopra",
                    session: "Master Batting Technique",
                    date: "March 25, 2025",
                    time: "3:00 PM",
                    duration: "30 min",
                    price: "₹2,500",
                    rating: 5
                  },
                  {
                    name: "Ravi Kumar",
                    session: "Mental Toughness for Cricketers",
                    date: "March 23, 2025",
                    time: "11:00 AM",
                    duration: "45 min",
                    price: "₹3,000",
                    rating: 4
                  }
                ].map((session, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="flex gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${session.name.split(' ').map(n => n[0]).join('')}`} />
                            <AvatarFallback>{session.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{session.name}</h3>
                            <div className="text-sm">{session.session}</div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <Calendar className="h-3 w-3" />
                              <span>{session.date} • {session.time} • {session.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="md:text-right">
                          <div className="flex md:justify-end items-center gap-1 mb-1">
                            {Array(session.rating).fill(0).map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                            {Array(5 - session.rating).fill(0).map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-gray-300" />
                            ))}
                          </div>
                          <div className="font-medium">{session.price}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 