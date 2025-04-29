"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import TaskItem from "./TaskItem"
import { getToken } from "@/utils/auth"
import axios from "axios"
import AddTaskForm from "./AddTaskForm"

interface Task {
  id: number
  title: string
  description: string
  status: string
  due_date: string
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const token = getToken()
      const response = await axios.get("http://localhost:8000/api/tasks/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTasks(response.data)
      setLoading(false)
    } catch (err) {
      setError("Error fetching tasks. Please try again later.")
      setLoading(false)
    }
  }

  const handleTaskUpdate = async (taskId: number, updatedTask: Partial<Task>) => {
    try {
      const token = getToken()
      await axios.put(
        `http://localhost:8000/api/tasks/${taskId}/`,
        updatedTask, 
        { headers: { Authorization: `Bearer ${token}` } }
      )
  
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, ...updatedTask } : task
        )
      )
    } catch (err) {
      setError("Error updating task. Please try again.")
    }
  }

  const handleTaskDelete = async (taskId: number) => {
    try {
      const token = getToken()
      await axios.delete(`http://localhost:8000/api/tasks/${taskId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
    } catch (err) {
      setError("Error deleting task. Please try again.")
    }
  }

  if (loading) {
    return <div className="text-center text-gray-600">Loading tasks...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (

    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Tasks</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleTaskDelete}
            onModify={handleTaskUpdate} 
          />
        ))}
        <AddTaskForm setTasks={setTasks} />
      </AnimatePresence>
    </motion.div>
  )
}