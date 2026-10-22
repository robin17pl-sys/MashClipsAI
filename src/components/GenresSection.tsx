import React, { useState } from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { Language, MusicGenre } from '../types';
import { SITE_COPY, GENRE_DATA } from '../data/content';

interface GenresSectionProps {
  currentLang: Language;
  onSelectGenre: (genre: MusicGenre) => void;
}

export const GenresSection: React.FC<GenresSectionProps> = ({ currentLang, onSelectGenre }) => {
  const copy = SITE_COPY[currentLang];
  const [activeGenreId, setActiveGenreId] = useState<MusicGenre>('rock-pop');

  const activeGenre = GENRE_DATA.find(g => g.id === activeGenreId) || GENRE_DATA[0];

  const handleGenreClick = (id: MusicGenre) => {
    setActiveGenreId(id);
    onSelectGenre(id);
  };

  return (
    <section id="genres" className="py-24 bg-[#080808] relative border-t border-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
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

        {/* Interactive Genre Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {GENRE_DATA.map((genre) => {
            const isSelected = activeGenreId === genre.id;
            return (
              <button
                key={genre.id}
                onClick={() => handleGenreClick(genre.id)}
                className={`p-5 rounded-xl text-left transition-all border flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#171717] border-[#E5242A] shadow-lg shadow-[#E5242A]/10 scale-[1.02]'
                    : 'bg-[#101010] border-[#222222] hover:border-[#383838] hover:bg-[#141414]'
                }`}
              >
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#A5A5A5] mb-2 flex items-center justify-between">
                    <span>{genre.tag[currentLang].split('·')[0]}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#E5242A]" />
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white font-display uppercase tracking-tight leading-snug">
                    {genre.title[currentLang]}
                  </h3>
                </div>

                <div className="mt-6 pt-3 border-t border-[#1f1f1f] flex items-center justify-between text-xs text-[#A5A5A5]">
                  <span className="text-[11px] font-mono">
                    {isSelected ? (currentLang === 'pl' ? 'Aktywny' : 'Active') : (currentLang === 'pl' ? 'Wybierz' : 'Explore')}
                  </span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isSelected ? 'text-[#E5242A] translate-x-1' : 'text-[#666666]'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Genre Spotlight Box */}
        <div className="p-8 rounded-2xl bg-[#121212] border border-[#262626] relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#E5242A]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {currentLang === 'pl' ? 'Estetyka & Kierunek Wizualny' : 'Aesthetic & Visual Direction'}:{' '}
                <strong className="text-white">{activeGenre.title[currentLang]}</strong>
              </span>
            </div>

            <p className="text-base sm:text-lg text-white font-normal leading-relaxed">
              {activeGenre.desc[currentLang]}
            </p>

            <div className="pt-4 border-t border-[#1f1f1f] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-[#A5A5A5]">
                <span className="font-mono text-[#F5F5F5] uppercase block text-[11px] mb-0.5">
                  {currentLang === 'pl' ? 'Przykładowy koncept wizualny:' : 'Sample Visual Concept:'}
                </span>
                <span className="italic text-white">
                  „{activeGenre.sampleConcept.artist} — {activeGenre.sampleConcept.track}”: {activeGenre.sampleConcept.visual}
                </span>
              </div>

              <button
                onClick={() => {
                  const el = document.getElementById('portfolio');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  onSelectGenre(activeGenre.id);
                }}
                className="px-4 py-2 bg-[#1f1f1f] hover:bg-[#282828] text-white text-xs font-semibold uppercase tracking-wider rounded-lg border border-[#333333] transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
              >
                {currentLang === 'pl' ? 'Filtruj portfolio tym gatunkiem' : 'Filter works by this genre'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
