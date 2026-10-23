import React from 'react';
import { Shield, ShieldAlert, Award, User, LogOut, Settings, Trophy, BookOpen } from 'lucide-react';
import { Student, AdminUser } from '../types';

interface NavbarProps {
  currentView: 'student_dashboard' | 'quiz' | 'review' | 'leaderboard' | 'admin';
  setCurrentView: (view: 'student_dashboard' | 'quiz' | 'review' | 'leaderboard' | 'admin') => void;
  student: Student | null;
  admin: AdminUser | null;
  onOpenStudentLogin: () => void;
  onOpenAdminLogin: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  student,
  admin,
  onOpenStudentLogin,
  onOpenAdminLogin,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => {
            if (admin) setCurrentView('admin');
            else setCurrentView('student_dashboard');
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base md:text-lg tracking-tight bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
                Cyber Crime Police Station Tapi
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Cyber Crime Awareness &amp; Training Platform</p>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setCurrentView('student_dashboard')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentView === 'student_dashboard'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            4-Day Quizzes
          </button>

          <button
            onClick={() => setCurrentView('leaderboard')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentView === 'leaderboard'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            Leaderboard
          </button>

          <button
            onClick={() => {
              if (admin) {
                setCurrentView('admin');
              } else {
                onOpenAdminLogin();
              }
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentView === 'admin'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            Admin Portal
            {admin && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>}
          </button>
        </nav>

        {/* User state / Actions */}
        <div className="flex items-center gap-2.5">
          {admin ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-emerald-400 flex items-center justify-end gap-1">
                  <ShieldAlert className="w-3 h-3" />
                  Admin Authorized
                </span>
                <span className="text-[11px] font-mono text-slate-400 truncate max-w-[150px]">
                  {admin.email || 'Administrator'}
                </span>
              </div>
              <button
                onClick={onLogout}
                title="Sign Out Admin"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-red-500/50 hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all text-xs flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : student ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-cyan-300 truncate max-w-[140px]">
                  {student.fullName}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {student.rollNumber} • {student.studentId}
                </span>
              </div>
              <button
                onClick={onLogout}
                title="Sign Out Student"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-red-500/50 hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all text-xs flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenStudentLogin}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-semibold text-xs transition-all shadow-md shadow-cyan-600/20"
              >
                <User className="w-3.5 h-3.5" />
                Student Login
              </button>
              <button
                onClick={onOpenAdminLogin}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-medium transition-all"
              >
                <Settings className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
