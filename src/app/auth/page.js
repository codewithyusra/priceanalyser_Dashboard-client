'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Building2, UserCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import api from '@/lib/api';
import MarketingHeader from '@/components/MarketingHeader';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    organizationName: '',
    role: 'Pricing Analyst',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (localStorage.getItem('token')) {
      window.location.href = '/dashboard';
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (isForgotPassword) {
        const { data } = await api.post('/auth/forgot-password', { email: formData.email });
        setSuccess(data.message);
        setLoading(false);
        return;
      }

      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      const { data } = await api.post(endpoint, formData);
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-pink-100 selection:text-pink-900">
      <MarketingHeader sectionHrefPrefix="/" />
      <div className="flex-1 flex items-center justify-center p-6 transition-colors duration-500">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-[440px] p-6 sm:p-10 relative overflow-hidden"
      >
        {/* Aesthetic Background Accents */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl" />

        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/20">
            <ShieldCheck className="text-white w-7 h-7" />
          </div>
        </div>

        <div className="text-center mb-10 relative">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500"
          >
            {isForgotPassword ? 'Reset Password' : isLogin ? 'Welcome Back' : 'Create Account'}
          </motion.h1>
          <p className="text-slate-500 font-medium">
            {isForgotPassword ? 'Enter your email to receive a reset link' : isLogin ? 'Access your Analyze It suite' : 'Join the future of retail pricing'}
          </p>

        </div>

        {error && (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-medium text-center"
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl text-sm font-medium text-center"
          >
            {success}
          </motion.div>
        )}


        <form onSubmit={handleSubmit} className="space-y-5 relative">
          {!isLogin && (
            <div className="group transition-all duration-200">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1 mb-1.5 block">Organization</label>
              <div className="relative flex items-center">
                <Building2 className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Company Name"
                  required 
                  className="input-field pl-12 h-13 border-slate-200 focus:border-pink-500/50"
                  onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                />
              </div>
            </div>
          )}

          <div className="group transition-all duration-200">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1 mb-1.5 block">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
              <input 
                type="email" 
                placeholder="name@company.com"
                required 
                className="input-field pl-12 h-13 border-slate-200 focus:border-pink-500/50 text-slate-700"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {!isForgotPassword && (
            <div className="group transition-all duration-200">
              <div className="flex justify-between items-center mb-1.5 pl-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Secure Password</label>
                {isLogin && (
                  <button 
                    type="button"
                    onClick={() => { setIsForgotPassword(true); setError(''); setSuccess(''); }}
                    className="text-[10px] font-bold text-pink-500 hover:text-pink-600 transition-colors uppercase tracking-widest"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  required 
                  className="input-field pl-12 h-13 border-slate-200 focus:border-pink-500/50 text-slate-700"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>
          )}

          {!isLogin && !isForgotPassword && (
            <div className="group transition-all duration-200">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1 mb-1.5 block">Access Level</label>
              <div className="relative flex items-center">
                <UserCircle2 className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                <select 
                  className="input-field pl-12 h-13 appearance-none border-slate-200 focus:border-pink-500/50"
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option>Pricing Analyst</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full h-14 justify-center text-base mt-2 shadow-lg shadow-pink-500/20 active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Processing...' : isForgotPassword ? 'Send Reset Link' : isLogin ? 'Sign In' : 'Sign Up'}
            <ArrowRight className="w-5 h-5 ml-1" />
          </button>
        </form>

        <div className="mt-10 text-center relative">
          <button 
            onClick={() => {
              if (isForgotPassword) {
                setIsForgotPassword(false);
              } else {
                setIsLogin(!isLogin);
              }
              setError('');
              setSuccess('');
            }}
            className="text-sm font-semibold text-slate-500 hover:text-pink-600 transition-colors duration-200"
          >
            {isForgotPassword ? "Back to Sign In" : isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>

      </motion.div>
    </div>
    </div>
  );
}
