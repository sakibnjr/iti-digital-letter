'use client';

import Link from 'next/link';
import { Feather, Inbox, Globe } from 'lucide-react';

interface NavbarProps {
  lang?: 'bn' | 'en';
  onLangChange?: (lang: 'bn' | 'en') => void;
  boxCount?: number;
}

export default function Navbar({ lang = 'bn', onLangChange, boxCount = 0 }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF6EE]/90 border-b border-amber-900/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-800 to-rose-950 flex items-center justify-center text-amber-100 font-serif font-bold text-base shadow-xs border border-amber-500/30 group-hover:scale-105 transition-transform">
            ই
          </div>
          <span className="font-serif text-xl font-bold text-amber-950">ইতি</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/box"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-amber-950/80 hover:bg-amber-900/10 border border-amber-900/15 transition-all"
          >
            <Inbox className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lang === 'bn' ? 'চিঠির বাক্স' : 'Box'}</span>
            {boxCount > 0 && (
              <span className="ml-0.5 px-1.5 rounded-full bg-amber-800 text-[10px] text-amber-50 font-mono">{boxCount}</span>
            )}
          </Link>

          <Link
            href="/write"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-amber-800 to-rose-900 text-amber-50 shadow-xs transition-all"
          >
            <Feather className="w-3.5 h-3.5 text-amber-200" />
            <span className="font-serif">{lang === 'bn' ? 'চিঠি লিখুন' : 'Write'}</span>
          </Link>

          <button
            type="button"
            onClick={() => onLangChange?.(lang === 'bn' ? 'en' : 'bn')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold text-amber-950/70 hover:bg-amber-900/10 border border-amber-900/15 transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-amber-800" />
            <span className="font-mono">{lang === 'bn' ? 'EN' : 'বাং'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
