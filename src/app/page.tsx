"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const BabylonScene = dynamic(() => import("@/components/BabylonScene"), {
  ssr: false,
});

export default function Home() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
    }
  }, []);

  if (!isBrowser) return null;

  return (
    <main className="flex flex-1">
      <BabylonScene></BabylonScene>
    </main>
  );
}
