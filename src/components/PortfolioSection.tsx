import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Sparkles,
  Film,
  Info,
  Maximize2,
  Minimize2,
  X,
  Tv,
  ArrowUpRight,
} from 'lucide-react';
import { ProjectConcept, Language, MusicGenre } from '../types';
import { SITE_COPY, PORTFOLIO_PROJECTS, IMAGES } from '../data/content';

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

  // Active project for the large cinema player at the top of the portfolio section
  const [activeHeroProject, setActiveHeroProject] = useState<ProjectConcept>(PORTFOLIO_PROJECTS[0]);
  const [isHeroPlaying, setIsHeroPlaying] = useState<boolean>(false);

  // ID of the card playing inline below (if any)
  const [playingCardId, setPlayingCardId] = useState<string | null>(null);

  // Fullscreen state tracking
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const heroPlayerRef = useRef<HTMLDivElement>(null);
  const cardPlayerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('webkitfullscreenchange', onFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      document.removeEventListener('webkitfullscreenchange', onFsChange);
    };
  }, []);

  const toggleFullscreen = async (element: HTMLElement | null) => {
    if (!element) return;
    try {
      if (!document.fullscreenElement) {
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        } else if ((element as any).webkitRequestFullscreen) {
          await (element as any).webkitRequestFullscreen();
        } else if ((element as any).mozRequestFullScreen) {
          await (element as any).mozRequestFullScreen();
        } else if ((element as any).msRequestFullscreen) {
          await (element as any).msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen request failed:', err);
    }
  };

  const handlePlayHero = (project?: ProjectConcept, requestFs = false) => {
    if (project) {
      setActiveHeroProject(project);
    }
    // Stop any card playing inline to prevent double audio
    setPlayingCardId(null);
    setIsHeroPlaying(true);

    const cinemaElement = document.getElementById('portfolio-cinema');
    if (cinemaElement) {
      cinemaElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (requestFs) {
      setTimeout(() => {
        toggleFullscreen(heroPlayerRef.current);
      }, 300);
    }
  };

  const handlePlayCardInline = (project: ProjectConcept, requestFs = false) => {
    // If the top hero is playing, pause/stop it
    setIsHeroPlaying(false);
    setPlayingCardId(project.id);

    if (requestFs) {
      setTimeout(() => {
        const cardEl = cardPlayerRefs.current[project.id];
        if (cardEl) {
          toggleFullscreen(cardEl);
        }
      }, 300);
    }
  };

  // The main official MASH Clip is featured prominently in the large cinema player above.
  // The grid below displays exactly 3 project cards as requested.
  const secondaryProjects = PORTFOLIO_PROJECTS.slice(1);
  const displayedProjects = secondaryProjects.slice(0, 3);

  return (
    <section id="portfolio" className="py-24 bg-[#0a0a0a] border-t border-[#1c1c1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
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

        {/* Nasze Projekty Header Label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#141414] border border-[#262626]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E5242A] shadow-[0_0_8px_#E5242A]" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider font-display text-white">
              {currentLang === 'pl' ? 'Nasze Projekty' : 'Our Projects'}
            </span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-[#222222] to-transparent" />
        </div>

        {/* Featured Cinema Showcase Reel on Homepage */}
        <div
          id="portfolio-cinema"
          ref={heroPlayerRef}
          className="relative rounded-2xl overflow-hidden border border-[#262626] bg-[#121212] mb-12 shadow-2xl"
        >
          {isHeroPlaying && activeHeroProject.youtubeId ? (
            <div className="flex flex-col bg-black">
              {/* Cinema Player Top Control Header */}
              <div className="px-4 sm:px-6 py-3 bg-[#111111] border-b border-[#222222] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E5242A] animate-pulse shrink-0" />
                  <div className="min-w-0">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#E5242A] font-bold block truncate">
                      {currentLang === 'pl'
                        ? 'ODTWARZANIE NA STRONIE GŁÓWNEJ'
                        : 'PLAYING ON HOMEPAGE'}
                    </span>
                    <span className="text-sm font-bold text-white font-display uppercase tracking-tight block truncate">
                      {activeHeroProject.title}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Fullscreen Button */}
                  <button
                    onClick={() => toggleFullscreen(heroPlayerRef.current)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#E5242A] hover:bg-[#c91d22] text-white text-xs font-mono font-bold transition-all shadow-md cursor-pointer hover:scale-105"
                    title={
                      isFullscreen
                        ? currentLang === 'pl'
                          ? 'Opuść pełny ekran'
                          : 'Exit full screen'
                        : currentLang === 'pl'
                        ? 'Otwórz pełny ekran'
                        : 'Open full screen'
                    }
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-4 h-4" />
                    ) : (
                      <Maximize2 className="w-4 h-4" />
                    )}
                    <span>
                      {isFullscreen
                        ? currentLang === 'pl'
                          ? 'ZAMKNIJ FULLSCREEN'
                          : 'EXIT FULLSCREEN'
                        : currentLang === 'pl'
                        ? 'PEŁNY EKRAN'
                        : 'FULL SCREEN'}
                    </span>
                  </button>

                  {/* Close / Return to Poster Button */}
                  <button
                    onClick={() => setIsHeroPlaying(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222222] hover:bg-[#333333] text-[#A5A5A5] hover:text-white text-xs font-mono transition-colors cursor-pointer"
                    title={currentLang === 'pl' ? 'Wróć do plakatu' : 'Return to poster'}
                  >
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {currentLang === 'pl' ? 'Zwiń wideo' : 'Close video'}
                    </span>
                  </button>
                </div>
              </div>

              {/* YouTube Responsive iFrame Container */}
              <div className="aspect-[16/9] sm:aspect-[2.1/1] w-full bg-black relative">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeHeroProject.youtubeId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                  title={activeHeroProject.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  allowFullScreen
                />
              </div>

              {/* In-place project details below the video */}
              <div className="p-5 sm:p-6 bg-[#0e0e0e] border-t border-[#1f1f1f] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#8c8c8c]">
                    <span className="text-[#E5242A]">{activeHeroProject.artist}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeHeroProject.genreLabel[currentLang]}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeHeroProject.duration}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#A5A5A5] max-w-2xl">
                    {activeHeroProject.synopsis[currentLang]}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => toggleFullscreen(heroPlayerRef.current)}
                    className="px-3.5 py-1.5 rounded bg-[#1c1c1c] hover:bg-[#282828] text-white text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#E5242A]" />
                    <span>{currentLang === 'pl' ? 'Kliknij Full Screen' : 'Click Full Screen'}</span>
                  </button>
                  <button
                    onClick={() => setIsHeroPlaying(false)}
                    className="px-3 py-1.5 rounded bg-[#141414] hover:bg-[#222222] text-[#888888] hover:text-white text-xs font-mono transition-colors cursor-pointer"
                  >
                    {currentLang === 'pl' ? 'Wróć do plakatu' : 'Back to poster'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Poster View with Direct In-Page Play Trigger */
            <div className="relative">
              <div className="aspect-[16/9] sm:aspect-[2/1] md:aspect-[2.4/1] w-full relative overflow-hidden">
                <img
                  src={activeHeroProject.thumbnail}
                  alt={activeHeroProject.title}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (activeHeroProject.youtubeId && !target.src.includes('hqdefault')) {
                      target.src = `https://img.youtube.com/vi/${activeHeroProject.youtubeId}/hqdefault.jpg`;
                    } else {
                      target.src = IMAGES.hero;
                    }
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Big Play Button in Center */}
                <div
                  onClick={() => handlePlayHero(activeHeroProject, false)}
                  className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group p-4"
                >
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#E5242A]/90 group-hover:bg-[#E5242A] text-white flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 mb-2 sm:mb-3">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-0.5 sm:ml-1" />
                  </div>
                  <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-white text-[10px] sm:text-xs md:text-sm font-mono font-semibold tracking-wider uppercase group-hover:border-[#E5242A] transition-colors text-center max-w-[95%]">
                    {currentLang === 'pl'
                      ? '▶ ODTWÓRZ FILM NA STRONIE GŁÓWNEJ'
                      : '▶ PLAY VIDEO ON HOMEPAGE'}
                  </span>
                </div>

                {/* Poster Content Overlay */}
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pointer-events-none">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-[#E5242A]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>
                        {activeHeroProject.id === 'project-promo-official'
                          ? currentLang === 'pl'
                            ? 'OFICJALNE VIDEO PROMO · NASZE PROJEKTY'
                            : 'OFFICIAL PROMO VIDEO · OUR PROJECTS'
                          : activeHeroProject.genreLabel[currentLang]}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold uppercase font-display text-white tracking-tight">
                      {activeHeroProject.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono text-white/90 shrink-0 pointer-events-auto">
                    <button
                      onClick={() => handlePlayHero(activeHeroProject, true)}
                      className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-black/70 hover:bg-black text-white border border-white/20 hover:border-[#E5242A] font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg text-[11px] sm:text-xs"
                      title={currentLang === 'pl' ? 'Odtwórz od razu w pełnym ekranie' : 'Play immediately in full screen'}
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#E5242A]" />
                      <span>{currentLang === 'pl' ? 'Pełny ekran' : 'Full screen'}</span>
                    </button>

                    <button
                      onClick={() => handlePlayHero(activeHeroProject, false)}
                      className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#E5242A] hover:bg-[#c91d22] text-white font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg text-[11px] sm:text-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{currentLang === 'pl' ? 'Odtwórz wideo' : 'Play video'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Portfolio Projects Grid - Responsive for mobile, tablet and desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {displayedProjects.map((project) => {
            const isCardPlaying = playingCardId === project.id;

            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardPlayerRefs.current[project.id] = el;
                }}
                className={`rounded-xl overflow-hidden border transition-all flex flex-col justify-between bg-[#121212] ${
                  isCardPlaying
                    ? 'border-[#E5242A] shadow-xl'
                    : 'border-[#222222] hover:border-[#383838]'
                }`}
              >
                <div>
                  {/* Thumbnail OR Inline In-Page Video Player */}
                  <div className="aspect-[16/9] w-full relative overflow-hidden bg-black">
                    {isCardPlaying && project.youtubeId ? (
                      /* Inline Video Player directly on the card */
                      <div className="w-full h-full relative bg-black">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                          title={project.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                          allowFullScreen
                        />

                        {/* Quick Player Bar */}
                        <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFullscreen(cardPlayerRefs.current[project.id]);
                            }}
                            className="px-2.5 py-1 rounded bg-[#E5242A] hover:bg-[#c91d22] text-white text-[11px] font-mono flex items-center gap-1 shadow-md transition-colors cursor-pointer"
                            title={currentLang === 'pl' ? 'Pełny ekran' : 'Full screen'}
                          >
                            <Maximize2 className="w-3 h-3" />
                            <span>{currentLang === 'pl' ? 'Pełny ekran' : 'Full screen'}</span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPlayingCardId(null);
                            }}
                            className="p-1 rounded bg-black/80 hover:bg-black text-[#A5A5A5] hover:text-white transition-colors cursor-pointer border border-white/10"
                            title={currentLang === 'pl' ? 'Zwiń' : 'Close'}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Thumbnail Poster */
                      <div
                        onClick={() => {
                          if (project.youtubeId) {
                            handlePlayCardInline(project, false);
                          } else {
                            handlePlayHero(project, false);
                          }
                        }}
                        className="w-full h-full relative cursor-pointer group"
                      >
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

                        {/* Center Play Icon Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-[#E5242A]/90 group-hover:bg-[#E5242A] text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                        </div>

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-mono border bg-[#E5242A]/90 text-white border-[#E5242A] font-semibold">
                          {project.youtubeId
                            ? currentLang === 'pl'
                              ? 'OFICJALNE PROMO YOUTUBE'
                              : 'OFFICIAL YOUTUBE PROMO'
                            : currentLang === 'pl'
                            ? 'KONCEPT DEMO'
                            : 'DEMO CONCEPT'}
                        </div>

                        {/* Top Right Quick Fullscreen Click */}
                        {project.youtubeId && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayCardInline(project, true);
                            }}
                            className="absolute top-3 right-3 px-2 py-1 rounded bg-black/75 hover:bg-[#E5242A] text-white text-[10px] font-mono border border-white/10 transition-colors flex items-center gap-1"
                            title={currentLang === 'pl' ? 'Otwórz od razu pełny ekran' : 'Open directly full screen'}
                          >
                            <Maximize2 className="w-3 h-3" />
                            <span className="hidden sm:inline">
                              {currentLang === 'pl' ? 'Pełny ekran' : 'Full screen'}
                            </span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Text Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-[#8c8c8c] font-mono">
                      <span className="text-[#E5242A] font-medium">{project.artist}</span>
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

                {/* Card Action Buttons Footer */}
                <div className="px-5 py-3 border-t border-[#1c1c1c] flex items-center justify-between text-xs font-mono">
                  {/* Left: In-place play / Fullscreen button */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlayCardInline(project, false)}
                      className={`px-2.5 py-1 rounded font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                        isCardPlaying
                          ? 'bg-[#E5242A] text-white'
                          : 'bg-[#1b1b1b] hover:bg-[#262626] text-white'
                      }`}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>
                        {isCardPlaying
                          ? currentLang === 'pl'
                            ? 'Odtwarzanie'
                            : 'Playing'
                          : currentLang === 'pl'
                          ? 'Odtwórz tutaj'
                          : 'Play here'}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        if (!isCardPlaying) {
                          handlePlayCardInline(project, true);
                        } else {
                          toggleFullscreen(cardPlayerRefs.current[project.id]);
                        }
                      }}
                      className="px-2 py-1 rounded bg-[#161616] hover:bg-[#222222] text-[#A5A5A5] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                      title={currentLang === 'pl' ? 'Włącz pełny ekran' : 'Toggle full screen'}
                    >
                      <Maximize2 className="w-3 h-3 text-[#E5242A]" />
                      <span className="hidden sm:inline">
                        {currentLang === 'pl' ? 'Full screen' : 'Full screen'}
                      </span>
                    </button>
                  </div>

                  {/* Right: Load into main cinema showcase on the homepage */}
                  <button
                    onClick={() => handlePlayHero(project, false)}
                    className="text-[#888888] hover:text-white transition-colors flex items-center gap-1 cursor-pointer py-1"
                    title={
                      currentLang === 'pl'
                        ? 'Odtwórz w dużym odtwarzaczu głównym na stronie'
                        : 'Play in the large cinema player on homepage'
                    }
                  >
                    <Tv className="w-3 h-3 text-[#E5242A]" />
                    <span>{currentLang === 'pl' ? 'Duży ekran' : 'Big screen'}</span>
                    <ArrowUpRight className="w-3 h-3" />
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
