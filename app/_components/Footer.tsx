export default function Footer({ lang = 'bn' }: { lang?: 'bn' | 'en' }) {
  return (
    <footer className="w-full border-t border-blue-950/10 py-6 text-center text-xs font-serif text-slate-700/70 bg-[#F0F4F8]">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-slate-900">{lang === 'bn' ? 'নীলখাম' : 'Neelkhaam'}</span>
          <span>—</span>
          <span>{lang === 'bn' ? 'ব্যক্তিগত ডিজিটাল চিঠি' : 'Private digital letters'}</span>
        </div>
        <span className="text-[11px] text-slate-600">{lang === 'bn' ? 'গোপনীয় ও সুরক্ষিত' : 'Private & Direct'}</span>
      </div>
    </footer>
  );
}
