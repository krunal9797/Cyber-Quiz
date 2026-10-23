import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  X,
  HelpCircle,
  Flag,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DayNumber, Question, QuizAttempt, QuizConfig, Student, StudentAnswer } from '../types';
import { saveQuizAttempt } from '../services/quizService';

interface ShuffledQuestion {
  original: Question;
  shuffledOptions: string[];
  newCorrectIndex: number;
}

interface QuizEngineProps {
  student: Student;
  day: DayNumber;
  config: QuizConfig;
  allQuestions: Question[];
  onComplete: (attempt: QuizAttempt) => void;
  onCancel: () => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  student,
  day,
  config,
  allQuestions,
  onComplete,
  onCancel,
}) => {
  const [shuffledQuestions, setShuffledQuestions] = useState<ShuffledQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [timeSpentPerQuestion, setTimeSpentPerQuestion] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(config.timeLimitPerQuestion);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize randomized quiz questions
  useEffect(() => {
    const dayQuestions = allQuestions.filter((q) => Number(q.day) === Number(day));
    
    // Shuffle the question pool
    const pool = [...dayQuestions].sort(() => 0.5 - Math.random());
    const selected = pool.slice(0, Math.min(config.questionsPerQuiz, pool.length));

    // Shuffle options for each selected question
    const prepared: ShuffledQuestion[] = selected.map((q) => {
      const optionsWithOriginalIndex = q.options.map((opt, i) => ({ opt, originalIndex: i }));
      // Shuffle options
      optionsWithOriginalIndex.sort(() => 0.5 - Math.random());

      const shuffledOptions = optionsWithOriginalIndex.map((item) => item.opt);
      const newCorrectIndex = optionsWithOriginalIndex.findIndex(
        (item) => item.originalIndex === q.correctAnswerIndex
      );

      return {
        original: q,
        shuffledOptions,
        newCorrectIndex,
      };
    });

    setShuffledQuestions(prepared);
    setSelectedAnswers(new Array(prepared.length).fill(null));
    setTimeSpentPerQuestion(new Array(prepared.length).fill(0));
    setTimeLeft(config.timeLimitPerQuestion);
    startTimeRef.current = Date.now();
  }, [day, config, allQuestions]);

  // Per-question countdown timer
  useEffect(() => {
    if (shuffledQuestions.length === 0 || isSubmitting) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        // Track time spent on current question
        setTimeSpentPerQuestion((spents) => {
          const updated = [...spents];
          updated[currentIndex] = (updated[currentIndex] || 0) + 1;
          return updated;
        });

        if (prev <= 1) {
          // Timer expired for this question!
          handleQuestionTimeExpire();
          return config.timeLimitPerQuestion;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, shuffledQuestions.length, isSubmitting, config.timeLimitPerQuestion]);

  const handleQuestionTimeExpire = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      // Auto move forward to next question
      setCurrentIndex((curr) => curr + 1);
      setTimeLeft(config.timeLimitPerQuestion);
    } else {
      // Last question expired - auto submit quiz
      handleFinalSubmission();
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers((prev) => {
      const updated = [...prev];
      updated[currentIndex] = optionIndex;
      return updated;
    });
  };

  const handleClearSelection = () => {
    setSelectedAnswers((prev) => {
      const updated = [...prev];
      updated[currentIndex] = null;
      return updated;
    });
  };

  const handleNext = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(config.timeLimitPerQuestion);
    } else {
      setShowConfirmModal(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setTimeLeft(config.timeLimitPerQuestion);
    }
  };

  const handleFinalSubmission = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const totalQuestions = shuffledQuestions.length;
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;
    let score = 0;

    const formattedAnswers: StudentAnswer[] = shuffledQuestions.map((sq, i) => {
      const selected = selectedAnswers[i];
      const isAnswered = selected !== null && selected !== undefined;
      const isCorrect = isAnswered && selected === sq.newCorrectIndex;

      if (!isAnswered) {
        unansweredCount++;
      } else if (isCorrect) {
        correctCount++;
        score += config.marksPerQuestion;
      } else {
        incorrectCount++;
        if (config.negativeMarksPerQuestion > 0) {
          score -= config.negativeMarksPerQuestion;
        }
      }

      return {
        questionId: sq.original.id,
        questionText: sq.original.question,
        options: sq.shuffledOptions,
        selectedOptionIndex: isAnswered ? selected : null,
        correctAnswerIndex: sq.newCorrectIndex,
        isCorrect,
        explanation: sq.original.explanation,
        category: sq.original.category,
        timeSpentSeconds: timeSpentPerQuestion[i] || 0,
      };
    });

    const totalDurationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);

    const attempt: QuizAttempt = {
      id: `${student.studentId}_day${day}_${Date.now()}`,
      studentId: student.studentId,
      studentName: student.fullName,
      rollNumber: student.rollNumber,
      day,
      score: Math.max(0, score),
      totalMarks: totalQuestions * config.marksPerQuestion,
      totalQuestions,
      correctCount,
      incorrectCount,
      unansweredCount,
      timeTakenSeconds: totalDurationSeconds,
      status: 'completed',
      answers: formattedAnswers,
      startedAt: new Date(startTimeRef.current).toISOString(),
      completedAt: new Date().toISOString(),
    };

    try {
      await saveQuizAttempt(attempt);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }

      onComplete(attempt);
    } catch (err) {
      console.error('Error saving quiz attempt:', err);
      // Still forward attempt for review
      onComplete(attempt);
    }
  };

  if (shuffledQuestions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 text-center bg-slate-900 border border-slate-800 rounded-3xl">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h3 className="text-lg font-bold text-white">Preparing Randomized Quiz...</h3>
        <p className="text-xs text-slate-400 mt-1">Shuffling question bank and options for Day {day}</p>
      </div>
    );
  }

  const currentQ = shuffledQuestions[currentIndex];
  const answeredCount = selectedAnswers.filter((a) => a !== null).length;
  const timerPercentage = (timeLeft / config.timeLimitPerQuestion) * 100;
  const isUrgentTimer = timeLeft <= 10;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-fade-in">
      {/* Top Header Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold uppercase">
              Day 0{day}
            </span>
            <span className="text-xs text-slate-400">
              Candidate: <strong className="text-white">{student.fullName}</strong> ({student.rollNumber})
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white mt-1">
            {config.title}
          </h2>
        </div>

        {/* Question Countdown Timer */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-sm font-bold border transition-all ${
              isUrgentTimer
                ? 'bg-red-950/80 border-red-500 text-red-300 animate-pulse'
                : 'bg-slate-950 border-slate-800 text-cyan-300'
            }`}
          >
            <Clock className={`w-4 h-4 ${isUrgentTimer ? 'text-red-400' : 'text-cyan-400'}`} />
            <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to exit the quiz? Unsaved progress will be lost.')) {
                onCancel();
              }
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all"
            title="Exit Quiz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Timer Progress Bar */}
      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800/60">
        <div
          className={`h-full transition-all duration-1000 ease-linear rounded-full ${
            isUrgentTimer ? 'bg-red-500' : 'bg-gradient-to-r from-cyan-500 to-blue-500'
          }`}
          style={{ width: `${timerPercentage}%` }}
        />
      </div>

      {/* Main Question Card & Options */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
        {/* Question Meta */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="font-bold text-cyan-400 font-mono">
              Question {currentIndex + 1} of {shuffledQuestions.length}
            </span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] uppercase font-mono">
              {currentQ.original.category}
            </span>
          </div>
          <div className="text-slate-400 font-mono text-[11px]">
            +{config.marksPerQuestion} mark
          </div>
        </div>

        {/* Question Text */}
        <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed mb-6">
          {currentQ.original.question}
        </h3>

        {/* Options List */}
        <div className="space-y-3 mb-6">
          {currentQ.shuffledOptions.map((opt, optIdx) => {
            const isSelected = selectedAnswers[currentIndex] === optIdx;
            const optionLetter = String.fromCharCode(65 + optIdx); // A, B, C, D

            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 group ${
                  isSelected
                    ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-md shadow-cyan-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-extrabold'
                      : 'bg-slate-800 text-slate-400 group-hover:text-white'
                  }`}
                >
                  {optionLetter}
                </span>
                <span className="text-sm font-medium leading-relaxed pt-0.5">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Card Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={handleClearSelection}
            disabled={selectedAnswers[currentIndex] === null}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-slate-200 disabled:opacity-40 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear Choice
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 text-xs font-semibold transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Previous
            </button>

            {currentIndex === shuffledQuestions.length - 1 ? (
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                Finish &amp; Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all"
              >
                Next Question
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Question Grid Navigator */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
          <span>Question Palette ({answeredCount}/{shuffledQuestions.length} Answered)</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-cyan-500"></span> Answered
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-slate-800 border border-slate-700"></span> Pending
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {shuffledQuestions.map((_, i) => {
            const isAnswered = selectedAnswers[i] !== null;
            const isCurrent = currentIndex === i;

            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setCurrentIndex(i);
                  setTimeLeft(config.timeLimitPerQuestion);
                }}
                className={`w-9 h-9 rounded-xl font-mono text-xs font-bold transition-all ${
                  isCurrent
                    ? 'ring-2 ring-cyan-400 bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : isAnswered
                    ? 'bg-cyan-950 border border-cyan-700 text-cyan-300'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl">
            <h4 className="font-bold text-base text-white mb-2">Submit Day {day} Quiz?</h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              You have answered <strong className="text-white">{answeredCount}</strong> of{' '}
              <strong className="text-white">{shuffledQuestions.length}</strong> questions. Once submitted, your score will be computed and recorded.
            </p>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
              >
                Return to Quiz
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFinalSubmission}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5"
              >
                {isSubmitting ? 'Recording...' : 'Confirm Submission'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
