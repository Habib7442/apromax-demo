
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="px-6 pt-20 pb-12 md:pt-32 md:pb-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          AS9100 Certified Precision
        </div>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter">
          Engineering the <br />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Future of Motion</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed">
          From aerospace components to medical breakthroughs, Apromax Engineering delivers high-precision manufacturing solutions for world-class industries.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20">
            View Capabilities
          </button>
          <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all">
            Get Quote
          </button>
        </div>
      </div>
      <div className="relative group">
        <div className="absolute inset-0 bg-blue-500 rounded-full blur-[120px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <img 
          src="https://picsum.photos/seed/engineering/800/800" 
          alt="CNC Precision Component" 
          className="relative rounded-3xl object-cover w-full aspect-square shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute -bottom-6 -left-6 md:-bottom-12 md:-left-12 bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="text-4xl">⚙️</div>
            <div>
              <div className="text-2xl font-bold text-white">0.005mm</div>
              <div className="text-slate-500 text-xs uppercase tracking-widest">Tolerance Limit</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
