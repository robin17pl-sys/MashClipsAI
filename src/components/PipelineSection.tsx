import React, { useState } from 'react';
import { GitBranch, CheckCircle2, Cpu, Video, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { SITE_COPY, PIPELINE_STAGES } from '../data/content';

interface PipelineSectionProps {
  currentLang: Language;
}

export const PipelineSection: React.FC<PipelineSectionProps> = ({ currentLang }) => {
  const copy = SITE_COPY[currentLang];
  const [selectedStageId, setSelectedStageId] = useState<string>('concept');

  const activeStage = PIPELINE_STAGES.find((s) => s.id === selectedStageId) || PIPELINE_STAGES[0];

  return (
    <section id="pipeline" className="py-24 bg-[#080808] border-t border-[#1c1c1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E5242A]">
            <GitBranch className="w-3.5 h-3.5" />
            <span>{copy.pipeline.kicker}</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl lg:text-4xl font-extrabold uppercase font-display text-white tracking-tight leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {copy.pipeline.headline}
          </h2>

          <p className="text-base sm:text-lg text-[#A5A5A5] leading-relaxed">
            {copy.pipeline.sub}
          </p>
        </div>

        {/* 5-Stage Interactive Step Selector */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
          {PIPELINE_STAGES.map((stage) => {
            const isSelected = stage.id === selectedStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#181818] border-[#E5242A] shadow-md shadow-[#E5242A]/10'
                    : 'bg-[#101010] border-[#222222] hover:bg-[#141414] hover:border-[#333333]'
                }`}
              >
                <div>
                  <div className="text-xs font-mono text-[#E5242A] mb-1 font-bold">
                    STAGE {stage.number}
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white font-display uppercase tracking-tight line-clamp-2">
                    {stage.title[currentLang]}
                  </h3>
                </div>

                <div className="mt-4 pt-2 border-t border-[#1f1f1f] text-[11px] font-mono text-[#777777] flex items-center justify-between">
                  <span>{isSelected ? 'Wybrany' : 'Etap'}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#E5242A]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep-Dive Stage Display Box */}
        <div className="rounded-2xl bg-[#121212] border border-[#262626] p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Stage description */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-mono font-bold text-[#E5242A]">
                  {activeStage.number}
                </span>
                <div className="h-6 w-px bg-[#2a2a2a]" />
                <h3 className="text-xl sm:text-2xl font-bold uppercase font-display text-white">
                  {activeStage.title[currentLang]}
                </h3>
              </div>

              <p className="text-base font-medium text-white/90">
                {activeStage.shortDesc[currentLang]}
              </p>

              <p className="text-sm sm:text-base text-[#A5A5A5] leading-relaxed">
                {activeStage.details[currentLang]}
              </p>

              {/* Technical Pipeline Tag */}
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#d4d4d4]">
                <Cpu className="w-4 h-4 text-[#E5242A]" />
                <span>Standard technologiczny:</span>
                <span className="text-white font-semibold">{activeStage.techSpec}</span>
              </div>
            </div>

            {/* Right Column: Key Deliverables Checklist */}
            <div className="lg:col-span-5 rounded-xl bg-[#181818] border border-[#2a2a2a] p-6 space-y-4">
              <h4 className="text-xs uppercase font-mono tracking-wider text-[#A5A5A5]">
                {currentLang === 'pl' ? 'Rezultaty tego etapu:' : 'Stage Deliverables:'}
              </h4>

              <div className="space-y-3">
                {activeStage.keyDeliverables[currentLang].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#E5242A] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#e0e0e0] font-normal leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#262626] flex items-center justify-between text-xs text-[#888888] font-mono">
                <span>Nadzór reżyserski</span>
                <span className="text-white">MASH Schron & Dream Studio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
