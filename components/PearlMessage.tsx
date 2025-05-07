import { headingFont } from "@/app/fonts";

export default function PearlMessage() {

    return (
        <>
        
      
        <div className="w-[20rem] flex flex-col items-center gap-2 justify-center">
          <p className="text-center">
            Dear <strong>Rian</strong>, <br />
            You are warmly invited to attend the wedding ceremony of
          </p>
          <div className="flex h-12">&nbsp;</div>

          <h1 className={`${headingFont.className} text-5xl`}>Ekky & Didut</h1>
          <div className="flex h-4">&nbsp;</div>
          <p className="text-2xl">Jakarta</p>
          <p className="text">Saturday</p>
          <p className="text-2xl">June 7th, 2025</p>
        </div>
        </>
    )
} 