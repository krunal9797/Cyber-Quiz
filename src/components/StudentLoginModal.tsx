import React, { useState } from 'react';
import { X, Lock, User, Hash, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { authenticateStudent } from '../services/quizService';
import { Student } from '../types';
import { INITIAL_STUDENTS } from '../data/seedQuestions';

interface StudentLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (student: Student) => void;
}

export const StudentLoginModal: React.FC<StudentLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [identifier, setIdentifier] = useState(''); // Login ID or Roll Number
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !passcode.trim()) {
      setError('Please provide your assigned Login ID / Roll Number and Passcode.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await authenticateStudent(identifier, passcode, fullName);
      if (res.success && res.student) {
        onLoginSuccess(res.student);
        onClose();
      } else {
        setError(res.error || 'Authentication failed. Please verify credentials with admin.');
      }
    } catch (err) {
      setError('Error verifying credentials. Please check internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoFill = (student: typeof INITIAL_STUDENTS[0]) => {
    setFullName(student.fullName);
    setIdentifier(student.studentId);
    setPasscode(student.passcode);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Student Authorization</h3>
              <p className="text-xs text-slate-400">Cyber Crime Training Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Demo Pre-fill */}
        <div className="my-4 p-3 bg-slate-950/60 rounded-xl border border-cyan-900/40">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Quick Demo Accounts
            </span>
            <span className="text-[10px] text-slate-500">Click to autofill</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {INITIAL_STUDENTS.slice(0, 4).map((s) => (
              <button
                key={s.studentId}
                type="button"
                onClick={() => handleQuickDemoFill(s)}
                className="text-left px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-700/60 transition-all text-xs"
              >
                <div className="font-medium text-slate-200 truncate">{s.fullName}</div>
                <div className="text-[10px] font-mono text-cyan-400/80">{s.studentId}</div>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Registered Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Assigned Login ID or Roll Number <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. STU-1001 or CY-2026-01"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Secret Passcode <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter password assigned by admin"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Sign In to Quiz Portal
                </>
              )}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-[11px] text-slate-500">
          Contact the Cyber Training Administrator if you do not have your credentials.
        </p>
      </div>
    </div>
  );
};
