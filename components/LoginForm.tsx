"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { login } from "@/utils/auth"

export default function LoginForm({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      await login(username, password)
      onLoginSuccess()
    } catch (err) {
      setError("Invalid username or password")
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Welcome Back</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <div className="mb-6">
        <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          required
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
      >
        Login
      </motion.button>
    </motion.form>
  )
}

