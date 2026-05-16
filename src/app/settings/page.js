'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, Zap } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

export default function SettingsPage() {
  const [config, setConfig] = useState({
    autoExecuteThreshold: 0.9,
    marginFloor: 0.1,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setMessage('Configuration committed successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      alert('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 pt-20 lg:pt-8 overflow-x-hidden">
        <div className="space-y-8 max-w-4xl">
          <div>
            <h1 className="text-3xl font-black text-slate-900 flex items-center gap-4 uppercase tracking-tighter">
              <Settings className="text-pink-500 w-10 h-10" />
              Governance Control
            </h1>
            <p className="text-slate-500 mt-1 font-medium italic">Define the operational boundaries and intelligence confidence floors.</p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-12 shadow-2xl shadow-pink-500/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            
            {message && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="mb-10 p-5 bg-pink-50 border border-pink-100 text-pink-600 rounded-2xl text-sm font-bold flex items-center gap-3"
              >
                <Zap className="w-5 h-5 fill-current" />
                {message}
              </motion.div>
            )}

            <form onSubmit={handleSave} className="space-y-12 relative">
              <section className="space-y-6">
                <div className="flex items-center gap-3 text-slate-400 font-black text-xs uppercase tracking-widest pl-1">
                  <div className="w-8 h-1 bg-pink-500 rounded-full" />
                  AI Autonomy Threshold
                </div>
                <div className="p-8 bg-slate-50/50 rounded-3xl border border-slate-100">
                  <label className="text-sm font-bold text-slate-700 block mb-3">Confidence Commitment Score (0.01 - 0.99)</label>
                  <input 
                    type="number" 
                    step="0.05"
                    min="0"
                    max="1"
                    className="input-field h-14 bg-white border-slate-200 text-lg font-black text-pink-600"
                    value={config.autoExecuteThreshold}
                    onChange={(e) => setConfig({ ...config, autoExecuteThreshold: parseFloat(e.target.value) })}
                  />
                  <p className="text-xs text-slate-400 font-bold mt-4 leading-relaxed uppercase tracking-tight">
                    Any recommendation with intelligence confidence above this value will bypass the human-in-the-loop and <span className="text-pink-500">auto-execute</span> to the live marketplace.
                  </p>
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-3 text-slate-400 font-black text-xs uppercase tracking-widest pl-1">
                  <div className="w-8 h-1 bg-rose-500 rounded-full" />
                  Financial Protection Floor
                </div>
                <div className="p-8 bg-slate-50/50 rounded-3xl border border-slate-100">
                  <label className="text-sm font-bold text-slate-700 block mb-3">Minimum Portfolio Margin (%)</label>
                  <input 
                    type="number" 
                    step="1"
                    min="1"
                    max="100"
                    className="input-field h-14 bg-white border-slate-200 text-lg font-black text-rose-500"
                    value={config.marginFloor * 100}
                    onChange={(e) => setConfig({ ...config, marginFloor: parseFloat(e.target.value) / 100 })}
                  />
                  <p className="text-xs text-slate-400 font-bold mt-4 leading-relaxed uppercase tracking-tight">
                    Hard governance block. The AI is <span className="text-rose-500">strictly prohibited</span> from recommending prices that result in a margin lower than this floor.
                  </p>
                </div>
              </section>

              <div className="pt-6">
                <button 
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center h-16 text-lg font-black shadow-xl shadow-pink-500/30 tracking-tight"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><Save className="w-6 h-6" /> Commit Governance Policy</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
