
import React from 'react';
import { SERVICES } from '../constants';

export const ServicesSection: React.FC = () => {
  return (
    <section className="px-6 py-24 bg-slate-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Specialized Manufacturing</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">We leverage state-of-the-art machinery and decades of engineering expertise to solve complex production challenges.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="p-8 rounded-3xl bg-slate-800/40 border border-white/5 hover:border-blue-500/50 transition-all group">
              <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <a href="#" className="text-blue-400 font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                Learn More <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
