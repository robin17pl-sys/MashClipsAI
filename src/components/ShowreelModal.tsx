import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Sliders, Film, ExternalLink } from 'lucide-react';
import { ProjectConcept, Language } from '../types';
import { SITE_COPY } from '../data/content';
import { audioAtmosphere } from '../utils/audioAtmosphere';

interface ShowreelModalProps {
  project: ProjectConcept | null;
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({
  project,
  isOpen,
  onClose,
  currentLang,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(25);
  const copy = SITE_COPY[currentLang];

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 100);
    return () => clearInterval(timer);
  }, [isPlaying]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-5xl rounded-2xl bg-[#0f0f0f] border border-[#2a2a2a] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#141414] border-b border-[#222222] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E5242A]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#A5A5A5]">
              MASH Player · {project.genreLabel[currentLang]}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {project.youtubeUrl && (
              <a
                href={project.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded bg-[#E5242A]/20 hover:bg-[#E5242A] text-[#E5242A] hover:text-white border border-[#E5242A]/40 text-xs font-mono transition-colors flex items-center gap-1.5"
              >
                <span>YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#222222] text-[#A5A5A5] hover:text-white hover:bg-[#333333] transition-colors cursor-pointer"
              aria-label={copy.portfolio.modalClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Canvas / YouTube Embed or Preview Area */}
        <div className="relative aspect-video w-full bg-[#050505] overflow-hidden group">
          {project.youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={project.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <>
              <img
                src={project.thumbnail}
                alt={project.title}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (project.youtubeId && !target.src.includes('hqdefault')) {
                    target.src = `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`;
                  } else {
                    target.src = '/images/hero.jpg';
                  }
                }}
                className="w-full h-full object-cover object-center filter brightness-95"
                referrerPolicy="no-referrer"
              />

              {/* Film Grain & Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />

              {/* Simulated Timecode Overlay */}
              <div className="absolute top-4 left-4 font-mono text-xs text-white/80 bg-black/60 px-2 py-1 rounded backdrop-blur-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E5242A] animate-pulse" />
                <span>TC 01:14:28:16 · {project.bpm} BPM</span>
              </div>

              {/* Demonstration Concept Disclaimer Badge */}
              <div className="absolute top-4 right-4 font-mono text-[11px] text-[#A5A5A5] bg-black/70 border border-[#333333] px-2.5 py-1 rounded backdrop-blur-sm">
                {currentLang === 'pl' ? 'Koncepcja demonstracyjna MASH AI' : 'MASH AI Demo Concept'}
              </div>

              {/* Simulated Waveform & Audio Reactive Bars */}
              <div className="absolute bottom-16 left-6 right-6 flex items-end justify-between gap-1 h-6 pointer-events-none opacity-60">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-[#E5242A] rounded-t transition-all duration-150"
                    style={{
                      height: isPlaying ? `${Math.sin((i + progress) * 0.4) * 50 + 50}%` : '20%',
                    }}
                  />
                ))}
              </div>

              {/* Video Control Bar at bottom of frame */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2">
                {/* Scrubber line */}
                <div
                  className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer relative"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pos = ((e.clientX - rect.left) / rect.width) * 100;
                    setProgress(Math.max(0, Math.min(100, pos)));
                  }}
                >
                  <div
                    className="h-full bg-[#E5242A] rounded-full relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-white/90 pt-1">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="hover:text-[#E5242A] transition-colors cursor-pointer"
                      aria-label={isPlaying ? 'Pauza' : 'Odtwórz'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <span>
                      0{Math.floor(progress / 25)}:{Math.floor((progress % 25) * 2.4).toString().padStart(2, '0')} / {project.duration}
                    </span>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="hover:text-[#E5242A] transition-colors cursor-pointer"
                      aria-label={isMuted ? 'Włącz dźwięk' : 'Wycisz'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="text-[11px] text-[#A5A5A5]">
                    <span>24.000 fps · DCI 4K Scope 2.39:1</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Project Meta Information (Scrollable content) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#222222] pb-4">
            <div>
              <span className="text-xs font-mono text-[#E5242A] uppercase tracking-wider block">
                {project.artist}
              </span>
              <h3 id="modal-title" className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-white tracking-tight">
                {project.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#A5A5A5]">
              <span>Rok: {project.year}</span>
              <span aria-hidden="true">·</span>
              <span>Długość: {project.duration}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#E5242A] font-semibold">{project.genreLabel[currentLang]}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-xs uppercase font-mono tracking-wider text-[#A5A5A5]">
                {copy.portfolio.synopsisHeading}
              </h4>
              <p className="text-sm text-[#e0e0e0] leading-relaxed">
                {project.synopsis[currentLang]}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs uppercase font-mono tracking-wider text-[#A5A5A5]">
                {copy.portfolio.worldHeading}
              </h4>
              <p className="text-sm text-[#e0e0e0] leading-relaxed">
                {project.visualWorld[currentLang]}
              </p>
            </div>
          </div>

          {/* Techniques and Palette */}
          <div className="pt-4 border-t border-[#222222] flex flex-wrap items-center justify-between gap-6">
            <div>
              <span className="text-[11px] uppercase font-mono text-[#A5A5A5] block mb-2">
                {copy.portfolio.techHeading}:
              </span>
              <div className="flex flex-wrap gap-2 text-xs text-[#cccccc] font-mono">
                {project.techniques.map((tech, idx) => (
                  <span key={idx} className="bg-[#1c1c1c] border border-[#2d2d2d] px-2.5 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] uppercase font-mono text-[#A5A5A5] block mb-2">
                {copy.portfolio.paletteHeading}:
              </span>
              <div className="flex items-center gap-2">
                {project.colorPalette.map((color, idx) => (
                  <div
                    key={idx}
                    className="w-6 h-6 rounded border border-white/20 shadow-sm"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
