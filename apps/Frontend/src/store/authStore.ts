import { create } from "zustand"
import type { User } from "../types"

interface AuthState {
  user: User | null
  token: string | null
  setAuth: (user: User, token: string) => void
  setUser: (user: User) => void
  logout: () => void
  isAuthenticated: boolean
}

export const useAuthStore = create<AuthState>((set) => ({
  user: (() => {
    try {
      const stored = localStorage.getItem("user")
      return stored && stored !== "undefined" ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })(),
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token") && localStorage.getItem("token") !== "undefined",
  setAuth: (user, token) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
    set({ user, token, isAuthenticated: true })
  },
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user))
    set({ user })
  },
  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    set({ user: null, token: null, isAuthenticated: false })
  },
}))
