import Link from 'next/link';
import { Feather } from 'lucide-react';
import { SparkleText } from '@/app/_components/ArtisticAnnotations';

interface CTASectionProps {
  lang?: 'bn' | 'en';
}

export default function CTASection({ lang = 'bn' }: CTASectionProps) {
  return (
    <section className="w-full max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-10 sm:p-14 shadow-xl border border-sky-400/20">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-sky-50 mb-4">
          {lang === 'bn' ? (
            <>
              আজই একটি{' '}
              <SparkleText sparkleColor="#38BDF8">
                <span className="text-sky-200">চিঠি লিখুন</span>
              </SparkleText>
            </>
          ) : (
            <>
              <SparkleText sparkleColor="#38BDF8">
                <span className="text-sky-200">Write a Letter</span>
              </SparkleText>{' '}
              Today
            </>
          )}
        </h2>
        <p className="text-sm text-sky-200/80 font-serif mb-8 max-w-md mx-auto leading-relaxed">
          {lang === 'bn'
            ? 'কোনো অ্যাকাউন্ট নেই, কোনো ট্র্যাকিং নেই — শুধু আপনার কথা, নীলখামে মোড়া।'
            : 'No accounts, no tracking — just your words, sealed in blue.'}
        </p>
        <Link
          href="/write"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-sky-50 hover:bg-white text-slate-950 font-serif font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Feather className="w-4 h-4 text-blue-800" />
          {lang === 'bn' ? 'শুরু করুন' : 'Get Started'}
        </Link>
      </div>
    </section>
  );
}

