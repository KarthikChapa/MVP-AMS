"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMockData } from "@/lib/context/mock-data-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Check, Upload } from "lucide-react"
import { toast } from "sonner"

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  sport: z.string().min(1, { message: "Please select a sport" }),
  position: z.string().min(1, { message: "Please select a position" }),
  team: z.string().min(1, { message: "Please enter your team" }),
  bio: z.string().max(500, { message: "Bio must be less than 500 characters" }),
  location: z.string().min(1, { message: "Please enter your location" }),
  experience: z.string().min(1, { message: "Please enter your experience" }),
  publicProfile: z.boolean().default(true),
  emailNotifications: z.boolean().default(true),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function ProfileEditPage() {
  const router = useRouter()
  const { athleteData } = useMockData()
  const [selectedTab, setSelectedTab] = useState("basic")
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const defaultValues: Partial<ProfileFormValues> = {
    name: athleteData.name,
    sport: athleteData.sport,
    position: athleteData.position,
    team: athleteData.team,
    bio: athleteData.bio || "",
    location: athleteData.location || "Mumbai, India",
    experience: athleteData.experience || "5 years",
    publicProfile: true,
    emailNotifications: true,
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  })

  function onSubmit(data: ProfileFormValues) {
    // In a real app, this would update the profile
    console.log("Profile updated:", data)
    
    // Show success message
    toast.success("Profile updated successfully")
    
    // Redirect back to profile
    setTimeout(() => {
      router.push("/sportlink")
    }, 1500)
  }

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Edit Profile</h1>
          <p className="text-muted-foreground">
            Update your SportLink profile information
          </p>
        </div>
        <div>
          <Button variant="outline" onClick={() => router.push("/sportlink")}>
            Cancel
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="w-full justify-start border-b pb-0">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Notifications</TabsTrigger>
          <TabsTrigger value="connections">Connection Preferences</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
            <TabsContent value="basic" className="space-y-8">
              <div className="grid gap-8 md:grid-cols-3">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                    <CardDescription>
                      Upload a profile photo to make your profile more recognizable
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src={avatarPreview || athleteData.profileImage || "/placeholders/avatars/athlete-1.jpg"} />
                        <AvatarFallback>{athleteData.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex flex-col items-center">
                      <Label htmlFor="avatar" className="cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-md flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Photo
                      </Label>
                      <Input 
                        id="avatar" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleAvatarChange}
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        JPG, PNG or GIF. 1MB max.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                      Update your personal and professional information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="sport"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sport</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a sport" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Cricket">Cricket</SelectItem>
                                <SelectItem value="Football">Football</SelectItem>
                                <SelectItem value="Basketball">Basketball</SelectItem>
                                <SelectItem value="Tennis">Tennis</SelectItem>
                                <SelectItem value="Hockey">Hockey</SelectItem>
                                <SelectItem value="Swimming">Swimming</SelectItem>
                                <SelectItem value="Athletics">Athletics</SelectItem>
                                <SelectItem value="Badminton">Badminton</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="position"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Position/Specialty</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="team"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Team/Club</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Experience</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your sports journey, achievements, and goals" 
                              className="min-h-32" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            You can @mention other athletes and #tag your achievements
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Manage who can see your profile and how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="publicProfile"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Public Profile</FormLabel>
                          <FormDescription>
                            Allow your profile to be visible to all SportLink users
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Email Notifications</FormLabel>
                          <FormDescription>
                            Receive email notifications for messages, connection requests, and updates
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Data Visibility</FormLabel>
                      <FormDescription>
                        Allow your performance data to be visible to connections
                      </FormDescription>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Profile Discovery</FormLabel>
                      <FormDescription>
                        Allow your profile to be suggested to others based on skills and interests
                      </FormDescription>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="connections" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Connection Preferences</CardTitle>
                  <CardDescription>
                    Manage your connection settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Connection Requests</FormLabel>
                      <FormDescription>
                        Allow anyone to send you connection requests
                      </FormDescription>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Message Requests</FormLabel>
                      <FormDescription>
                        Allow messages from people you are not connected with
                      </FormDescription>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Activity Broadcasts</FormLabel>
                      <FormDescription>
                        Notify your connections when you update your profile or achievements
                      </FormDescription>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Job Alerts</FormLabel>
                      <FormDescription>
                        Receive notifications about relevant job opportunities
                      </FormDescription>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <CardFooter className="pt-4 px-0 flex justify-between">
              <Button 
                variant="outline" 
                type="button"
                onClick={() => router.push("/sportlink")}
              >
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Tabs>
    </div>
  )
} 