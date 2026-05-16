'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import api from '@/lib/api';
import { 
  BarChart3, 
  Package, 
  RefreshCcw, 
  Activity, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ShieldCheck,
  Bell
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...args) => twMerge(clsx(args));

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const { data } = await api.get('/pricing/recommendations');
        const pending = data.filter(r => r.status === 'pending').length;
        setPendingCount(pending);
      } catch (err) {
        // Silent error for sidebar
      }
    };
    
    fetchPending();
    const interval = setInterval(fetchPending, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, [pathname]);

  const menuItems = [
    { name: 'Dashboard', icon: BarChart3, path: '/dashboard' },
    { name: 'Inventory', icon: Package, path: '/catalog' },
    { name: 'Strategy Lab', icon: RefreshCcw, path: '/recommendations', badge: pendingCount },
    { name: 'Governance', icon: Activity, path: '/audit' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-600 active:scale-95 transition-all text-sm font-bold flex items-center gap-2"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          {pendingCount > 0 && <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />}
        </button>
      </div>

      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <Link href="/" className="p-8 pb-10 flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center shadow-lg shadow-pink-500/20">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">Analyze It</h2>
        </Link>

        <nav className="flex-1 px-4 space-y-1">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Operations</p>
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center justify-between px-4 py-2.5 rounded-md transition-all duration-200 text-sm font-semibold group",
                  isActive 
                    ? "bg-slate-800 text-white shadow-sm" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-4 h-4", isActive ? "text-pink-500" : "text-slate-500 group-hover:text-pink-500")} />
                  <span>{item.name}</span>
                </div>
                {item.badge > 0 && (
                  <span className="flex items-center justify-center bg-pink-600 text-white text-[10px] font-black h-5 min-w-[20px] px-1.5 rounded-full shadow-lg shadow-pink-600/20">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/auth';
            }}
            className="flex items-center gap-3 px-4 py-2.5 w-full text-slate-400 text-sm font-semibold hover:text-white transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-30 lg:hidden"
        />
      )}
    </>
  );
}
