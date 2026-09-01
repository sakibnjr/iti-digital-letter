"use client";

import type { LetterData } from "@/app/_lib/types";
import { Reply, Feather } from "lucide-react";
import Link from "next/link";

interface LetterActionsProps {
  letter: LetterData;
  lang: "bn" | "en";
}

export default function LetterActions({ lang }: LetterActionsProps) {
  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <Link
        href="/write"
        className="w-full sm:w-auto px-6 py-3 rounded-full bg-blue-900/10 hover:bg-blue-900/20 border border-blue-900/20 text-slate-900 font-serif font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
      >
        <Feather className="w-4 h-4 text-blue-900" />
        {lang === "bn" ? "নতুন চিঠি" : "New Letter"}
      </Link>
    </div>
  );
}
