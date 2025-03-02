"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { getToken } from "@/utils/auth"
import axios from "axios"

interface Task {
  id: number
  title: string
  description: string
  status: string
  due_date: string
}

interface AddTaskFormProps {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export default function AddTaskForm({ setTasks }: AddTaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [status, setStatus] = useState("pending")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const token = getToken()
      const response = await axios.post(
        "http://localhost:8000/api/tasks/",
        { title, description, due_date: dueDate, status },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      const newTask = response.data

      // ✅ Update tasks immediately after adding a new task
      setTasks((prevTasks) => [newTask, ...prevTasks])

      setTitle("")
      setDescription("")
      setDueDate("")
      setStatus("pending")
    } catch (err) {
      setError("Error adding task. Please try again.")
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Task</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          rows={3}
        ></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="due_date" className="block text-gray-700 font-bold mb-2">
          Due Date
        </label>
        <input
          type="date"
          id="due_date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="status" className="block text-gray-700 font-bold mb-2">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          required
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
      >
        Add Task
      </motion.button>
    </motion.form>
  )
}