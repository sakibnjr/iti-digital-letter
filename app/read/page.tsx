"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReadRedirect() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    router.replace(`/open${hash}`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="font-serif text-amber-950 animate-pulse">
        পুনঃনির্দেশিত হচ্ছে...
      </span>
    </div>
  );
}
