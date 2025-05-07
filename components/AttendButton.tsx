// export default function AttendButton() {
//   return (
//     <>
//       <div className="w-[20rem] flex flex-col items-center gap-2 justify-center">
//         <p className="text-center">
//           Please confirm your choice of attendance. Without RSVP, you will not
//           have access to enter the wedding location.
//         </p>
//         <p>
//           Silahkan pilih opsi kehadiran Anda. Tanpa konfirmasi, Anda tidak bisa
//           mendapat akses untuk masuk ke lokasi acara.
//         </p>

//         <form>

//         </form>
//       </div>
//     </>
//   );
// }

"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

export default function RsvpForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName("");
      setPhone("");
      setGuests(1);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#422922] gap-8 p-4 text-white  px-6 w-[20rem]">
      <p className="text-center text-xs font-bold">
        Please confirm your choice of attendance. Without RSVP, you will not
        have access to enter the wedding location.
      </p>
      <p className="text-center text-xs">
        Silahkan pilih opsi kehadiran Anda. Tanpa konfirmasi, Anda tidak bisa
        mendapat akses untuk masuk ke lokasi acara.
      </p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-transparent"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Number Attending */}
          <div className="space-y-1">
            <label className="block text-lg font-medium">
              NUMBER ATTENDING
            </label>
            <label className="block text-sm">Jumlah Tamu</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
              >
                <span>{guests}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10"
                >
                  <div className="py-1">
                    {[1, 2].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          setGuests(num);
                          setIsDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="space-y-1">
            <label className="block text-lg font-medium">NAME</label>
            <label className="block text-sm">Nama</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="block text-lg font-medium">PHONE NUMBER</label>
            <label className="block text-sm">Nomor Handphone</label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08522195XXXX"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
                required
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center text-sm">
            <p>
              Please check the RSVP form before submitting. Make sure your phone
              number is available to receive the RSVP confirmation
            </p>
            <div className="my-4">—</div>
            <p>
              Harap periksa kembali form RSVP yang Anda isi. Pastikan nomor
              handphone yang tertera aktif untuk mendapatkan konfirmasi
              selanjutnya
            </p>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#1A1A1A] text-white px-4 py-3 rounded-md font-medium"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center"
              >
                <Check className="h-5 w-5 mr-2" />
                <span>RSVP Submitted</span>
              </motion.div>
            ) : (
              <span>Submit RSVP</span>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
