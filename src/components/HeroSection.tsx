import React from 'react';
import { ArrowRight, Play, ChevronDown, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { SITE_COPY, IMAGES } from '../data/content';

interface HeroSectionProps {
  currentLang: Language;
  onOpenBrief: () => void;
  onOpenShowreel: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  onOpenBrief,
  onOpenShowreel,
}) => {
  const copy = SITE_COPY[currentLang];

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-24 pb-8 overflow-hidden bg-[#080808]">
      {/* Background Image with Bright, Vivid, Clear Treatment */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero}
          alt="MASH Clips AI - Muzyk na planie Green Screen i surrealistyczny świat AI"
          className="w-full h-full object-cover object-center sm:object-[center_35%] opacity-95 brightness-110 contrast-105 saturate-[1.1] scale-[1.01] transition-all duration-700"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.includes('hero.jpg')) {
              target.src = '/images/hero.jpg';
            }
          }}
        />
        {/* Clear, refined scrim: lets the artwork shine bright while keeping text 100% legible */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#080808]/85 via-[#080808]/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-[#080808]/30 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 film-grain pointer-events-none opacity-20" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center my-auto py-8">
        <div className="max-w-4xl space-y-6">
          {/* Subtle Editorial Kicker */}
          <div className="inline-flex items-center gap-3 text-xs tracking-widest uppercase font-mono text-[#E5242A] bg-[#080808]/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#E5242A] animate-pulse" />
            <span className="font-semibold">{copy.hero.badge}</span>
            <span className="text-[#A5A5A5] hidden sm:inline">·</span>
            <span className="text-[#d4d4d4] hidden sm:inline text-[11px] normal-case font-sans">
              MASH Schron Muzyczny × Dream Studio Productions
            </span>
          </div>

          {/* Master Headline */}
          <h1
            className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase font-display text-white tracking-tight leading-[1.12] sm:leading-[1.08] text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] break-words"
            style={{ textWrap: 'balance' }}
          >
            {copy.hero.headline}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-xl text-[#F5F5F5] font-normal leading-relaxed max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            {copy.hero.subheadline}
          </p>

          {/* CTA Buttons - Full width on phone, row on tablet/desktop */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={onOpenBrief}
              className="w-full sm:w-auto px-6 py-4 sm:py-3.5 bg-[#E5242A] hover:bg-[#c91d22] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-lg transition-all shadow-xl shadow-[#E5242A]/30 hover:shadow-[#E5242A]/50 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{copy.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenShowreel}
              className="w-full sm:w-auto px-6 py-4 sm:py-3.5 bg-[#171717]/90 hover:bg-[#222222] text-[#F5F5F5] hover:text-white font-medium text-xs sm:text-sm rounded-lg border border-[#444444] hover:border-[#666666] backdrop-blur-md transition-all shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-[#E5242A]/20 flex items-center justify-center text-[#E5242A]">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
              <span>{copy.hero.ctaSecondary}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full-width Studio Metrics Strip below Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 sm:pt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-xl bg-[#121212]/85 border border-[#222222] backdrop-blur-md">
          {copy.hero.stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col border-l border-[#262626] pl-3 sm:pl-4 odd:border-l-0 md:odd:border-l md:first:border-l-0"
            >
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#A5A5A5] font-mono">
                {stat.label}
              </span>
              <span className="text-xs sm:text-sm md:text-base font-bold text-white font-display mt-0.5">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll prompt */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handleScrollTo('about')}
            className="flex items-center gap-2 text-xs font-mono text-[#A5A5A5] hover:text-white transition-colors cursor-pointer"
            aria-label="Przewiń stronę w dół"
          >
            <span>DISCOVER MASH PIPELINE</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#E5242A]" />
          </button>
        </div>
      </div>
    </section>
  );
};
