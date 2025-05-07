"use server"

import axios from "axios"

// Update the Task type to match your Airtable table structure
export interface Task {
  id?: string
  fields: {
    Name: string
    Notes?: string
    Status: "Todo" | "In Progress" | "Done"
  }
}

// Fetch all tasks
export async function fetchTasks() {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID

  if (!apiKey || !baseId) {
    throw new Error("Airtable API key or base ID is missing")
  }

  try {
    const response = await axios.get(`https://api.airtable.com/v0/${baseId}/task`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    })

    return response.data.records as Task[]
  } catch (error) {
    console.error("Error fetching tasks:", error)
    throw error
  }
}

// Update the createTask function to use the new field names
export async function createTask(name: string, notes: string) {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID

  if (!apiKey || !baseId) {
    throw new Error("Airtable API key or base ID is missing")
  }

  try {
    const response = await axios.post(
      `https://api.airtable.com/v0/${baseId}/task`,
      {
        records: [
          {
            fields: {
              Name: name,
              Notes: notes,
              Status: "Todo",
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

    return response.data.records[0] as Task
  } catch (error) {
    console.error("Error creating task:", error)
    throw error
  }
}

// Update the updateTask function to use the new field names
export async function updateTask(
  id: string,
  fields: { Name?: string; Notes?: string; Status?: "Todo" | "In Progress" | "Done" },
) {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID

  if (!apiKey || !baseId) {
    throw new Error("Airtable API key or base ID is missing")
  }

  try {
    const response = await axios.patch(
      `https://api.airtable.com/v0/${baseId}/task`,
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

    return response.data.records[0] as Task
  } catch (error) {
    console.error("Error updating task:", error)
    throw error
  }
}

// Delete a task
export async function deleteTask(id: string) {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID

  if (!apiKey || !baseId) {
    throw new Error("Airtable API key or base ID is missing")
  }

  try {
    await axios.delete(`https://api.airtable.com/v0/${baseId}/task/${id}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error deleting task:", error)
    throw error
  }
}
