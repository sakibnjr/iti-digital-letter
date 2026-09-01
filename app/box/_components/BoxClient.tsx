'use client';

import { useState } from 'react';
import { removeKeepsakeLetter } from '@/app/_lib/storage';
import { useLang, useKeepsakeLetters, notifyStorageUpdated } from '@/app/_lib/hooks';
import Navbar from '@/app/_components/Navbar';
import Footer from '@/app/_components/Footer';
import LetterCard from './LetterCard';
import { Inbox, Feather } from 'lucide-react';
import Link from 'next/link';

export default function BoxClient() {
  const [lang, setLang] = useLang();
  const letters = useKeepsakeLetters();
  const [filter, setFilter] = useState<'all' | 'sent' | 'received'>('all');

  const handleDelete = (id: string) => {
    if (window.confirm(lang === 'bn' ? 'মুছে ফেলতে চান?' : 'Remove?')) {
      removeKeepsakeLetter(id);
      notifyStorageUpdated();
    }
  };

  const filtered = letters.filter((i) => filter === 'all' || i.type === filter);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE]">
      <Navbar lang={lang} onLangChange={setLang} boxCount={letters.length} />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-full bg-amber-900/10 text-amber-900 flex items-center justify-center mx-auto mb-2 border border-amber-900/20"><Inbox className="w-5 h-5" /></div>
          <h1 className="font-serif text-2xl font-bold text-amber-950">{lang === 'bn' ? 'চিঠির বাক্স' : 'Keepsake Box'}</h1>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {(['all', 'sent', 'received'] as const).map((f) => (
            <button key={f} type="button" onClick={() => setFilter(f)} className={`px-3.5 py-1 rounded-full text-xs font-serif font-semibold transition-all cursor-pointer ${filter === f ? 'bg-amber-900 text-amber-50 shadow-xs' : 'bg-amber-900/10 text-amber-950 hover:bg-amber-900/15'}`}>
              {f === 'all' ? (lang === 'bn' ? `সব (${letters.length})` : `All (${letters.length})`) : f === 'sent' ? (lang === 'bn' ? 'প্রেরিত' : 'Sent') : (lang === 'bn' ? 'প্রাপ্ত' : 'Received')}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((item) => <LetterCard key={item.letter.id} item={item} lang={lang} onDelete={handleDelete} />)}
          </div>
        ) : (
          <div className="bg-[#FAF6EE] border border-amber-900/20 rounded-3xl p-8 text-center max-w-sm mx-auto paper-grain">
            <div className="w-12 h-12 rounded-full bg-amber-900/5 text-amber-800 flex items-center justify-center mx-auto mb-3 border border-amber-900/10"><Feather className="w-6 h-6 opacity-60" /></div>
            <p className="text-xs text-amber-900/70 font-serif mb-4">{lang === 'bn' ? 'বাক্স খালি' : 'No letters'}</p>
            <Link href="/write" className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-amber-800 to-rose-900 text-amber-100 font-serif font-bold text-xs shadow-xs"><Feather className="w-3.5 h-3.5 text-amber-200" />{lang === 'bn' ? 'চিঠি লিখুন' : 'Write'}</Link>
          </div>
        )}
      </main>
      <Footer lang={lang} />
    </div>
  );
}
