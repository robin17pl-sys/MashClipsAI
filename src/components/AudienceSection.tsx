import React from 'react';
import { Users, Mic, Flame, Music, Sparkles, Sliders, Disc, Film } from 'lucide-react';
import { Language } from '../types';
import { SITE_COPY, AUDIENCE_GROUPS } from '../data/content';

interface AudienceSectionProps {
  currentLang: Language;
}

export const AudienceSection: React.FC<AudienceSectionProps> = ({ currentLang }) => {
  const copy = SITE_COPY[currentLang];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Mic':
        return <Mic className="w-5 h-5 text-[#E5242A]" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-[#E5242A]" />;
      case 'Music':
        return <Music className="w-5 h-5 text-[#E5242A]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#E5242A]" />;
      case 'Sliders':
        return <Sliders className="w-5 h-5 text-[#E5242A]" />;
      case 'Disc':
        return <Disc className="w-5 h-5 text-[#E5242A]" />;
      case 'Film':
      default:
        return <Film className="w-5 h-5 text-[#E5242A]" />;
    }
  };

  return (
    <section id="audience" className="py-24 bg-[#080808] border-t border-[#1c1c1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E5242A]">
            <Users className="w-3.5 h-3.5" />
            <span>{copy.audience.kicker}</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl lg:text-4xl font-extrabold uppercase font-display text-white tracking-tight leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {copy.audience.headline}
          </h2>

          <p className="text-base sm:text-lg text-[#A5A5A5] leading-relaxed">
            {copy.audience.sub}
          </p>
        </div>

        {/* 4 Artist Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {AUDIENCE_GROUPS.map((group, idx) => (
            <div
              key={group.id}
              className="p-6 rounded-xl bg-[#121212] border border-[#222222] hover:border-[#383838] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] border border-[#262626] flex items-center justify-center mb-4">
                  {getIcon(group.iconName)}
                </div>

                <div className="text-[11px] font-mono text-[#777777] mb-1">
                  0{idx + 1} · ARTIST PROFILE
                </div>

                <h3 className="text-base font-bold text-white font-display mb-2.5 tracking-tight">
                  {group.title[currentLang]}
                </h3>

                <p className="text-xs sm:text-sm text-[#A5A5A5] leading-relaxed mb-4">
                  {group.description[currentLang]}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1c1c1c] text-xs font-mono text-[#e0e0e0]">
                <span className="text-[10px] text-[#E5242A] block uppercase">Kluczowa korzyść:</span>
                <span className="leading-snug">{group.keyBenefit[currentLang]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
