"use server"

import axios from "axios"

// Update the interface to include the WILL ATTEND field
export interface Guest {
  id: string
  createdTime: string
  fields: {
    NAMA: string
    "PHONE NUMBER"?: string
    "JUMLAH ORANG"?: number
    "WILL ATTEND"?: number
    GEREJA?: boolean
    "TEA PAI"?: boolean
    SOIREE?: boolean
    "AFTER PARTY"?: boolean
  }
}


// Fetch all guests
export async function fetchGuests() {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID

  if (!apiKey || !baseId) {
    throw new Error("Airtable API key or base ID is missing")
  }

  try {
    const response = await axios.get(`https://api.airtable.com/v0/${baseId}/guest`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    })

    return response.data.records as Guest[]
  } catch (error) {
    console.error("Error fetching guests:", error)
    throw error
  }
}

// Create a new guest
export async function createGuest(
  nama: string,
  phoneNumber: string,
  jumlahOrang: number,
  willAttend: number,
  gereja: boolean,
  teaPai: boolean,
  soiree: boolean,
  afterParty: boolean,
) {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID

  if (!apiKey || !baseId) {
    throw new Error("Airtable API key or base ID is missing")
  }

  try {
    const response = await axios.post(
      `https://api.airtable.com/v0/${baseId}/guest`,
      {
        records: [
          {
            fields: {
              NAMA: nama,
              "PHONE NUMBER": phoneNumber,
              "JUMLAH ORANG": jumlahOrang,
              "WILL ATTEND": willAttend,
              GEREJA: gereja,
              "TEA PAI": teaPai,
              SOIREE: soiree,
              "AFTER PARTY": afterParty,
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    )

    return response.data.records[0] as Guest
  } catch (error) {
    console.error("Error creating guest:", error)
    throw error
  }
}

// Update an existing guest
export async function updateGuest(
  id: string,
  fields: {
    NAMA?: string
    "PHONE NUMBER"?: string
    "JUMLAH ORANG"?: number
    "WILL ATTEND"?: number
    GEREJA?: boolean
    "TEA PAI"?: boolean
    SOIREE?: boolean
    "AFTER PARTY"?: boolean
  },
) {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID

  if (!apiKey || !baseId) {
    throw new Error("Airtable API key or base ID is missing")
  }

  try {
    const response = await axios.patch(
      `https://api.airtable.com/v0/${baseId}/guest`,
      {
        records: [
          {
            id,
            fields,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    )

    return response.data.records[0] as Guest
  } catch (error) {
    console.error("Error updating guest:", error)
    throw error
  }
}

// Delete a guest
export async function deleteGuest(id: string) {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID

  if (!apiKey || !baseId) {
    throw new Error("Airtable API key or base ID is missing")
  }

  try {
    await axios.delete(`https://api.airtable.com/v0/${baseId}/guest/${id}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error deleting guest:", error)
    throw error
  }
}
