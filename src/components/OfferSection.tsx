import React, { useState, useMemo } from 'react';
import { Calculator, Users, Clock, Check, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { SITE_COPY } from '../data/content';

interface OfferSectionProps {
  currentLang: Language;
  onSelectCalculation: (calc: {
    people: number;
    seconds: number;
    totalPrice: number;
    summary: string;
  }) => void;
}

export const OfferSection: React.FC<OfferSectionProps> = ({ currentLang, onSelectCalculation }) => {
  const copy = SITE_COPY[currentLang];

  // Sliders state: 1 person default, 180 seconds (3:00 min) standard song
  const [people, setPeople] = useState<number>(1);
  const [seconds, setSeconds] = useState<number>(180);

  // Pricing constants specified by user: 440 zł per person, 15 zł per second
  const PRICE_PER_PERSON = 440;
  const PRICE_PER_SECOND = 15;

  const peopleCost = people * PRICE_PER_PERSON;
  const secondsCost = seconds * PRICE_PER_SECOND;
  const totalCost = peopleCost + secondsCost;

  const formatDuration = (totalSecs: number): string => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs.toString().padStart(2, '0')} min`;
  };

  const handleApplyToBrief = () => {
    const summary = currentLang === 'pl'
      ? `Kalkulator MASH: ${people} ${people === 1 ? 'osoba' : 'osoby'} na scenie (${peopleCost} zł) + ${seconds}s (${formatDuration(seconds)}) (${secondsCost} zł) = ${totalCost.toLocaleString('pl-PL')} zł netto`
      : `MASH Calculator: ${people} performer(s) on stage (${peopleCost} PLN) + ${seconds}s (${formatDuration(seconds)}) (${secondsCost} PLN) = ${totalCost.toLocaleString('en-US')} PLN net`;

    onSelectCalculation({
      people,
      seconds,
      totalPrice: totalCost,
      summary,
    });
  };

  const peoplePresets = [
    { label: currentLang === 'pl' ? '1 os. (Solista)' : '1 person (Solo)', count: 1 },
    { label: currentLang === 'pl' ? '2 os. (Duet)' : '2 persons (Duo)', count: 2 },
    { label: currentLang === 'pl' ? '3 os. (Trio)' : '3 persons (Trio)', count: 3 },
    { label: currentLang === 'pl' ? '4 os. (Zespół 4-os.)' : '4-piece Band', count: 4 },
    { label: currentLang === 'pl' ? '5 os. (Skład 5-os.)' : '5-piece Band', count: 5 },
  ];

  const timePresets = [
    { label: '15s (Canvas)', secs: 15 },
    { label: '30s (Reels/TikTok)', secs: 30 },
    { label: '60s (Promo)', secs: 60 },
    { label: currentLang === 'pl' ? '180s (3:00 Standard)' : '180s (3:00 Song)', secs: 180 },
    { label: '210s (3:30)', secs: 210 },
    { label: '240s (4:00)', secs: 240 },
  ];

  return (
    <section id="packages" className="py-24 bg-[#0a0a0a] border-t border-[#1c1c1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E5242A]">
            <Calculator className="w-3.5 h-3.5" />
            <span>{copy.packages.kicker}</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl lg:text-4xl font-extrabold uppercase font-display text-white tracking-tight leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {copy.packages.headline}
          </h2>

          <p className="text-base sm:text-lg text-[#A5A5A5] leading-relaxed">
            {copy.packages.sub}
          </p>
        </div>

        {/* 2-Column Interactive Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: The 2 Sliders */}
          <div className="lg:col-span-7 space-y-8">
            {/* Slider 1: Liczba osób na scenie (440 zł / osoba) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#121212] border border-[#262626] space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#E5242A]/10 border border-[#E5242A]/30 flex items-center justify-center text-[#E5242A]">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-display uppercase tracking-tight text-white">
                      {copy.packages.peopleLabel}
                    </h3>
                    <p className="text-xs text-[#888888] font-mono">
                      {copy.packages.peopleDesc}
                    </p>
                  </div>
                </div>

                <div className="text-right sm:self-auto self-start">
                  <span className="text-xs font-mono text-[#E5242A] uppercase block">
                    {copy.packages.peopleUnit}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold font-display text-white">
                    {people} {currentLang === 'pl' ? (people === 1 ? 'osoba' : people < 5 ? 'osoby' : 'osób') : (people === 1 ? 'person' : 'people')}
                  </span>
                </div>
              </div>

              {/* Slider Input */}
              <div className="space-y-2 pt-2">
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={people}
                  onChange={(e) => setPeople(Number(e.target.value))}
                  className="w-full h-2 bg-[#222222] rounded-lg appearance-none cursor-pointer accent-[#E5242A]"
                  aria-label={copy.packages.peopleLabel}
                />
                <div className="flex justify-between text-[11px] font-mono text-[#666666]">
                  <span>1 osoba</span>
                  <span>4 osoby (zespół)</span>
                  <span>8 osób (skład rozszerzony)</span>
                </div>
              </div>

              {/* Quick Presets for People */}
              <div className="flex flex-wrap gap-2 pt-1">
                {peoplePresets.map((preset) => (
                  <button
                    key={preset.count}
                    onClick={() => setPeople(preset.count)}
                    className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center justify-center ${
                      people === preset.count
                        ? 'bg-[#E5242A] text-white font-semibold'
                        : 'bg-[#181818] text-[#A5A5A5] hover:text-white hover:bg-[#222222] border border-[#2a2a2a]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* People Subtotal Footnote */}
              <div className="pt-4 border-t border-[#1c1c1c] flex items-center justify-between text-xs font-mono">
                <span className="text-[#888888]">{copy.packages.peopleSubtotal}</span>
                <span className="text-white font-bold">
                  {people} × {PRICE_PER_PERSON} zł = <strong className="text-[#E5242A]">{peopleCost.toLocaleString('pl-PL')} zł</strong>
                </span>
              </div>
            </div>

            {/* Slider 2: Czas trwania teledysku (15 zł / sekunda) */}
            <div className="p-5 sm:p-8 rounded-2xl bg-[#121212] border border-[#262626] space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#E5242A]/10 border border-[#E5242A]/30 flex items-center justify-center text-[#E5242A]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-display uppercase tracking-tight text-white">
                      {copy.packages.secondsLabel}
                    </h3>
                    <p className="text-xs text-[#888888] font-mono">
                      {copy.packages.secondsDesc}
                    </p>
                  </div>
                </div>

                <div className="text-right sm:self-auto self-start">
                  <span className="text-xs font-mono text-[#E5242A] uppercase block">
                    {copy.packages.secondsUnit}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold font-display text-white">
                    {seconds} sek. <span className="text-sm text-[#A5A5A5] font-normal font-mono">({formatDuration(seconds)})</span>
                  </span>
                </div>
              </div>

              {/* Slider Input */}
              <div className="space-y-2 pt-2">
                <input
                  type="range"
                  min="15"
                  max="300"
                  step="5"
                  value={seconds}
                  onChange={(e) => setSeconds(Number(e.target.value))}
                  className="w-full h-3 bg-[#222222] rounded-lg appearance-none cursor-pointer accent-[#E5242A]"
                  aria-label={copy.packages.secondsLabel}
                />
                <div className="flex justify-between text-[11px] font-mono text-[#666666]">
                  <span>15s (Teaser)</span>
                  <span>180s (3:00)</span>
                  <span>300s (5:00)</span>
                </div>
              </div>

              {/* Quick Presets for Duration */}
              <div className="flex flex-wrap gap-2 pt-1">
                {timePresets.map((preset) => (
                  <button
                    key={preset.secs}
                    onClick={() => setSeconds(preset.secs)}
                    className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center justify-center ${
                      seconds === preset.secs
                        ? 'bg-[#E5242A] text-white font-semibold'
                        : 'bg-[#181818] text-[#A5A5A5] hover:text-white hover:bg-[#222222] border border-[#2a2a2a]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Seconds Subtotal Footnote */}
              <div className="pt-4 border-t border-[#1c1c1c] flex items-center justify-between text-xs font-mono">
                <span className="text-[#888888]">{copy.packages.secondsSubtotal}</span>
                <span className="text-white font-bold">
                  {seconds}s × {PRICE_PER_SECOND} zł = <strong className="text-[#E5242A]">{secondsCost.toLocaleString('pl-PL')} zł</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Price Summary & Breakdown Card */}
          <div className="lg:col-span-5 rounded-2xl bg-[#141414] border-2 border-[#E5242A] p-5 sm:p-8 space-y-6 shadow-2xl shadow-[#E5242A]/10 lg:sticky lg:top-28">
            <div className="flex items-center justify-between border-b border-[#262626] pb-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#E5242A]">
                <Sparkles className="w-4 h-4" />
                <span>{copy.packages.summaryTitle}</span>
              </div>
              <span className="text-[11px] font-mono text-[#A5A5A5]">
                {formatDuration(seconds)} · {people} os.
              </span>
            </div>

            {/* Itemized Calculation */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-[#cccccc] pb-2 border-b border-[#222222]">
                <span>
                  {currentLang === 'pl'
                    ? `Wykonawcy (${people} os. × ${PRICE_PER_PERSON} zł):`
                    : `Performers (${people} × ${PRICE_PER_PERSON} PLN):`}
                </span>
                <span className="font-bold text-white">{peopleCost.toLocaleString('pl-PL')} zł</span>
              </div>

              <div className="flex items-center justify-between text-[#cccccc] pb-2 border-b border-[#222222]">
                <span>
                  {currentLang === 'pl'
                    ? `Długość wideo (${seconds}s × ${PRICE_PER_SECOND} zł):`
                    : `Video duration (${seconds}s × ${PRICE_PER_SECOND} PLN):`}
                </span>
                <span className="font-bold text-white">{secondsCost.toLocaleString('pl-PL')} zł</span>
              </div>

              {/* Grand Total */}
              <div className="pt-2">
                <span className="text-[11px] uppercase tracking-wider text-[#A5A5A5] block mb-1">
                  {copy.packages.totalEstimate}
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight flex items-baseline gap-2">
                  <span className="text-[#E5242A]">{totalCost.toLocaleString('pl-PL')}</span>
                  <span className="text-lg text-white font-normal font-mono">zł netto</span>
                </div>
                <span className="text-[10px] text-[#777777] font-mono block mt-1">
                  * Zawiera pełny plan Green Screen, oświetlenie i wygenerowane światy AI
                </span>
              </div>
            </div>

            {/* Scope Checklist Included in this Calculation */}
            <div className="pt-4 border-t border-[#222222] space-y-2.5">
              <span className="text-[11px] uppercase font-mono text-[#A5A5A5] block font-semibold">
                {copy.packages.includedTitle}
              </span>
              {copy.packages.includedItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#cccccc]">
                  <Check className="w-3.5 h-3.5 text-[#E5242A] shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                onClick={handleApplyToBrief}
                className="w-full py-3.5 px-4 rounded-xl bg-[#E5242A] hover:bg-[#c91d22] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#E5242A]/25 cursor-pointer group"
              >
                <span>{copy.packages.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[#777777] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A5A5A5]" />
              <span>Gwarancja stałej stawki MASH Schron & Dream Studio</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
