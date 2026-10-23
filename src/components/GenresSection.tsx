import React from 'react';
import { Compass, Music, Video, Sparkles, ArrowRight, Camera } from 'lucide-react';
import { Language, MusicGenre } from '../types';
import { SITE_COPY, GENRE_DATA, IMAGES } from '../data/content';

interface GenresSectionProps {
  currentLang: Language;
  onSelectGenre?: (genre: MusicGenre) => void;
}

export const GenresSection: React.FC<GenresSectionProps> = ({ currentLang, onSelectGenre }) => {
  const copy = SITE_COPY[currentLang];

  const handleScrollToBrief = () => {
    const el = document.getElementById('brief');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="genres" className="py-20 sm:py-24 bg-[#080808] relative border-t border-[#1c1c1c] overflow-hidden">
      {/* Full-Section Bright Cinematic Background Image spanning behind Header, Genre Cards & Showcase */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.genresBackdrop}
          alt="MASH Schron Muzyczny & Dream Studio Productions - Plan Filmowy i Soundstage"
          className="w-full h-full object-cover object-top sm:object-center opacity-95 brightness-110 contrast-105 saturate-[1.1] scale-[1.01] transition-all duration-700"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.includes('genres_backdrop.jpg')) {
              target.src = '/images/genres_backdrop.jpg';
            }
          }}
        />

        {/* Cinematic Scrims - Preserves vivid stage lights & clarity while guaranteeing AAA text readability */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#080808] via-[#080808]/70 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/75 via-[#080808]/40 to-[#080808]/85 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-transparent pointer-events-none" />
        <div className="absolute inset-0 film-grain opacity-20 pointer-events-none" />
      </div>

      {/* Ambient background glows matching hero tone */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E5242A]/15 blur-[140px] pointer-events-none rounded-full z-[1]" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-amber-600/15 blur-[130px] pointer-events-none rounded-full z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E5242A] bg-[#0c0c0c]/85 border border-white/15 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-lg">
            <Compass className="w-3.5 h-3.5" />
            <span>{copy.genres.kicker}</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase font-display text-white tracking-tight leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
            style={{ textWrap: 'balance' }}
          >
            {copy.genres.headline}
          </h2>

          <p className="text-base sm:text-lg text-[#F0F0F0] leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] max-w-2xl">
            {copy.genres.sub}
          </p>
        </div>

        {/* Genre Cards Grid - Positioned Directly Over Bright Soundstage Photo with Frosted Glass */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {GENRE_DATA.map((genre) => (
            <div
              key={genre.id}
              onClick={() => onSelectGenre && onSelectGenre(genre.id)}
              className="group p-4 sm:p-5 rounded-xl bg-[#0c0c0c]/80 hover:bg-[#161616]/95 backdrop-blur-md border border-white/15 hover:border-[#E5242A] transition-all flex flex-col justify-between min-h-[102px] sm:min-h-[116px] cursor-pointer shadow-xl hover:shadow-[#E5242A]/25 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125 shadow-sm"
                  style={{ backgroundColor: genre.accentColor || '#E5242A' }}
                />
                <Music className="w-4 h-4 text-[#888888] group-hover:text-[#E5242A] transition-colors" />
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white font-display uppercase tracking-tight leading-snug drop-shadow-sm">
                {genre.title[currentLang]}
              </h3>
            </div>
          ))}
        </div>

        {/* SOUNDSTAGE & PRODUCTION CAPABILITIES SHOWCASE */}
        <div className="mt-12 sm:mt-16 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 bg-[#0a0a0a]/80 backdrop-blur-xl p-6 sm:p-10 lg:p-12 shadow-2xl">
          {/* Subtle inner ambient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5242A]/10 blur-[100px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />

          {/* Viewfinder Camera Overlays */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8 pb-5 border-b border-white/10">
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-white/95 bg-[#141414]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-semibold tracking-wider">SOUNDSTAGE LIVE</span>
              <span className="text-white/40">·</span>
              <span className="text-[#e0e0e0]">MASH Schron & Dream Studio</span>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px] sm:text-xs text-white/90 bg-[#141414]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
              <Camera className="w-3.5 h-3.5 text-[#E5242A]" />
              <span>4K RAW 24FPS · 1/50 · T1.5 · ISO 800</span>
            </div>
          </div>

          {/* Content Details */}
          <div className="relative z-10 max-w-4xl space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {currentLang === 'pl'
                  ? 'PROFESJONALNY PLAN ZDJĘCIOWY & OŚWIETLENIE'
                  : 'PROFESSIONAL SOUNDSTAGE & LIGHTING RIG'}
              </span>
            </div>

            <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold uppercase font-display text-white tracking-tight leading-tight drop-shadow-md">
              {currentLang === 'pl'
                ? 'ŻYWY WYSTĘP NA SCENIE. NIESKOŃCZONE ŚWIATY W POSTPRODUKCJI.'
                : 'LIVE PERFORMANCE ON STAGE. INFINITE WORLDS IN POST-PRODUCTION.'}
            </h3>

            <p className="text-sm sm:text-base text-[#dcdcdc] max-w-3xl leading-relaxed">
              {currentLang === 'pl'
                ? 'Każdy gatunek muzyczny rejestrujemy w kontrolowanych warunkach studyjnych z profesjonalnym oświetleniem koncertowym, dymem i kamerami kinowymi. Następnie sztuczna inteligencja buduje wokół Ciebie zapierającą dech scenografię.'
                : 'Every music genre is recorded in controlled studio conditions with live concert lighting rigs, haze, and cinema cameras. Artificial intelligence then generates stunning custom scenography around your performance.'}
            </p>

            {/* Key Spec Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-white/95">
              <span className="px-3.5 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 shadow-sm">
                {currentLang === 'pl' ? 'Oświetlenie sceniczne & Haze' : 'Concert Lighting & Haze'}
              </span>
              <span className="px-3.5 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 shadow-sm">
                {currentLang === 'pl' ? 'Kamera kinowa na wózku' : 'Dolly Cinema Camera Rig'}
              </span>
              <span className="px-3.5 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 shadow-sm">
                {currentLang === 'pl' ? 'Generatywny VFX AI 4K' : 'Generative 4K AI VFX'}
              </span>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={handleScrollToBrief}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E5242A] hover:bg-[#c91d23] text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-[#E5242A]/30 hover:shadow-[#E5242A]/50 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>
                  {currentLang === 'pl'
                    ? 'SKONSULTUJ TWÓJ TELEDYSK'
                    : 'DISCUSS YOUR MUSIC VIDEO'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleScrollToPortfolio}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#181818]/90 hover:bg-[#252525] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all border border-white/20 backdrop-blur-md cursor-pointer"
              >
                <Video className="w-4 h-4 text-[#E5242A]" />
                <span>
                  {currentLang === 'pl'
                    ? 'ZOBACZ REALIZACJE'
                    : 'VIEW SHOWCASES'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
