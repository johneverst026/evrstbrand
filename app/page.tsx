import React from 'react';
import { Droplets, Wind, ShieldCheck, ArrowRight, Instagram } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] font-sans text-zinc-300 selection:bg-cyan-500/30">
      
      {/* Background "Glass" Effect: A soft, refractive glow */}
      <div className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
      <div className="absolute bottom-[10%] -right-[10%] h-[600px] w-[600px] rounded-full bg-blue-600/5 blur-[150px]" />

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-10 md:px-16">
        <div className="text-2xl font-light tracking-[0.4em] text-white uppercase">
          EVRST<span className="font-black text-cyan-500">.</span>
        </div>
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          <span className="text-zinc-200">Scientific Grade</span>
          <span className="hidden md:block">Limited Release</span>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-12 pb-24 text-center">
        
        {/* Product Teaser Badge */}
        <div className="mb-6 flex items-center gap-3 rounded-full border border-white/5 bg-white/[0.02] px-5 py-2 backdrop-blur-2xl">
          <Droplets size={14} className="text-cyan-400" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            Perfection in Filtration
          </span>
        </div>

        {/* Hero Title: High Contrast & Wide */}
        <h1 className="max-w-5xl text-5xl font-extralight tracking-tighter text-white md:text-8xl lg:text-9xl">
          CLEARER AT THE <br />
          <span className="font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
            SUMMIT.
          </span>
        </h1>

        <p className="mt-10 max-w-xl text-balance text-lg font-light leading-relaxed text-zinc-400 md:text-xl">
          Engineering the ultimate draw. Hand-blown borosilicate glass meets 
          precision fluid dynamics. The EVRST Collection is arriving.
        </p>

        {/* Waitlist Component: Glassmorphism Design */}
        <div className="mt-12 w-full max-w-md">
          <div className="relative p-[1px] rounded-2xl bg-gradient-to-b from-white/20 to-transparent">
            <div className="flex flex-col gap-3 rounded-2xl bg-black/40 p-2 backdrop-blur-xl sm:flex-row">
              <input 
                type="email" 
                placeholder="Join the inner circle..." 
                className="flex-grow bg-transparent px-5 py-4 text-sm outline-none placeholder:text-zinc-600"
              />
              <button className="flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-black uppercase tracking-tighter text-black transition-all hover:bg-cyan-400 active:scale-95">
                Reserve Access
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-[0.1em] text-zinc-600">
            Be notified of the first drop. Strictly limited quantities.
          </p>
        </div>

        {/* Product Features: Why EVRST is different */}
        <div className="mt-24 grid grid-cols-1 gap-12 border-t border-white/5 pt-16 md:grid-cols-3">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <Wind size={20} className="text-cyan-400" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">Aerodynamic Flow</h3>
            <p className="max-w-[200px] text-[13px] text-zinc-500">Minimizing resistance for the smoothest possible intake.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <ShieldCheck size={20} className="text-cyan-400" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">Heavy Wall Glass</h3>
            <p className="max-w-[200px] text-[13px] text-zinc-500">Ultra-durable 9mm borosilicate. Built for the peak.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <Droplets size={20} className="text-cyan-400" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">Pure Filtration</h3>
            <p className="max-w-[200px] text-[13px] text-zinc-500">Proprietary percolator technology for zero-splash cooling.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col items-center justify-between gap-6 border-t border-white/5 bg-black/80 px-12 py-10 md:flex-row backdrop-blur-md">
        <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600">
          © 2024 EVRST Glassworks. Intended for tobacco use only.
        </div>
        <div className="flex gap-8">
          <a href="#" className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-cyan-400 transition-colors">
            <Instagram size={14} /> Instagram
          </a>
        </div>
      </footer>
    </div>
  );
}