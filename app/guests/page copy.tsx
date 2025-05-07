"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Loader2, Trash2, PenSquare, Plus, X, CheckCircle } from "lucide-react";
import {
  fetchGuests,
  createGuest,
  updateGuest,
  deleteGuest,
  type Guest,
} from "./actions";
import WhatsAppButton from "./wa-button";

// Toast notification component
function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-3 rounded-md shadow-lg flex items-center justify-between ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white`}
    >
      <p>{message}</p>
      <button onClick={onClose} className="ml-4 focus:outline-none">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// Client component
export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [nama, setNama] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jumlahOrang, setJumlahOrang] = useState(1);
//   const [willAttend, setWillAttend] = useState(0);
  const [gereja, setGereja] = useState(false);
  const [teaPai, setTeaPai] = useState(false);
  const [soiree, setSoiree] = useState(false);
  const [afterParty, setAfterParty] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Show toast notification
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Load guests on component mount
  useEffect(() => {
    const loadGuests = async () => {
      try {
        const guestsData = await fetchGuests();
        setGuests(guestsData);
      } catch (error) {
        console.log(error);

        showToast("Failed to load guests. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    };

    loadGuests();
  }, []);

  // Handle form submission for creating or updating a guest
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingGuest) {
        // Update existing guest
        const updatedGuest = await updateGuest(editingGuest.id, {
          NAMA: nama,
          "PHONE NUMBER": phoneNumber,
          "JUMLAH ORANG": jumlahOrang,
        //   "WILL ATTEND": willAttend,
          GEREJA: gereja,
          "TEA PAI": teaPai,
          SOIREE: soiree,
          "AFTER PARTY": afterParty,
        });

        setGuests(
          guests.map((guest) =>
            guest.id === updatedGuest.id ? updatedGuest : guest
          )
        );
        showToast("Guest updated successfully!", "success");

        // Reset form
        setEditingGuest(null);
      } else {
        // Create new guest
        const newGuest = await createGuest(
          nama,
          phoneNumber,
          jumlahOrang,
        //   willAttend,
          gereja,
          teaPai,
          soiree,
          afterParty
        );
        setGuests([...guests, newGuest]);
        showToast("Guest created successfully!", "success");
      }

      // Clear form
      resetForm();
    } catch (error) {
      console.log(error);
      showToast(
        editingGuest
          ? "Failed to update guest. Please try again."
          : "Failed to create guest. Please try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setNama("");
    setPhoneNumber("");
    setJumlahOrang(1);
    // setWillAttend(null);
    setGereja(false);
    setTeaPai(false);
    setSoiree(false);
    setAfterParty(false);
  };

  // Handle guest deletion
  const handleDelete = async (id: string) => {
    try {
      await deleteGuest(id);
      setGuests(guests.filter((guest) => guest.id !== id));
      showToast("Guest deleted successfully!", "success");
    } catch (error) {
      console.log(error);
      showToast("Failed to delete guest. Please try again.", "error");
    }
  };

  // Set up guest for editing
  const handleEdit = (guest: Guest) => {
    setEditingGuest(guest);
    setNama(guest.fields.NAMA);
    setPhoneNumber(guest.fields["PHONE NUMBER"] || "");
    setJumlahOrang(guest.fields["JUMLAH ORANG"] || 1);
    // setWillAttend(guest.fields["WILL ATTEND"] || 0);
    setGereja(guest.fields.GEREJA || false);
    setTeaPai(guest.fields["TEA PAI"] || false);
    setSoiree(guest.fields.SOIREE || false);
    setAfterParty(guest.fields["AFTER PARTY"] || false);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingGuest(null);
    resetForm();
  };

  return (
    <div className="border grid grid-cols-4 gap-4 h-[100svh]  text-black p-6">
      {/* Guest Form */}
      <div className="p-4 bg-white rounded-lg shadow-md  overflow-hidden">
        <h1 className="text-3xl font-bold mb-8 text-center">Guest Form</h1>
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold">
            {editingGuest ? "Edit Guest" : "Add New Guest"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {editingGuest
              ? "Update the details of your guest below"
              : "Fill in the details to add a new guest"}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label
              htmlFor="nama"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nama
            </label>
            <input
              id="nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Enter guest name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="jumlahOrang"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Jumlah Orang
            </label>
            <input
              id="jumlahOrang"
              type="number"
              min="1"
              value={jumlahOrang}
              onChange={(e) => setJumlahOrang(Number.parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4 space-y-2">
            <p className="block text-sm font-medium text-gray-700">Events</p>

            <div className="flex items-center">
              <input
                id="gereja"
                type="checkbox"
                checked={gereja}
                onChange={(e) => setGereja(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="gereja"
                className="ml-2 block text-sm text-gray-700"
              >
                Gereja
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="teaPai"
                type="checkbox"
                checked={teaPai}
                onChange={(e) => setTeaPai(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="teaPai"
                className="ml-2 block text-sm text-gray-700"
              >
                Tea Pai
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="soiree"
                type="checkbox"
                checked={soiree}
                onChange={(e) => setSoiree(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="soiree"
                className="ml-2 block text-sm text-gray-700"
              >
                Soiree
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="afterParty"
                type="checkbox"
                checked={afterParty}
                onChange={(e) => setAfterParty(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="afterParty"
                className="ml-2 block text-sm text-gray-700"
              >
                After Party
              </label>
            </div>
          </div>

          {/* <div className="mb-4">
            <label
              htmlFor="willAttend"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              willAttend
            </label>
            <input
              id="willAttend"
              type="number"
              min="0"
              max="2"
              value={willAttend}
              onChange={(e) => setWillAttend(Number.parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div> */}

          <div className="flex justify-between">
            {editingGuest ? (
              <>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </span>
                  ) : (
                    "Update Guest"
                  )}
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Guest
                  </span>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Guests List */}
      <div className="col-span-3 overflow-auto">
        <h2 className="text-2xl font-semibold text-white mb-6">Your Guests Manager</h2>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : guests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">
              No guests found. Add your first guest above!
            </p>
          </div>
        ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-200">
            <div className="min-w-[700px] divide-y divide-gray-200">
              {/* Header Row */}
              <div className="grid grid-cols-7 gap-4 bg-gray-50 px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                <div className="col-span-2">Name</div>
                <div>Phone</div>
                <div>Limit</div>
                <div>Attend</div>
                <div>Events</div>
                <div className="text-right">Actions</div>
              </div>
                <div className="w-full h-[calc(100svh_-_148px)] overflow-auto">
              {/* Guest Rows */}
              {guests.map((guest) => (
                <div
                  key={guest.id}
                  className="grid grid-cols-7 bg-white gap-4 px-4 py-4 text-sm text-gray-800 hover:bg-gray-50 transition-colors items-center"
                >
                  {/* Name */}
                  <div className="col-span-2 font-medium ">{guest.fields.NAMA}</div>
          
                  {/* Phone */}
                  <div>{guest.fields["PHONE NUMBER"] || '-'}</div>
          
                  {/* Limit & Attend */}
                  <div className="flex flex-wrap items-center gap-4 text-xs leading-tight">
                    <p>👥 {guest.fields["JUMLAH ORANG"] || 1}</p>
                   
                  </div>
                  <div>
                  {guest.fields["WILL ATTEND"] && (
                      <span className="mt-1 inline-flex items-center px-2 py-0.5 gap-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-600">
                        <CheckCircle size={12} /> 👥
                        {guest.fields["WILL ATTEND"]}
                      </span>
                    )}
                  </div>
          
                  {/* Events */}
                  <div className="flex flex-wrap items-center gap-1 text-xs leading-tight">
                    {guest.fields.GEREJA && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        Gereja
                      </span>
                    )}
                    {guest.fields["TEA PAI"] && (
                      <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-800">
                        Tea Pai
                      </span>
                    )}
                    {guest.fields.SOIREE && (
                      <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                        Soiree
                      </span>
                    )}
                    {guest.fields["AFTER PARTY"] && (
                      <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                        After Party
                      </span>
                    )}
                  </div>
          
                  {/* Actions */}
                  <div className="flex justify-end gap-2">
                    <WhatsAppButton
                      link={`https://ekkyxdidut.pixinia.web.id/${guest.id}`}
                      phoneNumber={guest.fields["PHONE NUMBER"]}
                    />
                    <button
                      onClick={() => handleEdit(guest)}
                      className="p-1 rounded-md hover:bg-gray-100 text-gray-600"
                      title="Edit"
                    >
                      <PenSquare className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(guest.id)}
                      className="p-1 rounded-md hover:bg-gray-100 text-red-500"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
          
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}


const Badge = ({ color, label }: { color: string; label: string }) => (
    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}>
      {label}
    </span>
  );
  