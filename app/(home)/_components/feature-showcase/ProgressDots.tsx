'use client';

interface ProgressDotsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export default function ProgressDots({ total, current, onSelect }: ProgressDotsProps) {
  return (
    <div className="absolute bottom-4 flex items-center gap-2">
      {Array.from({ length: total }).map((_, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onSelect(idx)}
          className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
            current === idx ? 'w-6 bg-amber-900' : 'w-1.5 bg-amber-900/25 hover:bg-amber-900/50'
          }`}
          aria-label={`Go to step ${idx + 1}`}
        />
      ))}
    </div>
  );
}
