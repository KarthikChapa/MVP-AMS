// This file generates mock data for the application

export function generateMockData() {
  // Mock athlete data
  const athleteData = {
    id: "1",
    name: "Virat Kohli",
    age: 32,
    sport: "Cricket",
    position: "Batsman",
    team: "Royal Challengers Bangalore",
    experience: "15 years",
    achievements: [
      "ICC ODI Cricketer of the Year (2012, 2017)",
      "Rajiv Gandhi Khel Ratna Award (2018)",
      "Padma Shri (2017)",
      "Wisden Leading Cricketer in the World (2016, 2017, 2018)"
    ],
    performanceRating: 95,
    fitnessScore: 92,
    profileImage: "/placeholders/avatars/athlete-1.jpg",
    stats: {
      matches: 350,
      battingAverage: 59.07,
      strikeRate: 92.6,
      centuries: 43,
      halfCenturies: 62
    }
  }

  // Mock messages
  const messages = [
    {
      id: "msg1",
      sender: "Coach Ravi Shastri",
      avatar: "/placeholders/avatars/avatar-1.png",
      content: "Let's review your batting technique during today's practice session.",
      timestamp: "2023-04-01T09:30:00Z",
      read: true
    },
    {
      id: "msg2",
      sender: "Physio John Davis",
      avatar: "/placeholders/avatars/avatar-2.png",
      content: "Your recovery metrics look good. Let's schedule a follow-up session tomorrow.",
      timestamp: "2023-04-01T10:15:00Z",
      read: false
    },
    {
      id: "msg3",
      sender: "Nutritionist Sarah Kim",
      avatar: "/placeholders/avatars/avatar-3.png",
      content: "I've updated your nutrition plan for the upcoming tournament. Please review when you get a chance.",
      timestamp: "2023-04-01T14:05:00Z",
      read: false
    }
  ]

  // Mock notifications
  const notifications = [
    {
      id: "notif1",
      title: "Performance Milestone",
      description: "You've reached 95% of your target batting average for the season!",
      timestamp: "2023-04-01T08:00:00Z",
      type: "performance",
      read: false
    },
    {
      id: "notif2",
      title: "Injury Prevention Alert",
      description: "Your right shoulder strain risk has increased. Consider modified training.",
      timestamp: "2023-04-01T09:15:00Z",
      type: "injury",
      read: true
    },
    {
      id: "notif3",
      title: "Team Update",
      description: "Team practice schedule has been updated for next week.",
      timestamp: "2023-04-01T11:30:00Z",
      type: "team",
      read: false
    }
  ]

  // Mock performance metrics
  const performanceMetrics = {
    battingAverage: {
      current: 59.07,
      previous: 58.2,
      change: 0.87,
      target: 60.0
    },
    bowlingEconomy: {
      current: 5.32,
      previous: 5.45,
      change: -0.13,
      target: 5.00
    },
    fieldingEfficiency: {
      current: 92.5,
      previous: 91.0,
      change: 1.5,
      target: 95.0
    },
    strikeRate: {
      current: 92.6,
      previous: 91.8,
      change: 0.8,
      target: 95.0
    },
    runningBetweenWickets: {
      current: 88.3,
      previous: 87.5,
      change: 0.8,
      target: 90.0
    },
    decisionMaking: {
      current: 94.2,
      previous: 93.5,
      change: 0.7,
      target: 95.0
    },
    mentalFocus: {
      current: 95.0,
      previous: 94.2,
      change: 0.8,
      target: 96.0
    },
    injuryRisk: {
      current: 18.5,
      previous: 20.2,
      change: -1.7,
      target: 15.0
    },
    recoveryRate: {
      current: 87.3,
      previous: 85.1,
      change: 2.2,
      target: 90.0
    },
    performance: {
      current: 95.0,
      previous: 93.5,
      change: 1.5,
      target: 98.0
    }
  }

  // Mock exercise history
  const exerciseHistory = [
    {
      id: "ex1",
      date: "2023-03-28T15:30:00Z",
      type: "Batting",
      duration: 90,
      score: 87,
      details: {
        shots: 120,
        accuracy: 82,
        power: 90,
        technique: 88
      }
    },
    {
      id: "ex2",
      date: "2023-03-26T10:15:00Z",
      type: "Fielding",
      duration: 60,
      score: 92,
      details: {
        catches: 15,
        accuracy: 93,
        reaction: 91,
        movement: 89
      }
    },
    {
      id: "ex3",
      date: "2023-03-24T14:00:00Z",
      type: "Fitness",
      duration: 75,
      score: 90,
      details: {
        cardio: 88,
        strength: 91,
        agility: 92,
        recovery: 89
      }
    }
  ]

  // Mock training sessions
  const trainingSessions = [
    {
      id: "ts1",
      date: "2023-04-02T09:00:00Z",
      title: "Technical Batting Session",
      coach: "Rahul Dravid",
      duration: 120,
      location: "Indoor Training Center",
      focus: ["Cover drives", "Pull shots", "Defensive technique"]
    },
    {
      id: "ts2",
      date: "2023-04-03T14:00:00Z",
      title: "Fitness and Conditioning",
      coach: "Shankar Basu",
      duration: 90,
      location: "Gym",
      focus: ["Cardio", "Strength", "Core stability"]
    },
    {
      id: "ts3",
      date: "2023-04-05T10:30:00Z",
      title: "Match Simulation",
      coach: "Ravi Shastri",
      duration: 180,
      location: "Main Ground",
      focus: ["Game situations", "Decision making", "Pressure handling"]
    }
  ]

  // Mock injury risk data
  const injuryRisk = {
    overall: 18.5,
    selectedBodyPart: "right shoulder",
    riskScore: 27,
    riskLevel: "Medium",
    advice: [
      "Slightly reduce high-intensity training",
      "Add targeted strengthening exercises",
      "Consider sports massage therapy",
      "Increase recovery time between sessions"
    ],
    bodyParts: {
      "head": { risk: 5, level: "Low" },
      "neck": { risk: 12, level: "Low" },
      "right shoulder": { risk: 27, level: "Medium" },
      "left shoulder": { risk: 15, level: "Low" },
      "right elbow": { risk: 8, level: "Low" },
      "left elbow": { risk: 6, level: "Low" },
      "right wrist": { risk: 18, level: "Low" },
      "left wrist": { risk: 10, level: "Low" },
      "back": { risk: 22, level: "Medium" },
      "right hip": { risk: 11, level: "Low" },
      "left hip": { risk: 9, level: "Low" },
      "right knee": { risk: 20, level: "Medium" },
      "left knee": { risk: 13, level: "Low" },
      "right ankle": { risk: 15, level: "Low" },
      "left ankle": { risk: 12, level: "Low" }
    }
  }

  // Mock career prediction
  const careerPrediction = {
    predictedPeakYears: 5,
    optimalRetirementAge: 39,
    careerLongevityScore: 88,
    injuryRiskFactors: [
      {
        factor: "Previous shoulder injuries",
        risk: "25%",
        mitigation: "Specialized strength training protocol"
      },
      {
        factor: "Overtraining periods",
        risk: "18%",
        mitigation: "Implement periodized training cycles"
      },
      {
        factor: "Cricket-specific movement patterns",
        risk: "15%",
        mitigation: "Biomechanical analysis and technique refinement"
      }
    ],
    performanceProjection: {
      nextYear: "95%",
      threeYears: "87%",
      fiveYears: "75%"
    },
    recommendedFocus: [
      {
        area: "Injury Prevention",
        importance: "High",
        description: "Focus on proprioceptive training and joint stability exercises to minimize injury risk."
      },
      {
        area: "Technical Refinement",
        importance: "Medium",
        description: "Optimize cricket technique to reduce energy expenditure and improve efficiency."
      },
      {
        area: "Recovery Protocols",
        importance: "Critical",
        description: "Implement advanced recovery methods including contrast therapy and tailored sleep optimization."
      }
    ],
    postCareerOptions: [
      {
        career: "Performance Coach",
        matchScore: "94%",
        reasoning: "Your experience in cricket combined with your analytical skills makes coaching a natural transition."
      },
      {
        career: "Sports Analyst",
        matchScore: "87%",
        reasoning: "Your understanding of game mechanics and pattern recognition are valuable in analytics roles."
      },
      {
        career: "Youth Development",
        matchScore: "82%",
        reasoning: "Your communication skills and passion for developing talent align well with youth coaching."
      }
    ]
  }

  // Mock SportLink connections
  const sportlinkConnections = [
    {
      id: "conn1",
      name: "Rohit Sharma",
      avatar: "/placeholders/avatars/avatar-4.png",
      sport: "Cricket",
      position: "Batsman",
      organization: "Mumbai Indians",
      mutualConnections: 12,
      isOnline: true,
      lastActive: "2023-04-01T10:15:00Z"
    },
    {
      id: "conn2",
      name: "MS Dhoni",
      avatar: "/placeholders/avatars/avatar-5.png",
      sport: "Cricket",
      position: "Wicket-keeper",
      organization: "Chennai Super Kings",
      mutualConnections: 15,
      isOnline: false,
      lastActive: "2023-04-01T07:30:00Z"
    },
    {
      id: "conn3",
      name: "John Smith",
      avatar: "/placeholders/avatars/avatar-6.png",
      sport: "Cricket",
      position: "Coach",
      organization: "National Cricket Academy",
      mutualConnections: 8,
      isOnline: true,
      lastActive: "2023-04-01T11:45:00Z"
    }
  ]

  // Mock SportLink groups
  const sportlinkGroups = [
    {
      id: "group1",
      name: "Team India",
      avatar: "/placeholders/groups/team-india.png",
      members: 25,
      lastActive: "2023-04-01T09:45:00Z"
    },
    {
      id: "group2",
      name: "Cricket Coaches Network",
      avatar: "/placeholders/groups/coaches.png",
      members: 118,
      lastActive: "2023-04-01T08:15:00Z"
    },
    {
      id: "group3",
      name: "IPL Players",
      avatar: "/placeholders/groups/ipl-players.png",
      members: 205,
      lastActive: "2023-04-01T10:30:00Z"
    }
  ]

  // Mock SportLink messages
  const sportlinkMessages = [
    {
      id: "slmsg1",
      senderId: "conn1",
      senderName: "Rohit Sharma",
      senderAvatar: "/placeholders/avatars/avatar-4.png",
      content: "Great game yesterday! Let's review our strategy for the next match.",
      timestamp: "2023-04-01T08:30:00Z",
      read: true
    },
    {
      id: "slmsg2",
      senderId: "conn2",
      senderName: "MS Dhoni",
      senderAvatar: "/placeholders/avatars/avatar-5.png",
      content: "How is your preparation going for the upcoming series?",
      timestamp: "2023-04-01T09:15:00Z",
      read: true
    },
    {
      id: "slmsg3",
      senderId: "conn3",
      senderName: "John Smith",
      senderAvatar: "/placeholders/avatars/avatar-6.png",
      content: "I've analyzed your recent performances and have some feedback. Can we schedule a call?",
      timestamp: "2023-04-01T11:30:00Z",
      read: false
    }
  ]

  return {
    athleteData,
    messages,
    notifications,
    performanceMetrics,
    exerciseHistory,
    trainingSessions,
    injuryRisk,
    careerPrediction,
    sportlinkConnections,
    sportlinkGroups,
    sportlinkMessages
  }
} 