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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { CheckCircle2, MessageCircle, UserPlus, Search, Filter, ArrowUpRight, Users, UsersRound, Bell, MoreHorizontal, X, Mail, CheckCheck, User, UserRound, Building, LocateFixed, Calendar, Clock } from "lucide-react"

export default function NetworkPage() {
  const { sportlinkConnections, addSportlinkConnection } = useMockData()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilterSport, setSelectedFilterSport] = useState<string>("")
  const [selectedFilterPosition, setSelectedFilterPosition] = useState<string>("")
  const [showPendingRequests, setShowPendingRequests] = useState(false)
  const [connectionsView, setConnectionsView] = useState<"grid" | "list">("grid")
  
  // Generate some pending requests
  const pendingRequests = [
    {
      id: "req1",
      name: "Hardik Pandya",
      avatar: "/placeholders/avatars/avatar-7.png",
      position: "All-rounder",
      sport: "Cricket",
      organization: "Mumbai Indians",
      mutualConnections: 15,
      timeSent: "2 days ago"
    },
    {
      id: "req2",
      name: "Smriti Mandhana",
      avatar: "/placeholders/avatars/avatar-8.png",
      position: "Batter",
      sport: "Cricket",
      organization: "Royal Challengers Bangalore",
      mutualConnections: 8,
      timeSent: "5 days ago"
    },
    {
      id: "req3",
      name: "Sunil Chhetri",
      avatar: "/placeholders/avatars/avatar-9.png",
      position: "Forward",
      sport: "Football",
      organization: "Bengaluru FC",
      mutualConnections: 6,
      timeSent: "1 week ago"
    }
  ]

  const suggestedConnections = [
    {
      id: "sug1",
      name: "P.V. Sindhu",
      avatar: "/placeholders/avatars/avatar-10.png",
      position: "Player",
      sport: "Badminton",
      organization: "Hyderabad Hunters",
      mutualConnections: 12,
      reason: "Based on your sport interests"
    },
    {
      id: "sug2",
      name: "R. Ashwin",
      avatar: "/placeholders/avatars/avatar-11.png",
      position: "Bowler",
      sport: "Cricket",
      organization: "Rajasthan Royals",
      mutualConnections: 22,
      reason: "People also connect with"
    },
    {
      id: "sug3",
      name: "Neeraj Chopra",
      avatar: "/placeholders/avatars/avatar-12.png",
      position: "Javelin Thrower",
      sport: "Athletics",
      organization: "Olympic Gold Medalist",
      mutualConnections: 5,
      reason: "In your extended network"
    },
    {
      id: "sug4",
      name: "Sania Mirza",
      avatar: "/placeholders/avatars/avatar-3.png",
      position: "Player",
      sport: "Tennis",
      organization: "Professional Tennis Player",
      mutualConnections: 8,
      reason: "You may know"
    }
  ]

  // Filter connections based on search query and selected filters
  const filteredConnections = sportlinkConnections.filter(connection => {
    const matchesSearch = searchQuery.trim() === "" || 
      connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.sport.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesSport = selectedFilterSport === "all-sports" || selectedFilterSport === "" || 
      connection.sport === selectedFilterSport
    
    const matchesPosition = selectedFilterPosition === "all-positions" || selectedFilterPosition === "" || 
      connection.position.includes(selectedFilterPosition)
    
    return matchesSearch && matchesSport && matchesPosition
  })

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

  const handleAcceptRequest = (requestId: string) => {
    toast.success("Connection request accepted")
    setShowPendingRequests(false)
  }

  const handleIgnoreRequest = (requestId: string) => {
    toast.info("Connection request ignored")
    setShowPendingRequests(false)
  }

  const handleAddConnection = () => {
    const newConnection = addSportlinkConnection();
    if (newConnection) {
      toast.success(`Connected with ${newConnection.name}`);
    } else {
      toast.success("New connection added");
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Network</h1>
          <p className="text-muted-foreground">
            Build your professional network and discover new opportunities
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Connections
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Connections</DialogTitle>
                <DialogDescription>
                  Find athletes and professionals to grow your network
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Search by name, team, or position..." 
                    className="flex-1" 
                  />
                  <Button size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4 mt-2">
                  {suggestedConnections.map((connection) => (
                    <div 
                      key={connection.id} 
                      className="flex items-center justify-between border rounded-lg p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={connection.avatar} alt={connection.name} />
                          <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{connection.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {connection.position} • {connection.sport}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {connection.mutualConnections} mutual connections
                          </p>
                        </div>
                      </div>
                      <Button size="sm" onClick={() => handleConnect(connection.id)}>
                        Connect
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleAddConnection}>
                  Find More
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog open={showPendingRequests} onOpenChange={setShowPendingRequests}>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <Bell className="mr-2 h-4 w-4" />
                Pending ({pendingRequests.length})
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Pending Connection Requests</AlertDialogTitle>
                <AlertDialogDescription>
                  You have {pendingRequests.length} pending connection requests
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {pendingRequests.map((request) => (
                  <div 
                    key={request.id} 
                    className="flex items-center justify-between border rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={request.avatar} alt={request.name} />
                        <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{request.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {request.position} • {request.sport}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Sent {request.timeSent}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleIgnoreRequest(request.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleAcceptRequest(request.id)}
                      >
                        <CheckCheck className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
                <AlertDialogAction>View All</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Tabs defaultValue="connections" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="connections">My Connections</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
        </TabsList>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search connections..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Select
              value={selectedFilterSport}
              onValueChange={setSelectedFilterSport}
            >
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-sports">All Sports</SelectItem>
                <SelectItem value="Cricket">Cricket</SelectItem>
                <SelectItem value="Football">Football</SelectItem>
                <SelectItem value="Basketball">Basketball</SelectItem>
                <SelectItem value="Tennis">Tennis</SelectItem>
                <SelectItem value="Swimming">Swimming</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedFilterPosition}
              onValueChange={setSelectedFilterPosition}
            >
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-positions">All Positions</SelectItem>
                <SelectItem value="Coach">Coach</SelectItem>
                <SelectItem value="Player">Player</SelectItem>
                <SelectItem value="Analyst">Analyst</SelectItem>
                <SelectItem value="Physio">Physio</SelectItem>
                <SelectItem value="Trainer">Trainer</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex">
              <Button
                variant={connectionsView === "grid" ? "default" : "outline"}
                size="icon"
                className="rounded-r-none"
                onClick={() => setConnectionsView("grid")}
              >
                <Users className="h-4 w-4" />
              </Button>
              <Button
                variant={connectionsView === "list" ? "default" : "outline"}
                size="icon"
                className="rounded-l-none"
                onClick={() => setConnectionsView("list")}
              >
                <UsersRound className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <TabsContent value="connections" className="mt-0">
          {filteredConnections.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <UsersRound className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No connections found</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                Try different search criteria or add new connections
              </p>
              <Button onClick={handleAddConnection}>Find Connections</Button>
            </div>
          ) : connectionsView === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredConnections.map((connection) => (
                <Card key={connection.id} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="h-24 bg-gradient-to-r from-blue-500 to-blue-600" />
                  </CardHeader>
                  <CardContent className="pt-0 pb-6 px-6">
                    <div className="flex justify-between">
                      <Avatar className="h-14 w-14 -mt-7 border-2 border-background">
                        <AvatarImage src={connection.avatar} />
                        <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="flex items-center gap-1 text-xs mt-2">
                        <span className={`w-2 h-2 rounded-full ${connection.isOnline ? 'bg-green-500' : 'bg-gray-300'}`} />
                        {connection.isOnline ? 'Online' : 'Offline'}
                      </span>
                    </div>
                    <div className="mt-2">
                      <h3 className="font-medium text-lg">{connection.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {connection.position} • {connection.sport}
                      </p>
                      <p className="text-muted-foreground text-xs mt-1">
                        {connection.organization}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant="outline" className="rounded-full text-xs">
                        {connection.mutualConnections} mutual
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Connected {new Date(connection.lastActive).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4 flex justify-between">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Link href="/sportlink" className="inline-block">
                      <Button variant="ghost" size="sm">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredConnections.map((connection) => (
                <div 
                  key={connection.id} 
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={connection.avatar} />
                      <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{connection.name}</h3>
                        <span className={`w-2 h-2 rounded-full ${connection.isOnline ? 'bg-green-500' : 'bg-gray-300'}`} />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <UserRound className="h-3 w-3" />
                          {connection.position}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">
                          <Building className="h-3 w-3" />
                          {connection.organization}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">
                          <LocateFixed className="h-3 w-3" />
                          {connection.sport}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {connection.mutualConnections} mutual connections • Connected {new Date(connection.lastActive).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      <span className="hidden md:inline">Message</span>
                    </Button>
                    <Link href="/sportlink" className="inline-block">
                      <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="suggestions">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {suggestedConnections.map((connection) => (
              <Card key={connection.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={connection.avatar} />
                      <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{connection.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {connection.position} • {connection.sport}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">{connection.organization}</p>
                    <p className="text-xs flex items-center gap-1 mt-1">
                      <Users className="h-3 w-3" />
                      {connection.mutualConnections} mutual connections
                    </p>
                    <Badge variant="secondary" className="mt-3 text-xs">
                      {connection.reason}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="border-t flex justify-between pt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast.info("Suggestion dismissed")}
                  >
                    Ignore
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleConnect(connection.id)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="invitations">
          <div className="space-y-4">
            {pendingRequests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No pending invitations</h3>
                <p className="text-muted-foreground mt-1">
                  When someone invites you to connect, you'll see it here
                </p>
              </div>
            ) : (
              pendingRequests.map((request) => (
                <div 
                  key={request.id} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border gap-4"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={request.avatar} alt={request.name} />
                      <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{request.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {request.position} • {request.sport} • {request.organization}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {request.mutualConnections} mutual connections
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Received {request.timeSent}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => handleIgnoreRequest(request.id)}
                    >
                      Ignore
                    </Button>
                    <Button
                      onClick={() => handleAcceptRequest(request.id)}
                    >
                      Accept
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="groups">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Groups coming soon</h3>
            <p className="text-muted-foreground mt-1 mb-4">
              We're working on bringing you groups feature for team collaboration
            </p>
            <Button onClick={() => toast.info("You'll be notified when groups are available")}>
              Get Notified
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 