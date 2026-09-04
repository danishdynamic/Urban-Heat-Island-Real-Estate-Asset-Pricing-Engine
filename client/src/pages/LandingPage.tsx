import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950">
      {/* Background Radial Glow & Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-950/40 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Navigation Header */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 border-b border-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
          <span className="font-mono text-sm font-semibold tracking-wider text-slate-200">URBAN_HEAT</span>
        </div>
        <Link
          to="/dashboard"
          className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-300 transition hover:bg-cyan-500/20 hover:border-cyan-500/60"
        >
          Launch Platform →
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-xs font-mono text-cyan-400 backdrop-blur-md mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            ENVIRONMENTAL INTELLIGENCE × REAL ESTATE
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl leading-[1.1]">
            Urban Heat <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Valuation Engine
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed">
            Quantify how microclimates, tree canopy density, energy costs, and climate scenario modeling influence commercial property valuation in real time.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.3)]"
            >
              Open Interactive Map
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition backdrop-blur-md"
            >
              System Architecture
            </a>
          </div>

          {/* Key Capabilities */}
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { title: '3D Buildings', desc: 'Deck.gl GeoJSON spatial rendering' },
              { title: 'Heat Analytics', desc: 'Surface & ambient thermal metrics' },
              { title: 'DCF Valuation', desc: 'QuantLib financial cash flow models' },
              { title: 'Climate Scenarios', desc: 'NOI impact & HVAC stress-testing' },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md hover:border-cyan-500/40 transition duration-300"
              >
                <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition">
                  {item.title}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Glassmorphic Mockup Frame */}
      <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-2 backdrop-blur-xl shadow-2xl">
          <div className="rounded-xl border border-white/5 bg-slate-950 p-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-xs text-slate-500">munich_commercial_district_v1.geojson</span>
            </div>
            <div className="h-64 flex items-center justify-center text-sm font-mono text-slate-500">
              [ Deck.gl 3D Urban Heat Layer Visualizer ]
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}