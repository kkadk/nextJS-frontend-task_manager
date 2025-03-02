"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface Task {
  id: number
  title: string
  description: string
  status: string
  due_date: string
}

interface TaskItemProps {
  task: Task
  onModify: (taskId: number, updatedTask: Partial<Task>) => void // ✅ Modify function
  onDelete: (taskId: number) => void
}

export default function TaskItem({ task, onModify, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(task)

  const handleSave = () => {
    onModify(task.id, editedTask)
    setIsEditing(false)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between"
    >
      {isEditing ? (
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="border p-2 rounded"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="border p-2 rounded"
          />
          <select
            value={editedTask.status}
            onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <input
            type="date"
            value={editedTask.due_date}
            onChange={(e) => setEditedTask({ ...editedTask, due_date: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
      ) : (
        <div>
          <h3 className={`text-lg font-semibold ${task.status === "completed" ? "line-through text-gray-500" : "text-gray-800"}`}>
            {task.title}
          </h3>
          <p className="text-gray-600 mt-1">{task.description}</p>
          <p className="text-sm text-gray-400 mt-2">Deadline: {task.due_date}</p>
          <p className="text-sm text-gray-400 mt-2">Status: {task.status}</p>
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* ✅ Edit Button */}
        {isEditing ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            className="bg-green-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-green-600 transition"
          >
            Save
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-yellow-600 transition"
          >
            Edit
          </motion.button>
        )}
        
        {/* ✅ Delete Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-red-600 transition"
        >
          Delete
        </motion.button>
      </div>
    </motion.div>
  )
}