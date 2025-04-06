"use client"

import { useState } from "react"
import Link from "next/link"
import { useMockData } from "@/lib/context/mock-data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Heart, MessageSquare, Share2, BarChart, ThumbsUp, UserPlus, MessageCircle, Calendar, User, Users, Globe, Settings, ChevronRight, PlusCircle, Image as ImageIcon, MoreHorizontal, Video, FilePlus, File, Upload, Clock, Star, TrendingUp, Award, CheckCircle2, Flag, MapPin, Home, CalendarRange, Mail, Search } from "lucide-react"

export default function SportlinkPage() {
  const { athleteData, sportlinkConnections, addSportlinkConnection } = useMockData()
  const [postInput, setPostInput] = useState("")
  
  // Mock feed posts
  const feedPosts = [
    {
      id: "post1",
      user: {
        name: "Virat Kohli",
        avatar: "/placeholders/avatars/avatar-2.png",
        position: "Batsman",
        sport: "Cricket",
        verified: true
      },
      content: "Just finished an intense training session focusing on my pull shot. The upcoming series against Australia will be challenging, but I'm feeling confident with the progress.",
      images: ["/placeholders/images/training-1.jpg"],
      likes: 3245,
      comments: 423,
      shares: 189,
      time: "2h ago"
    },
    {
      id: "post2",
      user: {
        name: "P.V. Sindhu",
        avatar: "/placeholders/avatars/avatar-3.png",
        position: "Player",
        sport: "Badminton",
        verified: true
      },
      content: "Excited to announce my partnership with SportsTech for the upcoming season! Their cutting-edge equipment has been a game-changer for my training. Looking forward to reaching new heights together! #Sponsored #NewBeginnings",
      images: ["/placeholders/images/sponsorship.jpg"],
      likes: 2156,
      comments: 246,
      shares: 134,
      time: "5h ago"
    },
    {
      id: "post3",
      user: {
        name: "National Sports Academy",
        avatar: "/placeholders/avatars/avatar-4.png",
        position: "Organization",
        sport: "Multi-Sport",
        verified: true
      },
      content: "We're proud to announce our new youth development program starting next month. This initiative aims to identify and nurture young talent across various sports. Applications are now open for athletes aged 12-16.",
      likes: 876,
      comments: 92,
      shares: 245,
      time: "Yesterday"
    },
    {
      id: "post4",
      user: {
        name: athleteData.name,
        avatar: athleteData.avatar || "/placeholders/avatars/avatar-1.png",
        position: athleteData.position || "Player",
        sport: athleteData.sport,
        verified: false
      },
      content: "Just analyzed my performance metrics for the last season. The improvement in my consistency is clearly visible in the data. Thanks to the coaching staff for their guidance!",
      images: ["/placeholders/images/chart-1.jpg"],
      likes: 138,
      comments: 24,
      shares: 11,
      time: "2d ago"
    }
  ];
  
  // Mock activities
  const recentActivities = [
    {
      id: "act1",
      type: "performance",
      title: "New personal best!",
      description: "You've achieved a new personal best in sprint metrics.",
      time: "1h ago",
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      id: "act2",
      type: "connection",
      title: "New connection",
      description: "You connected with Rahul Dravid.",
      time: "3h ago",
      icon: <UserPlus className="h-4 w-4" />
    },
    {
      id: "act3",
      type: "award",
      title: "Achievement unlocked",
      description: "You earned the 'Consistency Champion' badge.",
      time: "Yesterday",
      icon: <Award className="h-4 w-4" />
    },
    {
      id: "act4",
      type: "event",
      title: "Tournament registration",
      description: "You registered for the Regional Championships.",
      time: "3d ago",
      icon: <Calendar className="h-4 w-4" />
    }
  ];
  
  // Mock suggested connections
  const suggestedConnections = [
    {
      id: "sug1",
      name: "Sachin Tendulkar",
      avatar: "/placeholders/avatars/avatar-5.png",
      position: "Former Cricketer",
      mutualConnections: 18,
      verified: true
    },
    {
      id: "sug2",
      name: "Saina Nehwal",
      avatar: "/placeholders/avatars/avatar-6.png",
      position: "Badminton Player",
      mutualConnections: 7,
      verified: true
    },
    {
      id: "sug3",
      name: "Sports Authority of India",
      avatar: "/placeholders/avatars/avatar-7.png",
      position: "Organization",
      mutualConnections: 25,
      verified: true
    }
  ];
  
  // Mock upcoming events
  const upcomingEvents = [
    {
      id: "event1",
      title: "Annual Sports Conference",
      date: "Jun 15, 2023",
      location: "National Sports Complex, Delhi",
      attending: 156
    },
    {
      id: "event2",
      title: "Athlete Networking Mixer",
      date: "Jun 22, 2023",
      location: "The Sports Club, Mumbai",
      attending: 89
    }
  ];
  
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!postInput.trim()) return
    
    toast.success("Post shared successfully!")
    setPostInput("")
  }
  
  const handleConnect = (connectionId: string) => {
    toast.success("Connection request sent", {
      description: "You'll receive a notification when they respond",
      action: {
        label: "Undo",
        onClick: () => {
          toast.info("Connection request cancelled")
        }
      }
    })
  }
  
  const handleAddConnection = () => {
    const newConnection = addSportlinkConnection()
    if (newConnection) {
      toast.success(`Connected with ${newConnection.name}`)
    }
  }
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Navigation Bar */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Link href="/sportlink">
          <Button variant="ghost" className="gap-2">
            <Home className="h-4 w-4" /> Home
          </Button>
        </Link>
        <Link href="/sportlink/network">
          <Button variant="ghost" className="gap-2">
            <Users className="h-4 w-4" /> Network
          </Button>
        </Link>
        <Link href="/sportlink/messages">
          <Button variant="ghost" className="gap-2">
            <Mail className="h-4 w-4" /> Messages
          </Button>
        </Link>
        <Link href="/sportlink/profile/edit">
          <Button variant="ghost" className="gap-2">
            <User className="h-4 w-4" /> Profile
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Profile Summary */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">My Profile</CardTitle>
              <Link href="/sportlink/profile/edit">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex flex-col items-center">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src={athleteData.avatar || "/placeholders/avatars/avatar-1.png"} alt={athleteData.name} />
                  <AvatarFallback>{athleteData.name?.charAt(0) || "A"}</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-1 right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-background"></span>
              </div>
              <h3 className="font-medium text-lg mt-3">{athleteData.name}</h3>
              <p className="text-sm text-muted-foreground">
                {athleteData.position || "Player"} • {athleteData.sport}
              </p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {athleteData.location || "Mumbai, India"}
              </p>
              
              <div className="w-full mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="border rounded-md p-2">
                  <div className="font-medium">{sportlinkConnections.length}</div>
                  <div className="text-xs text-muted-foreground">Connections</div>
                </div>
                <div className="border rounded-md p-2">
                  <div className="font-medium">28</div>
                  <div className="text-xs text-muted-foreground">Posts</div>
                </div>
                <div className="border rounded-md p-2">
                  <div className="font-medium">4</div>
                  <div className="text-xs text-muted-foreground">Events</div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="w-full">
                <h4 className="text-sm font-medium mb-2">Quick Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Profile Strength</span>
                    <span className="font-medium">82%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: "82%" }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span>Post Engagement</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-green-600 h-full rounded-full" style={{ width: "68%" }}></div>
                  </div>
                </div>
              </div>
              
              <Link href="/sportlink/profile/edit" className="w-full mt-4">
                <Button variant="outline" className="w-full mt-2" size="sm">
                  Edit Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-4">
          {/* Create Post */}
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handlePostSubmit}>
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src={athleteData.avatar || "/placeholders/avatars/avatar-1.png"} alt={athleteData.name} />
                    <AvatarFallback>{athleteData.name?.charAt(0) || "A"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input
                      placeholder="Share an update or insight..."
                      className="rounded-full bg-muted border-0"
                      value={postInput}
                      onChange={(e) => setPostInput(e.target.value)}
                    />
                    <div className="flex mt-3 gap-1 flex-wrap">
                      <Button type="button" variant="ghost" size="sm" className="text-muted-foreground gap-1">
                        <ImageIcon className="h-4 w-4" /> Photos
                      </Button>
                      <Button type="button" variant="ghost" size="sm" className="text-muted-foreground gap-1">
                        <Video className="h-4 w-4" /> Video
                      </Button>
                      <Button type="button" variant="ghost" size="sm" className="text-muted-foreground gap-1">
                        <File className="h-4 w-4" /> Document
                      </Button>
                      <Button type="button" variant="ghost" size="sm" className="text-muted-foreground gap-1">
                        <BarChart className="h-4 w-4" /> Statistics
                      </Button>
                      <div className="flex-1 flex justify-end">
                        <Button type="submit" size="sm" disabled={!postInput.trim()}>
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Feed Posts */}
          <div className="space-y-4">
            {feedPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={post.user.avatar} alt={post.user.name} />
                        <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{post.user.name}</span>
                          {post.user.verified && (
                            <CheckCircle2 className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {post.user.position} • {post.user.sport}
                        </p>
                        <div className="text-xs text-muted-foreground">{post.time}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm mb-3">{post.content}</p>
                  {post.images && post.images.length > 0 && (
                    <div className={`rounded-lg overflow-hidden ${post.images.length > 1 ? 'grid grid-cols-2 gap-1' : ''}`}>
                      {post.images.map((image, i) => (
                        <img 
                          key={i} 
                          src={image} 
                          alt={`Post by ${post.user.name}`} 
                          className="w-full h-auto object-cover"
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="w-full">
                    <div className="flex justify-between text-sm text-muted-foreground py-2">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments • {post.shares} shares</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between pt-1">
                      <Button variant="ghost" size="sm" className="flex-1 gap-1">
                        <ThumbsUp className="h-4 w-4" /> Like
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1 gap-1">
                        <MessageSquare className="h-4 w-4" /> Comment
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1 gap-1">
                        <Share2 className="h-4 w-4" /> Share
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Connect Tab */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Connect</CardTitle>
                <Link href="/sportlink/network" className="text-sm text-muted-foreground hover:text-primary">
                  See all
                </Link>
              </div>
              <CardDescription>Suggested connections for you</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                {suggestedConnections.map((connection) => (
                  <div key={connection.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={connection.avatar} alt={connection.name} />
                        <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-sm">{connection.name}</span>
                          {connection.verified && (
                            <CheckCircle2 className="h-3 w-3 text-blue-500" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{connection.position}</p>
                        <p className="text-xs text-muted-foreground">{connection.mutualConnections} mutual connections</p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleConnect(connection.id)}
                    >
                      <UserPlus className="h-4 w-4 mr-1" /> Connect
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" size="sm" onClick={handleAddConnection}>
                <Users className="h-4 w-4 mr-1" /> View More
              </Button>
            </CardFooter>
          </Card>
          
          {/* Activity Tab */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`mt-0.5 p-1.5 rounded-full 
                      ${activity.type === 'performance' ? 'bg-blue-100 text-blue-600' : ''}
                      ${activity.type === 'connection' ? 'bg-green-100 text-green-600' : ''}
                      ${activity.type === 'award' ? 'bg-amber-100 text-amber-600' : ''}
                      ${activity.type === 'event' ? 'bg-purple-100 text-purple-600' : ''}
                    `}>
                      {activity.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{activity.title}</h4>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Events Tab */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
                <Button variant="ghost" size="sm">
                  <CalendarRange className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <Card key={event.id}>
                    <CardContent className="p-3">
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar className="h-3.5 w-3.5" /> {event.date}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3.5 w-3.5" /> {event.location}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        {event.attending} people attending
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm" className="flex-1">
                          Interested
                        </Button>
                        <Button size="sm" className="flex-1">
                          Attend
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" size="sm" onClick={() => toast.info("Events calendar coming soon")}>
                See All Events
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
} 