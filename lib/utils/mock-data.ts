// Simple implementation of faker functionality
const faker = {
  seed: (seedValue: number) => {/* No-op for simplicity */},
  string: {
    uuid: () => Math.random().toString(36).substring(2) + Date.now().toString(36)
  },
  number: {
    int: (options: {min: number, max: number}) => 
      Math.floor(Math.random() * (options.max - options.min + 1)) + options.min,
    float: (options: {min: number, max: number, precision?: number}) => {
      const value = Math.random() * (options.max - options.min) + options.min;
      const multiplier = Math.pow(10, options.precision || 0);
      return Math.floor(value * multiplier) / multiplier;
    }
  },
  person: {
    fullName: () => {
      const firstNames = ["Virat", "Rohit", "MS", "Sachin", "Rahul", "Shikhar", "Jasprit", "Ravindra", "Hardik", "Rishabh"];
      const lastNames = ["Kohli", "Sharma", "Dhoni", "Tendulkar", "Dravid", "Dhawan", "Bumrah", "Jadeja", "Pandya", "Pant"];
      return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    }
  },
  location: {
    city: () => {
      const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Lucknow"];
      return cities[Math.floor(Math.random() * cities.length)];
    },
    country: () => "India"
  },
  lorem: {
    paragraph: (count: number) => {
      const sentences = [
        "Performance analysis shows improvement in key metrics.",
        "Training intensity should be adjusted based on recovery data.",
        "Technical skills assessment indicates consistent progress.",
        "Focus on strategic development in upcoming sessions.",
        "Data-driven approach recommended for continued improvement."
      ];
      let result = "";
      for (let i = 0; i < count; i++) {
        result += sentences[Math.floor(Math.random() * sentences.length)] + " ";
      }
      return result.trim();
    },
    sentences: (count: number) => {
      const sentences = [
        "Performance analysis shows improvement in key metrics.",
        "Training intensity should be adjusted based on recovery data.",
        "Technical skills assessment indicates consistent progress.",
        "Focus on strategic development in upcoming sessions.",
        "Data-driven approach recommended for continued improvement."
      ];
      return sentences[Math.floor(Math.random() * sentences.length)];
    },
    sentence: () => {
      const sentences = [
        "Performance analysis shows improvement in key metrics.",
        "Training intensity should be adjusted based on recovery data.",
        "Technical skills assessment indicates consistent progress.",
        "Focus on strategic development in upcoming sessions.",
        "Data-driven approach recommended for continued improvement."
      ];
      return sentences[Math.floor(Math.random() * sentences.length)];
    }
  },
  date: {
    past: (options: {years: number}) => {
      const now = new Date();
      const pastDate = new Date(now);
      pastDate.setFullYear(now.getFullYear() - Math.floor(Math.random() * options.years));
      return pastDate;
    },
    recent: (options?: {days: number}) => {
      const days = options?.days || 14;
      const now = new Date();
      const recentDate = new Date(now);
      recentDate.setDate(now.getDate() - Math.floor(Math.random() * days));
      return recentDate;
    },
    soon: (options: {days: number}) => {
      const now = new Date();
      const soonDate = new Date(now);
      soonDate.setDate(now.getDate() + Math.floor(Math.random() * options.days + 1));
      return soonDate;
    },
    anytime: () => new Date()
  },
  datatype: {
    boolean: (probability = 0.5) => Math.random() < probability
  },
  helpers: {
    arrayElement: <T>(array: T[]) => array[Math.floor(Math.random() * array.length)]
  },
  company: {
    name: () => {
      const names = [
        "Royal Challengers", "Mumbai Indians", "Chennai Super Kings", 
        "Delhi Capitals", "Kolkata Knight Riders", "Rajasthan Royals",
        "Sunrisers Hyderabad", "Kings XI Punjab"
      ];
      return names[Math.floor(Math.random() * names.length)];
    }
  }
};

// Create consistent seed for repeatable data (no-op in our implementation)
faker.seed(123);

// Mock athlete profiles
export const generateAthleteProfile = () => {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    age: faker.number.int({ min: 18, max: 40 }),
    sport: faker.helpers.arrayElement([
      'Cricket', 'Football', 'Badminton', 'Tennis', 'Hockey', 'Basketball', 'Athletics'
    ]),
    position: faker.helpers.arrayElement([
      'Batsman', 'Bowler', 'All-rounder', 'Wicket-keeper', 
      'Forward', 'Midfielder', 'Defender', 'Goalkeeper',
      'Singles Player', 'Doubles Specialist'
    ]),
    experience: faker.number.int({ min: 1, max: 20 }) + ' years',
    team: faker.company.name() + ' ' + faker.helpers.arrayElement(['Warriors', 'Kings', 'Titans', 'Hunters', 'Eagles']),
    profileImage: `/avatars/athlete-${faker.number.int({ min: 1, max: 8 })}.png`,
    location: faker.location.city() + ', ' + faker.location.country(),
    bio: faker.lorem.paragraph(2),
    verified: faker.datatype.boolean(0.7),
  };
};

