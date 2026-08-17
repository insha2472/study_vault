export const mockProfile = {
  name: "Shreya",
  role: "Student",
  email: "shreya.student@university.edu",
  course: "Computer Science & Engineering",
  year: "3rd Year",
  avatar: null,
  dailyGoalHours: 3.5,
  difficultyPreference: "Medium",
  aiResponseStyle: "Balanced",
  showSourcesToggle: true,
  notificationsEnabled: true
};

// Initial state starts empty as requested
export const mockDashboardStats = [
  { id: 1, title: "Documents", value: "0", subtitle: "Uploaded materials", icon: "FileText", color: "#6366f1" },
  { id: 2, title: "Topics", value: "0", subtitle: "Topics discovered", icon: "BookOpen", color: "#10b981" },
  { id: 3, title: "Quiz Score", value: "0%", subtitle: "Average performance", icon: "Award", color: "#f59e0b" }
];

export const mockContinueLearning = [];

export const mockDocuments = [];

export const mockChatHistory = [];

export const mockContextPanelData = {
  selectedDocuments: [],
  retrievedSectionsCount: 0,
  topics: []
};

export const mockSuggestedQuestions = [
  "Explain this topic simply",
  "Summarize my uploaded notes",
  "Give me important exam questions",
  "Explain this like I'm a beginner"
];

export const mockQuizQuestions = [
  {
    id: 1,
    question: "Sample Question 1: What is the primary objective of active study recall?",
    options: [
      "A. Passive reading of textbooks",
      "B. Actively testing yourself to strengthen memory retrieval",
      "C. Highlighting entire textbook pages",
      "D. Memorizing word-for-word without understanding"
    ],
    correctAnswer: 1,
    explanation: "Active recall forces the brain to retrieve information, strengthening neural connections."
  },
  {
    id: 2,
    question: "Sample Question 2: Which technique divides study sessions into timed intervals with short breaks?",
    options: [
      "A. Pomodoro Technique",
      "B. Cramming",
      "C. Linear Scanning",
      "D. ROTE Learning"
    ],
    correctAnswer: 0,
    explanation: "The Pomodoro Technique typically uses 25-minute study intervals followed by 5-minute breaks."
  }
];

export const mockQuizResults = {
  scorePercentage: 0,
  correctCount: 0,
  totalCount: 0,
  timeTaken: "0m 0s",
  weakTopics: [],
  recommendation: "Take your first quiz after uploading study materials to analyze performance."
};

export const mockFlashcards = [];

export const mockStudyPlan = {
  title: "Your Personalized Study Schedule",
  totalHours: 0,
  days: []
};

export const mockTopics = [];
