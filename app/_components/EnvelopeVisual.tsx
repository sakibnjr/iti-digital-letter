import type { ReactNode } from 'react';

interface EnvelopeVisualProps {
  envelopeColor: string;
  senderName: string;
  recipientName: string;
  salutation: string;
  placeStr?: string;
  lang?: 'bn' | 'en';
  children?: ReactNode;  // slot for wax seal overlay
  className?: string;
}

export default function EnvelopeVisual({
  envelopeColor, senderName, recipientName, salutation,
  placeStr, lang = 'bn', children, className = '',
}: EnvelopeVisualProps) {
  return (
    <div
      className={`relative w-full aspect-[1.55/1] rounded-2xl shadow-xl overflow-hidden
        flex flex-col justify-between p-6 border border-white/10 ${className}`}
      style={{ backgroundColor: envelopeColor, boxShadow: '0 20px 40px -10px rgba(0,0,0,.4)' }}
    >
      <div className="absolute inset-0 paper-grain pointer-events-none opacity-25" />

      {/* Flap */}
      <div
        className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
        style={{ clipPath: 'polygon(0 0,100% 0,50% 100%)', backgroundColor: 'rgba(0,0,0,.08)' }}
      />

      {/* Sender */}
      <div className="z-10 text-amber-100/90 font-serif">
        <span className="text-[10px] uppercase tracking-widest text-amber-200/60 block">
          {lang === 'bn' ? 'প্রেরক' : 'From'}
        </span>
        <span className="font-bold text-xs">{senderName}</span>
      </div>

      {/* Recipient */}
      <div className="z-10 text-center my-auto">
        <div className="font-serif text-lg sm:text-xl font-bold text-amber-100 drop-shadow-sm">
          {salutation} {recipientName}
        </div>
        {placeStr && <div className="text-xs font-serif text-amber-200/60 mt-0.5">{placeStr}</div>}
      </div>

      {/* Wax seal slot */}
      {children && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          {children}
        </div>
      )}
    </div>
  );
}
