import Link from 'next/link';
import { Feather } from 'lucide-react';
import { SparkleText } from '@/app/_components/ArtisticAnnotations';

interface CTASectionProps {
  lang?: 'bn' | 'en';
}

export default function CTASection({ lang = 'bn' }: CTASectionProps) {
  return (
    <section className="w-full max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="bg-gradient-to-br from-amber-900 to-rose-950 rounded-3xl p-10 sm:p-14 shadow-xl border border-amber-400/10">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-50 mb-4">
          {lang === 'bn' ? (
            <>
              আজই একটি{' '}
              <SparkleText sparkleColor="#FBBF24">
                <span className="text-amber-100">চিঠি লিখুন</span>
              </SparkleText>
            </>
          ) : (
            <>
              <SparkleText sparkleColor="#FBBF24">
                <span className="text-amber-100">Write a Letter</span>
              </SparkleText>{' '}
              Today
            </>
          )}
        </h2>
        <p className="text-sm text-amber-200/80 font-serif mb-8 max-w-md mx-auto leading-relaxed">
          {lang === 'bn'
            ? 'কোনো অ্যাকাউন্ট নেই, কোনো ট্র্যাকিং নেই — শুধু আপনার কথা, মোমের সিলে।'
            : 'No accounts, no tracking — just your words, sealed in wax.'}
        </p>
        <Link
          href="/write"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-amber-50 text-amber-950 font-serif font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Feather className="w-4 h-4 text-amber-800" />
          {lang === 'bn' ? 'শুরু করুন' : 'Get Started'}
        </Link>
      </div>
    </section>
  );
}

