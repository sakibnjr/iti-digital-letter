"use client";

import { useState } from "react";
import type { LetterData } from "@/app/_lib/types";
import { useLang } from "@/app/_lib/hooks";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import LetterSheet from "./LetterSheet";
import SealStep from "./SealStep";
import ShareStep from "./ShareStep";

type Step = "write" | "seal" | "share";

export default function WriteClient() {
  const [lang, setLang] = useLang();
  const [step, setStep] = useState<Step>("write");
  const [letter, setLetter] = useState<LetterData | null>(null);

  const handleLetterDone = (data: LetterData) => {
    setLetter(data);
    setStep("seal");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSealed = (data: LetterData) => {
    setLetter(data);
    setStep("share");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setLetter(null);
    setStep("write");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F0F4F8]">
      <Navbar lang={lang} onLangChange={setLang} />

      <main className="flex-1 flex flex-col items-center">
        {step === "write" && (
          <LetterSheet
            lang={lang}
            onDone={handleLetterDone}
            initial={letter ?? undefined}
          />
        )}
        {step === "seal" && letter && (
          <SealStep
            lang={lang}
            letter={letter}
            onBack={() => setStep("write")}
            onSealed={handleSealed}
          />
        )}
        {step === "share" && letter && (
          <ShareStep lang={lang} letter={letter} onWriteAnother={handleReset} />
        )}
      </main>

      <Footer lang={lang} />
    </div>
  );
}
