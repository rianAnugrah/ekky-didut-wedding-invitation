"use client";

import { useState } from "react";
import { updateGuest } from "../guests/actions";
import { headingFont } from "../fonts";

export default function AttendForm({ guest }) {
  const [willAttend, setWillAttend] = useState(
    guest?.fields["WILL ATTEND"] || 1
  );
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setSuccess(false);

  //   try {
  //     // Simulating API call for demo
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     setSuccess(true);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Mock guest data for demonstration
  const guestData = guest || {
    fields: {
      NAMA: "Ekky & Didut",
      "PHONE NUMBER": "+62 812 3456 7890",
      "JUMLAH ORANG": 2,
    },
  };

  // Handle form submission for creating or updating a guest
  const handleSubmit = async () => {
    //e.preventDefault();
    setLoading(true);

    try {
      await updateGuest(guest.id, {
        NAMA: guestData.fields["NAMA"],
        "PHONE NUMBER": guestData.fields["PHONE NUMBER"],
        "JUMLAH ORANG": guestData.fields["JUMLAH ORANG"],
        "WILL ATTEND": willAttend,
        GEREJA: guestData.fields["GEREJA"],
        "TEA PAI": guestData.fields["TEA PAI"],
        SOIREE: guestData.fields["SOIREE"],
        "AFTER PARTY": guestData.fields["AFTER PARTY"],
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for creating or updating a guest
  const handleNotAttend = async () => {
    //e.preventDefault();
    setLoading(true);

    try {
      await updateGuest(guest.id, {
        NAMA: guestData.fields["NAMA"],
        "PHONE NUMBER": guestData.fields["PHONE NUMBER"],
        "JUMLAH ORANG": guestData.fields["JUMLAH ORANG"],
        "WILL ATTEND": -1,
        GEREJA: guestData.fields["GEREJA"],
        "TEA PAI": guestData.fields["TEA PAI"],
        SOIREE: guestData.fields["SOIREE"],
        "AFTER PARTY": guestData.fields["AFTER PARTY"],
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full flex items-start justify-center pb-[10rem]">
      <div className="relative w-full max-w-[23rem] p-8 bg-stone-800/30  rounded-2xl shadow-lg text-rose-200 overflow-hidden">
        {/* Decorative corner elements */}
        {/* <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-rose-200"></div>
        <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-rose-200"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-rose-200"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-rose-200"></div> */}
        {guestData.fields["WILL ATTEND"] === -1 ? (
          <div className="w-full text-center">
            You choose to did not coming{" "}
          </div>
        ) : guestData.fields["WILL ATTEND"] > 0 ? (
          <div className="w-full text-center">Thanks For confirm!</div>
        ) : (
          <div className="relative z-10 space-y-6">
            <div className="text-center mb-8">
              <h2
                className={`text-4xl font-serif text-rose-200 ${headingFont.className}`}
              >
                Confirmation
              </h2>

              <p className="mt-2 italic text-sm">
                Let&apos;s kick off forever--with dancing, laugnter, and love.
              </p>
            </div>

            <div className="space-y-1">
              <label className="block text-rose-200 text-sm font-serif">
                Name
              </label>
              <input
                value={guestData.fields.NAMA}
                disabled
                className="w-full p-2 bg-transparent border border-rose-200 rounded text-rose-200"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-rose-200 text-sm font-serif">
                Phone Number
              </label>
              <input
                value={guestData.fields["PHONE NUMBER"] || ""}
                disabled
                className="w-full p-2 bg-transparent border border-rose-200 rounded text-rose-200"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-rose-200 text-sm font-serif">
                Attendance number
              </label>
              <input
                type="number"
                value={guestData.fields["JUMLAH ORANG"] || 1}
                disabled
                className="w-full p-2 bg-transparent border border-rose-200 rounded text-rose-200"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-rose-200 text-sm font-serif">
                Will Attend
              </label>
              <input
                type="number"
                min={0}
                max={guestData.fields["JUMLAH ORANG"] || 1}
                value={willAttend}
                onChange={(e) => setWillAttend(Number(e.target.value))}
                className="w-full p-2 bg-transparent border border-rose-200 rounded text-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-200/30"
              />
            </div>

            <>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`${headingFont.className}  w-full mt-6 bg-rose-200 hover:bg-rose-300 text-stone-800 font-serif py-3 px-4 rounded transition-colors duration-300`}
              >
                {loading ? "Updating..." : "Confirm Attendance"}
              </button>

              <button
                onClick={() => {
                  handleNotAttend();
                }}
                disabled={loading}
                className={`${headingFont.className} w-full mt-6 bg-rose-200 hover:bg-rose-300 text-stone-800 font-serif py-3 px-4 rounded transition-colors duration-300`}
              >
                {loading ? "Updating..." : "Sorry Couldn't make it"}
              </button>
            </>
          </div>
        )}
      </div>

      {/* <Image
        alt="bg"
        src="/frame_page_2_bottom.png"
        width={1080}
        height={1920}
        className="absolute object-contain w-full h-[100svh] z-0 border bottom-0"
      /> */}
    </div>
  );
}
