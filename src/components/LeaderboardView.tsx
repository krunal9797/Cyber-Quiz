import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Medal,
  Clock,
  ArrowLeft,
  Lock,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { DayNumber, QuizConfig } from '../types';
import { getLeaderboardData, LeaderboardEntry } from '../services/quizService';

interface LeaderboardViewProps {
  configs: QuizConfig[];
  isAdmin: boolean;
  onBack: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  configs,
  isAdmin,
  onBack,
}) => {
  const [selectedTab, setSelectedTab] = useState<'overall' | DayNumber>('overall');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchLeaderboard();
  }, [selectedTab]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const data = await getLeaderboardData(
        selectedTab === 'overall' ? undefined : (selectedTab as DayNumber)
      );
      setEntries(data);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  // Check if current day's leaderboard is hidden for non-admins
  const currentDayConfig =
    selectedTab !== 'overall' ? configs.find((c) => c.day === selectedTab) : null;
  const isHiddenForStudents =
    !isAdmin && currentDayConfig && !currentDayConfig.isLeaderboardVisible;

  const filteredEntries = entries.filter((e) => {
    const q = searchQuery.toLowerCase();
    return (
      e.studentName.toLowerCase().includes(q) ||
      e.rollNumber.toLowerCase().includes(q) ||
      e.studentId.toLowerCase().includes(q)
    );
  });

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <span className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-400 font-bold flex items-center justify-center text-xs shadow-md shadow-amber-500/20">
          🥇 1
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="w-7 h-7 rounded-full bg-slate-300/20 border border-slate-300/50 text-slate-200 font-bold flex items-center justify-center text-xs">
          🥈 2
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="w-7 h-7 rounded-full bg-amber-700/20 border border-amber-700/50 text-amber-600 font-bold flex items-center justify-center text-xs">
          🥉 3
        </span>
      );
    }
    return (
      <span className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 font-mono font-bold flex items-center justify-center text-xs">
        {rank}
      </span>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-400" />
              Cyber Training Leaderboards
            </h1>
            <p className="text-xs text-slate-400">
              Live standings and speed metrics across all training modules.
            </p>
          </div>
        </div>

        {/* Tie-breaking rule notice */}
        <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>
            Tie-Break Rule: <strong className="text-slate-200">Total Marks</strong>, then{' '}
            <strong className="text-cyan-300">Least Time Taken</strong>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
        <button
          onClick={() => setSelectedTab('overall')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            selectedTab === 'overall'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          Overall Standings
        </button>

        {([1, 2, 3, 4] as DayNumber[]).map((d) => (
          <button
            key={d}
            onClick={() => setSelectedTab(d)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedTab === d
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Day {d} Quiz
          </button>
        ))}
      </div>

      {/* Admin visibility restriction message */}
      {isHiddenForStudents ? (
        <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6 text-amber-400" />
          </div>
          <h3 className="text-base font-bold text-white">Leaderboard Restricted</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            The course administrator has configured this day&apos;s leaderboard to remain private. Only administrators have access to these scores.
          </p>
        </div>
      ) : (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          {/* Search bar inside table */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-4">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search student or roll number..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-all"
              />
            </div>
            <div className="text-xs text-slate-400 font-mono">
              {filteredEntries.length} candidates ranked
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              Calculating rankings...
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No submissions recorded yet for this leaderboard.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                    <th className="py-3.5 px-4 w-16">Rank</th>
                    <th className="py-3.5 px-4">Student</th>
                    <th className="py-3.5 px-4">Roll / ID</th>
                    {selectedTab === 'overall' && (
                      <th className="py-3.5 px-4">Days Completed</th>
                    )}
                    <th className="py-3.5 px-4 text-right">Score</th>
                    <th className="py-3.5 px-4 text-right">Time Taken</th>
                    <th className="py-3.5 px-4 text-right">Accuracy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredEntries.map((item) => (
                    <tr
                      key={item.studentId}
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono">{getRankBadge(item.rank)}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-sm">
                          {item.studentName}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-400 text-xs">
                        {item.rollNumber}
                        <span className="block text-[10px] text-slate-600">{item.studentId}</span>
                      </td>
                      {selectedTab === 'overall' && (
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono text-[11px]">
                            {item.completedQuizzesCount} / 4
                          </span>
                        </td>
                      )}
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-sm text-cyan-400">
                        {item.totalScore} pts
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                        {item.totalTimeSeconds}s
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-semibold text-emerald-400">
                        {item.accuracyPercentage}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
