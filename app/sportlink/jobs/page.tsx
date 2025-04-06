"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Briefcase, 
  MapPin, 
  Building, 
  Clock, 
  DollarSign, 
  Filter, 
  Activity,
  Search,
  ArrowRight,
  Bookmark,
  CheckCircle,
  TrendingUp
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function JobBoardPage() {
  const [filterExpanded, setFilterExpanded] = useState(false)
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Career Hub</h1>
          <p className="text-muted-foreground">
            Find opportunities tailored to your skills and explore post-playing career options
          </p>
        </div>
      </div>

      <Tabs defaultValue="jobs" className="w-full">
        <TabsList className="w-full justify-start mb-4">
          <TabsTrigger value="jobs">Job Board</TabsTrigger>
          <TabsTrigger value="pivot">Pivot Advisor</TabsTrigger>
          <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filters sidebar */}
            <div className="md:col-span-1 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Filters</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setFilterExpanded(!filterExpanded)}>
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className={`space-y-4 ${filterExpanded ? '' : 'hidden md:block'}`}>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Job Type</h3>
                    <div className="space-y-2">
                      {["Full-time", "Part-time", "Contract", "Remote"].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox id={`job-type-${type.toLowerCase()}`} />
                          <Label htmlFor={`job-type-${type.toLowerCase()}`}>{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t">
                    <h3 className="text-sm font-medium">Industry</h3>
                    <div className="space-y-2">
                      {[
                        "Sports Management", 
                        "Media & Broadcasting", 
                        "Coaching", 
                        "Sports Technology"
                      ].map((industry) => (
                        <div key={industry} className="flex items-center space-x-2">
                          <Checkbox id={`industry-${industry.toLowerCase().replace(/\s+/g, '-')}`} />
                          <Label htmlFor={`industry-${industry.toLowerCase().replace(/\s+/g, '-')}`}>{industry}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t">
                    <h3 className="text-sm font-medium">Experience Level</h3>
                    <div className="space-y-2">
                      {["Entry Level", "Mid Level", "Senior", "Director"].map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <Checkbox id={`level-${level.toLowerCase().replace(/\s+/g, '-')}`} />
                          <Label htmlFor={`level-${level.toLowerCase().replace(/\s+/g, '-')}`}>{level}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t">
                    <h3 className="text-sm font-medium">Salary Range</h3>
                    <Slider defaultValue={[20, 80]} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>₹5L</span>
                      <span>₹50L+</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <Button className="w-full" size="sm">Apply Filters</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Skill Match</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Leadership</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Communication</span>
                      <span className="font-medium">88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Technical Knowledge</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Analytics</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main job listings */}
            <div className="md:col-span-3 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-3 flex items-center gap-2">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search jobs, skills, companies..." 
                  className="border-0 focus-visible:ring-0 placeholder:text-muted-foreground flex-1"
                />
                <Button>Search</Button>
              </div>

              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">24 Jobs Available</h2>
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="salary-high">Highest Salary</SelectItem>
                    <SelectItem value="match">Skill Match</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {/* Featured job */}
                <Card className="border-blue-200 dark:border-blue-800">
                  <CardContent className="p-0">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/30 flex items-center justify-between">
                      <Badge className="bg-blue-600">Featured</Badge>
                      <Button variant="ghost" size="icon">
                        <Bookmark className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="flex gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="/placeholder.svg?height=48&width=48&text=SS" />
                          <AvatarFallback>SS</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">Cricket Analyst & Commentator</h3>
                          <div className="text-sm text-muted-foreground">Star Sports Network</div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="secondary" className="gap-1">
                              <MapPin className="h-3 w-3" /> Mumbai
                            </Badge>
                            <Badge variant="secondary" className="gap-1">
                              <DollarSign className="h-3 w-3" /> ₹20-30L/year
                            </Badge>
                            <Badge variant="secondary" className="gap-1">
                              <Clock className="h-3 w-3" /> Full-time
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm">Join our team as a cricket analyst and commentator. Provide expert insights, analysis, and commentary for cricket matches and studio shows.</p>
                      </div>

                      <div className="flex items-center justify-between border-t pt-3">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Posted 1 day ago</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-600">94% Match</Badge>
                          <Button>Apply Now</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Regular jobs */}
                {[
                  {
                    title: "Cricket Coach",
                    company: "National Cricket Academy",
                    location: "Bangalore",
                    salary: "₹15-20L/year",
                    type: "Full-time",
                    match: "88%",
                    posted: "3 days ago",
                    desc: "Train and develop young cricket talent at our prestigious academy. Minimum 5 years of professional cricket experience required."
                  },
                  {
                    title: "Sports Content Creator",
                    company: "CricBuzz",
                    location: "Remote",
                    salary: "₹12-18L/year",
                    type: "Full-time",
                    match: "82%",
                    posted: "1 week ago",
                    desc: "Create engaging cricket content including articles, videos, and social media posts. Strong knowledge of cricket and excellent communication skills required."
                  },
                  {
                    title: "Cricket Tech Consultant",
                    company: "SportsTech India",
                    location: "Hybrid",
                    salary: "₹18-25L/year",
                    type: "Contract",
                    match: "76%",
                    posted: "2 weeks ago",
                    desc: "Help develop next-generation cricket analytics tools. Provide insights on cricket-specific requirements and test prototypes."
                  }
                ].map((job, i) => (
                  <Card key={i}>
                    <CardContent className="p-4 space-y-4">
                      <div className="flex justify-between">
                        <div className="flex gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={`/placeholder.svg?height=48&width=48&text=${job.company.split(' ').map(w => w[0]).join('')}`} />
                            <AvatarFallback>{job.company.split(' ').map(w => w[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">{job.title}</h3>
                            <div className="text-sm text-muted-foreground">{job.company}</div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="secondary" className="gap-1">
                                <MapPin className="h-3 w-3" /> {job.location}
                              </Badge>
                              <Badge variant="secondary" className="gap-1">
                                <DollarSign className="h-3 w-3" /> {job.salary}
                              </Badge>
                              <Badge variant="secondary" className="gap-1">
                                <Clock className="h-3 w-3" /> {job.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Bookmark className="h-5 w-5" />
                        </Button>
                      </div>

                      <div>
                        <p className="text-sm">{job.desc}</p>
                      </div>

                      <div className="flex items-center justify-between border-t pt-3">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Posted {job.posted}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-600">{job.match} Match</Badge>
                          <Button variant="outline">View</Button>
                          <Button>Apply</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Pagination */}
                <div className="flex justify-center mt-6">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">Previous</Button>
                    <Button variant="outline" size="sm" className="w-10">1</Button>
                    <Button variant="default" size="sm" className="w-10">2</Button>
                    <Button variant="outline" size="sm" className="w-10">3</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pivot" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Career Pivot Advisor</CardTitle>
              <CardDescription>Discover alternative career paths based on your skills and experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex gap-4 items-start">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200">Your Career Match Analysis</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Based on your performance stats, skills, and personality traits from the AMP platform,
                      we've identified several career paths that would be an excellent fit for your transition from playing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">Sports Commentary</CardTitle>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        92% Match
                      </Badge>
                    </div>
                    <CardDescription>Media & Broadcasting</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    <div className="text-sm">
                      Your communication skills, technical knowledge, and on-camera presence make you 
                      an excellent fit for sports commentary roles.
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Matching Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">Communication</Badge>
                        <Badge variant="outline" className="text-xs">Game Knowledge</Badge>
                        <Badge variant="outline" className="text-xs">Quick Analysis</Badge>
                        <Badge variant="outline" className="text-xs">Public Speaking</Badge>
                      </div>
                    </div>
                    <Button size="sm" className="w-full" asChild>
                      <Link href="/sportlink/jobs?category=commentary">
                        View Commentary Jobs
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">Coaching & Training</CardTitle>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        88% Match
                      </Badge>
                    </div>
                    <CardDescription>Sports Development</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    <div className="text-sm">
                      Your leadership abilities, technical expertise, and mentoring capabilities
                      make you well-suited for coaching and player development.
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Matching Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">Leadership</Badge>
                        <Badge variant="outline" className="text-xs">Technical Knowledge</Badge>
                        <Badge variant="outline" className="text-xs">Mentoring</Badge>
                        <Badge variant="outline" className="text-xs">Strategy</Badge>
                      </div>
                    </div>
                    <Button size="sm" className="w-full" asChild>
                      <Link href="/sportlink/jobs?category=coaching">
                        View Coaching Jobs
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">Sports Analytics</CardTitle>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        85% Match
                      </Badge>
                    </div>
                    <CardDescription>Technology & Data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    <div className="text-sm">
                      Your analytical mindset, attention to detail, and strategic thinking
                      make you well-suited for roles in sports data analysis.
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Matching Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">Analysis</Badge>
                        <Badge variant="outline" className="text-xs">Pattern Recognition</Badge>
                        <Badge variant="outline" className="text-xs">Strategic Thinking</Badge>
                        <Badge variant="outline" className="text-xs">Technical Knowledge</Badge>
                      </div>
                    </div>
                    <Button size="sm" className="w-full" asChild>
                      <Link href="/sportlink/jobs?category=analytics">
                        View Analytics Jobs
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center">
                <Button variant="outline" className="gap-2" asChild>
                  <Link href="/sportlink/learning">
                    Explore Training for These Careers <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skill Enhancement Recommendations</CardTitle>
              <CardDescription>Build these skills to improve your career transition prospects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Public Speaking</h3>
                    <Badge variant="outline">High Priority</Badge>
                  </div>
                  <Progress value={65} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Enhancing your public speaking will significantly improve your prospects in commentary 
                    and media roles.
                  </p>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Link href="/sportlink/learning?skill=public-speaking">
                      View Courses <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Data Analysis</h3>
                    <Badge variant="outline">Medium Priority</Badge>
                  </div>
                  <Progress value={42} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Developing your data analysis skills will open opportunities in sports analytics
                    and technical coaching.
                  </p>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Link href="/sportlink/learning?skill=data-analysis">
                      View Courses <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Jobs</CardTitle>
              <CardDescription>Track your bookmarked opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Cricket Analyst",
                    company: "Mumbai Indians",
                    location: "Mumbai",
                    salary: "₹18-25L/year",
                    type: "Full-time",
                    saved: "3 days ago"
                  },
                  {
                    title: "Sports Presenter",
                    company: "ESPNCricinfo",
                    location: "Delhi",
                    salary: "₹15-20L/year",
                    type: "Full-time",
                    saved: "1 week ago"
                  }
                ].map((job, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex justify-between">
                        <div className="flex gap-3">
                          <Avatar>
                            <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${job.company.split(' ').map(w => w[0]).join('')}`} />
                            <AvatarFallback>{job.company.split(' ').map(w => w[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{job.title}</h3>
                            <p className="text-sm text-muted-foreground">{job.company}</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {job.location}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {job.salary}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {job.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <Button variant="ghost" size="icon">
                            <Bookmark className="h-5 w-5 fill-current" />
                          </Button>
                          <span className="text-xs text-muted-foreground">Saved {job.saved}</span>
                        </div>
                      </div>
                      <div className="flex justify-end mt-3">
                        <Button size="sm">Apply Now</Button>
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