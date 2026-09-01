import {
  ReactNode,
} from 'react';

interface Props {
  children: ReactNode;
}

export function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-950 text-white">
      {children}
    </div>
  );
}