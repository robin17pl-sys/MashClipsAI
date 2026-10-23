import React, { useState, useRef, useCallback } from 'react';
import { SlidersHorizontal, Eye, Sparkles, Camera, ArrowLeftRight } from 'lucide-react';
import { Language } from '../types';
import { SITE_COPY, IMAGES } from '../data/content';

interface BeforeAfterSliderProps {
  currentLang: Language;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ currentLang }) => {
  const copy = SITE_COPY[currentLang];
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0) return;
    const offsetX = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(offsetX, rect.width));
    const percent = Math.round((clampedX / rect.width) * 100);
    setSliderPos(percent);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore if pointer capture not supported
    }
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      setIsDragging(true);
      updatePosition(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging && e.touches.length > 0) {
      updatePosition(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <section id="comparison" className="py-24 bg-[#0a0a0a] border-t border-[#1c1c1c] relative select-none">
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
          {/* Top Control Bar - Fully Responsive for Mobile & Tablet */}
          <div className="px-4 sm:px-6 py-3.5 bg-[#141414] border-b border-[#222222] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-4 text-xs font-mono text-[#A5A5A5]">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px] sm:text-xs">
                <Camera className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                {copy.comparison.labelBefore}
              </span>
              <span className="text-[#444444]">|</span>
              <span className="flex items-center gap-1.5 text-[#E5242A] font-semibold text-[11px] sm:text-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#E5242A] shrink-0" />
                {copy.comparison.labelAfter}
              </span>
            </div>

            {/* Preset quick buttons - 3 equal buttons on phones for easy thumb tapping */}
            <div className="grid grid-cols-3 sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSliderPos(0)}
                className={`min-h-[38px] px-2.5 sm:px-3 py-1.5 text-xs font-mono rounded-lg border transition-all cursor-pointer flex items-center justify-center text-center ${
                  sliderPos <= 5
                    ? 'bg-[#E5242A] text-white border-[#E5242A] font-bold'
                    : 'bg-[#181818] border-[#2a2a2a] text-[#888888] hover:text-white hover:border-[#383838]'
                }`}
              >
                100% {currentLang === 'pl' ? 'Kadr AI' : 'AI Shot'}
              </button>
              <button
                type="button"
                onClick={() => setSliderPos(50)}
                className={`min-h-[38px] px-2.5 sm:px-3 py-1.5 text-xs font-mono rounded-lg border transition-all cursor-pointer flex items-center justify-center text-center ${
                  sliderPos > 42 && sliderPos < 58
                    ? 'bg-[#262626] text-white border-[#444444] font-bold'
                    : 'bg-[#181818] border-[#2a2a2a] text-[#888888] hover:text-white hover:border-[#383838]'
                }`}
              >
                50 / 50
              </button>
              <button
                type="button"
                onClick={() => setSliderPos(100)}
                className={`min-h-[38px] px-2.5 sm:px-3 py-1.5 text-xs font-mono rounded-lg border transition-all cursor-pointer flex items-center justify-center text-center ${
                  sliderPos >= 95
                    ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                    : 'bg-[#181818] border-[#2a2a2a] text-[#888888] hover:text-white hover:border-[#383838]'
                }`}
              >
                100% {currentLang === 'pl' ? 'Green Screen' : 'Green Screen'}
              </button>
            </div>
          </div>

          {/* Draggable Comparison Stage with Touch & Pointer Support */}
          <div
            ref={containerRef}
            className="relative w-full aspect-[16/9] overflow-hidden cursor-ew-resize select-none bg-[#0a0a0a] touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            role="slider"
            aria-label="Porównanie Green Screen i kadr AI"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={sliderPos}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') setSliderPos((p) => Math.max(0, p - 5));
              if (e.key === 'ArrowRight') setSliderPos((p) => Math.min(100, p + 5));
            }}
          >
            {/* Background Layer: Final AI Composite (Right side) */}
            <img
              src={IMAGES.aiFinal}
              alt="Finalny kadr teledysku AI — monumentalna katedra i światło ACES"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('final_ai.jpg')) {
                  target.src = '/images/final_ai.jpg';
                }
              }}
            />

            {/* Foreground Layer (Clipped precisely via CSS clip-path): Raw Green Screen (Left side) */}
            <img
              src={IMAGES.rawStudio}
              alt="Artysta na planie Green Screen ze sprzętem kinowym"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
              style={{
                clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
                WebkitClipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
              }}
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('raw_greenscreen.jpg')) {
                  target.src = '/images/raw_greenscreen.jpg';
                }
              }}
            />

            {/* Green Screen Badge Overlay (Left Top) */}
            <div
              className={`absolute top-3 sm:top-4 left-3 sm:left-4 z-10 transition-opacity duration-200 pointer-events-none ${
                sliderPos < 12 ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="bg-[#080808]/90 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg border border-emerald-500/30 text-[10px] sm:text-[11px] font-mono text-emerald-400 font-bold shadow-lg flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>GREEN SCREEN <span className="hidden xs:inline">(RAW 6K)</span></span>
              </div>
            </div>

            {/* Final AI Badge Overlay (Right Top) */}
            <div
              className={`absolute top-3 sm:top-4 right-3 sm:right-4 z-10 transition-opacity duration-200 pointer-events-none ${
                sliderPos > 88 ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="bg-[#080808]/90 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg border border-[#E5242A]/40 text-[10px] sm:text-[11px] font-mono text-white font-bold shadow-lg flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E5242A]" />
                <span className="text-[#E5242A]">KADR AI</span>
                <span className="text-[#777777] hidden sm:inline">(ACES VFX)</span>
              </div>
            </div>

            {/* The Draggable Divider Bar & Central Grip Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)] z-20 pointer-events-none -translate-x-1/2"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Center Handle Button with Touch Feedback */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#080808] border-2 border-white shadow-[0_0_20px_rgba(0,0,0,0.9)] flex items-center justify-center text-white cursor-ew-resize transition-transform ${
                  isDragging ? 'scale-110 border-[#E5242A]' : ''
                }`}
              >
                <ArrowLeftRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Bottom Guidance & Core Pillars */}
          <div className="p-4 sm:p-6 bg-[#101010] border-t border-[#1f1f1f] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
            <span className="text-xs text-[#A5A5A5] font-mono flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#E5242A] shrink-0" />
              {copy.comparison.dragPrompt}
            </span>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono text-[#888888]">
              <span className="text-white font-medium">{copy.comparison.badge1}</span>
              <span aria-hidden="true">·</span>
              <span className="text-white font-medium">{copy.comparison.badge2}</span>
              <span aria-hidden="true">·</span>
              <span className="text-white font-medium">{copy.comparison.badge3}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
