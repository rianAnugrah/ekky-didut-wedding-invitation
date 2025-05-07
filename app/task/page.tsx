"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Loader2, Trash2, PenSquare, Plus, X, Check } from "lucide-react"
import { fetchTasks, createTask, updateTask, deleteTask, type Task } from "./actions"

// Toast notification component
function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
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
  )
}

// Client component
export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("")
  const [notes, setNotes] = useState("")
  const [status, setStatus] = useState<"Todo" | "In Progress" | "Done">("Todo")
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  // Show toast notification
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type })
    setTimeout(() => {
      setToast(null)
    }, 3000)
  }

  // Load tasks on component mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksData = await fetchTasks()
        setTasks(tasksData)
      } catch (error) {
        console.log(error)
        showToast("Failed to load tasks. Please try again.", "error")
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

  // Handle form submission for creating or updating a task
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (editingTask) {
        // Update existing task
        const updatedTask = await updateTask(editingTask.id!, {
          Name: name,
          Notes: notes,
          Status: status,
        })

        setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
        showToast("Task updated successfully!", "success")

        // Reset form
        setEditingTask(null)
      } else {
        // Create new task
        const newTask = await createTask(name, notes)
        setTasks([...tasks, newTask])
        showToast("Task created successfully!", "success")
      }

      // Clear form
      setName("")
      setNotes("")
      setStatus("Todo")
    } catch (error) {
      console.log(error)
      showToast(
        editingTask ? "Failed to update task. Please try again." : "Failed to create task. Please try again.",
        "error",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle task deletion
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id)
      setTasks(tasks.filter((task) => task.id !== id))
      showToast("Task deleted successfully!", "success")
    } catch (error) {
      console.log(error)
      showToast("Failed to delete task. Please try again.", "error")
    }
  }

  // Handle task completion toggle
  const handleToggleStatus = async (task: Task) => {
    try {
      const newStatus = task.fields.Status === "Done" ? "Todo" : "Done"
      const updatedTask = await updateTask(task.id!, {
        Status: newStatus,
      })

      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
    } catch (error) {
      console.log(error)
      showToast("Failed to update task status. Please try again.", "error")
    }
  }

  // Set up task for editing
  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setName(task.fields.Name)
    setNotes(task.fields.Notes || "")
    setStatus(task.fields.Status)
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingTask(null)
    setName("")
    setNotes("")
    setStatus("Todo")
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl text-black">
      <h1 className="text-3xl font-bold mb-8 text-center">Task Manager</h1>

      {/* Task Form */}
      <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold">{editingTask ? "Edit Task" : "Create New Task"}</h2>
          <p className="text-gray-500 text-sm mt-1">
            {editingTask ? "Update the details of your task below" : "Fill in the details to create a new task"}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter task name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter task notes"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as "Todo" | "In Progress" | "Done")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="flex justify-between">
            {editingTask ? (
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
                    "Update Task"
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
                    Add Task
                  </span>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tasks List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No tasks found. Create your first task above!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden ${task.fields.Status === "Done" ? "opacity-70" : ""}`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => handleToggleStatus(task)}
                        className={`mt-1 w-5 h-5 rounded-md border flex items-center justify-center ${
                          task.fields.Status === "Done"
                            ? "bg-green-500 border-green-500 text-white"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {task.fields.Status === "Done" && <Check className="h-3 w-3" />}
                      </button>
                      <div>
                        <h3
                          className={`font-medium ${
                            task.fields.Status === "Done" ? "line-through text-gray-500" : "text-gray-900"
                          }`}
                        >
                          {task.fields.Name}
                        </h3>
                        {task.fields.Notes && <p className="mt-1 text-gray-600 text-sm">{task.fields.Notes}</p>}
                        <div className="mt-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              task.fields.Status === "Todo"
                                ? "bg-blue-100 text-blue-800"
                                : task.fields.Status === "In Progress"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {task.fields.Status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(task)}
                        className="p-1 rounded-md hover:bg-gray-100 text-gray-600"
                      >
                        <PenSquare className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(task.id!)}
                        className="p-1 rounded-md hover:bg-gray-100 text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
