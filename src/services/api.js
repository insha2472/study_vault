import {
  mockDocuments,
  mockChatHistory,
  mockQuizQuestions,
  mockQuizResults,
  mockFlashcards,
  mockStudyPlan,
  mockTopics,
  mockDashboardStats,
  mockContinueLearning
} from '../data/mockData';

// Simulated artificial latency delay
const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  // Dashboard statistics
  async getDashboardData() {
    await delay(300);
    return {
      stats: mockDashboardStats,
      continueLearning: mockContinueLearning,
      recentDocuments: mockDocuments.slice(0, 3)
    };
  },

  // Document services
  async getDocuments() {
    await delay(300);
    return [...mockDocuments];
  },

  async uploadDocument(file) {
    await delay(1200);
    const newDoc = {
      id: `doc-${Date.now()}`,
      name: file.name,
      type: file.name.split('.').pop().toUpperCase(),
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      pages: Math.floor(Math.random() * 20) + 10,
      uploadedAt: "Just now",
      dateRaw: new Date().toISOString(),
      status: "Processed",
      subject: "General Notes",
      extractedPreview: `Extracted content preview from uploaded file ${file.name}. Ready for AI indexing and RAG querying.`
    };
    mockDocuments.unshift(newDoc);
    return newDoc;
  },

  async deleteDocument(id) {
    await delay(300);
    const index = mockDocuments.findIndex(doc => doc.id === id);
    if (index !== -1) {
      mockDocuments.splice(index, 1);
    }
    return { success: true, id };
  },

  // AI Chat services
  async getChatHistory() {
    await delay(200);
    return [...mockChatHistory];
  },

  async sendChatMessage(userMessage) {
    await delay(800);
    const aiResponse = {
      id: `msg-${Date.now()}`,
      sender: "ai",
      text: `Regarding "${userMessage}": Based on your uploaded study materials, here is a structured answer. Key concepts involve understanding fundamental definitions, reviewing core module guidelines, and applying active recall.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: [
        { docName: "DBMS_Module_3.pdf", page: 18, snippet: "Referenced concepts from Module 3." },
        { docName: "Machine_Learning_Notes.pdf", page: 25, snippet: "Model evaluation formulas and summary." }
      ]
    };
    return aiResponse;
  },

  // Quiz services
  async generateQuiz(params) {
    await delay(600);
    return {
      title: `${params.subject || 'DBMS'} - ${params.topic || 'General'} Quiz`,
      difficulty: params.difficulty || 'Medium',
      questionsCount: params.questionCount || 5,
      questions: mockQuizQuestions
    };
  },

  async submitQuizAnswers(answers) {
    await delay(500);
    return mockQuizResults;
  },

  // Flashcards services
  async generateFlashcards(params) {
    await delay(500);
    return mockFlashcards;
  },

  // Study Planner services
  async createStudyPlan(preferences) {
    await delay(700);
    return mockStudyPlan;
  },

  // Topics services
  async getTopics() {
    await delay(300);
    return [...mockTopics];
  },

  async getTopicById(id) {
    await delay(200);
    return mockTopics.find(t => t.id === id) || mockTopics[0];
  }
};
