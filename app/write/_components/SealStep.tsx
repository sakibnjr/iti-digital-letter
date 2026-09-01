'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { LetterData, WaxColorId, WaxSealDesignId } from '@/app/_lib/types';
import { WAX_COLORS, WAX_DESIGNS, ENVELOPE_COLORS } from '@/app/_lib/constants';
import { recordSentLetter, clearDraft } from '@/app/_lib/storage';
import { saveLetterToApi } from '@/app/_lib/encoder';
import { notifyStorageUpdated } from '@/app/_lib/hooks';
import EnvelopeVisual from '@/app/_components/EnvelopeVisual';
import WaxSeal from '@/app/_components/WaxSeal';
import SealAnimation from './SealAnimation';
import { ArrowLeft, Check } from 'lucide-react';

interface SealStepProps {
  lang: 'bn' | 'en';
  letter: LetterData;
  onBack: () => void;
  onSealed: (letter: LetterData) => void;
}

export default function SealStep({ lang, letter, onBack, onSealed }: SealStepProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [waxColor, setWaxColor] = useState<WaxColorId>(letter.waxSealColor || 'crimson');
  const [waxDesign, setWaxDesign] = useState<WaxSealDesignId>(letter.waxSealDesign || 'iti');
  const [envColor, setEnvColor] = useState(letter.envelopeColor || '#7F1D1D');
  const [sealing, setSealing] = useState(false);

  useGSAP(() => {
    gsap.from(containerRef.current, { y: 30, opacity: 0, duration: 0.5, ease: 'power3.out' });
  }, { scope: containerRef });

  const handleSeal = () => {
    if (sealing) return;
    setSealing(true);
  };

  const handleAnimDone = async () => {
    const final: LetterData = { ...letter, waxSealColor: waxColor, waxSealDesign: waxDesign, envelopeColor: envColor };
    try {
      const saved = await saveLetterToApi(final);
      recordSentLetter(saved);
      clearDraft();
      notifyStorageUpdated();
      onSealed(saved);
    } catch (err) {
      console.warn('Could not save to MongoDB, falling back to local letter:', err);
      recordSentLetter(final);
      clearDraft();
      notifyStorageUpdated();
      onSealed(final);
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto px-4 py-8 flex flex-col items-center">
      {sealing && <SealAnimation onComplete={handleAnimDone} />}

      <div className="w-full flex items-center justify-between mb-8">
        <button type="button" onClick={onBack} disabled={sealing} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif text-amber-950/80 hover:bg-amber-900/10 border border-amber-900/20 transition-all cursor-pointer disabled:opacity-40">
          <ArrowLeft className="w-3.5 h-3.5" />
          {lang === 'bn' ? 'চিঠিতে ফিরুন' : 'Back'}
        </button>
        <h2 className="font-serif text-xl font-bold text-amber-950">{lang === 'bn' ? 'সিলমোহর' : 'Wax Seal'}</h2>
        <div className="w-16" />
      </div>

      {/* Envelope preview */}
      <div className="w-full max-w-md mb-8">
        <EnvelopeVisual envelopeColor={envColor} senderName={letter.senderName} recipientName={letter.recipientName} salutation={letter.salutation} placeStr={letter.placeStr} lang={lang}>
          <WaxSeal design={waxDesign} color={waxColor} size="lg" />
        </EnvelopeVisual>
      </div>

      {/* Options panel */}
      <div className="w-full max-w-lg bg-[#FAF6EE] border border-amber-900/20 rounded-2xl p-5 shadow-xs space-y-5 paper-grain">
        {/* Emblem */}
        <div>
          <label className="block text-xs font-serif font-bold text-amber-950 mb-2">{lang === 'bn' ? 'নকশা:' : 'Emblem:'}</label>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {WAX_DESIGNS.map((d) => (
              <button key={d.id} type="button" onClick={() => setWaxDesign(d.id)} className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center cursor-pointer ${waxDesign === d.id ? 'border-amber-800 bg-amber-800/10 font-bold shadow-xs' : 'border-amber-900/15 hover:border-amber-900/30 bg-white/60'}`}>
                <span className="text-base">{d.symbol}</span>
                <span className="text-[10px] font-serif text-amber-950 mt-1 truncate">{lang === 'bn' ? d.nameBn : d.nameEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Wax color */}
        <div>
          <label className="block text-xs font-serif font-bold text-amber-950 mb-2">{lang === 'bn' ? 'মোমের রং:' : 'Wax:'}</label>
          <div className="flex gap-2.5 overflow-x-auto py-1">
            {WAX_COLORS.map((c) => (
              <button key={c.id} type="button" onClick={() => setWaxColor(c.id)} className={`w-7 h-7 rounded-full transition-transform flex items-center justify-center shadow-xs cursor-pointer ${waxColor === c.id ? 'scale-125 ring-2 ring-amber-900 ring-offset-2' : 'hover:scale-110 opacity-90'}`} style={{ backgroundColor: c.hex }}>
                {waxColor === c.id && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
            ))}
          </div>
        </div>

        {/* Envelope color */}
        <div>
          <label className="block text-xs font-serif font-bold text-amber-950 mb-2">{lang === 'bn' ? 'খামের রং:' : 'Envelope:'}</label>
          <div className="flex gap-2.5 overflow-x-auto py-1">
            {ENVELOPE_COLORS.map((e) => (
              <button key={e.id} type="button" onClick={() => setEnvColor(e.id)} className={`w-7 h-7 rounded-lg transition-transform flex items-center justify-center shadow-xs border border-white/20 cursor-pointer ${envColor === e.id ? 'scale-125 ring-2 ring-amber-900 ring-offset-2' : 'hover:scale-110 opacity-90'}`} style={{ backgroundColor: e.id }}>
                {envColor === e.id && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
            ))}
          </div>
        </div>

        {/* Seal button */}
        <button type="button" onClick={handleSeal} disabled={sealing} className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-800 via-rose-900 to-amber-900 text-amber-100 font-serif font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-400/20 disabled:opacity-50">
          {sealing ? (lang === 'bn' ? 'সিলমোহর হচ্ছে...' : 'Sealing...') : (lang === 'bn' ? 'সিলমোহর করুন' : 'Seal Envelope →')}
        </button>
      </div>
    </div>
  );
}
