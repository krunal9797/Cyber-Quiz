import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Sliders,
  FileText,
  Lock,
  ShieldCheck,
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { AdminUser, Question, QuizAttempt, QuizConfig, Student } from '../../types';
import { StudentManager } from './StudentManager';
import { QuestionManager } from './QuestionManager';
import { ConfigManager } from './ConfigManager';
import { AttemptsTracker } from './AttemptsTracker';
import { FinalResultsManager } from './FinalResultsManager';

interface AdminDashboardProps {
  admin: AdminUser;
  students: Student[];
  configs: QuizConfig[];
  questions: Question[];
  attempts: QuizAttempt[];
  onRefreshAll: () => void;
  onSwitchToStudentView: () => void;
}

type AdminTab = 'overview' | 'students' | 'questions' | 'configs' | 'attempts' | 'final_results';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  admin,
  students,
  configs,
  questions,
  attempts,
  onRefreshAll,
  onSwitchToStudentView,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefreshAll();
    setTimeout(() => setRefreshing(false), 600);
  };

  const completedAttempts = attempts.filter((a) => a.status === 'completed');
  const uniqueStudentsTested = new Set(completedAttempts.map((a) => a.studentId)).size;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Top Admin Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-mono mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Super Administrator Session • {admin.email || 'Admin'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Cyber Crime Police Station Tapi - Administrative Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
            Full authority to manage student logins, curriculum question pools, day timers, live quiz audits, and confidential final assessments.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-medium transition-all"
            title="Reload database records"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={onSwitchToStudentView}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all"
          >
            Preview Student Experience
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'overview'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
          Overview &amp; Insights
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'students'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-cyan-400" />
          Student Accounts ({students.length})
        </button>

        <button
          onClick={() => setActiveTab('questions')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'questions'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          Question Bank ({questions.length})
        </button>

        <button
          onClick={() => setActiveTab('configs')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'configs'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          Quiz Rules &amp; Timers
        </button>

        <button
          onClick={() => setActiveTab('attempts')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'attempts'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-cyan-400" />
          Submissions Log ({attempts.length})
        </button>

        <button
          onClick={() => setActiveTab('final_results')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'final_results'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-emerald-400 hover:bg-emerald-950/30'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          Private Final Results
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Enrolled Students</span>
                <Users className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">{students.length}</div>
              <div className="text-[11px] text-emerald-400 mt-1 font-medium">
                {students.filter((s) => s.isActive).length} Authorized Active
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Question Bank Pool</span>
                <BookOpen className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">{questions.length}</div>
              <div className="text-[11px] text-slate-400 mt-1">
                Distributed across 4 days
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Total Attempts Logged</span>
                <FileText className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">{completedAttempts.length}</div>
              <div className="text-[11px] text-cyan-300 mt-1">
                From {uniqueStudentsTested} students
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Security Protocol</span>
                <Lock className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-sm font-bold text-emerald-400 mt-1">
                Firebase ABAC Rules
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Final Results Restricted
              </div>
            </div>
          </div>

          {/* Quick Module Status Overview */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              Four-Day Training Curriculum Status
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {configs.map((c) => {
                const dayQCount = questions.filter((q) => Number(q.day) === Number(c.day)).length;
                const dayAttempts = attempts.filter((a) => a.day === c.day && a.status === 'completed');

                return (
                  <div
                    key={c.id}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-cyan-400">
                        Day 0{c.day}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          c.isDayActive
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {c.isDayActive ? 'Active' : 'Locked'}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white line-clamp-1">{c.title}</h4>

                    <div className="space-y-1 text-[11px] text-slate-400">
                      <div className="flex justify-between">
                        <span>Bank Questions:</span>
                        <span className="font-mono text-white">{dayQCount} items</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Timer per Q:</span>
                        <span className="font-mono text-white">{c.timeLimitPerQuestion}s</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Completed Tests:</span>
                        <span className="font-mono text-cyan-400 font-bold">{dayAttempts.length}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'students' && (
        <StudentManager students={students} onRefresh={onRefreshAll} />
      )}

      {activeTab === 'questions' && (
        <QuestionManager questions={questions} onRefresh={onRefreshAll} />
      )}

      {activeTab === 'configs' && (
        <ConfigManager configs={configs} onRefresh={onRefreshAll} />
      )}

      {activeTab === 'attempts' && (
        <AttemptsTracker attempts={attempts} onRefresh={onRefreshAll} />
      )}

      {activeTab === 'final_results' && (
        <FinalResultsManager configs={configs} />
      )}
    </div>
  );
};
