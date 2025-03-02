import axios from "axios"

const API_URL = "http://localhost:8000/api"

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/token/`, { username, password })
  if (response.data.access) {
    localStorage.setItem("token", JSON.stringify(response.data))
  }
  return response.data
}

export const register = async (username: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/register/`, { username, email, password })
  return response.data
}

export const logout = () => {
  localStorage.removeItem("token")
}

export const getToken = () => {
  const tokenString = localStorage.getItem("token")
  const userToken = JSON.parse(tokenString || "{}")
  return userToken?.access
}

export const isAuthenticated = () => {
  const token = getToken()
  return !!token
}

