'use client';

import { useCallback, useEffect, useState } from 'react';
import api from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  X, 
  ChevronRight,
  BrainCircuit,
  Target,
  BarChart2,
  Boxes,
  Zap,
  TrendingUp,
  TrendingDown,
  Info,
  Bell
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';

export default function Recommendations() {
  const [recs, setRecs] = useState([]);
  const [selectedRec, setSelectedRec] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [manualPrice, setManualPrice] = useState('');
  const [useManual, setUseManual] = useState(false);

  const fetchRecs = useCallback(async () => {
    try {
      const { data } = await api.get('/pricing/recommendations');
      setRecs(data);
      setSelectedRec((current) => {
        if (!data.length) return null;
        if (!current) return data[0];
        const updated = data.find((item) => item._id === current._id);
        return updated || data[0];
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSync = async (productId) => {
    setSyncing(true);
    try {
      await api.post(`/pricing/generate/${productId}`);
      await fetchRecs();
    } catch (err) {
      alert('Sync failed');
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchRecs();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [fetchRecs]);

  const handleAction = async (id, status, customPrice = null) => {
    let reason = null;
    if (status === 'rejected') {
      reason = prompt('Strategic feedback: Why is this recommendation being rejected?');
      if (reason === null) return; // User cancelled the prompt
    }

    try {
      await api.patch(`/pricing/recommendation/${id}`, { 
        status,
        manualPrice: customPrice,
        reason
      });
      await fetchRecs();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10 pt-20 lg:pt-10 overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                <BrainCircuit className="text-pink-600 w-6 h-6" />
                Strategy Lab
              </h1>
              <p className="text-slate-500 mt-1 text-sm font-medium">Review AI-generated pricing adjustments and optimize market position.</p>
            </div>
            {recs.filter(r => r.status === 'pending').length > 0 && (
              <div className="bg-pink-50 px-4 py-2 rounded-lg border border-pink-100 flex items-center gap-3 shadow-sm">
                <Bell className="w-4 h-4 text-pink-600 animate-bounce" />
                <span className="text-[11px] font-bold text-pink-600 uppercase tracking-wider">
                  {recs.filter(r => r.status === 'pending').length} Actions Required
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            {/* List View */}
            <div className="xl:col-span-7 space-y-3">
              {loading ? (
                <div className="flex flex-col items-center justify-center p-20 glass-card">
                  <div className="w-8 h-8 border-3 border-pink-500/30 border-t-pink-500 rounded-full animate-spin mb-4" />
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Processing Pipeline...</p>
                </div>
              ) : recs.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-16 text-center border-dashed border-2 border-slate-100"
                >
                  <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">No Pending Strategies</h3>
                  <p className="text-slate-500 mt-2 text-xs font-medium max-w-xs mx-auto italic">
                    The orchestration layer has not identified any significant market mismatches at this time.
                  </p>
                </motion.div>
              ) : (
                recs.map((rec) => {
                  const isPriceUp = rec.proposedPrice > rec.currentPrice;
                  const isNew = rec.status === 'pending';
                  return (
                    <motion.div
                      key={rec._id}
                      layoutId={rec._id}
                      onClick={() => setSelectedRec(rec)}
                      className={`glass-card group cursor-pointer border-2 transition-all relative overflow-hidden ${
                        selectedRec?._id === rec._id 
                        ? 'border-pink-500 ring-4 ring-pink-500/5' 
                        : isNew ? 'border-blue-100 bg-blue-50/20' : 'border-transparent'
                      }`}
                    >
                      {isNew && (
                        <div className="absolute top-0 right-0">
                          <div className="bg-pink-600 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-bl shadow-sm flex items-center gap-1">
                            <span className="w-1 h-1 bg-white rounded-full animate-ping" />
                            Action Required
                          </div>
                        </div>
                      )}

                      <div className="p-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 shrink-0">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${isPriceUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                            {isPriceUp ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm">{rec.productId?.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{rec.productId?.sku}</span>
                              <div className="w-1 h-1 bg-slate-200 rounded-full" />
                              <span className={`text-[10px] font-bold uppercase tracking-widest ${rec.confidenceScore > 0.8 ? 'text-pink-600' : 'text-amber-600'}`}>
                                {(rec.confidenceScore * 100).toFixed(0)}% Score
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-right hidden sm:block">
                            <div className="text-sm font-bold text-slate-300 line-through leading-none">
                              ${rec.currentPrice?.toFixed(2)}
                            </div>
                            <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Old</div>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-black tracking-tight leading-none ${isPriceUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                              ${rec.proposedPrice?.toFixed(2)}
                            </div>
                            <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Target</div>
                          </div>
                          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${selectedRec?._id === rec._id ? 'translate-x-1 text-pink-500' : 'text-slate-300'}`} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Detail View */}
            <div className="xl:col-span-5 relative min-h-[550px]">
              <AnimatePresence mode="wait">
                {selectedRec ? (
                  <motion.div
                    key={selectedRec._id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden sticky top-8"
                  >
                    <div className="bg-slate-900 p-6 text-white relative">
                      <div className="text-[9px] font-bold text-pink-500 uppercase tracking-[0.2em] mb-1.5">Strategy Protocol Audit</div>
                      <h2 className="text-xl font-bold uppercase tracking-tight">{selectedRec.productId?.name || 'Asset Identification'}</h2>
                    </div>

                    <div className="p-8 space-y-8">
                      <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Zap className="w-4 h-4 text-pink-600 fill-current" />
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Trust Index</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-bold text-slate-900">
                           <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${selectedRec.confidenceScore * 100}%` }}
                                className="h-full bg-pink-500"
                              />
                           </div>
                           {(selectedRec.confidenceScore * 100).toFixed(0)}%
                        </div>
                      </div>

                      {/* Unified Price & Market Card */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Internal Positioning Card */}
                        <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm relative overflow-hidden group hover:border-pink-200 transition-all">
                          <div className={`absolute top-0 right-0 w-24 h-24 opacity-[0.03] -mr-6 -mt-6 rounded-full ${selectedRec.proposedPrice > selectedRec.currentPrice ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                          <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                            <Target className="w-3 h-3 text-pink-500" />
                            Internal Protocol
                          </div>
                          <div className="flex items-end justify-between relative z-10">
                            <div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Target Price</div>
                              <div className={`text-4xl font-black tracking-tighter ${selectedRec.proposedPrice > selectedRec.currentPrice ? 'text-emerald-600' : 'text-rose-600'}`}>
                                ${selectedRec.proposedPrice?.toFixed(2)}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-[10px] font-bold text-slate-300 uppercase mb-1">Current</div>
                              <div className="text-xl font-bold text-slate-300 line-through tracking-tighter decoration-slate-200">${selectedRec.currentPrice?.toFixed(2)}</div>
                            </div>
                          </div>
                        </div>

                        {/* Market benchmark Card (User Requested) */}
                        {(() => {
                          const competitors = selectedRec.agentContributions?.marketIntelligence?.competitors || [];
                          const lowestComp = competitors.length > 0 
                            ? competitors.reduce((prev, curr) => (prev.price < curr.price ? prev : curr)) 
                            : null;
                          
                          // Smart extraction for legacy/unstructured data
                          const extractPrice = (text) => {
                            if (!text) return null;
                            const patterns = [
                              /lowest price at \$?([\d,.]+)/i,
                              /ranging from \$?([\d,.]+)/i,
                              /lower price at \$?([\d,.]+)/i,
                              /competitor (?:is|at) \$?([\d,.]+)/i,
                              /price at \$?([\d,.]+)/i,
                              /at \$?([\d,.]+)/i,
                              /\$?([\d,.]+)\s+is the lowest/i
                            ];
                            for (let p of patterns) {
                              const m = text.match(p);
                              if (m) {
                                const val = parseFloat(m[1].replace(/,/g, ''));
                                if (!isNaN(val)) return val;
                              }
                            }
                            return null;
                          };

                          const extractName = (text) => {
                            if (!text) return null;
                            const patterns = [
                              /([A-Za-z0-9& ]+)'s\s+(?:significantly\s+)?lower\s+price/i,
                              /([A-Za-z0-9& ]+)\s+(?:offering|is offering|has|at)\s+the lowest price/i,
                              /ranging from \$?[\d,.]+ (?:at|from|by)\s+([A-Za-z0-9& ]+)/i,
                              /lowest price at \$?[\d,.]+ from\s+([A-Za-z0-9& ]+)/i,
                              /with\s+([A-Za-z0-9& ]+)\s+(?:offering|at)/i
                            ];
                            for (let p of patterns) {
                              const m = text.match(p);
                              if (m) return m[1].trim();
                            }
                            return null;
                          };

                          const displayPrice = selectedRec.lowestCompetitorPrice || 
                                               lowestComp?.price || 
                                               extractPrice(selectedRec.rationale) || 
                                               extractPrice(selectedRec.agentContributions?.marketIntelligence?.summary);
                          
                          const displayName = selectedRec.lowestCompetitorName || 
                                              lowestComp?.name || 
                                              extractName(selectedRec.rationale) || 
                                              extractName(selectedRec.agentContributions?.marketIntelligence?.summary) || 
                                              'Market Intelligence';

                          return (
                            <div className="p-6 bg-amber-50/40 border border-amber-100/60 rounded-2xl shadow-sm relative overflow-hidden group hover:bg-amber-50 transition-all">
                              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Zap className="w-24 h-24 text-amber-600 fill-current" />
                              </div>
                              <div className="text-[9px] font-black text-amber-600 uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                                <TrendingDown className="w-3 h-3" />
                                Market Floor Benchmark
                              </div>
                              <div className="relative z-10">
                                <div className="text-4xl font-black text-slate-900 tracking-tighter">
                                  {displayPrice ? `$${displayPrice.toFixed(2)}` : (
                                    <button 
                                      onClick={() => handleSync(selectedRec.productId._id)}
                                      className="text-xs font-bold text-pink-600 hover:underline uppercase tracking-widest flex items-center gap-2"
                                    >
                                      {syncing ? 'Syncing...' : 'Sync Market Data'}
                                      {!syncing && <Zap className="w-3 h-3 fill-current" />}
                                    </button>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                  <div className="text-[11px] font-black text-amber-700 uppercase tracking-widest truncate">
                                    {displayName}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Strategy Badge */}
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1.5 bg-pink-50 border border-pink-100 rounded-lg flex items-center gap-2">
                          <Zap className="w-3.5 h-3.5 text-pink-600 fill-current" />
                          <span className="text-[10px] font-bold text-pink-700 uppercase tracking-widest">{selectedRec.strategyUsed || 'Dynamic Optimization'}</span>
                        </div>
                        <div className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg flex items-center gap-2">
                          <Boxes className="w-3.5 h-3.5 text-slate-500" />
                          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">SKU: {selectedRec.productId?.sku}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <Target className="w-3.5 h-3.5 text-pink-600" />
                          Strategic Rationale
                        </div>
                        <div className="p-6 bg-slate-50 border-l-4 border-pink-500 rounded-r-xl text-sm text-slate-700 font-medium leading-relaxed italic">
                          {selectedRec.rationale || 'No rationale provided by strategy agent.'}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              <BarChart2 className="w-3.5 h-3.5 text-blue-500" />
                              Competitive Intelligence Cards
                            </div>
                            <span className="text-[9px] font-bold text-slate-300 uppercase">{selectedRec.agentContributions?.marketIntelligence?.competitors?.length || 0} Sources</span>
                          </div>
                          
                          {/* Premium Competitor Cards */}
                          <div className="space-y-3">
                            {selectedRec.agentContributions?.marketIntelligence?.competitors?.map((comp, idx) => (
                              <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                key={idx} 
                                className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-200 hover:shadow-md transition-all group"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                                     <span className="text-xs font-black text-slate-400 group-hover:text-blue-500">{comp.name.substring(0, 1)}</span>
                                  </div>
                                  <div>
                                    <div className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{comp.name}</div>
                                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Global Marketplace</div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xl font-black text-slate-900 tracking-tighter leading-none">${comp.price?.toFixed(2)}</div>
                                  <div className={`text-[8px] font-black uppercase tracking-widest mt-1 ${comp.price < selectedRec.proposedPrice ? 'text-rose-500' : 'text-emerald-500'}`}>
                                    {comp.price < selectedRec.proposedPrice ? 'Price Leader' : 'Premium Bracket'}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* AI Narrative Card */}
                          <div className="p-5 bg-slate-900 rounded-xl shadow-inner relative overflow-hidden">
                             <div className="absolute top-0 right-0 p-3">
                                <Info className="w-3 h-3 text-slate-700" />
                             </div>
                             <div className="flex items-center gap-2 mb-3 text-[9px] font-black text-blue-400 uppercase tracking-[0.2em]">
                               Strategic Synthesis
                             </div>
                             <p className="text-xs text-slate-300 font-medium leading-relaxed italic opacity-90">
                               "{selectedRec.agentContributions?.marketIntelligence?.summary || 'Market analysis synchronization in progress.'}"
                             </p>
                          </div>
                        </div>

                        <div className="group p-5 bg-white border border-slate-100 rounded-xl hover:border-emerald-100 transition-all">
                          <div className="flex items-center gap-3 mb-3">
                            <Boxes className="w-4 h-4 text-emerald-500" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Supply Dynamics</span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            {selectedRec.agentContributions?.inventory?.marginAdvice || 'Analyzing stock-to-order ratios.'}
                          </p>
                        </div>
                      </div>

                      {selectedRec.status === 'pending' ? (
                        <div className="pt-8 space-y-4">
                          <div className="flex gap-2 p-1.5 bg-slate-100 rounded-xl">
                            <button 
                              onClick={() => setUseManual(false)}
                              className={`flex-1 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${!useManual ? 'bg-white shadow-md text-pink-600' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                              AI Optimized
                            </button>
                            <button 
                              onClick={() => setUseManual(true)}
                              className={`flex-1 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${useManual ? 'bg-white shadow-md text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                              Manual Override
                            </button>
                          </div>

                          {useManual ? (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="space-y-2"
                            >
                              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Set custom price</label>
                              <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                <input 
                                  type="number"
                                  step="0.01"
                                  value={manualPrice}
                                  onChange={(e) => setManualPrice(e.target.value)}
                                  className="w-full h-14 pl-8 pr-4 bg-white border-2 border-slate-200 rounded-xl font-black text-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                                  placeholder="0.00"
                                />
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-5 bg-pink-50 border border-pink-100 rounded-xl flex items-center justify-between"
                            >
                              <div>
                                <div className="text-[9px] font-black text-pink-400 uppercase tracking-widest mb-1">Applying AI Target</div>
                                <div className="text-2xl font-black text-pink-600 tracking-tight">${selectedRec.proposedPrice.toFixed(2)}</div>
                              </div>
                              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <Zap className="w-5 h-5 text-pink-500 fill-current" />
                              </div>
                            </motion.div>
                          )}

                          <div className="flex gap-3">
                            <button 
                              onClick={() => handleAction(selectedRec._id, 'approved', useManual ? manualPrice : null)}
                              className={`flex-1 justify-center tracking-tight h-14 btn-primary shadow-lg ${useManual ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' : ''}`}
                            >
                              {useManual ? 'Apply Manual Price' : 'Execute AI Strategy'}
                            </button>
                            <button 
                              onClick={() => handleAction(selectedRec._id, 'rejected')}
                              className="px-6 h-14 flex items-center justify-center border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                         <div className={`p-4 rounded-lg text-center font-bold uppercase tracking-widest text-[10px] border ${
                           selectedRec.status === 'approved' || selectedRec.status === 'auto-executed' 
                           ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
                           : 'bg-rose-50 border-rose-100 text-rose-600'
                         }`}>
                           Action Status: {selectedRec.status.toUpperCase().replace('-', ' ')}
                         </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <div className="glass-card p-20 text-center flex flex-col items-center justify-center border-dashed border-2 bg-slate-50/50">
                    <Info className="w-10 h-10 text-slate-300 mb-4" />
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                      Audit selection required
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
