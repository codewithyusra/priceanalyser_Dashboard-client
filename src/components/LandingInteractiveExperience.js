'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  BadgeCheck,
  BrainCircuit,
  Gauge,
  RefreshCcw,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

const roleViews = {
  analyst: {
    label: 'Pricing Analyst',
    focus: 'Rationale clarity',
    note: 'Review the recommendation, compare market movement, and decide whether the SKU should move now or stay in queue.',
    checks: ['Validate competitor pressure', 'Check confidence and margin', 'Approve or reject the action'],
  },
  revenue: {
    label: 'Revenue Lead',
    focus: 'Portfolio impact',
    note: 'Understand how demand momentum and price position affect yield so teams can prioritize the highest-value moves first.',
    checks: ['Compare uplift vs. margin', 'Review top opportunities', 'Watch weekly trend direction'],
  },
  admin: {
    label: 'Admin',
    focus: 'Governance policy',
    note: 'Keep thresholds, guardrails, and audit readiness aligned so the workspace scales across teams and organizations.',
    checks: ['Monitor automation threshold', 'Enforce margin floor', 'Keep audit trail intact'],
  },
};

const presets = {
  competitive: {
    label: 'Competitive Response',
    values: { competitorGap: -11, demandPulse: 58, stockPressure: 44, threshold: 88 },
  },
  margin: {
    label: 'Margin Defense',
    values: { competitorGap: -4, demandPulse: 74, stockPressure: 34, threshold: 91 },
  },
  clearance: {
    label: 'Stock Clearance',
    values: { competitorGap: -14, demandPulse: 42, stockPressure: 82, threshold: 79 },
  },
};

const liveEvents = [
  { label: 'Amazon Global repriced a hero SKU', tone: 'rose', delta: '-6.2%' },
  { label: 'Search demand accelerated in electronics', tone: 'sky', delta: '+11.4%' },
  { label: 'Inventory coverage fell below the target band', tone: 'amber', delta: '14 days left' },
  { label: 'Auto-execute queue crossed threshold', tone: 'emerald', delta: '11 actions ready' },
  { label: 'Manual review queue needs analyst attention', tone: 'slate', delta: '7 pending' },
];

const feedToneClasses = {
  rose: 'border-rose-200 bg-rose-50 text-rose-700',
  sky: 'border-sky-200 bg-sky-50 text-sky-700',
  amber: 'border-amber-200 bg-amber-50 text-amber-700',
  emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  slate: 'border-slate-200 bg-slate-100 text-slate-700',
};

const currentPrice = 399;
const cogs = 250;
const baseThreshold = 90;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function buildSeriesPoints(data, key, width, height, padding, maxValue) {
  const step = (width - padding * 2) / (data.length - 1);

  return data.map((item, index) => {
    const x = padding + index * step;
    const y = height - padding - (item[key] / maxValue) * (height - padding * 2);
    return [x, y];
  });
}

function pointsToPolyline(points) {
  return points.map(([x, y]) => `${x},${y}`).join(' ');
}

function pointsToArea(points, height, padding) {
  const first = points[0];
  const last = points[points.length - 1];
  const linePath = points.map(([x, y]) => `${x} ${y}`).join(' L ');
  return `M ${first[0]} ${height - padding} L ${linePath} L ${last[0]} ${height - padding} Z`;
}

