'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  value: string;
  options: string[];
  onChange: (val: string) => void;
  align?: 'left' | 'right';
  width?: string;
}

export default function Dropdown({ value, options, onChange, align = 'left', width = 'w-44' }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(!open)} className="flex items-center gap-1 font-semibold border-b border-amber-900/40 pb-0.5 text-amber-950 cursor-pointer">
        {value} <ChevronDown className="w-3.5 h-3.5 opacity-60" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-1 ${width} rounded-xl bg-[#FAF6EE] border border-amber-900/20 shadow-xl p-1 z-30 text-xs`}>
            {options.map((o) => (
              <button key={o} type="button" onClick={() => { onChange(o); setOpen(false); }} className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-amber-800/10 font-serif cursor-pointer">{o}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
