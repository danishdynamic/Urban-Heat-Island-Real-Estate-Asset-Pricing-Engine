import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const navigation = [
  {
    label: 'Dashboard',
    target: 'overview',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: 'Buildings Map',
    target: 'buildings',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0H9m4 0V5" />
      </svg>
    ),
  },
  {
    label: 'Climate Analytics',
    target: 'climate',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    label: 'Financial Impact',
    target: 'financial-impact',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },

  {
    label: 'System Health',
    target: 'health',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('overview');

  const scrollToSection = (target: string) => {
    setActiveSection(target);
    document.getElementById(target)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-800 bg-slate-900 shadow-xl md:block">
      <div className="flex h-full flex-col justify-between">
        
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between border-b border-slate-800/80 p-6">
            <Link to="/" className="group flex items-center gap-2.5">
              <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)] group-hover:scale-110 transition" />
              <div>
                <span className="font-mono text-sm font-bold tracking-wider text-slate-100 block">
                  URBAN_HEAT
                </span>
                <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-tight">
                  Valuation Engine
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5 p-4">
            {navigation.map((item) => {
              const isActive = activeSection === item.target;
              return (
                <button
                  key={item.target}
                  onClick={() => scrollToSection(item.target)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition duration-150 ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/20'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <span className={isActive ? 'text-cyan-400' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Navigation & Status */}
        <div className="border-t border-slate-800/80 p-4 space-y-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-cyan-400 transition"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>

          <div className="flex items-center gap-2.5 rounded-lg bg-slate-950/60 px-3 py-2 text-xs border border-slate-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-slate-300">API Operational</span>
          </div>
        </div>

      </div>
    </aside>
  );
}