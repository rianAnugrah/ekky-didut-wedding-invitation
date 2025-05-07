"use client"
import Image from "next/image";
import { headingFont } from "./fonts";
import { useRef } from "react";
import {  ArrowUp } from "lucide-react";
import AttendButton from "@/components/AttendButton";
import TimeLine from "@/components/Timeline";

export default function IndexPage() {
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
        behavior: "smooth"
      });
      return;
    }
    
    // Fallback: try using getElementById
    const page2Element = document.getElementById("page-2");
    if (page2Element) {
      const yOffset = page2Element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: yOffset,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <div className="w-full flex h-[100svh] items-center justify-center relative flex-col gap-6">
        <Image
          alt="bg"
          src="/bg_e-invite.png"
          width={1080}
          height={1920}
          className="absolute object-contain w-full h-[100svh] z-0"
        />

        <div className="w-[20rem] flex flex-col items-center gap-1 justify-center ">
        <div className="flex h-8">&nbsp;</div>

          <p className="text-center text-xs max-w-[15rem]">
            Dear <strong>Rian</strong>, <br />
            You are warmly invited to attend the wedding ceremony of
          </p>
          <div className="flex h-8">&nbsp;</div>

          <h1 className={`${headingFont.className} text-4xl`}>Ekky & Didut</h1>
          <div className="flex h-4">&nbsp;</div>
          <p className="text-xl">Jakarta</p>
          <p className="text-xs">Saturday</p>
          <p className="text-xl font-bold">06 | 07</p>
          <p className="text-xs">2025</p>
        </div>

        <button 
          className="absolute bottom-22 flex flex-col items-center   text-white p-4 rounded hover:bg-orange-50 transition-colors z-10"
          onClick={scrollToPage2}
        >
         <ArrowUp size={16} />
         <span className="text-xs mt-1">Slide up</span>
        </button>
      </div>

      <div
        ref={page2Ref}
        className="w-full flex flex-col items-center justify-center relative"
        id="page-2"
      >
        <TimeLine />
       <AttendButton />
      </div>
    </>
  );
}