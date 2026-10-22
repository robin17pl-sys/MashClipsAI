import React from 'react';
import { Package, ArrowRight, Check, Clock, Sparkles } from 'lucide-react';
import { Language, OfferPackage } from '../types';
import { SITE_COPY, OFFER_PACKAGES } from '../data/content';

interface OfferSectionProps {
  currentLang: Language;
  onSelectPackage: (packageName: string) => void;
}

export const OfferSection: React.FC<OfferSectionProps> = ({ currentLang, onSelectPackage }) => {
  const copy = SITE_COPY[currentLang];

  return (
    <section id="packages" className="py-24 bg-[#0a0a0a] border-t border-[#1c1c1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E5242A]">
            <Package className="w-3.5 h-3.5" />
            <span>{copy.packages.kicker}</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl lg:text-4xl font-extrabold uppercase font-display text-white tracking-tight leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {copy.packages.headline}
          </h2>

          <p className="text-base sm:text-lg text-[#A5A5A5] leading-relaxed">
            {copy.packages.sub}
          </p>
        </div>

        {/* 5 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFER_PACKAGES.map((pkg, idx) => {
            const isFeatured = pkg.id === 'music-video';
            return (
              <div
                key={pkg.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all border ${
                  isFeatured
                    ? 'bg-[#141414] border-[#E5242A] shadow-xl shadow-[#E5242A]/10 lg:-translate-y-2'
                    : 'bg-[#101010] border-[#222222] hover:border-[#383838]'
                }`}
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono uppercase text-[#A5A5A5]">
                      0{idx + 1}
                    </span>
                    {pkg.badge && (
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#E5242A]">
                        {pkg.badge[currentLang]}
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold font-display uppercase text-white tracking-tight mb-2">
                    {pkg.name}
                  </h3>

                  <p className="text-xs sm:text-sm font-medium text-[#E5242A] mb-4">
                    {pkg.tagline[currentLang]}
                  </p>

                  <p className="text-xs sm:text-sm text-[#A5A5A5] leading-relaxed mb-6">
                    {pkg.description[currentLang]}
                  </p>

                  {/* Scope Checklist */}
                  <div className="space-y-3 pt-4 border-t border-[#1c1c1c] mb-6">
                    <span className="text-[11px] font-mono uppercase text-[#777777] block">
                      {copy.packages.scopeLabel}
                    </span>
                    {pkg.scopeList[currentLang].map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-2.5 text-xs text-[#cccccc]">
                        <Check className="w-3.5 h-3.5 text-[#E5242A] shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Meta & CTA */}
                <div className="pt-6 border-t border-[#1c1c1c] space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#888888]">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#A5A5A5]" />
                      {pkg.turnaroundTime[currentLang]}
                    </span>
                    <span className="text-white font-medium">Wycena indywidualna</span>
                  </div>

                  <button
                    onClick={() => onSelectPackage(pkg.name)}
                    className={`w-full py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isFeatured
                        ? 'bg-[#E5242A] hover:bg-[#c91d22] text-white shadow-md'
                        : 'bg-[#1b1b1b] hover:bg-[#262626] text-white border border-[#333333]'
                    }`}
                  >
                    <span>{copy.packages.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
