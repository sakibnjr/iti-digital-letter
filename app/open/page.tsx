import { Suspense } from "react";
import OpenClient from "./_components/OpenClient";

export default function OpenPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <span className="font-serif text-amber-950 animate-pulse">
            চিঠি প্রস্তুত হচ্ছে...
          </span>
        </div>
      }
    >
      <OpenClient />
    </Suspense>
  );
}
