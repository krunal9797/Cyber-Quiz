export type DayNumber = 1 | 2 | 3 | 4;

export interface Student {
  id: string; // Document ID (usually studentId or rollNumber)
  studentId: string;
  rollNumber: string;
  fullName: string;
  passcode: string;
  email?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface QuizConfig {
  id: string; // e.g. "day1", "day2", "day3", "day4"
  day: DayNumber;
  title: string;
  description: string;
  timeLimitPerQuestion: number; // in seconds (e.g. 45)
  questionsPerQuiz: number; // number of random questions served
  marksPerQuestion: number; // e.g. 1
  negativeMarksPerQuestion: number; // e.g. 0
  showReviewExplanations: boolean; // whether students see correct answers and explanations on review
  isLeaderboardVisible: boolean; // whether students can see leaderboard for this day
  isDayActive: boolean; // whether quiz is open for student access
  updatedAt: string;
}

export interface Question {
  id: string;
  day: DayNumber;
  question: string;
  options: string[];
  correctAnswerIndex: number; // 0 to 3
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt?: string;
  updatedAt?: string;
}

export interface StudentAnswer {
  questionId: string;
  questionText: string;
  options: string[];
  selectedOptionIndex: number | null; // null if timed out/unanswered
  correctAnswerIndex: number;
  isCorrect: boolean;
  explanation: string;
  category: string;
  timeSpentSeconds: number;
}

export interface QuizAttempt {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  day: DayNumber;
  score: number;
  totalMarks: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  timeTakenSeconds: number;
  status: 'in_progress' | 'completed';
  answers: StudentAnswer[];
  startedAt: string;
  completedAt?: string;
}

export interface FinalResult {
  id: string; // studentId
  studentId: string;
  rollNumber: string;
  fullName: string;
  dayScores: {
    [day in DayNumber]?: {
      score: number;
      totalMarks: number;
      correctCount: number;
      totalQuestions: number;
      timeTakenSeconds: number;
      completedAt: string;
    };
  };
  totalMarks: number;
  totalMaxMarks: number;
  totalTimeSeconds: number;
  percentage: number;
  rank: number;
  completedDaysCount: number;
  isCertified: boolean;
  grade?: string;
  updatedAt: string;
}

export interface AdminUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: 'admin' | 'superadmin';
  isAuthenticated: boolean;
}
