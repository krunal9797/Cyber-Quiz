import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit3,
  HelpCircle,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { DayNumber, Question } from '../../types';
import { saveQuestion, deleteQuestion, seedInitialDatabase } from '../../services/quizService';

interface QuestionManagerProps {
  questions: Question[];
  onRefresh: () => void;
}

export const QuestionManager: React.FC<QuestionManagerProps> = ({ questions, onRefresh }) => {
  const [selectedDay, setSelectedDay] = useState<number | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Form states
  const [day, setDay] = useState<DayNumber>(1);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const openAdd = () => {
    setEditingQuestion(null);
    setDay(selectedDay === 'all' ? 1 : (selectedDay as DayNumber));
    setQuestionText('');
    setOptions(['', '', '', '']);
    setCorrectIndex(0);
    setExplanation('');
    setCategory('General Cyber Safety');
    setDifficulty('medium');
    setFormError(null);
    setShowModal(true);
  };

  const openEdit = (q: Question) => {
    setEditingQuestion(q);
    setDay(q.day);
    setQuestionText(q.question);
    setOptions([...q.options]);
    setCorrectIndex(q.correctAnswerIndex);
    setExplanation(q.explanation);
    setCategory(q.category);
    setDifficulty(q.difficulty);
    setFormError(null);
    setShowModal(true);
  };

  const handleOptionChange = (index: number, val: string) => {
    const updated = [...options];
    updated[index] = val;
    setOptions(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) {
      setFormError('Please enter the question description.');
      return;
    }
    if (options.some((o) => !o.trim())) {
      setFormError('All 4 options (A, B, C, D) must be provided.');
      return;
    }
    if (!explanation.trim()) {
      setFormError('Please provide an in-depth forensic/cyber explanation for review.');
      return;
    }

    setSubmitting(true);
    setFormError(null);

    const questionItem: Question = {
      id: editingQuestion?.id || `q_custom_${Date.now()}`,
      day,
      question: questionText.trim(),
      options: options.map((o) => o.trim()),
      correctAnswerIndex: correctIndex,
      explanation: explanation.trim(),
      category: category.trim() || 'General',
      difficulty,
      createdAt: editingQuestion?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await saveQuestion(questionItem);
      setShowModal(false);
      onRefresh();
    } catch (err) {
      console.error(err);
      setFormError('Error saving question to database.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (qid: string) => {
    if (window.confirm('Delete this question from the active bank?')) {
      try {
        await deleteQuestion(qid);
        onRefresh();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleRestoreDefaults = async () => {
    if (window.confirm('Seed/Restore all 32+ default cyber curriculum questions into the bank?')) {
      await seedInitialDatabase(true);
      onRefresh();
    }
  };

  const filtered = questions.filter((q) => {
    if (selectedDay !== 'all' && Number(q.day) !== Number(selectedDay)) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    if (searchQuery.trim()) {
      const s = searchQuery.toLowerCase();
      return (
        q.question.toLowerCase().includes(s) ||
        q.category.toLowerCase().includes(s) ||
        q.options.some((opt) => opt.toLowerCase().includes(s))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            Curriculum Question Bank
          </h2>
          <p className="text-xs text-slate-400">
            Manage randomized pool across Day 1 (Basic), Day 2 (Intermediate), Day 3 (OSINT), and Day 4 (Advanced).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRestoreDefaults}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 font-semibold transition-all"
            title="Seed/Restore standard 32+ questions"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            Restore Standard Bank
          </button>

          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Add New Question
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex flex-wrap items-center gap-2">
          {/* Day Filter */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setSelectedDay('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                selectedDay === 'all' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Days
            </button>
            {([1, 2, 3, 4] as DayNumber[]).map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selectedDay === d ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Day {d}
              </button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or tags..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-500 text-xs">
            No questions matching the filter criteria.
          </div>
        ) : (
          filtered.map((q, idx) => (
            <div
              key={q.id || idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold uppercase">
                    Day 0{q.day}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {q.category}
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                      q.difficulty === 'easy'
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                        : q.difficulty === 'hard'
                        ? 'bg-red-950/60 text-red-400 border border-red-800/60'
                        : 'bg-amber-950/60 text-amber-400 border border-amber-800/60'
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEdit(q)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                    title="Edit Question"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950/40 hover:text-red-400 text-slate-400 transition-all"
                    title="Delete Question"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h4 className="text-sm font-semibold text-white leading-relaxed">
                {q.question}
              </h4>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {q.options.map((opt, oIdx) => {
                  const isCorrect = q.correctAnswerIndex === oIdx;
                  return (
                    <div
                      key={oIdx}
                      className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${
                        isCorrect
                          ? 'bg-emerald-950/40 border-emerald-600/80 text-emerald-200'
                          : 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[11px] text-slate-500">
                          {String.fromCharCode(65 + oIdx)}.
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isCorrect && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="text-[11px] text-slate-400 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                <strong className="text-cyan-400">Explanation: </strong>
                {q.explanation}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Question Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl my-8">
            <h3 className="font-bold text-base text-white mb-1">
              {editingQuestion ? 'Edit Curriculum Question' : 'Add Question to Question Bank'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Configure question text, multiple choice options, correct answer index, and cyber security explanation.
            </p>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Training Day
                  </label>
                  <select
                    value={day}
                    onChange={(e) => setDay(Number(e.target.value) as DayNumber)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value={1}>Day 1: Basic Cyber Crime</option>
                    <option value={2}>Day 2: Intermediate / Financial</option>
                    <option value={3}>Day 3: OSINT</option>
                    <option value={4}>Day 4: Advanced / Forensics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. UPI Fraud, OSINT, Phishing"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Question Text / Investigative Scenario <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Enter the cyber crime problem statement, scenario, or question..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Answer Options &amp; Select Correct Answer <span className="text-red-400">*</span>
                </label>
                <div className="space-y-2">
                  {options.map((opt, oIdx) => (
                    <div key={oIdx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctAnswerIndex"
                        id={`optRadio_${oIdx}`}
                        checked={correctIndex === oIdx}
                        onChange={() => setCorrectIndex(oIdx)}
                        className="text-cyan-500 focus:ring-cyan-500"
                      />
                      <label
                        htmlFor={`optRadio_${oIdx}`}
                        className="font-mono text-xs font-bold text-slate-400 w-6"
                      >
                        {String.fromCharCode(65 + oIdx)}:
                      </label>
                      <input
                        type="text"
                        required
                        value={opt}
                        onChange={(e) => handleOptionChange(oIdx, e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + oIdx)} text`}
                        className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-1.5">
                  Select the radio button next to the option that is the correct answer.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Forensic Explanation &amp; Cyber Security Takeaway <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Explain why the answer is correct and provide educational cyber crime insight..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20"
                >
                  {submitting ? 'Saving...' : 'Save Question'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
