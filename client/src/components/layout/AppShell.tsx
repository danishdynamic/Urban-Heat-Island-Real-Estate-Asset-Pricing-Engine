import { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface Props {
  children: ReactNode;
}

export default function AppShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Sidebar />

      <div className="md:pl-64">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Urban Heat Valuation Engine
              </p>

              <p className="text-xs text-slate-500">
                Environmental intelligence platform
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="font-medium text-slate-600">
                API Online
              </span>
            </div>
          </div>
        </header>

        <main className="p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}