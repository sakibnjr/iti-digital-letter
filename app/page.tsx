'use client';

import Navbar from '@/app/_components/Navbar';
import Footer from '@/app/_components/Footer';
import HeroSection from './(home)/_components/HeroSection';
import FeatureCards from './(home)/_components/FeatureCards';
import CTASection from './(home)/_components/CTASection';
import { useLang, useBoxCount } from '@/app/_lib/hooks';

export default function HomePage() {
  const [lang, setLang] = useLang();
  const boxCount = useBoxCount();


  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE]">
      <Navbar lang={lang} onLangChange={setLang} boxCount={boxCount} />
      <main className="flex-1">
        <HeroSection lang={lang} />
        <FeatureCards lang={lang} />
        <CTASection lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}

