// --- USER & PROFILE MODELS ---
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  initials: string;
  title: string;
  location: string;
  bio: string;
  targetRoles: string[];
  skills: string[];
  plan: 'free' | 'premium' | 'university';
  joinedDate: string;
  profileCompletion: number;
  readinessScore: number;
  xp: number;
  level: number;
  streak: number;
}

export interface Mentor {
  id: string;
  name: string;
  initials: string;
  avatar: string;
  title: string;
  company: string;
  expertise: string[];
  rating: number;
  reviews: number;
  sessions: number;
  available: boolean;
  price: number;
  bio: string;
  nextAvailable: string;
}

// --- TRAINING & LESSONS MODELS (Integrated version) ---
export interface TrainingModuleLesson {
  id: string;
  title: string;
  status: 'PENDING' | 'COMPLETED';
  orderIndex: number;
  format?: 'TEXT' | 'VIDEO' | string;
  contentMarkdown?: string | null;
  videoUrl?: string | null;
  estimatedMinutes?: number;
}

export interface TrainingModule {
  id: string;
  title: string;
  category: string;
  progress: number;
  xp: number;
  lessons: number;
  completedLessons: number;
  status: 'locked' | 'in-progress' | 'completed';
  icon: string;
  moduleLessons?: TrainingModuleLesson[]; // Added by colleagues for deep integration
}

// --- QUIZ & RESOURCES MODELS ---
export interface Quiz {
  id: string;
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: number;
  duration: string;
  tags: string[];
  description: string;
  completedByPercent: number;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'podcast' | 'exercise' | 'template';
  category: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  saved: boolean;
  views: number;
  rating: number;
  description: string;
}

// --- INTERVIEW & SESSIONS MODELS ---
export interface InterviewSession {
  id: string;
  title: string;
  type: 'behavioral' | 'technical' | 'situational' | 'case';
  date: string;
  duration: string;
  status: 'upcoming' | 'completed' | 'in-progress';
  score: number | null;
  questions: number;
  role: string;
  company: string;
  notes: string;
}

export interface Report {
  id: string;
  sessionId: string;
  sessionTitle: string;
  date: string;
  overallScore: number;
  categories: {
    communication: number;
    confidence: number;
    clarity: number;
    structure: number;
    stressHandling: number;
    readiness: number;
  };
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

// --- SOCIAL & GAMIFICATION MODELS ---
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
  earnedDate?: string;
  xpReward: number;
}

export interface Post {
  id: string;
  author: string;
  authorInitials: string;
  authorTitle: string;
  content: string;
  likes: number;
  comments: number;
  timeAgo: string;
  tags: string[];
  type: 'discussion' | 'success' | 'question' | 'tip';
}

// --- PRICING MODELS ---
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: { text: string; included: boolean }[];
  recommended: boolean;
  ctaLabel: string;
  color: string;
}