// Mock performance metrics
export const generatePerformanceMetrics = (sport?: string) => {
  const genericMetrics = {
    endurance: faker.number.int({ min: 60, max: 99 }),
    strength: faker.number.int({ min: 55, max: 95 }),
    speed: faker.number.float({ min: 7.2, max: 9.8, precision: 0.1 }),
    agility: faker.number.int({ min: 65, max: 98 }),
    recovery: faker.number.int({ min: 50, max: 99 }),
    mentalFocus: faker.number.int({ min: 70, max: 99 }),
    injuryRisk: faker.number.int({ min: 5, max: 30 }),
    performance: faker.number.int({ min: 75, max: 98 }),
  };

  // Add sport-specific metrics
  if (sport === 'Cricket') {
    return {
      ...genericMetrics,
      battingAverage: faker.number.float({ min: 22.5, max: 55.8, precision: 0.1 }),
      bowlingEconomy: faker.number.float({ min: 3.2, max: 8.5, precision: 0.01 }),
      fieldingEfficiency: faker.number.int({ min: 75, max: 98 }),
      bowlingSpeed: faker.number.int({ min: 120, max: 150 }) + ' km/h',
    };
  } else if (sport === 'Football') {
    return {
      ...genericMetrics,
      passingAccuracy: faker.number.int({ min: 70, max: 95 }),
      shotPrecision: faker.number.int({ min: 65, max: 90 }),
      tacticalAwareness: faker.number.int({ min: 75, max: 98 }),
      sprintSpeed: faker.number.float({ min: 28.5, max: 36.2, precision: 0.1 }) + ' km/h',
    };
  }

  return genericMetrics;
};

// Mock training activities
export const generateTrainingActivity = () => {
  return {
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement([
      'Strength Training', 'Endurance Session', 'Skills Practice', 
      'Recovery Session', 'Match Simulation', 'Video Analysis'
    ]),
    date: faker.date.recent({ days: 14 }),
    duration: faker.number.int({ min: 45, max: 180 }) + ' minutes',
    intensity: faker.helpers.arrayElement(['Low', 'Medium', 'High']),
    score: faker.number.int({ min: 70, max: 100 }),
    notes: faker.lorem.sentences(2),
    coach: faker.person.fullName(),
    location: faker.helpers.arrayElement([
      'Main Training Ground', 'Fitness Center', 'Indoor Facility', 'Recovery Suite'
    ]),
  };
};

// Mock events (matches, training sessions, appointments)
export const generateEvent = () => {
  const eventTypes = ['Match', 'Training', 'Medical Appointment', 'Team Meeting', 'Media Appearance'];
  const eventType = faker.helpers.arrayElement(eventTypes);

  const baseEvent = {
    id: faker.string.uuid(),
    type: eventType,
    title: '',
    date: faker.date.soon({ days: 30 }),
    time: faker.date.anytime().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    location: '',
    description: faker.lorem.sentence(),
  };

  switch (eventType) {
    case 'Match':
      return {
        ...baseEvent,
        title: `vs ${faker.company.name()} ${faker.helpers.arrayElement(['Warriors', 'Kings', 'Titans'])}`,
        location: faker.helpers.arrayElement([
          'National Stadium', 'Sports Complex', 'International Arena', 'City Stadium'
        ]),
        importance: faker.helpers.arrayElement(['League Match', 'Cup Game', 'Friendly', 'International'])
      };
    case 'Training':
      return {
        ...baseEvent,
        title: faker.helpers.arrayElement([
          'Team Practice', 'Skills Development', 'Tactical Session', 'Recovery Training'
        ]),
        location: faker.helpers.arrayElement([
          'Training Ground', 'Academy Facility', 'Indoor Center'
        ]),
        coach: faker.person.fullName()
      };
    case 'Medical Appointment':
      return {
        ...baseEvent,
        title: faker.helpers.arrayElement([
          'Physical Assessment', 'Injury Checkup', 'Nutrition Consultation', 'Physiotherapy'
        ]),
        location: 'Medical Center',
        specialist: faker.person.fullName() + ', ' + faker.helpers.arrayElement([
          'Team Doctor', 'Physiotherapist', 'Nutritionist', 'Sports Psychologist'
        ])
      };
    default:
      return {
        ...baseEvent,
        title: eventType,
        location: faker.helpers.arrayElement([
          'Team Facility', 'Conference Room', 'Media Center', 'Head Office'
        ])
      };
  }
};

