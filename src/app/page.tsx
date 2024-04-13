"use client";
import ABox from "@/components/ABox";
import BabylonScene from "@/components/BabylonScene";
import Hero from "@/components/Hero";
import Map from "@/components/Map";
import { useEffect, useState } from "react";

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
      <BabylonScene>
        <Hero />
        {/* <Map /> */}
      </BabylonScene>
    </main>
  );
}
