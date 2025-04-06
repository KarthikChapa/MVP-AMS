"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  GraduationCap, 
  Award, 
  Clock, 
  Users, 
  CheckCircle, 
  Star, 
  Search,
  ArrowRight,
  Play,
  FileText,
  BookOpen
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function LearningPage() {
  const [activeTab, setActiveTab] = useState("courses")
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Learning Hub</h1>
          <p className="text-muted-foreground">
            Develop your skills and prepare for your next career move
          </p>
        </div>
      </div>

      <Tabs defaultValue="courses" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start mb-4">
          <TabsTrigger value="courses">Certification Courses</TabsTrigger>
          <TabsTrigger value="skills">Skill Endorsements</TabsTrigger>
          <TabsTrigger value="mycourses">My Learning</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-3 flex items-center gap-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search courses, skills, institutions..." 
              className="border-0 focus-visible:ring-0 placeholder:text-muted-foreground flex-1"
            />
            <Button>Search</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filters */}
            <Card className="md:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Filter Courses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Course Type</h3>
                  <div className="space-y-1">
                    {["Certificate Programs", "Short Courses", "Workshops", "Masterclasses"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <input type="checkbox" id={`type-${type.toLowerCase().replace(/\s+/g, '-')}`} className="h-4 w-4" />
                        <label htmlFor={`type-${type.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm">{type}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t">
                  <h3 className="text-sm font-medium">Category</h3>
                  <div className="space-y-1">
                    {[
                      "Sports Management", 
                      "Media & Broadcasting", 
                      "Coaching & Training", 
                      "Sports Technology",
                      "Business & Entrepreneurship"
                    ].map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <input type="checkbox" id={`category-${category.toLowerCase().replace(/\s+/g, '-')}`} className="h-4 w-4" />
                        <label htmlFor={`category-${category.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm">{category}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t">
                  <h3 className="text-sm font-medium">Duration</h3>
                  <div className="space-y-1">
                    {["Under 2 weeks", "2-4 weeks", "1-3 months", "3+ months"].map((duration) => (
                      <div key={duration} className="flex items-center space-x-2">
                        <input type="checkbox" id={`duration-${duration.toLowerCase().replace(/\s+/g, '-')}`} className="h-4 w-4" />
                        <label htmlFor={`duration-${duration.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm">{duration}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <Button className="w-full" size="sm">Apply Filters</Button>
                </div>
              </CardContent>
            </Card>

            {/* Course Listings */}
            <div className="md:col-span-3 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Recommended for You</h2>
                <select className="text-sm rounded-md border border-input bg-background px-3 py-1">
                  <option>Sort by: Relevance</option>
                  <option>Sort by: Popularity</option>
                  <option>Sort by: Newest</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Featured Course */}
                <Card className="md:col-span-2 border-blue-200 dark:border-blue-800">
                  <div className="md:flex">
                    <div className="md:w-2/5 bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-center p-6">
                      <div className="text-center">
                        <GraduationCap className="h-16 w-16 mx-auto mb-4" />
                        <h3 className="text-xl font-bold">Sports Management Certificate</h3>
                        <p className="text-blue-100">Indian School of Business</p>
                      </div>
                    </div>
                    <div className="md:w-3/5 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold">Sports Management Certificate</h3>
                          <p className="text-sm text-muted-foreground">Indian School of Business</p>
                        </div>
                        <Badge className="bg-blue-600">Featured</Badge>
                      </div>
                      <div className="space-y-3">
                        <p className="text-sm">
                          Learn the business of sports with this comprehensive program designed specifically for athletes 
                          transitioning to management roles. Covers sports marketing, operations, finance, and leadership.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">8 weeks</Badge>
                          <Badge variant="secondary">Online</Badge>
                          <Badge variant="secondary">Certificate</Badge>
                        </div>
                        <div className="flex justify-between items-center pt-4">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">1,240+ enrolled</span>
                          </div>
                          <Button>Enroll Now</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {[
                  {
                    title: "Cricket Commentary Masterclass",
                    institution: "Star Sports Academy",
                    description: "Learn the art of cricket commentary from industry professionals. Master game analysis, storytelling, and on-air presentation.",
                    duration: "4 weeks",
                    format: "Online",
                    type: "Masterclass",
                    enrolled: 890,
                    rating: 4.8
                  },
                  {
                    title: "Sports Analytics Foundations",
                    institution: "IIT Delhi",
                    description: "Develop skills in sports data analysis, including performance metrics, predictive modeling, and data visualization.",
                    duration: "6 weeks",
                    format: "Online",
                    type: "Certificate",
                    enrolled: 730,
                    rating: 4.6
                  },
                  {
                    title: "Athlete to Entrepreneur",
                    institution: "National Institute of Sports Business",
                    description: "Transform your athletic experience into business success. Learn startup fundamentals, business planning, and sports venture creation.",
                    duration: "12 weeks",
                    format: "Hybrid",
                    type: "Certificate",
                    enrolled: 520,
                    rating: 4.7
                  },
                  {
                    title: "Sports Media Production",
                    institution: "Film and Television Institute of India",
                    description: "Learn video production, editing, and content creation for sports media. Ideal for athletes looking to transition to media roles.",
                    duration: "8 weeks",
                    format: "Online",
                    type: "Certificate",
                    enrolled: 450,
                    rating: 4.5
                  }
                ].map((course, i) => (
                  <Card key={i}>
                    <CardContent className="p-0">
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-semibold">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">{course.institution}</p>
                        </div>
                        <p className="text-sm">{course.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{course.duration}</Badge>
                          <Badge variant="secondary">{course.format}</Badge>
                          <Badge variant="secondary">{course.type}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            {Array(5).fill(0).map((_, j) => (
                              <Star key={j} className={`h-3 w-3 ${j < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                            <span className="ml-1">{course.rating}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{course.enrolled}+ enrolled</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end p-3 border-t">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Play className="h-3 w-3" /> Preview
                        </Button>
                        <Button size="sm" className="ml-2">View Course</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center mt-6">
                <Button variant="outline">View All Courses</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skill Endorsements</CardTitle>
              <CardDescription>Validate your skills through endorsements from coaches and peers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex gap-4 items-start">
                  <Award className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200">LinkedIn-Style Skill Verification</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Get your sports skills endorsed by coaches, teammates, and industry professionals. 
                      Verified skills make your profile stand out to potential employers.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Your Top Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Batting Technique", endorsements: 28, verified: true },
                    { name: "Leadership", endorsements: 22, verified: true },
                    { name: "Game Strategy", endorsements: 18, verified: false },
                    { name: "Fielding", endorsements: 15, verified: true }
                  ].map((skill, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium flex items-center">
                              {skill.name}
                              {skill.verified && (
                                <CheckCircle className="h-4 w-4 text-blue-600 ml-2" />
                              )}
                            </h4>
                            <div className="text-sm text-muted-foreground">{skill.endorsements} endorsements</div>
                          </div>
                          <Button variant="outline" size="sm">Request Endorsement</Button>
                        </div>

                        <div className="mt-3 pt-3 border-t">
                          <h5 className="text-sm font-medium mb-2">Top Endorsers</h5>
                          <div className="flex -space-x-2">
                            {Array(3).fill(0).map((_, j) => (
                              <Avatar key={j} className="border-2 border-background h-8 w-8">
                                <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${String.fromCharCode(65 + j)}`} />
                                <AvatarFallback>{String.fromCharCode(65 + j)}</AvatarFallback>
                              </Avatar>
                            ))}
                            {skill.endorsements > 3 && (
                              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-xs">
                                +{skill.endorsements - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Add New Skills</h3>
                <div className="flex gap-3">
                  <Input placeholder="Enter a skill (e.g., Cricket Analytics, Public Speaking)" className="flex-1" />
                  <Button>Add Skill</Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Pending Verification Requests</h3>
                <div className="space-y-3">
                  {[
                    { 
                      skill: "Game Strategy", 
                      requestedFrom: "Rahul Dravid",
                      role: "Head Coach, National Cricket Academy",
                      date: "March 25, 2025" 
                    },
                    { 
                      skill: "Team Communication", 
                      requestedFrom: "Anil Kumble",
                      role: "Former India Captain",
                      date: "March 23, 2025" 
                    }
                  ].map((request, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="flex justify-between">
                          <div className="flex gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${request.requestedFrom.split(' ').map(n => n[0]).join('')}`} />
                              <AvatarFallback>{request.requestedFrom.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{request.skill}</div>
                              <div className="text-sm">Requested from: {request.requestedFrom}</div>
                              <div className="text-xs text-muted-foreground">{request.role}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">Pending</Badge>
                            <div className="text-xs text-muted-foreground mt-1">Sent: {request.date}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mycourses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Learning</CardTitle>
              <CardDescription>Track your progress in enrolled courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">In Progress</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      {
                        title: "Sports Management Fundamentals",
                        institution: "Indian School of Business",
                        progress: 65,
                        nextLesson: "Sports Marketing Strategy",
                        lastActivity: "2 days ago"
                      },
                      {
                        title: "Media Training for Athletes",
                        institution: "Star Sports Academy",
                        progress: 30,
                        nextLesson: "On-Camera Interview Techniques",
                        lastActivity: "1 week ago"
                      }
                    ].map((course, i) => (
                      <Card key={i}>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-1">
                              <h4 className="font-medium">{course.title}</h4>
                              <p className="text-sm text-muted-foreground">{course.institution}</p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>Last activity: {course.lastActivity}</span>
                              </div>
                            </div>
                            <div className="md:text-right md:min-w-40">
                              <div className="text-sm">Progress: {course.progress}%</div>
                              <Progress value={course.progress} className="h-2 my-2" />
                              <div className="text-xs text-muted-foreground">Next: {course.nextLesson}</div>
                            </div>
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button size="sm" className="gap-1">
                              <Play className="h-3 w-3" /> Continue Learning
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Completed</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      {
                        title: "Public Speaking for Athletes",
                        institution: "Communication Academy",
                        completed: "February 15, 2025",
                        grade: "A",
                        certificate: true
                      }
                    ].map((course, i) => (
                      <Card key={i}>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-1">
                              <h4 className="font-medium">{course.title}</h4>
                              <p className="text-sm text-muted-foreground">{course.institution}</p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <CheckCircle className="h-3 w-3" />
                                <span>Completed: {course.completed}</span>
                              </div>
                            </div>
                            <div className="md:text-right">
                              <div className="flex md:justify-end items-center gap-2">
                                <Badge className="bg-green-600">Grade: {course.grade}</Badge>
                                {course.certificate && (
                                  <Badge variant="outline">Certificate Available</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end mt-4 gap-2">
                            <Button variant="outline" size="sm" className="gap-1">
                              <FileText className="h-3 w-3" /> View Certificate
                            </Button>
                            <Button size="sm" className="gap-1">
                              <BookOpen className="h-3 w-3" /> Review Materials
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 