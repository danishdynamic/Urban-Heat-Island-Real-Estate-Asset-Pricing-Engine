import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-20">
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
              Open Interactive Platform
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
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

      {/* Interactive Visual Highlights (Framer Motion replacing static map frame) */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl shadow-xl"
          >
            <div className="h-10 w-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-mono text-sm mb-4">
              3D
            </div>
            <h3 className="text-lg font-semibold text-white">Spatial Heat Layers</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              High-resolution 3D building extrusions linked with surface temperature anomalies and canopy coverage index data.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              <span className="font-mono text-[10px] text-slate-500">GeoJSON Layer Active</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl shadow-xl"
          >
            <div className="h-10 w-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-mono text-sm mb-4">
              DCF
            </div>
            <h3 className="text-lg font-semibold text-white">Valuation Engine</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Adjust net operating income (NOI) automatically based on extreme heat events, HVAC energy spikes, and local cooling credits.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
              <span className="font-mono text-[10px] text-slate-500">Discounted Cash Flow</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl shadow-xl"
          >
            <div className="h-10 w-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-mono text-sm mb-4">
              NOI
            </div>
            <h3 className="text-lg font-semibold text-white">Scenario Analysis</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Stress-test asset portfolios across 2026–2050 warming projections to estimate CapEx requirements and yield erosion.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal-400"></span>
              <span className="font-mono text-[10px] text-slate-500">Climate Stress Test</span>
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  );
}