"use client"

import { useState } from "react"
import { Guest, updateGuest } from "@/app/guests/actions"

export default function AttendForm({ guest }: { guest: Guest }) {
    const [willAttend, setWillAttend] = useState(guest.fields["WILL ATTEND"] || 1)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      setSuccess(false)
  
      try {
        await updateGuest(guest.id, {
          "WILL ATTEND": Number(willAttend),
        })
        setSuccess(true)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
  
    return (
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl space-y-6 text-black"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Guest Details</h2>
  
        <div className="space-y-1">
          <label className="block text-gray-600 text-sm">Nama</label>
          <input
            value={guest.fields.NAMA}
            disabled
            className="w-full p-2 border rounded bg-gray-100 text-gray-700"
          />
        </div>
  
        <div className="space-y-1">
          <label className="block text-gray-600 text-sm">Phone Number</label>
          <input
            value={guest.fields["PHONE NUMBER"] || ""}
            disabled
            className="w-full p-2 border rounded bg-gray-100 text-gray-700"
          />
        </div>
  
        <div className="space-y-1">
          <label className="block text-gray-600 text-sm">Jumlah Orang</label>
          <input
            type="number"
            value={guest.fields["JUMLAH ORANG"] || 1}
            disabled
            className="w-full p-2 border rounded bg-gray-100 text-gray-700"
          />
        </div>
  
        <div className="space-y-1">
          <label className="block text-gray-700 font-medium">Will Attend</label>
          <input
            type="number"
            min={0}
            max={guest.fields["JUMLAH ORANG"] || 1}
            value={willAttend}
            onChange={(e) => setWillAttend(Number(e.target.value))}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          {loading ? "Updating..." : "Update Attendance"}
        </button>
  
        {success && (
          <p className="text-green-600 text-center font-medium">Updated successfully!</p>
        )}
      </form>
    )
  }