// Mock injury data
export const generateInjuryData = () => {
  return {
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement([
      'Muscle Strain', 'Ligament Sprain', 'Stress Fracture', 'Concussion', 
      'Tendonitis', 'Joint Inflammation', 'Shin Splints'
    ]),
    severity: faker.helpers.arrayElement(['Mild', 'Moderate', 'Severe']),
    bodyPart: faker.helpers.arrayElement([
      'Knee', 'Ankle', 'Shoulder', 'Elbow', 'Wrist', 'Lower Back', 'Hamstring', 'Quadriceps'
    ]),
    startDate: faker.date.past({ years: 1 }),
    endDate: faker.date.recent(),
    rehabilitationStatus: faker.helpers.arrayElement([
      'Completed', 'In Progress', 'Not Started'
    ]),
    recoveryPercentage: faker.number.int({ min: 0, max: 100 }),
    notes: faker.lorem.paragraph(),
    treatedBy: faker.person.fullName() + ', ' + faker.helpers.arrayElement([
      'Team Doctor', 'Physiotherapist', 'Sports Medicine Specialist'
    ]),
  };
};

// Mock career prediction data
export const generateCareerPrediction = () => {
  return {
    currentAge: faker.number.int({ min: 18, max: 38 }),
    predictedPeakYears: faker.number.int({ min: 2, max: 5 }),
    optimalRetirementAge: faker.number.int({ min: 32, max: 40 }),
    careerLongevityScore: faker.number.int({ min: 65, max: 95 }),
    injuryRiskFactors: [
      {
        factor: 'Previous ACL Injury',
        risk: faker.number.int({ min: 15, max: 40 }) + '%',
        mitigation: 'Specialized knee strengthening program'
      },
      {
        factor: 'High Training Load',
        risk: faker.number.int({ min: 10, max: 35 }) + '%',
        mitigation: 'Periodized training schedule with recovery focus'
      },
      {
        factor: 'Playing Surface Adaptation',
        risk: faker.number.int({ min: 5, max: 20 }) + '%',
        mitigation: 'Surface-specific conditioning'
      }
    ],
    performanceProjection: {
      nextYear: faker.number.int({ min: 80, max: 100 }) + '%',
      threeYears: faker.number.int({ min: 70, max: 95 }) + '%',
      fiveYears: faker.number.int({ min: 60, max: 90 }) + '%'
    },
    recommendedFocus: [
      {
        area: faker.helpers.arrayElement([
          'Endurance Building', 'Injury Prevention', 'Technical Refinement', 
          'Tactical Development', 'Mental Conditioning'
        ]),
        importance: faker.helpers.arrayElement(['High', 'Medium', 'Critical']),
        description: faker.lorem.sentence()
      },
      {
        area: faker.helpers.arrayElement([
          'Nutrition Optimization', 'Recovery Protocols', 'Specialized Training', 
          'Biomechanical Efficiency', 'Load Management'
        ]),
        importance: faker.helpers.arrayElement(['High', 'Medium', 'Critical']),
        description: faker.lorem.sentence()
      }
    ],
    postCareerOptions: [
      {
        career: faker.helpers.arrayElement([
          'Coaching', 'Sports Administration', 'Media Commentary', 
          'Talent Development', 'Sports Business', 'Academy Management'
        ]),
        matchScore: faker.number.int({ min: 75, max: 98 }) + '%',
        reasoning: faker.lorem.sentence()
      },
      {
        career: faker.helpers.arrayElement([
          'Performance Analysis', 'Sports Medicine', 'Team Management', 
          'Scouting', 'Sports Technology', 'Entrepreneurship'
        ]),
        matchScore: faker.number.int({ min: 70, max: 95 }) + '%',
        reasoning: faker.lorem.sentence()
      }
    ]
  };
};

