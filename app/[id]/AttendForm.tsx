"use client";

import { useState } from "react";
import { updateGuest, type Guest } from "../guests/actions";
import { headingFont } from "../fonts";

export default function AttendForm({ guest }: { guest: Guest }) {
  const [willAttend, setWillAttend] = useState(
    guest?.["WILL ATTEND"] || 0
  );
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Mock guest data for demonstration with proper typing
  const guestData = guest || {
    NAMA: "Ekky & Didut",
    "PHONE NUMBER": "+62 812 3456 7890",
    "JUMLAH ORANG": 2,
    "WILL ATTEND": 0,
    GEREJA: false,
    "TEA PAI": false,
    SOIREE: false,
    "AFTER PARTY": false,
    id: "",
  } as Guest;

  // Handle form submission for updating a guest
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      await updateGuest(guest.id, {
        NAMA: guestData.NAMA,
        "PHONE NUMBER": guestData["PHONE NUMBER"],
        "JUMLAH ORANG": guestData["JUMLAH ORANG"],
        "WILL ATTEND": willAttend,
        GEREJA: guestData.GEREJA,
        "TEA PAI": guestData["TEA PAI"],
        SOIREE: guestData.SOIREE,
        "AFTER PARTY": guestData["AFTER PARTY"],
      });
      setSuccess(true);
    } catch (error) {
      setError("Failed to update attendance. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
      setShowConfirmation(false);
    }
  };

  // Handle form submission for declining attendance
  const handleNotAttend = async () => {
    setLoading(true);
    setError(null);

    try {
      await updateGuest(guest.id, {
        NAMA: guestData.NAMA,
        "PHONE NUMBER": guestData["PHONE NUMBER"],
        "JUMLAH ORANG": guestData["JUMLAH ORANG"],
        "WILL ATTEND": -1,
        GEREJA: guestData.GEREJA,
        "TEA PAI": guestData["TEA PAI"],
        SOIREE: guestData.SOIREE,
        "AFTER PARTY": guestData["AFTER PARTY"],
      });
      setSuccess(true);
    } catch (error) {
      setError("Failed to update attendance. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
      setShowConfirmation(false);
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
        {success ? (
          <div className="w-full text-center">
            <h2 className={`text-2xl font-serif text-rose-200 ${headingFont.className}`}>
              Thank You!
            </h2>
            <p className="mt-2">Your attendance has been confirmed.</p>
          </div>
        ) : guestData["WILL ATTEND"] === -1 ? (
          <div className="w-full text-center">
            You have chosen not to attend.
          </div>
        ) : guestData["WILL ATTEND"] > 0 ? (
          <div className="w-full text-center">Thanks for confirming!</div>
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
                value={guestData.NAMA}
                disabled
                className="w-full p-2 bg-transparent border border-rose-200 rounded text-rose-200"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-rose-200 text-sm font-serif">
                Phone Number
              </label>
              <input
                value={guestData["PHONE NUMBER"] || ""}
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
                value={guestData["JUMLAH ORANG"] || 1}
                disabled
                className="w-full p-2 bg-transparent border border-rose-200 rounded text-rose-200"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-rose-200 text-sm font-serif">
                Will Attend
              </label>
              {willAttend === 0 && (
                <p className="text-rose-200/70 text-xs italic mb-2">
                  Please select how many will attend
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: (guestData["JUMLAH ORANG"] || 1) }, (_, i) => (
                  <button
                    key={i + 1}
                    type="button"
                    onClick={() => setWillAttend(i + 1)}
                    className={`${headingFont.className} px-4 py-2 border border-rose-200 rounded text-rose-200 transition-colors duration-300 ${
                      willAttend === i + 1 ? "bg-rose-200 text-stone-800" : "bg-transparent hover:bg-rose-200/10"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <>
              <button
                onClick={() => setShowConfirmation(true)}
                disabled={loading || willAttend === 0}
                className={`${headingFont.className} w-full mt-6 bg-rose-200 hover:bg-rose-300 text-stone-800 font-serif py-3 px-4 rounded transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? "Updating..." : "Confirm Attendance"}
              </button>

              <button
                onClick={() => {
                  setWillAttend(0);
                  setShowConfirmation(true);
                }}
                disabled={loading}
                className={`${headingFont.className} w-full mt-6 border border-rose-200 text-rose-200 hover:bg-rose-200/10 font-serif py-3 px-4 rounded transition-colors duration-300`}
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

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-stone-800/90 p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-xl font-serif text-rose-200 mb-4">
              {willAttend > 0 ? "Confirm Attendance" : "Confirm You Can't Make It"}
            </h3>
            <p className="text-rose-200 mb-6">
              Are you sure you want to proceed?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 py-2 border border-rose-200 text-rose-200 rounded hover:bg-rose-200/10"
              >
                Cancel
              </button>
              <button
                onClick={willAttend > 0 ? handleSubmit : handleNotAttend}
                disabled={loading}
                className="flex-1 py-2 bg-rose-200 text-stone-800 rounded hover:bg-rose-300"
              >
                {loading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
