import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Award, BarChart3, Brain, Calendar, Clock, TrendingUp, Users, Camera, Shield, Activity, Network } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4 md:px-8 w-full">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Athlete Management Platform</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            A comprehensive platform designed to help athletes optimize performance and extend their careers
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
              <Link href="/dashboard">
                Access Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="bg-white/20 text-white hover:bg-white/30 hover:text-white border-transparent">
              <Link href="/video-exercise">Try Motion Analysis</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* MVP Features Section */}
      <section className="py-16 px-4 md:px-8 bg-blue-50 dark:bg-gray-900 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">MVP Core Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform focuses on maximizing athlete career longevity with AI-powered insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader className="pb-3">
                <div className="bg-blue-100 dark:bg-blue-900/50 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                  <Camera className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl">AI Motion Coach</CardTitle>
                <CardDescription>MediaPipe Pose API + 3 pre-loaded sport drills</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Using Google's cutting-edge MediaPipe technology, our motion coach analyzes your form in cricket, football, and athletics
                  to provide real-time feedback.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                    <span className="text-sm">33-point pose tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                    <span className="text-sm">Real-time form correction</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                    <span className="text-sm">Injury risk prevention</span>
                  </li>
                </ul>
                <div className="flex justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/video-exercise">
                      Try Camera Analysis <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader className="pb-3">
                <div className="bg-blue-100 dark:bg-blue-900/50 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl">Career Predictor</CardTitle>
                <CardDescription>Rule-based engine for career longevity analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Our career predictor uses a sophisticated rule-based engine to analyze age, injury history, and sport-specific 
                  factors to predict optimal retirement age.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                    <span className="text-sm">Career blind spot identification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                    <span className="text-sm">Personalized training recommendations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                    <span className="text-sm">Post-career planning</span>
                  </li>
                </ul>
                <div className="flex justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/career-predictor">
                      Predict Your Career <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 md:px-8 bg-background w-full">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Innovations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Network className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Professional Networking</CardTitle>
                <CardDescription>SportLink for athletes</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Connect with fellow athletes, coaches, and industry professionals to build your career network.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Career Blind Spots</CardTitle>
                <CardDescription>Longevity prediction engine</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Predicts optimal retirement age and pivot careers with advanced AI models based on your unique profile.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Preventable Injuries</CardTitle>
                <CardDescription>Camera-based biomechanics</CardDescription>
              </CardHeader>
              <CardContent>
                <p>High-precision video-based movement tracking for technique improvement and injury prevention.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Activity className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Biometric Profiling</CardTitle>
                <CardDescription>Wearable integration</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Coming soon: Integration with WHOOP/Fitbit to track endurance, recovery, and optimize performance.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Outcomes */}
      <section className="py-16 px-4 md:px-8 bg-slate-50 w-full">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Target Outcomes</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardHeader className="text-center">
                <div className="mx-auto bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-4xl font-bold text-blue-600">30%</CardTitle>
                <CardDescription className="text-lg">Increase in athlete retention post-retirement</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white">
              <CardHeader className="text-center">
                <div className="mx-auto bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-4xl font-bold text-blue-600">25%</CardTitle>
                <CardDescription className="text-lg">Reduction in career-ending injuries by 2027</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white">
              <CardHeader className="text-center">
                <div className="mx-auto bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-4xl font-bold text-blue-600">10x</CardTitle>
                <CardDescription className="text-lg">
                  ROI for sponsors via data-driven talent investments
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-blue-600 text-white w-full">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform athlete management?</h2>
          <p className="text-xl mb-8">Join the platform that's revolutionizing sports careers in India</p>
          <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
            <Link href="/dashboard">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

