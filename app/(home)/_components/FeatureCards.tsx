'use client';

import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Feather, Stamp, Sparkles } from 'lucide-react';
import type { StepMeta } from './feature-showcase/types';
import StepTabs from './feature-showcase/StepTabs';
import WritingStage from './feature-showcase/WritingStage';
import SealingStage from './feature-showcase/SealingStage';
import RevealStage from './feature-showcase/RevealStage';
import ProgressDots from './feature-showcase/ProgressDots';

gsap.registerPlugin(ScrollTrigger);

const STEPS: StepMeta[] = [
  {
    labelBn: '০১. লিখুন',
    labelEn: '01. Write',
    tagBn: 'কালি ও কাগজ',
    tagEn: 'Ink & Paper',
    icon: Feather,
  },
  {
    labelBn: '০২. সিলমোহর',
    labelEn: '02. Seal',
    tagBn: 'গালা ও মোহর',
    tagEn: 'Wax & Emblem',
    icon: Stamp,
  },
  {
    labelBn: '০৩. উন্মোচন',
    labelEn: '03. Reveal',
    tagBn: 'সিল ভেঙে পড়া',
    tagEn: 'Break & Read',
    icon: Sparkles,
  },
];

interface FeatureCardsProps {
  lang?: 'bn' | 'en';
}

export default function FeatureCards({ lang = 'bn' }: FeatureCardsProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // Seamless continuous auto-animation through the 3 steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % STEPS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Entrance animation
  useGSAP(() => {
    gsap.from(containerRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
      },
    });
  }, { scope: containerRef });

  // Visual morphing animation on step change
  useGSAP(() => {
    if (!visualRef.current) return;
    gsap.fromTo(
      visualRef.current,
      { opacity: 0, scale: 0.94, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' }
    );
  }, [currentStep]);

  return (
    <section ref={containerRef} className="w-full max-w-2xl mx-auto px-4 py-16 text-center">
      {/* Sleek Step Selector */}
      <StepTabs
        steps={STEPS}
        currentStep={currentStep}
        onSelect={setCurrentStep}
        lang={lang}
      />

      {/* Main Single Animated Showcase Stage */}
      <div className="relative bg-[#FAF6EE] border border-amber-900/20 rounded-3xl p-8 sm:p-12 shadow-xl paper-grain overflow-hidden min-h-[360px] flex flex-col items-center justify-center">
        {/* Subtle decorative watermark */}
        <div className="iti-watermark opacity-15">ইতি</div>

        <div ref={visualRef} className="relative z-10 w-full flex flex-col items-center">
          {currentStep === 0 && <WritingStage lang={lang} />}
          {currentStep === 1 && <SealingStage lang={lang} />}
          {currentStep === 2 && <RevealStage lang={lang} />}
        </div>

        {/* Minimal Progress Dots */}
        <ProgressDots
          total={STEPS.length}
          current={currentStep}
          onSelect={setCurrentStep}
        />
      </div>
    </section>
  );
}
