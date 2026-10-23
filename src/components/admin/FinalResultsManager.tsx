import React, { useState, useEffect } from 'react';
import {
  Lock,
  Download,
  Award,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  FileSpreadsheet,
  FileCheck,
  ShieldAlert,
  Printer,
  X,
} from 'lucide-react';
import { FinalResult, QuizConfig } from '../../types';
import { getFinalResults, computeAndSaveFinalResults } from '../../services/quizService';

interface FinalResultsManagerProps {
  configs: QuizConfig[];
}

export const FinalResultsManager: React.FC<FinalResultsManagerProps> = ({ configs }) => {
  const [results, setResults] = useState<FinalResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentReport, setSelectedStudentReport] = useState<FinalResult | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'certified' | 'incomplete'>('all');

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    setLoading(true);
    try {
      const data = await getFinalResults();
      setResults(data);
    } catch (err) {
      console.error('Error loading final results:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRecalculate = async () => {
    setLoading(true);
    try {
      const fresh = await computeAndSaveFinalResults();
      setResults(fresh);
    } catch (err) {
      console.error('Error recalculating final results:', err);
    } finally {
      setLoading(false);
    }
  };

  const exportConsolidatedCSV = () => {
    const headers = [
      'Rank',
      'Student ID',
      'Roll Number',
      'Full Name',
      'Day 1 Score',
      'Day 2 Score',
      'Day 3 Score',
      'Day 4 Score',
      'Total Marks Obtained',
      'Maximum Possible Marks',
      'Total Time Seconds',
      'Overall Percentage',
      'Performance Grade',
      'Days Completed',
      'Certificate Eligible',
      'Evaluation Timestamp',
    ];

    const rows = results.map((r) => [
      r.rank,
      `"${r.studentId}"`,
      `"${r.rollNumber}"`,
      `"${r.fullName}"`,
      r.dayScores[1]?.score ?? 'N/A',
      r.dayScores[2]?.score ?? 'N/A',
      r.dayScores[3]?.score ?? 'N/A',
      r.dayScores[4]?.score ?? 'N/A',
      r.totalMarks,
      r.totalMaxMarks,
      r.totalTimeSeconds,
      `${r.percentage}%`,
      `"${r.grade || 'Incomplete'}"`,
      `${r.completedDaysCount}/4`,
      `"${r.isCertified ? 'YES' : 'NO'}"`,
      `"${r.updatedAt}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `CyberCrime_Assessment_Final_Results_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = results.filter((r) => {
    if (statusFilter === 'certified' && !r.isCertified) return false;
    if (statusFilter === 'incomplete' && r.completedDaysCount === 4) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.fullName.toLowerCase().includes(q) ||
        r.rollNumber.toLowerCase().includes(q) ||
        r.studentId.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const certifiedCount = results.filter((r) => r.isCertified).length;
  const avgPercentage =
    results.length > 0
      ? Math.round(results.reduce((acc, curr) => acc + curr.percentage, 0) / results.length)
      : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Strict Privacy Notice & Top Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/20 border border-amber-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">
                Confidential Final Results &amp; Certification Portal
              </h2>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-300 font-bold">
                Admin Eyes Only
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              In accordance with security requirements, this consolidated report is protected by Firebase Security Rules and is never exposed or returned to student accounts.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleRecalculate}
            disabled={loading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
            Recalculate Ranks
          </button>

          <button
            onClick={exportConsolidatedCSV}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Export to Excel / CSV
          </button>
        </div>
      </div>

      {/* Cohort Metrics Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 block font-medium">Total Cohort Students</span>
          <span className="text-2xl font-black text-white font-mono mt-1 block">
            {results.length}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 block font-medium">Certified Eligible</span>
          <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">
            {certifiedCount}{' '}
            <span className="text-xs text-slate-500 font-normal">
              ({results.length > 0 ? Math.round((certifiedCount / results.length) * 100) : 0}%)
            </span>
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 block font-medium">Cohort Average Score</span>
          <span className="text-2xl font-black text-cyan-400 font-mono mt-1 block">
            {avgPercentage}%
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 block font-medium">Top Rank Candidate</span>
          <span className="text-sm font-bold text-amber-300 truncate mt-2 block">
            {results[0] ? `${results[0].fullName} (${results[0].percentage}%)` : '—'}
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidate name or roll..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Candidates</option>
              <option value="certified">Certified Eligible</option>
              <option value="incomplete">Incomplete Progress</option>
            </select>
          </div>

          <div className="text-xs font-mono text-slate-400">
            {filtered.length} candidate reports
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 w-14">Rank</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Roll / ID</th>
                <th className="py-3 px-3 text-center">Day 1</th>
                <th className="py-3 px-3 text-center">Day 2</th>
                <th className="py-3 px-3 text-center">Day 3</th>
                <th className="py-3 px-3 text-center">Day 4</th>
                <th className="py-3 px-4 text-center">Total Marks</th>
                <th className="py-3 px-4 text-center">Percentage</th>
                <th className="py-3 px-4 text-center">Evaluation Grade</th>
                <th className="py-3 px-4 text-center">Certificate</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((item) => (
                <tr key={item.studentId} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">
                    #{item.rank}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-white text-sm">{item.fullName}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400 text-xs">
                    {item.rollNumber}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-xs">
                    {item.dayScores[1] ? (
                      <span className="text-slate-200">{item.dayScores[1].score}</span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-xs">
                    {item.dayScores[2] ? (
                      <span className="text-slate-200">{item.dayScores[2].score}</span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-xs">
                    {item.dayScores[3] ? (
                      <span className="text-slate-200">{item.dayScores[3].score}</span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-xs">
                    {item.dayScores[4] ? (
                      <span className="text-slate-200">{item.dayScores[4].score}</span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-cyan-400 text-sm">
                    {item.totalMarks} / {item.totalMaxMarks}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-emerald-400">
                    {item.percentage}%
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-[11px]">
                    <span
                      className={`px-2 py-0.5 rounded font-medium ${
                        item.percentage >= 70
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                          : item.percentage >= 50
                          ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.grade || 'Incomplete'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {item.isCertified ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" /> Eligible
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 text-[10px]">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedStudentReport(item)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-[11px] font-medium"
                    >
                      Report Card
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Card Modal */}
      {selectedStudentReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-2xl relative space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-base text-white">
                  Student Assessment &amp; Certification Report
                </h3>
              </div>
              <button
                onClick={() => setSelectedStudentReport(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile info */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white">
                    {selectedStudentReport.fullName}
                  </h4>
                  <p className="text-xs font-mono text-slate-400">
                    Roll: {selectedStudentReport.rollNumber} • ID: {selectedStudentReport.studentId}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">
                    Cohort Standing
                  </span>
                  <span className="font-mono font-black text-amber-400 text-lg">
                    Rank #{selectedStudentReport.rank}
                  </span>
                </div>
              </div>
            </div>

            {/* Day Breakdown */}
            <div className="space-y-2">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Four-Day Module Scores
              </h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[1, 2, 3, 4].map((d) => {
                  const scoreObj = selectedStudentReport.dayScores[d as 1 | 2 | 3 | 4];
                  return (
                    <div
                      key={d}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                    >
                      <span className="font-mono font-medium text-slate-400">Day 0{d}</span>
                      {scoreObj ? (
                        <div className="text-right font-mono">
                          <span className="font-bold text-cyan-400">{scoreObj.score} pts</span>
                          <span className="text-[10px] text-slate-500 block">{scoreObj.timeTakenSeconds}s</span>
                        </div>
                      ) : (
                        <span className="text-slate-600 font-mono">Not attempted</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Final Outcome */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-950 to-emerald-950/40 border border-slate-800 space-y-2 text-center">
              <div className="text-xs text-slate-400">Consolidated Performance</div>
              <div className="text-2xl font-black text-white font-mono">
                {selectedStudentReport.percentage}%{' '}
                <span className="text-sm font-normal text-slate-400">
                  ({selectedStudentReport.totalMarks} / {selectedStudentReport.totalMaxMarks} Marks)
                </span>
              </div>
              <div className="text-xs font-semibold text-emerald-400">
                Classification: {selectedStudentReport.grade}
              </div>
              <div className="pt-2">
                {selectedStudentReport.isCertified ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Eligible for Cyber Training Certification
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs">
                    Incomplete: Must complete all 4 module quizzes with 50%+ score
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedStudentReport(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
