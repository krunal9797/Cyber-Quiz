import React from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  ArrowLeft,
  Trophy,
  AlertCircle,
  HelpCircle,
  EyeOff,
  ShieldCheck,
} from 'lucide-react';
import { QuizAttempt, QuizConfig } from '../types';

interface QuizReviewScreenProps {
  attempt: QuizAttempt;
  config: QuizConfig;
  onBackToDashboard: () => void;
  onViewLeaderboard: () => void;
}

export const QuizReviewScreen: React.FC<QuizReviewScreenProps> = ({
  attempt,
  config,
  onBackToDashboard,
  onViewLeaderboard,
}) => {
  const accuracy =
    attempt.totalQuestions > 0
      ? Math.round((attempt.correctCount / attempt.totalQuestions) * 100)
      : 0;

  const showExplanations = config.showReviewExplanations;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <button
          onClick={onViewLeaderboard}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300 hover:bg-cyan-900 text-xs font-semibold transition-all"
        >
          <Trophy className="w-3.5 h-3.5 text-cyan-400" />
          View Leaderboard
        </button>
      </div>

      {/* Performance Score Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/30 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-mono mb-2">
              Day 0{attempt.day} Review • {attempt.studentName} ({attempt.rollNumber})
            </div>
            <h2 className="text-2xl font-extrabold text-white">Quiz Attempt Review</h2>
            <p className="text-xs text-slate-400 mt-1">
              {config.title}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center min-w-[110px]">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                Total Score
              </span>
              <span className="text-2xl font-black text-cyan-400 font-mono">
                {attempt.score}{' '}
                <span className="text-xs text-slate-500 font-normal">/ {attempt.totalMarks}</span>
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center min-w-[110px]">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                Accuracy
              </span>
              <span className="text-2xl font-black text-emerald-400 font-mono">
                {accuracy}%
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
            <div className="text-[11px] text-slate-400">Total Questions</div>
            <div className="text-base font-bold text-white font-mono mt-0.5">
              {attempt.totalQuestions}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-900/40 text-center">
            <div className="text-[11px] text-emerald-400">Correct Answers</div>
            <div className="text-base font-bold text-emerald-300 font-mono mt-0.5">
              {attempt.correctCount}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-red-950/30 border border-red-900/40 text-center">
            <div className="text-[11px] text-red-400">Incorrect Answers</div>
            <div className="text-base font-bold text-red-300 font-mono mt-0.5">
              {attempt.incorrectCount}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
            <div className="text-[11px] text-slate-400">Time Taken</div>
            <div className="text-base font-bold text-slate-200 font-mono mt-0.5 flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {attempt.timeTakenSeconds}s
            </div>
          </div>
        </div>
      </div>

      {/* Admin Privacy Notice if explanations disabled */}
      {!showExplanations && (
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/60 text-amber-200 text-xs flex items-center gap-3">
          <EyeOff className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <strong className="block font-semibold">Explanations Restricted by Admin</strong>
            <span>
              The administrator has configured this quiz day to keep correct answers and forensic explanations private until evaluation concludes.
            </span>
          </div>
        </div>
      )}

      {/* Questions Review List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          Detailed Questions Review
        </h3>

        {attempt.answers.map((ans, idx) => {
          const isAnswered = ans.selectedOptionIndex !== null;
          const isCorrect = ans.isCorrect;

          return (
            <div
              key={ans.questionId || idx}
              className={`rounded-2xl border p-5 bg-slate-900/60 backdrop-blur-sm transition-all ${
                !showExplanations
                  ? 'border-slate-800'
                  : isCorrect
                  ? 'border-emerald-900/60 bg-emerald-950/10'
                  : 'border-red-900/50 bg-red-950/10'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400">
                    Q0{idx + 1}.
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {ans.category}
                  </span>
                </div>

                {showExplanations ? (
                  isCorrect ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+{config.marksPerQuestion})
                    </span>
                  ) : !isAnswered ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs font-medium">
                      <Clock className="w-3.5 h-3.5" /> Timed Out / Skipped
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
                      <XCircle className="w-3.5 h-3.5" /> Incorrect
                    </span>
                  )
                ) : (
                  <span className="text-xs text-slate-400 font-mono">
                    {isAnswered ? 'Attempted' : 'Unanswered'}
                  </span>
                )}
              </div>

              {/* Question Text */}
              <p className="text-sm font-semibold text-white mb-4 leading-relaxed">
                {ans.questionText}
              </p>

              {/* Options */}
              <div className="space-y-2 mb-4">
                {ans.options.map((opt, optIdx) => {
                  const isUserSelection = ans.selectedOptionIndex === optIdx;
                  const isCorrectAnswer = ans.correctAnswerIndex === optIdx;

                  let optionStyle =
                    'bg-slate-950/60 border-slate-800/80 text-slate-300';

                  if (showExplanations) {
                    if (isCorrectAnswer) {
                      optionStyle = 'bg-emerald-950/50 border-emerald-500 text-white font-medium';
                    } else if (isUserSelection && !isCorrect) {
                      optionStyle = 'bg-red-950/50 border-red-500 text-red-200';
                    }
                  } else {
                    if (isUserSelection) {
                      optionStyle = 'bg-cyan-950/60 border-cyan-500 text-white';
                    }
                  }

                  return (
                    <div
                      key={optIdx}
                      className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between gap-3 ${optionStyle}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-lg bg-slate-800 text-slate-400 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5 text-xs font-mono">
                        {isUserSelection && (
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                            Your Choice
                          </span>
                        )}
                        {showExplanations && isCorrectAnswer && (
                          <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct Answer
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* In-depth Forensic Explanation (if allowed by admin) */}
              {showExplanations && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-cyan-400 text-[11px] uppercase tracking-wider">
                    <HelpCircle className="w-3.5 h-3.5" />
                    Investigative Explanation
                  </div>
                  <p className="leading-relaxed text-slate-300">{ans.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center pt-4">
        <button
          onClick={onBackToDashboard}
          className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm transition-all"
        >
          Return to All Training Quizzes
        </button>
      </div>
    </div>
  );
};
