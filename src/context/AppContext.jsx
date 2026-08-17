import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockProfile } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('studyvault_user');
    return saved ? JSON.parse(saved) : mockProfile;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('studyvault_auth') === 'true';
  });

  // Dynamic user state initialized empty
  const [documents, setDocuments] = useState(() => {
    const savedDocs = localStorage.getItem('studyvault_user_docs');
    return savedDocs ? JSON.parse(savedDocs) : [];
  });

  const [topics, setTopics] = useState(() => {
    const savedTopics = localStorage.getItem('studyvault_user_topics');
    return savedTopics ? JSON.parse(savedTopics) : [];
  });

  const [quizScore, setQuizScore] = useState(() => {
    const savedScore = localStorage.getItem('studyvault_user_quizscore');
    return savedScore || '0%';
  });

  const [studyPlan, setStudyPlan] = useState(() => {
    const savedPlan = localStorage.getItem('studyvault_user_plan');
    return savedPlan ? JSON.parse(savedPlan) : { title: "Your Study Schedule", totalHours: 0, days: [] };
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('studyvault_user_docs', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('studyvault_user_topics', JSON.stringify(topics));
  }, [topics]);

  useEffect(() => {
    localStorage.setItem('studyvault_user_quizscore', quizScore);
  }, [quizScore]);

  useEffect(() => {
    localStorage.setItem('studyvault_user_plan', JSON.stringify(studyPlan));
  }, [studyPlan]);

  const login = (email, password, customName) => {
    const updatedProfile = {
      ...profile,
      email,
      name: customName || profile.name || email.split('@')[0]
    };
    setProfile(updatedProfile);
    setIsAuthenticated(true);
    localStorage.setItem('studyvault_user', JSON.stringify(updatedProfile));
    localStorage.setItem('studyvault_auth', 'true');
    addToast(`Welcome back, ${updatedProfile.name}!`, 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('studyvault_auth');
    addToast('Signed out successfully.', 'info');
  };

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addDocument = (doc) => {
    setDocuments(prev => [doc, ...prev]);

    // Automatically discover a new topic from the uploaded doc
    const newTopic = {
      id: `topic-${Date.now()}`,
      name: doc.subject || doc.name.replace(/\.[^/.]+$/, ""),
      subject: doc.subject || "General Notes",
      topicsCount: 5,
      progress: 25,
      icon: "BookMarked",
      overview: `Discovered topic from ${doc.name}. Indexing concepts and active recall exercises.`,
      keyConcepts: ["Overview", "Key Definitions", "Important Principles"],
      importantTerms: ["Term 1", "Term 2"],
      relatedDocsCount: 1
    };

    setTopics(prev => [newTopic, ...prev]);
    addToast(`"${doc.name}" uploaded and indexed!`, 'success');
  };

  const deleteDocument = (id) => {
    const doc = documents.find(d => d.id === id);
    setDocuments(prev => prev.filter(d => d.id !== id));
    addToast(`"${doc?.name || 'Document'}" deleted.`, 'warning');
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      profile,
      setProfile,
      documents,
      setDocuments,
      topics,
      setTopics,
      quizScore,
      setQuizScore,
      studyPlan,
      setStudyPlan,
      addDocument,
      deleteDocument,
      searchQuery,
      setSearchQuery,
      toasts,
      addToast,
      removeToast
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
