import React from 'react';
import { Handshake, CheckCircle2, ShieldCheck, Video, Sliders } from 'lucide-react';
import { Language } from '../types';
import { SITE_COPY, IMAGES } from '../data/content';

interface PartnershipSectionProps {
  currentLang: Language;
}

export const PartnershipSection: React.FC<PartnershipSectionProps> = ({ currentLang }) => {
  const copy = SITE_COPY[currentLang];

  return (
    <section className="py-24 bg-[#080808] border-t border-[#1c1c1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E5242A]">
            <Handshake className="w-3.5 h-3.5" />
            <span>{copy.partnership.kicker}</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl lg:text-4xl font-extrabold uppercase font-display text-white tracking-tight leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {copy.partnership.headline}
          </h2>

          <p className="text-base sm:text-lg text-[#A5A5A5] leading-relaxed">
            {copy.partnership.lead}
          </p>
        </div>

        {/* 2-Column Studio Architecture Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Dream Studio Real Soundstage Image */}
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-[#262626] relative bg-[#121212] min-h-[360px]">
            <img
              src={IMAGES.productionStage}
              alt="MASH Schron Muzyczny i Dream Studio Productions plan produkcyjny"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#E5242A]">
                Zaplecze produkcyjne & Soundstage
              </span>
              <h3 className="text-xl font-bold font-display text-white">
                DREAM STUDIO PRODUCTIONS
              </h3>
              <p className="text-xs text-[#A5A5A5]">
                Plan zdjęciowy Green Screen, reżyseria oświetlenia i aparatura 4K/6K
              </p>
            </div>
          </div>

          {/* Right Column: Mutual Synergy Cards */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* MASH Card */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-[#262626] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#E5242A]">
                  Kierunek Artystyczny & AI
                </span>
                <span className="text-xs font-mono text-[#777777]">Schron Muzyczny</span>
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                {copy.partnership.mashRoleTitle}
              </h3>
              <p className="text-sm text-[#A5A5A5] leading-relaxed">
                {copy.partnership.mashRoleDesc}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-[#888888]">
                <span>· AI Generative Worldbuilding</span>
                <span>· Prompt Crafting</span>
                <span>· Visual Treatment</span>
              </div>
            </div>

            {/* Dream Studio Card */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-[#262626] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#E5242A]">
                  Realizacja Filmowa & Technika
                </span>
                <span className="text-xs font-mono text-[#777777]">Studio Partner</span>
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                {copy.partnership.dreamRoleTitle}
              </h3>
              <p className="text-sm text-[#A5A5A5] leading-relaxed">
                {copy.partnership.dreamRoleDesc}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-[#888888]">
                <span>· Green Screen Cyclorama</span>
                <span>· Cinema Optic Packages</span>
                <span>· Color Grading Studio</span>
              </div>
            </div>

            {/* Respectful Mutual Guarantee */}
            <div className="p-4 rounded-xl bg-[#171717] border border-[#292929] flex items-center gap-3 text-xs text-[#A5A5A5]">
              <ShieldCheck className="w-5 h-5 text-[#E5242A] shrink-0" />
              <span>
                Obie marki współpracują partnersko z poszanowaniem odrębnej identyfikacji wizualnej i najwyższych standardów branży muzycznej.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