function ScenarioChart({ data }) {
  const width = 520;
  const height = 220;
  const padding = 24;
  const maxValue = 100;
  const pressurePoints = buildSeriesPoints(data, 'pressure', width, height, padding, maxValue);
  const confidencePoints = buildSeriesPoints(data, 'confidence', width, height, padding, maxValue);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Interactive scenario chart">
      <defs>
        <linearGradient id="scenario-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {[0, 1, 2, 3].map((line) => {
        const y = padding + ((height - padding * 2) / 3) * line;
        return <line key={line} x1={padding} y1={y} x2={width - padding} y2={y} stroke="#e2e8f0" strokeDasharray="4 8" />;
      })}

      <path d={pointsToArea(pressurePoints, height, padding)} fill="url(#scenario-area)" />
      <polyline fill="none" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" points={pointsToPolyline(pressurePoints)} />
      <polyline fill="none" stroke="#0ea5e9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" points={pointsToPolyline(confidencePoints)} />

      {pressurePoints.map(([x, y], index) => (
        <g key={data[index].label}>
          <circle cx={x} cy={y} r="4" fill="#ec4899" />
          <circle cx={confidencePoints[index][0]} cy={confidencePoints[index][1]} r="4" fill="#0ea5e9" />
          <text x={x} y={height - 6} textAnchor="middle" fontSize="11" fontWeight="800" fill="#94a3b8">
            {data[index].label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function LandingInteractiveExperience() {
  const [activeRole, setActiveRole] = useState('analyst');
  const [activePreset, setActivePreset] = useState('competitive');
  const [competitorGap, setCompetitorGap] = useState(presets.competitive.values.competitorGap);
  const [demandPulse, setDemandPulse] = useState(presets.competitive.values.demandPulse);
  const [stockPressure, setStockPressure] = useState(presets.competitive.values.stockPressure);
  const [threshold, setThreshold] = useState(presets.competitive.values.threshold);
  const [liveIndex, setLiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLiveIndex((current) => (current + 1) % liveEvents.length);
    }, 2600);

    return () => clearInterval(intervalId);
  }, []);

  const activeRoleView = roleViews[activeRole];

  const derived = useMemo(() => {
    const competitorAverage = currentPrice * (1 + competitorGap / 100);
    const demandImpact = (demandPulse - 50) * 0.85;
    const stockImpact = (50 - stockPressure) * 0.72;
    const competitorImpact = competitorGap * 1.45;
    const rawPrice = currentPrice + demandImpact + stockImpact + competitorImpact;
    const proposedPrice = clamp(Math.round(rawPrice), 286, 458);
    const margin = ((proposedPrice - cogs) / proposedPrice) * 100;

    const confidence = clamp(
      Math.round(62 + demandPulse * 0.18 + (100 - stockPressure) * 0.12 + (18 - Math.abs(competitorGap)) * 0.9),
      64,
      97
    );

    let strategy = 'Balanced Optimize';
    if (stockPressure > 72) strategy = 'Stock Release';
    else if (demandPulse > 68 && competitorGap > -6) strategy = 'Premium Protect';
    else if (competitorGap <= -9) strategy = 'Competitive Match';

    const action = confidence >= threshold ? 'Auto-execute candidate' : 'Manual review recommended';
    const actionTone = confidence >= threshold ? 'text-emerald-600' : 'text-amber-600';

    const scenarioTrend = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label, index) => {
      const oscillation = Math.sin(index * 0.9) * 6;
      return {
        label,
        pressure: clamp(Math.round(52 + demandPulse * 0.24 - competitorGap * 1.3 + stockPressure * 0.18 + oscillation), 22, 96),
        confidence: clamp(Math.round(confidence - 8 + index * 2 + oscillation * 0.5), 32, 98),
      };
    });

    return {
      competitorAverage,
      proposedPrice,
      margin,
      confidence,
      strategy,
      action,
      actionTone,
      scenarioTrend,
      rationale:
        strategy === 'Stock Release'
          ? 'Inventory urgency is dominating the decision, so the system leans into faster conversion while still protecting the margin floor.'
          : strategy === 'Premium Protect'
            ? 'Demand is strong and market pressure is manageable, so the engine favors yield protection over reactive discounting.'
            : strategy === 'Competitive Match'
              ? 'Competitor pressure is materially below the current shelf price, so the model shifts toward a market-response posture.'
              : 'Signals are mixed, so the platform balances competitiveness, demand quality, and inventory risk before moving price.',
    };
  }, [competitorGap, demandPulse, stockPressure, threshold]);

  const visibleFeed = useMemo(() => {
    return Array.from({ length: 3 }, (_, index) => liveEvents[(liveIndex + index) % liveEvents.length]);
  }, [liveIndex]);

  const applyPreset = (presetKey) => {
    const values = presets[presetKey].values;
    setActivePreset(presetKey);
    setCompetitorGap(values.competitorGap);
    setDemandPulse(values.demandPulse);
    setStockPressure(values.stockPressure);
    setThreshold(values.threshold);
  };

  const randomizeScenario = () => {
    setActivePreset('custom');
    setCompetitorGap(Math.round(Math.random() * 28) - 16);
    setDemandPulse(35 + Math.round(Math.random() * 55));
    setStockPressure(18 + Math.round(Math.random() * 72));
    setThreshold(74 + Math.round(Math.random() * 18));
  };

  return (
    <section id="interactive-lab" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-kicker justify-center">
            <SlidersHorizontal className="h-4 w-4" />
            Interactive scenario lab
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Give the landing page a live brain, not just a static face.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            This section lets visitors manipulate pricing signals, switch operational viewpoints, and watch the recommendation model react in real time.
          </p>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="surface-panel rounded-[2rem] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-pink-600">Scenario controls</p>
                <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">Tune the pricing engine live</h3>
              </div>
              <button onClick={randomizeScenario} className="btn-secondary">
                <RefreshCcw className="h-4 w-4" />
                Randomize Signals
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {Object.entries(presets).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => applyPreset(key)}
                  className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                    activePreset === key
                      ? 'border-pink-200 bg-pink-50 text-pink-700 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-pink-200 hover:text-pink-700'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="mt-8 space-y-6">
              {[
                {
                  label: 'Market gap vs competitors',
                  value: competitorGap,
                  unit: '%',
                  min: -18,
                  max: 12,
                  onChange: setCompetitorGap,
                },
                {
                  label: 'Demand momentum',
                  value: demandPulse,
                  unit: '',
                  min: 0,
                  max: 100,
                  onChange: setDemandPulse,
                },
                {
                  label: 'Stock pressure',
                  value: stockPressure,
                  unit: '',
                  min: 0,
                  max: 100,
                  onChange: setStockPressure,
                },
                {
                  label: 'Auto-execute threshold',
                  value: threshold,
                  unit: '%',
                  min: 70,
                  max: 95,
                  onChange: setThreshold,
                },
              ].map((control) => (
                <div key={control.label}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <label className="text-sm font-bold text-slate-700">{control.label}</label>
                    <span className="text-sm font-black tracking-tight text-slate-900">
                      {control.value}
                      {control.unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={control.min}
                    max={control.max}
                    value={control.value}
                    onChange={(event) => {
                      setActivePreset('custom');
                      control.onChange(Number(event.target.value));
                    }}
                    className="h-2 w-full cursor-pointer accent-pink-500"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-950 p-5 text-white">
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
                <span className="chart-legend text-slate-300"><span className="chart-dot bg-pink-500" />Market pressure</span>
                <span className="chart-legend text-slate-300"><span className="chart-dot bg-sky-500" />Confidence trend</span>
              </div>
              <div className="mt-5">
                <ScenarioChart data={derived.scenarioTrend} />
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="glass-card rounded-[2rem] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">Live recommendation</p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">Scenario output</h3>
                </div>
                <div className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.18em] ${derived.actionTone === 'text-emerald-600' ? 'border-emerald-200 bg-emerald-50 text-emerald-600' : 'border-amber-200 bg-amber-50 text-amber-600'}`}>
                  {derived.action}
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Competitor average</p>
                  <p className="mt-3 text-2xl font-black tracking-tight text-sky-600">${derived.competitorAverage.toFixed(0)}</p>
                </div>
                <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Proposed price</p>
                  <p className="mt-3 text-2xl font-black tracking-tight text-pink-600">${derived.proposedPrice}</p>
                </div>
                <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Margin after move</p>
                  <p className="mt-3 text-2xl font-black tracking-tight text-slate-900">{derived.margin.toFixed(1)}%</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Gauge className="h-5 w-5 text-pink-500" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Confidence</p>
                      <p className="text-2xl font-black tracking-tight text-slate-900">{derived.confidence}%</p>
                    </div>
                  </div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-sky-500" style={{ width: `${derived.confidence}%` }} />
                  </div>
                  <p className="mt-4 text-sm font-medium leading-6 text-slate-600">Threshold target: {threshold}%</p>
                </div>

                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    {derived.proposedPrice >= currentPrice ? <TrendingUp className="h-5 w-5 text-emerald-500" /> : <TrendingDown className="h-5 w-5 text-rose-500" />}
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Strategy selected</p>
                      <p className="text-2xl font-black tracking-tight text-slate-900">{derived.strategy}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{derived.rationale}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="glass-card rounded-[2rem] p-6">
                <div className="flex flex-wrap gap-3">
                  {Object.entries(roleViews).map(([key, role]) => (
                    <button
                      key={key}
                      onClick={() => setActiveRole(key)}
                      className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                        activeRole === key
                          ? 'border-pink-200 bg-pink-50 text-pink-700 shadow-sm'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-pink-200 hover:text-pink-700'
                      }`}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5">
                  <div className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-pink-500" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Active viewpoint</p>
                      <p className="text-xl font-black tracking-tight text-slate-900">{activeRoleView.focus}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{activeRoleView.note}</p>
                  <div className="mt-5 space-y-3">
                    {activeRoleView.checks.map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl border border-white bg-white px-4 py-3">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
                        <p className="text-sm font-medium text-slate-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-[2rem] p-6">
                <div className="flex items-center gap-3">
                  <BrainCircuit className="h-5 w-5 text-pink-500" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Live activity feed</p>
                    <p className="text-xl font-black tracking-tight text-slate-900">Signals rotating in real time</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {visibleFeed.map((event, index) => (
                    <div key={`${event.label}-${index}`} className="flex items-start justify-between gap-3 rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-sm">
                      <div>
                        <p className="text-sm font-semibold leading-6 text-slate-800">{event.label}</p>
                        <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Signal stream {liveIndex + index + 1}</p>
                      </div>
                      <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${feedToneClasses[event.tone]}`}>
                        {event.delta}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
