"use client"

import React, { createContext, useContext, useState } from "react"
import {
  MOCK_DATA,
  generatePerformanceMetrics,
  generateCareerPrediction,
  generateVideoAnalysisResults,
  storeData,
  retrieveData
} from '@/lib/utils/mock-data'
import { generateMockData } from "@/lib/utils/mock-data-generator"

// Simple faker utility that doesn't require external packages
const faker = {
  string: {
    uuid: () => Math.random().toString(36).substring(2) + Date.now().toString(36)
  },
  person: {
    fullName: () => {
      const firstNames = ["John", "Jane", "Michael", "Emma", "David", "Sara", "Robert", "Linda", "William", "Susan"];
      const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Wilson", "Martinez"];
      return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    }
  },
  lorem: {
    sentence: () => {
      const sentences = [
        "Let's review your recent performance statistics.",
        "Your training session has been scheduled for tomorrow.",
        "I have some feedback on your technique from yesterday's practice.",
        "The upcoming match strategy needs to be discussed.",
        "Your recovery metrics look promising this week.",
        "We should talk about your nutrition plan for the tournament.",
        "The team meeting has been rescheduled to 5 PM today.",
        "Your injury prevention protocol has been updated.",
        "The analysis of your bowling action is ready for review.",
        "There's an important update about the training facility."
      ];
      return sentences[Math.floor(Math.random() * sentences.length)];
    }
  },
  date: {
    recent: (options: {days: number}) => new Date(Date.now() - Math.floor(Math.random() * options.days * 24 * 60 * 60 * 1000))
  },
  datatype: {
    boolean: () => Math.random() > 0.5
  },
  number: {
    int: (options: {min: number, max: number}) => Math.floor(Math.random() * (options.max - options.min + 1)) + options.min
  },
  helpers: {
    arrayElement: <T,>(array: T[]): T => array[Math.floor(Math.random() * array.length)]
  }
};

// Define the context type
type MockDataContextType = {
  athleteData: any;
  performanceData: any;
  careerPrediction: any;
  trainingActivities: any[];
  upcomingEvents: any[];
  connections: any[];
  messages: any[];
  notifications: any[];
  performanceMetrics: any;
  exerciseHistory: any[];
  trainingSessions: any[];
  injuryRiskData: any;
  videoAnalysisResults: any;
  sportlinkConnections: any[];
  sportlinkGroups: any[];
  sportlinkMessages: any[];
  // Methods for interacting with data
  refreshPerformanceData: () => void;
  generateVideoAnalysis: () => any;
  predictCareer: () => any;
  submitTrainingLog: (log: any) => void;
  addConnection: (connection: any) => void;
  addMessage: () => void;
  addNotification: () => void;
  markMessageAsRead: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  updatePerformanceMetric: (key: string, value: number) => void;
  addExerciseToHistory: (exercise: any) => void;
  resetExerciseHistory: () => void;
  updateInjuryRiskData: (bodyPart: string) => void;
  generateVideoAnalysisResults: (exerciseId: string) => any;
  addSportlinkConnection: () => any;
  addSportlinkMessage: (connection: any, message: string) => void;
}

// Create the context with undefined default
const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export interface SportlinkConnection {
  id: string;
  name: string;
  avatar: string;
  position: string;
  sport: string;
  organization: string;
  mutualConnections: number;
  isOnline: boolean;
  lastActive: string;
}

