"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useMockData } from "@/lib/context/mock-data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Phone, Video, Paperclip, Send, MoreHorizontal, Info, Users, Star, Image, File, Check, CheckCheck, Plus, Smile, Mic } from "lucide-react"
import { toast } from "sonner"

export default function MessagesPage() {
  const { sportlinkConnections, sportlinkMessages, addSportlinkMessage } = useMockData()
  const [selectedContact, setSelectedContact] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("chats")

  // Sort connections by last message time
  const sortedConnections = [...sportlinkConnections].sort((a, b) => {
    const aLastMessage = sportlinkMessages.filter(m => m.connectionId === a.id).pop()
    const bLastMessage = sportlinkMessages.filter(m => m.connectionId === b.id).pop()
    if (!aLastMessage) return 1
    if (!bLastMessage) return -1
    return new Date(bLastMessage.timestamp).getTime() - new Date(aLastMessage.timestamp).getTime()
  }).reverse()

  // Filter connections based on search
  const filteredConnections = sortedConnections.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.sport.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Get messages for selected contact
  const contactMessages = selectedContact 
    ? sportlinkMessages.filter(m => m.connectionId === selectedContact.id)
    : []

  // Auto-select first contact if none selected
  useEffect(() => {
    if (!selectedContact && sortedConnections.length > 0) {
      setSelectedContact(sortedConnections[0])
    }
  }, [selectedContact, sortedConnections])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [contactMessages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return
    
    addSportlinkMessage(selectedContact, newMessage)
    setNewMessage("")
    
    // Simulate received message after delay
    if (Math.random() > 0.3) {
      setTimeout(() => {
        const responses = [
          "Got it, thanks for letting me know!",
          "That sounds great! When do you want to meet?",
          "I'll check my schedule and get back to you.",
          "Thanks for the update. Looking forward to it!",
          "I appreciate you reaching out. Let's discuss more tomorrow.",
          "Perfect timing! I was just thinking about that.",
          "Interesting point. I'll consider that for our next session.",
          "Can you send me more details about that?",
          "I'm available next week if that works for you.",
          "Let me check with the team and I'll let you know."
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        addSportlinkMessage(selectedContact, randomResponse, false)
      }, 2000 + Math.random() * 3000)
    }
  }

  const getLastMessage = (connectionId: string) => {
    const messages = sportlinkMessages.filter(m => m.connectionId === connectionId)
    return messages.length > 0 ? messages[messages.length - 1] : null
  }

  const getLastMessageTime = (message: any) => {
    if (!message) return ""
    
    const messageDate = new Date(message.timestamp)
    const now = new Date()
    
    // If today, return time
    if (messageDate.toDateString() === now.toDateString()) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    // If this week, return day name
    const diffDays = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays < 7) {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][messageDate.getDay()]
    }
    
    // Otherwise return date
    return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }

  return (
    <div className="flex-1 p-0 flex h-[calc(100vh-65px)]">
      {/* Sidebar - Contact List */}
      <div className="w-full sm:w-80 border-r flex flex-col h-full">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Messages</h1>
          <p className="text-sm text-muted-foreground">
            Stay connected with your network
          </p>
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="chats" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start px-4 pt-2 bg-transparent">
            <TabsTrigger value="chats" className="flex-1">Chats</TabsTrigger>
            <TabsTrigger value="calls" className="flex-1">Calls</TabsTrigger>
            <TabsTrigger value="requests" className="flex-1">Requests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chats" className="flex-1 flex flex-col m-0 p-0 h-full">
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-sm font-medium">Recent Messages</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="flex-1">
              {filteredConnections.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-8 px-4 text-center">
                  <Search className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="font-medium">No conversations found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try a different search term or start a new chat
                  </p>
                </div>
              ) : (
                <div className="space-y-1 p-1">
                  {filteredConnections.map((contact) => {
                    const lastMessage = getLastMessage(contact.id)
                    const unreadCount = lastMessage && !lastMessage.isFromMe && !lastMessage.read ? 1 : 0
                    
                    return (
                      <button
                        key={contact.id}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left ${
                          selectedContact?.id === contact.id 
                            ? "bg-muted" 
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedContact(contact)}
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={contact.avatar} />
                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {contact.isOnline && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <span className="font-medium truncate">{contact.name}</span>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-1">
                              {lastMessage ? getLastMessageTime(lastMessage) : ""}
                            </span>
                          </div>
                          {lastMessage && (
                            <div className="flex items-center">
                              <p className="text-sm truncate text-muted-foreground flex-1">
                                {lastMessage.isFromMe && (
                                  <span className="mr-1 text-xs">
                                    {lastMessage.read ? (
                                      <CheckCheck className="h-3 w-3 inline text-blue-500" />
                                    ) : (
                                      <Check className="h-3 w-3 inline" />
                                    )}
                                  </span>
                                )}
                                {lastMessage.content}
                              </p>
                              {unreadCount > 0 && (
                                <Badge variant="default" className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                                  {unreadCount}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="calls" className="flex-1 m-0 p-0">
            <div className="flex flex-col items-center justify-center h-full py-8 px-4 text-center">
              <Phone className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="font-medium">Call history</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                No recent calls to display
              </p>
              <Button onClick={() => toast.info("Call feature coming soon!")}>
                Start a Call
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="requests" className="flex-1 m-0 p-0">
            <div className="flex flex-col items-center justify-center h-full py-8 px-4 text-center">
              <Users className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="font-medium">Message Requests</h3>
              <p className="text-sm text-muted-foreground mt-1">
                When someone you're not connected with sends you a message, you'll see it here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Main Chat Area */}
      <div className="hidden sm:flex flex-col flex-1 h-full overflow-hidden">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedContact.avatar} />
                  <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-medium">{selectedContact.name}</h2>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    {selectedContact.isOnline ? (
                      <><span className="w-2 h-2 bg-green-500 rounded-full"></span> Online</>
                    ) : (
                      "Last active recently"
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => toast.info("Call feature coming soon!")}>
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => toast.info("Video call feature coming soon!")}>
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => toast.info("Contact info")}>
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {contactMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Send className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium">No messages yet</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Send a message to start the conversation
                    </p>
                  </div>
                ) : (
                  contactMessages.map((message, i) => {
                    // Group consecutive messages from same sender
                    const prevMessage = i > 0 ? contactMessages[i - 1] : null
                    const showAvatar = !prevMessage || prevMessage.isFromMe !== message.isFromMe
                    const showTimestamp = !prevMessage || 
                      new Date(message.timestamp).getTime() - new Date(prevMessage.timestamp).getTime() > 10 * 60 * 1000
                    
                    return (
                      <div key={message.id} className="space-y-2">
                        {showTimestamp && (
                          <div className="flex justify-center my-4">
                            <span className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">
                              {new Date(message.timestamp).toLocaleString([], {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        )}
                        <div className={`flex ${message.isFromMe ? 'justify-end' : 'justify-start'}`}>
                          <div className="flex gap-2 max-w-[80%]">
                            {!message.isFromMe && showAvatar && (
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={selectedContact.avatar} />
                                <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            )}
                            <div className={`${!message.isFromMe && !showAvatar ? 'ml-10' : ''} space-y-1`}>
                              <div className={`p-3 rounded-lg ${
                                message.isFromMe 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted'
                              }`}>
                                <p className="text-sm">{message.content}</p>
                              </div>
                              {message.isFromMe && (
                                <div className="flex justify-end pr-1">
                                  <span className="text-xs text-muted-foreground">
                                    {message.read ? (
                                      <CheckCheck className="h-3 w-3 inline text-blue-500" />
                                    ) : (
                                      <Check className="h-3 w-3 inline" />
                                    )}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            {/* Chat Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => toast.info("Attachment feature coming soon")}>
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => toast.info("Emoji picker coming soon")}>
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  placeholder="Type a message..."
                  className="flex-1"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => toast.info("Voice message feature coming soon")}>
                  <Mic className="h-4 w-4" />
                </Button>
                <Button 
                  className="h-9 px-3" 
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="max-w-md text-center p-6">
              <Send className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
              <h2 className="text-xl font-bold mb-2">Your Messages</h2>
              <p className="text-muted-foreground mb-4">
                Select a conversation or start a new one to begin messaging with people in your network
              </p>
              <Button onClick={() => {
                if (sportlinkConnections.length > 0) {
                  setSelectedContact(sportlinkConnections[0])
                } else {
                  toast.info("Connect with people first to message them")
                }
              }}>
                Start a Conversation
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Mobile selected contact view - Shown only when a contact is selected on mobile */}
      {selectedContact && activeTab === "chats" && (
        <div className="fixed inset-0 bg-background z-50 sm:hidden flex flex-col">
          {/* Mobile chat header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 mr-1" 
                onClick={() => setSelectedContact(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src={selectedContact.avatar} />
                <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium text-sm">{selectedContact.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {selectedContact.isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Mobile chat messages */}
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-4">
              {contactMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Send className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium">No messages yet</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Send a message to start the conversation
                  </p>
                </div>
              ) : (
                contactMessages.map((message, i) => {
                  // Group consecutive messages from same sender
                  const prevMessage = i > 0 ? contactMessages[i - 1] : null
                  const showAvatar = !prevMessage || prevMessage.isFromMe !== message.isFromMe
                  const showTimestamp = !prevMessage || 
                    new Date(message.timestamp).getTime() - new Date(prevMessage.timestamp).getTime() > 10 * 60 * 1000
                  
                  return (
                    <div key={message.id} className="space-y-2">
                      {showTimestamp && (
                        <div className="flex justify-center my-4">
                          <span className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">
                            {new Date(message.timestamp).toLocaleString([], {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      )}
                      <div className={`flex ${message.isFromMe ? 'justify-end' : 'justify-start'}`}>
                        <div className="flex gap-2 max-w-[85%]">
                          {!message.isFromMe && showAvatar && (
                            <Avatar className="h-7 w-7">
                              <AvatarImage src={selectedContact.avatar} />
                              <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div className={`${!message.isFromMe && !showAvatar ? 'ml-9' : ''} space-y-1`}>
                            <div className={`p-2 rounded-lg ${
                              message.isFromMe 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                            }`}>
                              <p className="text-sm">{message.content}</p>
                            </div>
                            {message.isFromMe && (
                              <div className="flex justify-end pr-1">
                                <span className="text-xs text-muted-foreground">
                                  {message.read ? (
                                    <CheckCheck className="h-3 w-3 inline text-blue-500" />
                                  ) : (
                                    <Check className="h-3 w-3 inline" />
                                  )}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          {/* Mobile chat input */}
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Plus className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                className="flex-1"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button 
                className={newMessage.trim() ? "bg-primary" : "bg-muted text-muted-foreground"}
                size="icon"
                disabled={!newMessage.trim()}
                onClick={handleSendMessage}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 