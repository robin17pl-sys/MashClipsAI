import React from 'react';
import { Compass, Music } from 'lucide-react';
import { Language, MusicGenre } from '../types';
import { SITE_COPY, GENRE_DATA } from '../data/content';

interface GenresSectionProps {
  currentLang: Language;
  onSelectGenre?: (genre: MusicGenre) => void;
}

export const GenresSection: React.FC<GenresSectionProps> = ({ currentLang }) => {
  const copy = SITE_COPY[currentLang];

  return (
    <section id="genres" className="py-20 bg-[#080808] relative border-t border-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E5242A]">
            <Compass className="w-3.5 h-3.5" />
            <span>{copy.genres.kicker}</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl lg:text-4xl font-extrabold uppercase font-display text-white tracking-tight leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {copy.genres.headline}
          </h2>

          <p className="text-base sm:text-lg text-[#A5A5A5] leading-relaxed">
            {copy.genres.sub}
          </p>
        </div>

        {/* Clean Genre Cards - Same gatunki, bez opisów i szczegółów */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {GENRE_DATA.map((genre) => (
            <div
              key={genre.id}
              className="group p-5 sm:p-6 rounded-xl bg-[#111111] border border-[#222222] hover:border-[#E5242A]/60 hover:bg-[#151515] transition-all flex flex-col justify-between min-h-[110px]"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: genre.accentColor || '#E5242A' }}
                />
                <Music className="w-4 h-4 text-[#555555] group-hover:text-[#E5242A] transition-colors" />
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white font-display uppercase tracking-tight leading-snug">
                {genre.title[currentLang]}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
