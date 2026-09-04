const navigation = [
  {
    label: 'Dashboard',
    target: 'overview',
  },
  {
    label: 'Buildings',
    target: 'buildings',
  },
  {
    label: 'Climate',
    target: 'climate',
  },
  {
    label: 'Valuation',
    target: 'valuation',
  },
  {
    label: 'Risk',
    target: 'risk',
  },
  {
    label: 'System Health',
    target: 'health',
  },
];

export default function Sidebar() {
  const scrollToSection = (target: string) => {
    document
      .getElementById(target)
      ?.scrollIntoView({
        behavior: 'smooth',
      });
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/10 bg-slate-950 md:block">
      <div className="flex h-full flex-col">
        <div className="border-b border-white/10 p-6">
          <div className="text-lg font-bold text-white">
            UrbanHeat
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Valuation Engine
          </p>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => (
            <button
              key={item.target}
              onClick={() =>
                scrollToSection(item.target)
              }
              className="w-full rounded-lg px-4 py-3 text-left text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />

            <span className="text-slate-400">
              System operational
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}