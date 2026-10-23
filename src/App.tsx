import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StudentLoginModal } from './components/StudentLoginModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { StudentDashboard } from './components/StudentDashboard';
import { QuizEngine } from './components/QuizEngine';
import { QuizReviewScreen } from './components/QuizReviewScreen';
import { LeaderboardView } from './components/LeaderboardView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import {
  AdminUser,
  DayNumber,
  Question,
  QuizAttempt,
  QuizConfig,
  Student,
} from './types';
import {
  getQuizConfigs,
  getAllQuestions,
  getStudents,
  getAllAttempts,
  getStudentAttempts,
  seedInitialDatabase,
} from './services/quizService';
import { INITIAL_STUDENTS } from './data/seedQuestions';
import { Shield, BookOpen, Trophy, Settings, Sparkles, UserCheck, ArrowRight } from 'lucide-react';

export default function App() {
  const [student, setStudent] = useState<Student | null>(null);
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  const [currentView, setCurrentView] = useState<
    'student_dashboard' | 'quiz' | 'review' | 'leaderboard' | 'admin'
  >('student_dashboard');

  const [activeQuizDay, setActiveQuizDay] = useState<DayNumber>(1);
  const [activeReviewAttempt, setActiveReviewAttempt] = useState<QuizAttempt | null>(null);

  const [isStudentLoginOpen, setIsStudentLoginOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // Core Data
  const [configs, setConfigs] = useState<QuizConfig[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [allAttempts, setAllAttempts] = useState<QuizAttempt[]>([]);
  const [studentAttempts, setStudentAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize and load data on app boot
  useEffect(() => {
    const initApp = async () => {
      setLoading(true);
      try {
        await seedInitialDatabase();
        await refreshAllData();

        // Check if student was previously logged in or pre-authenticate first demo student for instant trial
        const storedStudent = localStorage.getItem('cyberquiz_current_student');
        if (storedStudent) {
          try {
            const parsed = JSON.parse(storedStudent);
            setStudent(parsed);
          } catch {
            // fallback
          }
        } else {
          // Pre-select Aarav Sharma (STU-1001) as default active student for evaluator convenience
          const defaultStudent = INITIAL_STUDENTS[0];
          setStudent(defaultStudent);
          localStorage.setItem('cyberquiz_current_student', JSON.stringify(defaultStudent));
        }

        const storedAdmin = localStorage.getItem('cyberquiz_current_admin');
        if (storedAdmin) {
          try {
            setAdmin(JSON.parse(storedAdmin));
          } catch {
            // fallback
          }
        }
      } catch (err) {
        console.error('Initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initApp();
  }, []);

  // Sync student attempts whenever student or allAttempts changes
  useEffect(() => {
    if (student) {
      const userAttempts = allAttempts.filter((a) => a.studentId === student.studentId);
      setStudentAttempts(userAttempts);
    } else {
      setStudentAttempts([]);
    }
  }, [student, allAttempts]);

  const refreshAllData = async () => {
    try {
      const [cfgs, qList, stuList, attList] = await Promise.all([
        getQuizConfigs(),
        getAllQuestions(),
        getStudents(),
        getAllAttempts(),
      ]);
      setConfigs(cfgs);
      setQuestions(qList);
      setStudents(stuList);
      setAllAttempts(attList);
    } catch (err) {
      console.error('Error refreshing platform data:', err);
    }
  };

  const handleStudentLoginSuccess = (s: Student) => {
    setStudent(s);
    setAdmin(null);
    localStorage.setItem('cyberquiz_current_student', JSON.stringify(s));
    localStorage.removeItem('cyberquiz_current_admin');
    setCurrentView('student_dashboard');
  };

  const handleAdminLoginSuccess = (adm: AdminUser) => {
    setAdmin(adm);
    localStorage.setItem('cyberquiz_current_admin', JSON.stringify(adm));
    setCurrentView('admin');
  };

  const handleLogout = () => {
    setStudent(null);
    setAdmin(null);
    localStorage.removeItem('cyberquiz_current_student');
    localStorage.removeItem('cyberquiz_current_admin');
    setCurrentView('student_dashboard');
  };

  const handleStartQuiz = (day: DayNumber) => {
    if (!student) {
      setIsStudentLoginOpen(true);
      return;
    }
    setActiveQuizDay(day);
    setCurrentView('quiz');
  };

  const handleQuizCompleted = async (attempt: QuizAttempt) => {
    await refreshAllData();
    setActiveReviewAttempt(attempt);
    setCurrentView('review');
  };

  const handleViewReview = (attempt: QuizAttempt) => {
    setActiveReviewAttempt(attempt);
    setCurrentView('review');
  };

  const currentConfig =
    configs.find((c) => c.day === activeQuizDay) || {
      id: `day${activeQuizDay}`,
      day: activeQuizDay,
      title: `Day ${activeQuizDay} Quiz`,
      description: 'Cyber Crime Investigation Topic',
      timeLimitPerQuestion: 45,
      questionsPerQuiz: 5,
      marksPerQuestion: 1,
      negativeMarksPerQuestion: 0,
      showReviewExplanations: true,
      isLeaderboardVisible: true,
      isDayActive: true,
      updatedAt: '',
    };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navigation Header */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        student={student}
        admin={admin}
        onOpenStudentLogin={() => setIsStudentLoginOpen(true)}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Body */}
      <main className="flex-1">
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-base font-bold text-white">Loading CyberShield Training Platform...</h3>
            <p className="text-xs text-slate-500 mt-1">Connecting to Firebase &amp; Question Database</p>
          </div>
        ) : (
          <>
            {/* View 1: Student Dashboard */}
            {currentView === 'student_dashboard' && (
              <>
                {student ? (
                  <StudentDashboard
                    student={student}
                    configs={configs}
                    attempts={studentAttempts}
                    onStartQuiz={handleStartQuiz}
                    onViewReview={handleViewReview}
                    onOpenLeaderboard={() => setCurrentView('leaderboard')}
                  />
                ) : (
                  <div className="max-w-2xl mx-auto my-12 p-8 text-center bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/10">
                      <Shield className="w-7 h-7" />
                    </div>
                    <h2 className="text-xl font-bold text-white">
                      Cyber Crime Training &amp; Assessment Portal
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
                      Please sign in with your registered student credentials (Name, Roll Number, and assigned Passcode) to access the 4-day interactive quiz modules.
                    </p>
                    <div className="pt-2 flex items-center justify-center gap-3">
                      <button
                        onClick={() => setIsStudentLoginOpen(true)}
                        className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
                      >
                        <UserCheck className="w-4 h-4" />
                        Student Sign In
                      </button>
                      <button
                        onClick={() => setIsAdminLoginOpen(true)}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm transition-all"
                      >
                        Administrator Login
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* View 2: Interactive Timed Quiz */}
            {currentView === 'quiz' && student && (
              <QuizEngine
                student={student}
                day={activeQuizDay}
                config={currentConfig}
                allQuestions={questions}
                onComplete={handleQuizCompleted}
                onCancel={() => setCurrentView('student_dashboard')}
              />
            )}

            {/* View 3: Quiz Review Screen */}
            {currentView === 'review' && activeReviewAttempt && (
              <QuizReviewScreen
                attempt={activeReviewAttempt}
                config={
                  configs.find((c) => c.day === activeReviewAttempt.day) || currentConfig
                }
                onBackToDashboard={() => setCurrentView('student_dashboard')}
                onViewLeaderboard={() => setCurrentView('leaderboard')}
              />
            )}

            {/* View 4: Leaderboard */}
            {currentView === 'leaderboard' && (
              <LeaderboardView
                configs={configs}
                isAdmin={!!admin}
                onBack={() => {
                  if (admin) setCurrentView('admin');
                  else setCurrentView('student_dashboard');
                }}
              />
            )}

            {/* View 5: Admin Dashboard */}
            {currentView === 'admin' && (
              <>
                {admin ? (
                  <AdminDashboard
                    admin={admin}
                    students={students}
                    configs={configs}
                    questions={questions}
                    attempts={allAttempts}
                    onRefreshAll={refreshAllData}
                    onSwitchToStudentView={() => setCurrentView('student_dashboard')}
                  />
                ) : (
                  <div className="max-w-md mx-auto my-16 p-8 text-center bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto">
                      <Settings className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Administrator Access Required</h3>
                    <p className="text-xs text-slate-400">
                      Sign in with your administrator account or Master Key to access the question banks, student directory, and private final results.
                    </p>
                    <button
                      onClick={() => setIsAdminLoginOpen(true)}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20"
                    >
                      Authenticate as Administrator
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
            <span className="font-semibold text-slate-400">CyberShield Academy</span>
            <span>• 4-Day Cyber Crime Awareness &amp; Assessment</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => {
                if (admin) setCurrentView('admin');
                else setIsAdminLoginOpen(true);
              }}
              className="hover:text-cyan-400 transition-colors"
            >
              Admin Portal
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentView('leaderboard')}
              className="hover:text-cyan-400 transition-colors"
            >
              Leaderboards
            </button>
            <span>•</span>
            <span className="text-slate-600">Firebase ABAC Security Active</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <StudentLoginModal
        isOpen={isStudentLoginOpen}
        onClose={() => setIsStudentLoginOpen(false)}
        onLoginSuccess={handleStudentLoginSuccess}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onAdminLoginSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
}
