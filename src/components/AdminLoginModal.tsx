import React, { useState } from 'react';
import { X, ShieldAlert, KeyRound, AlertCircle, ArrowRight } from 'lucide-react';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { AdminUser } from '../types';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdminLoginSuccess: (admin: AdminUser) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onAdminLoginSuccess,
}) => {
  const [adminKey, setAdminKey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const adminObj: AdminUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role: 'admin',
        isAuthenticated: true,
      };
      onAdminLoginSuccess(adminObj);
      onClose();
    } catch (err: unknown) {
      console.error('Google Sign In Error:', err);
      setError(
        'Google popup was closed or restricted in this browser frame. You can also log in directly using the Admin Master Key below.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeySignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminKey.trim()) {
      setError('Please enter the Admin Master Security Key.');
      return;
    }

    // Default admin key or passcode
    if (adminKey.trim() === 'cyber@admin2026' || adminKey.trim() === 'admin123') {
      const adminObj: AdminUser = {
        uid: 'master-admin-01',
        email: 'gamitkrunal7997@gmail.com',
        displayName: 'Lead Security Administrator',
        role: 'superadmin',
        isAuthenticated: true,
      };
      onAdminLoginSuccess(adminObj);
      onClose();
    } else {
      setError('Incorrect Admin Master Key. Use the authorized training admin key: cyber@admin2026');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-emerald-900/60 rounded-2xl shadow-2xl p-6 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Administrator Access</h3>
              <p className="text-xs text-slate-400">Management &amp; Assessment Control</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="my-3 p-3 rounded-xl bg-red-950/50 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Option 1: Firebase Google Auth */}
        <div className="mt-4 space-y-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-md shadow-white/10"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Sign In with Google (Firebase)
          </button>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-800 w-full"></div>
            <span className="bg-slate-900 px-3 text-[11px] font-mono uppercase text-slate-500">
              Or Master Key
            </span>
            <div className="border-t border-slate-800 w-full"></div>
          </div>

          {/* Option 2: Master Security Passcode */}
          <form onSubmit={handleKeySignIn} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Admin Security Master Key
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="e.g. cyber@admin2026"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20"
            >
              Authorize as Administrator
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-4 p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-800/30 text-[11px] text-emerald-300">
            <strong>Training Admin Hint:</strong> Use key <code className="bg-emerald-950 px-1 py-0.5 rounded font-mono font-bold text-emerald-200">cyber@admin2026</code> to manage question banks, review student progress, and access private results.
          </div>
        </div>
      </div>
    </div>
  );
};
