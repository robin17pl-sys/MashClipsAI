import React from 'react';
import { UserCheck, Wand2, Film, Layers } from 'lucide-react';
import { Language } from '../types';
import { SITE_COPY } from '../data/content';

interface AboutSectionProps {
  currentLang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentLang }) => {
  const copy = SITE_COPY[currentLang];

  const icons = [
    <UserCheck key="0" className="w-5 h-5 text-[#E5242A]" />,
    <Wand2 key="1" className="w-5 h-5 text-[#E5242A]" />,
    <Film key="2" className="w-5 h-5 text-[#E5242A]" />,
    <Layers key="3" className="w-5 h-5 text-[#E5242A]" />,
  ];

  return (
    <section id="about" className="py-24 bg-[#0a0a0a] border-t border-[#1c1c1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E5242A]">
            <span className="w-4 h-px bg-[#E5242A]" />
            <span>{copy.about.kicker}</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl lg:text-4xl font-extrabold uppercase font-display text-white tracking-tight leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {copy.about.headline}
          </h2>

          <p className="text-base sm:text-lg text-[#A5A5A5] leading-relaxed">
            {copy.about.lead}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {copy.about.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-[#121212] border border-[#222222] hover:border-[#383838] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  {icons[idx]}
                </div>

                <div className="text-xs font-mono text-[#A5A5A5] mb-1">
                  0{idx + 1}
                </div>

                <h3 className="text-lg font-bold text-white font-display mb-3 tracking-tight">
                  {pillar.title}
                </h3>

                <p className="text-sm text-[#8c8c8c] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1c1c1c] flex items-center justify-between text-[11px] font-mono text-[#A5A5A5]">
                <span>MASH Standard</span>
                <span className="text-[#E5242A]">Active</span>
              </div>
            </div>
          ))}
        </div>

        {/* Studio quote banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#141414] to-[#121212] border border-[#262626] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#E5242A]">
              Manifest MASH Clips AI
            </span>
            <p className="text-lg font-display font-medium text-white italic">
              „Prawdziwi artyści. Prawdziwe emocje. Nieograniczony świat obrazu dzięki AI.”
            </p>
          </div>
          <div className="text-xs font-mono text-[#A5A5A5] shrink-0 border-l border-[#2e2e2e] pl-4">
            <span>MASH Schron Muzyczny</span>
            <br />
            <span>& Dream Studio Productions</span>
          </div>
        </div>
      </div>
    </section>
  );
};
