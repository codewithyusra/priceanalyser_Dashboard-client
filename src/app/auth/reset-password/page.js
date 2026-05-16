'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import api from '@/lib/api';
import MarketingHeader from '@/components/MarketingHeader';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    setError('');

    try {
      await api.post('/auth/reset-password', { token, password });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="text-emerald-500 w-10 h-10" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-slate-900">Password Reset!</h1>
        <p className="text-slate-500 mb-8">Your password has been successfully updated. You can now sign in with your new credentials.</p>
        <button 
          onClick={() => window.location.href = '/auth'}
          className="btn-primary w-full h-14 justify-center"
        >
          Go to Sign In
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="group transition-all duration-200">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1 mb-1.5 block">New Password</label>
        <div className="relative flex items-center">
          <Lock className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
          <input 
            type="password" 
            placeholder="••••••••"
            required 
            className="input-field pl-12 h-13 border-slate-200 focus:border-pink-500/50 text-slate-700"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="group transition-all duration-200">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1 mb-1.5 block">Confirm Password</label>
        <div className="relative flex items-center">
          <Lock className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
          <input 
            type="password" 
            placeholder="••••••••"
            required 
            className="input-field pl-12 h-13 border-slate-200 focus:border-pink-500/50 text-slate-700"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-medium text-center">
          {error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={loading}
        className="btn-primary w-full h-14 justify-center text-base mt-2 shadow-lg shadow-pink-500/20 active:scale-95 disabled:opacity-50"
      >
        {loading ? 'Updating...' : 'Reset Password'}
        <ArrowRight className="w-5 h-5 ml-1" />
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-pink-100 selection:text-pink-900">
      <MarketingHeader sectionHrefPrefix="/" />
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card w-full max-w-[440px] p-6 sm:p-10 relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl" />
          
          {!ResetPasswordForm.success && (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/20">
                  <ShieldCheck className="text-white w-7 h-7" />
                </div>
              </div>

              <div className="text-center mb-10 relative">
                <h1 className="text-4xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500">
                  New Password
                </h1>
                <p className="text-slate-500 font-medium">Set a strong password to secure your account</p>
              </div>
            </>
          )}

          <Suspense fallback={<div className="text-center text-slate-500">Loading reset form...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </motion.div>
      </div>
    </div>
  );
}
