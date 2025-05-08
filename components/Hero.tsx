import { headingFont } from "@/app/fonts";


export default function Hero() {
  return (
    <div className="w-[20rem] flex flex-col items-center gap-1 justify-center ">
      <div className="flex h-8">&nbsp;</div>

      <p className="text-center text-xs max-w-[15rem]">
        With love in our hearts, we&apos;d be delighted to have you join us for
        the wedding celebration of
      </p>
      <div className="flex h-8">&nbsp;</div>

      <h1 className={`${headingFont.className} text-4xl`}>Ekky & Didut</h1>
      <div className="flex h-4">&nbsp;</div>
      <p className="text-xs">Saturday</p>
      <p className="text-xl font-bold">June 7, 2025</p>
      <p className="text-xs">Jakarta</p>
    </div>
  );
}
