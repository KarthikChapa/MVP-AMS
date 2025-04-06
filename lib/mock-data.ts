// Mock user data
export const currentUser = {
  id: "u1",
  name: "Virat Singh",
  email: "virat.singh@example.com",
  role: "Athlete",
  sport: "Cricket",
  position: "Batsman",
  age: 25,
  height: "183 cm",
  weight: "78 kg",
  profileImage: "/images/avatar.png",
  joinedDate: "2022-03-15",
  team: "Mumbai Champions",
  coach: "Rahul Sharma",
}

// Mock stats data
export const athleteStats = [
  {
    title: "Training Hours",
    value: "126",
    change: "+12.5%",
    changeType: "increase",
    description: "Last 30 days",
    icon: "activity",
  },
  {
    title: "Fitness Score",
    value: "88",
    change: "+4.2%",
    changeType: "increase",
    description: "Out of 100",
    icon: "heart",
  },
  {
    title: "Recovery Rate",
    value: "92%",
    change: "+2.3%",
    changeType: "increase",
    description: "Average",
    icon: "battery",
  },
  {
    title: "Injury Risk",
    value: "Low",
    change: "-5.1%",
    changeType: "decrease",
    description: "Last assessment",
    icon: "alert-triangle",
  },
]

// Mock performance data for charts
export const performanceData = [
  { month: "Jan", performance: 65, avg: 60 },
  { month: "Feb", performance: 68, avg: 61 },
  { month: "Mar", performance: 75, avg: 63 },
  { month: "Apr", performance: 78, avg: 65 },
  { month: "May", performance: 82, avg: 66 },
  { month: "Jun", performance: 85, avg: 68 },
]

// Mock injury risk data
export const injuryRiskData = [
  { name: "Lower Back", risk: 35 },
  { name: "Shoulder", risk: 25 },
  { name: "Knee", risk: 15 },
  { name: "Ankle", risk: 10 },
  { name: "Wrist", risk: 5 },
]

// Mock recent activity data
export const recentActivities = [
  {
    id: "act1",
    type: "Training",
    title: "Batting Practice",
    date: "Today, 2:30 PM",
    duration: "90 min",
    description: "Focus on playing against spin bowling",
    icon: "activity",
  },
  {
    id: "act2",
    type: "Assessment",
    title: "Fitness Evaluation",
    date: "Yesterday, 10:00 AM",
    duration: "45 min",
    description: "Quarterly fitness assessment with trainer",
    icon: "clipboard",
  },
  {
    id: "act3",
    type: "Recovery",
    title: "Physiotherapy Session",
    date: "Jun 12, 4:15 PM",
    duration: "60 min",
    description: "Shoulder mobility and recovery exercises",
    icon: "heart",
  },
  {
    id: "act4",
    type: "Match",
    title: "T20 League Match",
    date: "Jun 10, 7:00 PM",
    duration: "3 hrs",
    description: "vs. Delhi Titans (Won by 42 runs)",
    icon: "trophy",
  },
]

// Mock upcoming events
export const upcomingEvents = [
  {
    id: "evt1",
    title: "Team Training",
    date: "Tomorrow, 9:00 AM",
    type: "training",
    location: "Main Cricket Ground",
  },
  {
    id: "evt2",
    title: "Video Analysis Session",
    date: "Jun 16, 2:00 PM",
    type: "analysis",
    location: "Team Meeting Room",
  },
  {
    id: "evt3",
    title: "League Match vs. Bangalore",
    date: "Jun 18, 6:30 PM",
    type: "match",
    location: "National Stadium",
  },
  {
    id: "evt4",
    title: "Recovery Day",
    date: "Jun 19, All day",
    type: "recovery",
    location: "Recovery Center",
  },
  {
    id: "evt5",
    title: "Sponsor Event",
    date: "Jun 21, 4:00 PM",
    type: "event",
    location: "Marriott Hotel",
  },
]

// Mock Video Exercise Data
export const videoExerciseHistory = [
  {
    id: "ve1",
    name: "Squat Form Analysis",
    date: "Jun 12, 2023",
    score: 92,
    duration: "15 min",
    feedback: [
      "Excellent depth achieved",
      "Work on keeping chest more upright",
      "Good knee tracking over toes",
    ],
  },
  {
    id: "ve2",
    name: "Deadlift Technique",
    date: "Jun 10, 2023",
    score: 85,
    duration: "18 min",
    feedback: [
      "Bar path is consistently vertical",
      "Improve hip hinge motion",
      "Back angle maintained well",
    ],
  },
  {
    id: "ve3",
    name: "Bench Press Form",
    date: "Jun 5, 2023",
    score: 88,
    duration: "12 min",
    feedback: [
      "Good scapular retraction",
      "Improve bar path consistency",
      "Excellent control during eccentric phase",
    ],
  },
  {
    id: "ve4",
    name: "Shoulder Press",
    date: "Jun 3, 2023",
    score: 82,
    duration: "10 min",
    feedback: [
      "Core stability needs improvement",
      "Good range of motion",
      "Watch elbow position at top",
    ],
  },
  {
    id: "ve5",
    name: "Barbell Rows",
    date: "May 28, 2023",
    score: 86,
    duration: "14 min",
    feedback: [
      "Maintain neutral spine throughout",
      "Good scapular retraction",
      "Consistent tempo on both concentric and eccentric",
    ],
  },
]

// Mock training plans
export const trainingPlans = [
  {
    id: "tp1",
    name: "Strength Building",
    progress: 65,
    sessions: 4,
    description: "Focus on building core strength and power",
    remaining: "5 sessions left",
    exercises: ["Squats", "Deadlifts", "Bench Press", "Pull-ups"],
  },
  {
    id: "tp2",
    name: "Endurance Training",
    progress: 30,
    sessions: 2,
    description: "Improving cardiovascular endurance",
    remaining: "8 sessions left",
    exercises: ["Running", "Cycling", "HIIT", "Circuit Training"],
  },
  {
    id: "tp3",
    name: "Recovery Protocol",
    progress: 90,
    sessions: 6,
    description: "Active recovery and injury prevention",
    remaining: "1 session left",
    exercises: ["Stretching", "Foam Rolling", "Mobility Work", "Light Cardio"],
  },
  {
    id: "tp4",
    name: "Sport-Specific Drills",
    progress: 45,
    sessions: 3,
    description: "Cricket-specific movements and techniques",
    remaining: "4 sessions left",
    exercises: ["Batting Technique", "Fielding Drills", "Running Between Wickets"],
  },
] 