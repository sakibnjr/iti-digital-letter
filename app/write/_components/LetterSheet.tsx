'use client';

import { useState, useEffect, useRef, type FormEvent } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { LetterData } from '@/app/_lib/types';
import { SALUTATIONS_BN, SALUTATIONS_EN, SIGN_OFFS_BN, SIGN_OFFS_EN } from '@/app/_lib/constants';
import { saveDraft, getDraft } from '@/app/_lib/storage';
import { Feather, Calendar, MapPin, ChevronDown } from 'lucide-react';

interface LetterSheetProps {
  lang: 'bn' | 'en';
  onDone: (letter: LetterData) => void;
  initial?: Partial<LetterData>;
}

export default function LetterSheet({ lang, onDone, initial }: LetterSheetProps) {
  const sheetRef = useRef<HTMLFormElement>(null);
  const draft = initial || getDraft();

  const [recipientName, setRecipientName] = useState(draft?.recipientName || '');
  const [salutation, setSalutation] = useState(draft?.salutation || (lang === 'bn' ? 'প্রিয়' : 'Dearest'));
  const [dateStr, setDateStr] = useState(draft?.dateStr || (lang === 'bn' ? '১ সেপ্টেম্বর ২০২৬' : 'September 1, 2026'));
  const [placeStr, setPlaceStr] = useState(draft?.placeStr || (lang === 'bn' ? 'ঢাকা' : 'Dhaka'));
  const [body, setBody] = useState(draft?.body || '');
  const [signOff, setSignOff] = useState(draft?.signOff || (lang === 'bn' ? 'ইতি, তোমারই' : 'Yours always,'));
  const [senderName, setSenderName] = useState(draft?.senderName || '');
  const [postScript, setPostScript] = useState(draft?.postScript || '');
  const [showSalMenu, setShowSalMenu] = useState(false);
  const [showSignMenu, setShowSignMenu] = useState(false);

  // GSAP entrance
  useGSAP(() => {
    gsap.from(sheetRef.current, { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' });
  }, { scope: sheetRef });

  // Auto-save draft
  useEffect(() => {
    saveDraft({ recipientName, salutation, dateStr, placeStr, body, signOff, senderName, postScript });
  }, [recipientName, salutation, dateStr, placeStr, body, signOff, senderName, postScript]);

  const salutations = lang === 'bn' ? SALUTATIONS_BN : SALUTATIONS_EN;
  const signOffs = lang === 'bn' ? SIGN_OFFS_BN : SIGN_OFFS_EN;

  // When language changes, update default salutation and signOff if using presets (during render)
  const [prevLang, setPrevLang] = useState(lang);
  if (prevLang !== lang) {
    setPrevLang(lang);
    if (lang === 'en') {
      if (SALUTATIONS_BN.includes(salutation)) {
        const idx = SALUTATIONS_BN.indexOf(salutation);
        setSalutation(SALUTATIONS_EN[idx] || SALUTATIONS_EN[0]);
      }
      if (SIGN_OFFS_BN.includes(signOff)) {
        const idx = SIGN_OFFS_BN.indexOf(signOff);
        setSignOff(SIGN_OFFS_EN[idx] || SIGN_OFFS_EN[0]);
      }
    } else {
      if (SALUTATIONS_EN.includes(salutation)) {
        const idx = SALUTATIONS_EN.indexOf(salutation);
        setSalutation(SALUTATIONS_BN[idx] || SALUTATIONS_BN[0]);
      }
      if (SIGN_OFFS_EN.includes(signOff)) {
        const idx = SIGN_OFFS_EN.indexOf(signOff);
        setSignOff(SIGN_OFFS_BN[idx] || SIGN_OFFS_BN[0]);
      }
    }
  }

  const handleSubmit = (e: FormEvent) => {

    e.preventDefault();
    if (!recipientName.trim() || !body.trim() || !senderName.trim()) return;

    onDone({
      id: initial?.id || `letter_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      createdAt: Date.now(), recipientName: recipientName.trim(),
      salutation, dateStr, placeStr, body: body.trim(),
      signOff, senderName: senderName.trim(),
      postScript: postScript.trim() || undefined,
      waxSealDesign: initial?.waxSealDesign || 'iti',
      waxSealColor: initial?.waxSealColor || 'crimson',
      envelopeColor: initial?.envelopeColor || '#7F1D1D',
      language: lang,
    });
  };

  return (
    <form ref={sheetRef} onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="relative rounded-2xl p-6 sm:p-12 bg-[#FAF6EE] text-[#2C1810] deckle-edge paper-grain" style={{ fontFamily: 'var(--font-bn-serif)' }}>
        <div className="iti-watermark">ইতি</div>

        {/* Date & Place */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs text-amber-950/70 mb-8 font-serif">
          <div className="flex items-center gap-1.5 border-b border-amber-900/20 pb-0.5">
            <Calendar className="w-3.5 h-3.5 opacity-60" />
            <input value={dateStr} onChange={(e) => setDateStr(e.target.value)} placeholder={lang === 'bn' ? 'তারিখ' : 'Date'} className="bg-transparent outline-none text-amber-950 w-36 sm:w-44" />
          </div>
          <div className="flex items-center gap-1.5 border-b border-amber-900/20 pb-0.5">
            <MapPin className="w-3.5 h-3.5 opacity-60" />
            <input value={placeStr} onChange={(e) => setPlaceStr(e.target.value)} placeholder={lang === 'bn' ? 'স্থান' : 'Place'} className="bg-transparent outline-none text-amber-950 w-36 sm:w-44" />
          </div>
        </div>

        {/* Salutation + Recipient */}
        <div className="flex flex-wrap items-baseline gap-2 mb-6 text-base sm:text-lg font-serif">
          <div className="relative">
            <button type="button" onClick={() => setShowSalMenu(!showSalMenu)} className="flex items-center gap-1 font-semibold border-b border-amber-900/40 pb-0.5 text-amber-950 cursor-pointer">
              {salutation} <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
            {showSalMenu && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setShowSalMenu(false)} />
                <div className="absolute left-0 mt-1 w-44 rounded-xl bg-[#FAF6EE] border border-amber-900/20 shadow-xl p-1 z-30 text-xs">
                  {salutations.map((s) => (
                    <button key={s} type="button" onClick={() => { setSalutation(s); setShowSalMenu(false); }} className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-amber-800/10 font-serif cursor-pointer">{s}</button>
                  ))}
                </div>
              </>
            )}
          </div>
          <input required value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder={lang === 'bn' ? 'প্রাপকের নাম' : "Recipient's Name"} className="bg-transparent border-b border-amber-900/40 pb-0.5 outline-none font-semibold text-amber-950 flex-1 min-w-[160px]" />
          <span className="text-amber-900/60">,</span>
        </div>

        {/* Body */}
        <textarea required rows={10} value={body} onChange={(e) => setBody(e.target.value)} placeholder={lang === 'bn' ? 'আপনার মনের কথা লিখুন...' : 'Write your letter...'} className="w-full bg-transparent outline-none resize-y text-base sm:text-lg leading-relaxed text-[#2C1810] placeholder:text-amber-900/35" style={{ lineHeight: '2.0', minHeight: '220px' }} />

        {/* Sign-off + Sender */}
        <div className="flex flex-col items-end gap-2 text-right mt-6 text-base sm:text-lg font-serif">
          <div className="relative">
            <button type="button" onClick={() => setShowSignMenu(!showSignMenu)} className="flex items-center gap-1 font-semibold border-b border-amber-900/40 pb-0.5 text-amber-950 cursor-pointer">
              {signOff} <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
            {showSignMenu && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setShowSignMenu(false)} />
                <div className="absolute right-0 mt-1 w-52 rounded-xl bg-[#FAF6EE] border border-amber-900/20 shadow-xl p-1 z-30 text-xs text-left">
                  {signOffs.map((s) => (
                    <button key={s} type="button" onClick={() => { setSignOff(s); setShowSignMenu(false); }} className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-amber-800/10 font-serif cursor-pointer">{s}</button>
                  ))}
                </div>
              </>
            )}
          </div>
          <input required value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder={lang === 'bn' ? 'আপনার নাম' : 'Your Name'} className="bg-transparent border-b border-amber-900/40 pb-0.5 outline-none font-bold text-right text-amber-950 min-w-[140px]" />
        </div>

        {/* P.S. */}
        <div className="mt-8 pt-4 border-t border-amber-900/15 text-xs text-amber-900/80 font-serif">
          <span className="font-bold">{lang === 'bn' ? 'পুনশ্চ:' : 'P.S.'} </span>
          <input value={postScript} onChange={(e) => setPostScript(e.target.value)} placeholder={lang === 'bn' ? 'ছোট্ট কোনো বার্তা...' : 'A short note...'} className="bg-transparent outline-none text-amber-950 w-full sm:w-4/5 ml-1 inline-block" />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button type="submit" className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-800 via-rose-900 to-amber-900 text-amber-100 font-serif font-bold text-base shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center gap-2 cursor-pointer border border-amber-400/20">
          <Feather className="w-4 h-4 text-amber-200" />
          {lang === 'bn' ? 'সিলমোহর করুন →' : 'Seal & Send →'}
        </button>
      </div>
    </form>
  );
}
