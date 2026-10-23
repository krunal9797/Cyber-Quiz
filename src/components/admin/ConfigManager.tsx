import React, { useState } from 'react';
import {
  Sliders,
  Clock,
  Award,
  Eye,
  EyeOff,
  Trophy,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  Save,
} from 'lucide-react';
import { QuizConfig } from '../../types';
import { saveQuizConfig } from '../../services/quizService';

interface ConfigManagerProps {
  configs: QuizConfig[];
  onRefresh: () => void;
}

export const ConfigManager: React.FC<ConfigManagerProps> = ({ configs, onRefresh }) => {
  const [localConfigs, setLocalConfigs] = useState<QuizConfig[]>(configs);
  const [savingDay, setSavingDay] = useState<number | null>(null);
  const [savedSuccessDay, setSavedSuccessDay] = useState<number | null>(null);

  const handleUpdate = (day: number, field: keyof QuizConfig, value: any) => {
    setLocalConfigs((prev) =>
      prev.map((c) => (c.day === day ? { ...c, [field]: value } : c))
    );
  };

  const handleSaveDay = async (cfg: QuizConfig) => {
    setSavingDay(cfg.day);
    try {
      await saveQuizConfig(cfg);
      setSavedSuccessDay(cfg.day);
      setTimeout(() => setSavedSuccessDay(null), 2500);
      onRefresh();
    } catch (err) {
      console.error(err);
    } finally {
      setSavingDay(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Sliders className="w-5 h-5 text-cyan-400" />
          Day-wise Quiz Rules &amp; Visibility Controls
        </h2>
        <p className="text-xs text-slate-400">
          Configure per-question timers, randomized question counts, scoring weights, review explanations, and student leaderboard visibility.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {localConfigs.map((cfg) => {
          const isSaving = savingDay === cfg.day;
          const isSaved = savedSuccessDay === cfg.day;

          return (
            <div
              key={cfg.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl hover:border-slate-700 transition-all"
            >
              {/* Day Header */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                    Day 0{cfg.day}
                  </span>
                  <h3 className="font-bold text-base text-white mt-1.5">{cfg.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdate(cfg.day, 'isDayActive', !cfg.isDayActive)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                      cfg.isDayActive
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {cfg.isDayActive ? (
                      <>
                        <Unlock className="w-3 h-3" /> Active
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3" /> Locked
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Title & Description Inputs */}
              <div className="space-y-2">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Quiz Module Title
                  </label>
                  <input
                    type="text"
                    value={cfg.title}
                    onChange={(e) => handleUpdate(cfg.day, 'title', e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Timer & Question Counts */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                  <label className="block text-slate-400 mb-1 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    Timer / Question (sec)
                  </label>
                  <input
                    type="number"
                    min={15}
                    max={300}
                    value={cfg.timeLimitPerQuestion}
                    onChange={(e) =>
                      handleUpdate(cfg.day, 'timeLimitPerQuestion', Math.max(10, Number(e.target.value)))
                    }
                    className="w-full px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Auto-forwards when 0
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                  <label className="block text-slate-400 mb-1 flex items-center gap-1 font-medium">
                    <Award className="w-3.5 h-3.5 text-cyan-400" />
                    Questions per Quiz
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={cfg.questionsPerQuiz}
                    onChange={(e) =>
                      handleUpdate(cfg.day, 'questionsPerQuiz', Math.max(1, Number(e.target.value)))
                    }
                    className="w-full px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-sm font-mono text-white focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Sampled randomly from bank
                  </span>
                </div>
              </div>

              {/* Scoring Weights */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                  <label className="block text-slate-400 mb-1 font-medium">
                    Marks per Correct Answer
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={cfg.marksPerQuestion}
                    onChange={(e) =>
                      handleUpdate(cfg.day, 'marksPerQuestion', Math.max(1, Number(e.target.value)))
                    }
                    className="w-full px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-sm font-mono text-emerald-300 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                  <label className="block text-slate-400 mb-1 font-medium">
                    Negative Marks / Wrong
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={5}
                    step={0.25}
                    value={cfg.negativeMarksPerQuestion}
                    onChange={(e) =>
                      handleUpdate(cfg.day, 'negativeMarksPerQuestion', Math.max(0, Number(e.target.value)))
                    }
                    className="w-full px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-sm font-mono text-amber-300 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Privacy Toggles */}
              <div className="space-y-2 pt-1 border-t border-slate-800">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs">
                  <div className="flex items-center gap-2">
                    {cfg.showReviewExplanations ? (
                      <Eye className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-slate-500" />
                    )}
                    <div>
                      <span className="font-semibold text-white block">
                        Show Explanations on Review
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Students see correct answers and forensic details after quiz
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={cfg.showReviewExplanations}
                    onChange={(e) =>
                      handleUpdate(cfg.day, 'showReviewExplanations', e.target.checked)
                    }
                    className="rounded border-slate-800 bg-slate-900 text-cyan-500 focus:ring-cyan-500 w-4 h-4"
                  />
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <div>
                      <span className="font-semibold text-white block">
                        Public Student Leaderboard
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Allow students to see daily rankings and rankings table
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={cfg.isLeaderboardVisible}
                    onChange={(e) =>
                      handleUpdate(cfg.day, 'isLeaderboardVisible', e.target.checked)
                    }
                    className="rounded border-slate-800 bg-slate-900 text-cyan-500 focus:ring-cyan-500 w-4 h-4"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-2">
                <button
                  onClick={() => handleSaveDay(cfg)}
                  disabled={isSaving}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isSaved
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  {isSaving ? (
                    'Saving Settings...'
                  ) : isSaved ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Day {cfg.day} Settings Saved!
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      Save Day 0{cfg.day} Rules
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
