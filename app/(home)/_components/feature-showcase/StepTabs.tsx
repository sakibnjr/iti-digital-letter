'use client';

import type { StepMeta } from './types';

interface StepTabsProps {
  steps: StepMeta[];
  currentStep: number;
  onSelect: (index: number) => void;
  lang: 'bn' | 'en';
}

export default function StepTabs({ steps, currentStep, onSelect, lang }: StepTabsProps) {
  return (
    <div className="inline-flex items-center p-1.5 rounded-full bg-amber-900/10 border border-amber-900/15 backdrop-blur-xs mb-8">
      {steps.map((s, idx) => {
        const isActive = currentStep === idx;
        const Icon = s.icon;
        return (
          <button
            key={s.labelEn}
            type="button"
            onClick={() => onSelect(idx)}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full font-serif text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
              isActive
                ? 'bg-amber-900 text-amber-50 shadow-md scale-105'
                : 'text-amber-950/70 hover:text-amber-950 hover:bg-amber-900/5'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-200' : 'opacity-60'}`} />
            <span>{lang === 'bn' ? s.labelBn : s.labelEn}</span>
          </button>
        );
      })}
    </div>
  );
}
