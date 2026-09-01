import type { ReactNode } from 'react';

interface EnvelopeVisualProps {
  envelopeColor: string;
  senderName: string;
  recipientName: string;
  salutation: string;
  placeStr?: string;
  lang?: 'bn' | 'en';
  children?: ReactNode; // slot for wax seal overlay
  className?: string;
}

export default function EnvelopeVisual({
  envelopeColor,
  senderName,
  recipientName,
  salutation,
  placeStr,
  lang = 'bn',
  children,
  className = '',
}: EnvelopeVisualProps) {
  return (
    <div
      className={`relative w-full aspect-[1.55/1] rounded-3xl shadow-2xl overflow-hidden
        flex flex-col justify-between p-6 sm:p-8 border border-white/15 select-none ${className}`}
      style={{
        backgroundColor: envelopeColor,
        boxShadow:
          '0 25px 50px -12px rgba(15, 23, 42, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08) inset',
      }}
    >
      {/* Paper Grain Overlay */}
      <div className="absolute inset-0 paper-grain pointer-events-none opacity-20" />

      {/* Top Triangular Flap */}
      <div
        className="absolute top-0 left-0 right-0 h-[52%] pointer-events-none transition-all"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
          backgroundColor: 'rgba(0, 0, 0, 0.14)',
          filter: 'drop-shadow(0 6px 8px rgba(0, 0, 0, 0.35))',
        }}
      >
        {/* Subtle Flap Edge Highlight */}
        <div
          className="absolute inset-0 border-b border-white/10"
          style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
        />
      </div>

      {/* Side and Bottom Fold Subtle Shadows */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[48%] pointer-events-none"
        style={{
          clipPath: 'polygon(0 100%, 50% 10%, 100% 100%)',
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
        }}
      />

      {/* Top Bar: Sender & Date/Place */}
      <div className="z-10 flex items-start justify-between w-full">
        {/* Sender Info */}
        <div className="text-left font-serif">
          <span className="text-[10px] uppercase tracking-widest text-amber-200/70 block font-sans font-semibold">
            {lang === 'bn' ? 'প্রেরক' : 'From'}
          </span>
          <span className="font-bold text-xs sm:text-sm text-amber-100/95 tracking-wide">
            {senderName || (lang === 'bn' ? 'বেনামী' : 'Anonymous')}
          </span>
        </div>

        {/* Place Info */}
        {placeStr && (
          <div className="text-right font-serif">
            <span className="text-[10px] uppercase tracking-widest text-amber-200/60 block font-sans font-semibold">
              {lang === 'bn' ? 'স্থান' : 'Place'}
            </span>
            <span className="text-xs text-amber-200/80 font-medium">{placeStr}</span>
          </div>
        )}
      </div>

      {/* Center Wax Seal Anchor */}
      {children && (
        <div className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
          {children}
        </div>
      )}

      {/* Bottom Bar: Recipient (Natural Placement Below the Seal) */}
      <div className="z-10 w-full flex flex-col items-center sm:items-end justify-end mt-auto pt-10">
        <div className="text-center sm:text-right max-w-[80%]">
          <span className="text-[10px] uppercase tracking-widest text-amber-200/70 block font-sans font-semibold mb-0.5">
            {lang === 'bn' ? 'প্রাপক' : 'To'}
          </span>
          <div className="font-serif text-base sm:text-xl font-bold text-amber-100 drop-shadow-md tracking-tight">
            {salutation} {recipientName}
          </div>
        </div>
      </div>
    </div>
  );
}
