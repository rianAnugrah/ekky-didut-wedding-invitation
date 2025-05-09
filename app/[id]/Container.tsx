"use client";
import Image from "next/image";
import { useRef } from "react";
import { ArrowUp } from "lucide-react";

import Hero from "@/components/Hero";

export default function Container({ children }: { children: React.ReactNode }) {
  // Explicitly type the ref as HTMLDivElement
  const page2Ref = useRef<HTMLDivElement>(null);

  const scrollToPage2 = () => {
    // Try using the ref first
    if (page2Ref.current) {
      // Get the element's position relative to the viewport
      const rect = page2Ref.current.getBoundingClientRect();
      // Calculate the absolute position by adding current scroll position
      const absoluteTop = rect.top + window.scrollY;

      // Scroll to the element's position
      window.scrollTo({
        top: absoluteTop,
        behavior: "smooth",
      });
      return;
    }

    // Fallback: try using getElementById
    const page2Element = document.getElementById("page-2");
    if (page2Element) {
      const yOffset = page2Element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: yOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="w-full flex h-[100svh] items-center justify-center relative flex-col gap-6 text-[#dcbfc9]">
        <Image
          alt="bg"
          src="/frame_page_1.svg"
          width={1080}
          height={1920}
          className="absolute object-contain w-full h-[100svh] z-0"
        />

        <Hero />
        <button
          className="absolute bottom-28 flex flex-col items-center   text-white p-4 rounded hover:bg-black/10 hover:-translate-y-1 duration-200 ease-in transition-all z-10"
          onClick={scrollToPage2}
        >
          <ArrowUp size={16} />
          <span className="text-xs mt-1">Slide up</span>
        </button>
      </div>

      <div
        ref={page2Ref}
        className="w-full flex flex-col items-center justify-center relative "
        id="page-2"
      >

        {children}
      </div>
    </>
  );
}
