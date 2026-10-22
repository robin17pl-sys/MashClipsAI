/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, MusicGenre } from './types';
import { PORTFOLIO_PROJECTS } from './data/content';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { GenresSection } from './components/GenresSection';
import { PortfolioSection } from './components/PortfolioSection';
import { PipelineSection } from './components/PipelineSection';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { PartnershipSection } from './components/PartnershipSection';
import { OfferSection } from './components/OfferSection';
import { AudienceSection } from './components/AudienceSection';
import { ContactBriefSection } from './components/ContactBriefSection';
import { Footer } from './components/Footer';
import { ShowreelModal } from './components/ShowreelModal';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('pl');
  const [selectedGenreFilter, setSelectedGenreFilter] = useState<MusicGenre>('all');
  const [preselectedPackage, setPreselectedPackage] = useState<string>('MASH AI MUSIC VIDEO');
  const [heroShowreelOpen, setHeroShowreelOpen] = useState<boolean>(false);

  const handleToggleLang = () => {
    setCurrentLang((prev) => (prev === 'pl' ? 'en' : 'pl'));
  };

  const handleOpenBrief = () => {
    const el = document.getElementById('brief');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (packageName: string) => {
    setPreselectedPackage(packageName);
    const el = document.getElementById('brief');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectGenre = (genre: MusicGenre) => {
    setSelectedGenreFilter(genre);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F5] font-sans antialiased selection:bg-[#E5242A] selection:text-white">
      {/* Fixed Header */}
      <Header
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
        onOpenBrief={handleOpenBrief}
      />

      <main>
        {/* Section 1: Hero / First Impression */}
        <HeroSection
          currentLang={currentLang}
          onOpenBrief={handleOpenBrief}
          onOpenShowreel={() => setHeroShowreelOpen(true)}
        />

        {/* Section 2: Poznaj MASH Clips AI */}
        <AboutSection currentLang={currentLang} />

        {/* Section 3: Gatunki Muzyczne */}
        <GenresSection
          currentLang={currentLang}
          onSelectGenre={handleSelectGenre}
        />

        {/* Section 4: Portfolio / Showreel */}
        <PortfolioSection
          currentLang={currentLang}
          selectedGenreFilter={selectedGenreFilter}
          onSetGenreFilter={setSelectedGenreFilter}
        />

        {/* Section 5: Jak Powstaje Teledysk AI (5-Stage Pipeline) */}
        <PipelineSection currentLang={currentLang} />

        {/* Section 6: Real Artists × AI Worlds (Interactive Before/After Slider) */}
        <BeforeAfterSlider currentLang={currentLang} />

        {/* Section 7: Współpraca z Dream Studio Productions */}
        <PartnershipSection currentLang={currentLang} />

        {/* Section 8: Oferta (Pakiety) */}
        <OfferSection
          currentLang={currentLang}
          onSelectPackage={handleSelectPackage}
        />

        {/* Section 9: Dla Kogo Pracujemy */}
        <AudienceSection currentLang={currentLang} />

        {/* Section 10: Kontakt i Brief Projektowy */}
        <ContactBriefSection
          currentLang={currentLang}
          preselectedPackage={preselectedPackage}
        />
      </main>

      {/* Section 11: Footer */}
      <Footer currentLang={currentLang} />

      {/* Hero Quick Showreel Trigger Modal */}
      <ShowreelModal
        project={PORTFOLIO_PROJECTS[0]}
        isOpen={heroShowreelOpen}
        onClose={() => setHeroShowreelOpen(false)}
        currentLang={currentLang}
      />
    </div>
  );
}
