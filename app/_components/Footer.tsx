export default function Footer({ lang = 'bn' }: { lang?: 'bn' | 'en' }) {
  return (
    <footer className="w-full border-t border-amber-900/10 py-6 text-center text-xs font-serif text-amber-900/60 bg-[#FAF6EE]">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-amber-950">ইতি</span>
          <span>—</span>
          <span>{lang === 'bn' ? 'ব্যক্তিগত ডিজিটাল চিঠি' : 'Digital letter platform'}</span>
        </div>
        <span className="text-[11px]">{lang === 'bn' ? 'গোপনীয় ও সুরক্ষিত' : 'Private & Direct'}</span>
      </div>
    </footer>
  );
}
