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
  strokeColor = '#818CF8', // Gentle indigo/violet like the reference
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
  strokeColor = '#818CF8',
}: AnnotationProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        className="absolute -bottom-2.5 left-0 w-full h-4 pointer-events-none overflow-visible"
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
          className="opacity-80"
        />
      </svg>
    </span>
  );
}

/** Hand-drawn wavy zigzag / squiggle underline (like 'empowered' in reference) */
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

/** Sketchy italic red/rose underline (like 'not easy' in reference) */
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
        viewBox="0 0 100 10"
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
