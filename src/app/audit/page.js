'use client';

import { useCallback, useEffect, useState } from 'react';
import api from '@/lib/api';
import { motion } from 'framer-motion';
import { History, ArrowUpRight, ArrowDownRight, User, Bot } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

export default function AuditTrail() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = useCallback(async () => {
    try {
      const { data } = await api.get('/pricing/audit');
      setLogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchLogs();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [fetchLogs]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 pt-20 lg:pt-8 overflow-x-hidden">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Governance Ledger</h1>
            <p className="text-slate-500 mt-1 font-medium italic">Immutable history of AI and human pricing decisions.</p>
          </div>

          <div className="glass-card border-none shadow-xl shadow-slate-200/50 overflow-hidden overflow-x-auto">
            <div className="min-w-[700px] divide-y divide-slate-50">
              {loading ? (
                <div className="p-20 text-center text-slate-400 font-bold">Synchronizing history...</div>
              ) : logs.length === 0 ? (
                <div className="p-24 text-center">
                  <History className="w-20 h-20 mx-auto mb-6 text-slate-200 opacity-50" />
                  <p className="text-slate-500 font-black text-lg">LEGER EMPTY</p>
                  <p className="text-slate-400 text-sm mt-1">No modifications have been registered by the agents yet.</p>
                </div>
              ) : (
                logs.map((log) => (
                  <div key={log._id} className="p-8 flex items-center justify-between hover:bg-pink-50/20 transition-all group">
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${log.newPrice < log.previousPrice ? 'bg-emerald-500/10 shadow-emerald-500/10' : 'bg-rose-500/10 shadow-rose-500/10'}`}>
                        {log.newPrice < log.previousPrice ? (
                          <ArrowDownRight className="w-7 h-7 text-emerald-500" />
                        ) : (
                          <ArrowUpRight className="w-7 h-7 text-rose-500" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-800 tracking-tight uppercase">{log.productId?.name || 'Asset Unknown'}</h4>
                        <div className="flex items-center gap-3 mt-1.5">
                          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest ${log.changedBy === 'AI Agent' ? 'bg-pink-500 text-white' : 'bg-slate-800 text-white'}`}>
                            {log.changedBy === 'AI Agent' ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                            {log.changedBy}
                          </div>
                          <div className="w-1 h-1 bg-slate-200 rounded-full" />
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(log.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-slate-900 tracking-tighter">${log.newPrice}</div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Fixed from ${log.previousPrice}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
