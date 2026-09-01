'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { Feather } from 'lucide-react';
import { SparkleText, CurvedUnderlineText } from '@/app/_components/ArtisticAnnotations';

interface HeroSectionProps {
  lang?: 'bn' | 'en';
}

export default function HeroSection({ lang = 'bn' }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const featherRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('[data-hero-title]', { y: 30, opacity: 0, duration: 0.6, clearProps: 'all' })
      .from('[data-hero-sub]', { y: 20, opacity: 0, duration: 0.5, clearProps: 'all' }, '-=0.3')
      .from('[data-hero-cta]', { scale: 0.95, opacity: 0, duration: 0.4, clearProps: 'all' }, '-=0.2');

    // Floating feather
    if (featherRef.current) {
      gsap.to(featherRef.current, {
        y: -12, rotation: 6, duration: 2.5,
        ease: 'sine.inOut', yoyo: true, repeat: -1,
      });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full min-h-[85vh] flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* Floating feather accent */}
      <div ref={featherRef} className="absolute top-16 right-[15%] opacity-20 text-amber-800 hidden sm:block">
        <Feather className="w-16 h-16" />
      </div>

      {/* Title with artistic annotations & floating sparkles */}
      <h1 data-hero-title className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-amber-950 text-center leading-relaxed sm:leading-tight mb-8 max-w-3xl">
        {lang === 'bn' ? (
          <>
            <span className="inline-block mr-2">আপনার</span>
            <span className="inline-block mr-2">হৃদয়ের</span>
            <span className="bg-gradient-to-r from-rose-700 via-rose-600 to-amber-600 bg-clip-text text-transparent font-bold mr-2">
              কথাগুলো,
            </span>
            <SparkleText sparkleColor="#F59E0B" className="mx-2">
              <span className="inline-block">মোমের সিলে</span>
            </SparkleText>
            <CurvedUnderlineText strokeColor="#9333EA" className="ml-2">
              <span className="inline-block">বাঁধুন</span>
            </CurvedUnderlineText>
          </>
        ) : (
          <>
            <span className="inline-block mr-2">Words from your</span>
            <span className="bg-gradient-to-r from-rose-700 via-rose-600 to-amber-600 bg-clip-text text-transparent font-bold mr-2">
              heart,
            </span>
            <SparkleText sparkleColor="#F59E0B" className="mx-2">
              <span className="inline-block">sealed in wax</span>
            </SparkleText>
          </>
        )}
      </h1>

      {/* Subtitle */}
      <p data-hero-sub className="text-sm sm:text-base text-amber-900/75 font-serif text-center max-w-lg mb-10 leading-relaxed">
        {lang === 'bn'
          ? 'একটি চিঠি লিখুন, মোমের সিলমোহর দিন, আর পাঠিয়ে দিন ব্যক্তিগত লিংকে — শুধু প্রাপকই পড়তে পারবেন।'
          : 'Write a letter, seal it with wax, and send it through a private link — for the recipient’s eyes only.'}
      </p>


      {/* CTA */}
      <Link
        href="/write"
        data-hero-cta
        className="group flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-amber-800 via-rose-900 to-amber-900 text-amber-50 font-serif font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all border border-amber-400/20"
      >
        <Feather className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
        {lang === 'bn' ? 'চিঠি লিখুন' : 'Write a Letter'}
      </Link>

      {/* Decorative radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-amber-800/5 blur-3xl pointer-events-none" />
    </section>
  );
}

