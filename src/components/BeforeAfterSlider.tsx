import React, { useState, useRef, useCallback } from 'react';
import { SlidersHorizontal, Eye, Maximize2, Sparkles, Camera } from 'lucide-react';
import { Language } from '../types';
import { SITE_COPY, IMAGES } from '../data/content';

interface BeforeAfterSliderProps {
  currentLang: Language;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ currentLang }) => {
  const copy = SITE_COPY[currentLang];
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section id="comparison" className="py-24 bg-[#0a0a0a] border-t border-[#1c1c1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E5242A]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{copy.comparison.kicker}</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl lg:text-4xl font-extrabold uppercase font-display text-white tracking-tight leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {copy.comparison.headline}
          </h2>

          <p className="text-base sm:text-lg text-[#A5A5A5] leading-relaxed">
            {copy.comparison.lead}
          </p>
        </div>

        {/* Interactive Comparison Widget */}
        <div className="rounded-2xl border border-[#262626] bg-[#121212] overflow-hidden shadow-2xl">
          {/* Top Control Bar */}
          <div className="px-6 py-4 bg-[#141414] border-b border-[#222222] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs font-mono text-[#A5A5A5]">
              <span className="flex items-center gap-1.5 text-white">
                <Camera className="w-4 h-4 text-[#A5A5A5]" />
                {copy.comparison.labelBefore}
              </span>
              <span>/</span>
              <span className="flex items-center gap-1.5 text-[#E5242A]">
                <Sparkles className="w-4 h-4 text-[#E5242A]" />
                {copy.comparison.labelAfter}
              </span>
            </div>

            {/* Preset quick buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSliderPos(0)}
                className={`px-3 py-1.5 text-xs font-mono rounded transition-colors cursor-pointer ${
                  sliderPos <= 5 ? 'bg-[#222222] text-white' : 'text-[#888888] hover:text-white'
                }`}
              >
                100% {currentLang === 'pl' ? 'Kadr AI' : 'AI Shot'}
              </button>
              <button
                onClick={() => setSliderPos(50)}
                className={`px-3 py-1.5 text-xs font-mono rounded transition-colors cursor-pointer ${
                  sliderPos > 40 && sliderPos < 60 ? 'bg-[#222222] text-white' : 'text-[#888888] hover:text-white'
                }`}
              >
                50 / 50
              </button>
              <button
                onClick={() => setSliderPos(100)}
                className={`px-3 py-1.5 text-xs font-mono rounded transition-colors cursor-pointer ${
                  sliderPos >= 95 ? 'bg-[#222222] text-white' : 'text-[#888888] hover:text-white'
                }`}
              >
                100% {currentLang === 'pl' ? 'Green Screen' : 'Green Screen'}
              </button>
            </div>
          </div>

          {/* Draggable Stage */}
          <div
            ref={containerRef}
            className="relative w-full aspect-[16/9] select-none cursor-ew-resize overflow-hidden"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
          >
            {/* Background Layer: Final AI Composite (Revealed on the Right) */}
            <img
              src={IMAGES.aiFinal}
              alt="Finalny kadr teledysku AI z wokalistą w monumentalnej katedrze"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              referrerPolicy="no-referrer"
            />

            {/* Foreground Layer (Clipped to slider position): Raw Green Screen Soundstage */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={IMAGES.rawStudio}
                alt="Wokalista na planie filmowym Green Screen z kamerą ARRI Alexa"
                className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                }}
                referrerPolicy="no-referrer"
              />
              {/* Green Screen Label Overlay */}
              <div className="absolute top-4 left-4 bg-[#080808]/80 backdrop-blur-md px-3 py-1.5 rounded border border-[#2e2e2e] text-[11px] font-mono text-emerald-400">
                PLAN GREEN SCREEN (RAW 6K)
              </div>
            </div>

            {/* AI Composite Label Overlay (Right Side) */}
            <div className="absolute top-4 right-4 bg-[#080808]/80 backdrop-blur-md px-3 py-1.5 rounded border border-[#2e2e2e] text-[11px] font-mono text-[#E5242A]">
              FINALNY KADR AI (ACES COLOR)
            </div>

            {/* The Draggable Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#080808] border-2 border-white shadow-xl flex items-center justify-center text-white">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Bottom Guidance & Core Pillars */}
          <div className="p-6 bg-[#101010] border-t border-[#1f1f1f] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <span className="text-xs text-[#A5A5A5] font-mono flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#E5242A]" />
              {copy.comparison.dragPrompt}
            </span>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#888888]">
              <span>{copy.comparison.badge1}</span>
              <span aria-hidden="true">·</span>
              <span>{copy.comparison.badge2}</span>
              <span aria-hidden="true">·</span>
              <span>{copy.comparison.badge3}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
