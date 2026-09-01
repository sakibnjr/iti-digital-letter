'use client';

import { Feather } from 'lucide-react';

interface WritingStageProps {
  lang: 'bn' | 'en';
}

export default function WritingStage({ lang }: WritingStageProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Parchment Sheet Visual */}
      <div className="relative w-64 sm:w-80 bg-[#F4EEDD] border border-amber-900/25 rounded-2xl p-6 shadow-md deckle-edge select-none">
        {/* Floating quill writing animation */}
        <div className="absolute -top-6 -right-4 animate-bounce text-amber-800 filter drop-shadow-md">
          <Feather className="w-9 h-9 rotate-45" />
        </div>

        {/* Animated cursive ink lines */}
        <div className="space-y-3 pt-2">
          <div className="h-2.5 bg-amber-900/20 rounded-full w-2/5 animate-pulse" />
          <div className="h-2 bg-amber-900/15 rounded-full w-5/6" />
          <div className="h-2 bg-amber-900/15 rounded-full w-full" />
          <div className="h-2 bg-amber-900/15 rounded-full w-4/5" />
          <div className="h-2 bg-amber-900/15 rounded-full w-3/5" />
        </div>

        <div className="mt-6 flex justify-end">
          <div className="h-3 bg-amber-900/30 rounded-full w-1/3" />
        </div>
      </div>

      <p className="mt-6 text-sm font-serif text-amber-900/80 font-medium tracking-wide">
        {lang === 'bn'
          ? 'কাগজের বুকে আপনার হৃদয়ের কথা'
          : 'Handwritten words on textured vintage paper'}
      </p>
    </div>
  );
}
