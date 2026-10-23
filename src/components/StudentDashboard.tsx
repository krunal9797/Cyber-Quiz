import React from 'react';
import {
  Shield,
  Clock,
  CheckCircle2,
  Lock,
  ArrowRight,
  Eye,
  Award,
  AlertCircle,
  HelpCircle,
  FileCheck,
  Search,
  Fingerprint,
  Trophy,
} from 'lucide-react';
import { DayNumber, QuizAttempt, QuizConfig, Student } from '../types';

interface StudentDashboardProps {
  student: Student;
  configs: QuizConfig[];
  attempts: QuizAttempt[];
  onStartQuiz: (day: DayNumber) => void;
  onViewReview: (attempt: QuizAttempt) => void;
  onOpenLeaderboard: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  student,
  configs,
  attempts,
  onStartQuiz,
  onViewReview,
  onOpenLeaderboard,
}) => {
  const getAttemptForDay = (day: DayNumber) => {
    return attempts.find((a) => a.day === day && a.status === 'completed');
  };

  const completedCount = [1, 2, 3, 4].filter((d) => getAttemptForDay(d as DayNumber)).length;
  const progressPercent = Math.round((completedCount / 4) * 100);

  const getDayIcon = (day: DayNumber) => {
    switch (day) {
      case 1:
        return <Shield className="w-5 h-5 text-cyan-400" />;
      case 2:
        return <AlertCircle className="w-5 h-5 text-amber-400" />;
      case 3:
        return <Search className="w-5 h-5 text-purple-400" />;
      case 4:
        return <Fingerprint className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getDayThemeBorder = (day: DayNumber) => {
    switch (day) {
      case 1:
        return 'hover:border-cyan-500/50 group-hover:shadow-cyan-500/10';
      case 2:
        return 'hover:border-amber-500/50 group-hover:shadow-amber-500/10';
      case 3:
        return 'hover:border-purple-500/50 group-hover:shadow-purple-500/10';
      case 4:
        return 'hover:border-emerald-500/50 group-hover:shadow-emerald-500/10';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      {/* Student Profile & Progress Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Student ID: {student.studentId} • Roll: {student.rollNumber}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome, {student.fullName}
            </h1>
            <p className="text-sm text-slate-400 max-w-xl">
              Cyber Crime Awareness &amp; Investigation Training Curriculum. Complete all 4 day quizzes to qualify for the program assessment.
            </p>
          </div>

          {/* Progress summary block */}
          <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-800/90 p-4 rounded-2xl shrink-0">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="5"
                  className="text-slate-800"
                  fill="transparent"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="5"
                  className="text-cyan-400 transition-all duration-1000 ease-out"
                  fill="transparent"
                  strokeDasharray={163.3}
                  strokeDashoffset={163.3 - (163.3 * progressPercent) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute font-mono font-bold text-sm text-white">
                {progressPercent}%
              </span>
            </div>
            <div>
              <div className="text-xs text-slate-400">Curriculum Progress</div>
              <div className="text-base font-bold text-white">
                {completedCount} of 4 Days Completed
              </div>
              <div className="text-[11px] text-cyan-400 font-medium">
                {completedCount === 4 ? 'All Quizzes Finished!' : `${4 - completedCount} Days Remaining`}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Day Quiz Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-cyan-400" />
              Four-Day Training Quizzes
            </h2>
            <p className="text-xs text-slate-400">Each quiz contains randomized questions with a per-question timer.</p>
          </div>
          <button
            onClick={onOpenLeaderboard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition-all"
          >
            <Trophy className="w-3.5 h-3.5" />
            View Leaderboard
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {([1, 2, 3, 4] as DayNumber[]).map((day) => {
            const config = configs.find((c) => c.day === day) || {
              id: `day${day}`,
              day,
              title: `Day ${day} Quiz`,
              description: 'Cyber crime investigation topic',
              timeLimitPerQuestion: 45,
              questionsPerQuiz: 5,
              marksPerQuestion: 1,
              negativeMarksPerQuestion: 0,
              showReviewExplanations: true,
              isLeaderboardVisible: true,
              isDayActive: true,
              updatedAt: '',
            };

            const attempt = getAttemptForDay(day);
            const isCompleted = !!attempt;
            const isLocked = !config.isDayActive;

            return (
              <div
                key={day}
                className={`group relative rounded-2xl border p-5 sm:p-6 transition-all bg-slate-900/60 backdrop-blur-sm ${
                  isCompleted
                    ? 'border-emerald-800/60 bg-emerald-950/10'
                    : isLocked
                    ? 'border-slate-800/60 opacity-60 bg-slate-950/40'
                    : 'border-slate-800 hover:bg-slate-900/90'
                } ${getDayThemeBorder(day)}`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      {getDayIcon(day)}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                        Module 0{day}
                      </span>
                      <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                        {config.title}
                      </h3>
                    </div>
                  </div>

                  {/* Status Badge */}
                  {isCompleted ? (
                    <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed
                    </span>
                  ) : isLocked ? (
                    <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-medium">
                      <Lock className="w-3.5 h-3.5" />
                      Locked
                    </span>
                  ) : (
                    <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium">
                      Ready
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {config.description}
                </p>

                {/* Meta details */}
                <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-slate-950/60 border border-slate-800/60 mb-5 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Questions</span>
                    <span className="font-mono font-semibold text-slate-200">
                      {config.questionsPerQuiz} items
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Timer / Q</span>
                    <span className="font-mono font-semibold text-slate-200 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {config.timeLimitPerQuestion}s
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Total Marks</span>
                    <span className="font-mono font-semibold text-slate-200">
                      {config.questionsPerQuiz * config.marksPerQuestion} pts
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                {isCompleted ? (
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <div className="text-xs">
                      <span className="text-slate-400">Score: </span>
                      <span className="font-bold text-emerald-400 font-mono text-sm">
                        {attempt.score} / {attempt.totalMarks}
                      </span>
                      <span className="text-slate-500 text-[10px] ml-1.5">
                        ({attempt.timeTakenSeconds}s total)
                      </span>
                    </div>
                    <button
                      onClick={() => onViewReview(attempt)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Review Answers
                    </button>
                  </div>
                ) : isLocked ? (
                  <div className="text-center py-2 text-xs text-slate-500 font-medium bg-slate-950/40 rounded-xl">
                    Day currently closed by training administrator
                  </div>
                ) : (
                  <button
                    onClick={() => onStartQuiz(day)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
                  >
                    Start Day {day} Quiz
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Final Result Privacy Enforcement Banner (Requirement 7) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
          <Award className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-white">
            Program Evaluation &amp; Privacy Policy
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Per the program assessment rules, <strong>final consolidated results, total cohort rankings, and official certificates</strong> are accessible only by course administrators. Your individual day-wise quiz reviews and daily leaderboard are available above.
          </p>
        </div>
      </div>
    </div>
  );
};
