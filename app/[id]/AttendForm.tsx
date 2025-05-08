"use client"

import { useState } from "react"

export default function AttendForm({ guest }) {
  const [willAttend, setWillAttend] = useState(guest?.fields["WILL ATTEND"] || 1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      // Simulating API call for demo
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccess(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Mock guest data for demonstration
  const guestData = guest || {
    fields: {
      NAMA: "Ekky & Didut",
      "PHONE NUMBER": "+62 812 3456 7890",
      "JUMLAH ORANG": 2
    }
  }

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <div className="relative w-full p-8 bg-stone-800 border border-rose-200 rounded-lg shadow-lg text-rose-200 overflow-hidden">
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-rose-200"></div>
        <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-rose-200"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-rose-200"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-rose-200"></div>
        
        <div className="relative z-10 space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif text-rose-200">Confirmation</h2>
            <div className="flex items-center justify-center mt-2">
              <div className="h-px bg-rose-200 w-12"></div>
              <div className="mx-3 text-xl">&</div>
              <div className="h-px bg-rose-200 w-12"></div>
            </div>
            <p className="mt-2 italic text-sm">We look forward to celebrating with you</p>
          </div>

          <div className="space-y-1">
            <label className="block text-rose-200 text-sm font-serif">Nama</label>
            <input
              value={guestData.fields.NAMA}
              disabled
              className="w-full p-2 bg-stone-900 border border-rose-200 rounded text-rose-200"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-rose-200 text-sm font-serif">Phone Number</label>
            <input
              value={guestData.fields["PHONE NUMBER"] || ""}
              disabled
              className="w-full p-2 bg-stone-900 border border-rose-200 rounded text-rose-200"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-rose-200 text-sm font-serif">Jumlah Orang</label>
            <input
              type="number"
              value={guestData.fields["JUMLAH ORANG"] || 1}
              disabled
              className="w-full p-2 bg-stone-900 border border-rose-200 rounded text-rose-200"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-rose-200 text-sm font-serif">Will Attend</label>
            <input
              type="number"
              min={0}
              max={guestData.fields["JUMLAH ORANG"] || 1}
              value={willAttend}
              onChange={(e) => setWillAttend(Number(e.target.value))}
              className="w-full p-2 bg-stone-900 border border-rose-200 rounded text-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-200/30"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-6 bg-rose-200 hover:bg-rose-300 text-stone-800 font-serif py-3 px-4 rounded transition-colors duration-300"
          >
            {loading ? "Updating..." : "Confirm Attendance"}
          </button>

          {success && (
            <div className="text-center mt-4">
              <p className="text-rose-200 font-medium">
                Thank you for your response!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Decorative bottom flourish */}
      <div className="flex justify-center mt-6">
        <div className="w-24 h-px bg-rose-200"></div>
      </div>
    </div>
  )
}