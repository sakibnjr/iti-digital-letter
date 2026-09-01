'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { LetterData } from "@/app/_lib/types";
import { decodeLetter, fetchLetterFromApi } from "@/app/_lib/encoder";
import { useLang, useBoxCount } from "@/app/_lib/hooks";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import SealedEnvelope from "./SealedEnvelope";
import LetterReveal from "./LetterReveal";
import { AlertCircle, Feather, Loader2 } from "lucide-react";
import Link from "next/link";

function decodeFromHash(): LetterData | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash;
  const encoded = hash.startsWith("#letter=")
    ? hash.replace("#letter=", "")
    : hash.length > 1
      ? hash.slice(1)
      : "";
  if (!encoded) return null;
  return decodeLetter(encoded);
}

export default function OpenClient() {
  const searchParams = useSearchParams();
  const idFromUrl = searchParams.get("id");

  const [letter, setLetter] = useState<LetterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [lang, setLang] = useLang();
  const boxCount = useBoxCount();


  useEffect(() => {
    async function loadLetter() {

      setLoading(true);

      // 1. Try to load from MongoDB by ID
      if (idFromUrl) {
        const fetched = await fetchLetterFromApi(idFromUrl);
        if (fetched) {
          setLetter(fetched);
          setLang(fetched.language || "bn");
          setLoading(false);
          return;
        }
      }

      // 2. Fallback to hash decode
      const fromHash = decodeFromHash();
      if (fromHash) {
        setLetter(fromHash);
        setLang(fromHash.language || "bn");
      }

      setLoading(false);
    }

    loadLetter();

    // Listen for hash changes
    const handler = () => {
      const fromHash = decodeFromHash();
      if (fromHash) {
        setLetter(fromHash);
        setLang(fromHash.language || "bn");
      }
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, [idFromUrl, setLang]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF6EE]">
        <Navbar lang={lang} onLangChange={setLang} boxCount={boxCount} />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="flex flex-col items-center gap-3 text-amber-950">
            <Loader2 className="w-8 h-8 animate-spin opacity-70" />
            <span className="font-serif text-sm">
              {lang === "bn" ? "চিঠি খোলা হচ্ছে..." : "Loading letter..."}
            </span>
          </div>
        </main>
      </div>
    );
  }

  if (!letter)
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF6EE]">
        <Navbar lang={lang} onLangChange={setLang} boxCount={boxCount} />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="bg-[#FAF6EE] border border-amber-900/20 rounded-3xl p-8 text-center max-w-md paper-grain shadow-xl">
            <div className="w-14 h-14 rounded-full bg-rose-900/10 text-rose-900 flex items-center justify-center mx-auto mb-4 border border-rose-900/20">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h2 className="font-serif text-xl font-bold text-amber-950 mb-2">
              {lang === "bn" ? "চিঠি পাওয়া যায়নি" : "Letter Not Found"}
            </h2>
            <p className="text-xs text-amber-900/70 font-serif mb-6">
              {lang === "bn"
                ? "লিংকটি সঠিক নয়।"
                : "The link may be incomplete."}
            </p>
            <Link
              href="/write"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-800 to-rose-900 text-amber-100 font-serif font-bold text-xs shadow-md"
            >
              <Feather className="w-4 h-4 text-amber-200" />
              {lang === "bn" ? "নতুন চিঠি" : "Write Letter"}
            </Link>
          </div>
        </main>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE]">
      <Navbar lang={lang} onLangChange={setLang} boxCount={boxCount} />
      <main className="flex-1 flex items-center justify-center">
        {!opened ? (
          <SealedEnvelope
            letter={letter}
            lang={lang}
            onOpened={() => setOpened(true)}
          />
        ) : (
          <LetterReveal letter={letter} lang={lang} />
        )}
      </main>
      <Footer lang={lang} />
    </div>
  );
}
