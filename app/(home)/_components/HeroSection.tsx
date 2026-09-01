"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { Feather } from "lucide-react";
import {
  SparkleText,
  CurvedUnderlineText,
  ThoughtCloudIcon,
} from "@/app/_components/ArtisticAnnotations";

interface HeroSectionProps {
  lang?: "bn" | "en";
}

export default function HeroSection({ lang = "bn" }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const featherRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-hero-title]", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        clearProps: "all",
      })
        .from(
          "[data-hero-sub]",
          { y: 20, opacity: 0, duration: 0.5, clearProps: "all" },
          "-=0.3",
        )
        .from(
          "[data-hero-cta]",
          { scale: 0.95, opacity: 0, duration: 0.4, clearProps: "all" },
          "-=0.2",
        );

      // Floating feather
      if (featherRef.current) {
        gsap.to(featherRef.current, {
          y: -12,
          rotation: 6,
          duration: 2.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[75vh] flex flex-col items-center justify-center px-4 pt-12 pb-8 sm:pt-14 sm:pb-10 overflow-hidden"
    >
      {/* Floating feather accent */}
      <div
        ref={featherRef}
        className="absolute top-16 right-[15%] opacity-20 text-blue-800 hidden sm:block"
      >
        <Feather className="w-16 h-16" />
      </div>

      {/* Title with artistic annotations, thought bubble & floating sparkles */}
      <h1
        data-hero-title
        className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 text-center leading-relaxed sm:leading-tight mb-6 max-w-3xl"
      >
        {lang === "bn" ? (
          <>
            <span className="inline-block mr-2">আপনার</span>
            <span className="inline-block mr-2">হৃদয়ের</span>
            <CurvedUnderlineText strokeColor="#2563EB" className="mr-2">
              <span className="relative inline-block bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent font-bold">
                কথাগুলো,
                {/* Floating Thought Cloud (Visible across mobile & desktop) */}
                <span className="absolute -top-5 sm:-top-7 -right-3.5 sm:-right-5 animate-sparkle-float-2 pointer-events-none">
                  <ThoughtCloudIcon
                    size={28}
                    className="w-5 h-5 sm:w-7 sm:h-7"
                  />
                </span>
              </span>
            </CurvedUnderlineText>
            <SparkleText sparkleColor="#38BDF8" className="mx-2">
              <span className="inline-block text-blue-950">নীলখামে</span>
            </SparkleText>
            <span className="inline-block ml-2">বাঁধুন</span>
          </>
        ) : (
          <>
            <span className="inline-block mr-2">Words from your</span>
            <CurvedUnderlineText strokeColor="#2563EB" className="mr-2">
              <span className="relative inline-block bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent font-bold">
                heart,
                {/* Floating Thought Cloud */}
                <span className="absolute -top-5 sm:-top-7 -right-3.5 sm:-right-5 animate-sparkle-float-2 pointer-events-none">
                  <ThoughtCloudIcon
                    size={28}
                    className="w-5 h-5 sm:w-7 sm:h-7"
                  />
                </span>
              </span>
            </CurvedUnderlineText>
            <SparkleText sparkleColor="#38BDF8" className="mx-2">
              <span className="inline-block text-blue-950">sealed in blue</span>
            </SparkleText>
          </>
        )}
      </h1>

      {/* Subtitle */}
      <p
        data-hero-sub
        className="text-sm sm:text-base text-slate-700/80 font-serif text-center max-w-lg mb-7 leading-relaxed"
      >
        {lang === "bn"
          ? "একটি চিঠি লিখুন, মোমের সিলমোহর দিন, আর পাঠিয়ে দিন ব্যক্তিগত লিংকে — শুধু প্রাপকই পড়তে পারবেন।"
          : "Write a letter, seal it with wax, and send it through a private link — for the recipient’s eyes only."}
      </p>

      {/* CTA */}
      <Link
        href="/write"
        data-hero-cta
        className="group flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-950 text-sky-50 font-serif font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all border border-sky-400/25"
      >
        <Feather className="w-5 h-5 text-sky-200 group-hover:rotate-12 transition-transform" />
        {lang === "bn" ? "চিঠি লিখুন" : "Write a Letter"}
      </Link>

      {/* Decorative radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />
    </section>
  );
}
