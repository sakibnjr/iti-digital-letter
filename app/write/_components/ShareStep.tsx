'use client';

import { useState, useMemo, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { LetterData } from '@/app/_lib/types';
import { generateShareUrl } from '@/app/_lib/encoder';
import { Copy, Check, QrCode, MessageCircle, Send, Mail, Feather, Eye } from 'lucide-react';
import Link from 'next/link';

interface ShareStepProps {
  lang: 'bn' | 'en';
  letter: LetterData;
  onWriteAnother: () => void;
}

export default function ShareStep({ lang, letter, onWriteAnother }: ShareStepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const shareUrl = useMemo(() => generateShareUrl(letter), [letter]);

  useGSAP(() => {
    gsap.from(ref.current, { y: 30, opacity: 0, duration: 0.5, ease: 'power3.out' });
  }, { scope: ref });

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { window.prompt('Copy:', shareUrl); }
  };

  const shareText = `✉️ ${letter.recipientName}, ${lang === 'bn' ? 'আপনার জন্য একটি চিঠি:' : 'a letter for you:'}\n${shareUrl}`;

  return (
    <div ref={ref} className="w-full max-w-xl mx-auto px-4 py-8">
      <div className="bg-[#FAFDFE] border border-blue-900/20 rounded-3xl p-6 sm:p-10 shadow-xl paper-grain text-center">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-700 via-indigo-900 to-slate-950 text-sky-100 flex items-center justify-center font-serif text-sm font-bold shadow-md border border-sky-400/40 mx-auto mb-4">নীলখাম</div>

        <h2 className="font-serif text-xl font-bold text-slate-900 mb-6">{lang === 'bn' ? 'চিঠি সিলমোহরযুক্ত হয়েছে' : 'Letter Sealed'}</h2>

        {/* Link box */}
        <div className="bg-white/80 border border-blue-900/20 rounded-2xl p-2.5 flex items-center justify-between gap-2 shadow-inner mb-6">
          <input readOnly value={shareUrl} className="bg-transparent outline-none text-xs text-slate-900 font-mono flex-1 px-2 truncate" />
          <button type="button" onClick={handleCopy} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all shadow-xs shrink-0 cursor-pointer ${copied ? 'bg-emerald-700 text-emerald-50' : 'bg-blue-900 hover:bg-slate-900 text-sky-50'}`}>
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? (lang === 'bn' ? 'কপি হয়েছে!' : 'Copied!') : (lang === 'bn' ? 'কপি' : 'Copy')}
          </button>
        </div>

        {/* Social buttons */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-8">
          <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-800/10 hover:bg-emerald-800/20 border border-emerald-800/20 text-emerald-950 text-xs font-medium transition-all">
            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
          </a>
          <a href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-800/10 hover:bg-sky-800/20 border border-sky-800/20 text-sky-950 text-xs font-medium transition-all">
            <Send className="w-3.5 h-3.5" /> Telegram
          </a>
          <a href={`mailto:?subject=${encodeURIComponent(`A letter for ${letter.recipientName}`)}&body=${encodeURIComponent(shareText)}`} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-900/10 hover:bg-blue-900/20 border border-blue-900/20 text-slate-900 text-xs font-medium transition-all">
            <Mail className="w-3.5 h-3.5 text-blue-900" /> Email
          </a>
          <button type="button" onClick={() => setShowQr(!showQr)} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-900/10 hover:bg-blue-900/20 border border-blue-900/20 text-slate-900 text-xs font-medium transition-all cursor-pointer">
            <QrCode className="w-3.5 h-3.5 text-blue-900" /> QR
          </button>
        </div>

        {showQr && (
          <div className="bg-sky-50/80 border border-blue-900/20 rounded-2xl p-4 mb-8 inline-block shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}&bgcolor=F0F4F8&color=0F172A`} alt="QR" className="w-40 h-40 rounded-lg" />
          </div>
        )}

        {/* Bottom actions */}
        <div className="pt-4 border-t border-blue-900/15 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href={shareUrl} className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-blue-900/10 hover:bg-blue-900/20 border border-blue-900/25 text-slate-900 font-serif font-semibold text-xs transition-all">
            <Eye className="w-3.5 h-3.5 text-blue-900" /> {lang === 'bn' ? 'প্রাপকের দৃষ্টিতে' : 'Preview'}
          </Link>
          <button type="button" onClick={onWriteAnother} className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 text-sky-50 font-serif font-semibold text-xs shadow-xs hover:shadow-md transition-all cursor-pointer border border-sky-400/20">
            <Feather className="w-3.5 h-3.5 text-sky-200" /> {lang === 'bn' ? 'আরেকটি চিঠি' : 'Write Another'}
          </button>
        </div>
      </div>
    </div>
  );
}
