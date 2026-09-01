'use client';

import { WAX_COLORS, WAX_DESIGNS } from '@/app/_lib/constants';
import type { WaxColorId, WaxSealDesignId } from '@/app/_lib/types';

interface WaxSealProps {
  design?: WaxSealDesignId;
  color?: WaxColorId;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

const SIZES = {
  sm: 'w-10 h-10 text-xs',
  md: 'w-14 h-14 text-sm',
  lg: 'w-20 h-20 text-lg',
  xl: 'w-24 h-24 text-2xl',
} as const;

const ICON_SIZES = {
  sm: 'text-sm font-semibold',
  md: 'text-lg font-bold',
  lg: 'text-2xl font-bold',
  xl: 'text-3xl font-extrabold',
} as const;

export default function WaxSeal({
  design = 'iti', color = 'crimson', size = 'md',
  interactive = false, onClick, className = '',
}: WaxSealProps) {
  const c = WAX_COLORS.find((x) => x.id === color) || WAX_COLORS[0];
  const d = WAX_DESIGNS.find((x) => x.id === design) || WAX_DESIGNS[0];

  return (
    <div
      onClick={interactive ? onClick : undefined}
      className={`
        relative inline-flex items-center justify-center rounded-full select-none
        transition-all duration-300 ${SIZES[size]}
        ${interactive ? 'cursor-pointer hover:scale-105 active:scale-95' : ''}
        ${className}
      `}
      style={{
        backgroundColor: c.hex,
        boxShadow: `0 4px 12px rgba(0,0,0,.35), inset 0 3px 6px ${c.highlight}88, inset 0 -4px 8px ${c.shadow}`,
      }}
    >
      {/* Melted rim */}
      <div
        className="absolute inset-[-3px] rounded-full opacity-70 pointer-events-none"
        style={{ border: `2px dashed ${c.highlight}55`, transform: 'rotate(18deg)' }}
      />

      {/* Inner stamp */}
      <div
        className="relative w-[78%] h-[78%] rounded-full flex items-center justify-center border"
        style={{
          backgroundColor: c.hex, borderColor: `${c.highlight}66`,
          color: c.accent, textShadow: `0 1px 2px ${c.shadow}`,
        }}
      >
        <span className={`leading-none ${ICON_SIZES[size]} ${design === 'iti' ? 'font-serif' : 'filter drop-shadow-sm'}`}>
          {d.symbol}
        </span>
      </div>

      {/* Specular highlight */}
      <div className="absolute top-1.5 left-2 w-1/3 h-1/4 rounded-full bg-white/25 blur-[1px] pointer-events-none -rotate-45" />
    </div>
  );
}
