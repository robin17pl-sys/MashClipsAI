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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/90 backdrop-blur-md border-b border-[#1c1c1c] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <a
          href="#"
          className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus:outline-none"
          aria-label="MASH Clips AI Strona Główna"
        >
          <div className="w-8 h-8 bg-[#E5242A] rounded flex items-center justify-center font-bold text-white text-xs tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-white font-display uppercase flex items-center gap-1.5">
              MASH Clips <span className="text-[#E5242A]">AI</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#A5A5A5] -mt-1 font-mono">
              Schron Muzyczny
            </span>
          </div>
        </a>

        {/* Zone 2: 4-5 single-line clean text links with subtle hover underlines */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#A5A5A5]">
          <button
            onClick={() => handleNavClick('about')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus:outline-none cursor-pointer"
          >
            {copy.nav.about}
          </button>
          <button
            onClick={() => handleNavClick('portfolio')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus:outline-none cursor-pointer"
          >
            {copy.nav.portfolio}
          </button>
          <button
            onClick={() => handleNavClick('genres')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus:outline-none cursor-pointer"
          >
            {copy.nav.genres}
          </button>
          <button
            onClick={() => handleNavClick('pipeline')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus:outline-none cursor-pointer"
          >
            {copy.nav.pipeline}
          </button>
          <button
            onClick={() => handleNavClick('comparison')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus:outline-none cursor-pointer"
          >
            {copy.nav.comparison}
          </button>
          <button
            onClick={() => handleNavClick('packages')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus:outline-none cursor-pointer"
          >
            {copy.nav.packages}
          </button>
        </nav>

        {/* Zone 3: 1 primary action + subtle secondary utilities (Sound & Lang) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Subtle Ambient Audio Toggle */}
          <button
            onClick={handleToggleAudio}
            title={isAudioPlaying ? copy.hero.soundToggleOn : copy.hero.soundToggleOff}
            className={`p-2 rounded-lg border text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
              isAudioPlaying
                ? 'bg-[#E5242A]/10 border-[#E5242A]/40 text-[#E5242A]'
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
            className="px-2.5 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-xs font-mono font-medium text-[#A5A5A5] hover:text-white transition-colors cursor-pointer"
            aria-label="Zmień język / Switch language"
          >
            {currentLang === 'pl' ? 'EN' : 'PL'}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenBrief}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#E5242A] hover:bg-[#c91d22] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-[#E5242A]/20 cursor-pointer"
          >
            {currentLang === 'pl' ? 'Stwórzmy Teledysk' : 'Commission Video'}
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#141414] border border-[#262626] text-[#A5A5A5] hover:text-white cursor-pointer"
            aria-label="Otwórz menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#262626] bg-[#0c0c0c] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium text-[#A5A5A5]">
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 hover:text-white transition-colors cursor-pointer"
            >
              {copy.nav.about}
            </button>
            <button
              onClick={() => handleNavClick('portfolio')}
              className="text-left py-2 hover:text-white transition-colors cursor-pointer"
            >
              {copy.nav.portfolio}
            </button>
            <button
              onClick={() => handleNavClick('genres')}
              className="text-left py-2 hover:text-white transition-colors cursor-pointer"
            >
              {copy.nav.genres}
            </button>
            <button
              onClick={() => handleNavClick('pipeline')}
              className="text-left py-2 hover:text-white transition-colors cursor-pointer"
            >
              {copy.nav.pipeline}
            </button>
            <button
              onClick={() => handleNavClick('comparison')}
              className="text-left py-2 hover:text-white transition-colors cursor-pointer"
            >
              {copy.nav.comparison}
            </button>
            <button
              onClick={() => handleNavClick('packages')}
              className="text-left py-2 hover:text-white transition-colors cursor-pointer"
            >
              {copy.nav.packages}
            </button>
            <button
              onClick={() => handleNavClick('audience')}
              className="text-left py-2 hover:text-white transition-colors cursor-pointer"
            >
              {copy.nav.audience}
            </button>
            <button
              onClick={() => handleNavClick('brief')}
              className="text-left py-2 text-[#E5242A] font-semibold transition-colors cursor-pointer"
            >
              {copy.nav.contact}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
