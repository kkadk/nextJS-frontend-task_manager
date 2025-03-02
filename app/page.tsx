"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import TaskList from "@/components/TaskList"
import AddTaskForm from "@/components/AddTaskForm"
import LoginForm from "@/components/LoginForm"
import RegisterForm from "@/components/RegisterForm"
import { isAuthenticated, logout } from "@/utils/auth"
import axios from "axios"

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    setAuthenticated(isAuthenticated())

    // Handle email verification
    const token = searchParams.get("token")
    if (token) {
      verifyEmail(token)
    }
  }, [searchParams])

  const verifyEmail = async (token: string) => {
    try {
      await axios.get(`http://localhost:8000/api/verify-email/${token}/`)
      alert("Email verified successfully! You can now log in.")
    } catch (error) {
      alert("Email verification failed. Please try again or contact support.")
    }
  }

  const handleLoginSuccess = () => {
    setAuthenticated(true)
  }

  const handleLogout = () => {
    logout()
    setAuthenticated(false)
  }

  const handleRegisterSuccess = () => {
    setShowRegister(false)
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
          Task Manager
        </h1>
        {authenticated && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Logout
          </motion.button>
        )}
      </motion.div>
      {!authenticated ? (
        showRegister ? (
          <>
            <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
            <p className="text-center mt-4">
              Already have an account?{" "}
              <button onClick={() => setShowRegister(false)} className="text-blue-500 hover:underline">
                Log in
              </button>
            </p>
          </>
        ) : (
          <>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
            <p className="text-center mt-4">
              Don't have an account?{" "}
              <button onClick={() => setShowRegister(true)} className="text-blue-500 hover:underline">
                Register
              </button>
            </p>
          </>
        )
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            {/* <AddTaskForm /> */}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TaskList />
          </motion.div>
        </>
      )}
    </motion.main>
  )
}

