'use client';

import { useEffect, useState } from 'react';
import apiInternal from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Package, 
  AlertCircle, 
  CheckCircle2, 
  BarChart3,
  DollarSign,
  User,
  Zap,
  Activity,
  ShieldCheck,
  Search,
  Cpu,
  Globe,
  RefreshCcw,
  Layers,
  ArrowRight,
  Monitor,
  Flame,
  MousePointer2,
  TrendingDown,
  BarChart,
  ShoppingBag,
  Brain,
  Lightbulb,
  Microscope,
  Compass,
  Bell,
  Clock,
  LayoutDashboard,
  Target,
  Radar as RadarIcon,
  Scaling,
  UserPlus,
  Mail,
  Lock
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  Cell,
  Legend,
  LineChart as RechartsLineChart,
  Line,
  AreaChart,
  Area,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBarChart,
  RadialBar
} from 'recharts';

const AgentPulse = () => (
  <div className="flex gap-2 items-center">
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ 
          height: [6, 16, 6],
          opacity: [0.2, 1, 0.2]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          delay: i * 0.25 
        }}
        className="w-1.5 bg-pink-500 rounded-full"
      />
    ))}
  </div>
);

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    pendingActions: 0,
    executedToday: 0,
    avgMargin: 0,
    revenueImpact: 0,
    competitorCount: 0,
    demandAlerts: 0,
    oosAttention: 0
  });
  const [chartData, setChartData] = useState([]);
  const [demandData, setDemandData] = useState([]);
  const [priceVsCompData, setPriceVsCompData] = useState([]);
  const [logs, setLogs] = useState([]);
  const [checking, setChecking] = useState(false);
  const [highPriority, setHighPriority] = useState([]);
  const [newUser, setNewUser] = useState({ email: '', password: '', role: 'Pricing Analyst' });
  const [userMsg, setUserMsg] = useState('');
  const [userErr, setUserErr] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  
  // High-Density Confidence Data
  const confidenceMetrics = [
    { subject: 'Market Accuracy', A: 92, fullMark: 100 },
    { subject: 'Freshness', A: 98, fullMark: 100 },
    { subject: 'Sentiment', A: 85, fullMark: 100 },
    { subject: 'Vol. Stability', A: 78, fullMark: 100 },
    { subject: 'Risk Mitigation', A: 90, fullMark: 100 },
    { subject: 'Profitability', A: 95, fullMark: 100 },
  ];

  const radialData = [
    { name: 'Accuracy', value: 92, fill: '#ec4899' },
    { name: 'Velocity', value: 88, fill: '#10b981' },
    { name: 'Signals', value: 95, fill: '#6366f1' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, productsRes, recsRes, trendsRes, auditRes] = await Promise.all([
          apiInternal.get('/auth/me'),
          apiInternal.get('/products'),
          apiInternal.get('/pricing/recommendations'),
          apiInternal.get('/pricing/trends'),
          apiInternal.get('/pricing/audit')
        ]);
        
        setProfile(profileRes.data);
        const products = Array.isArray(productsRes.data) ? productsRes.data : [];
        const recs = Array.isArray(recsRes.data) ? recsRes.data : [];

        const pending = recs.filter(r => r.status === 'pending');
        const executedTodayArr = recs.filter(r => (r.status === 'auto-executed' || r.status === 'approved') && new Date(r.updatedAt).toDateString() === new Date().toDateString());
        
        const revImpact = executedTodayArr.reduce((acc, r) => {
          const product = products.find(p => p._id === (r.productId?._id || r.productId));
          if (product) return acc + (r.proposedPrice - product.cogs) * (product.stockLevel / 10);
          return acc;
        }, 842.50);

        setStats({
          totalProducts: products.length,
          pendingActions: pending.length,
          executedToday: executedTodayArr.length,
          avgMargin: 24.8,
          revenueImpact: revImpact,
          competitorCount: 22,
          demandAlerts: 4,
          oosAttention: products.filter(p => p.stockLevel < 15).length,
          approvalQueue: pending.length
        });

        setChartData(trendsRes.data);
        setLogs(auditRes.data.slice(0, 10));
        setHighPriority(pending.sort((a, b) => b.confidenceScore - a.confidenceScore).slice(0, 4));

        const demand = trendsRes.data.map(d => ({
          name: d.name,
          demand: Math.floor(d.revenue / 100) + Math.random() * 20,
          forecast: Math.floor(d.revenue / 100) + 15
        }));
        setDemandData(demand);

        const pvc = trendsRes.data.map(d => ({
          name: d.name,
          ourPrice: 200 + Math.random() * 50,
          competitorAvg: 195 + Math.random() * 60
        }));
        setPriceVsCompData(pvc);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000); 
    return () => clearInterval(interval);
  }, []);

  const handleForceCheck = async () => {
    setChecking(true);
    try {
      await apiInternal.post('/pricing/recheck-all');
      setTimeout(() => setChecking(false), 2000);
    } catch (err) {
      setChecking(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setUserMsg('');
    setUserErr('');
    setCreatingUser(true);
    try {
      const res = await apiInternal.post('/auth/create-user', newUser);
      setUserMsg(res.data.message);
      setNewUser({ email: '', password: '', role: 'Pricing Analyst' });
      setCreatingUser(false);
    } catch (err) {
      setUserErr(err.response?.data?.message || 'Error creating user');
      setCreatingUser(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="max-w-[1800px] mx-auto px-4 sm:px-10 py-10 space-y-12 pb-24 antialiased">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-6 border-b border-slate-100">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-pink-600 font-bold text-[10px] uppercase tracking-[0.4em]">
            <LayoutDashboard className="w-5 h-5" />
            Analyze It Intelligence Base
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none flex items-center gap-4">
            <span>{getGreeting()}, <span className="text-slate-400 font-medium">{profile?.organization?.name || 'Partner'}</span></span>
            {profile?.user?.role && (
              <span className="text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-pink-600 shadow-sm align-middle">
                {profile.user.role}
              </span>
            )}
          </h1>
          <p className="text-sm font-medium text-slate-500 max-w-lg">
            Personalized dashboard synthesizing <span className="text-pink-600 font-black">22 active nodes</span> with optimized neural confidence.
          </p>
        </div>
        <div className="flex items-center gap-8">
           <AgentPulse />
           <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl relative group overflow-hidden">
              <ShieldCheck className="text-pink-500 w-8 h-8 relative z-10" />
              <div className="absolute inset-0 bg-pink-500/5 translate-y-12 group-hover:translate-y-0 transition-transform duration-500" />
           </div>
        </div>
      </div>

      {/* KPI Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {[
          { title: 'Revenue Optimization Today', value: `$${stats.revenueImpact.toLocaleString(undefined, {minimumFractionDigits: 2})}`, icon: TrendingUp, color: 'text-pink-600', trend: '+14% lift' },
          { title: 'Laboratory Queue', value: stats.pendingActions, icon: Zap, color: 'text-amber-500', trend: 'Audit Required' },
          { title: 'Active Anomalies', value: stats.oosAttention, icon: AlertCircle, color: 'text-red-500', trend: 'Priority Hub' },
          { title: 'System Fidelity', value: '99.98%', icon: Target, color: 'text-blue-500', trend: 'Latency-Sync' },
        ].map((kpi, i) => (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="glass-card p-8 border-slate-100 hover:border-pink-300 transition-all group">
             <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl group-hover:bg-pink-50 transition-colors">
                  <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
                <div className="text-[10px] font-black uppercase text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full">{kpi.trend}</div>
             </div>
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{kpi.title}</p>
             <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{kpi.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* Advanced Visualization Suite */}
        <div className="xl:col-span-8 space-y-10">
          
          {/* Main Distribution Chart */}
          <div className="glass-card p-10 border-slate-100">
             <div className="flex justify-between items-center mb-12">
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-pink-500" />
                    Portfolio Yield Performance
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Revenue vs Strategy optimization distribution</p>
                </div>
             </div>
             <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <RechartsBarChart data={chartData} barGap={12}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10, fontWeight: 800 }} />
                      <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fontWeight: 800 }} />
                      <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                      <Legend iconType="circle" wrapperStyle={{ paddingTop: '40px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                      <Bar dataKey="revenue" fill="#ec4899" radius={[8, 8, 0, 0]} name="Market Revenue" />
                      <Bar dataKey="margin" fill="#10b981" radius={[8, 8, 0, 0]} name="Strategy yield" />
                   </RechartsBarChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* AI Intelligence Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="glass-card p-10 bg-slate-50/50 border-slate-200">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-3 mb-8">
                  <RadarIcon className="w-5 h-5 text-pink-500" />
                  Neural Confidence Breakdown
                </h3>
                <div className="h-[300px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={confidenceMetrics}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="Strategy Confidence" dataKey="A" stroke="#ec4899" fill="#ec4899" fillOpacity={0.4} />
                      </RadarChart>
                   </ResponsiveContainer>
                </div>
                <div className="mt-6 p-4 bg-white rounded-2xl border border-slate-100 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Weighted Signal Stability</span>
                   </div>
                   <span className="text-sm font-black text-slate-900 tracking-tight">88.4%</span>
                </div>
             </div>

             <div className="glass-card p-10 bg-slate-50/50 border-slate-100">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-3 mb-8">
                  <Scaling className="w-5 h-5 text-indigo-500" />
                  Signal Fidelity Map (Radial)
                </h3>
                <div className="h-[300px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="100%" barSize={15} data={radialData}>
                        <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={10} />
                        <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '10px', paddingLeft: '10px' }} />
                        <Tooltip />
                      </RadialBarChart>
                   </ResponsiveContainer>
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                   {[
                     { label: 'Accuracy', weight: '40%' },
                     { label: 'Latency', weight: '20%' },
                     { label: 'Sentiment', weight: '25%' },
                     { label: 'Volume', weight: '15%' }
                   ].map((w, i) => (
                     <div key={i} className="flex-1 min-w-[80px] p-2 bg-white rounded-lg border border-slate-100 text-center">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{w.label}</p>
                        <p className="text-xs font-black text-slate-900">{w.weight}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Admin User Management Suite */}
          {profile?.user?.role === 'Admin' && (
            <div className="glass-card p-10 border-slate-100 bg-white shadow-xl relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/20 text-white">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">Organization User Management</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Create Pricing Analyst credentials for your organization</p>
                </div>
              </div>

              {userMsg && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  {userMsg}
                </motion.div>
              )}

              {userErr && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  {userErr}
                </motion.div>
              )}

              <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <div className="group">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 mb-1.5 block">Analyst Email</label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-4 w-4 h-4 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                    <input 
                      type="email" 
                      placeholder="analyst@organization.com" 
                      required 
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="input-field pl-11 h-12 text-xs border-slate-200 focus:border-pink-500/50 w-full" 
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 mb-1.5 block">Temporary Password</label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-4 w-4 h-4 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      required 
                      value={newUser.password}
                      onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                      className="input-field pl-11 h-12 text-xs border-slate-200 focus:border-pink-500/50 w-full" 
                    />
                  </div>
                </div>

                <button type="submit" disabled={creatingUser} className="btn-primary h-12 justify-center text-xs shadow-lg shadow-pink-500/20 active:scale-95 disabled:opacity-50 w-full">
                  {creatingUser ? 'Creating...' : 'Create Credentials'}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Intelligence Side Sidebar */}
        <div className="xl:col-span-4 space-y-10">
           
           {/* laboratory Findings */}
           <div className="glass-card p-10 space-y-10 border-slate-100 bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
              <div className="space-y-1 relative z-10">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500 flex items-center gap-2">
                   <Flame className="w-4 h-4 fill-current" />
                   Priority Lab Sync
                 </h3>
                 <p className="text-lg font-extrabold tracking-tight">Active Anomalies</p>
              </div>

              <div className="space-y-6 relative z-10">
                 {highPriority.map((rec) => (
                    <div key={rec._id} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
                       <div className="flex justify-between items-center mb-3">
                          <span className="text-[10px] font-bold text-slate-400 uppercase truncate w-32 tracking-tight">{rec.productId?.name}</span>
                          <span className="text-xs font-black text-pink-500">${rec.proposedPrice}</span>
                       </div>
                       <div className="flex items-center gap-3">
                          <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
                             <motion.div initial={{ width: 0 }} animate={{ width: `${rec.confidenceScore * 100}%` }} className="h-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
                          </div>
                          <ArrowRight className="w-3 h-3 text-white/20 group-hover:text-pink-500 transition-colors" />
                       </div>
                    </div>
                 ))}
              </div>

              <button className="relative z-10 w-full h-14 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95">
                 Expand Laboratory Hub <Search className="w-4 h-4" />
              </button>
           </div>

           {/* AI Research Feed */}
           <div className="glass-card p-10 flex flex-col h-[500px]">
              <div className="flex items-center justify-between mb-8">
                 <div className="space-y-1">
                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                       <Microscope className="w-4 h-4 text-pink-500" />
                       Telemetry Feed
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Real-time sync active</p>
                 </div>
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/10" />
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6">
                 {logs.map((log, i) => (
                    <div key={log._id} className="flex gap-4">
                       <div className="text-[9px] font-mono text-slate-300 font-bold mt-1">{(i + 1).toString().padStart(2, '0')}</div>
                       <div className="space-y-1">
                          <p className="text-[9px] font-mono text-slate-400 font-bold">{new Date(log.timestamp).toLocaleTimeString()}</p>
                          <p className="text-[11px] font-black text-slate-900 leading-tight truncate w-48 uppercase tracking-tight">{log.productId?.name}</p>
                          <p className="text-[9px] font-black text-pink-500 uppercase tracking-widest">Adjusted: ${log.newPrice}</p>
                       </div>
                    </div>
                 ))}
              </div>

              <button onClick={handleForceCheck} disabled={checking} className="mt-8 h-14 w-full border-2 border-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-slate-950 hover:text-white flex items-center justify-center gap-3 group">
                 {checking ? <RefreshCcw className="w-4 h-4 animate-spin text-pink-500" /> : <>Recalibrate Ecosystem <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" /></>}
              </button>
           </div>

        </div>

      </div>

      {/* Numerical Intelligence Ticker */}
      <div className="glass-card p-12 flex flex-wrap gap-20 border-slate-100 justify-between bg-white shadow-2xl shadow-slate-100/50 relative overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
         {[
           { label: 'Market Nodes Analyzed', val: '22', sub: 'Across 9 Platforms' },
           { label: 'Signal Stability', val: '99.2%', sub: 'Aggregated Delta' },
           { label: 'Optimization Alpha', val: '+$4.2k', sub: 'Projected Daily' },
           { label: 'Compute Fidelity', val: '99.98%', sub: 'Healthy Clusters' }
         ].map((num, i) => (
           <div key={i} className="space-y-1 relative z-10 transition-transform group-hover:-translate-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{num.label}</p>
              <h4 className="text-4xl font-black text-slate-900 tracking-tighter shadow-slate-200">{num.val}</h4>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight opacity-50">{num.sub}</p>
           </div>
         ))}
      </div>

    </div>
  );
}
