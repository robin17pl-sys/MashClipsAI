import React, { useState } from 'react';
import { Play, Sparkles, Film, Info, ArrowUpRight } from 'lucide-react';
import { ProjectConcept, Language, MusicGenre } from '../types';
import { SITE_COPY, PORTFOLIO_PROJECTS, IMAGES } from '../data/content';
import { ShowreelModal } from './ShowreelModal';

interface PortfolioSectionProps {
  currentLang: Language;
  selectedGenreFilter: MusicGenre;
  onSetGenreFilter: (genre: MusicGenre) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  currentLang,
  selectedGenreFilter,
  onSetGenreFilter,
}) => {
  const copy = SITE_COPY[currentLang];
  const [activeProject, setActiveProject] = useState<ProjectConcept | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filterTabs: { id: MusicGenre; label: { pl: string; en: string } }[] = [
    { id: 'all', label: { pl: 'Wszystkie Projekty', en: 'All Projects' } },
    { id: 'rock-pop', label: { pl: 'Pop & Rock', en: 'Pop & Rock' } },
    { id: 'metal', label: { pl: 'Hard Rock & Metal', en: 'Hard Rock & Metal' } },
    { id: 'instrumental', label: { pl: 'Instrumentalna', en: 'Instrumental' } },
    { id: 'classical', label: { pl: 'Klasyczna', en: 'Classical' } },
    { id: 'film-experimental', label: { pl: 'Filmowa & Exp.', en: 'Film & Exp.' } },
  ];

  const filteredProjects =
    selectedGenreFilter === 'all'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.genre === selectedGenreFilter);

  const handleOpenProject = (project: ProjectConcept) => {
    setActiveProject(project);
    setModalOpen(true);
  };

  return (
    <section id="portfolio" className="py-24 bg-[#0a0a0a] border-t border-[#1c1c1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E5242A]">
              <Film className="w-3.5 h-3.5" />
              <span>{copy.portfolio.kicker}</span>
            </div>

            <h2
              className="text-2xl sm:text-4xl lg:text-4xl font-extrabold uppercase font-display text-white tracking-tight leading-tight"
              style={{ textWrap: 'balance' }}
            >
              {copy.portfolio.headline}
            </h2>

            <p className="text-base text-[#A5A5A5] leading-relaxed">
              {copy.portfolio.sub}
            </p>
          </div>

          {/* Honest Demo Disclaimer Note */}
          <div className="p-3.5 rounded-xl bg-[#141414] border border-[#222222] max-w-sm text-xs text-[#8c8c8c] flex items-start gap-2.5 shrink-0">
            <Info className="w-4 h-4 text-[#E5242A] shrink-0 mt-0.5" />
            <p className="leading-snug">{copy.portfolio.demoDisclaimer}</p>
          </div>
        </div>

        {/* Functional Segmented Filter Bar (Button Controls) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#121212] rounded-xl border border-[#222222] overflow-x-auto mb-10">
          {filterTabs.map((tab) => {
            const isActive = selectedGenreFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSetGenreFilter(tab.id)}
                className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#E5242A] text-white shadow-sm'
                    : 'text-[#A5A5A5] hover:text-white hover:bg-[#1a1a1a]'
                }`}
              >
                {tab.label[currentLang]}
              </button>
            );
          })}
        </div>

        {/* Featured Showcase Reel Hero Card (Official Promo Video) */}
        {(() => {
          const featured = PORTFOLIO_PROJECTS[0];
          return (
            <div
              onClick={() => handleOpenProject(featured)}
              className="relative rounded-2xl overflow-hidden border border-[#262626] bg-[#121212] mb-8 cursor-pointer group"
            >
              <div className="aspect-[21/9] sm:aspect-[2.4/1] w-full relative">
                <img
                  src={featured.thumbnail}
                  alt={featured.title}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('hqdefault')) {
                      target.src = 'https://img.youtube.com/vi/UhUu5nLT6Ek/hqdefault.jpg';
                    } else {
                      target.src = IMAGES.hero;
                    }
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Play Button Center Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E5242A]/90 group-hover:bg-[#E5242A] text-white flex items-center justify-center shadow-2xl transition-all group-hover:scale-110">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                  </div>
                </div>

                {/* Card Content Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#E5242A]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>
                        {currentLang === 'pl'
                          ? 'OFICJALNE VIDEO PROMO · WSZYSTKIE PROJEKTY'
                          : 'OFFICIAL PROMO VIDEO · ALL PROJECTS'}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-3xl font-extrabold uppercase font-display text-white tracking-tight">
                      {featured.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A5A5A5] max-w-xl line-clamp-1">
                      {featured.synopsis[currentLang]}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-white/90 shrink-0">
                    <span className="px-3 py-1.5 rounded bg-black/60 backdrop-blur-sm border border-white/10">
                      YouTube 4K · {featured.duration}
                    </span>
                    <span className="px-3 py-1.5 rounded bg-[#E5242A] hover:bg-[#c91d22] text-white font-semibold transition-colors flex items-center gap-1.5">
                      <Play className="w-3 h-3 fill-current" />
                      {currentLang === 'pl' ? 'Odtwórz teledysk' : 'Play video'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Portfolio Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleOpenProject(project)}
              className="rounded-xl overflow-hidden border border-[#222222] bg-[#121212] hover:border-[#383838] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
                <div className="aspect-[16/9] w-full relative overflow-hidden bg-black">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (project.youtubeId && !target.src.includes('hqdefault')) {
                        target.src = `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`;
                      } else {
                        target.src = IMAGES.aiFinal;
                      }
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30" />

                  {/* Play Icon Badge */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#E5242A] transition-colors">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>

                  {/* Badge: Official YouTube Promo or Demo Concept */}
                  <div
                    className={`absolute top-3 left-3 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-mono border ${
                      project.youtubeId
                        ? 'bg-[#E5242A]/90 text-white border-[#E5242A] font-semibold'
                        : 'bg-[#080808]/80 text-[#A5A5A5] border-[#222222]'
                    }`}
                  >
                    {project.youtubeId
                      ? currentLang === 'pl'
                        ? 'OFICJALNE PROMO YOUTUBE'
                        : 'OFFICIAL YOUTUBE PROMO'
                      : currentLang === 'pl'
                      ? 'KONCEPT DEMO'
                      : 'DEMO CONCEPT'}
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="p-5 space-y-3">
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs text-[#8c8c8c] font-mono">
                    <span className="text-[#E5242A]">{project.artist}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.genreLabel[currentLang]}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.duration}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display uppercase tracking-tight group-hover:text-[#E5242A] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#A5A5A5] leading-relaxed line-clamp-2">
                    {project.synopsis[currentLang]}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3 border-t border-[#1c1c1c] flex items-center justify-between text-xs font-mono text-[#777777]">
                <span>{project.techniques[0]}</span>
                <span className="text-white group-hover:text-[#E5242A] transition-colors flex items-center gap-1">
                  Szczegóły
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Showreel & Project Inspector Modal */}
      <ShowreelModal
        project={activeProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        currentLang={currentLang}
      />
    </section>
  );
};
