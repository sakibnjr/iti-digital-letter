'use client';

import type { ReactNode } from 'react';

interface SparkleProps {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

// 4-pointed classic sparkle star SVG
export function SparkleIcon({ size = 16, color = '#F59E0B', className = '', style }: SparkleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={`inline-block pointer-events-none drop-shadow-xs ${className}`}
      style={style}
    >
      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
    </svg>
  );
}

/** Vector Thought Cloud / Bubble SVG with dreamy soft blue & golden accents */
export function ThoughtCloudIcon({
  className = '',
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block filter drop-shadow-sm select-none ${className}`}
    >
      <defs>
        <linearGradient id="thoughtCloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <filter id="thoughtGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#2563EB" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Main fluffy cloud body */}
      <path
        d="M27.5 13.5C27.5 13.2 27.5 12.9 27.5 12.6C27.5 8.4 24.1 5 19.9 5C17 5 14.5 6.6 13.3 9C12.5 8.4 11.5 8 10.4 8C7.5 8 5.1 10.4 5.1 13.3C5.1 13.8 5.2 14.3 5.4 14.7C3.4 15.8 2 17.9 2 20.3C2 23.9 4.9 26.8 8.5 26.8H27.5C31.1 26.8 34 23.9 34 20.3C34 16.9 31.4 14.1 28 13.6C27.8 13.5 27.6 13.5 27.5 13.5Z"
        fill="url(#thoughtCloudGrad)"
        stroke="#E0F2FE"
        strokeWidth="1.2"
        filter="url(#thoughtGlow)"
      />

      {/* Inner highlight gleam */}
      <path
        d="M13 11C14.2 9.5 16.5 8 19.5 8C22.5 8 24.5 9.8 25.2 11.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* Trailing thought dots */}
      <circle cx="6.5" cy="29" r="1.8" fill="#38BDF8" stroke="#E0F2FE" strokeWidth="0.8" />
      <circle cx="3.5" cy="31" r="1" fill="#60A5FA" />
      
      {/* Tiny embedded heart in cloud center */}
      <path
        d="M19 14.5C18.2 13.6 16.9 13.6 16.1 14.4C15.3 15.2 15.3 16.5 16.1 17.3L19 20.2L21.9 17.3C22.7 16.5 22.7 15.2 21.9 14.4C21.1 13.6 19.8 13.6 19 14.5Z"
        fill="#FFFFFF"
        opacity="0.9"
      />
    </svg>
  );
}

interface SparkleTextProps {
  children: ReactNode;
  className?: string;
  sparkleColor?: string;
}

/** Wraps text with floating, twinkling stars around it (like the reference design) */
export function SparkleText({
  children,
  className = '',
  sparkleColor = '#F59E0B',
}: SparkleTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      {/* Top Left Sparkle */}
      <span className="absolute -top-3.5 -left-3 animate-sparkle-float-1">
        <SparkleIcon size={15} color={sparkleColor} />
      </span>

      {/* Top Right Sparkle */}
      <span className="absolute -top-4 -right-3.5 animate-sparkle-float-2">
        <SparkleIcon size={18} color="#FBBF24" />
      </span>

      {/* Bottom Center Sparkle */}
      <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 animate-sparkle-float-3">
        <SparkleIcon size={13} color="#F59E0B" />
      </span>

      <span className="relative z-10">{children}</span>
    </span>
  );
}

interface AnnotationProps {
  children: ReactNode;
  className?: string;
  strokeColor?: string;
}

/** Hand-drawn sketchy circle around a word */
export function CircledText({
  children,
  className = '',
  strokeColor = '#818CF8',
}: AnnotationProps) {
  return (
    <span className={`relative inline-block px-2 py-0.5 ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M 10,50 C 10,18 90,12 92,48 C 94,82 12,88 6,56 C 4,38 28,14 75,18"
          fill="none"
          stroke={strokeColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className="opacity-85 animate-sketch-draw"
        />
      </svg>
    </span>
  );
}

/** Hand-drawn playful curved underline */
export function CurvedUnderlineText({
  children,
  className = '',
  strokeColor = '#3B82F6',
}: AnnotationProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full h-3 sm:h-3.5 pointer-events-none overflow-visible"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
      >
        <path
          d="M 2,10 C 25,18 45,4 70,14 C 85,18 95,8 98,12"
          fill="none"
          stroke={strokeColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="opacity-85 animate-sketch-draw"
        />
      </svg>
    </span>
  );
}

/** Hand-drawn wavy zigzag / squiggle underline */
export function SquiggleText({
  children,
  className = '',
  strokeColor = '#F59E0B',
}: AnnotationProps) {
  return (
    <span className={`relative inline-block font-bold ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        className="absolute -bottom-2 left-0 w-full h-3 pointer-events-none overflow-visible"
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
      >
        <path
          d="M 2,6 Q 10,0 18,6 T 34,6 T 50,6 T 66,6 T 82,6 T 98,6"
          fill="none"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className="opacity-90"
        />
      </svg>
    </span>
  );
}

/** Sketchy italic red/rose underline */
export function SketchUnderlineText({
  children,
  className = '',
  strokeColor = '#F43F5E',
}: AnnotationProps) {
  return (
    <span className={`relative inline-block italic ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        className="absolute -bottom-1.5 left-0 w-full h-2.5 pointer-events-none overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M 3,6 C 30,8 70,3 97,5"
          fill="none"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="opacity-85"
        />
      </svg>
    </span>
  );
}
