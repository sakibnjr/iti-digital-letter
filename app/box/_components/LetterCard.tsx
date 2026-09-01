'use client';

import { useState, type MouseEvent } from 'react';
import type { SavedLetterItem } from '@/app/_lib/types';
import { generateShareUrl } from '@/app/_lib/encoder';
import WaxSeal from '@/app/_components/WaxSeal';
import { Send, MailOpen, Calendar, Copy, Check, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface LetterCardProps {
  item: SavedLetterItem;
  lang: 'bn' | 'en';
  onDelete: (id: string) => void;
}

export default function LetterCard({ item, lang, onDelete }: LetterCardProps) {
  const [copied, setCopied] = useState(false);
  const letter = item.letter;
  const url = generateShareUrl(letter);

  const handleCopy = async (e: MouseEvent) => {
    e.preventDefault();
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { window.prompt('Copy:', url); }
  };

  return (
    <div className="bg-[#FAF6EE] border border-amber-900/20 rounded-2xl p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between paper-grain">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-serif font-bold uppercase tracking-wider ${item.type === 'sent' ? 'bg-amber-800/10 text-amber-900' : 'bg-emerald-800/10 text-emerald-900'}`}>
          {item.type === 'sent' ? <Send className="w-3 h-3" /> : <MailOpen className="w-3 h-3" />}
          {item.type === 'sent' ? (lang === 'bn' ? 'প্রেরিত' : 'Sent') : (lang === 'bn' ? 'প্রাপ্ত' : 'Received')}
        </span>
        <span className="flex items-center gap-1 text-[11px] text-amber-900/60 font-serif"><Calendar className="w-3 h-3" />{letter.dateStr}</span>
      </div>

      {/* Recipient */}
      <div className="flex items-center gap-3 mb-2">
        <WaxSeal design={letter.waxSealDesign} color={letter.waxSealColor} size="sm" />
        <div>
          <h3 className="font-serif font-bold text-base text-amber-950">{letter.salutation} {letter.recipientName}</h3>
          <span className="text-xs text-amber-900/70 font-serif">{lang === 'bn' ? 'প্রেরক:' : 'From:'} {letter.senderName}</span>
        </div>
      </div>

      {/* Preview */}
      <p className="text-xs font-serif text-amber-900/80 line-clamp-2 leading-relaxed italic bg-white/40 p-2.5 rounded-xl border border-amber-900/10 mb-4">&ldquo;{letter.body}&rdquo;</p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-amber-900/10 text-xs">
        <div className="flex gap-1">
          <button type="button" onClick={handleCopy} className="p-1.5 rounded-lg text-amber-900/70 hover:text-amber-950 hover:bg-amber-900/10 transition-colors cursor-pointer">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button type="button" onClick={() => onDelete(letter.id)} className="p-1.5 rounded-lg text-rose-900/60 hover:text-rose-900 hover:bg-rose-900/10 transition-colors cursor-pointer">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
        <Link href={url} className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-900/10 hover:bg-amber-900/20 text-amber-950 font-serif font-bold text-xs transition-colors">
          {lang === 'bn' ? 'পড়ুন' : 'Open'} <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