// Create a provider component
export const MockDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [mockData, setMockData] = useState(() => generateMockData())
  const [messages, setMessages] = useState(mockData.messages)
  const [notifications, setNotifications] = useState(mockData.notifications)
  const [athleteData, setAthleteData] = useState(mockData.athleteData)
  const [performanceData, setPerformanceData] = useState(() => generatePerformanceMetrics(athleteData.sport))
  const [careerPrediction, setCareerPrediction] = useState(() => generateCareerPrediction())
  const [trainingActivities, setTrainingActivities] = useState<any[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  const [connections, setConnections] = useState<any[]>([])
  const [exerciseHistory, setExerciseHistory] = useState(mockData.exerciseHistory)
  const [trainingSessions, setTrainingSessions] = useState(mockData.trainingSessions)
  const [injuryRiskData, setInjuryRiskData] = useState(mockData.injuryRisk)
  const [videoAnalysisResults, setVideoAnalysisResults] = useState<any>(null)
  const [sportlinkConnections, setSportlinkConnections] = useState(mockData.sportlinkConnections)
  const [sportlinkGroups, setSportlinkGroups] = useState(mockData.sportlinkGroups)
  const [sportlinkMessages, setSportlinkMessages] = useState(mockData.sportlinkMessages)
  
  // Load data from localStorage on mount (if available)
  // useEffect(() => {
  //   const storedPerformanceData = retrieveData('performanceData');
  //   if (storedPerformanceData) {
  //     setPerformanceData(storedPerformanceData);
  //   }

  //   const storedTrainingActivities = retrieveData('trainingActivities');
  //   if (storedTrainingActivities) {
  //     setTrainingActivities(storedTrainingActivities);
  //   } else {
  //     // Initialize with mock data
  //     setTrainingActivities(MOCK_DATA.trainingActivities.slice(0, 5));
  //   }

  //   const storedEvents = retrieveData('upcomingEvents');
  //   if (storedEvents) {
  //     setUpcomingEvents(storedEvents);
  //   } else {
  //     // Initialize with mock data
  //     setUpcomingEvents(MOCK_DATA.upcomingEvents);
  //   }

  //   const storedConnections = retrieveData('connections');
  //   if (storedConnections) {
  //     setConnections(storedConnections);
  //   } else {
  //     // Initialize with mock data
  //     setConnections(MOCK_DATA.connections.slice(0, 10));
  //   }
  // }, []);

  // Methods for interacting with data
  const refreshPerformanceData = () => {
    // In a real app, this would fetch the latest data from an API
    const newData = generatePerformanceMetrics(athleteData.sport);
    setPerformanceData(newData);
    storeData('performanceData', newData);
  };

  const generateVideoAnalysis = () => {
    // In a real app, this would process a video and return analysis
    return generateVideoAnalysisResults();
  };

  const predictCareer = () => {
    // Generate a career prediction
    const prediction = {
      predictedPeakYears: faker.number.int({ min: 2, max: 10 }),
      optimalRetirementAge: faker.number.int({ min: athleteData.age + 3, max: athleteData.age + 15 }),
      careerLongevityScore: faker.number.int({ min: 50, max: 95 }),
      injuryRiskFactors: [
        {
          factor: "Previous knee injuries",
          risk: faker.number.int({ min: 5, max: 45 }) + "%",
          mitigation: "Specialized strength training protocol"
        },
        {
          factor: "Overtraining periods",
          risk: faker.number.int({ min: 5, max: 35 }) + "%",
          mitigation: "Implement periodized training cycles"
        },
        {
          factor: `${athleteData.sport}-specific movement patterns`,
          risk: faker.number.int({ min: 5, max: 30 }) + "%",
          mitigation: "Biomechanical analysis and technique refinement"
        }
      ],
      performanceProjection: {
        nextYear: faker.number.int({ min: 85, max: 100 }) + "%",
        threeYears: faker.number.int({ min: 70, max: 95 }) + "%",
        fiveYears: faker.number.int({ min: 50, max: 90 }) + "%"
      },
      recommendedFocus: [
        {
          area: "Injury Prevention",
          importance: faker.helpers.arrayElement(["Low", "Medium", "High", "Critical"]),
          description: "Focus on proprioceptive training and joint stability exercises to minimize injury risk."
        },
        {
          area: "Technical Refinement",
          importance: faker.helpers.arrayElement(["Low", "Medium", "High", "Critical"]),
          description: `Optimize ${athleteData.sport} technique to reduce energy expenditure and improve efficiency.`
        },
        {
          area: "Recovery Protocols",
          importance: faker.helpers.arrayElement(["Low", "Medium", "High", "Critical"]),
          description: "Implement advanced recovery methods including contrast therapy and tailored sleep optimization."
        }
      ],
      postCareerOptions: [
        {
          career: "Performance Coach",
          matchScore: "94%",
          reasoning: `Your experience in ${athleteData.sport} combined with your analytical skills makes coaching a natural transition.`
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
    
    setCareerPrediction(prediction)
    return prediction
  };

  const submitTrainingLog = (log: any) => {
    // Add the log to training activities
    const newLog = {
      id: faker.string.uuid(),
      date: new Date().toISOString(),
      ...log
    };

    const updatedActivities = [newLog, ...trainingActivities];
    setTrainingActivities(updatedActivities);
    storeData('trainingActivities', updatedActivities);
  };

  const addConnection = (connection: any) => {
    // Add the new connection
    setConnections([connection, ...connections]);
  };
  
  const addMessage = () => {
    const newMessage = {
      id: faker.string.uuid(),
      sender: faker.person.fullName(),
      avatar: `/placeholders/avatars/avatar-${Math.floor(Math.random() * 12) + 1}.png`,
      content: faker.lorem.sentence(),
      timestamp: new Date().toISOString(),
      read: false,
    }
    setMessages((prev) => [newMessage, ...prev])
  }

  const addNotification = () => {
    const notificationTypes = ["performance", "injury", "team", "system"]
    const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)]
    
    const newNotification = {
      id: faker.string.uuid(),
      title: `New ${type} notification`,
      description: faker.lorem.sentence(),
      timestamp: new Date().toISOString(),
      type,
      read: false,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const markMessageAsRead = (id: string) => {
    setMessages((prev) => 
      prev.map((message) => 
        message.id === id ? { ...message, read: true } : message
      )
    )
  }

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => 
      prev.map((notification) => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const updatePerformanceMetric = (key: string, value: number) => {
    setPerformanceData((prev: any) => ({
      ...prev,
      [key]: {
        ...prev[key],
        current: value,
        change: value - prev[key].previous,
      }
    }))
  }

  const addExerciseToHistory = (exercise: any) => {
    setExerciseHistory((prev) => [exercise, ...prev])
  }

  const resetExerciseHistory = () => {
    setExerciseHistory([])
  }

  const updateInjuryRiskData = (bodyPart: string) => {
    // Generate new random data for the selected body part
    const newData = {
      ...injuryRiskData,
      selectedBodyPart: bodyPart,
      riskScore: Math.floor(Math.random() * 100),
      riskLevel: "",
      advice: [],
    }
    
    // Set risk level based on score
    if (newData.riskScore < 30) {
      newData.riskLevel = "Low"
      newData.advice = [
        "Maintain current training regimen",
        "Continue regular mobility exercises",
        "Ensure proper warm-up and cool-down",
      ]
    } else if (newData.riskScore < 70) {
      newData.riskLevel = "Medium"
      newData.advice = [
        "Slightly reduce high-intensity training",
        "Add targeted strengthening exercises",
        "Consider sports massage therapy",
        "Increase recovery time between sessions",
      ]
    } else {
      newData.riskLevel = "High"
      newData.advice = [
        "Significantly reduce training load",
        "Consult with sports medicine specialist",
        "Consider alternative low-impact training",
        "Implement specialized rehab protocol",
        "Schedule follow-up assessment in 7 days",
      ]
    }
    
    setInjuryRiskData(newData)
  }

  const generateVideoAnalysisResults = (exerciseId: string) => {
    const analysisTypes: Record<string, string[]> = {
      "bowling": ["Arm angle", "Release point", "Follow-through", "Run-up consistency"],
      "batting": ["Bat swing", "Foot movement", "Head position", "Balance"],
      "fielding": ["Movement efficiency", "Throwing technique", "Catching technique", "Reaction time"],
      "running": ["Stride length", "Arm movement", "Head position", "Hip rotation"],
      "jumping": ["Take-off angle", "Arm swing", "Landing mechanics", "Balance"],
      "squatting": ["Knee tracking", "Hip hinge", "Back angle", "Ankle mobility"]
    }
    
    const exerciseType = exerciseId.split("-")[0] 
    const metricsToAnalyze = analysisTypes[exerciseType] || analysisTypes.running
    
    const results = {
      exerciseId,
      date: new Date().toISOString(),
      exerciseName: exerciseId.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
      overallScore: faker.number.int({ min: 65, max: 98 }),
      metrics: metricsToAnalyze.map(metric => ({
        name: metric,
        score: faker.number.int({ min: 60, max: 100 }),
        feedback: faker.helpers.arrayElement([
          `Good ${metric.toLowerCase()}, maintain current form`,
          `${metric} needs minor adjustments for optimal performance`,
          `Work on improving ${metric.toLowerCase()} for better results`,
          `Excellent ${metric.toLowerCase()}, continue with current technique`
        ])
      })),
      feedback: {
        strengths: [
          faker.helpers.arrayElement([
            "Excellent body alignment throughout movement",
            "Strong core engagement maintained",
            "Consistent rhythm and timing",
            "Good range of motion in key joints"
          ]),
          faker.helpers.arrayElement([
            "Efficient energy transfer",
            "Balanced weight distribution",
            "Proper breathing technique",
            "Smooth transition between movement phases"
          ])
        ],
        improvements: [
          faker.helpers.arrayElement([
            "Increase hip mobility for better power generation",
            "Work on maintaining neutral spine position",
            "Focus on consistent follow-through",
            "Improve shoulder rotation during movement"
          ]),
          faker.helpers.arrayElement([
            "Adjust timing to optimize power output",
            "Work on maintaining proper joint alignment",
            "Develop more consistent rhythm",
            "Increase range of motion in key movement patterns"
          ])
        ]
      },
      comparison: {
        previousBest: faker.number.int({ min: 60, max: 95 }),
        change: faker.number.int({ min: -15, max: 25 }),
        trend: faker.helpers.arrayElement(["improving", "stable", "declining"]),
      }
    }
    
    setVideoAnalysisResults(results)
    return results
  }

  const addSportlinkConnection = () => {
    const newConnection: SportlinkConnection = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      avatar: `/placeholders/avatars/avatar-${Math.floor(Math.random() * 12) + 1}.png`,
      position: ["Player", "Coach", "Analyst", "Trainer", "Physio"][Math.floor(Math.random() * 5)],
      sport: ["Cricket", "Football", "Basketball", "Tennis", "Athletics"][Math.floor(Math.random() * 5)],
      organization: "Sports Academy",
      mutualConnections: Math.floor(Math.random() * 20) + 1,
      isOnline: Math.random() > 0.5,
      lastActive: new Date().toISOString(),
    };
    
    setSportlinkConnections(prev => [...prev, newConnection]);
    return newConnection;
  }

  const addSportlinkMessage = (connection: any, message: string) => {
    const newMessage = {
      id: faker.string.uuid(),
      senderId: connection.id,
      senderName: connection.name,
      senderAvatar: connection.avatar,
      content: message,
      timestamp: new Date().toISOString(),
      read: true,
    }
    
    setSportlinkMessages((prev) => [...prev, newMessage])
    return newMessage
  }
  
  const value = {
    athleteData,
    performanceData,
    careerPrediction,
    trainingActivities,
    upcomingEvents,
    connections,
    messages,
    notifications,
    performanceMetrics: performanceData,
    exerciseHistory,
    trainingSessions,
    injuryRiskData,
    videoAnalysisResults,
    sportlinkConnections,
    sportlinkGroups,
    sportlinkMessages,
    refreshPerformanceData,
    generateVideoAnalysis,
    predictCareer,
    submitTrainingLog,
    addConnection,
    addMessage,
    addNotification,
    markMessageAsRead,
    markNotificationAsRead,
    updatePerformanceMetric,
    addExerciseToHistory,
    resetExerciseHistory,
    updateInjuryRiskData,
    generateVideoAnalysisResults,
    addSportlinkConnection,
    addSportlinkMessage
  };

  return (
    <MockDataContext.Provider value={value}>
      {children}
    </MockDataContext.Provider>
  );
};

// Custom hook to use the context
export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (context === undefined) {
    throw new Error('useMockData must be used within a MockDataProvider');
  }
  return context;
}; 