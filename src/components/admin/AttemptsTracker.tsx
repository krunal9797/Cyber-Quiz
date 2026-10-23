import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  Eye,
  RotateCcw,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  X,
  Trash2,
} from 'lucide-react';
import { QuizAttempt } from '../../types';
import { deleteAttempt } from '../../services/quizService';

interface AttemptsTrackerProps {
  attempts: QuizAttempt[];
  onRefresh: () => void;
}

export const AttemptsTracker: React.FC<AttemptsTrackerProps> = ({ attempts, onRefresh }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dayFilter, setDayFilter] = useState<number | 'all'>('all');
  const [inspectingAttempt, setInspectingAttempt] = useState<QuizAttempt | null>(null);

  const handleResetAttempt = async (attemptId: string, studentName: string, day: number) => {
    if (
      window.confirm(
        `Reset Day ${day} attempt for ${studentName}? This deletes the submission and permits the student to re-take the quiz.`
      )
    ) {
      try {
        await deleteAttempt(attemptId);
        onRefresh();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filtered = attempts.filter((a) => {
    if (dayFilter !== 'all' && Number(a.day) !== Number(dayFilter)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        a.studentName.toLowerCase().includes(q) ||
        a.rollNumber.toLowerCase().includes(q) ||
        a.studentId.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            Live Student Submissions &amp; Log Tracker
          </h2>
          <p className="text-xs text-slate-400">
            Audit individual quiz attempts, inspect response sheets, and reset attempts for re-examination.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setDayFilter('all')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              dayFilter === 'all' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Modules
          </button>
          {[1, 2, 3, 4].map((d) => (
            <button
              key={d}
              onClick={() => setDayFilter(d)}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                dayFilter === d ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Day {d}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student or roll number..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Roll / ID</th>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4 text-center">Score</th>
                <th className="py-3 px-4 text-center">Breakdown (C / W / U)</th>
                <th className="py-3 px-4 text-center">Time Spent</th>
                <th className="py-3 px-4">Submitted At</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500 text-xs">
                    No quiz submissions found matching filters.
                  </td>
                </tr>
              ) : (
                filtered.map((att) => (
                  <tr key={att.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white text-sm">{att.studentName}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400 text-xs">
                      {att.rollNumber}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 text-[11px] font-bold">
                        Day 0{att.day}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-sm text-cyan-400">
                      {att.score} / {att.totalMarks}
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-xs">
                      <span className="text-emerald-400 font-semibold">{att.correctCount}</span> /{' '}
                      <span className="text-red-400 font-semibold">{att.incorrectCount}</span> /{' '}
                      <span className="text-slate-500 font-semibold">{att.unansweredCount}</span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-slate-300">
                      {att.timeTakenSeconds}s
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px] font-mono">
                      {att.completedAt
                        ? new Date(att.completedAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            month: 'short',
                            day: 'numeric',
                          })
                        : '—'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setInspectingAttempt(att)}
                          title="Inspect Student Answer Sheet"
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-[11px] flex items-center gap-1 font-medium"
                        >
                          <Eye className="w-3 h-3 text-cyan-400" />
                          Inspect
                        </button>

                        <button
                          onClick={() =>
                            handleResetAttempt(att.id, att.studentName, att.day)
                          }
                          title="Reset attempt for re-take"
                          className="p-1 rounded-lg bg-slate-800 hover:bg-amber-950/40 text-slate-400 hover:text-amber-400 transition-all"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Answer Sheet Inspection Modal */}
      {inspectingAttempt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl my-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold">
                  Day 0{inspectingAttempt.day} Inspection
                </span>
                <h3 className="font-bold text-base text-white mt-1">
                  Candidate: {inspectingAttempt.studentName} ({inspectingAttempt.rollNumber})
                </h3>
              </div>
              <button
                onClick={() => setInspectingAttempt(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-500 block text-[10px]">Score</span>
                <span className="font-mono font-bold text-cyan-400 text-sm">
                  {inspectingAttempt.score} / {inspectingAttempt.totalMarks}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Correct</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {inspectingAttempt.correctCount}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Incorrect</span>
                <span className="font-mono font-bold text-red-400 text-sm">
                  {inspectingAttempt.incorrectCount}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Time Spent</span>
                <span className="font-mono font-bold text-slate-300 text-sm">
                  {inspectingAttempt.timeTakenSeconds}s
                </span>
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {inspectingAttempt.answers.map((ans, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                    ans.isCorrect
                      ? 'bg-emerald-950/20 border-emerald-900/60'
                      : 'bg-red-950/20 border-red-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-white">Q{idx + 1}. {ans.questionText}</span>
                    <span className="shrink-0 font-mono text-[10px] text-slate-400">
                      {ans.timeSpentSeconds}s spent
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px]">
                    {ans.options.map((opt, oIdx) => {
                      const isChosen = ans.selectedOptionIndex === oIdx;
                      const isRight = ans.correctAnswerIndex === oIdx;

                      return (
                        <div
                          key={oIdx}
                          className={`px-2.5 py-1 rounded flex items-center justify-between ${
                            isRight
                              ? 'bg-emerald-900/50 text-emerald-200 font-semibold'
                              : isChosen
                              ? 'bg-red-900/50 text-red-200'
                              : 'text-slate-400'
                          }`}
                        >
                          <span>
                            {String.fromCharCode(65 + oIdx)}. {opt}
                          </span>
                          <span className="text-[10px] font-mono">
                            {isChosen && '(Student Selection)'}
                            {isRight && ' ✓ Correct'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setInspectingAttempt(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
