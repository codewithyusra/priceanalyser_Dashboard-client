'use client';

import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { href: '#analytics', label: 'Analytics' },
  { href: '#capabilities', label: 'Platform' },
  { href: '#workflow', label: 'Workflow' },
  { href: '#governance', label: 'Governance' },
];

function withPrefix(prefix, href) {
  return `${prefix}${href}`;
}

export default function MarketingHeader({
  sectionHrefPrefix = '',
  primaryHref = '/auth',
  primaryLabel = 'Open Platform',
  secondaryHref,
  secondaryLabel = 'Explore Metrics',
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);
  const resolvedSecondaryHref = secondaryHref ?? withPrefix(sectionHrefPrefix, '#analytics');
  
  const finalPrimaryHref = isLoggedIn ? '/dashboard' : primaryHref;
  const finalPrimaryLabel = isLoggedIn ? 'Go to Dashboard' : primaryLabel;

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg shadow-pink-500/20">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-black uppercase tracking-[0.22em] text-slate-400">Analyze It</p>
            <p className="truncate text-base font-bold text-slate-900">AI Dynamic Pricing Engine</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={withPrefix(sectionHrefPrefix, item.href)} className="transition hover:text-pink-600">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={resolvedSecondaryHref} className="btn-secondary hidden sm:inline-flex">
            {secondaryLabel}
          </a>
          <Link href={finalPrimaryHref} className="btn-primary">
            {finalPrimaryLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
