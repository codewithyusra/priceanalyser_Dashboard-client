import Link from 'next/link';
import LandingInteractiveExperience from '@/components/LandingInteractiveExperience';
import MarketingHeader from '@/components/MarketingHeader';
import MouseParallaxScene from '@/components/MouseParallaxScene';
import {
  Activity,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Database,
  Layers,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react';

const heroStats = [
  {
    value: '5',
    label: 'Specialist agents',
    detail: 'Market, demand, inventory, strategy, and execution logic moving in sequence.',
  },
  {
    value: '90%',
    label: 'Auto-execute threshold',
    detail: 'Organizations can promote only the highest-confidence pricing actions automatically.',
  },
  {
    value: '10%',
    label: 'Margin floor policy',
    detail: 'Governance rules keep recommendations grounded in profitability protection.',
  },
  {
    value: '7 day',
    label: 'Trend horizon',
    detail: 'Weekly visibility helps pricing teams spot momentum before it turns into missed margin.',
  },
];

const impactMetrics = [
  {
    value: '+14.2%',
    label: 'Illustrative weekly lift',
    detail: 'A sample portfolio view that shows where governed pricing changes can compound value.',
  },
  {
    value: '92%',
    label: 'Priority confidence',
    detail: 'High-confidence actions move faster while analysts keep control over edge cases.',
  },
  {
    value: '3.8x',
    label: 'Decision throughput',
    detail: 'A pricing workspace can process more decisions than a spreadsheet-based review cycle.',
  },
];

const capabilityCards = [
  {
    icon: BrainCircuit,
    title: 'Multi-agent pricing intelligence',
    description:
      'The platform combines market, demand, inventory, pricing strategy, and execution logic into one guided recommendation flow.',
  },
  {
    icon: Database,
    title: 'Signal-aware decisioning',
    description:
      'Recommendations are built around the signals that matter to pricing teams: competitor movement, demand direction, stock position, and margin pressure.',
  },
  {
    icon: TrendingUp,
    title: 'Recommendation-first workflow',
    description:
      'Teams can generate price actions product by product, review confidence, compare current and proposed pricing, and move forward with intent.',
  },
  {
    icon: ShieldCheck,
    title: 'Governance before automation',
    description:
      'Confidence thresholds, margin floors, and approval states keep the system usable for real operators who need control, not black-box execution.',
  },
  {
    icon: Layers,
    title: 'Multi-tenant SaaS foundation',
    description:
      'Organization-scoped data, role-based access, and shared infrastructure make the product fit a B2B SaaS operating model from day one.',
  },
  {
    icon: BarChart3,
    title: 'Operational visibility',
    description:
      'Dashboards, recommendation queues, and audit trails help revenue, pricing, and category teams understand what changed and why.',
  },
];

const workflowSteps = [
  {
    step: '01',
    title: 'Collect the context around each SKU',
    description:
      'The workflow starts with competitor pricing, demand direction, and inventory position so every pricing discussion begins with the right context.',
    bullets: ['Competitor snapshots', 'Demand and seasonality signals', 'Stock level and cost awareness'],
  },
  {
    step: '02',
    title: 'Generate an explainable recommendation',
    description:
      'The strategy layer synthesizes specialist agent inputs into a proposed price, a confidence score, and a rationale that humans can actually review.',
    bullets: ['Structured price proposal', 'Confidence scoring', 'Agent-by-agent rationale'],
  },
  {
    step: '03',
    title: 'Approve, reject, or auto-execute',
    description:
      'Organizations can keep a human in the loop or allow high-confidence recommendations to move faster while still respecting policy boundaries.',
    bullets: ['Approval queue', 'Auto-execution thresholds', 'Audit-ready change history'],
  },
];

const businessModelPoints = [
  {
    title: 'Built for B2B SaaS delivery',
    description:
      'Analyze It is shaped like a software platform for retailers, marketplace operators, and commerce teams that manage many products inside one shared product experience.',
  },
  {
    title: 'Organization-level control',
    description:
      'Each tenant can operate with its own products, users, policy settings, and review flow without losing the operational efficiency of a shared platform.',
  },
  {
    title: 'Recurring operational value',
    description:
      'The product creates ongoing value through repeatable recommendation cycles, governance oversight, and continuous monitoring instead of one-off analysis.',
  },
];

const userGroups = [
  {
    title: 'Pricing Analysts',
    description: 'Review proposed price changes, inspect rationale, and manage the daily decision queue.',
  },
  {
    title: 'Category and Revenue Teams',
    description: 'Understand where margin is exposed, where competitors are moving, and which SKUs need immediate attention.',
  },
  {
    title: 'Operations and Admin Leads',
    description: 'Define thresholds, protect governance standards, and keep organization-wide execution auditable.',
  },
];

const governanceRules = [
  'Confidence thresholds determine when automation can move without manual review.',
  'Margin floors help prevent price recommendations from eroding profitability.',
  'Recommendation statuses create a clean human-in-the-loop workflow.',
  'Audit logs preserve the history behind AI and user-driven price changes.',
];

const faqItems = [
  {
    question: 'What kind of teams is this platform designed for?',
    answer:
      'Analyze It is positioned for pricing analysts, category teams, revenue operators, and ecommerce leaders who need faster pricing decisions without losing policy control.',
  },
  {
    question: 'Why add charts and numerical proof points to the landing page?',
    answer:
      'Because the product is fundamentally analytical. Showing metrics, signal charts, and decision mix visuals makes the story more credible for SaaS buyers and assignment reviewers.',
  },
  {
    question: 'Can organizations keep manual approval in place?',
    answer:
      'Yes. The product is framed around configurable governance, so teams can review recommendations manually or let high-confidence actions progress faster when policy allows it.',
  },
  {
    question: 'How do the visuals stay relevant to the actual project?',
    answer:
      'The new numbers and charts are modeled around your existing pricing concepts: agent confidence, recommendation states, threshold-based execution, margin protection, and portfolio trend monitoring.',
  },
];
const signalTrend = [
  { label: 'Mon', pressure: 48, recovery: 18 },
  { label: 'Tue', pressure: 55, recovery: 22 },
  { label: 'Wed', pressure: 58, recovery: 24 },
  { label: 'Thu', pressure: 72, recovery: 28 },
  { label: 'Fri', pressure: 78, recovery: 31 },
  { label: 'Sat', pressure: 73, recovery: 29 },
  { label: 'Sun', pressure: 67, recovery: 26 },
];

const agentScores = [
  { label: 'Market', value: 91, color: '#ec4899' },
  { label: 'Demand', value: 86, color: '#f97316' },
  { label: 'Inventory', value: 88, color: '#0ea5e9' },
  { label: 'Strategy', value: 94, color: '#8b5cf6' },
  { label: 'Execution', value: 90, color: '#10b981' },
];

const decisionMix = [
  { label: 'Pending', value: 38, color: '#0f172a' },
  { label: 'Approved', value: 27, color: '#0ea5e9' },
  { label: 'Auto', value: 21, color: '#ec4899' },
  { label: 'Rejected', value: 14, color: '#cbd5e1' },
];

const orbitHighlights = [
  { label: 'Priority SKUs', value: '18' },
  { label: 'Auto-ready', value: '11' },
  { label: 'Audit entries', value: '42' },
];

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

function TrendChart({ compact = false }) {
  const width = compact ? 320 : 520;
  const height = compact ? 180 : 260;
  const padding = compact ? 18 : 24;
  const maxValue = 90;
  const pressurePoints = buildSeriesPoints(signalTrend, 'pressure', width, height, padding, maxValue);
  const recoveryPoints = buildSeriesPoints(signalTrend, 'recovery', width, height, padding, maxValue);
  const areaPath = pointsToArea(pressurePoints, height, padding);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Weekly pricing signal trend chart"
    >
      <defs>
        <linearGradient id={`trend-fill-${compact ? 'compact' : 'full'}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.03" />
        </linearGradient>
      </defs>

      {[0, 1, 2, 3].map((line) => {
        const y = padding + ((height - padding * 2) / 3) * line;
        return <line key={line} x1={padding} y1={y} x2={width - padding} y2={y} stroke="#e2e8f0" strokeDasharray="4 8" />;
      })}

      <path d={areaPath} fill={`url(#trend-fill-${compact ? 'compact' : 'full'})`} />
      <polyline fill="none" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" points={pointsToPolyline(pressurePoints)} />
      <polyline fill="none" stroke="#0ea5e9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" points={pointsToPolyline(recoveryPoints)} />

      {pressurePoints.map(([x, y], index) => (
        <g key={signalTrend[index].label}>
          <circle cx={x} cy={y} r={compact ? 3.5 : 4.5} fill="#ec4899" />
          <circle cx={recoveryPoints[index][0]} cy={recoveryPoints[index][1]} r={compact ? 3.5 : 4.5} fill="#0ea5e9" />
          <text x={x} y={height - 4} textAnchor="middle" fontSize={compact ? '9' : '11'} fontWeight="800" fill="#94a3b8">
            {signalTrend[index].label}
          </text>
        </g>
      ))}
    </svg>
  );
}
function AgentBars({ compact = false }) {
  const maxHeight = compact ? 88 : 126;

  return (
    <div className="flex items-end gap-3 sm:gap-4">
      {agentScores.map((score) => (
        <div key={score.label} className="flex min-w-0 flex-1 flex-col items-center gap-3">
          <div className="flex h-28 items-end sm:h-36">
            <div
              className="w-8 rounded-t-[1rem] shadow-lg sm:w-10"
              style={{
                height: `${(score.value / 100) * maxHeight}px`,
                background: `linear-gradient(180deg, ${score.color}, rgba(255,255,255,0.55))`,
              }}
            />
          </div>
          <div className="text-center">
            <div className="text-sm font-black tracking-tight text-slate-900">{score.value}%</div>
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{score.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ size = 184 }) {
  const strokeWidth = 26;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const segments = decisionMix.reduce(
    (acc, item) => {
      const segment = (item.value / 100) * circumference;
      acc.items.push({
        ...item,
        dashArray: `${segment} ${circumference - segment}`,
        dashOffset: -acc.offset,
      });
      acc.offset += segment;
      return acc;
    },
    { items: [], offset: 0 }
  ).items;

  return (
    <div className="flex flex-col items-center gap-4">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-auto w-full max-w-[184px]" role="img" aria-label="Recommendation state mix">
        <g transform={`translate(${size / 2}, ${size / 2}) rotate(-90)`}>
          <circle r={radius} fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth} />
          {segments.map((item) => (
            <circle
              key={item.label}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={item.dashArray}
              strokeDashoffset={item.dashOffset}
              strokeLinecap="round"
            />
          ))}
        </g>
        <text x="50%" y="46%" textAnchor="middle" className="fill-slate-900 text-[26px] font-black tracking-tight">
          86
        </text>
        <text x="50%" y="61%" textAnchor="middle" className="fill-slate-400 text-[10px] font-black uppercase tracking-[0.22em]">
          governed moves
        </text>
      </svg>

      <div className="grid w-full gap-2">
        {decisionMix.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/85 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm font-semibold text-slate-700">{item.label}</span>
            </div>
            <span className="text-sm font-black text-slate-900">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroScene() {
  return (
    <MouseParallaxScene>
      <div className="scene-shell">
        <div className="scene-ambient scene-ambient-pink" />
        <div className="scene-ambient scene-ambient-sky" />
        <div className="landing-grid absolute inset-0 opacity-40" />
        <div className="scene-interaction-light" />

        <div className="scene-perspective">
          <div className="scene-floor" />
          <div className="scene-beam" />

          <div className="scene-layer scene-layer-orb">
            <div className="scene-orb">
              <div className="orb-core" />
              <div className="orb-ring" />
              <div className="orb-ring orb-ring-tilt" />
            </div>
          </div>

          <div className="scene-layer scene-layer-left">
            <div className="scene-card scene-card-left">
              <div className="scene-card-grid absolute inset-0 opacity-30" />
              <div className="relative p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Agent alignment</p>
                <p className="mt-2 text-lg font-black tracking-tight text-slate-900">5 models in sync</p>
                <div className="mt-4">
                  <AgentBars compact />
                </div>
              </div>
            </div>
          </div>

          <div className="scene-layer scene-layer-right">
            <div className="scene-card scene-card-right">
              <div className="relative p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Decision mix</p>
                <p className="mt-2 text-lg font-black tracking-tight text-slate-900">Queue distribution</p>
                <div className="mt-4 flex items-center justify-center">
                  <DonutChart size={148} />
                </div>
              </div>
            </div>
          </div>

          <div className="scene-layer scene-layer-main">
            <div className="scene-card scene-card-main">
              <div className="scene-card-grid absolute inset-0 opacity-35" />
              <div className="relative p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200/80 pb-4">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-pink-600">Portfolio command view</p>
                    <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">Weekly pricing pulse</h3>
                  </div>
                  <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
                    0.92 confidence
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {orbitHighlights.map((item) => (
                    <div key={item.label} className="metric-chip">
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
                      <p className="mt-2 text-xl font-black tracking-tight text-slate-900">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-white/90 p-4 shadow-sm">
                  <div className="mb-3 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                    <span className="chart-legend"><span className="chart-dot bg-pink-500" />Market pressure</span>
                    <span className="chart-legend"><span className="chart-dot bg-sky-500" />Margin recovery</span>
                  </div>
                  <TrendChart compact />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MouseParallaxScene>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-8 h-72 w-72 rounded-full bg-pink-300/40 blur-[110px]" />
        <div className="absolute right-[10%] top-20 h-80 w-80 rounded-full bg-sky-300/35 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-rose-300/35 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-8">
        <div className="relative z-10">
          <span className="section-kicker">
            <Sparkles className="h-4 w-4" />
            Multi-tenant pricing intelligence
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Pricing software with numbers, charts, and AI workflow clarity built in.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Analyze It is a B2B SaaS pricing platform for teams that need more than static dashboards. It combines multi-agent reasoning,
            governed execution, visual trend tracking, and a product story that now looks as data-driven as the platform itself.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              'Portfolio-level metrics that show how pricing decisions stack up over the week.',
              'Signal charts that make competitor pressure and margin recovery visible at a glance.',
              'A 3D command scene that gives the landing page more depth without breaking the theme.',
              'Responsive layouts that stay readable from mobile screens to large review decks.',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/80 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-pink-500" />
                <p className="text-sm font-medium leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/auth" className="btn-primary justify-center px-6 py-3 text-base shadow-[0_18px_45px_rgba(236,72,153,0.22)]">
              Launch Workspace
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a href="#analytics" className="btn-secondary justify-center px-6 py-3 text-base">
              Explore Metrics
            </a>
          </div>
        </div>

        <div className="relative z-10">
          <HeroScene />
        </div>
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <section className="pb-8 sm:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {heroStats.map((stat) => (
            <div key={stat.label} className="glass-card rounded-[1.25rem] p-5 sm:p-6">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
              <p className="mt-4 text-4xl font-black tracking-tight text-slate-900">{stat.value}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function AnalyticsShowcase() {
  return (
    <section id="analytics" className="scroll-mt-24 border-y border-slate-200/80 bg-white/60 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="surface-panel rounded-[2rem] p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="section-kicker">
                  <Activity className="h-4 w-4" />
                  Analytics showcase
                </span>
                <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                  A pricing engine should show how the portfolio is moving.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                  This sample board frames the product like a real command center: weekly signal movement, confidence by agent, and a governed recommendation mix that supports your business model.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {impactMetrics.map((metric) => (
                <div key={metric.label} className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-5 shadow-sm">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">{metric.label}</p>
                  <p className="mt-3 text-4xl font-black tracking-tight text-slate-900">{metric.value}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{metric.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-900/10 sm:p-6">
              <div className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                <span className="chart-legend text-slate-300"><span className="chart-dot bg-pink-500" />Market pressure</span>
                <span className="chart-legend text-slate-300"><span className="chart-dot bg-sky-500" />Margin recovery</span>
              </div>
              <div className="mt-5">
                <TrendChart />
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="glass-card rounded-[2rem] p-6 sm:p-7">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">Agent confidence stack</p>
              <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-900">Which specialist is driving trust</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                These scores mirror how the platform brings together specialist agents before a recommendation reaches the pricing team.
              </p>
              <div className="mt-8">
                <AgentBars />
              </div>
            </div>

            <div className="glass-card rounded-[2rem] p-6 sm:p-7">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">Recommendation mix</p>
              <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-900">A healthy decision pipeline needs balance</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Pending, approved, auto-executed, and rejected actions each tell a different story about how governance is shaping automation.
              </p>
              <div className="mt-6">
                <DonutChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="section-kicker">
            <Zap className="h-4 w-4" />
            Platform capabilities
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            The interface now feels like it belongs to a serious pricing product.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            Instead of generic marketing language, the landing page now explains the multi-agent pricing engine,
            the governance model, the analytics layer, and the B2B SaaS value proposition behind Analyze It.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {capabilityCards.map((card) => (
            <article key={card.title} className="glass-card rounded-[1.5rem] p-6 sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 text-pink-600 ring-1 ring-pink-100">
                <card.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-black tracking-tight text-slate-900">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function WorkflowSection() {
  return (
    <section id="workflow" className="scroll-mt-24 border-t border-slate-200/80 bg-white/60 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-kicker justify-center">
            <Target className="h-4 w-4" />
            Product workflow
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            A clear walkthrough from signal collection to governed execution.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            The layout stays easy to scan on mobile, tablet, and desktop while making the pricing workflow feel structured, visual, and operationally credible.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {workflowSteps.map((item) => (
            <article key={item.step} className="surface-panel rounded-[1.75rem] p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-black uppercase tracking-[0.26em] text-pink-600">Step {item.step}</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-pink-600 ring-1 ring-pink-100">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
              <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-900">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{item.description}</p>
              <div className="mt-6 space-y-3">
                {item.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/85 px-4 py-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
                    <p className="text-sm font-medium text-slate-700">{bullet}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BusinessModelSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <span className="section-kicker">
            <Building2 className="h-4 w-4" />
            Business model alignment
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Designed around a multi-tenant SaaS pricing business.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            The messaging now explains Analyze It as a recurring platform for pricing teams, not a one-time campaign page.
            That makes the story stronger for demos, assignments, stakeholder reviews, and future product positioning.
          </p>

          <div className="mt-8 space-y-4">
            {businessModelPoints.map((point) => (
              <div key={point.title} className="surface-panel rounded-[1.5rem] p-5 sm:p-6">
                <h3 className="text-xl font-black tracking-tight text-slate-900">{point.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{point.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/15 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.26em] text-pink-400">Who benefits most</p>
            <div className="mt-6 space-y-4">
              {userGroups.map((group) => (
                <div key={group.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <h3 className="text-lg font-black tracking-tight text-white">{group.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{group.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-[1.75rem] p-6 sm:p-7">
            <p className="text-xs font-black uppercase tracking-[0.26em] text-slate-400">Product footprint</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {['Dashboard intelligence', 'Catalog management', 'Recommendation review', 'Governance ledger'].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function GovernanceSection() {
  return (
    <section id="governance" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-slate-900 px-6 py-8 text-white shadow-2xl shadow-slate-900/10 sm:px-8 sm:py-10 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <span className="section-kicker border-white/10 bg-white/10 text-pink-300">
                <ShieldCheck className="h-4 w-4" />
                Governance layer
              </span>
              <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Professional AI pricing products need an explicit control model.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
                This section highlights the operational guardrails that matter in pricing software: thresholds,
                approvals, auditability, and profitability protection.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {governanceRules.map((rule) => (
                <div key={rule} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <CheckCircle2 className="h-5 w-5 text-pink-400" />
                  <p className="mt-4 text-sm leading-7 text-slate-200 sm:text-base">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-slate-200/80 bg-white/70 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-kicker justify-center">
            <Sparkles className="h-4 w-4" />
            FAQ
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Common questions about the product story and visual direction.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            The updated page now reflects the analytical nature of your product while keeping the tone and palette consistent across devices.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {faqItems.map((item) => (
            <details key={item.question} className="glass-card overflow-hidden rounded-[1.5rem]">
              <summary className="faq-summary flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left text-base font-bold text-slate-900 sm:px-6 sm:text-lg">
                <span>{item.question}</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-50 text-pink-600">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </summary>
              <div className="border-t border-slate-200/80 px-5 py-5 text-sm leading-7 text-slate-600 sm:px-6 sm:text-base">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel rounded-[2rem] p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="section-kicker">
                <BrainCircuit className="h-4 w-4" />
                Ready for review
              </span>
              <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                The landing page now feels more visual, data-rich, and product-led.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                It stays inside the existing pink, rose, slate, and sky theme while adding charts, numbers, and 3D depth that make the AI pricing engine feel more credible and memorable.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/auth" className="btn-primary justify-center px-6 py-3 text-base">
                Open Platform
              </Link>
              <a href="#analytics" className="btn-secondary justify-center px-6 py-3 text-base">
                Review Metrics
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 py-10 text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg shadow-pink-500/20">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-slate-500">Analyze It</p>
            <p className="text-sm font-medium text-slate-300">AI pricing intelligence for modern commerce teams.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-5 text-sm font-semibold">
          <a href="#analytics" className="transition hover:text-white">Analytics</a>
          <a href="#workflow" className="transition hover:text-white">Workflow</a>
          <a href="#governance" className="transition hover:text-white">Governance</a>
          <Link href="/auth" className="transition hover:text-white">Sign In</Link>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 selection:bg-pink-100 selection:text-pink-900">
      <MarketingHeader />
      <main>
        <Hero />
        <StatsStrip />
        <AnalyticsShowcase />
        <LandingInteractiveExperience />
        <Capabilities />
        <WorkflowSection />
        <BusinessModelSection />
        <GovernanceSection />
        <FAQSection />
        <ClosingSection />
      </main>
      <Footer />
    </div>
  );
}