// Mock video exercise analysis results
export const generateVideoAnalysisResults = () => {
  return {
    timestamp: new Date().toISOString(),
    exerciseName: faker.helpers.arrayElement([
      'Cricket Bowling Action', 'Cricket Batting Stance', 
      'Football Penalty Kick', 'Football Free Kick',
      'Sprint Start Position', 'Long Jump Technique'
    ]),
    duration: faker.number.int({ min: 15, max: 120 }) + ' seconds',
    frameCount: faker.number.int({ min: 450, max: 3600 }),
    overallScore: faker.number.int({ min: 65, max: 98 }),
    formQuality: faker.number.int({ min: 60, max: 95 }),
    technicalAccuracy: faker.number.int({ min: 70, max: 98 }),
    movementEfficiency: faker.number.int({ min: 65, max: 90 }),
    biomechanicalInsights: [
      {
        aspect: faker.helpers.arrayElement([
          'Elbow Angle', 'Wrist Position', 'Hip Rotation', 
          'Knee Alignment', 'Shoulder Rotation', 'Weight Transfer'
        ]),
        score: faker.number.int({ min: 60, max: 95 }),
        recommendation: faker.lorem.sentence()
      },
      {
        aspect: faker.helpers.arrayElement([
          'Balance Control', 'Follow-through', 'Initial Stance', 
          'Power Generation', 'Core Stability', 'Arm Movement'
        ]),
        score: faker.number.int({ min: 65, max: 98 }),
        recommendation: faker.lorem.sentence()
      },
      {
        aspect: faker.helpers.arrayElement([
          'Head Position', 'Foot Placement', 'Rhythm', 
          'Acceleration Phase', 'Deceleration Control', 'Range of Motion'
        ]),
        score: faker.number.int({ min: 70, max: 90 }),
        recommendation: faker.lorem.sentence()
      }
    ],
    injuryRiskFactors: [
      {
        bodyPart: faker.helpers.arrayElement([
          'Lower Back', 'Shoulder', 'Knee', 'Ankle', 'Elbow', 'Wrist'
        ]),
        riskLevel: faker.helpers.arrayElement(['Low', 'Medium', 'High']),
        technicalCause: faker.lorem.sentence(),
        preventionAdvice: faker.lorem.sentence()
      }
    ],
    performanceComparison: {
      personalBest: faker.number.int({ min: 85, max: 100 }) + '%',
      teamAverage: faker.number.int({ min: 75, max: 95 }) + '%',
      eliteStandard: faker.number.int({ min: 65, max: 90 }) + '%'
    },
    keyFrames: [
      {
        frameNumber: faker.number.int({ min: 10, max: 50 }),
        timestamp: faker.number.float({ min: 0.5, max: 2.0, precision: 0.01 }) + 's',
        observation: faker.lorem.sentence()
      },
      {
        frameNumber: faker.number.int({ min: 100, max: 200 }),
        timestamp: faker.number.float({ min: 3.0, max: 7.0, precision: 0.01 }) + 's',
        observation: faker.lorem.sentence()
      }
    ]
  };
};

// Mock networking data for SportLink
export const generateConnection = () => {
  const sports = [
    'Cricket', 'Football', 'Badminton', 'Tennis', 'Hockey', 
    'Basketball', 'Athletics', 'Swimming', 'Boxing'
  ];
  
  const connectionTypes = ['Athlete', 'Coach', 'Industry Professional', 'Team Manager', 'Scout'];
  const connectionType = faker.helpers.arrayElement(connectionTypes);
  
  let role = '';
  
  if (connectionType === 'Athlete') {
    role = faker.helpers.arrayElement([
      'Professional Cricketer', 'Football Player', 'Tennis Player',
      'Badminton Player', 'Hockey Player', 'Track Athlete', 'Swimmer'
    ]);
  } else if (connectionType === 'Coach') {
    role = faker.helpers.arrayElement([
      'Head Coach', 'Assistant Coach', 'Fitness Trainer',
      'Batting Coach', 'Bowling Coach', 'Performance Analyst'
    ]);
  } else if (connectionType === 'Industry Professional') {
    role = faker.helpers.arrayElement([
      'Sports Agent', 'Sports Medicine Doctor', 'Physiotherapist',
      'Sports Journalist', 'Team Owner', 'Sports Administrator'
    ]);
  } else {
    role = connectionType;
  }
  
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    role: role,
    sport: faker.helpers.arrayElement(sports),
    organization: connectionType === 'Athlete' 
      ? faker.company.name() + ' ' + faker.helpers.arrayElement(['Warriors', 'Kings', 'Titans', 'Hunters', 'Eagles'])
      : faker.company.name(),
    location: faker.location.city() + ', ' + faker.location.country(),
    connectionType: connectionType,
    mutualConnections: faker.number.int({ min: 0, max: 25 }),
    verified: faker.datatype.boolean(0.7),
    profileImage: `/avatars/connection-${faker.number.int({ min: 1, max: 8 })}.png`,
    lastActive: faker.date.recent({ days: 30 }).toLocaleDateString(),
  };
};

// Pre-generate some mock data for consistent usage
export const MOCK_DATA = {
  athletes: Array.from({ length: 15 }, generateAthleteProfile),
  trainingActivities: Array.from({ length: 20 }, generateTrainingActivity),
  upcomingEvents: Array.from({ length: 10 }, generateEvent),
  injuries: Array.from({ length: 5 }, generateInjuryData),
  connections: Array.from({ length: 30 }, generateConnection),
};

// Local storage utilities
export const storeData = (key: string, data: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const retrieveData = (key: string) => {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
}; 