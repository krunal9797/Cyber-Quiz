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

        // Clean up any legacy dummy student in localStorage
        const dummyIds = ['STU-1001', 'STU-1002', 'STU-1003', 'STU-1004'];
        const storedStudent = localStorage.getItem('cyberquiz_current_student');
        if (storedStudent) {
          try {
            const parsed = JSON.parse(storedStudent);
            if (!dummyIds.includes(parsed.studentId)) {
              setStudent(parsed);
            } else {
              localStorage.removeItem('cyberquiz_current_student');
              setStudent(null);
            }
          } catch {
            localStorage.removeItem('cyberquiz_current_student');
            setStudent(null);
          }
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
      questionsPerQuiz: 20,
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
            <h3 className="text-base font-bold text-white">Loading Cyber Crime Police Station Tapi Platform...</h3>
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
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-8 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Station Branding */}
          <div className="flex items-center gap-2.5 text-center md:text-left">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shrink-0"></span>
            <div>
              <span className="font-bold text-slate-200 block text-sm">
                Cyber Crime Police Station Tapi
              </span>
              <span className="text-[11px] text-slate-400">
                Cyber Crime Awareness, OSINT &amp; Digital Forensics Assessment Platform
              </span>
            </div>
          </div>

          {/* Developer Credit & WhatsApp */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-1">
            <div className="text-slate-300 font-medium text-xs">
              Design and develop by <strong className="text-cyan-400 font-bold">Er. Krunal Gamit</strong>
            </div>
            <a
              href="https://wa.me/918320255573"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 hover:bg-emerald-900/60 hover:text-emerald-200 text-xs font-mono transition-all group"
              title="Message on WhatsApp"
            >
              <svg className="w-3.5 h-3.5 fill-current text-emerald-400 group-hover:scale-110 transition-transform shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Whatsapp no : 8320255573</span>
            </a>
          </div>
        </div>

        {/* Navigation bottom line */}
        <div className="max-w-7xl mx-auto mt-5 pt-4 border-t border-slate-900 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
          <div className="flex items-center gap-3">
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
            <button
              onClick={() => setCurrentView('student_dashboard')}
              className="hover:text-cyan-400 transition-colors"
            >
              Student Portal
            </button>
          </div>
          <span className="text-slate-600">Secure Firebase ABAC Protection • Police Station Tapi</span>
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
