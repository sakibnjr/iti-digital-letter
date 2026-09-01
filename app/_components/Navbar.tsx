'use client';

import Link from 'next/link';
import { Feather, Globe } from 'lucide-react';

interface NavbarProps {
  lang?: 'bn' | 'en';
  onLangChange?: (lang: 'bn' | 'en') => void;
}

export default function Navbar({ lang = 'bn', onLangChange }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#F0F4F8]/90 border-b border-blue-950/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl overflow-hidden shadow-xs border border-sky-400/30 group-hover:scale-105 transition-transform flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon.svg" alt="Neelkhaam" className="w-full h-full object-cover" />
          </div>
          <span className="font-serif text-xl font-bold text-slate-900 tracking-tight">
            {lang === 'bn' ? 'নীলখাম' : 'Neelkhaam'}
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/write"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 text-sky-50 shadow-xs hover:shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all border border-sky-400/20"
          >
            <Feather className="w-3.5 h-3.5 text-sky-200" />
            <span className="font-serif">{lang === 'bn' ? 'চিঠি লিখুন' : 'Write'}</span>
          </Link>

          <button
            type="button"
            onClick={() => onLangChange?.(lang === 'bn' ? 'en' : 'bn')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold text-slate-800/75 hover:bg-blue-900/10 border border-blue-950/15 transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-blue-800" />
            <span className="font-mono">{lang === 'bn' ? 'EN' : 'বাং'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
