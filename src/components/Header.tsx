import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { Language } from '../types';
import { SITE_COPY } from '../data/content';
import { audioAtmosphere } from '../utils/audioAtmosphere';

interface HeaderProps {
  currentLang: Language;
  onToggleLang: () => void;
  onOpenBrief: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentLang, onToggleLang, onOpenBrief }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const copy = SITE_COPY[currentLang];

  const handleToggleAudio = () => {
    const playing = audioAtmosphere.toggle();
    setIsAudioPlaying(playing);
  };

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/95 backdrop-blur-md border-b border-[#1c1c1c] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 sm:gap-3 whitespace-nowrap shrink-0 group focus:outline-none"
          aria-label="MASH Clips AI Strona Główna"
        >
          <div className="w-8 h-8 bg-[#E5242A] rounded-lg flex items-center justify-center font-bold text-white text-xs tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-white font-display uppercase flex items-center gap-1.5">
              MASH Clips <span className="text-[#E5242A]">AI</span>
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#A5A5A5] -mt-1 font-mono">
              Schron Muzyczny
            </span>
          </div>
        </a>

        {/* Zone 2: Desktop clean text links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#A5A5A5]">
          <button
            onClick={() => handleNavClick('about')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus:outline-none cursor-pointer py-1"
          >
            {copy.nav.about}
          </button>
          <button
            onClick={() => handleNavClick('portfolio')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus:outline-none cursor-pointer py-1"
          >
            {copy.nav.portfolio}
          </button>
          <button
            onClick={() => handleNavClick('genres')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus:outline-none cursor-pointer py-1"
          >
            {copy.nav.genres}
          </button>
          <button
            onClick={() => handleNavClick('pipeline')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus:outline-none cursor-pointer py-1"
          >
            {copy.nav.pipeline}
          </button>
          <button
            onClick={() => handleNavClick('comparison')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus:outline-none cursor-pointer py-1"
          >
            {copy.nav.comparison}
          </button>
          <button
            onClick={() => handleNavClick('packages')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus:outline-none cursor-pointer py-1"
          >
            {copy.nav.packages}
          </button>
        </nav>

        {/* Zone 3: Actions & utilities */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Ambient Audio Toggle */}
          <button
            onClick={handleToggleAudio}
            title={isAudioPlaying ? copy.hero.soundToggleOn : copy.hero.soundToggleOff}
            className={`min-h-[38px] px-2.5 sm:px-3 rounded-lg border text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
              isAudioPlaying
                ? 'bg-[#E5242A]/15 border-[#E5242A]/50 text-[#E5242A]'
                : 'bg-[#141414] border-[#262626] text-[#A5A5A5] hover:text-white'
            }`}
            aria-label={isAudioPlaying ? 'Wyłącz dźwięk' : 'Włącz dźwięk studyjny'}
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden xl:inline text-[11px] font-mono uppercase">
              {isAudioPlaying ? 'Audio ON' : 'Audio OFF'}
            </span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="min-h-[38px] px-2.5 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-xs font-mono font-medium text-[#A5A5A5] hover:text-white transition-colors cursor-pointer"
            aria-label="Zmień język / Switch language"
          >
            {currentLang === 'pl' ? 'EN' : 'PL'}
          </button>

          {/* Primary CTA - Visible on sm and up, or icon/short on mobile */}
          <button
            onClick={onOpenBrief}
            className="hidden sm:inline-flex min-h-[38px] items-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#E5242A] hover:bg-[#c91d22] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-[#E5242A]/20 cursor-pointer"
          >
            {currentLang === 'pl' ? 'Stwórzmy Teledysk' : 'Commission Video'}
          </button>

          {/* Mobile menu hamburger toggle with 44px min touch target */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg bg-[#141414] border border-[#262626] text-[#A5A5A5] hover:text-white transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer with backdrop overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-20 bg-black/70 backdrop-blur-sm lg:hidden z-40 animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-50 lg:hidden border-b border-[#262626] bg-[#0d0d0d] px-6 py-6 space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto shadow-2xl">
            <div className="flex flex-col divide-y divide-[#1c1c1c] text-sm font-medium text-[#c5c5c5]">
              <button
                onClick={() => handleNavClick('about')}
                className="text-left py-3 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>{copy.nav.about}</span>
                <span className="text-xs font-mono text-[#555555]">01</span>
              </button>
              <button
                onClick={() => handleNavClick('portfolio')}
                className="text-left py-3 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>{copy.nav.portfolio}</span>
                <span className="text-xs font-mono text-[#555555]">02</span>
              </button>
              <button
                onClick={() => handleNavClick('genres')}
                className="text-left py-3 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>{copy.nav.genres}</span>
                <span className="text-xs font-mono text-[#555555]">03</span>
              </button>
              <button
                onClick={() => handleNavClick('pipeline')}
                className="text-left py-3 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>{copy.nav.pipeline}</span>
                <span className="text-xs font-mono text-[#555555]">04</span>
              </button>
              <button
                onClick={() => handleNavClick('comparison')}
                className="text-left py-3 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>{copy.nav.comparison}</span>
                <span className="text-xs font-mono text-[#555555]">05</span>
              </button>
              <button
                onClick={() => handleNavClick('packages')}
                className="text-left py-3 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>{copy.nav.packages}</span>
                <span className="text-xs font-mono text-[#555555]">06</span>
              </button>
              <button
                onClick={() => handleNavClick('audience')}
                className="text-left py-3 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>{copy.nav.audience}</span>
                <span className="text-xs font-mono text-[#555555]">07</span>
              </button>
            </div>

            {/* Mobile Drawer Primary Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBrief();
                }}
                className="w-full py-3.5 px-4 bg-[#E5242A] hover:bg-[#c91d22] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#E5242A]/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{currentLang === 'pl' ? 'Stwórzmy Twój Teledysk (Brief)' : 'Commission Video (Brief)'}</span>
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
