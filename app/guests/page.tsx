"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Loader2, Trash2, PenSquare, Plus, X, ExternalLink } from "lucide-react";
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
  const [willAttend, setWillAttend] = useState(0);
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

  const [searchTerm, setSearchTerm] = useState("");
  const [filterAttendance, setFilterAttendance] = useState<null | number>(null); // 1, 0, -1, or null
  const [sortOption, setSortOption] = useState<
    "name-asc" | "name-desc" | "jumlah-asc" | "jumlah-desc"
  >("name-asc");

  const filteredGuests = guests
    .filter((guest) => {
      const nameMatches = guest.fields.NAMA.toLowerCase().includes(
        searchTerm.toLowerCase()
      );
      const attendanceMatches =
        filterAttendance === null ||
        guest.fields["WILL ATTEND"] === filterAttendance;
      return nameMatches && attendanceMatches;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.fields.NAMA.localeCompare(b.fields.NAMA);
        case "name-desc":
          return b.fields.NAMA.localeCompare(a.fields.NAMA);
        case "jumlah-asc":
          return (
            (a.fields["JUMLAH ORANG"] || 0) - (b.fields["JUMLAH ORANG"] || 0)
          );
        case "jumlah-desc":
          return (
            (b.fields["JUMLAH ORANG"] || 0) - (a.fields["JUMLAH ORANG"] || 0)
          );
        default:
          return 0;
      }
    });

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
          "WILL ATTEND": willAttend,
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
          willAttend,
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
    setWillAttend(0);
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
    setWillAttend(guest.fields["WILL ATTEND"] || 0);
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

  // Get attendance status text
  const getAttendanceStatus = (willAttend: number | undefined) => {
    if (willAttend === undefined) return "Unknown";
    switch (willAttend) {
      case 1:
        return "Will Attend";
      case 0:
        return "Pending";
      case -1:
        return "Will Not Attend";
      default:
        return "Unknown";
    }
  };

  // Get attendance status color
  const getAttendanceStatusColor = (willAttend: number | undefined) => {
    if (willAttend === undefined) return "bg-gray-100 text-gray-800";
    switch (willAttend) {
      case 1:
        return "bg-green-100 text-green-800";
      case 0:
        return "bg-yellow-100 text-yellow-800";
      case -1:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };


  return (
    <div className="flex flex-col w-full">
      <h1 className="text-3xl font-bold  text-center flex items-center w-full justify-center p-4"><span>Guest Manager</span></h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
        {/* Guest Form */}
        <div className="bg-white rounded-lg shadow-md  overflow-hidden text-black">
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
                className="block text-sm font-medium  mb-1"
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
                className="block text-sm font-medium  mb-1"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="jumlahOrang"
                  className="block text-sm font-medium  mb-1"
                >
                  Jumlah Orang
                </label>
                <input
                  id="jumlahOrang"
                  type="number"
                  min="1"
                  value={jumlahOrang}
                  onChange={(e) =>
                    setJumlahOrang(Number.parseInt(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* <div>
              <label htmlFor="willAttend" className="block text-sm font-medium  mb-1">
                Will Attend
              </label>
              <select
                id="willAttend"
                value={willAttend}
                onChange={(e) => setWillAttend(Number.parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="1">Will Attend</option>
                <option value="0">Pending</option>
                <option value="-1">Will Not Attend</option>
              </select>
            </div> */}
            </div>

            <div className="mb-4 space-y-2">
              <p className="block text-sm font-medium ">Events</p>

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
                  className="ml-2 block text-sm "
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
                  className="ml-2 block text-sm "
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
                  className="ml-2 block text-sm "
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
                  className="ml-2 block text-sm "
                >
                  After Party
                </label>
              </div>
            </div>

            <div className="flex justify-between">
              {editingGuest ? (
                <>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-gray-300 rounded-md  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

        <div className="lg:col-span-3">
          <div className="mb-6 flex flex-wrap gap-4 items-end bg-transparent ">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium  mb-1">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name"
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Attendance Filter */}
            <div>
              <label className="hidden text-sm font-medium  mb-1">
                Attendance
              </label>
              <select
                value={filterAttendance ?? ""}
                onChange={(e) =>
                  setFilterAttendance(
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All</option>
                <option value="1">Will Attend</option>
                <option value="0">Pending</option>
                <option value="-1">Will Not Attend</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium  mb-1">
                Sort By
              </label>
              <select
                value={sortOption}
                onChange={(e) =>
                  setSortOption(
                    e.target.value as
                      | "name-asc"
                      | "name-desc"
                      | "jumlah-asc"
                      | "jumlah-desc"
                  )
                }
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="jumlah-asc">Jumlah Orang (Asc)</option>
                <option value="jumlah-desc">Jumlah Orang (Desc)</option>
              </select>
            </div>
          </div>

          {/* Guests List */}
          <div>

            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : filteredGuests.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500">
                  No guests found. Add your first guest above!
                </p>
              </div>
            ) : (
              <div className="space-y-0 max-h-[calc(100svh_-_16rem)] overflow-auto rounded-lg divide-y divide-amber-800 ">
                {filteredGuests.map((guest) => (
                  <div
                    key={guest.id}
                    className="bg-white  shadow-md overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="grid grid-cols-4 w-full">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900">
                              {guest.fields.NAMA}
                            </h3>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAttendanceStatusColor(
                                guest.fields["WILL ATTEND"]
                              )}`}
                            >
                              {getAttendanceStatus(guest.fields["WILL ATTEND"])}
                            </span>
                          </div>

                          {guest.fields["PHONE NUMBER"] && (
                            <p className="mt-1 text-gray-600 text-sm">
                              {guest.fields["PHONE NUMBER"]}
                            </p>
                          )}
                          <p className="mt-1 text-gray-600 text-sm">
                            Limit Tamu: {guest.fields["JUMLAH ORANG"] || 1}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2">
                            {guest.fields.GEREJA && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Gereja
                              </span>
                            )}
                            {guest.fields["TEA PAI"] && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                                Tea Pai
                              </span>
                            )}
                            {guest.fields.SOIREE && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                Soiree
                              </span>
                            )}
                            {guest.fields["AFTER PARTY"] && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                After Party
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <WhatsAppButton
                            link={`https://ekkyxdidut.pixinia.web.id/${guest.id}`}
                            phoneNumber={guest.fields["PHONE NUMBER"]}
                          />
                          <a
                            href={`https://ekkyxdidut.pixinia.web.id/${guest.id}`}
                            target="_blank"
                            className="flex items-center p-4 gap-2 rounded bg-blue-400"
                          >
                            <ExternalLink /> Preview Link{" "}
                          </a>
                          <button
                            onClick={() => handleEdit(guest)}
                             className="flex items-center p-4 gap-2 rounded bg-gray-400"
                          >
                            <PenSquare className="h-4 w-4" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(guest.id)}
                             className="flex items-center p-4 gap-2 rounded bg-red-400"
                          >
                            <Trash2 className="h-4 w-4" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
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
