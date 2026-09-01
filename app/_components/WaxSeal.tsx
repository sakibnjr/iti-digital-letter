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
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
  xl: 'w-24 h-24',
} as const;

const ICON_SIZES = {
  sm: 'text-sm font-semibold',
  md: 'text-base font-bold',
  lg: 'text-2xl font-bold',
  xl: 'text-3xl font-extrabold',
} as const;

export default function WaxSeal({
  design = 'iti',
  color = 'crimson',
  size = 'md',
  interactive = false,
  onClick,
  className = '',
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
        boxShadow: `0 8px 18px rgba(0,0,0,0.45), inset 0 3px 6px ${c.highlight}99, inset 0 -4px 8px ${c.shadow}`,
      }}
    >
      {/* Natural Molten Rim (Organic melted contour) */}
      <div
        className="absolute inset-[-4px] rounded-full pointer-events-none opacity-85"
        style={{
          background: `radial-gradient(circle at 35% 30%, ${c.highlight}88 0%, ${c.hex} 70%, ${c.shadow} 100%)`,
          boxShadow: `0 4px 10px rgba(0,0,0,0.35)`,
          zIndex: -1,
        }}
      />

      {/* Recessed Center Stamp Well */}
      <div
        className="relative w-[76%] h-[76%] rounded-full flex items-center justify-center border shadow-inner"
        style={{
          backgroundColor: c.shadow,
          borderColor: `${c.highlight}55`,
          color: c.accent,
          boxShadow: `inset 0 3px 6px rgba(0,0,0,0.6), 0 1px 2px ${c.highlight}44`,
        }}
      >
        {/* Embossed Symbol */}
        <span
          className={`leading-none ${ICON_SIZES[size]} ${
            design === 'iti' ? 'font-serif' : 'filter drop-shadow-sm'
          }`}
          style={{
            textShadow: `0 -1px 1px rgba(0,0,0,0.7), 0 1px 1px ${c.highlight}88`,
          }}
        >
          {d.symbol}
        </span>
      </div>

      {/* Specular 3D Gloss Highlight Arc */}
      <div className="absolute top-1.5 left-2 w-2/5 h-1/3 rounded-full bg-gradient-to-b from-white/35 to-transparent blur-[1px] pointer-events-none -rotate-45" />
    </div>
  );
}
